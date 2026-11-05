/**
 * Structured data builders (docs/site-spec.md §6). Every value comes from
 * src/config/site.ts so name, address, and phone stay identical everywhere.
 */
import { site } from '../config/site';

export type JsonLd = Record<string, unknown>;

const abs = (path: string) => new URL(path, site.url).href;
const orgId = abs('/#organization');
const websiteId = abs('/#website');

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    name: site.name,
    url: abs('/'),
    inLanguage: site.locale,
    publisher: { '@id': orgId },
  };
}

function postalAddress(): JsonLd {
  const { street, city, region, postalCode, country } = site.address;
  return {
    '@type': 'PostalAddress',
    ...(street && { streetAddress: street }),
    addressLocality: city,
    addressRegion: region,
    ...(postalCode && { postalCode }),
    addressCountry: country,
  };
}

function areaServed(): JsonLd[] {
  return [
    { '@type': 'City', name: `${site.address.city}, ${site.address.region}` },
    ...site.serviceArea.counties.map((county) => ({
      '@type': 'AdministrativeArea',
      name: `${county} County, ${site.address.region}`,
    })),
  ];
}

/**
 * The company as one entity: an Organization (logo, contact point, profiles) that is
 * also a LocalBusiness (address, hours, service area). Used on Home and Contact.
 */
export function businessSchema(logoUrl: string): JsonLd {
  const sameAs = [site.social.linkedin].filter(Boolean);
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': orgId,
    name: site.name,
    description: site.description,
    url: abs('/'),
    logo: abs(logoUrl),
    image: abs(logoUrl),
    telephone: site.phone.e164,
    email: site.email.general,
    address: postalAddress(),
    areaServed: areaServed(),
    openingHoursSpecification: site.hours.schema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: site.phone.e164,
      email: site.email.quotes,
      areaServed: 'US',
      availableLanguage: 'English',
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}

/** One <script type="application/ld+json"> payload, with `<` escaped for safe inlining. */
export function serializeJsonLd(nodes: JsonLd[]): string {
  const doc = nodes.length === 1 ? { '@context': 'https://schema.org', ...nodes[0] } : { '@context': 'https://schema.org', '@graph': nodes };
  return JSON.stringify(doc).replace(/</g, '\\u003c');
}

/** /projects/: the project URLs in display order. */
export function itemListSchema(items: { name: string; href: string }[]): JsonLd {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: abs(item.href),
      name: item.name,
    })),
  };
}

/** A project page (site-spec §6): name, description, images, year, place, products. */
export function creativeWorkSchema(work: {
  name: string;
  description: string;
  href: string;
  images: string[];
  year: number;
  location: string;
  about: { name: string; href?: string }[];
}): JsonLd {
  return {
    '@type': 'CreativeWork',
    name: work.name,
    description: work.description,
    url: abs(work.href),
    image: work.images.map(abs),
    dateCreated: String(work.year),
    locationCreated: { '@type': 'Place', name: work.location },
    about: work.about.map((a) => ({ '@type': 'Thing', name: a.name, ...(a.href ? { url: abs(a.href) } : {}) })),
    creator: { '@id': orgId },
    inLanguage: site.locale,
  };
}
