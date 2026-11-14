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
| ☐ | Founding year and team details | none | Optional, for Who We Are |
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
| ☐ | Permission to publish | Written OK to publish each project name and its photos. **Especially:** UPS Center, Lexus Glenview, Stern Pinball, ERIK'S Bike Shop, the schools, and Community Club. Can visible brand signage stay in the photos? |
| ☐ | Real facts | Location, year, products, fabrics, quantity, operating systems, union / non-union, client type (may we name the GC or owner?), and a one-paragraph story |
| ☐ | Government projects | Approved copy says "successfully completed government and public-sector projects", but every public-sector folder is a school. Are there non-school government projects with photos? |
| ☐ | Product proof | Every project shows **chain-operated roller shades**, except Stern Pinball, which appears motorized. **We have no photos of zebra shades, faux wood blinds, cordless, or solar-powered systems.** No project counts as proof for them until the client sends photos (CLAUDE.md → "Product proof and related projects") |

### 3.2 Project-by-project (all 13 live)
| ☐ | Project (folder) | Status | Open items |
|---|---|---|---|
| ☐ | **The Henry** | live, featured (#1) | Added 11/14/2026. **Client facts:** 245 luxury residential units and 49 townhouses; many shades motorized with solar charging (the Overview is the client's sentence verbatim; the summary is shortened to fit 160 characters). **Placeholders to confirm:** location (now "Chicago area, IL"), year (now 2025), client type, timeline, and the Challenge / Solution / Result text. Motorized and solar are listed on the client's word; no photo shows a motor or panel. Three photos are 1600 × 1200 (sent compressed), so the originals would be sharper. The folder `the-henry` is shown as "The Henry" (rule 1 Title Case) |
| ☐ | Water Power Lofts Rockford | live, featured (#3) | Confirm the building type (loft conversion?), scope, and year (photo dates suggest 2024) |
| ☐ | SRIS International School | live, featured (#5) | **Location unknown** (currently "Chicago area, IL") |
| ☐ | **Community Club** | live (no longer featured, 11/14/2026) | Renamed at the client's request on 11/11/2026 (folder, title, and URL `/projects/community-club/`; the old URL redirects). Sector is provisionally `commercial`. Location unknown. Permission to publish the name and photos |
| ☐ | 914 W Hubbard St | live (no longer featured, 11/14/2026) | Condos or apartments? Who was the client (property manager or association)? Year: photo dates suggest 2024 |
| ☐ | UPS Center | live, featured (#6) | Which UPS facility, and where? Naming permission. No UPS branding is visible. The photos show an operating facility's interior (sort floor); confirm they may be published |
| ☐ | 118 S Clinton | live, featured (#2) | Apartments over ground-floor retail (mixed-use)? The photos show a leasing/amenity space, not an apartment. Both interiors show another company's leasing boards; a cleaner interior shot would help |
| ☐ | ERIK'S Bike Shop | live, featured (#4, client's choice 11/14/2026) | **No photo clearly shows a window shade.** 3 of 5 are storefront exteriors dominated by the ERIK'S logo. Need interior photos of the installed shades, the store location, and permission to name the client and show its branding. Year: photo dates suggest 2023. The folder was renamed from "ERIK_S Bike Shop" |
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
| ☐ | `the-henry/henry-aerial-59-20231121-temp-rendering-scaled.jpg` | **Developer's aerial rendering** (not a photo; the file name says "temp rendering"). Shown last in the gallery and captioned as a rendering; confirm the rights or replace it with a real exterior photo | 2560×1707 | no |
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
| ☐ | `Community Club/2612d69f-….mp4` (78 s, 478×850, 17.3 MB) | `public/videos/community-club/2612d69f.mp4` (4.4 MB) + poster @ 52 s | Walkthrough of the main hall. Original-resolution file or a YouTube/Vimeo link would look much better |
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
| ☐ | `Community Club/edf3b642….jpg` | A parked car is visible (no plate) |
| ☐ | `UPS Center/1b213b7c….jpg` | View of the sort floor; a worker may be visible far away (not identifiable) |
| ☐ | `Stern Pinball/video-af3755da-10s.jpg` and both videos | A person is visible far away in the open office (not identifiable) |

**Quality: candidates to drop before launch (not applied)**
To drop one, add it to `scripts/image-exclude.json` with the reason and run `npm run images`.
| ☐ | Photo | Reason |
|---|---|---|
| ☐ | `Community Club/e42d144d….jpg` | Distorted, low resolution (1600×1200), near-duplicate of `c561fab4` |
| ☐ | `Community Club/91f7fbbf….jpg` | Shades can't be made out |
| ☐ | `Water Power Lofts Rockford/img-7723.jpg` | Shot through a car window, readable plates, no shades |
| ☐ | `Water Power Lofts Rockford/img-5406.jpg` | Near-duplicate of `img-5410`; shade barely visible |
| ☐ | `SRIS International School/8fa88533…`, `66a12158…`, `11a95098…`, `b460dfcc…` | Near-duplicates of other SRIS photos (two show reflections of people and ladder clutter) |
| ☐ | `914 W Hubbard St/img-7109.jpg`, `img-7106.jpg` | Shade fully raised and barely visible / overexposed, weak composition |
| ☐ | `ERIK'S Bike Shop/img-4067.jpg`, `img-4063.jpg` | Near-duplicate entrance shots; no shades |
| ☐ | `118 S Clinton/c64c4ae9….jpg` | Shades fully raised; same angle as `8436235e` |
| ☐ | Every `origin: web` image (section 3.3) | Rights unconfirmed; low resolution; mostly don't show the work |

**Useful pairs (keep together in galleries):** Community Club before/after `97d4c537` → `ff62246c` and `d4404be4` → `edf3b642`; SRIS lowered/raised `033ef675` / `b87a8632`; 811 West Evergreen raised/lowered `a78261ed` / `c49de731`.

**Resolution:** the Community Club photos are only 2000 px wide (likely sent through a messaging app). Ask for the originals. The home hero must be a client photo at 2560 px: `Water Power Lofts Rockford/img-5335.jpg` (first choice), then `SRIS International School/033ef675….jpg`. Never a web image or a video still.

## 4. Copy placeholders (`docs/additional-content.md`)

Everything outside `docs/approved-copy.md` is a placeholder. Items marked [CONFIRM] in the source:

| ☐ | Section | Item |
|---|---|---|
| ☐ | §2 Trust strip | **Removed from Home on 11/05/2026** (it repeated the sections below it). Optional stats ("[X]+ shades supplied", "[X] schools completed", "Serving Chicago since [year]") could return, but only with real numbers |
| ☐ | §3 Why work with us | #2 consistent product claim; #3 labeling by unit or room; #6 quote turnaround |
| ☐ | §4 How it works | Step 2 turnaround; step 3 submittals and samples; step 4 made to size, phased delivery, labeling; **step 5: do they install, coordinate installers, or supply only?** Not shown anywhere since 11/11/2026 (removed from Home, then from the short quote page). The copy stays in `docs/additional-content.md` |
| ☐ | Home microcopy (new, written for layout) | Section heading "Why Work With Us"; "{n} projects in the gallery"; product-card links "Get Pricing for {Product}" (§10 draft); footer labels "Contact / Office / Hours / Service area" (`src/copy/`, `src/components/`) |
| ☐ | Navigation labels (new, 11/05/2026) | Header and menu: "Who We Are · Who We Serve · Our Products · Projects · Contact" (section headings; "Projects" is short for Selected Projects, "Contact" for Let’s Discuss Your Project). Footer columns "Company / Our Work / Get a Quote", short label "Public-Sector Experience", "Project Gallery", "Contact Us" (`src/config/nav.ts`) |
| ☐ | Home "Example Request" read-back | The approved example is repeated as a filled-in table (Product type, Width and height, Quantity, Operating system, Project location, Expected timeline). Labels come from the approved checklist and values restate the example; confirm the client is happy with the treatment (`src/copy/placeholder.ts`) |
| ☐ | Pages not built (11/05/2026) | The site is one page now, so §5 product pages, §6 industry pages and the `/industries/` overview, About, §8 FAQ, How to Measure, and Contact are **not built**. Their copy stays in `docs/additional-content.md`. The questions below still matter for quotes and for any page that returns |
| ☐ | §5.1 Roller Shades | Fabric types offered (light-filtering, room-darkening/blackout, side channels, solar screen openness 1/3/5/10%, dual roller); options (mounts, fascia/cassette, bottom bars) |
| ☐ | §5.3 Faux Wood Blinds | Typical spec (2" slats, cordless lift, tilt wand, finishes) |
| ☐ | §5.4 Operating Systems | Each system's description; any standards claims (ANSI/WCMA A100.1); building-controls integration; **every cell of the comparison table**; fabric performance claims (NFPA 701, GREENGUARD Gold, antimicrobial, PVC-free) |
| ☐ | §6 Industry pages | Multifamily "how we help"; Education recommendations (flame-resistant fabrics); Government certifications (MBE/WBE/DBE/VBE), prevailing wage, tax-exempt purchasing, POs, vendor registrations |
| ☐ | §7 Project support services | Every item: takeoffs, field measuring, submittals, phased deliveries, labeling, installation, replacement orders, trade accounts |
| ☐ | §8 FAQ | Turnaround, minimum order, measurement verification, child-safety compliance, flame-resistant fabrics, building-controls integration, warranty, submittals, installation, phased delivery, extended service area, replacement orders |
| ☐ | §9 SEO metadata | All titles and descriptions are drafts. Only the pages that exist use them: Home, Projects, Request a Quote, Privacy Policy, Accessibility, plus new entries for the thank-you page and the 404 page (`src/copy/seo.ts`) |
| ☐ | §10 Microcopy | Upload helper now says **7 MB** (see §6); thank-you page H1 lightly edited to "Thanks, we’ve received your request." and its turnaround; the 404 links point to Projects, Our Products (Home), Request a Quote, and Home; project-page CTA "Planning a similar project?" |
| ☐ | Quote form copy (short form, 11/11/2026) | The form is Name and Email (required), Phone, the approved "Tell Us About Your Project" box (optional), and the approved upload field. New microcopy: "Phone"; the upload hint; errors "Please enter your name.", "Please enter your email address." and the email-format, file-size, and file-type messages; "We use your details only to respond to your request."; "Prefer to talk?"; aside headings "Please include" and "Talk to our team". The approved "I am a", Product Type, Project Type, location, quantity, measurements, and operating-system fields were removed at the client's request; links from product and project pages still record the product and project type in hidden fields (`src/copy/placeholder.ts` → `quoteFormCopy`) |
| ☐ | Projects pages microcopy (new, written for layout) | `/projects/` H1 "Commercial Window Covering Projects" (built on the §9 keyword; the intro is approved [PROJECTS]); filter-chip labels; project-page headings "Specifications", "Highlights", "Related pages", "Related projects", "Video(s)"; gallery labels "All photos" and "Full screen"; "Previous project" / "Next project". The Labor fact is hidden when a project's labor is "not specified" |
| ☐ | How to Measure | "Approximate sizes are fine for budgeting; final sizes are verified before production" |
| ☐ | §11 Legal | `/privacy-policy/` (written from the §11 outline) and `/accessibility/` (the §11 draft) are **built and need legal review** before launch. The policy mentions cookieless analytics, which isn't set up yet (§6) |
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
| ☐ | Quote-form recipients | Who receives quote requests by email? Set them in Netlify → Forms → `quote` → notifications after the first deploy. The form can't be tested end to end until it's deployed on Netlify (locally it goes straight to the thank-you page) |
| ☐ | Upload size limit | Netlify Forms caps the whole request at **8 MB** (docs checked 11/05/2026), so the form allows one file under **7 MB** and points larger files to the quote email. Confirm that's acceptable, or plan a different upload service (`src/lib/forms.ts`) |
| ☐ | Preview site | https://roller-shade-supply-preview.netlify.app (Netlify, public link, noindex, robots.txt `Disallow: /`). It shows placeholder copy and sample write-ups, so share it as a draft. The `quote` form is live there: submissions are stored in Netlify → Forms, and no emails go out until recipients are added. Redeploy with `npm run deploy:preview` |
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
| 11/05/2026 | One-page structure | At the user's request: Home carries the whole story (introduction → Who We Are → Who We Serve → Why Work With Us → public sector → Our Products → Selected Projects → Get a Fast Quote → Let’s Discuss Your Project), and the header links scroll to its sections. Removed: the "Pictured" hero sash (the photo now sits beside the introduction), the school and public-sector project list, the industry-page links, the trust strip, and How It Works on Home (moved to the quote page). Product, industry, About, FAQ, How to Measure, and Contact pages won't be built. `/request-a-quote/` (form + thank-you), `/privacy-policy/`, `/accessibility/`, and a 404 page were built |
| 11/11/2026 | Home introduction | The kicker "Roller Shade Supply", both hero buttons, and the phone/hours block are gone. The H1 runs across the top of the hero frame with the two approved [HERO] paragraphs under it (left) and the whole SRIS photo (right), sized so the H1 and the complete photo are on the first screen at every width. Who We Are is back to its plain layout (no card), because more cards felt overwhelming |
| 11/11/2026 | "Mosque" renamed "Community Club" | At the client's request: `/assets/projects/` folder (user-approved one-time rename, files untouched), optimized images, video folder, content entry, slug `/projects/community-club/` (301 from the old URL in `netlify.toml`), and the write-up and alt text reworded without the old name or religious terms |
| 11/11/2026 | Quote form | Short form at the client's request: Name and Email required; Phone, message, and file upload optional. All other fields removed |
| 11/14/2026 | The Henry and the featured order | The client added `the-henry` and approved its page and the home "Selected Projects" order: The Henry, 118 S Clinton, Water Power Lofts Rockford, ERIK'S Bike Shop, SRIS International School, UPS Center ("UPS Center" keeps its name). Community Club and 914 W Hubbard St are no longer featured. The developer's rendering stays in The Henry's gallery |
