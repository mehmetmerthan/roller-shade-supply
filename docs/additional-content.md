# Additional Content — Placeholders

> **Status: PLACEHOLDER — needs client confirmation before launch.**
> This file fills the gaps in `docs/approved-copy.md` (company details, process, FAQ, industry pages, SEO metadata, microcopy, legal pages).
> Tone matches the approved copy: plain, confident, professional. Short sentences. No hype, no superlatives.
> **[CONFIRM]** = a fact we assumed or invented. Every [CONFIRM] item must appear in `CONTENT_TODO.md`.
> **(approved)** = taken from or directly supported by the approved copy.

Contents: 1 Company details · 2 Trust strip · 3 Why work with us · 4 How it works · 5 Product pages · 6 Industry pages · 7 Project support services · 8 FAQ · 9 SEO metadata · 10 Microcopy · 11 Legal templates · 12 Open questions for the client

---

## 1. Company details → `src/config/site.ts`

| Field | Placeholder value | Note |
|---|---|---|
| Business name | Roller Shade Supply | (approved) |
| Tagline | Commercial Window Coverings for Chicago’s Building Professionals | (approved) |
| Phone | (312) 555-0148 | [CONFIRM] fictional 555 number |
| Quote email | quotes@rollershadesupply.com | [CONFIRM] |
| General email | info@rollershadesupply.com | [CONFIRM] |
| Website | https://www.rollershadesupply.com | [CONFIRM] domain |
| Address | Chicago, IL (street address TBD) | [CONFIRM] show a street address, or service area only? |
| Hours | Monday–Friday, 8:00 AM – 5:00 PM CT | [CONFIRM] |
| Service area | City of Chicago and the surrounding area: Cook, DuPage, Lake, Will, Kane, and McHenry counties | "Chicago and the surrounding area" is approved; county list is [CONFIRM] |
| Extended area | Larger projects elsewhere in Illinois and Northwest Indiana | [CONFIRM] |
| Quote response time | Within one business day | [CONFIRM] |
| LinkedIn | (URL TBD) | [CONFIRM] or hide |
| Founded | (TBD) | [CONFIRM] optional, for About page |

---

## 2. Trust strip (safe — derived from approved copy)

- Union & non-union projects
- Multifamily · Commercial · Education · Public sector
- 3 product lines · 4 operating options
- Chicago-based · Trade-focused

**Optional numeric stats** — show only if the client supplies real numbers:
`[X]+ shades supplied` · `[X] schools completed` · `Serving Chicago since [year]`.
Never display invented numbers.

---

## 3. Why work with us (value propositions)

1. **Built for the trade.** (approved) We work with builders, contractors, developers, and property managers. Our quoting and communication are set up for project work, not retail shopping.
2. **Consistent product, unit after unit.** The same fabric, color, and hardware across every unit and floor, so the building looks finished from the street. [CONFIRM]
3. **Coordination you can schedule around.** (approved: "dependable project coordination") We plan deliveries around your construction schedule and label everything so the right shade reaches the right window. [CONFIRM labeling]
4. **Ready for public-sector work.** (approved) We understand the coordination, documentation, scheduling, and site requirements of schools and government facilities.
5. **Union and non-union.** (approved) We support both, so we can serve a wide range of public and private-sector clients.
6. **Fast, accurate quotes.** (approved: "the more information you provide, the faster…") Send sizes, quantities, and your timeline, or upload a window schedule, and we'll get back to you quickly. [CONFIRM turnaround]

---

## 4. How it works (process)

1. **Send your project details.** Plans, a window schedule, or a simple list of sizes and quantities.
2. **Receive your quote.** We review your request and reply by email, usually within one business day. [CONFIRM]
3. **Approve submittals and samples.** Product data, fabric samples, and specifications for your team or architect to sign off. [CONFIRM]
4. **Production and delivery.** Shades are made to size and delivered on your schedule, in phases if needed, labeled by unit or room. [CONFIRM]
5. **Installation and closeout.** [CONFIRM: does Roller Shade Supply install, coordinate installers, or supply only? Rewrite or remove this step accordingly.]

---

## 5. Product pages

### 5.1 Roller Shades — `/products/roller-shades/`
**Intro (approved):** Clean, versatile window coverings available in a variety of fabrics, colors, and operating options.

**Body:** Roller shades are the workhorse of commercial interiors. They're simple, durable, and easy to keep consistent across hundreds of windows. One fabric family can cover living areas, bedrooms, offices, and common spaces, with a different opacity wherever you need it.

**Fabric types** [CONFIRM availability]
- **Light-filtering** — Softens daylight while keeping rooms bright.
- **Room-darkening / blackout** — For bedrooms, AV rooms, nap rooms, and anywhere light must be controlled. Side channels can reduce light gaps at the edges. [CONFIRM]
- **Solar screen** — Cuts glare and heat while keeping the view. Offered in openness factors such as 1%, 3%, 5%, and 10%. Lower openness means more glare control; higher openness means more view.
- **Dual roller** — A light-filtering shade and a blackout shade on one bracket. [CONFIRM]

**Options** [CONFIRM]: inside or outside mount · open roll or fascia/cassette · bottom-bar finishes · wide range of fabric colors.

**Best for:** multifamily units, offices, classrooms, libraries, common areas.

### 5.2 Zebra Shades — `/products/zebra-shades/`
**Intro (approved):** A modern combination of light control and privacy, designed for offices, common areas, and contemporary interiors.

**Body:** Zebra shades (also called banded or dual shades) use alternating sheer and solid fabric bands. Line up the sheer bands for filtered light and a view; offset them for privacy, without raising the shade. Their clean, modern look suits offices, conference rooms, lobbies, leasing centers, amenity spaces, and contemporary apartments.

**Best for:** private offices, meeting rooms, leasing offices, amenity spaces, modern units.

### 5.3 Faux Wood Blinds — `/products/faux-wood-blinds/`
**Intro (approved):** A durable and practical option suitable for multifamily properties, offices, and other high-use environments.

**Body:** Faux wood blinds look like wood but stand up to humidity, cleaning, and heavy use. They won't warp, crack, or fade the way real wood can. That makes them a practical, long-lasting choice for apartments, kitchens and bathrooms, offices, and high-traffic areas, and easy to replace during unit turnovers.

**Typical spec** [CONFIRM]: 2" slats · cordless lift · tilt wand · white and neutral finishes.

### 5.4 Operating Systems — `/products/operating-systems/`
**Intro (approved list):** Motorized shades · Solar-powered motorized shades · Cordless systems · Chain-operated systems. Product availability and specifications may vary by project.

- **Cordless** — Lift and lower by hand with no exposed cords. A clean look and a child-safety-friendly choice, commonly specified for multifamily housing and childcare and education spaces. [CONFIRM any standards claims, e.g., ANSI/WCMA A100.1]
- **Chain-operated** — A continuous-loop chain with a tension device for smooth, reliable control. Well suited to larger or heavier shades. [CONFIRM]
- **Motorized** — Raise and lower with a remote, wall switch, schedule, or building controls. Ideal for tall, wide, or hard-to-reach windows, conference rooms, lobbies, and auditoriums. [CONFIRM integration options]
- **Solar-powered motorized** — Motorized convenience with a small solar panel that keeps the battery charged, so no wiring is needed. Well suited to renovations and windows where running power is difficult. [CONFIRM]

**Comparison table** [CONFIRM all cells]

| Operating system | Best for | Wiring needed | No accessible cords | Relative cost |
|---|---|---|---|---|
| Cordless | Units, classrooms, offices | No | Yes | $ |
| Chain-operated | Large or heavy shades | No | Chain with tension device | $ |
| Motorized | Tall, wide, hard-to-reach windows | Yes (or battery) | Yes | $$$ |
| Solar-powered motorized | Retrofits, no nearby power | No | Yes | $$$ |

**Fabric performance** (show only what the client confirms): flame-resistant fabrics (NFPA 701) · GREENGUARD Gold low-emission fabrics · antimicrobial / cleanable fabrics · PVC-free options.

---

## 6. Industry pages

### 6.1 Multifamily — `/industries/multifamily/`
**H1:** Window Coverings for Multifamily Developments in Chicago
**Intro:** From new mid-rises to occupied-building renovations, we supply roller shades, zebra shades, and faux wood blinds that look consistent across every unit and hold up to years of turnover.
**Typical needs:** unit-by-unit consistency · phased delivery aligned with floor turnover · durable, easy-to-clean products · cordless operation for child safety · standard sizes for future replacements.
**Recommended:** cordless roller shades (solar screen in living areas, blackout in bedrooms) · faux wood blinds for kitchens, baths, and budget-sensitive projects · zebra shades for amenity spaces and leasing offices.
**How we help:** quotes from plans or window schedules · labeling by unit · phased deliveries · replacement orders for property managers. [CONFIRM]

### 6.2 Commercial — `/industries/commercial/`
**H1:** Commercial Window Shades for Offices and Businesses
**Intro:** Glare-free workspaces, private meeting rooms, and a consistent look across every floor, delivered on your fit-out schedule.
**Typical needs:** glare control on screens · privacy for conference rooms and private offices · motorization for large glazing · consistent exterior appearance · work scheduled around tenants and move-in dates.
**Recommended:** solar screen roller shades for open offices · zebra shades for private offices and meeting rooms · motorized or solar-powered motorized shades for large or hard-to-reach windows.

### 6.3 Education — `/industries/education/`
**H1:** Window Shades for Schools and Educational Facilities
**Intro (approved basis):** Roller Shade Supply has completed window covering projects for multiple schools. We understand the coordination, documentation, scheduling, and site requirements involved in institutional work.
**Typical needs:** work completed during breaks · durable, cleanable fabrics · light control for projectors and screens · cordless or motorized operation for safety · documentation for districts.
**Recommended:** roller shades with light-filtering or blackout fabrics in classrooms · motorized shades in gyms, auditoriums, and libraries · flame-resistant fabrics where required. [CONFIRM]

### 6.4 Government & Public Sector — `/industries/government-public-sector/`
**H1:** Window Coverings for Government and Public-Sector Projects
**Intro (approved):** Roller Shade Supply has successfully completed government and public-sector projects, including window covering projects for multiple schools.
**Typical needs:** submittals and documentation · union and prevailing-wage requirements · scheduling around public operations · site access and security requirements · durable products with a long service life.
**How we help (approved):** coordination, documentation, scheduling, site requirements, and support for both union and non-union projects.
**[CONFIRM]:** certifications (MBE/WBE/DBE/VBE), prevailing-wage experience, tax-exempt purchasing, purchase orders, vendor registrations.

---

## 7. Project support services [CONFIRM each]

- Quotes from plans, window schedules, or size lists
- Takeoffs from architectural drawings
- Field measuring and verification
- Submittals: product data sheets, fabric samples, specifications
- Phased and scheduled deliveries
- Labeling by unit or room
- Installation or installation coordination
- Replacement and turnover orders for property managers
- Wholesale and trade accounts

---

## 8. FAQ — `/faq/`

### Ordering & Quotes
**Do you sell to homeowners?**
Our services are designed primarily for commercial, wholesale, and project-based customers rather than individual residential purchases. (approved)

**What information do you need for a quote?**
Product type, the width and height of each window, quantity, preferred operating system, project location, expected timeline, and any special requirements. The more you include, the faster and more accurate your quote will be. (approved)

**How quickly will I get a quote?**
Most complete requests receive a reply by email within one business day. Larger projects with full plans may take a little longer. [CONFIRM]

**Is there a minimum order?**
We focus on project and wholesale orders. Send us your quantities and we'll let you know how we can help. [CONFIRM]

**How should I measure my windows?**
Provide width × height in inches for each window. Approximate sizes are fine for budgeting; final sizes are verified before production. See our How to Measure guide. [CONFIRM verification step]

**Can I send plans or a window schedule instead of measurements?**
Yes. Upload plans, a window schedule, or a measurement list with your quote request. (approved)

### Products
**Which product is right for my project?**
Roller shades are the most versatile choice for most commercial and multifamily spaces. Zebra shades add adjustable privacy for offices and modern interiors. Faux wood blinds are a durable, budget-friendly option for high-use areas. Not sure? Choose "Not sure yet" on the form and we'll recommend options.

**Are your shades child-safe?**
Cordless and motorized shades have no accessible cords, and chain-operated systems use tension devices. [CONFIRM compliance with current window covering safety standards]

**Do you offer flame-resistant fabrics?**
[CONFIRM] Many commercial fabrics are tested to NFPA 701. Tell us your project's requirements and we'll recommend compliant options.

**Can motorized shades connect to building controls?**
[CONFIRM] Motorized shades can run on remotes, wall switches, and schedules, and many systems can integrate with building automation.

**What warranty do your products have?**
[CONFIRM] Warranty coverage depends on the product and manufacturer. We'll include details with your quote.

### Projects & Compliance
**Do you work on union projects?**
Yes. We are equipped to support both union and non-union projects. (approved)

**Do you work with schools and government agencies?**
Yes. We have completed government and public-sector projects, including window covering projects for multiple schools. (approved)

**Can you provide submittals and samples?**
[CONFIRM] Yes. We can provide product data, fabric samples, and specifications for approval.

**Do you install?**
[CONFIRM — answer depends on the client]

**Can you deliver in phases?**
[CONFIRM] Yes. We can schedule deliveries to match your construction or turnover schedule.

### Service Area
**What areas do you serve?**
We serve projects throughout Chicago and the surrounding area. (approved) [CONFIRM extended area]

**Do you handle replacement orders for property managers?**
[CONFIRM] Yes. We can keep size records for your properties and handle turnover replacements.

---

## 9. SEO metadata

Rules: titles ≤ 60 characters, descriptions 140–160 characters, one primary keyword per page used naturally in the H1, title, description, and first paragraph.

| URL | Title | Meta description | Primary keyword |
|---|---|---|---|
| `/` | Commercial Window Coverings Chicago \| Roller Shade Supply | Chicago supplier of commercial roller shades, zebra shades, and faux wood blinds for builders, contractors, multifamily developers, and public projects. | commercial window coverings Chicago |
| `/about/` | Chicago Window Covering Supplier \| Roller Shade Supply | Roller Shade Supply is a Chicago-based, trade-focused window covering supplier for contractors, developers, property managers, and public-sector clients. | window covering supplier Chicago |
| `/products/` | Commercial Shades & Blinds \| Roller Shade Supply | Roller shades, zebra shades, and faux wood blinds for commercial, multifamily, and institutional projects, with cordless, chain, and motorized options. | commercial shades and blinds |
| `/products/roller-shades/` | Commercial Roller Shades Chicago \| Roller Shade Supply | Commercial roller shades in light-filtering, blackout, and solar screen fabrics for offices, apartments, and schools across Chicago and the suburbs. | commercial roller shades Chicago |
| `/products/zebra-shades/` | Zebra Shades for Offices & Multifamily \| Roller Shade Supply | Zebra shades combine light control and privacy for offices, common areas, and modern apartments. Trade and project pricing for Chicago-area buyers. | zebra shades commercial |
| `/products/faux-wood-blinds/` | Commercial Faux Wood Blinds \| Roller Shade Supply | Durable faux wood blinds for multifamily properties, offices, and high-use spaces. Moisture-resistant, easy to clean, and supplied for trade projects. | faux wood blinds wholesale |
| `/products/operating-systems/` | Motorized, Solar & Cordless Shades \| Roller Shade Supply | Compare cordless, chain-operated, motorized, and solar-powered motorized shades for commercial and multifamily projects in the Chicago area. | motorized shades Chicago |
| `/industries/multifamily/` | Multifamily Window Coverings Chicago \| Roller Shade Supply | Roller shades and faux wood blinds for Chicago multifamily developments, with consistent product across every unit and phased delivery for your schedule. | multifamily window coverings Chicago |
| `/industries/commercial/` | Commercial Office Window Shades \| Roller Shade Supply | Office window shades for glare control and privacy: solar screens, zebra shades, and motorized shades for commercial fit-outs across Chicagoland. | office window shades Chicago |
| `/industries/education/` | School Window Shades in Illinois \| Roller Shade Supply | Classroom, library, and auditorium window shades for schools. Experienced with summer schedules, documentation, and union and non-union projects. | school window shades Illinois |
| `/industries/government-public-sector/` | Government & Public-Sector Shades \| Roller Shade Supply | Window coverings for government and public facilities, with the coordination, documentation, and scheduling that institutional projects require. | government window coverings |
| `/projects/` | Commercial Window Covering Projects \| Roller Shade Supply | Browse completed multifamily, commercial, school, and public-sector window covering projects by Roller Shade Supply across Chicago and the suburbs. | commercial window covering projects |
| `/projects/[slug]/` | {Project Title} \| Roller Shade Supply (drop the brand if over 60 chars) | The project's `summary` field (≤ 160 chars). | {product} + {sector} + {location} |
| `/request-a-quote/` | Request a Quote for Commercial Shades \| Roller Shade Supply | Request a fast quote for roller shades, zebra shades, or faux wood blinds. Send sizes, quantities, and your timeline, or upload plans or a window list. | commercial window shades quote |
| `/how-to-measure/` | How to Measure Windows for Shades \| Roller Shade Supply | How to measure windows for commercial roller shades and blinds: width × height in inches, inside vs. outside mount, and how to send a window schedule. | how to measure windows for shades |
| `/faq/` | Commercial Window Shade FAQ \| Roller Shade Supply | Answers about quotes, measurements, products, union projects, and service area for builders, contractors, and property managers in the Chicago area. | commercial window shade FAQ |
| `/contact/` | Contact Our Chicago Team \| Roller Shade Supply | Contact Roller Shade Supply about commercial, multifamily, school, or public-sector window covering projects in Chicago and the surrounding area. | contact window covering supplier |
| `/privacy-policy/` | Privacy Policy \| Roller Shade Supply | How Roller Shade Supply collects, uses, and protects the information you share through our website, our quote request form, and our contact form. | — |
| `/accessibility/` | Accessibility Statement \| Roller Shade Supply | Roller Shade Supply is committed to making our website accessible to everyone. Learn about our accessibility goals and how to report a problem. | — |

**Secondary keywords to work in naturally:** roller shade supplier Chicago · window treatments for contractors · solar shades for offices · blackout roller shades for apartments · cordless blinds for multifamily · motorized roller shades Chicago · solar powered motorized shades · window coverings for property managers · union window covering contractor Chicago.

---

## 10. Microcopy

**CTAs**
- Primary: **Request a Quote** (approved)
- Secondary: **View Our Projects** · **View Project Gallery** (approved)
- Product pages: **Get Pricing for {Product}**
- Industry pages: **Discuss Your {Industry} Project**
- Project pages: **Planning a similar project? Request a Quote**
- Mobile action bar: **Call** · **Get a Quote**

**Form helper text**
- Measurements: "Enter width × height in inches. Different sizes? Add a row for each, or upload a list."
- Upload: "PDF, Excel, CSV, Word, or image files. Up to 10 MB." [CONFIRM limit]
- Below the form (approved): "We respond to qualified project and wholesale inquiries by email."
- Near the form (approved): "Our services are designed primarily for commercial, wholesale, and project-based customers rather than individual residential purchases."

**Form errors**
- "Please enter your name."
- "Please enter your company name."
- "Please enter a valid email address, like name@company.com."
- "Please tell us where the project is located."
- "Please tell us a little about your project."
- "This file is too large. Upload a file under 10 MB, or email it to {quote email}."
- Error summary heading: "Please fix the following before submitting:"

**Thank-you page** (`/request-a-quote/thank-you/`)
- H1: "Thanks — we've received your request."
- Body: "Our team will review your project details and reply by email within one business day. [CONFIRM] If your timeline is urgent, call us at {phone}."
- Link: "While you wait, view our projects →"

**404**
- H1: "This page isn't here."
- Body: "It may have moved or been removed. Try one of these instead:" → Projects · Products · Request a Quote · Home

**Footer** (approved): Roller Shade Supply is a Chicago-based window covering supplier serving builders, contractors, multifamily developers, commercial organizations, and public-sector projects.

---

## 11. Legal templates [have legal counsel review before launch]

### Privacy Policy — outline
1. **Who we are** — Roller Shade Supply, Chicago, IL; contact email.
2. **Information we collect** — Details you submit through our forms (name, company, email, phone, project location, project details, uploaded files) and basic, cookieless website analytics.
3. **How we use it** — To respond to inquiries, prepare quotes, and communicate about your project.
4. **Sharing** — Only with service providers that help us operate the website and forms (e.g., hosting, form processing, email). We do not sell personal information.
5. **Retention** — Kept as long as needed for the purposes above or as required by law.
6. **Security** — Reasonable measures to protect information.
7. **Your choices** — Contact us to access, correct, or delete your information.
8. **Changes** — Updates are posted on this page with a new effective date.

### Accessibility Statement — draft
Roller Shade Supply is committed to making our website usable by everyone, including people with disabilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. If you have trouble using any part of this site, please contact us at {email} or {phone}, and we'll help you get the information you need and work to fix the problem. Last reviewed: {date}.

---

## 12. Open questions for Roller Shade Supply

**Company & brand**
1. Phone, quote and general email addresses, street address (show it or service area only?), business hours, domain.
2. Logo files: SVG available? Light and dark versions? Official brand colors or fonts?
3. Founding year and team details for the About page (optional).
4. Social profiles (LinkedIn, etc.).
5. Is there an existing website? (Redirects from old URLs need to be set up.)

**Services & products**
6. Do you install, coordinate installers, or supply only?
7. Do you offer field measuring?
8. Typical lead times by product.
9. Minimum order quantities, if any.
10. Typical quote turnaround.
11. Submittals and samples: offered?
12. Fabric certifications available (NFPA 701, GREENGUARD) and child-safety standards compliance.
13. Motorization: which systems, and can they integrate with building controls?
14. Warranty terms.
15. Manufacturer brands carried. May we name them or show their logos?

**Public sector & compliance**
16. Certifications (MBE/WBE/DBE/VBE), prevailing-wage experience, insurance/COI, vendor registrations.
17. Tax-exempt purchasing and purchase orders: supported?

**Projects**
18. For each project: permission to publish the name and photos; real location, year, products, quantities, operating systems, union status, client type (may we name the GC or owner?), and a one-paragraph story.
19. Real testimonials or client logos, with written permission?

**Website operations**
20. Who receives quote requests (email recipients)? Preferred file upload size limit?
21. Analytics preference? Does a Google Business Profile already exist?
22. Who will add new projects after launch? (Decides whether we need a CMS.)
