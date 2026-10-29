# Bharath Srividhya portfolio

Personal portfolio site. Vite + React 19 + TypeScript, with React Three Fiber for the 3D background,
GSAP (ScrollTrigger, SplitText) for scroll animation, Lenis for smooth scrolling, and Motion for the modal.
Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`
(live at https://bharaths27.github.io/Portfolio/).

## Commands
- `npm run dev` starts the dev server at http://localhost:5173
- `npm run build` type checks and builds to `dist/` (run this before committing)
- `npm run preview` serves the production build

## Where things live
- `src/data/experience.ts`, `src/data/projects.ts`, `src/data/profile.ts`: all site content. Edit these, not the components, to change text.
- `src/three/HeroScene.tsx`: the fixed 3D scene (shader particles, fresnel core, rings, node network, bloom). Reads `scrollState` every frame.
- `src/hooks/useSmoothScroll.ts`: Lenis driven by the GSAP ticker so ScrollTrigger stays in sync. Use `scrollTo()` from here for in page links.
- `src/components/NowBuilding.tsx`: pinned horizontal scroll for the GPTfy pipeline (desktop only, via `gsap.matchMedia`).
- `src/styles/global.css`: design tokens on `:root` and all styles.

## Rules
- Content voice: simple English that sounds like a student wrote it. No hyphens in prose.
- Only state confirmed facts. Never invent results, awards, dates, or numbers. If something is unknown, leave it out and ask Bharath.
- ENGRAM Assist: never say it runs fully offline. The slide 8 memory numbers belong to Carther and must not be shown as Bharath's work.
- Keep `prefers-reduced-motion` working: every new animation needs a reduced motion path.
- Use `import.meta.env.BASE_URL` for files in `public/` so paths work under `/Portfolio/`.
- Check phone width (390px) as well as desktop before calling a visual change done.
