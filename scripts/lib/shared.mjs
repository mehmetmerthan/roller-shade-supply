/**
 * Shared helpers for scripts/prepare-images.mjs and scripts/check-projects.mjs.
 */
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
export const ASSETS_DIR = path.join(ROOT, 'assets');
export const SRC_PROJECTS_DIR = path.join(ROOT, 'src', 'assets', 'projects');
export const SRC_BRAND_DIR = path.join(ROOT, 'src', 'assets', 'brand');
export const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'projects');
export const EXCLUDE_FILE = path.join(ROOT, 'scripts', 'image-exclude.json');
export const VIDEO_CONFIG_FILE = path.join(ROOT, 'scripts', 'video-config.json');
/** Web videos and posters. Fully managed by `npm run images`; don't put other files here. */
export const PUBLIC_VIDEOS_DIR = path.join(ROOT, 'public', 'videos');
/** PDF catalogs: originals in /assets/catalogs/, served copies in public/catalogs/, covers in src/assets/catalogs/. */
export const CATALOGS_SRC_DIR = path.join(ROOT, 'assets', 'catalogs');
export const PUBLIC_CATALOGS_DIR = path.join(ROOT, 'public', 'catalogs');
export const SRC_CATALOGS_DIR = path.join(ROOT, 'src', 'assets', 'catalogs');

/** Source image formats we accept in /assets (detected by content, not only by extension). */
export const SOURCE_IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic', '.heif', '.tif', '.tiff']);
/** Formats the site's galleries read from src/assets/projects. */
export const OUTPUT_IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
export const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm', '.avi', '.mkv']);
export const IGNORED_FILES = new Set(['.ds_store', 'thumbs.db', 'desktop.ini']);

/**
 * Kebab-case slug, per CLAUDE.md: "&" → "and", apostrophes and other punctuation
 * stripped, spaces, "_" and "-" treated as separators.
 *   "ERIK'S Bike Shop" → "eriks-bike-shop" · "IMG_2034" → "img-2034"
 */
export function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’‘`]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const isIgnored = (name) => name.startsWith('.') || IGNORED_FILES.has(name.toLowerCase());
export const extOf = (name) => path.extname(name).toLowerCase();

/**
 * Lists candidate project folders in /assets: every subfolder of /assets/projects/,
 * plus subfolders of /assets/ itself except the reserved "brand", "catalogs", and "projects".
 * Returns [] when /assets doesn't exist (e.g., on CI, where it's gitignored).
 */
export async function findSourceFolders() {
  if (!existsSync(ASSETS_DIR)) return [];
  const roots = [
    { dir: path.join(ASSETS_DIR, 'projects'), skip: new Set() },
    { dir: ASSETS_DIR, skip: new Set(['brand', 'catalogs', 'projects']) },
  ];
  const found = new Map();
  for (const { dir, skip } of roots) {
    if (!existsSync(dir)) continue;
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || skip.has(entry.name) || entry.name.startsWith('.')) continue;
      if (found.has(entry.name)) {
        throw new Error(`Project folder "${entry.name}" exists in both /assets and /assets/projects. Keep one.`);
      }
      const folderDir = path.join(dir, entry.name);
      const files = (await readdir(folderDir, { withFileTypes: true }))
        .filter((f) => f.isFile() && !isIgnored(f.name))
        .map((f) => f.name);
      found.set(entry.name, {
        folder: entry.name,
        dir: folderDir,
        relRoot: path.relative(ASSETS_DIR, dir),
        images: files.filter((f) => SOURCE_IMAGE_EXT.has(extOf(f))),
        videos: files.filter((f) => VIDEO_EXT.has(extOf(f))),
        other: files.filter((f) => !SOURCE_IMAGE_EXT.has(extOf(f)) && !VIDEO_EXT.has(extOf(f))),
      });
    }
  }
  return [...found.values()].sort((a, b) => a.folder.localeCompare(b.folder, 'en', { numeric: true }));
}

/**
 * Reads scripts/image-exclude.json: [{ "file": "<Folder>/<file name>", "reason": "..." }].
 * Paths are relative to the folder's root (/assets/projects/ or /assets/).
 */
export async function readExcludes() {
  if (!existsSync(EXCLUDE_FILE)) return [];
  const list = JSON.parse(await readFile(EXCLUDE_FILE, 'utf8'));
  if (!Array.isArray(list)) throw new Error('scripts/image-exclude.json must be an array.');
  return list.map((item, i) => {
    if (typeof item?.file !== 'string' || typeof item?.reason !== 'string') {
      throw new Error(`image-exclude.json entry ${i} needs "file" and "reason" strings.`);
    }
    return { file: item.file.replace(/\\/g, '/'), reason: item.reason };
  });
}

export const excludeKey = (folder, file) => `${folder}/${file}`;

/**
 * Reads scripts/video-config.json → Map("<Folder>/<file>" → { frames: number[], poster: number }).
 */
export async function readVideoConfig() {
  if (!existsSync(VIDEO_CONFIG_FILE)) return new Map();
  const json = JSON.parse(await readFile(VIDEO_CONFIG_FILE, 'utf8'));
  const map = new Map();
  for (const [i, v] of (json.videos ?? []).entries()) {
    if (typeof v?.file !== 'string') throw new Error(`video-config.json videos[${i}] needs a "file" string.`);
    const frames = Array.isArray(v.frames) ? v.frames : [];
    if (!frames.every((t) => typeof t === 'number' && t >= 0)) {
      throw new Error(`video-config.json videos[${i}].frames must be seconds (numbers).`);
    }
    map.set(v.file.replace(/\\/g, '/'), { frames, poster: typeof v.poster === 'number' ? v.poster : 1 });
  }
  return map;
}

/** Short, stable id for a video file: the first 8 characters of its slug ("af3755da"). */
export const videoId = (file) => slugify(path.basename(file, path.extname(file))).slice(0, 8).replace(/-$/, '');

/** Output name of a still extracted from a video at `seconds`. */
export const videoFrameName = (file, seconds) => `video-${videoId(file)}-${String(Math.round(seconds)).padStart(2, '0')}s.jpg`;

/** Lists image files in an output folder in src/assets/projects/. */
export async function listOutputImages(folderDir) {
  if (!existsSync(folderDir)) return [];
  return (await readdir(folderDir, { withFileTypes: true }))
    .filter((f) => f.isFile() && OUTPUT_IMAGE_EXT.has(extOf(f.name)))
    .map((f) => f.name);
}

export const formatBytes = (n) =>
  n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;
