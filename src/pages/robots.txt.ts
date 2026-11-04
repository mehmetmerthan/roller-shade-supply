import type { APIRoute } from 'astro';
import { isProduction } from '../config/site';

/**
 * Staging builds (anything but a launched production build) block all crawlers
 * and don't advertise the sitemap. See SITE_ENV in src/config/site.ts.
 */
export const GET: APIRoute = ({ site }) => {
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : `# Staging build: not for indexing.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
