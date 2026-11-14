#!/usr/bin/env node
/**
 * npm run images — optimize client photos and videos from /assets.
 *
 * Photos → src/assets/projects/<Folder>/ (CLAUDE.md → "Project photos — rules"):
 *   - Format is detected from file content, not the extension (some ".jpg" files are AVIF).
 *   - HEIC/HEIF is decoded with heic-convert (sharp's prebuilt binaries can't decode it);
 *     heic-convert already applies the HEIF rotation, so no EXIF rotation follows.
 *   - Other formats: auto-rotate from EXIF.
 *   - Resize to max 2560 px on the long edge (never upscale), JPEG output via mozjpeg q82.
 *   - ALL metadata is stripped (phone photos carry GPS coordinates).
 *   - Names: original base name, lowercased and slugified (IMG_2034.JPG → img-2034.jpg);
 *     cover.* stays cover.jpg.
 *   - Skips .DS_Store/Thumbs.db and every entry in scripts/image-exclude.json.
 *
 * Videos (needs ffmpeg + ffprobe; settings in scripts/video-config.json):
 *   - Every video becomes a small web MP4 (H.264, ≤ ~4.5 MB, no audio, metadata stripped,
 *     faststart) plus a poster JPEG in public/videos/<project-slug>/<id>.mp4 / <id>-poster.jpg.
 *   - Configured `frames` become gallery stills: video-<id>-<ss>s.jpg in the project folder
 *     (the sharpest frame within ±0.5 s of each time).
 *   - Originals are never copied or committed.
 *
 * Catalogs (PDFs in /assets/catalogs/; see prepareCatalogs below):
 *   - Each PDF is copied unchanged to public/catalogs/<slug>.pdf (fabric colors matter, so
 *     no recompression) and its first page becomes the cover, src/assets/catalogs/<slug>.jpg.
 *     A JPG/PNG with the PDF's base name in /assets/catalogs/ overrides the cover.
 *   - src/assets/catalogs/catalogs.json records each file's slug, size, and page count.
 *
 * Housekeeping:
 *   - Idempotent: skips outputs newer than their source (and the config). `--force` redoes all.
 *   - Prunes stale outputs in src/assets/projects/, public/videos/, public/catalogs/, and
 *     src/assets/catalogs/. Never touches /assets.
 *   - Copies brand files from /assets/brand/ (or a logo file in /assets/) to src/assets/brand/.
 */
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import heicConvert from 'heic-convert';
import { PDFDict, PDFDocument, PDFName, PDFRawStream } from 'pdf-lib';
import sharp from 'sharp';
import {
  ASSETS_DIR,
  CATALOGS_SRC_DIR,
  PUBLIC_CATALOGS_DIR,
  SRC_CATALOGS_DIR,
  EXCLUDE_FILE,
  PUBLIC_VIDEOS_DIR,
  SRC_BRAND_DIR,
  SRC_PROJECTS_DIR,
  VIDEO_CONFIG_FILE,
  excludeKey,
  extOf,
  findSourceFolders,
  formatBytes,
  isIgnored,
  readExcludes,
  readVideoConfig,
  slugify,
  videoFrameName,
  videoId,
} from './lib/shared.mjs';
import { VIDEO_TARGET_BYTES, encodeWebVideo, probeVideo, sharpestFrame } from './lib/video.mjs';

const FORCE = process.argv.includes('--force');
const MAX_EDGE = 2560;
const JPEG_QUALITY = 82;
const POSTER_QUALITY = 80;

/** Detects the real image format from magic bytes. */
function sniffFormat(buf) {
  if (buf.length < 16) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  const tiff = buf.toString('binary', 0, 4);
  if (tiff === 'II*\0' || tiff === 'MM\0*') return 'tiff';
  if (buf.toString('ascii', 4, 8) === 'ftyp') {
    const boxSize = buf.readUInt32BE(0);
    const brands = [buf.toString('ascii', 8, 12)];
    for (let o = 16; o + 4 <= Math.min(boxSize, buf.length); o += 4) brands.push(buf.toString('ascii', o, o + 4));
    if (brands.some((b) => b === 'avif' || b === 'avis')) return 'avif';
    if (brands.some((b) => ['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'mif1', 'msf1'].includes(b))) return 'heic';
  }
  return null;
}

/** Output file name: slugified base name + .jpg; cover.* → cover.jpg. */
function outputName(sourceName) {
  const base = path.basename(sourceName, path.extname(sourceName));
  if (base.toLowerCase() === 'cover') return 'cover.jpg';
  return `${slugify(base) || 'image'}.jpg`;
}

/** Writes a web JPEG with all metadata stripped. */
async function writeJpeg(input, outPath, { autoRotate = true, quality = JPEG_QUALITY } = {}) {
  let pipeline = sharp(input, { failOn: 'none' });
  if (autoRotate) pipeline = pipeline.rotate(); // auto-orient from EXIF
  await pipeline
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .toColourspace('srgb')
    .jpeg({ quality, mozjpeg: true })
    .toFile(outPath); // sharp writes no metadata unless asked to keep it
}

async function convertImage(sourcePath, outPath) {
  const buf = await readFile(sourcePath);
  const format = sniffFormat(buf);
  if (!format) throw new Error('unrecognized image format');
  if (format === 'heic') {
    const jpeg = Buffer.from(await heicConvert({ buffer: buf, format: 'JPEG', quality: 1 }));
    await writeJpeg(jpeg, outPath, { autoRotate: false });
  } else {
    await writeJpeg(buf, outPath);
  }
}

/** True when `outPath` exists and is newer than every dependency. */
async function isFresh(outPath, ...deps) {
  if (FORCE || !existsSync(outPath)) return false;
  const out = (await stat(outPath)).mtimeMs;
  for (const dep of deps) {
    if (dep && existsSync(dep) && (await stat(dep)).mtimeMs > out) return false;
  }
  return true;
}

async function prepareBrand(report) {
  const candidates = [];
  const brandDir = path.join(ASSETS_DIR, 'brand');
  if (existsSync(brandDir)) {
    for (const name of await readdir(brandDir)) {
      if (!isIgnored(name) && ['.svg', '.png'].includes(extOf(name))) candidates.push(path.join(brandDir, name));
    }
  }
  for (const name of await readdir(ASSETS_DIR)) {
    if (/^logo.*\.(svg|png)$/i.test(name)) candidates.push(path.join(ASSETS_DIR, name));
  }
  if (candidates.length === 0) {
    report.warnings.push('No logo found in /assets/brand/ or /assets/.');
    return;
  }
  await mkdir(SRC_BRAND_DIR, { recursive: true });
  for (const source of candidates) {
    const ext = extOf(source);
    const out = path.join(SRC_BRAND_DIR, `${slugify(path.basename(source, ext))}${ext}`);
    if (await isFresh(out, source)) continue;
    await copyFile(source, out);
    report.brand.push(path.basename(out));
  }
}

/**
 * The first page's image as a cover. Catalog pages are usually one full-page JPEG
 * (DCTDecode), which can be taken out as is; anything else gets no automatic cover.
 */
async function firstPageJpeg(doc) {
  const resources = doc.getPage(0).node.Resources();
  const xobjects = resources?.lookup(PDFName.of('XObject'), PDFDict);
  if (!xobjects) return null;
  let best = null;
  for (const [, ref] of xobjects.entries()) {
    const obj = doc.context.lookup(ref);
    if (!(obj instanceof PDFRawStream)) continue;
    const dict = obj.dict;
    if (String(dict.get(PDFName.of('Subtype'))) !== '/Image' || String(dict.get(PDFName.of('Filter'))) !== '/DCTDecode') continue;
    if (!best || obj.contents.length > best.length) best = obj.contents;
  }
  return best ? Buffer.from(best) : null;
}

async function prepareCatalogs(report) {
  if (!existsSync(CATALOGS_SRC_DIR)) return;
  const manifestPath = path.join(SRC_CATALOGS_DIR, 'catalogs.json');
  const previous = new Map();
  if (existsSync(manifestPath)) {
    for (const entry of JSON.parse(await readFile(manifestPath, 'utf8'))) previous.set(entry.source, entry);
  }
  const names = (await readdir(CATALOGS_SRC_DIR)).filter((n) => !isIgnored(n));
  const pdfs = names.filter((n) => extOf(n) === '.pdf');
  const coverOverrides = new Map(
    names.filter((n) => ['.jpg', '.jpeg', '.png'].includes(extOf(n))).map((n) => [path.basename(n, path.extname(n)), n]),
  );
  for (const n of names) {
    if (extOf(n) !== '.pdf' && !coverOverrides.has(path.basename(n, path.extname(n)))) report.unknown.push(`catalogs/${n}`);
  }

  await mkdir(PUBLIC_CATALOGS_DIR, { recursive: true });
  await mkdir(SRC_CATALOGS_DIR, { recursive: true });
  const manifest = [];
  const keepPublic = new Set();
  const keepSrc = new Set(['catalogs.json']);
  for (const source of pdfs.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
    const sourcePath = path.join(CATALOGS_SRC_DIR, source);
    const base = path.basename(source, path.extname(source));
    const slug = slugify(base);
    const pdfOut = path.join(PUBLIC_CATALOGS_DIR, `${slug}.pdf`);
    const coverOut = path.join(SRC_CATALOGS_DIR, `${slug}.jpg`);
    const override = coverOverrides.get(base);
    const overridePath = override ? path.join(CATALOGS_SRC_DIR, override) : null;
    keepPublic.add(`${slug}.pdf`);

    const pdfFresh = await isFresh(pdfOut, sourcePath);
    if (!pdfFresh) await copyFile(sourcePath, pdfOut);

    let entry = previous.get(source);
    const coverFresh = existsSync(coverOut) && (await isFresh(coverOut, sourcePath, overridePath));
    if (!pdfFresh || !coverFresh || !entry) {
      const doc = await PDFDocument.load(await readFile(sourcePath), { updateMetadata: false });
      let cover = overridePath ? await readFile(overridePath) : await firstPageJpeg(doc);
      if (cover) {
        await sharp(cover, { failOn: 'none' })
          .rotate()
          .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toFile(coverOut);
      } else {
        report.warnings.push(
          `catalogs/${source}: no cover (page 1 isn't a single JPEG). Add "${base}.jpg" to /assets/catalogs/ to set one.`,
        );
      }
      const { width, height } = doc.getPage(0).getSize();
      entry = {
        source,
        slug,
        file: `/catalogs/${slug}.pdf`,
        bytes: (await stat(sourcePath)).size,
        pages: doc.getPageCount(),
        pageAspect: +(width / height).toFixed(4),
        cover: cover ? `${slug}.jpg` : null,
      };
      report.catalogs.push(
        `${source} → public/catalogs/${slug}.pdf (${entry.pages} pages, ${formatBytes(entry.bytes)})` +
          (cover ? ` + cover src/assets/catalogs/${slug}.jpg${override ? ` (from ${override})` : ' (page 1)'}` : ''),
      );
    }
    if (entry.cover) keepSrc.add(entry.cover);
    manifest.push(entry);
  }
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await pruneDir(PUBLIC_CATALOGS_DIR, keepPublic, 'public/catalogs', report);
  await pruneDir(SRC_CATALOGS_DIR, keepSrc, 'src/assets/catalogs', report);
}

/** Removes files in `dir` that aren't in `expected`. */
async function pruneDir(dir, expected, label, report) {
  if (!existsSync(dir)) return;
  for (const name of await readdir(dir)) {
    if (!expected.has(name)) {
      await rm(path.join(dir, name), { recursive: true, force: true });
      report.pruned.push(`${label}/${name}`);
    }
  }
}

async function main() {
  if (!existsSync(ASSETS_DIR)) {
    console.log('No /assets folder found. Nothing to do (expected on CI, where /assets is gitignored).');
    return;
  }

  const excludes = await readExcludes();
  const excludeMap = new Map(excludes.map((e) => [e.file, e.reason]));
  const usedExcludes = new Set();
  const videoConfig = await readVideoConfig();
  const usedVideoConfig = new Set();
  const folders = await findSourceFolders();

  const report = {
    rows: [],
    excluded: [],
    frames: [],
    videos: [],
    unknown: [],
    noUsable: [],
    pruned: [],
    warnings: [],
    errors: [],
    brand: [],
    catalogs: [],
  };
  let totalBefore = 0;
  let totalAfter = 0;
  const liveOutputFolders = new Set();
  const liveVideoFolders = new Set();

  for (const src of folders) {
    const outDir = path.join(SRC_PROJECTS_DIR, src.folder);
    const projectSlug = slugify(src.folder);
    for (const o of src.other) report.unknown.push(`${src.folder}/${o}`);

    // ---- Plan photo outputs ----
    const plan = [];
    const taken = new Map();
    const claim = (name, label) => {
      if (!taken.has(name)) {
        taken.set(name, label);
        return name;
      }
      const stem = name.replace(/\.jpg$/, '');
      let n = 2;
      while (taken.has(`${stem}-${n}.jpg`)) n += 1;
      report.warnings.push(`${src.folder}: "${label}" and "${taken.get(name)}" map to the same name; wrote ${stem}-${n}.jpg.`);
      taken.set(`${stem}-${n}.jpg`, label);
      return `${stem}-${n}.jpg`;
    };

    for (const file of src.images.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
      const key = excludeKey(src.folder, file);
      if (excludeMap.has(key)) {
        usedExcludes.add(key);
        report.excluded.push(`${key} — ${excludeMap.get(key)}`);
        continue;
      }
      plan.push({ kind: 'image', file, name: claim(outputName(file), file) });
    }

    const videoPlans = [];
    for (const file of src.videos) {
      const key = excludeKey(src.folder, file);
      const settings = videoConfig.get(key) ?? { frames: [], poster: 1 };
      if (videoConfig.has(key)) usedVideoConfig.add(key);
      videoPlans.push({ file, settings });
      for (const t of settings.frames) {
        plan.push({ kind: 'frame', file, seconds: t, name: claim(videoFrameName(file, t), `${file}@${t}s`) });
      }
    }

    // ---- Photos and video stills ----
    if (plan.length === 0) {
      report.noUsable.push(src.folder);
      if (existsSync(outDir)) {
        await rm(outDir, { recursive: true, force: true });
        report.pruned.push(`${src.folder}/ (no usable images)`);
      }
    } else {
      await mkdir(outDir, { recursive: true });
      liveOutputFolders.add(src.folder);
      let processed = 0;
      let skipped = 0;
      let before = 0;
      let after = 0;
      const durations = new Map();
      for (const item of plan) {
        const sourcePath = path.join(src.dir, item.file);
        const outPath = path.join(outDir, item.name);
        try {
          if (item.kind === 'image') {
            before += (await stat(sourcePath)).size;
            if (await isFresh(outPath, sourcePath)) skipped += 1;
            else {
              await convertImage(sourcePath, outPath);
              processed += 1;
              process.stdout.write('.');
            }
            after += (await stat(outPath)).size;
          } else {
            if (await isFresh(outPath, sourcePath, VIDEO_CONFIG_FILE)) skipped += 1;
            else {
              if (!durations.has(item.file)) durations.set(item.file, (await probeVideo(sourcePath)).duration);
              const frame = await sharpestFrame(sourcePath, item.seconds, durations.get(item.file));
              await writeJpeg(frame, outPath, { autoRotate: false });
              processed += 1;
              process.stdout.write('f');
            }
            report.frames.push(`${src.folder}/${item.name} (from ${item.file} at ${item.seconds}s)`);
          }
        } catch (err) {
          report.errors.push(`${src.folder}/${item.file}: ${err.message}`);
        }
      }
      await pruneDir(outDir, new Set(plan.map((p) => p.name)), src.folder, report);
      totalBefore += before;
      totalAfter += after;
      const images = plan.filter((p) => p.kind === 'image').length;
      const frames = plan.length - images;
      report.rows.push({ folder: src.folder, images, frames, processed, skipped, before, after });
    }

    // ---- Web videos + posters ----
    if (videoPlans.length > 0) {
      const videoDir = path.join(PUBLIC_VIDEOS_DIR, projectSlug);
      await mkdir(videoDir, { recursive: true });
      liveVideoFolders.add(projectSlug);
      const expected = new Set();
      for (const { file, settings } of videoPlans) {
        const sourcePath = path.join(src.dir, file);
        const id = videoId(file);
        const mp4 = path.join(videoDir, `${id}.mp4`);
        const poster = path.join(videoDir, `${id}-poster.jpg`);
        expected.add(`${id}.mp4`).add(`${id}-poster.jpg`);
        try {
          const info = await probeVideo(sourcePath);
          let kbps = null;
          if (!(await isFresh(mp4, sourcePath))) {
            kbps = await encodeWebVideo(sourcePath, mp4, info.duration);
            process.stdout.write('v');
          }
          if (!(await isFresh(poster, sourcePath, VIDEO_CONFIG_FILE))) {
            const frame = await sharpestFrame(sourcePath, settings.poster, info.duration);
            await writeJpeg(frame, poster, { autoRotate: false, quality: POSTER_QUALITY });
          }
          const size = (await stat(mp4)).size;
          const original = (await stat(sourcePath)).size;
          if (size > VIDEO_TARGET_BYTES * 1.12) report.warnings.push(`${src.folder}/${file}: web video is ${formatBytes(size)} (target ≤ ${formatBytes(VIDEO_TARGET_BYTES)}).`);
          report.videos.push(
            `${src.folder}/${file} → public/videos/${projectSlug}/${id}.mp4 ` +
              `(${info.width}×${info.height}, ${info.duration.toFixed(1)} s, ${formatBytes(original)} → ${formatBytes(size)}` +
              `${kbps ? `, ${kbps} kbps` : ', unchanged'}) + ${id}-poster.jpg @ ${settings.poster}s`,
          );
        } catch (err) {
          report.errors.push(`${src.folder}/${file}: ${err.message}`);
        }
      }
      await pruneDir(videoDir, expected, `public/videos/${projectSlug}`, report);
    }
  }

  // Prune output folders whose source folder no longer exists or has no usable images.
  if (existsSync(SRC_PROJECTS_DIR)) {
    for (const entry of await readdir(SRC_PROJECTS_DIR, { withFileTypes: true })) {
      if (entry.isDirectory() && !liveOutputFolders.has(entry.name)) {
        await rm(path.join(SRC_PROJECTS_DIR, entry.name), { recursive: true, force: true });
        report.pruned.push(`${entry.name}/ (no matching source folder)`);
      }
    }
  }
  if (existsSync(PUBLIC_VIDEOS_DIR)) {
    for (const entry of await readdir(PUBLIC_VIDEOS_DIR, { withFileTypes: true })) {
      if (!liveVideoFolders.has(entry.name)) {
        await rm(path.join(PUBLIC_VIDEOS_DIR, entry.name), { recursive: true, force: true });
        report.pruned.push(`public/videos/${entry.name} (no matching source videos)`);
      }
    }
  }

  for (const e of excludes) {
    if (!usedExcludes.has(e.file)) report.warnings.push(`${path.basename(EXCLUDE_FILE)} entry matches no file: ${e.file}`);
  }
  for (const key of videoConfig.keys()) {
    if (!usedVideoConfig.has(key)) report.warnings.push(`${path.basename(VIDEO_CONFIG_FILE)} entry matches no video: ${key}`);
  }

  await prepareBrand(report);
  await prepareCatalogs(report);

  // ---- Report ----
  console.log('\n\nImage preparation report');
  console.log('='.repeat(104));
  console.log(`${'Folder'.padEnd(36)}${'Images'.padStart(7)}${'Stills'.padStart(8)}${'New'.padStart(6)}${'Skipped'.padStart(9)}${'Before'.padStart(12)}${'After'.padStart(12)}${'Saved'.padStart(8)}`);
  for (const r of report.rows) {
    const saved = r.before ? `${Math.round((1 - r.after / r.before) * 100)}%` : '—';
    console.log(
      `${r.folder.padEnd(36)}${String(r.images).padStart(7)}${String(r.frames).padStart(8)}${String(r.processed).padStart(6)}${String(r.skipped).padStart(9)}` +
        `${(r.before ? formatBytes(r.before) : '—').padStart(12)}${(r.after ? formatBytes(r.after) : '—').padStart(12)}${saved.padStart(8)}`,
    );
  }
  console.log('-'.repeat(104));
  const totalImages = report.rows.reduce((n, r) => n + r.images, 0);
  const totalFrames = report.rows.reduce((n, r) => n + r.frames, 0);
  const totalSaved = totalBefore ? `${Math.round((1 - totalAfter / totalBefore) * 100)}%` : '—';
  console.log(`${'TOTAL (photos only in sizes)'.padEnd(36)}${String(totalImages).padStart(7)}${String(totalFrames).padStart(8)}${''.padStart(15)}${formatBytes(totalBefore).padStart(12)}${formatBytes(totalAfter).padStart(12)}${totalSaved.padStart(8)}`);

  const section = (title, items) => {
    if (items.length === 0) return;
    console.log(`\n${title} (${items.length})`);
    for (const item of items) console.log(`  - ${item}`);
  };
  section('Excluded by scripts/image-exclude.json', report.excluded);
  section('Video stills (gallery images from scripts/video-config.json)', report.frames);
  section('Web videos (originals are never copied)', report.videos);
  section('Folders with no usable images (hold these projects back)', report.noUsable);
  section('Unrecognized files (ignored)', report.unknown);
  section('Pruned stale outputs', report.pruned);
  section('Brand files copied', report.brand);
  section('Catalogs (PDFs copied unchanged; covers from page 1)', report.catalogs);
  section('Warnings', report.warnings);
  section('ERRORS', report.errors);

  if (report.errors.length > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
