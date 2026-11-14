/**
 * Fabric catalogs shown on /catalog/, in this order. Each entry names a PDF in
 * /assets/catalogs/ (exact file name); `npm run images` copies it to public/catalogs/
 * and takes its cover from page 1 (src/assets/catalogs/catalogs.json has the details).
 *
 * Titles are the client's (11/14/2026). TODO(content): the descriptions are drafted
 * from the catalogs' contents and need client confirmation (CONTENT_TODO.md §4).
 */
import type { Product } from './taxonomy';

export interface CatalogConfig {
  /** File name in /assets/catalogs/. */
  source: string;
  title: string;
  /** The product the catalog covers (used for the "Get pricing" link). */
  product: Product;
  description: string;
}

export const catalogConfig: CatalogConfig[] = [
  {
    source: 'Roller blinds fabric catalogue for Ninegard.pdf',
    title: 'Roller Blinds Fabric Catalogue for Ninegard',
    product: 'roller-shades',
    description:
      'Roller shade fabrics by series, with the width and openness of each series and a swatch for every color code.',
  },
  {
    source: 'Zebra Blinds Fabric Catalog.pdf',
    title: 'Zebra Blinds Fabric Catalog',
    product: 'zebra-shades',
    description:
      'Zebra shade fabrics by series, with the width and shading degree of each series and a swatch for every color code.',
  },
];
