# gogofigo-web

Portfolio site for **gogofigo** (Figo), illustrator and acrylic painter. Static Astro site deployed to Cloudflare Pages. Most visitors arrive from the Instagram bio, so **mobile first** in every decision.

## Commands

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + static build into dist/
npm run preview   # serve dist/ locally
```

## Stack

- Astro 7 (static output), TypeScript strict
- GSAP 3 + ScrollTrigger only. No other GSAP plugins, no smooth-scroll library, no custom cursor, no intro loader.
- No UI framework. Interactivity is small vanilla TS in `<script>` tags.
- Fonts: Geist and Geist Mono variable woff2, self-hosted in `public/fonts/` (OFL license alongside).

## Structure

```
src/
  config/site.ts        all editable info: name, tagline, URL, email, analytics token,
                        nav, socials, commission (open/closed, tiers, steps, VGen URL)
  content.config.ts     schemas for the works and events collections
  content/works/<slug>/ index.md + image file (one folder per work)
  content/events/       one .md per event
  lib/works.ts          getWorks(), getFeaturedWorks(), workUrl(), mediumLabel
  lib/events.ts         getEvents() → { upcoming, past }, formatEventDate()
  layouts/Base.astro    <head>, SEO, nav, footer, client router, page transition
  components/           Nav, Footer, Seo, WorkImage, WorkCard, WorkGrid,
                        GalleryFilter, Lightbox, Placeholder
  scripts/motion.ts     GSAP setup, shared easing, reduced-motion check
  scripts/reveal.ts     square-tile reveal for work images (imported by WorkGrid)
  styles/tokens.css     design tokens + @font-face
  styles/global.css     reset, base type, utilities (.container .label .button .section …)
  pages/                index (all work + filter), work/[slug], info (bio, contact, events),
                        commission, links (link-in-bio), 404
                        /gallery, /about, /events redirect (astro.config.ts + public/_redirects)
scripts/make-placeholders.mjs   regenerates the sample placeholder images
public/_headers         Cloudflare caching headers
```

## Design tokens (src/styles/tokens.css)

Concept: "white box" artist portfolio. Quiet off-white room, art is the only focus, almost no text.
Figo's feedback (2026-10-11): the first version felt like a company profile. Keep copy to a minimum:
no section headings, no CTA blocks, no uppercase label clutter. Captions are tiny (title + year).
Navigation: on desktop a fixed left column (wordmark, tagline, Work/Info/Commission, socials at the bottom),
no bar, blur or border. On phones a plain text line at the top that scrolls away.
NieR-style accents (Figo, 2026-10-11): cool off-white palette, square corners everywhere, a small
square as the only UI marker (current nav item, active filter, commission status), white block
"monolith" SVG decorations (components/Monolith.astro: tower on Info/Commission/404 desktop,
skyline on phones and at the end of Home), and images revealed by a grid of shrinking squares.
Home *is* the work: an editorial grid where works drift between columns with lots of air.

- **Color (light / dark):** `--bg` #f7f7f4 / #0c0c0d (never pure white/black), `--fg` #111113 / #ededeb, grays `--gray-1…6`, `--hairline` for 1px UI lines.
- **Accent:** `--accent` indigo (#2f4fb3 light, #7fa2ff dark). Use sparingly: active nav link, "commissions open", small details. Never for large areas.
- **Dark mode** follows the system (`prefers-color-scheme`). No toggle.
- **Type:** Geist for everything; headings 650–700 weight with tight tracking (`--tracking-tight`). Body 15px, line-height 1.6. Geist Mono via `.label` for metadata (year, medium, size) and small labels: 11px, uppercase, wide tracking.
- **Spacing:** 4px scale `--space-1…10`; `--section-gap` between page sections; `--gutter` page side padding.
- **Rules:** images have no border, no shadow, no radius. Hairlines only on UI (nav, dividers). No busy gradients, stacked shadow cards or decorative icons.

## Animation rules

- Motion serves the art: subtle, fast, calm. Art never waits for an animation.
- Animate only `transform`, `opacity`, `clip-path`. The tile reveal scales background-coloured squares to 0. Never animate `filter: blur` on images.
- Easing: `--ease-out` cubic-bezier(0.22, 1, 0.36, 1) / GSAP `expo.out` or `power3.out`. No bounce or elastic.
- GSAP is imported only by `WorkGrid` (reveal). Pages without a grid ship no GSAP.
- Images already in the viewport on load, and any `eager` image, are never hidden for a reveal.
- Gallery hover (zoom 1.015 + caption rising) is CSS, only under `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` disables everything: scripts bail early, CSS transitions and view transitions are off.
- Client router note: module scripts run once. Re-initialize per page on `astro:page-load`; register document-level listeners once. ScrollTriggers are killed on `astro:before-swap`.

## Adding a work

1. Create `src/content/works/<slug>/` (lowercase, dashes).
2. Put the image there (JPG/PNG, long edge ≥ 2000px is ideal). Astro generates AVIF/WebP sizes.
3. Add `index.md`:

```md
---
title: Quiet Room
slug: quiet-room
year: 2025
medium: digital        # digital | acrylic
size: 40×60 cm         # optional, canvases only
featured: true         # reserved for highlighting; home shows every work
order: 1               # optional; lower comes first
description: Optional, one short line.
alt: Required. Describe what is in the picture for screen readers.
image: ./image.jpg
---
```

Keep `description` short or leave it out. Remove `placeholder: true` from real works (it shows the "Placeholder" tag). Delete the sample folders once real work is in.

## Adding an event

Create `src/content/events/<slug>.md`:

```md
---
title: Comic Frontier 23
date: 2026-12-06
endDate: 2026-12-07      # optional
location: Jakarta, Indonesia
booth: A-12              # optional
description: Optional.
link: https://…          # optional
---
```

Upcoming vs past is decided **at build time**. Redeploy after an event ends (or add a scheduled rebuild).

## Placeholders still to fill (search for `TODO`)

Instagram / X / VGen handles, email, domain (`site.url` and `public/robots.txt`), commission prices, CF23 details, Cloudflare Web Analytics token.

## Quality bar

Before each commit: `npm run build` passes, check pages at 390px and desktop in light and dark. Lighthouse mobile targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
