/**
 * Client-written copy from docs/approved-copy.md, verbatim.
 * APPROVED: light edits for layout only (splitting paragraphs, lists into cards).
 * Never change the meaning, add claims, or remove qualifiers.
 * Section IDs match the doc ([HERO], [WHO-WE-ARE], ...).
 */
import type { Product } from '../config/taxonomy';

/** [HERO] */
export const hero = {
  kicker: 'Roller Shade Supply',
  title: 'Commercial Window Coverings for Chicago’s Building Professionals',
  paragraphs: [
    'Roller Shade Supply is a Chicago-based supplier specializing in window covering solutions for builders, contractors, property managers, developers, and commercial organizations.',
    'We primarily serve trade and wholesale customers, providing dependable products and project support for multifamily developments, commercial properties, public facilities, and other large-scale projects.',
  ],
  primaryCta: 'Request a Quote',
  secondaryCta: 'View Our Projects',
} as const;

/** [WHO-WE-ARE] */
export const whoWeAre = {
  title: 'Who We Are',
  paragraphs: [
    'Roller Shade Supply provides practical and reliable window covering solutions for projects throughout Chicago and the surrounding area.',
    'Our business is built around the needs of professionals. We work closely with builders, contractors, developers, property managers, government agencies, schools, and businesses that need consistent products, responsive service, and dependable project coordination.',
    'From individual commercial spaces to multifamily developments and public-sector projects, we help our customers select the right window coverings for each application.',
    'We are equipped to support both union and non-union projects.',
  ],
} as const;

/** [WHO-WE-SERVE] */
export const whoWeServe = {
  title: 'Who We Serve',
  intro: 'We primarily work with:',
  audiences: [
    'Builders and general contractors',
    'Multifamily housing developers',
    'Property management companies',
    'Commercial offices and businesses',
    'Government agencies and public institutions',
    'Schools and educational facilities',
    'Wholesale and trade customers',
  ],
  note: 'Our services are designed primarily for commercial, wholesale, and project-based customers rather than individual residential purchases.',
} as const;

/** [PRODUCTS] */
export const products = {
  title: 'Our Products',
  intro:
    'We offer a focused selection of window covering products for commercial, multifamily, and institutional applications.',
  items: [
    {
      product: 'roller-shades',
      title: 'Roller Shades',
      description: 'Clean, versatile window coverings available in a variety of fabrics, colors, and operating options.',
    },
    {
      product: 'zebra-shades',
      title: 'Zebra Shades',
      description:
        'A modern combination of light control and privacy, designed for offices, common areas, and contemporary interiors.',
    },
    {
      product: 'faux-wood-blinds',
      title: 'Faux Wood Blinds',
      description: 'A durable and practical option suitable for multifamily properties, offices, and other high-use environments.',
    },
  ] satisfies { product: Product; title: string; description: string }[],
  operatingIntro: 'Available operating options include:',
  operatingOptions: [
    'Motorized shades',
    'Solar-powered motorized shades',
    'Cordless systems',
    'Chain-operated systems',
  ],
  note: 'Product availability and specifications may vary by project.',
} as const;

/** [GOVERNMENT] */
export const government = {
  title: 'Government and Public-Sector Experience',
  paragraphs: [
    'Roller Shade Supply has successfully completed government and public-sector projects, including window covering projects for multiple schools.',
    'We understand the coordination, documentation, scheduling, and site requirements involved in institutional work. Our ability to support both union and non-union projects allows us to serve a wide range of public and private-sector clients.',
  ],
} as const;

/** [PROJECTS] */
export const selectedProjects = {
  title: 'Selected Projects',
  paragraphs: [
    'Explore a selection of our completed commercial, multifamily, educational, and public-sector projects.',
    'Each project reflects our commitment to dependable products, professional coordination, and quality results.',
  ],
  cta: 'View Project Gallery',
} as const;

/** [FAST-QUOTE] */
export const fastQuote = {
  title: 'Get a Fast Quote',
  intro: 'The more information you provide, the faster and more accurately we can prepare your quote.',
  checklistIntro: 'Please include:',
  checklist: [
    'Product type',
    'Width and height of each window',
    'Quantity',
    'Preferred operating system',
    'Project location',
    'Expected timeline',
    'Any special requirements',
  ],
  exampleTitle: 'Example Request',
  example:
    'I need 20 roller shades, each approximately 50 inches wide by 50 inches high, for a multifamily project in Chicago. I am interested in cordless shades and would like delivery within six weeks.',
  measurementNote:
    'Measurements should be provided as width × height. If your windows have different measurements, you may include a separate list or upload a project schedule with your request.',
} as const;

/** [CONTACT] (intro and response note; the form fields live with the quote form). */
export const contact = {
  title: 'Let’s Discuss Your Project',
  intro:
    'Tell us what you are working on and what type of window coverings you need. Our team will review your request and contact you by email.',
  submitLabel: 'Submit Quote Request',
  responseNote: 'We respond to qualified project and wholesale inquiries by email.',
} as const;
