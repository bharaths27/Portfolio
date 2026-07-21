# Bharath Srividhya — Portfolio

A fast, hand-built personal portfolio for a Computer Engineer working at the
intersection of **Artificial Intelligence** and **Cybersecurity**. No frameworks,
no build step — just semantic HTML, modern CSS, and vanilla JavaScript.

🔗 **Live site:** https://bharaths27.github.io/Portfolio/

![Portfolio hero](assets/profile.jpg)

## Highlights

- **Space-themed, animated design** — a canvas starfield (twinkle, drift, and the
  occasional shooting star) over a colorful ambient gradient. Degrades gracefully
  to a static night sky when the visitor prefers reduced motion.
- **Color-coded experience** — roles are grouped and colored by type:
  🔵 Work Experience · 🟢 Research · 🔴 Leadership.
- **Company logo wall** — organizations I've worked with and Boston University,
  with brand-colored monogram fallbacks if a logo fails to load.
- **Impact-first KPIs** with animated count-ups (cost reduction, latency, scale).
- **Project case studies** — click any card for architecture, challenges, and
  solutions in a modal.
- **Responsive & accessible** — mobile menu, keyboard-dismissible modal, scroll
  reveals, and `prefers-reduced-motion` support.

## Sections

`About → Experience → Projects → Skills → Contact`

## Tech

| Area | Details |
|------|---------|
| Markup | Semantic HTML5 |
| Styles | CSS custom properties, grid/flex, `color-mix()`, no preprocessor |
| Behavior | Vanilla JS (ES2020), `IntersectionObserver`, Canvas 2D |
| Fonts | Inter + JetBrains Mono (Google Fonts) |
| Hosting | GitHub Pages |

## Project structure

```
Portfolio/
├── index.html          # markup for every section
├── css/
│   └── styles.css       # design system + component styles
├── js/
│   └── main.js          # data (experience/projects), rendering, starfield, interactions
└── assets/
    ├── profile.jpg               # hero portrait
    ├── Bharath_Srividhya_Resume.pdf
    └── projects/                 # optional project screenshots
```

## Editing content

All content is data-driven in [`js/main.js`](js/main.js):

- **Experience** — edit the `EXPERIENCE` array. Each entry sets its category
  (`scope`: `industry` / `research` / `leadership`) and color (`brand`).
- **Projects** — edit the `PROJECTS` array. Set `featured: true` to pin a card
  to the top; add screenshots to `assets/projects/` (see `assets/README.md`).

## Run locally

It's a static site — open `index.html` directly, or serve it:

```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Pushing to `main` auto-deploys via **GitHub Pages** (Settings → Pages, source:
`main` branch). Changes go live within ~1 minute.

---

© Bharath Srividhya · Built from scratch, no frameworks.
