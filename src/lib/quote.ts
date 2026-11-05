/**
 * Prefilled links to the quote form (docs/site-spec.md §7: "Prefill from the query
 * string", e.g. /request-a-quote/?product=zebra-shades&projectType=school).
 * The quote form (src/components/sections/QuoteForm.astro) reads the same vocabulary
 * and checks at build time that the labels match the approved options.
 */
import { quoteCta } from '../config/nav';
import type { Product, Sector } from '../config/taxonomy';

/** `projectType` values, one per approved "Project Type" option. */
export const QUOTE_PROJECT_TYPES = {
  multifamily: 'Multifamily housing',
  commercial: 'Commercial office',
  government: 'Government or public facility',
  school: 'School or educational facility',
  'new-construction': 'New construction',
  renovation: 'Renovation',
  other: 'Other',
} as const;
export type QuoteProjectType = keyof typeof QUOTE_PROJECT_TYPES;

/** The quote form's project type for each project sector. Mixed-use is apartments over retail. */
export const sectorToProjectType: Record<Sector, QuoteProjectType> = {
  multifamily: 'multifamily',
  commercial: 'commercial',
  education: 'school',
  government: 'government',
  'mixed-use': 'multifamily',
};

export function quoteHref(prefill: { product?: Product; projectType?: QuoteProjectType } = {}): string {
  const params = new URLSearchParams();
  if (prefill.product) params.set('product', prefill.product);
  if (prefill.projectType) params.set('projectType', prefill.projectType);
  const query = params.toString();
  return query ? `${quoteCta.href}?${query}` : quoteCta.href;
}
