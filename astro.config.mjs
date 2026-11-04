// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site.ts';

/** Paths that must never appear in the sitemap (all are noindex). */
const SITEMAP_EXCLUDE = new Set([
  '/styleguide/',
  '/request-a-quote/thank-you/',
  '/contact/thank-you/',
  '/404/',
]);

export default defineConfig({
  // TODO(content): production domain is a placeholder (see src/config/site.ts).
  site: site.url,
  output: 'static',
  trailingSlash: 'always',
  // Astro 7 defaults to 'jsx' whitespace handling, which can drop spaces between
  // inline elements in copy. Keep the predictable HTML-collapsing behavior.
  compressHTML: true,
  image: {
    // Sharp plus exact focal-point crops for `position="50% 35%"` (src/lib/image-service.ts).
    service: { entrypoint: './src/lib/image-service.ts' },
  },
  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.has(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
