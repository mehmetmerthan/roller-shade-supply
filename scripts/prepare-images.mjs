#!/usr/bin/env node
/**
 * npm run images — optimize client photos from /assets into src/assets.
 *
 * Rules (CLAUDE.md → "Project photos — rules"):
 *   - Format is detected from file content, not the extension (some ".jpg" files are AVIF).
 *   - HEIC/HEIF is decoded with heic-convert (sharp's prebuilt binaries can't decode it);
 *     heic-convert already applies the HEIF rotation, so no EXIF rotation follows.
 *   - Other formats: auto-rotate from EXIF.
 *   - Resize to max 2560 px on the long edge (never upscale), JPEG output via mozjpeg q82.
 *   - ALL metadata is stripped (phone photos carry GPS coordinates).
 *   - Names: original base name, lowercased and slugified (IMG_2034.JPG → img-2034.jpg);
 *     cover.* stays cover.jpg.
 *   - Skips .DS_Store/Thumbs.db, videos (reported, never copied), and every entry in
 *     scripts/image-exclude.json.
 *   - Idempotent: skips outputs newer than their source. `--force` reprocesses everything.
 *   - Prunes stale outputs in src/assets/projects/ (files whose source was removed or
 *     excluded). It never touches /assets.
 *   - Copies brand files from /assets/brand/ (or a logo file directly in /assets/) to
 *     src/assets/brand/.
 */
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import heicConvert from 'heic-convert';
import sharp from 'sharp';
import {
  ASSETS_DIR,
  SRC_BRAND_DIR,
  SRC_PROJECTS_DIR,
  excludeKey,
  extOf,
  findSourceFolders,
  formatBytes,
  isIgnored,
  readExcludes,
  slugify,
} from './lib/shared.mjs';

const FORCE = process.argv.includes('--force');
const MAX_EDGE = 2560;
const JPEG_QUALITY = 82;

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

async function convert(sourcePath, outPath) {
  const buf = await readFile(sourcePath);
  const format = sniffFormat(buf);
  if (!format) throw new Error('unrecognized image format');

  let input = buf;
  let alreadyOriented = false;
  if (format === 'heic') {
    input = Buffer.from(await heicConvert({ buffer: buf, format: 'JPEG', quality: 1 }));
    alreadyOriented = true;
  }

  let pipeline = sharp(input, { failOn: 'none' });
  if (!alreadyOriented) pipeline = pipeline.rotate(); // auto-orient from EXIF
  await pipeline
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .toColourspace('srgb')
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outPath); // sharp writes no metadata unless asked to keep it
  return format;
}

async function isFresh(sourcePath, outPath) {
  if (FORCE || !existsSync(outPath)) return false;
  const [src, out] = await Promise.all([stat(sourcePath), stat(outPath)]);
  return out.mtimeMs >= src.mtimeMs;
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
    if (await isFresh(source, out)) continue;
    await copyFile(source, out);
    report.brand.push(path.basename(out));
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
  const folders = await findSourceFolders();

  const report = {
    rows: [],
    excluded: [],
    videos: [],
    unknown: [],
    noUsable: [],
    pruned: [],
    warnings: [],
    errors: [],
    brand: [],
  };
  let totalBefore = 0;
  let totalAfter = 0;
  const liveOutputFolders = new Set();

  for (const src of folders) {
    const outDir = path.join(SRC_PROJECTS_DIR, src.folder);
    for (const v of src.videos) report.videos.push(`${src.folder}/${v}`);
    for (const o of src.other) report.unknown.push(`${src.folder}/${o}`);

    const included = [];
    for (const file of src.images.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
      const key = excludeKey(src.folder, file);
      if (excludeMap.has(key)) {
        usedExcludes.add(key);
        report.excluded.push(`${key} — ${excludeMap.get(key)}`);
        continue;
      }
      included.push(file);
    }

    if (included.length === 0) {
      report.noUsable.push(src.folder);
      if (existsSync(outDir)) {
        await rm(outDir, { recursive: true, force: true });
        report.pruned.push(`${src.folder}/ (no usable images)`);
      }
      continue;
    }

    await mkdir(outDir, { recursive: true });
    liveOutputFolders.add(src.folder);

    // Map sources to unique output names.
    const plan = [];
    const taken = new Map();
    for (const file of included) {
      let name = outputName(file);
      if (taken.has(name)) {
        const stem = name.replace(/\.jpg$/, '');
        let n = 2;
        while (taken.has(`${stem}-${n}.jpg`)) n += 1;
        report.warnings.push(`${src.folder}: "${file}" and "${taken.get(name)}" map to the same name; wrote ${stem}-${n}.jpg.`);
        name = `${stem}-${n}.jpg`;
      }
      taken.set(name, file);
      plan.push({ file, name });
    }

    let processed = 0;
    let skipped = 0;
    let before = 0;
    let after = 0;
    for (const { file, name } of plan) {
      const sourcePath = path.join(src.dir, file);
      const outPath = path.join(outDir, name);
      before += (await stat(sourcePath)).size;
      try {
        if (await isFresh(sourcePath, outPath)) {
          skipped += 1;
        } else {
          await convert(sourcePath, outPath);
          processed += 1;
          process.stdout.write('.');
        }
        after += (await stat(outPath)).size;
      } catch (err) {
        report.errors.push(`${src.folder}/${file}: ${err.message}`);
      }
    }

    // Prune stale outputs (source removed or newly excluded).
    const expected = new Set(plan.map((p) => p.name));
    for (const name of await readdir(outDir)) {
      if (!expected.has(name)) {
        await rm(path.join(outDir, name), { force: true });
        report.pruned.push(`${src.folder}/${name}`);
      }
    }

    totalBefore += before;
    totalAfter += after;
    report.rows.push({ folder: src.folder, images: plan.length, processed, skipped, before, after });
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

  for (const e of excludes) {
    if (!usedExcludes.has(e.file)) report.warnings.push(`image-exclude.json entry matches no file: ${e.file}`);
  }

  await prepareBrand(report);

  // ---- Report ----
  console.log('\n\nImage preparation report');
  console.log('='.repeat(96));
  console.log(`${'Folder'.padEnd(36)}${'Images'.padStart(7)}${'New'.padStart(6)}${'Skipped'.padStart(9)}${'Before'.padStart(12)}${'After'.padStart(12)}${'Saved'.padStart(8)}`);
  for (const r of report.rows) {
    const saved = r.before ? `${Math.round((1 - r.after / r.before) * 100)}%` : '—';
    console.log(`${r.folder.padEnd(36)}${String(r.images).padStart(7)}${String(r.processed).padStart(6)}${String(r.skipped).padStart(9)}${formatBytes(r.before).padStart(12)}${formatBytes(r.after).padStart(12)}${saved.padStart(8)}`);
  }
  console.log('-'.repeat(96));
  const totalImages = report.rows.reduce((n, r) => n + r.images, 0);
  const totalSaved = totalBefore ? `${Math.round((1 - totalAfter / totalBefore) * 100)}%` : '—';
  console.log(`${'TOTAL'.padEnd(36)}${String(totalImages).padStart(7)}${''.padStart(6)}${''.padStart(9)}${formatBytes(totalBefore).padStart(12)}${formatBytes(totalAfter).padStart(12)}${totalSaved.padStart(8)}`);

  const section = (title, items) => {
    if (items.length === 0) return;
    console.log(`\n${title} (${items.length})`);
    for (const item of items) console.log(`  - ${item}`);
  };
  section('Excluded by scripts/image-exclude.json', report.excluded);
  section('Videos (not copied; list them in CONTENT_TODO.md)', report.videos);
  section('Folders with no usable images (hold these projects back)', report.noUsable);
  section('Unrecognized files (ignored)', report.unknown);
  section('Pruned stale outputs', report.pruned);
  section('Brand files copied', report.brand);
  section('Warnings', report.warnings);
  section('ERRORS', report.errors);

  if (report.errors.length > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
