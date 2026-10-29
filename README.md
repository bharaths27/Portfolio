# Bharath Srividhya · Portfolio

My personal portfolio: AI, cybersecurity and robotics. A fixed 3D scene (React Three Fiber + custom shaders + bloom)
sits behind the whole page and reacts to your mouse and scroll, with GSAP scroll animations and Lenis smooth scrolling on top.

🔗 **Live site:** https://bharaths27.github.io/Portfolio/

## Highlights

- **Live 3D background.** A fresnel shaded core with a scan band, orbit rings, a node network and 5,000 shader particles. It drifts away and dims as you scroll, and its colors shift through the page.
- **Smooth scroll that stays in sync.** Lenis runs on the GSAP ticker, so every ScrollTrigger animation lines up with the smooth scroll.
- **Pinned horizontal story** of the GPTfy scanner pipeline (desktop), stacked cards on phones.
- **Kinetic type.** SplitText reveals for the name and every section title, a typed role line, and a scroll speed aware marquee.
- **Case study modals** for every role and project, with the ENGRAM Assist demo video embedded.
- **Small touches:** preloader, custom cursor with labels, magnetic buttons, 3D tilt cards, scroll progress bar, film grain.
- **Accessible:** `prefers-reduced-motion` turns off the preloader, smooth scroll and heavy motion; keyboard friendly cards and modal; no horizontal scroll on phones.

## Tech

| Area | Libraries |
|------|-----------|
| App | Vite, React 19, TypeScript |
| 3D | three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing |
| Motion | GSAP (ScrollTrigger, SplitText), @gsap/react, Lenis, Motion |
| Hosting | GitHub Pages via GitHub Actions |

## Run it locally

```bash
git clone https://github.com/bharaths27/Portfolio.git
cd Portfolio
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build
```

## Editing content

All text lives in `src/data/`:

- `experience.ts`: roles (`scope` is `industry`, `research` or `leadership`; `current: true` shows the NOW tag)
- `projects.ts`: projects (`featured: true` makes the big card at the top; `links` can have `github`, `demo`, `video`, `devpost`)
- `profile.ts`: hero text, stats, marquee, skills, certifications and the GPTfy pipeline stages

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
One time setup: in the repo go to **Settings → Pages → Build and deployment → Source** and pick **GitHub Actions**.

## Working on it with Claude Code

`CLAUDE.md` tells Claude Code how the project is laid out and the content rules. Useful plugins:

```text
/plugin install frontend-design@claude-plugins-official
/plugin install playwright@claude-plugins-official
/plugin install context7@claude-plugins-official
/plugin marketplace add greensock/gsap-skills
/plugin install gsap-skills@gsap-skills
```
