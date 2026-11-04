/**
 * Video helpers for scripts/prepare-images.mjs (ffmpeg + ffprobe on PATH, or set
 * FFMPEG_PATH / FFPROBE_PATH).
 */
import { spawn } from 'node:child_process';
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const FFPROBE = process.env.FFPROBE_PATH || 'ffprobe';

/** Web videos target this size or less. */
export const VIDEO_TARGET_BYTES = 4.5 * 1024 * 1024;
const MAX_VIDEO_KBPS = 900;
const MIN_VIDEO_KBPS = 250;

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { windowsHide: true });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('error', (err) =>
      reject(err.code === 'ENOENT' ? new Error(`${cmd} not found. Install ffmpeg or set FFMPEG_PATH/FFPROBE_PATH.`) : err),
    );
    child.on('close', (code) =>
      code === 0 ? resolve(stdout) : reject(new Error(`${path.basename(cmd)} exited ${code}: ${stderr.trim().split('\n').slice(-3).join(' | ')}`)),
    );
  });
}

export async function probeVideo(file) {
  const out = await run(FFPROBE, [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height:format=duration',
    '-of', 'json',
    file,
  ]);
  const json = JSON.parse(out);
  return {
    width: json.streams?.[0]?.width ?? null,
    height: json.streams?.[0]?.height ?? null,
    duration: Number(json.format?.duration ?? 0),
  };
}

/** Laplacian variance: a simple sharpness score (higher = sharper). */
async function sharpness(buffer) {
  const { data } = await sharp(buffer)
    .greyscale()
    .convolve({ width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0] })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let sum = 0;
  let sq = 0;
  for (const v of data) {
    sum += v;
    sq += v * v;
  }
  const n = data.length;
  return sq / n - (sum / n) ** 2;
}

/**
 * Returns the sharpest frame (PNG buffer) within ±0.5 s of `seconds`.
 * Decodes one second of video at 10 fps and scores each frame.
 */
export async function sharpestFrame(file, seconds, duration) {
  const tmp = await mkdtemp(path.join(os.tmpdir(), 'rss-frames-'));
  try {
    const start = Math.max(0, Math.min(seconds - 0.5, Math.max(0, duration - 1)));
    await run(FFMPEG, ['-v', 'error', '-ss', String(start), '-i', file, '-t', '1', '-vf', 'fps=10', path.join(tmp, '%02d.png')]);
    let best = null;
    for (const name of await readdir(tmp)) {
      const buf = await readFile(path.join(tmp, name));
      const score = await sharpness(buf);
      if (!best || score > best.score) best = { buf, score };
    }
    if (!best) throw new Error(`no frame decoded near ${seconds}s`);
    return best.buf;
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

/**
 * Two-pass H.264 web encode sized to VIDEO_TARGET_BYTES. Audio is removed and all
 * container metadata (including any location tags) is stripped. Adds faststart.
 */
export async function encodeWebVideo(file, outPath, duration) {
  const kbps = Math.max(
    MIN_VIDEO_KBPS,
    Math.min(MAX_VIDEO_KBPS, Math.floor((VIDEO_TARGET_BYTES * 8) / Math.max(duration, 1) / 1000 * 0.97)),
  );
  const tmp = await mkdtemp(path.join(os.tmpdir(), 'rss-encode-'));
  const passlog = path.join(tmp, 'pass');
  const common = [
    '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-b:v', `${kbps}k`, '-maxrate', `${Math.round(kbps * 1.5)}k`, '-bufsize', `${kbps * 2}k`,
    '-an', '-map_metadata', '-1', '-passlogfile', passlog,
  ];
  try {
    await run(FFMPEG, ['-v', 'error', '-y', '-i', file, ...common, '-pass', '1', '-f', 'mp4', os.devNull]);
    await run(FFMPEG, ['-v', 'error', '-y', '-i', file, ...common, '-pass', '2', '-movflags', '+faststart', outPath]);
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
  return kbps;
}
