// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { PLACEHOLDER_URL } from './src/config/site.ts';

/**
 * Canonical origin. Preview deploys set SITE_URL to their netlify.app URL
 * (npm run deploy:preview); everything else uses the placeholder domain.
 * Pages stay noindex either way until `features.launched` (src/config/site.ts).
 */
const SITE_URL = (process.env.SITE_URL || PLACEHOLDER_URL).replace(/\/+$/, '');

/** Paths that must never appear in the sitemap (all are noindex). */
const SITEMAP_EXCLUDE = new Set([
  '/styleguide/',
  '/request-a-quote/thank-you/',
  '/404/',
]);

export default defineConfig({
  // TODO(content): the production domain is a placeholder (PLACEHOLDER_URL in src/config/site.ts).
  site: SITE_URL,
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
