/**
 * Single source of truth for navigation (header, mobile menu, footer).
 *
 * The site is one long Home page plus the project gallery and the quote form
 * (client decision, 11/05/2026). The header links scroll to Home sections, so
 * every section's `id` comes from `homeSections` below. The links are written as
 * "/#id" so they also work from every other page.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** A Home section with an anchor. `id` is the section element's id on Home. */
export interface SectionLink extends NavLink {
  id: string;
}

/** A header item: a Home section (scroll-spy marks it) or a page of its own. */
export type MainNavItem = SectionLink | (NavLink & { id?: undefined });

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

const section = (id: string, label: string): SectionLink => ({ id, label, href: `/#${id}` });

/** Home sections, in page order. Labels are the sections' approved headings (shortened where noted). */
export const homeSections = {
  whoWeAre: section('who-we-are', 'Who We Are'),
  whoWeServe: section('who-we-serve', 'Who We Serve'),
  whyUs: section('why-work-with-us', 'Why Work With Us'),
  // TODO(content): short label for "Government and Public-Sector Experience".
  publicSector: section('public-sector', 'Public-Sector Experience'),
  products: section('products', 'Our Products'),
  projects: section('projects', 'Selected Projects'),
  fastQuote: section('fast-quote', 'Get a Fast Quote'),
  contact: section('contact', 'Contact'),
} as const;

/** The fabric catalogs page (client request, 11/14/2026). */
export const catalogPage: NavLink = { label: 'Catalog', href: '/catalog/' };

/**
 * Header and mobile menu. Home sections in page order, with Catalog (its own page)
 * after Our Products. "Projects" is the short label for Selected Projects.
 */
export const mainNav: MainNavItem[] = [
  homeSections.whoWeAre,
  homeSections.whoWeServe,
  homeSections.products,
  catalogPage,
  { ...homeSections.projects, label: 'Projects' },
  homeSections.contact,
];

/** Primary conversion. Approved label. */
export const quoteCta: NavLink = { label: 'Request a Quote', href: '/request-a-quote/' };

/** The full project gallery (approved CTA label "View Project Gallery"). */
export const projectsPage: NavLink = { label: 'Project Gallery', href: '/projects/' };

/** Sticky bottom bar on mobile. The call link's href comes from site.phone. */
export const mobileActions = {
  callLabel: 'Call',
  quoteLabel: 'Get a Quote',
  quoteHref: quoteCta.href,
} as const;

// TODO(content): footer column headings are new microcopy.
export const footerColumns: FooterColumn[] = [
  {
    heading: 'Company',
    links: [homeSections.whoWeAre, homeSections.whoWeServe, homeSections.whyUs, homeSections.publicSector],
  },
  {
    heading: 'Our Work',
    // TODO(content): "Fabric Catalogs" is new microcopy.
    links: [homeSections.products, { label: 'Fabric Catalogs', href: catalogPage.href }, homeSections.projects, projectsPage],
  },
  {
    heading: 'Get a Quote',
    links: [homeSections.fastQuote, quoteCta, { label: 'Contact Us', href: homeSections.contact.href }],
  },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Accessibility', href: '/accessibility/' },
];
