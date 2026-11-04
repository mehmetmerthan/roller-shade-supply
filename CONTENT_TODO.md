# CONTENT_TODO — Roller Shade Supply

Every placeholder, unconfirmed fact, and open question on the site. Nothing here may launch as fact until the client confirms it. In code, these spots are marked `// TODO(content):`.

**Status key:** ☐ open · ☑ resolved (move to the Resolved section at the bottom with the date and the answer).

Sources: `docs/additional-content.md` ([CONFIRM] items and §12 open questions), `docs/mock-projects.yaml`, and the asset review of 11/04/2026.

---

## 1. Company details: `src/config/site.ts`

| ☐ | Item | Placeholder now | What's needed |
|---|---|---|---|
| ☐ | Phone | (312) 555-0148 (fictional 555 number) | Real main line |
| ☐ | Quote email | quotes@rollershadesupply.com | Real inbox. This is also the quote-form recipient (§6) |
| ☐ | General email | info@rollershadesupply.com | Real inbox |
| ☐ | Domain | https://www.rollershadesupply.com (also `site` in `astro.config.mjs`) | Confirm the production domain |
| ☐ | Address | Chicago, IL (no street) | Show a street address, or the service area only? |
| ☐ | Hours | Monday–Friday, 8:00 AM – 5:00 PM CT | Confirm |
| ☐ | Service area: counties | Cook, DuPage, Lake, Will, Kane, McHenry | Confirm. "Chicago and the surrounding area" is approved |
| ☐ | Extended area | Larger projects elsewhere in Illinois and Northwest Indiana | Confirm. Water Power Lofts is in **Rockford** (~90 mi from Chicago) |
| ☐ | Quote response time | "within one business day" | Confirm the turnaround |
| ☐ | LinkedIn and other social profiles | none | URLs, or keep them hidden |
| ☐ | Founding year and team details | none | Optional, for the About page |
| ☐ | Existing website | unknown | If one exists, list its URLs so redirects can be set up |
| ☐ | `features.launched` | `false` (every build is staging: noindex, robots Disallow, "Sample write-up" badges) | Flip to `true` only at launch, after this list is cleared |

## 2. Brand

| ☐ | Item | What's needed |
|---|---|---|
| ☐ | Logo | `/assets/brand/logo.svg`, `logo-light.svg`, and `logo-mark.svg` are **temporary placeholders**. Need the final logo (SVG preferred) in light and dark versions plus an icon mark |
| ☐ | Brand colors and fonts | Are there official ones? The palette (Direction B "Chicago Window") was built from the brief, not the placeholder logo. Reconcile when the real logo arrives |
| ☐ | Favicons and OG image | Will be generated from the placeholder logo. Regenerate when the final logo arrives |

## 3. Projects

All 13 project write-ups are adapted from `docs/mock-projects.yaml`. **Every fact in them is invented** (location, year, client type, union status, products, fabrics, quantities, timelines, outcomes) and each is marked `placeholder: true`. While the site is in staging, placeholder projects show a "Sample write-up" badge.

### 3.1 For every project
| ☐ | Item | What's needed |
|---|---|---|
| ☐ | Permission to publish | Written OK to publish each project name and its photos. **Especially:** UPS Center, Lexus Glenview, Stern Pinball, ERIK'S Bike Shop, the schools, and the mosque. Can visible brand signage stay in the photos? |
| ☐ | Real facts | Location, year, products, fabrics, quantity, operating systems, union / non-union, client type (may we name the GC or owner?), and a one-paragraph story |
| ☐ | Government projects | Approved copy says "successfully completed government and public-sector projects", but every public-sector folder is a school. Are there non-school government projects with photos? |

### 3.2 Project-by-project
| ☐ | Project (folder) | Status | Open items |
|---|---|---|---|
| ☐ | Water Power Lofts Rockford | live, featured | Confirm building type (loft conversion?), scope, year (photo dates suggest 2024) |
| ☐ | SRIS International School | live, featured | **Location unknown** (currently "Chicago area, IL"). One web image excluded |
| ☐ | **Mosque** | live, featured | **Real name needed.** The folder was "Mosq" and is now "Mosque"; the title follows the folder name. Sector is provisionally `commercial`; revisit once the name and permission are confirmed. Location unknown. Explicit permission to show a religious facility |
| ☐ | 914 W Hubbard St | live, featured | Condos or apartments? Who was the client (property manager or association)? Two marketing photos excluded. Year: photo dates suggest 2024 |
| ☐ | UPS Center | live, featured | Which UPS facility, and where? Naming permission. No UPS branding is visible in the photos. The photos show an operating facility's interior (sort floor), so confirm the client may publish them |
| ☐ | 118 S Clinton | live, featured (took ERIK'S slot after photo review) | Apartments over ground-floor retail (mixed-use)? The photos show a leasing/amenity space, not an apartment. Rights to the exterior photo `118 S Clinton.jpg` (source unknown, kept for now; it looks like a professional or listing photo). Both interiors show another company's leasing boards. A cleaner interior shot would help. One duplicate photo excluded |
| ☐ | ERIK'S Bike Shop | live, **not featured** | **No photo clearly shows a window shade.** 3 of 5 are storefront exteriors dominated by the ERIK'S logo. Need interior photos of the installed shades, the store location, and permission to name the client and show its branding. Year: photo dates suggest 2023. The folder was renamed from "ERIK_S Bike Shop" |
| ☐ | Friendship Junior High School | live (1 photo) | More photos? One web image excluded. Location assumed Des Plaines, IL |
| ☐ | 811 West Evergreen | live | Apartments or condos? Two listing photos and one duplicate excluded |
| ☐ | Grove Junior High School | **held back** (no usable photos) | Photos of the completed work. Both images were web-sourced. The folder was renamed from "Grove Junior HighSchool" |
| ☐ | Salt Creek Elementary School | **held back** (no usable photos) | Photos of the completed work. The only image was web-sourced |
| ☐ | Lexus Glenview | **held back** (no usable photos) | Photos of the completed work. All three images were web-sourced |
| ☐ | Stern Pinball | **held back** (videos only) | Photos of the completed work |

Dropped mock: P03 (Skokie Senior Living). No matching folder.

### 3.3 Excluded images (`scripts/image-exclude.json`)
These files stay in `/assets` but are not published. Re-enable one by removing its entry and running `npm run images`.

| ☐ | File | Reason | What's needed |
|---|---|---|---|
| ☐ | `118 S Clinton/9d254165-….jpg` and `811 West Evergreen/9d254165-….JPG` | **Same photo in two folders** | Which project does it belong to? (The 811 copy's timestamps match the other 811 photos.) |
| ☐ | `811 West Evergreen/811-W-Evergreen-St-Chicago-IL-Building-Photo-1-Large.jpg` | Listing-site photo (actually an AVIF) | Rights, or drop it |
| ☐ | `811 West Evergreen/811-w-evergreen-02-777x515.jpg` | Listing photo with a watermark | Rights, or drop it |
| ☐ | `914 W Hubbard St/IMG_0150.JPG`, `IMG_0151.JPG` | Marketing photos with replaced skies | Rights, or drop them |
| ☐ | `Friendship Junior High School/friendship-jr-high-school-des-plaines-il-schoolphoto.jpg` | School-directory image | Rights, or drop it |
| ☐ | `Grove Junior High School/D59-Grove-Junior-High.jpg`, `Grove-Junion-High.jpg` | District and other web images | Rights, or drop them. Neither shows the work |
| ☐ | `Lexus Glenview/images.jpg`, `unnamed.webp`, `unnamed (1).webp` | Web thumbnails and Google Maps–style grabs | Rights, or drop them. None show the work |
| ☐ | `Salt Creek Elementary School/salt-creek-elementary-school-elmhurst-il-primaryphoto.jpg` | School-directory image | Rights, or drop it. It doesn't show the work |
| ☐ | `SRIS International School/unnamed (2).webp` | Google Maps–style grab | Rights, or drop it |

### 3.4 Videos (not copied or committed)
| ☐ | File | Notes | What's needed |
|---|---|---|---|
| ☐ | `Mosque/2612d69f-….mp4` (18.1 MB, 78 s) | 478×850, heavily compressed | Original-resolution file or a YouTube/Vimeo link |
| ☐ | `Stern Pinball/af3755da-….MP4` (14.3 MB, 75 s) | 478×850, heavily compressed | Same |
| ☐ | `Stern Pinball/c97f5d90-….MP4` (9.7 MB, 50 s) | 478×850, heavily compressed | Same |

### 3.5 Photo review flags (11/04/2026)
All 62 published photos were viewed. Alt text, covers, and crop positions are in each project's frontmatter.

**Across all projects**
- Every visible shade is a **chain-operated roller shade**. No zebra shades, faux wood blinds, cordless lifts, or motors appear in any photo. The site currently has no photo proof for zebra shades, faux wood blinds, or motorized and cordless operation. Ask the client for photos of those products.
- Openness factors (1%, 3%, 5%) can't be verified from photos. Fabric descriptions say "solar screen" or "room-darkening" by appearance only.

**Privacy and branding: resolve before launch (blur, crop, or drop)**
| ☐ | Photo | Issue |
|---|---|---|
| ☐ | `Water Power Lofts Rockford/img-7721.jpg` | Readable license plate on a white van |
| ☐ | `Water Power Lofts Rockford/img-7723.jpg` | Readable Illinois plates on 2+ vehicles; shot through a car window |
| ☐ | `Water Power Lofts Rockford/img-5332.jpg`, `img-5333.jpg`, `img-5331.jpg` | Occupied unit with residents' belongings; resident consent. `img-5331` shows a boom lift with readable model text |
| ☐ | `SRIS International School/2cff0a32…`, `5da54172…`, `8fa88533…`, `b460dfcc…` | Room number "213" readable. `5da54172`, `11a95098`, and `b460dfcc` show reflections of two people (not identifiable) |
| ☐ | `Friendship Junior High School/112edd83….jpg` | Room number "336" readable; bulletin board with personal photos and a "Thank You" note |
| ☐ | `ERIK'S Bike Shop/img-4063.jpg`, `img-4067.jpg`, `img-4746.jpg` | ERIK'S logo dominant; unit number "1600-T24"; door posters with a URL and QR code. `img-4064` shows a neighboring store's sign. `img-4737`: check plates in the parking lot at full size |
| ☐ | `118 S Clinton/8436235e….jpg`, `c64c4ae9….jpg` | Third-party leasing boards ("The Junction", "The Depot", "SL / South 118" logo) |
| ☐ | `118 S Clinton/118-s-clinton.jpg` | Third-party storefront signage (Subway, Aligned Modern Health) |
| ☐ | `811 West Evergreen/a78261ed….jpg` | A resident's grill on the balcony (occupied unit) |
| ☐ | `Mosque/edf3b642….jpg` | A parked car is visible (no plate) |
| ☐ | `UPS Center/1b213b7c….jpg` | View of the sort floor; a worker may be visible far away (not identifiable) |

**Quality: recommended drops (not applied; awaiting approval)**
To drop one, add it to `scripts/image-exclude.json` with the reason and run `npm run images`.
| ☐ | Photo | Reason |
|---|---|---|
| ☐ | `Mosque/e42d144d….jpg` | Distorted, low resolution (1600×1200), near-duplicate of `c561fab4` |
| ☐ | `Mosque/91f7fbbf….jpg` | Shades can't be made out |
| ☐ | `Water Power Lofts Rockford/img-7723.jpg` | Shot through a car window, readable plates, no shades |
| ☐ | `Water Power Lofts Rockford/img-5406.jpg` | Near-duplicate of `img-5410`; shade barely visible |
| ☐ | `SRIS International School/8fa88533…`, `66a12158…`, `11a95098…`, `b460dfcc…` | Near-duplicates of other SRIS photos (two show reflections of people and ladder clutter) |
| ☐ | `914 W Hubbard St/img-7109.jpg`, `img-7106.jpg` | Shade fully raised and barely visible / overexposed, weak composition |
| ☐ | `ERIK'S Bike Shop/img-4067.jpg`, `img-4063.jpg` | Near-duplicate entrance shots; no shades |
| ☐ | `118 S Clinton/c64c4ae9….jpg` | Shades fully raised; same angle as `8436235e` |

**Useful pairs (keep together in galleries):** Mosque before/after `97d4c537` → `ff62246c` and `d4404be4` → `edf3b642`; SRIS lowered/raised `033ef675` / `b87a8632`; 811 West Evergreen raised/lowered `a78261ed` / `c49de731`.

**Resolution:** the Mosque photos are only 2000 px wide (likely sent through a messaging app). Ask for the originals. The best homepage hero candidate is `Water Power Lofts Rockford/img-5335.jpg` (2560 px), then `SRIS International School/033ef675….jpg`.

## 4. Copy placeholders (`docs/additional-content.md`)

Everything outside `docs/approved-copy.md` is a placeholder. Items marked [CONFIRM] in the source:

| ☐ | Section | Item |
|---|---|---|
| ☐ | §2 Trust strip | Optional stats ("[X]+ shades supplied", "[X] schools completed", "Serving Chicago since [year]"). Show only with real numbers |
| ☐ | §3 Why work with us | #2 consistent product claim; #3 labeling by unit or room; #6 quote turnaround |
| ☐ | §4 How it works | Step 2 turnaround; step 3 submittals and samples; step 4 made to size, phased delivery, labeling; **step 5: do they install, coordinate installers, or supply only?** |
| ☐ | §5.1 Roller Shades | Fabric types offered (light-filtering, room-darkening/blackout, side channels, solar screen openness 1/3/5/10%, dual roller); options (mounts, fascia/cassette, bottom bars) |
| ☐ | §5.3 Faux Wood Blinds | Typical spec (2" slats, cordless lift, tilt wand, finishes) |
| ☐ | §5.4 Operating Systems | Each system's description; any standards claims (ANSI/WCMA A100.1); building-controls integration; **every cell of the comparison table**; fabric performance claims (NFPA 701, GREENGUARD Gold, antimicrobial, PVC-free) |
| ☐ | §6 Industry pages | Multifamily "how we help"; Education recommendations (flame-resistant fabrics); Government certifications (MBE/WBE/DBE/VBE), prevailing wage, tax-exempt purchasing, POs, vendor registrations |
| ☐ | §6 `/industries/` overview | **New page; no copy exists.** Title, meta description, and intro to write and approve |
| ☐ | §7 Project support services | Every item: takeoffs, field measuring, submittals, phased deliveries, labeling, installation, replacement orders, trade accounts |
| ☐ | §8 FAQ | Turnaround, minimum order, measurement verification, child-safety compliance, flame-resistant fabrics, building-controls integration, warranty, submittals, installation, phased delivery, extended service area, replacement orders |
| ☐ | §9 SEO metadata | All titles and descriptions are drafts. Plus new entries for `/industries/` and `/contact/thank-you/` |
| ☐ | §10 Microcopy | Upload helper "Up to 10 MB"; thank-you page turnaround |
| ☐ | How to Measure | "Approximate sizes are fine for budgeting; final sizes are verified before production" |
| ☐ | §11 Legal | Privacy Policy and Accessibility Statement need **legal review** before launch |
| ☐ | Testimonials | `features.testimonials = false` until real, approved quotes with written permission exist |
| ☐ | Manufacturer brands | Which brands are carried, and may we name them or show their logos? |
| ☐ | Lead times and minimums | Typical lead times by product; minimum order quantities |
| ☐ | Warranty | Terms by product and manufacturer |

## 5. Public sector and compliance (§12 Q16–17)
| ☐ | Item |
|---|---|
| ☐ | Certifications (MBE/WBE/DBE/VBE), prevailing-wage experience, insurance/COI, vendor registrations |
| ☐ | Tax-exempt purchasing and purchase orders: supported? |

## 6. Website operations
| ☐ | Item | Notes |
|---|---|---|
| ☐ | Quote-form recipients | Who receives quote requests by email? |
| ☐ | Upload size limit | Placeholder says 10 MB. **Verify Netlify Forms' upload limit** in its current docs (it may be lower) before promising a number |
| ☐ | Contact-form recipients | Who receives general inquiries? |
| ☐ | Analytics | Cloudflare Web Analytics or Plausible? Provide the site ID (`features.analytics`) |
| ☐ | Google Business Profile | Does one exist? NAP must match the site exactly |
| ☐ | Who adds projects after launch | Decides whether a CMS is needed |

---

## Resolved
| Date | Item | Resolution |
|---|---|---|
| 11/04/2026 | Folder names | The user renamed `ERIK_S Bike Shop` → `ERIK'S Bike Shop`, `Grove Junior HighSchool` → `Grove Junior High School`, and `914 W Hubbard st` → `914 W Hubbard St`. `Mosq` is now `Mosque` (the real name is still needed; see §3.2). No Title Case conversions were applied |
| 11/04/2026 | Stern Pinball and photo-less projects | Held back until photos of the completed work arrive (`_<slug>.md`) |
| 11/04/2026 | Web-sourced and duplicate images | Excluded via `scripts/image-exclude.json` until rights are confirmed |
| 11/04/2026 | Featured set | Water Power Lofts Rockford, SRIS International School, Mosque, 914 W Hubbard St, UPS Center, and 118 S Clinton. ERIK'S Bike Shop was swapped out for 118 S Clinton (the agreed fallback) because none of its photos clearly shows a shade |
| 11/04/2026 | Placeholder copy vs. photos | Write-ups were corrected to match the photos: chain operation everywhere (not cordless), no zebra or faux wood claims on live projects, interior-window privacy at SRIS and UPS, and new square openings at 811 West Evergreen |
