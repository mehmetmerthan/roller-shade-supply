#!/usr/bin/env node
/**
 * npm run check:projects — every project folder has a content entry, and vice versa.
 * Runs before every build.
 *
 * Live entries:  src/content/projects/<slug>.md   (published)
 * Held entries:  src/content/projects/_<slug>.md  (held back: no page, never listed)
 *
 * Fails when:
 *   - an output folder in src/assets/projects/ with images has no live entry, or more than one;
 *   - a live entry points to a folder with no images;
 *   - an entry's file name isn't the slug of its folder (CLAUDE.md rule 1);
 *   - `cover` or `photos[].file` names a file that isn't in the folder;
 *   - a self-hosted `videos[].src` / `poster` isn't in public/videos/;
 *   - (only when /assets exists) a source folder with images has no live or held entry.
 * Warns when:
 *   - a held entry's folder now has usable images ("ready to enable");
 *   - a title differs from its folder name;
 *   - photos lack alt text in frontmatter (the fallback alt will be used);
 *   - a cover is web-sourced or a video still while a client photo exists, or is low-res.
 * Source-side checks are skipped when /assets is absent (CI: it's gitignored).
 */
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { parse as parseYaml } from 'yaml';
import {
  CONTENT_DIR,
  ROOT,
  SRC_PROJECTS_DIR,
  findSourceFolders,
  listOutputImages,
  slugify,
} from './lib/shared.mjs';

const PUBLIC_DIR = path.join(ROOT, 'public');
/** Covers smaller than this on the long edge get a pre-launch warning. */
const MIN_COVER_EDGE = 1280;
const naturalSort = (a, b) => a.localeCompare(b, 'en', { numeric: true });

const errors = [];
const warnings = [];
const notices = [];

function readFrontmatter(text, file) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    errors.push(`${file}: missing frontmatter.`);
    return null;
  }
  try {
    return parseYaml(match[1]) ?? {};
  } catch (err) {
    errors.push(`${file}: invalid YAML frontmatter (${err.message.split('\n')[0]}).`);
    return null;
  }
}

async function main() {
  // Output folders that contain images.
  const outputFolders = new Map();
  if (existsSync(SRC_PROJECTS_DIR)) {
    for (const entry of await readdir(SRC_PROJECTS_DIR, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const images = await listOutputImages(path.join(SRC_PROJECTS_DIR, entry.name));
      if (images.length > 0) outputFolders.set(entry.name, images);
    }
  }

  // Content entries.
  const live = [];
  const held = [];
  if (existsSync(CONTENT_DIR)) {
    for (const file of (await readdir(CONTENT_DIR)).filter((f) => f.endsWith('.md'))) {
      const data = readFrontmatter(await readFile(path.join(CONTENT_DIR, file), 'utf8'), file);
      if (!data) continue;
      const isHeld = file.startsWith('_');
      const slug = file.replace(/^_/, '').replace(/\.md$/, '');
      const entry = { file, slug, data, isHeld };
      (isHeld ? held : live).push(entry);

      if (typeof data.folder !== 'string' || data.folder.length === 0) {
        errors.push(`${file}: frontmatter "folder" is missing.`);
        continue;
      }
      const expectedSlug = slugify(data.folder);
      if (slug !== expectedSlug) {
        errors.push(`${file}: file name should be "${isHeld ? '_' : ''}${expectedSlug}.md" for folder "${data.folder}".`);
      }
      // Rule 1: the title is the folder name as written, except that an all-lowercase
      // or "-"/"_"-separated name is shown in Title Case ("the-henry" → "The Henry").
      const titleCased = data.folder
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
      const mayTitleCase = data.folder === data.folder.toLowerCase() || /[-_]/.test(data.folder);
      if (data.title !== data.folder && !(mayTitleCase && data.title === titleCased)) {
        warnings.push(`${file}: title "${data.title}" differs from folder "${data.folder}" (rule 1: display the folder name as written).`);
      }
    }
  }

  // Live entries ↔ output folders.
  const liveByFolder = new Map();
  for (const entry of live) {
    const folder = entry.data.folder;
    if (typeof folder !== 'string') continue;
    if (liveByFolder.has(folder)) {
      errors.push(`Folder "${folder}" has more than one live entry: ${liveByFolder.get(folder).file}, ${entry.file}.`);
      continue;
    }
    liveByFolder.set(folder, entry);

    const images = outputFolders.get(folder);
    if (!images) {
      errors.push(`${entry.file}: folder "${folder}" has no images in src/assets/projects/. Run \`npm run images\`, or hold it back by renaming it to _${entry.slug}.md.`);
      continue;
    }
    const available = new Set(images);
    if (entry.data.cover && !available.has(entry.data.cover)) {
      errors.push(`${entry.file}: cover "${entry.data.cover}" is not in "${folder}".`);
    }
    const photos = Array.isArray(entry.data.photos) ? entry.data.photos : [];
    for (const photo of photos) {
      if (!available.has(photo?.file)) errors.push(`${entry.file}: photos[].file "${photo?.file}" is not in "${folder}".`);
    }
    const described = new Set(photos.filter((p) => p?.alt).map((p) => p.file));
    const missingAlt = images.filter((img) => !described.has(img));
    if (missingAlt.length > 0) {
      warnings.push(`${entry.file}: ${missingAlt.length} photo(s) without frontmatter alt text (fallback alt will be used).`);
    }

    // Cover quality (rule: web-sourced or low-res images aren't covers when a better photo exists).
    const coverFile = entry.data.cover ?? images.find((i) => /^cover\./.test(i)) ?? [...images].sort(naturalSort)[0];
    const coverMeta = photos.find((p) => p?.file === coverFile);
    const hasClientPhoto = images.some((img) => !photos.find((p) => p?.file === img)?.origin);
    if (coverMeta?.origin && hasClientPhoto) {
      warnings.push(`${entry.file}: cover "${coverFile}" is ${coverMeta.origin === 'web' ? 'web-sourced' : 'a video still'}, but a client photo exists.`);
    }
    if (available.has(coverFile)) {
      const { width = 0, height = 0 } = await sharp(path.join(SRC_PROJECTS_DIR, folder, coverFile)).metadata();
      if (Math.max(width, height) < MIN_COVER_EDGE) {
        warnings.push(`${entry.file}: cover "${coverFile}" is ${width}×${height} (under ${MIN_COVER_EDGE} px on the long edge). Replace before launch.`);
      }
    }

    // Self-hosted videos and posters must exist in public/.
    for (const video of Array.isArray(entry.data.videos) ? entry.data.videos : []) {
      for (const ref of [video?.src, video?.poster]) {
        if (typeof ref === 'string' && ref.startsWith('/videos/') && !existsSync(path.join(PUBLIC_DIR, ref))) {
          errors.push(`${entry.file}: video file "${ref}" is not in public/. Run \`npm run images\`.`);
        }
      }
    }
  }

  for (const [folder, images] of outputFolders) {
    if (!liveByFolder.has(folder)) {
      const heldEntry = held.find((h) => h.data.folder === folder);
      if (heldEntry) {
        warnings.push(`Ready to enable: "${folder}" now has ${images.length} image(s). Rename ${heldEntry.file} → ${heldEntry.slug}.md.`);
      } else {
        errors.push(`Folder "${folder}" has ${images.length} image(s) but no entry. Create src/content/projects/${slugify(folder)}.md.`);
      }
    }
  }

  // Source side (/assets present only).
  const sources = await findSourceFolders();
  if (sources.length > 0) {
    const known = new Set([...live, ...held].map((e) => e.data.folder));
    for (const src of sources) {
      if (known.has(src.folder)) continue;
      if (src.images.length > 0) {
        errors.push(`Source folder "${src.folder}" has images but no live or held entry.`);
      } else {
        warnings.push(`Source folder "${src.folder}" has no images and no entry.`);
      }
    }
    for (const h of held) {
      if (!sources.some((s) => s.folder === h.data.folder)) {
        warnings.push(`${h.file}: folder "${h.data.folder}" not found in /assets.`);
      }
    }
  } else {
    notices.push('/assets not found: source-folder checks skipped (expected on CI).');
  }

  for (const h of held) notices.push(`Held back: ${h.data.folder ?? h.file} (${h.file})`);

  // ---- Report ----
  const featured = live.filter((e) => e.data.featured === true).length;
  console.log(`check:projects — ${live.length} live, ${held.length} held, ${featured} featured, ${outputFolders.size} image folders`);
  for (const n of notices) console.log(`  · ${n}`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
  for (const e of errors) console.log(`  ✖ ${e}`);
  if (errors.length > 0) {
    console.log(`\n${errors.length} error(s). Fix them before building.`);
    process.exit(1);
  }
  console.log('  ✓ Project folders and content entries match.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
