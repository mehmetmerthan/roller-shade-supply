# Site Specification — Roller Shade Supply

Detailed reference for building the site. `CLAUDE.md` holds the rules; this file holds the details. Read the relevant section before building that part.

Sections: 1 Design brief · 2 Sitemap & navigation · 3 Page specs · 4 Components · 5 Galleries & carousels · 6 SEO & structured data · 7 Quote form · 8 Images & media · 9 Accessibility · 10 Performance · 11 Analytics & deploy · 12 Launch checklist

---

## 1. Design brief

**Positioning.** The dependable trade partner for commercial window coverings in Chicagoland. The site should feel like a well-run construction project: organized, precise, on schedule. It should also show a refined feel for materials (fabric, light) that signals the products are good.

**Audience mindset.** GC project managers, developers, property managers, facilities directors, and procurement officers. They skim, compare vendors, look for proof (projects), and want to send a quote request fast, often from a phone on a job site.

**Mood words.** Architectural · Precise · Calm · Material · Trustworthy.
**Not:** boutique luxury, playful, techy/SaaS, home-décor retail.

**Direction exploration (plan mode).** Propose two distinct directions. Each needs: a name, a one-paragraph rationale, a palette (hex values plus contrast ratios for text pairs), a type pairing (display + text, both on Fontsource), a grid and spacing approach, one signature element, and a written sketch of the home-page hero. Starting points worth exploring (don't copy them; push further):
- **"Light, controlled"**: warm whites and linen, deep charcoal, one accent. Large photography. Bands of light and shadow as graphic devices. The hero photo is revealed by a roll-down mask on load.
- **"Chicago grid"**: a strict modular grid inspired by Chicago School architecture. A strong typographic scale. Spec-sheet details (thin rules, small-caps labels, numbered sections) that speak the language of submittals.

**Palette rules.** Start from the logo colors (sample them from the file). Add warm neutrals (paper/linen, stone, charcoal) and one accent for CTAs and focus states. Text contrast must be at least 4.5:1 for body text and 3:1 for large text and UI elements. Suggested tokens: `--color-ink`, `--color-paper`, `--color-stone-{50…900}`, `--color-accent`, `--color-accent-ink`, `--color-line`.

**Typography rules.** Two families at most: a characterful display face for headings (a confident grotesk or a refined serif) and a highly legible text face. Fluid type scale with `clamp()`. Body text 17–18 px on desktop, 60–75 characters per line. Small uppercase labels with letter-spacing for metadata (sector · location · year).

**Imagery rules.** Project photos lead everywhere. Keep aspect ratios consistent per context (4:3 cards; 3:2 or 16:9 hero). Use `object-position` to keep windows and shades in frame. No stock photos of people. Any illustrations (inside vs. outside mount, openness factors) are simple line drawings in the brand palette.

**Signature element ideas** (pick one or two and refine):
- **Roll-down reveal.** Images or sections reveal top-to-bottom like a shade lowering (CSS `clip-path`, 600–900 ms; none under `prefers-reduced-motion`).
- **Zebra bands.** Alternating translucent horizontal bands used as section dividers or as the hover state on project cards.
- **Openness visualizer** (Roller Shades page). A small island showing how 1%, 3%, 5%, and 10% openness fabrics change view-through and glare over a real project photo.

**Styleguide first.** Build `/styleguide/` (noindex, excluded from the sitemap) with colors, type scale, buttons, links, form fields, cards, badges, section headings, and spacing samples. Get approval before building pages.

---

## 2. Sitemap & navigation

| URL | Page | Indexed |
|---|---|---|
| `/` | Home | yes |
| `/about/` | About | yes |
| `/products/` | Products overview | yes |
| `/products/roller-shades/` | Roller Shades | yes |
| `/products/zebra-shades/` | Zebra Shades | yes |
| `/products/faux-wood-blinds/` | Faux Wood Blinds | yes |
| `/products/operating-systems/` | Operating Systems | yes |
| `/industries/multifamily/` | Multifamily | yes |
| `/industries/commercial/` | Commercial | yes |
| `/industries/education/` | Education | yes |
| `/industries/government-public-sector/` | Government & Public Sector | yes |
| `/projects/` | Projects index | yes |
| `/projects/[slug]/` | Project detail (one per folder) | yes |
| `/request-a-quote/` | Request a Quote | yes |
| `/request-a-quote/thank-you/` | Thank-you | **no** |
| `/how-to-measure/` | How to Measure | yes |
| `/faq/` | FAQ | yes |
| `/contact/` | Contact | yes |
| `/privacy-policy/` | Privacy Policy | yes |
| `/accessibility/` | Accessibility Statement | yes |
| `/404` | Not found | no |
| `/styleguide/` | Styleguide (dev only; remove or block before launch) | **no** |

**Header (desktop):** Logo · Products ▾ (Roller Shades, Zebra Shades, Faux Wood Blinds, Operating Systems) · Industries ▾ (Multifamily, Commercial, Education, Government & Public Sector) · Projects · About · Contact · phone number · **[Request a Quote]** button. Dropdowns must be keyboard and touch friendly (button with `aria-expanded`, not hover-only).

**Header (mobile):** Logo + menu button → full-screen menu. **Sticky bottom action bar:** "Call" (tel: link) and "Get a Quote".

**Footer:** logo + approved short description · contact details (from `site.ts`) · hours · service area · link columns (Products, Industries, Company) · "Union & non-union projects" badge · © {current year} Roller Shade Supply · Privacy Policy · Accessibility.

---

## 3. Page specs

Approved copy section IDs refer to `docs/approved-copy.md`; numbered sections refer to `docs/additional-content.md`.

### Home `/`
1. **Hero** — [HERO] H1 + both paragraphs, CTAs "Request a Quote" / "View Our Projects", large photo from a featured project. Trust strip below (§2).
2. **Who We Serve** — [WHO-WE-SERVE] the 7 audiences as a compact, scannable grid, plus the residential note.
3. **Products** — [PRODUCTS] 3 product cards + a row of the 4 operating options → product pages.
4. **Selected Projects** — [PROJECTS] carousel of featured projects (§5), "View Project Gallery" → `/projects/`.
5. **Government & Public-Sector Experience** — [GOVERNMENT] + links to education and government projects.
6. **Who We Are + Why Work With Us** — [WHO-WE-ARE] + value props (§3).
7. **How It Works** — process steps (§4).
8. **Get a Fast Quote** — [FAST-QUOTE] checklist + example request → CTA.
9. **Final CTA band** — "Let’s Discuss Your Project" ([CONTACT] intro line) → quote form.
The section order can be refined during design, but keep the flow: hero → proof → products → CTA.

### About `/about/`
[WHO-WE-ARE] in full · union & non-union · who we serve · public-sector experience · project support services (§7) · service area · CTA.

### Products overview and product pages
Overview: 3 products + operating systems summary. Each product page: approved intro + §5 body · where it's used (links to industries) · options (placeholder) · available operating systems · related projects (filtered by `products`) · 2–3 FAQ items · CTA linking to `/request-a-quote/?product=<slug>`. The Roller Shades page can host the openness visualizer. `/products/operating-systems/` explains all four systems with the comparison table (§5.4).

### Industry pages `/industries/<slug>/`
Copy from §6: H1 · intro · typical needs · recommended products and operating systems · how we help · related projects (filtered by `industries`) · CTA linking to `/request-a-quote/?projectType=<value>`.

### Projects index `/projects/`
[PROJECTS] intro. Filter chips: All · Multifamily · Commercial · Education · Government & Public · Mixed-Use (progressive enhancement: without JS, all projects show). Grid of ProjectCards (§5.2). ItemList JSON-LD.

### Project detail `/projects/[slug]/`
Breadcrumbs → H1 (project title) → meta row (sector · location · year · new construction/renovation · union/non-union) → main gallery (§5.3) → Overview / The Challenge / Our Solution / The Result → spec panel (products, fabrics, operating systems, scope, timeline, client type) → highlights → links to related product and industry pages → previous/next project → CTA "Planning a similar project?" linking to a prefilled quote form.

### Request a Quote `/request-a-quote/`
[FAST-QUOTE] checklist and example request beside the form (§7). A short "How to measure" summary linking to `/how-to-measure/`. The approved response note under the submit button.

### Thank-you `/request-a-quote/thank-you/` (noindex)
Copy from §10. Fires the `quote_submitted` analytics event.

### How to Measure `/how-to-measure/`
Width × height in inches · inside vs. outside mount (simple SVG diagram) · measuring many windows · uploading a window schedule · "approximate sizes are fine for budgeting; final sizes are verified before production" [CONFIRM] · CTA.

### FAQ `/faq/`
Native `<details>` accordion grouped by topic (§8). FAQPage JSON-LD.

### Contact `/contact/`
Phone, email, hours, service area, address if provided · short general-inquiry form (name, company, email, phone, message) · prominent link to the full quote form.

### Legal & utility
`/privacy-policy/` and `/accessibility/` from §11 (flagged for legal review). 404 page from §10.

---

## 4. Components (minimum set)

BaseLayout (SEO head, skip link, `lang="en-US"`) · Header · DesktopDropdown · MobileMenu · MobileActionBar · Footer · Button (primary / secondary / ghost; sm / md / lg) · SectionHeading (eyebrow, title, intro) · Breadcrumbs · TrustStrip · ProjectCard · ProjectCarousel (home) · ProjectGallery (detail) · Lightbox (PhotoSwipe init) · ProductCard · IndustryCard · OperatingSystemList · ComparisonTable · ProcessSteps · ValueProps · CTABand · FAQAccordion · QuoteForm · MeasurementRows · ContactForm · SpecList · Testimonials (feature-flagged off) · SEO helpers (meta + JSON-LD).

---

## 5. Galleries & carousels

### 5.1 Shared behavior (all carousels)
- Native horizontal scroll with CSS `scroll-snap`. No carousel library needed.
- Previous/next buttons (disabled at the ends; no infinite loop). Keyboard ←/→ when the carousel has focus. Touch swipe is native.
- **No autoplay.**
- Works without JS (falls back to plain horizontal scrolling).
- ARIA: region with `aria-roledescription="carousel"` and an `aria-label`; each slide `role="group"`, `aria-roledescription="slide"`, `aria-label="3 of 8"`; a polite live region announces slide changes.
- Aspect ratio reserved for every slide (no layout shift). Only above-the-fold first images load eagerly.

### 5.2 Contexts
1. **Home "Selected Projects":** one card per project with `featured: true`, sorted by `order`.
2. **ProjectCard mini-gallery** (projects index, related projects): the cover shows by default; small prev/next arrows let users peek at up to 5 photos. **Extra images load only on first interaction.** Photo-count badge ("8 photos").
3. **Project detail gallery:** large main slide + thumbnail strip + counter ("3 / 8"). Click or Enter opens the **PhotoSwipe** lightbox with a large version (generate 2048 px via `getImage`). Lightbox: focus trap, Esc closes, arrows navigate, focus returns to the trigger on close.

### 5.3 Video (optional)
Frontmatter `video`: a YouTube/Vimeo URL rendered with a click-to-load facade (only the poster loads until clicked), or a self-hosted MP4 in `public/videos/<slug>/` with `preload="none"` and a poster. Never commit large video files; recommend external hosting.

---

## 6. SEO & structured data

- `astro.config`: `site` = production URL (placeholder `https://www.rollershadesupply.com`, tracked in CONTENT_TODO) and `trailingSlash: 'always'`.
- **Head on every page:** title, description, canonical, `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card=summary_large_image`. Default OG image 1200×630 (logo + tagline on a brand background); project pages use their cover image.
- **Favicons from the logo:** `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `site.webmanifest`.
- `robots.txt` allows everything and points to the sitemap. The sitemap excludes thank-you, styleguide, and 404.
- **JSON-LD:**
  - Home: `WebSite` + `Organization` (name, url, logo, contactPoint, sameAs).
  - Home + Contact: `LocalBusiness` (name, url, telephone, email, address if provided, `areaServed` from `site.ts`, `openingHoursSpecification`).
  - All inner pages: `BreadcrumbList`.
  - Product and industry pages: `Service` (serviceType, provider → Organization, areaServed).
  - `/projects/`: `ItemList` of project URLs.
  - Project pages: `CreativeWork` (name, description, image[], dateCreated from `year`, locationCreated, about → products).
  - `/faq/`: `FAQPage`.
- **Internal linking:** every project links to its products and industry; product and industry pages list related projects; breadcrumbs on every page except home; the footer links all key pages.
- **Headings:** one H1 per page that contains the primary keyword naturally. No keyword stuffing.
- **Local SEO:** name, address, and phone identical everywhere (footer, contact page, schema). Service-area place names appear naturally in copy.

---

## 7. Quote form `/request-a-quote/`

Fields: approved copy, plus additions marked ✚.

| Field | Type | Required |
|---|---|---|
| Name | text | yes |
| Company | text | yes |
| Email Address | email | yes |
| ✚ Phone | tel | no |
| Project Location | text (city or ZIP) | yes |
| I am a | select (8 approved options) | yes |
| Product Type | checkboxes, multi (5 approved options) | no |
| Project Type | checkboxes, multi (7 approved options) | no |
| ✚ Union project? | radio: Union · Non-union · Not sure | no |
| Estimated Quantity | number | no |
| Measurements — Width × Height | ✚ repeatable rows: Label/room (optional) · Width (in) · Height (in) · Qty, with "Add another size" and remove buttons, plus a fallback textarea for pasting a list | no |
| Preferred Operating System | checkboxes (5 approved options) | no |
| ✚ Expected Timeline | select: As soon as possible · Within 4 weeks · 4–8 weeks · 8+ weeks · Budgeting / pricing only | no |
| Tell Us About Your Project | textarea (approved helper text) | yes |
| Upload Plans or Measurement List — Optional | file (PDF, XLSX, XLS, CSV, DOC, DOCX, JPG, PNG), size limit shown | no |
| ✚ How did you hear about us? | select | no |

**Behavior**
- HTML5 validation + inline, accessible error messages (`aria-describedby`, `aria-invalid`); an error summary at the top on submit that links to each field.
- Works as a normal POST without JS. Success redirects to `/request-a-quote/thank-you/`.
- Prefill from the query string, e.g. `?product=zebra-shades&projectType=school`.
- Netlify Forms (default): a static form with `name="quote"` and `data-netlify="true"`, `netlify-honeypot` for the hidden field, and `enctype="multipart/form-data"` for the file input. Netlify's built-in spam filtering on; add a CAPTCHA only if spam becomes a problem.
- Netlify Forms doesn't process submissions in `astro dev`. Use a dev-only stub that redirects to the thank-you page, or test with `netlify dev`.
- Keep the backend behind a small adapter (`src/lib/forms.ts`) so it can be swapped (e.g., to a serverless function + email API on another host).
- Recipient emails and the upload size limit are CONTENT_TODO items.

---

## 8. Images & media

- Pipeline rules are in CLAUDE.md. Output widths for `<Picture>`: 400, 640, 960, 1280, 1600 (+ 2048 for the lightbox). Formats: AVIF + WebP with a JPEG fallback. Write accurate `sizes` per layout.
- **Photo review (subagents, 3–4 projects each):** view every photo and
  1. write descriptive alt text (what's visible: room type, product, fabric, setting) → frontmatter `photos[].alt`;
  2. pick the strongest cover (wide, well lit, shades clearly visible, horizontal) → frontmatter `cover`;
  3. flag blurry, duplicate, dark, or badly cropped photos, plus anything private (faces, license plates, readable addresses or documents) → CONTENT_TODO.

---

## 9. Accessibility (WCAG 2.2 AA)

- `lang="en-US"`, landmarks (`header`, `nav`, `main`, `footer`), skip link to `main`.
- Logical heading order; one H1 per page.
- Visible focus indicator (≥ 2 px, sufficient contrast) on every interactive element.
- Target size ≥ 24×24 px (aim for 44×44 px on touch).
- Text contrast ≥ 4.5:1; large text and UI ≥ 3:1. Never use color alone to convey information.
- Forms: visible labels, required fields marked in text, specific error messages, error summary.
- Menus and dropdowns: buttons with `aria-expanded`, Esc closes, focus is managed.
- Carousels and lightbox per §5.
- `prefers-reduced-motion` disables reveals and smooth scrolling.
- Descriptive alt text; decorative images use `alt=""`.

---

## 10. Performance budget

- Lighthouse (mobile) on Home, `/projects/`, one project page, and `/request-a-quote/`: Performance ≥ 95; Accessibility, Best Practices, SEO = 100.
- LCP ≤ 2.0 s (simulated mobile), CLS ≤ 0.05, INP good.
- Zero JS on pages that don't need it; interactive parts are small islands or inline scripts that load on visibility or interaction.
- Fonts: at most 2 families, WOFF2, subset to Latin, preload the primary weight, `font-display: swap`.
- Hero image: `loading="eager"` + `fetchpriority="high"`. All others lazy.
- No third-party scripts in the critical path.

---

## 11. Analytics & deploy

- **Analytics:** cookieless (Cloudflare Web Analytics or Plausible), disabled until an ID is set in `site.ts`. Events: `quote_submitted` (thank-you page view), `click_to_call`, `email_click`.
- **Deploy (default):** Netlify, build `npm run build`, publish `dist/`. A `netlify.toml` with security headers (HSTS, `X-Content-Type-Options`, `Referrer-Policy`, a CSP that allows what we actually use) and long-term caching for `/_astro/*`.
- **After launch (client tasks):** Google Search Console + Bing Webmaster Tools (submit the sitemap), Google Business Profile (pick the closest category), consistent name/address/phone across directories.

---

## 12. Launch checklist

- [ ] Every CONTENT_TODO item resolved or explicitly accepted by the client
- [ ] No `placeholder: true` projects left, or the client has approved their copy
- [ ] Real phone, email, address, and domain in `site.ts`; `site` set in `astro.config`
- [ ] Testimonials flag still off unless real, approved quotes were provided
- [ ] `/styleguide/` removed or blocked
- [ ] Form tested end-to-end on production, including file upload and email delivery
- [ ] Lighthouse targets met on the four key pages
- [ ] 404 works; redirects from any old site configured
- [ ] Open Graph previews checked (e.g., LinkedIn Post Inspector)
- [ ] Sitemap submitted to Google Search Console and Bing
