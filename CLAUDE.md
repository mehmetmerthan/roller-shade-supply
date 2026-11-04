# CLAUDE.md — Roller Shade Supply Website

## Project at a glance
- **Client:** Roller Shade Supply, a Chicago-based supplier of commercial window coverings (roller shades, zebra shades, faux wood blinds) for builders, general contractors, multifamily developers, property managers, commercial businesses, schools, and government agencies.
- **Audience:** trade, wholesale, and project-based buyers. **Not homeowners.**
- **Site goals:** (1) turn visits into qualified quote requests, (2) prove capability with the completed projects in `/assets`, (3) rank for commercial window-covering searches in Chicagoland.
- **Primary conversion:** the quote form at `/request-a-quote/`. Secondary: phone call, email.

## Language & locale
- Everything is in **American English**: site copy, code, comments, commit messages, file names, and your replies in this repo.
- US conventions: inches (`50" W × 50" H`), phone format `(312) 555-0148`, `MM/DD/YYYY`, Central Time.

## Read before working
| File | What it is | Status |
|---|---|---|
| `docs/approved-copy.md` | Client-written copy | **Approved.** Use as written; light edits for layout only; never change meaning |
| `docs/additional-content.md` | Gap-filling copy: company details, process, FAQ, industry pages, SEO metadata, microcopy, legal, open questions | **Placeholder.** Needs client confirmation |
| `docs/mock-projects.yaml` | 14 mock project write-ups | **Placeholder.** Adapted to the real folder names |
| `docs/site-spec.md` | Detailed specs: design brief, sitemap, pages, components, galleries, form, SEO/schema, a11y, performance | Reference. Read the relevant section before building that part |
| `CONTENT_TODO.md` | Every placeholder and open question (you create and maintain it) | Living document |

## Tech stack (don't deviate without asking)
- **Astro** (latest stable), `output: 'static'`, TypeScript `strict`.
- **Tailwind CSS v4** via `@tailwindcss/vite`; design tokens in `src/styles/global.css` under `@theme`.
- **Content collections** in `src/content.config.ts` (`glob` loader + Zod schema).
- **Images only through `astro:assets`** (`<Image />`, `<Picture />`, `getImage`). Never a raw `<img src>` for local photos.
- `@astrojs/sitemap` · self-hosted fonts via **Fontsource** (no Google Fonts CDN) · **PhotoSwipe** for the lightbox.
- Interactivity = small vanilla TypeScript `<script>`s. No React/Vue unless a component truly needs it (ask first). No jQuery, UI kits, CSS-in-JS, or animation libraries.
- **Default deploy:** Netlify (static) + Netlify Forms. Keep the form backend behind an adapter (`src/lib/forms.ts`).
- Unsure about a current API (Astro, Tailwind v4, PhotoSwipe)? Check the official docs (Context7 MCP if available). Don't guess.

## Commands
```bash
npm run dev             # dev server → http://localhost:4321
npm run build           # production build (runs check:projects first)
npm run preview         # serve the production build
npm run check           # astro check (types + diagnostics)
npm run images          # optimize /assets → src/assets (scripts/prepare-images.mjs)
npm run check:projects  # every project folder has a content entry, and vice versa
```

## Repository layout (target)
```
/assets/                          # CLIENT DROP ZONE: original files. Gitignored. Never modify or delete.
  brand/logo.(svg|png)            #   a logo file directly in /assets/ is also accepted
  projects/<Project Name>/        #   one folder per project; folder name = project name
                                  #   (project folders directly under /assets/ are also accepted)
src/
  assets/brand/                   # logo, copied by `npm run images`
  assets/projects/<Project Name>/ # optimized photos, same folder names. Committed.
  components/ (sections/, ui/)  layouts/  pages/  styles/  config/  lib/
  content/projects/<slug>.md      # one entry per project folder (`_<slug>.md` = held back)
  content.config.ts
scripts/prepare-images.mjs  scripts/check-projects.mjs  scripts/image-exclude.json  scripts/lib/
docs/   CONTENT_TODO.md   /.screenshots/ (gitignored)
```

## Project photos — rules
1. **The folder name is the source of truth** for the project title. Display it exactly as written. Only convert to Title Case if it's all lowercase or uses `_`/`-` as separators, and log that in `CONTENT_TODO.md`. `slug` = kebab-case of the folder name (`&` → `and`, strip other punctuation).
2. Every image-containing subfolder of `/assets/projects/` (or of `/assets/` itself, except `brand`) is a project folder.
3. **`npm run images`** (sharp), idempotent (skips files whose output is newer than the source):
   - auto-rotate from EXIF, resize to max 2560 px on the long edge, JPEG output (mozjpeg, quality ≈ 82);
   - **strip all metadata.** Phone photos carry GPS coordinates;
   - keep original base names, lowercased and slugified (`IMG_2034.JPG` → `img-2034.jpg`); `cover.*` stays `cover.jpg`;
   - skip `.DS_Store` and `Thumbs.db`;
   - HEIC: convert with `heic-convert` (sharp's prebuilt binaries can't decode HEIC) or ask for JPGs;
   - videos (`.mp4`, `.mov`): don't copy or commit; list them in `CONTENT_TODO.md`;
   - detect the format from file content, not the extension (some client `.jpg` files are AVIF);
   - skip every file listed in **`scripts/image-exclude.json`** (`{ "file": "<Folder>/<file name>", "reason": "…" }`): web-sourced images without confirmed rights, duplicates, and anything else the client hasn't cleared. Log each one in `CONTENT_TODO.md`;
   - prune stale outputs in `src/assets/projects/` (never touch `/assets`);
   - print a before/after size report.
4. **Galleries are auto-discovered:** `import.meta.glob('/src/assets/projects/*/*.{jpg,jpeg,png,webp,avif}', { eager: true })`, grouped by folder, natural sort (`2` before `10`). Cover = frontmatter `cover`, else `cover.*`, else the first image. The client can control order by prefixing file names with `01-`, `02-`…
5. Each folder maps to `src/content/projects/<slug>.md` whose frontmatter `folder` equals the exact folder name. `check:projects` fails the build on any mismatch.
6. **Alt text:** prefer `photos[].alt` from frontmatter, written by actually viewing the photo (see `docs/site-spec.md` §8). Fallback: `"{Products} at {Project Title}, {Location}"`.
7. **Mock text:** give each folder the best-fitting entry from `docs/mock-projects.yaml`. Infer the sector from the folder name:
   - school / academy / elementary / middle / high / college / learning → `education`
   - apartments / lofts / residences / homes / senior / living / tower → `multifamily`
   - library / city / village / county / municipal / police / fire / park district / state → `government`
   - office / HQ / medical / clinic / retail / hotel → `commercial`
   - otherwise → the remaining entries in order.
   Use the folder name as the title, rewrite the text to read naturally with it, and keep `placeholder: true`. More than 14 folders → write new entries in the same style. Fewer → drop unused mocks. Always show the mapping table for approval before generating files.

### Project frontmatter schema (keep in sync with `src/content.config.ts`)
```
title: string                 # = folder name (rule 1)
folder: string                # exact folder name
sector: multifamily | commercial | education | government | mixed-use
industries: (multifamily | commercial | education | government)[]
location: string              # "West Loop, Chicago, IL"
year: number
clientType: string
projectType: new-construction | renovation
labor: union | non-union | not-specified
products: (roller-shades | zebra-shades | faux-wood-blinds)[]
fabrics: string[]
operatingSystems: (cordless | chain | motorized | solar-motorized)[]
scope: string
quantity?: number
timeline: string
summary: string               # ≤ 160 chars; used as the meta description
highlights: string[]          # exactly 3
featured: boolean
order: number
placeholder: boolean
cover?: string                # filename override
photos?: { file: string, alt: string, position?: string }[]
                              # position = CSS object-position for crops, e.g. "50% 35%"
video?: string                # YouTube/Vimeo URL
```
Body (Markdown): `## Overview` · `## The Challenge` · `## Our Solution` · `## The Result`.

### Held-back projects
A project folder with no usable photos (only excluded images, or only videos) is **held back**: its entry is saved as `src/content/projects/_<slug>.md`. The collection's glob pattern (`[^_]*.md`) skips it, so it gets no page and never appears in listings, carousels, related projects, the sitemap, or JSON-LD. `check:projects` lists held entries and warns "ready to enable" once the folder has usable images.

### Adding a project later
Drop the folder into `/assets/projects/` → `npm run images` → create `src/content/projects/<slug>.md` (copy an existing one) → `npm run check:projects`.
To publish a held-back project: add photos to its folder in `/assets/projects/` → `npm run images` → rename `_<slug>.md` to `<slug>.md` → `npm run check:projects`.

## Design principles (full brief: `docs/site-spec.md` §1)
- Use the **frontend-design** skill for all UI work. Commit to one clear aesthetic direction, approved in plan mode, and apply it consistently.
- **Personality:** dependable, precise, architectural, quietly confident. Built for contractors and procurement teams, not a home-décor boutique.
- **Photography leads.** Real project photos are the hero; the UI frames them.
- Palette derived from the logo + warm neutrals + **one** accent. **Max two typefaces.** 8 px spacing scale. Corners sharp or ≤ 4 px.
- **Approved direction: B "Chicago Window".** The current logo is a placeholder, so the palette comes from the brief, not the logo (reconcile when the real logo arrives). Tokens and contrast notes live in `src/styles/global.css`:
  - Layout is built on the Chicago window: a 2–8–2 module at ≥ 1024 px (narrow sash | wide pane | narrow sash), 4 px steel "mullions" for primary frames, and 1 px rules only for data structure.
  - Colors are vellum `paper`, `limestone` bands, steel `ink`, and redline `accent`.
  - Type is **Big Shoulders Display** for headings and **Public Sans** for text.
  - Project facts go in ruled spec tables, not dot-joined strings. Number things only when the content is a real sequence.
  - **No load animation.** Motion only in response to user actions.
  - **Color roles never overlap.** Accent red is for CTAs and links only. `error` crimson is for errors only: never a solid fill, always with an icon and words. The **focus ring is steel ink** (paper on dark), never red. Required fields say "(required)".
- **Signature motifs** (pick, refine, don't overuse): light and shadow · the alternating bands of a zebra shade · the roll-down reveal of a roller shade · fabric texture.
- **Avoid:** generic SaaS look, purple/blue gradients, gradient blobs, glassmorphism, emoji or clip-art icons, stock photos of people, auto-playing sliders, scroll-jacking, parallax overload, everything-centered layouts, Inter/Roboto/Open Sans/Arial as the display face, lorem ipsum, fake client logos.
- Motion is subtle and purposeful, and everything respects `prefers-reduced-motion`.
- **Mobile-first.** Contractors browse on phones on job sites: large tap targets, click-to-call, sticky "Request a Quote" on mobile.

## Visual QA loop (mandatory after every page or major component)
1. Run the dev server.
2. With Playwright MCP (or Chrome), take full-page screenshots at **375, 768, 1280, and 1440 px**.
3. Critique like a demanding art director: hierarchy, alignment, spacing rhythm, contrast, image crops, line length, orphans, empty or crowded areas, anything that looks generic or templated.
4. Fix and repeat. **At least two passes.**
5. Check the console for errors and tab through the page with the keyboard.
Save screenshots to `/.screenshots/`. Never call a page done without having looked at it.

## Non-negotiables
- **SEO:** unique `<title>` (≤ 60 chars) and meta description (140–160 chars) per page from `docs/additional-content.md` §9; one `<h1>`; canonical; Open Graph and Twitter tags; JSON-LD per `docs/site-spec.md` §6; all indexable content rendered as static HTML.
- **Accessibility:** WCAG 2.2 AA (public-sector buyers check this). Landmarks, skip link, visible focus, labeled fields, contrast, keyboard-operable menus, carousels, and lightbox.
- **Performance:** Lighthouse mobile ≥ 95 Performance, 100 Accessibility/Best Practices/SEO. LCP ≤ 2.0 s, CLS ≤ 0.05. Zero JS on pages that don't need it. Hero image `loading="eager" fetchpriority="high"`, everything else lazy. Reserved dimensions or aspect ratio on all media.
- **Single sources of truth:** company details and feature flags in `src/config/site.ts`, navigation in `src/config/nav.ts`. Never hard-code the phone, email, or address in components.

## Placeholder policy
- Anything not in `docs/approved-copy.md` is a placeholder until the client confirms it. Track every placeholder in `CONTENT_TODO.md` (file · item · what's needed) and mark code with `// TODO(content):`.
- **Never present invented statistics, testimonials, certifications, client names, or brand partnerships as real.** The Testimonials component may exist but stays off (`features.testimonials = false`) until real, approved quotes are supplied.
- Don't invent facts beyond the docs. If new copy is needed, write it in the same plain, confident tone and log it in `CONTENT_TODO.md`.

## Code conventions
- Components: PascalCase `.astro` files, one job each, typed `Props` interface. Pages stay thin; sections live in `src/components/sections/`, primitives in `src/components/ui/`.
- Tailwind utilities with theme tokens; no arbitrary values when a token exists; no inline styles.
- Native elements first (`<button>`, `<details>`, `<dialog>`). Every interactive element has an accessible name.
- Commit at the end of each phase with a clear message (e.g., `feat: project gallery with lightbox`). Never commit `/assets`, `/.screenshots`, `dist`, or `.env`.

## Definition of done (per page)
Content complete (or placeholders logged) · screenshots reviewed at 4 widths · no console errors · keyboard pass · `npm run check` and `npm run build` pass · meta + JSON-LD present · internal links work.

- **The current logo in `/assets/brand/` is a TEMPORARY PLACEHOLDER.** Don't derive the palette from it. Build the header, footer, and favicons so the final logo (any aspect ratio, SVG or PNG) can drop in by replacing the files. Track "final logo" in `CONTENT_TODO.md`.