# Mahendra_Portfolio

Portfolio of **Mahendra Kumar Prajapat — Flutter Developer**, rebuilt from
[mahendra-prajapat.youware.app](https://mahendra-prajapat.youware.app) and restyled to match
the two reference videos (`WhatsApp Video 2026-09-14 at 1.26.56/57 PM.mp4` on `main`).

## Variants

| File | Design | Reference |
| --- | --- | --- |
| `index.html` | **Royal Purple** — gradient glows, grid backdrop, laptop illustration, showcase tabs, project detail modal, comments wall | video 1 |
| `cyan.html` | **Neon Cyan** — glowing hexagon portrait, typed role line, services cards, project hover grid | video 2 |

Both variants share one content source: `assets/js/data.js`
(extracted verbatim from the live site — see `docs/source-content.md`).

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080/          (purple)
# open http://localhost:8080/cyan.html (cyan)
```

No build step, no dependencies — plain HTML/CSS/JS.

## Structure

```
index.html              purple variant
cyan.html               cyan variant
assets/css/purple.css   purple theme
assets/css/cyan.css     cyan theme
assets/js/data.js       ALL portfolio content (single source of truth)
assets/js/shared.js     preloader, nav spy, typewriter, counters, comments (localStorage)
assets/js/purple.js     purple renderer (tabs, filters, project modal)
assets/js/cyan.js       cyan renderer
docs/source-content.md  verbatim content extracted from the live site
```

## Features

- Preloader ("Welcome To My Portfolio Website"), scroll-spy nav, mobile menu
- Typewriter role line, animated stat counters, reveal-on-scroll
- Project filters (All / Mobile / Web / Business / CRM / E-Commerce) + detail modal
  with key features, metrics and tech chips
- Tabs: Projects / Certificates (education) / Tech Stack (CORE–WORKING–EXPLORING)
- Contact form + guestbook-style comments with optional profile photo (stored locally)
- Fully responsive (the videos' "phone responsive" behaviour included)
