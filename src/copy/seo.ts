/**
 * Page titles and meta descriptions from docs/additional-content.md §9.
 * TODO(content): drafts until the client approves them (CONTENT_TODO.md §4).
 * Rules: title ≤ 60 characters (full, including the brand), description 140–160.
 * Project pages build theirs from frontmatter (title + `summary`).
 */
export interface PageMeta {
  /** Full document title, brand included. */
  title: string;
  description: string;
}

export const pageMeta = {
  '/': {
    title: 'Commercial Window Coverings Chicago | Roller Shade Supply',
    description:
      'Chicago supplier of commercial roller shades, zebra shades, and faux wood blinds for builders, contractors, multifamily developers, and public projects.',
  },
  '/about/': {
    title: 'Chicago Window Covering Supplier | Roller Shade Supply',
    description:
      'Roller Shade Supply is a Chicago-based, trade-focused window covering supplier for contractors, developers, property managers, and public-sector clients.',
  },
  '/products/': {
    title: 'Commercial Shades & Blinds | Roller Shade Supply',
    description:
      'Roller shades, zebra shades, and faux wood blinds for commercial, multifamily, and institutional projects, with cordless, chain, and motorized options.',
  },
  '/products/roller-shades/': {
    title: 'Commercial Roller Shades Chicago | Roller Shade Supply',
    description:
      'Commercial roller shades in light-filtering, blackout, and solar screen fabrics for offices, apartments, and schools across Chicago and the suburbs.',
  },
  '/products/zebra-shades/': {
    title: 'Zebra Shades for Offices & Multifamily | Roller Shade Supply',
    description:
      'Zebra shades combine light control and privacy for offices, common areas, and modern apartments. Trade and project pricing for Chicago-area buyers.',
  },
  '/products/faux-wood-blinds/': {
    title: 'Commercial Faux Wood Blinds | Roller Shade Supply',
    description:
      'Durable faux wood blinds for multifamily properties, offices, and high-use spaces. Moisture-resistant, easy to clean, and supplied for trade projects.',
  },
  '/products/operating-systems/': {
    title: 'Motorized, Solar & Cordless Shades | Roller Shade Supply',
    description:
      'Compare cordless, chain-operated, motorized, and solar-powered motorized shades for commercial and multifamily projects in the Chicago area.',
  },
  '/industries/multifamily/': {
    title: 'Multifamily Window Coverings Chicago | Roller Shade Supply',
    description:
      'Roller shades and faux wood blinds for Chicago multifamily developments, with consistent product across every unit and phased delivery for your schedule.',
  },
  '/industries/commercial/': {
    title: 'Commercial Office Window Shades | Roller Shade Supply',
    description:
      'Office window shades for glare control and privacy: solar screens, zebra shades, and motorized shades for commercial fit-outs across Chicagoland.',
  },
  '/industries/education/': {
    title: 'School Window Shades in Illinois | Roller Shade Supply',
    description:
      'Classroom, library, and auditorium window shades for schools. Experienced with summer schedules, documentation, and union and non-union projects.',
  },
  '/industries/government-public-sector/': {
    title: 'Government & Public-Sector Shades | Roller Shade Supply',
    description:
      'Window coverings for government and public facilities, with the coordination, documentation, and scheduling that institutional projects require.',
  },
  '/projects/': {
    title: 'Commercial Window Covering Projects | Roller Shade Supply',
    description:
      'Browse completed multifamily, commercial, school, and public-sector window covering projects by Roller Shade Supply across Chicago and the suburbs.',
  },
  '/request-a-quote/': {
    title: 'Request a Quote for Commercial Shades | Roller Shade Supply',
    description:
      'Request a fast quote for roller shades, zebra shades, or faux wood blinds. Send sizes, quantities, and your timeline, or upload plans or a window list.',
  },
  '/how-to-measure/': {
    title: 'How to Measure Windows for Shades | Roller Shade Supply',
    description:
      'How to measure windows for commercial roller shades and blinds: width × height in inches, inside vs. outside mount, and how to send a window schedule.',
  },
  '/faq/': {
    title: 'Commercial Window Shade FAQ | Roller Shade Supply',
    description:
      'Answers about quotes, measurements, products, union projects, and service area for builders, contractors, and property managers in the Chicago area.',
  },
  '/contact/': {
    title: 'Contact Our Chicago Team | Roller Shade Supply',
    description:
      'Contact Roller Shade Supply about commercial, multifamily, school, or public-sector window covering projects in Chicago and the surrounding area.',
  },
  '/privacy-policy/': {
    title: 'Privacy Policy | Roller Shade Supply',
    description:
      'How Roller Shade Supply collects, uses, and protects the information you share through our website, our quote request form, and our contact form.',
  },
  '/accessibility/': {
    title: 'Accessibility Statement | Roller Shade Supply',
    description:
      'Roller Shade Supply is committed to making our website accessible to everyone. Learn about our accessibility goals and how to report a problem.',
  },
} satisfies Record<string, PageMeta>;
