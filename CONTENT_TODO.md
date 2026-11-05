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
| ☐ | Favicons and OG image | Will be generated from the placeholder logo. Regenerate when the final logo arrives. **Until Phase 8, every page's Open Graph image is a 1200 × 630 crop of the home hero photo** (SRIS International School), so the photo-permission item in §3.1 covers social previews too |

## 3. Projects

**Current policy (11/05/2026): show every project and every photo.** Nothing is held back. `scripts/image-exclude.json` holds only the cross-project duplicate. Every web-sourced, low-res, privacy, and rights issue is logged below so the client can decide **before launch** what to remove. The section 3.6 checklist collects those decisions.

All 13 project write-ups are adapted from `docs/mock-projects.yaml`. **Every fact in them is invented** (location, year, client type, union status, fabrics, quantities, timelines, outcomes), except what the photos show. Each is marked `placeholder: true`. While the site is in staging, placeholder projects show a "Sample write-up" badge.

### 3.1 For every project
| ☐ | Item | What's needed |
|---|---|---|
| ☐ | Permission to publish | Written OK to publish each project name and its photos. **Especially:** UPS Center, Lexus Glenview, Stern Pinball, ERIK'S Bike Shop, the schools, and the mosque. Can visible brand signage stay in the photos? |
| ☐ | Real facts | Location, year, products, fabrics, quantity, operating systems, union / non-union, client type (may we name the GC or owner?), and a one-paragraph story |
| ☐ | Government projects | Approved copy says "successfully completed government and public-sector projects", but every public-sector folder is a school. Are there non-school government projects with photos? |
| ☐ | Product proof | Every project shows **chain-operated roller shades**, except Stern Pinball, which appears motorized. **We have no photos of zebra shades, faux wood blinds, cordless, or solar-powered systems.** Those product pages will show no related projects until the client sends photos (CLAUDE.md → "Product proof and related projects") |

### 3.2 Project-by-project (all 13 live)
| ☐ | Project (folder) | Status | Open items |
|---|---|---|---|
| ☐ | Water Power Lofts Rockford | live, featured | Confirm the building type (loft conversion?), scope, and year (photo dates suggest 2024) |
| ☐ | SRIS International School | live, featured | **Location unknown** (currently "Chicago area, IL") |
| ☐ | **Mosque** | live, featured | **Real name needed.** The folder was "Mosq" and is now "Mosque"; the title follows the folder name. Sector is provisionally `commercial`; revisit once the name and permission are confirmed. Location unknown. Explicit permission to show a religious facility |
| ☐ | 914 W Hubbard St | live, featured | Condos or apartments? Who was the client (property manager or association)? Year: photo dates suggest 2024 |
| ☐ | UPS Center | live, featured | Which UPS facility, and where? Naming permission. No UPS branding is visible. The photos show an operating facility's interior (sort floor); confirm they may be published |
| ☐ | 118 S Clinton | live, featured | Apartments over ground-floor retail (mixed-use)? The photos show a leasing/amenity space, not an apartment. Both interiors show another company's leasing boards; a cleaner interior shot would help |
| ☐ | ERIK'S Bike Shop | live, not featured | **No photo clearly shows a window shade.** 3 of 5 are storefront exteriors dominated by the ERIK'S logo. Need interior photos of the installed shades, the store location, and permission to name the client and show its branding. Year: photo dates suggest 2023. The folder was renamed from "ERIK_S Bike Shop" |
| ☐ | Friendship Junior High School | live | One client photo plus one web image. More photos, ideally landscape. Location assumed to be Des Plaines, IL |
| ☐ | 811 West Evergreen | live | Apartments or condos? New construction or gut rehab? |
| ☐ | Grove Junior High School | live (**web photos only**) | Photos of the completed work. Both images are web-sourced exteriors. The folder was renamed from "Grove Junior HighSchool" |
| ☐ | Salt Creek Elementary School | live (**web photo only**) | Photos of the completed work. **The building's sign reads "Salt Creek Primary School"**, so confirm the correct name (the folder name drives the title) |
| ☐ | Lexus Glenview | live (**web photos only**) | Photos of the completed work. **The signage reads "Fields Lexus Glenview"**, so confirm how to name it, and get permission |
| ☐ | Stern Pinball | live (**video stills only**) | Real photos (the 6 gallery images are stills from 478×850 videos). **Confirm the shades are motorized** (they move in unison in the videos). Naming permission |

Dropped mock: P03 (Skokie Senior Living). No matching folder.

### 3.3 Web-sourced images (included for now; rights unconfirmed)
Marked `origin: web` in frontmatter. Shown in galleries; never the home hero, and not covers when a client photo exists.

| ☐ | File (in `src/assets/projects/`) | Source / issue | Size | Cover? |
|---|---|---|---|---|
| ☐ | `811 West Evergreen/811-w-evergreen-st-chicago-il-building-photo-1-large.jpg` | Listing-site photo (the original is an AVIF named `.jpg`) | 882×588 | no |
| ☐ | `811 West Evergreen/811-w-evergreen-02-777x515.jpg` | Listing photo with a **third-party watermark** | 777×515 | no |
| ☐ | `914 W Hubbard St/img-0150.jpg` | Marketing photo with a replaced sky; readable plates possible | 624×480 | no |
| ☐ | `914 W Hubbard St/img-0151.jpg` | Marketing photo with a replaced sky | 1536×1080 | no |
| ☐ | `Friendship Junior High School/friendship-jr-high-school-des-plaines-il-schoolphoto.jpg` | School-directory image (the original is an AVIF) | 650×433 | no |
| ☐ | `Grove Junior High School/grove-junion-high.jpg` | Web exterior; shows no installed shades | 2048×1536 | **yes** (no client photo) |
| ☐ | `Grove Junior High School/d59-grove-junior-high.jpg` | School district website image | 1020×357 | no |
| ☐ | `Lexus Glenview/unnamed.jpg`, `unnamed-1.jpg` | Google Maps–style grabs; show no installed shades | 680×453 | **yes**, `unnamed.jpg` (no client photo) |
| ☐ | `Lexus Glenview/images.jpg` | Web thumbnail | 387×516 | no |
| ☐ | `Salt Creek Elementary School/salt-creek-elementary-school-elmhurst-il-primaryphoto.jpg` | School-directory image; shows no installed shades | 650×433 | **yes** (only photo) |
| ☐ | `SRIS International School/unnamed-2.jpg` | Google Maps–style grab | 680×453 | no |
| ☐ | `118 S Clinton/118-s-clinton.jpg` | **Source unknown** (no camera data; looks like a professional or listing photo). Treated as a client photo for now | 1200×900 | no |

**Low-res covers** (`check:projects` warns): Lexus Glenview (680 px), Salt Creek Elementary School (650 px), and Stern Pinball (478×850 video still). Replace before launch.

### 3.4 Duplicate photo (still excluded)
| ☐ | File | Status | What's needed |
|---|---|---|---|
| ☐ | `9d254165-73e9-445b-b5c2-6afba008c57b` | In both `118 S Clinton` and `811 West Evergreen`. **Shown in 811 West Evergreen only** (its timestamps match the other 811 photos); the 118 copy is in `scripts/image-exclude.json` | Which project does it belong to? |

### 3.5 Videos
Originals stay in `/assets` and are never committed. Web versions are generated by `npm run images` (settings in `scripts/video-config.json`) and committed in `public/videos/`.

| ☐ | Original | Web version | Notes / what's needed |
|---|---|---|---|
| ☐ | `Mosque/2612d69f-….mp4` (78 s, 478×850, 17.3 MB) | `public/videos/mosque/2612d69f.mp4` (4.4 MB) + poster @ 52 s | Walkthrough of the prayer hall. Original-resolution file or a YouTube/Vimeo link would look much better |
| ☐ | `Stern Pinball/af3755da-….MP4` (75 s, 478×850, 13.7 MB) | `public/videos/stern-pinball/af3755da.mp4` (4.4 MB) + poster @ 26 s | Shades lowering and rising across a conference room glass wall. Stills at 3, 10, 26, and 43 s are used as gallery images. A person is visible far away in the open office (not identifiable) |
| ☐ | `Stern Pinball/c97f5d90-….MP4` (50 s, 478×850, 9.3 MB) | `public/videos/stern-pinball/c97f5d90.mp4` (4.4 MB) + poster @ 22 s | Shades rising to reveal the open office. Stills at 22 and 49 s are used as gallery images |
| ☑ | All three | **Audio removed** in the web versions (size, and possible voices) | Decided 11/05/2026: audio stays off (see Resolved). It can be restored by re-encoding |

### 3.6 Photo review flags
Viewed 11/04/2026 (62 client photos) and 11/05/2026 (web images and video stills). Alt text, covers, and crop positions are in each project's frontmatter.

- Openness factors (1%, 3%, 5%) can't be verified from photos. Fabric descriptions ("solar screen", "room-darkening") are by appearance only.

**Privacy and branding: resolve before launch (blur, crop, or drop)**
| ☐ | Photo | Issue |
|---|---|---|
| ☐ | `Water Power Lofts Rockford/img-7721.jpg` | **Readable license plate** on a white van |
| ☐ | `Water Power Lofts Rockford/img-7723.jpg` | **Readable Illinois plates** on 2+ vehicles; shot through a car window |
| ☐ | `Water Power Lofts Rockford/img-5332.jpg`, `img-5333.jpg`, `img-5331.jpg` | Occupied unit with residents' belongings; needs resident consent. `img-5331` shows a boom lift with readable model text |
| ☐ | `914 W Hubbard St/img-0150.jpg`, `img-0151.jpg`; `811 West Evergreen/811-w-evergreen-*.jpg` | Street exteriors with parked cars; check plates at full size |
| ☐ | `SRIS International School/2cff0a32…`, `5da54172…`, `8fa88533…`, `b460dfcc…` | Room number "213" readable. `5da54172`, `11a95098`, and `b460dfcc` show reflections of two people (not identifiable) |
| ☐ | `Friendship Junior High School/112edd83….jpg` | Room number "336" readable; bulletin board with personal photos and a "Thank You" note |
| ☐ | `ERIK'S Bike Shop/img-4063.jpg`, `img-4067.jpg`, `img-4746.jpg` | ERIK'S logo dominant; unit number "1600-T24"; door posters with a URL and QR code. `img-4064` shows a neighboring store's sign. `img-4737`: check plates in the parking lot at full size |
| ☐ | `Lexus Glenview/*.jpg` | Dealership branding ("Fields Lexus Glenview", Lexus logo); parked cars |
| ☐ | `118 S Clinton/8436235e….jpg`, `c64c4ae9….jpg` | Third-party leasing boards ("The Junction", "The Depot", "SL / South 118" logo) |
| ☐ | `118 S Clinton/118-s-clinton.jpg` | Third-party storefront signage (Subway, Aligned Modern Health) |
| ☐ | `811 West Evergreen/a78261ed….jpg` | A resident's grill on the balcony (occupied unit) |
| ☐ | `Mosque/edf3b642….jpg` | A parked car is visible (no plate) |
| ☐ | `UPS Center/1b213b7c….jpg` | View of the sort floor; a worker may be visible far away (not identifiable) |
| ☐ | `Stern Pinball/video-af3755da-10s.jpg` and both videos | A person is visible far away in the open office (not identifiable) |

**Quality: candidates to drop before launch (not applied)**
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
| ☐ | Every `origin: web` image (section 3.3) | Rights unconfirmed; low resolution; mostly don't show the work |

**Useful pairs (keep together in galleries):** Mosque before/after `97d4c537` → `ff62246c` and `d4404be4` → `edf3b642`; SRIS lowered/raised `033ef675` / `b87a8632`; 811 West Evergreen raised/lowered `a78261ed` / `c49de731`.

**Resolution:** the Mosque photos are only 2000 px wide (likely sent through a messaging app). Ask for the originals. The home hero must be a client photo at 2560 px: `Water Power Lofts Rockford/img-5335.jpg` (first choice), then `SRIS International School/033ef675….jpg`. Never a web image or a video still.

## 4. Copy placeholders (`docs/additional-content.md`)

Everything outside `docs/approved-copy.md` is a placeholder. Items marked [CONFIRM] in the source:

| ☐ | Section | Item |
|---|---|---|
| ☐ | §2 Trust strip | Optional stats ("[X]+ shades supplied", "[X] schools completed", "Serving Chicago since [year]"). Show only with real numbers |
| ☐ | §3 Why work with us | #2 consistent product claim; #3 labeling by unit or room; #6 quote turnaround |
| ☐ | §4 How it works | Step 2 turnaround; step 3 submittals and samples; step 4 made to size, phased delivery, labeling; **step 5: do they install, coordinate installers, or supply only?** Home shows steps 1–4 only; step 5 is left out until this is answered |
| ☐ | Home microcopy (new, written for layout) | Hero caption label "Pictured"; trust-strip labels "Projects / Sectors / Range / Company"; "{n} projects in the gallery"; "School and public-sector projects"; "Industry pages"; staging-only note "These projects are sample write-ups until their details are confirmed."; section headings "How It Works" and "Why work with us"; footer labels "Contact / Office / Hours / Service area" (`src/copy/`, `src/components/`) |
| ☐ | Home "Example Request" read-back | The approved example is repeated as a filled-in table (Product type, Width and height, Quantity, Operating system, Project location, Expected timeline). Labels come from the approved checklist and values restate the example; confirm the client is happy with the treatment (`src/copy/placeholder.ts`) |
| ☐ | Home section order | Spec order was hero, who we serve, products, projects. Built as hero, who we serve, **projects, public sector, products**, who we are, how it works, fast quote, CTA, so proof comes before products (site-spec §3 allows refining the order) |
| ☐ | §5.1 Roller Shades | Fabric types offered (light-filtering, room-darkening/blackout, side channels, solar screen openness 1/3/5/10%, dual roller); options (mounts, fascia/cassette, bottom bars) |
| ☐ | §5.3 Faux Wood Blinds | Typical spec (2" slats, cordless lift, tilt wand, finishes) |
| ☐ | §5.4 Operating Systems | Each system's description; any standards claims (ANSI/WCMA A100.1); building-controls integration; **every cell of the comparison table**; fabric performance claims (NFPA 701, GREENGUARD Gold, antimicrobial, PVC-free) |
| ☐ | §6 Industry pages | Multifamily "how we help"; Education recommendations (flame-resistant fabrics); Government certifications (MBE/WBE/DBE/VBE), prevailing wage, tax-exempt purchasing, POs, vendor registrations |
| ☐ | §6 `/industries/` overview | **New page; no copy exists.** Title, meta description, and intro to write and approve |
| ☐ | §7 Project support services | Every item: takeoffs, field measuring, submittals, phased deliveries, labeling, installation, replacement orders, trade accounts |
| ☐ | §8 FAQ | Turnaround, minimum order, measurement verification, child-safety compliance, flame-resistant fabrics, building-controls integration, warranty, submittals, installation, phased delivery, extended service area, replacement orders |
| ☐ | §9 SEO metadata | All titles and descriptions are drafts. Plus new entries for `/industries/` and `/contact/thank-you/` |
| ☐ | §10 Microcopy | Upload helper "Up to 10 MB"; thank-you page turnaround; project-page CTA "Planning a similar project?" |
| ☐ | Projects pages microcopy (new, written for layout) | `/projects/` H1 "Commercial Window Covering Projects" (built on the §9 keyword; the intro is approved [PROJECTS]); filter-chip labels; project-page headings "Specifications", "Highlights", "Related pages", "Related projects", "Video(s)"; gallery labels "All photos" and "Full screen"; "Previous project" / "Next project". The Labor fact is hidden when a project's labor is "not specified" |
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
| 11/04/2026 | Stern Pinball and photo-less projects | Held back until photos of the completed work arrive (`_<slug>.md`). **Superseded 11/05/2026** (see below) |
| 11/04/2026 | Web-sourced and duplicate images | Excluded via `scripts/image-exclude.json` until rights are confirmed. **Superseded 11/05/2026** (see below) |
| 11/04/2026 | Featured set | Water Power Lofts Rockford, SRIS International School, Mosque, 914 W Hubbard St, UPS Center, and 118 S Clinton. ERIK'S Bike Shop was swapped out for 118 S Clinton (the agreed fallback) because none of its photos clearly shows a shade |
| 11/04/2026 | Placeholder copy vs. photos | Write-ups were corrected to match the photos: chain operation everywhere (not cordless), no zebra or faux wood claims on live projects, interior-window privacy at SRIS and UPS, and new square openings at 811 West Evergreen |
| 11/05/2026 | Change of plan: show everything | All 13 projects are live (Grove, Lexus, Salt Creek, and Stern Pinball un-held; ERIK'S stays live). Every image is included, web-sourced and privacy-flagged ones too, except the 118 S Clinton copy of the duplicate photo. Removals will be decided before launch (§3.3 and §3.6) |
| 11/05/2026 | Stern Pinball media | 6 gallery stills extracted from its two videos. All three videos (Stern ×2, Mosque ×1) re-encoded to ~4.4 MB web MP4s with posters in `public/videos/` and referenced in frontmatter |
| 11/05/2026 | Product proof | `products` / `operatingSystems` now list only what photos or videos show. Zebra and motorized claims were removed from Lexus Glenview, Grove Junior High School, and Stern Pinball (Stern keeps motorized because its videos show it; confirm) |
| 11/05/2026 | Home hero photo | SRIS International School cover (`033ef675…`, 2560 × 1920 client photo): it shows the product most clearly. 16:9 crop from 768 px, the full 4:3 frame on phones (`src/config/home.ts`). The user delegated this decision |
| 11/05/2026 | Video audio | Stays removed from the web videos (smaller files, no voices published). The user delegated this decision |
