/**
 * Page titles and meta descriptions from docs/additional-content.md §9, for the pages
 * that exist (Home is a one-page site since 11/05/2026; the product, industry, About,
 * FAQ, How to Measure, and Contact drafts stay in the doc).
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
  '/projects/': {
    title: 'Commercial Window Covering Projects | Roller Shade Supply',
    description:
      'Browse completed multifamily, commercial, school, and public-sector window covering projects by Roller Shade Supply across Chicago and the suburbs.',
  },
  '/catalog/': {
    title: 'Fabric Catalogs | Roller Shade Supply',
    description:
      'Browse our roller shade and zebra shade fabric catalogs. View each PDF in your browser, or download it to share with your team and choose fabrics.',
  },
  '/request-a-quote/': {
    title: 'Request a Quote for Commercial Shades | Roller Shade Supply',
    description:
      'Request a fast quote for roller shades, zebra shades, or faux wood blinds. Send sizes, quantities, and your timeline, or upload plans or a window list.',
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
  '/request-a-quote/thank-you/': {
    title: 'Quote Request Received | Roller Shade Supply',
    description:
      'Thanks for your quote request. Our team will review your project details and reply by email. Call us if your timeline is urgent or you’d like to add details.',
  },
  '/404/': {
    title: 'Page Not Found | Roller Shade Supply',
    description:
      'The page you were looking for isn’t here. Browse completed window covering projects, see our products, or request a quote from Roller Shade Supply.',
  },
} satisfies Record<string, PageMeta>;
