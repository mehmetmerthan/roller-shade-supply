/**
 * Single source of truth for navigation (header, mobile menu, footer).
 * Labels follow docs/approved-copy.md and docs/additional-content.md §10.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  /** Present for items that open a dropdown (Products, Industries). */
  children?: NavLink[];
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const productLinks: NavLink[] = [
  { label: 'Roller Shades', href: '/products/roller-shades/' },
  { label: 'Zebra Shades', href: '/products/zebra-shades/' },
  { label: 'Faux Wood Blinds', href: '/products/faux-wood-blinds/' },
  { label: 'Operating Systems', href: '/products/operating-systems/' },
];

export const industryLinks: NavLink[] = [
  { label: 'Multifamily', href: '/industries/multifamily/' },
  { label: 'Commercial', href: '/industries/commercial/' },
  { label: 'Education', href: '/industries/education/' },
  { label: 'Government & Public Sector', href: '/industries/government-public-sector/' },
];

export const mainNav: NavItem[] = [
  { label: 'Products', href: '/products/', children: productLinks },
  { label: 'Industries', href: '/industries/', children: industryLinks },
  { label: 'Projects', href: '/projects/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/** Primary conversion. Approved label. */
export const quoteCta: NavLink = { label: 'Request a Quote', href: '/request-a-quote/' };

/** Sticky bottom bar on mobile. The call link's href comes from site.phone. */
export const mobileActions = {
  callLabel: 'Call',
  quoteLabel: 'Get a Quote',
  quoteHref: quoteCta.href,
} as const;

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Products',
    links: [{ label: 'All Products', href: '/products/' }, ...productLinks],
  },
  {
    heading: 'Industries',
    links: [{ label: 'All Industries', href: '/industries/' }, ...industryLinks],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Projects', href: '/projects/' },
      { label: 'How to Measure', href: '/how-to-measure/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Contact', href: '/contact/' },
      quoteCta,
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Accessibility', href: '/accessibility/' },
];
