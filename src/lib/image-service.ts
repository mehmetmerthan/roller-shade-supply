/**
 * Image service: Astro's sharp service, plus focal-point crops.
 *
 * Project photos carry a CSS-style `position` ("50% 35%") so portrait shots crop well
 * into 4:3 cards and 16:9 heroes. Astro passes `position` straight to sharp, which only
 * understands keywords ("top", "left", ...). When a percentage position is used with
 * both width and height, this service extracts the exact crop at that focal point
 * (object-position semantics) and hands the result to the standard sharp pipeline.
 * Everything else goes to the stock service unchanged.
 */
import type { LocalImageService } from 'astro';
import sharpService from 'astro/assets/services/sharp';
import sharp from 'sharp';

const PERCENT_POSITION = /^(\d{1,3})%\s+(\d{1,3})%$/;
const base = sharpService as LocalImageService;

const service: LocalImageService = {
  ...base,
  async transform(inputBuffer, transform, imageConfig, logger) {
    const match = typeof transform.position === 'string' ? transform.position.match(PERCENT_POSITION) : null;
    if (!match || !transform.width || !transform.height) {
      return base.transform(inputBuffer, transform, imageConfig, logger);
    }

    const x = Math.min(100, Number(match[1])) / 100;
    const y = Math.min(100, Number(match[2])) / 100;
    const targetRatio = transform.width / transform.height;

    const rotated = await sharp(inputBuffer, { failOn: 'none' }).rotate().toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = rotated.info;

    let crop: { left: number; top: number; width: number; height: number };
    if (w / h > targetRatio) {
      const cw = Math.max(1, Math.round(h * targetRatio));
      crop = { left: Math.round((w - cw) * x), top: 0, width: cw, height: h };
    } else {
      const ch = Math.max(1, Math.round(w / targetRatio));
      crop = { left: 0, top: Math.round((h - ch) * y), width: w, height: ch };
    }

    const cropped = await sharp(rotated.data).extract(crop).toBuffer();
    // The crop already has the target aspect ratio, so the stock resize can't crop again.
    return base.transform(new Uint8Array(cropped), { ...transform, position: undefined }, imageConfig, logger);
  },
};

export default service;
