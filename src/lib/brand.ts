/**
 * Brand files in src/assets/brand/ (copied from /assets/brand/ by `npm run images`).
 * TODO(content): the current logo files are TEMPORARY PLACEHOLDERS (CONTENT_TODO.md §2).
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/brand/*.{svg,png}', { eager: true });

const find = (base: string) =>
  Object.entries(files).find(([p]) => new RegExp(`/${base}\\.(svg|png)$`, 'i').test(p))?.[1].default;

/** Default logo (for light surfaces). */
export const logo = find('logo');
/** Light logo for dark surfaces, if the client supplied one. */
export const logoLight = find('logo-light');

if (!logo) throw new Error('No logo found in src/assets/brand/. Run `npm run images`.');
