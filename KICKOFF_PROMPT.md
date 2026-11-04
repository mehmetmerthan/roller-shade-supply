# Kickoff Prompts — Roller Shade Supply Website

Paste these into Claude Code **one phase at a time**. Let each phase finish, look at the screenshots, give feedback, and only then move on.
If a session gets long, run `/clear` between phases. `CLAUDE.md` is reloaded automatically, so the rules carry over.

---

## 0. One-time setup (before Prompt 1)

**1. Folder structure**
```
roller-shade-supply/
├── CLAUDE.md
├── KICKOFF_PROMPT.md
├── docs/
│   ├── approved-copy.md
│   ├── additional-content.md
│   ├── mock-projects.yaml
│   └── site-spec.md
└── assets/
    ├── brand/
    │   └── logo.svg             ← SVG preferred; PNG works
    └── projects/
        ├── <Project Name 1>/    ← 5–10 photos each; folder name = project name
        ├── <Project Name 2>/
        └── … (14 folders)
```

**2. Git:** `git init`, then commit everything except `/assets` (Claude will add `/assets` to `.gitignore` in Phase 2).

**3. Design skill** (inside Claude Code):
```
/plugin install frontend-design@claude-plugins-official
```
If it isn't found, open `/plugin` → **Discover** and search "frontend-design".

**4. Give Claude eyes** (in your terminal, from the project folder):
```
claude mcp add playwright -- npx @playwright/mcp@latest
```
Optional: add the Context7 MCP server for up-to-date Astro/Tailwind docs.

**5. Start Claude Code** in the project folder: `claude`. Check `/mcp` shows **playwright** and `/plugin` shows **frontend-design** as enabled.

**6.** Press **Shift+Tab** until the mode shows **plan mode** before pasting Prompt 1.

---

## Prompt 1 — Discovery & plan (plan mode, no code)

```text
Read CLAUDE.md and every file in /docs. Then, without writing any code:

1. ASSET INVENTORY — List every project folder in /assets with its exact name and file count. Flag non-image files, HEIC files, files over 8 MB, and anything that looks out of place. Find the logo, tell me its format, and sample its actual colors (hex).

2. PROJECT MAPPING — Propose a table mapping each folder to an entry in docs/mock-projects.yaml:
   folder name → slug → inferred sector → mockId → reason.
   Flag folders whose names don't make the sector obvious.

3. DESIGN DIRECTIONS — Using the frontend-design skill, propose TWO distinct design directions per docs/site-spec.md §1. For each: name, rationale, palette (hex + contrast ratios for text pairs), type pairing (Fontsource), grid/spacing approach, one signature element, and a written sketch of the home-page hero. Tell me which one you recommend and why.

4. SITEMAP — Confirm the sitemap in site-spec §2 or suggest changes.

5. RISKS & QUESTIONS — List anything unclear, risky, or missing, and the questions I should ask the client.

Stop and wait for my approval.
```

---

## Prompt 2 — Foundation

```text
Approved: design direction [A / B] with these changes: [ … or "none" ].
Approved: project mapping with these changes: [ … or "none" ].

Build the foundation:
1. Scaffold Astro in this folder: TypeScript strict, Tailwind v4 (@tailwindcss/vite), @astrojs/sitemap, Fontsource packages for the chosen fonts. .gitignore must include /assets, /.screenshots, node_modules, dist, .env.
2. Write scripts/prepare-images.mjs per CLAUDE.md and run `npm run images`. Report the before/after total size.
3. Create src/config/site.ts (company details from docs/additional-content.md §1, feature flags with testimonials = false) and src/config/nav.ts.
4. Define the projects collection in src/content.config.ts exactly per the CLAUDE.md schema. Generate one src/content/projects/<slug>.md per folder from the approved mapping, rewriting the mock text so it reads naturally with the real project name. Keep placeholder: true.
5. Use subagents (3–4 projects each) to view every photo and: write descriptive alt text, choose the best cover, and flag blurry/duplicate/dark photos and anything private (faces, license plates, readable addresses). Save alt text and cover into the frontmatter.
6. Write scripts/check-projects.mjs and run it before every build.
7. Create CONTENT_TODO.md listing every placeholder and open question so far (start from docs/additional-content.md §12).
8. Put the approved design tokens in src/styles/global.css (@theme).

Run `npm run check` and `npm run build`, then commit: "chore: project foundation".
```

---

## Prompt 3 — Design system & styleguide

```text
Build /styleguide/ (noindex, excluded from the sitemap) showing: color tokens, type scale, buttons (all variants and states), links, form fields (default/focus/error/disabled), badges and metadata labels, SectionHeading, ProjectCard, ProductCard, and one sample section using a real project photo.

Then run the visual QA loop from CLAUDE.md: screenshots at 375/768/1280/1440, critique against the approved direction like a demanding art director, fix, and repeat at least twice. Show me the final screenshots with a short list of what you changed and why.
```

---

## Prompt 4 — Layout & Home page

```text
Build BaseLayout (SEO head, skip link), Header (desktop dropdowns, phone number, "Request a Quote" button), the mobile menu, the mobile sticky action bar (Call / Get a Quote), and Footer per docs/site-spec.md §2.

Then build the Home page per site-spec §3, using docs/approved-copy.md verbatim where it applies. "Selected Projects" is a carousel of featured projects (site-spec §5).

Run the visual QA loop at all four widths, at least two passes. Also test keyboard navigation through the header and the carousel, the console for errors, and prefers-reduced-motion. Commit.
```

---

## Prompt 5 — Projects

```text
Build /projects/ (filter chips; ProjectCards with the mini-gallery peek) and /projects/[slug]/ (main gallery with thumbnails and a counter, PhotoSwipe lightbox, Overview / Challenge / Solution / Result, spec panel, highlights, related product and industry links, previous/next, and a CTA with a prefilled quote link) per site-spec §3 and §5.

Requirements: visible prev/next buttons, keyboard ←/→, touch swipe, no autoplay, works without JS, cards load only the cover until interaction, no layout shift.
Test with the projects that have the most and the fewest photos. Run the visual QA loop, plus a lightbox keyboard test (Tab, Esc, arrows, focus return). Commit.
```

---

## Prompt 6 — Products, Industries, About, FAQ, How to Measure

```text
Build /products/, the three product pages, /products/operating-systems/, the four /industries/ pages, /about/, /faq/, and /how-to-measure/ per site-spec §3, using docs/additional-content.md. Related projects come from the content collection (filter by products / industries).
If it fits the approved direction, add the openness visualizer island to the Roller Shades page.

Keep the layouts consistent but not identical: vary the section rhythm so pages don't feel templated. Run the visual QA loop for each page type. Commit.
```

---

## Prompt 7 — Quote form, Contact, Thank-you, Legal, 404

```text
Build /request-a-quote/ with the form per site-spec §7 (repeatable measurement rows, file upload, prefill from the query string, accessible validation with an error summary, honeypot, Netlify Forms markup, works without JS, dev-only stub). Also build the thank-you page, /contact/, /privacy-policy/, /accessibility/, and the 404 page.

Test at 375 and 1440: empty submit (error summary + inline errors), invalid email, adding and removing measurement rows, prefill via ?product=zebra-shades&projectType=school, and completing the whole form with the keyboard only. Run the visual QA loop. Commit.
```

---

## Prompt 8 — SEO, accessibility & performance pass

```text
Audit and fix the whole site:
1. META — every page has its title and description from docs/additional-content.md §9, plus canonical, Open Graph/Twitter tags, and an OG image. Generate favicons and the web manifest from the logo.
2. STRUCTURED DATA — JSON-LD per site-spec §6. Check the output is valid.
3. CRAWLING — sitemap and robots.txt; noindex on the thank-you page and the styleguide.
4. LINKS — every project ↔ product ↔ industry cross-linked; no broken links.
5. ACCESSIBILITY — WCAG 2.2 AA review: headings, landmarks, labels, contrast, focus, target sizes, carousel and lightbox ARIA.
6. PERFORMANCE — run Lighthouse (mobile) against `npm run preview` on Home, /projects/, one project page, and /request-a-quote/. Hit the CLAUDE.md budgets and report before/after scores.
Update CONTENT_TODO.md. Commit.
```

---

## Prompt 9 — Independent final review (fresh session)

Run `/clear` first.

```text
Act as a senior art director and a technical SEO reviewer who has never seen this project. Use separate subagents:
- DESIGN — screenshot every page at 375 and 1440. Critique hierarchy, consistency, spacing, typography, image use, and anything that looks generic or AI-templated. Rank the issues by impact.
- CONTENT — list every placeholder still visible on the site and anything that contradicts docs/approved-copy.md.
- TECHNICAL — broken links, console errors, missing alt text, missing meta, schema problems, Lighthouse regressions.
Give me one prioritized fix list. Wait for my approval, then fix the top issues.
```

---

## Tips for giving feedback
- Be specific and visual. "The hero headline is too small on mobile; make it the dominant element" works much better than "make it better."
- Paste screenshots of sites you like and say exactly what you like (spacing, type, image treatment).
- If a page drifts from the direction: "Re-read the approved direction and the Avoid list in CLAUDE.md, then redo this section."
- When the client answers questions, paste the answers and say: "Update site.ts, the affected pages, and CONTENT_TODO.md."
