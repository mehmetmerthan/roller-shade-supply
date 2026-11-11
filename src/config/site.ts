/**
 * Single source of truth for company details, feature flags, and the build
 * environment. Never hard-code the phone, email, or address in components.
 *
 * Every value marked TODO(content) is a placeholder from
 * docs/additional-content.md §1 until the client confirms it (see CONTENT_TODO.md).
 */

/** The intended production domain. TODO(content): unconfirmed. */
export const PLACEHOLDER_URL = 'https://www.rollershadesupply.com';

export const site = {
  name: 'Roller Shade Supply',
  /** Approved H1 / tagline. */
  tagline: 'Commercial Window Coverings for Chicago’s Building Professionals',
  /** Approved short footer description. */
  description:
    'Roller Shade Supply is a Chicago-based window covering supplier serving builders, contractors, multifamily developers, commercial organizations, and public-sector projects.',
  /**
   * Origin for canonical, Open Graph, and JSON-LD URLs: Astro's `site`, which
   * astro.config.mjs reads from the SITE_URL env variable (preview deploys) and
   * otherwise sets to PLACEHOLDER_URL. `import.meta.env` doesn't exist when
   * astro.config.mjs itself loads this file, hence the fallback.
   */
  url: (import.meta.env?.SITE ?? PLACEHOLDER_URL).replace(/\/+$/, ''),
  locale: 'en-US',
  timeZone: 'America/Chicago',

  phone: {
    // TODO(content): fictional 555 number.
    display: '(312) 555-0148',
    href: 'tel:+13125550148',
    e164: '+13125550148',
  },

  email: {
    // TODO(content): quote and general inboxes are unconfirmed.
    quotes: 'quotes@rollershadesupply.com',
    general: 'info@rollershadesupply.com',
  },

  address: {
    // TODO(content): show a street address, or the service area only?
    street: null as string | null,
    city: 'Chicago',
    region: 'IL',
    postalCode: null as string | null,
    country: 'US',
  },

  hours: {
    // TODO(content): business hours are unconfirmed.
    display: 'Monday–Friday, 8:00 AM – 5:00 PM CT',
    /** The same hours split for narrow columns (keep in sync with `display`). */
    days: 'Monday–Friday',
    time: '8:00 AM – 5:00 PM CT',
    schema: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
  },

  serviceArea: {
    /** Approved wording. */
    summary: 'Chicago and the surrounding area',
    // TODO(content): county list is unconfirmed.
    counties: ['Cook', 'DuPage', 'Lake', 'Will', 'Kane', 'McHenry'],
    // TODO(content): extended service area is unconfirmed (Water Power Lofts is in Rockford).
    extended: 'Larger projects elsewhere in Illinois and Northwest Indiana',
  },

  // TODO(content): quote turnaround is unconfirmed.
  quoteResponseTime: 'within one business day',

  social: {
    // TODO(content): LinkedIn URL, or hide.
    linkedin: null as string | null,
  },

  // TODO(content): optional, for the About page.
  founded: null as number | null,
} as const;

export const features = {
  /** Stays false until real, approved quotes with written permission exist. */
  testimonials: false,
  /**
   * Flip to true only at launch: the real domain is live and every placeholder
   * is approved. Until then every build is "staging", even Netlify production.
   */
  launched: false,
  /** Roll-down reveal in the hero window. Off for the approved direction. */
  heroReveal: false,
  /** Cookieless analytics. Disabled until an ID is set. */
  analytics: {
    provider: null as 'plausible' | 'cloudflare' | null,
    id: null as string | null,
  },
} as const;

/**
 * Build environment. Fail-safe: anything other than a launched Netlify
 * production build is "staging" (noindex, robots.txt Disallow, and
 * "Sample write-up" badges on placeholder projects).
 * Netlify sets CONTEXT to production | deploy-preview | branch-deploy | dev.
 */
const netlifyContext = process.env.CONTEXT;
export const SITE_ENV: 'production' | 'staging' =
  features.launched && netlifyContext === 'production' ? 'production' : 'staging';
export const isProduction = SITE_ENV === 'production';
