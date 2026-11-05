/**
 * Controlled vocabularies shared by the content schema, filters, and page copy.
 * Keep in sync with the frontmatter schema documented in CLAUDE.md.
 */

export const SECTORS = ['multifamily', 'commercial', 'education', 'government', 'mixed-use'] as const;
export const INDUSTRIES = ['multifamily', 'commercial', 'education', 'government'] as const;
export const PRODUCTS = ['roller-shades', 'zebra-shades', 'faux-wood-blinds'] as const;
export const OPERATING_SYSTEMS = ['cordless', 'chain', 'motorized', 'solar-motorized'] as const;
export const PROJECT_TYPES = ['new-construction', 'renovation'] as const;
export const LABOR = ['union', 'non-union', 'not-specified'] as const;

export type Sector = (typeof SECTORS)[number];
export type Industry = (typeof INDUSTRIES)[number];
export type Product = (typeof PRODUCTS)[number];
export type OperatingSystem = (typeof OPERATING_SYSTEMS)[number];
export type ProjectType = (typeof PROJECT_TYPES)[number];
export type Labor = (typeof LABOR)[number];

export const sectorLabels: Record<Sector, string> = {
  multifamily: 'Multifamily',
  commercial: 'Commercial',
  education: 'Education',
  government: 'Government & Public',
  'mixed-use': 'Mixed-Use',
};

export const industryLabels: Record<Industry, string> = {
  multifamily: 'Multifamily',
  commercial: 'Commercial',
  education: 'Education',
  government: 'Government & Public Sector',
};

export const productLabels: Record<Product, string> = {
  'roller-shades': 'Roller Shades',
  'zebra-shades': 'Zebra Shades',
  'faux-wood-blinds': 'Faux Wood Blinds',
};

export const operatingSystemLabels: Record<OperatingSystem, string> = {
  cordless: 'Cordless',
  chain: 'Chain-operated',
  motorized: 'Motorized',
  'solar-motorized': 'Solar-powered motorized',
};

export const projectTypeLabels: Record<ProjectType, string> = {
  'new-construction': 'New construction',
  renovation: 'Renovation',
};

export const laborLabels: Record<Labor, string> = {
  union: 'Union',
  'non-union': 'Non-union',
  'not-specified': 'Not specified',
};
