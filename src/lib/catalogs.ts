/**
 * Catalogs for /catalog/: the display config (src/config/catalogs.ts) joined with what
 * `npm run images` produced (src/assets/catalogs/catalogs.json + cover images).
 * A configured catalog whose PDF hasn't been prepared fails the build, so a broken
 * link can't ship.
 */
import type { ImageMetadata } from 'astro';
import { catalogConfig } from '../config/catalogs';
import type { Product } from '../config/taxonomy';
import manifest from '../assets/catalogs/catalogs.json';

interface ManifestEntry {
  source: string;
  slug: string;
  file: string;
  bytes: number;
  pages: number;
  pageAspect: number;
  cover: string | null;
}

export interface Catalog {
  slug: string;
  title: string;
  product: Product;
  description: string;
  /** Public URL of the PDF. */
  href: string;
  /** File name offered on download. */
  downloadName: string;
  bytes: number;
  /** e.g. "37.7 MB" */
  size: string;
  pages: number;
  cover: ImageMetadata | null;
}

const covers = import.meta.glob<{ default: ImageMetadata }>('/src/assets/catalogs/*.jpg', { eager: true });

/** Decimal megabytes with one decimal ("39.5 MB"), the way browsers and phones label downloads. */
export const formatMegabytes = (bytes: number) => `${(bytes / 1_000_000).toFixed(1)} MB`;

export function getCatalogs(): Catalog[] {
  const entries = manifest as ManifestEntry[];
  return catalogConfig.map((config) => {
    const entry = entries.find((e) => e.source === config.source);
    if (!entry) {
      throw new Error(
        `Catalog "${config.source}" isn't prepared. Put it in /assets/catalogs/ and run \`npm run images\` (src/config/catalogs.ts).`,
      );
    }
    const cover = entry.cover ? (covers[`/src/assets/catalogs/${entry.cover}`]?.default ?? null) : null;
    return {
      slug: entry.slug,
      title: config.title,
      product: config.product,
      description: config.description,
      href: entry.file,
      downloadName: `${config.title}.pdf`,
      bytes: entry.bytes,
      size: formatMegabytes(entry.bytes),
      pages: entry.pages,
      cover,
    };
  });
}
