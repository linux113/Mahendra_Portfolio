# Mahendra_Portfolio — Premium 3D Portfolio

Cinematic, premium portfolio of **Mahendra Kumar Prajapat — Flutter Developer**.

- **Live design (v2):** React + Vite + Three.js (WebGL particle universe) + Framer Motion + Tailwind CSS v4.
  Cinematic AI-rendered 3D workstation hero, mouse-parallax layers, holographic code panel,
  3D tilt project cards, magnetic buttons, scroll-depth camera, animated counters.
- **Legacy variants (v1, from the reference videos):** `/legacy/purple.html` and `/legacy/cyan.html`
  (plain HTML/CSS/JS, content extracted verbatim from
  [mahendra-prajapat.youware.app](https://mahendra-prajapat.youware.app) — see `docs/source-content.md`).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```

Serve the production build:

```bash
python3 -m http.server 8080 -d dist
```

## Structure

```
index.html            Vite entry
src/App.jsx           Nav / Hero / About / Portfolio / Contact / Footer
src/fx.jsx            ParticleField (three.js), Tilt, Magnetic, Counter, HoloCode, logos
src/data.js           ALL portfolio content (single source of truth)
src/index.css         Tailwind v4 + custom neon/glass/aurora design system
public/img/           cinematic 3D workstation render
public/legacy/        v1 purple & cyan video-matched variants
public/assets/        v1 css/js
docs/source-content.md verbatim extraction from the live site
```

## Performance notes

- three.js is lazy-loaded via dynamic import in a separate chunk; WebGL failures degrade
  gracefully to the CSS aurora background.
- `prefers-reduced-motion` disables all animation.
- Single hero image, system-font fallbacks, code-split vendor chunks.
