/**
 * Single source of truth for company details, feature flags, and the build
 * environment. Never hard-code the email in components. The site shows no phone
 * number, street address, or business hours (client decision, 11/17/2026).
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

  /**
   * The only contact detail on the site (client decision, 11/17/2026: no phone number,
   * street address, or business hours anywhere). Quote requests from the form are also
   * emailed here (a Netlify form notification; see CLAUDE.md "Preview deploys").
   * TODO(content): the domain has no mail server (MX records) yet, so this inbox
   * can't receive mail until the client sets one up (CONTENT_TODO.md §1).
   */
  email: 'info@rollershadesupply.com',

  serviceArea: {
    /** Approved wording. */
    summary: 'Chicago and the surrounding area',
    /** For structured data (areaServed). Not an address. */
    city: 'Chicago',
    region: 'IL',
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
