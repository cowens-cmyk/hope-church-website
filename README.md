# Hope Church Website

The public website for **Hope Church** — Gray / Johnson City, TN.
*Love God. Love people. Make disciples.*

Built as a [Vite](https://vite.dev) + [React](https://react.dev) single-page
app, converted from the HTML/CSS/JS design prototype produced in Claude Design.

## Getting started

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Requires Node.js 18+.

## Project structure

```
index.html              App shell — stylesheet links, theme script, #root mount
src/
  main.jsx              Entry point: routing state + page composition
  components/
    shared.jsx          Header, footer, Sunday strip, announcement bar, theme toggle
    homepage.jsx        Hero variants + homepage sections
    embeds.jsx          Subsplash media / calendar / giving embeds
    pages.jsx           Visit, About, Team, Sermons, Events, Give, Ministries, Serve…
    pages-extra.jsx     Prayer Requests, Podcasts, App
    pages-legal.jsx     Privacy, Accessibility
    getinvolved.jsx     Life Groups, Missions, Connect Card, Discover Hope
    ministry-*.jsx      The 8 ministry detail pages
public/
  assets/               Stylesheets (site.css + per-section), brand images, photos
  fonts/                Gotham brand fonts
```

Stylesheets, fonts, and images live in `public/` and are served as-is — the
CSS was kept byte-for-byte from the design system.

## How it works

- **Routing** is client-side React state (`src/main.jsx`). The original
  prototype kept the URL at `/`; that behavior is preserved. Real per-page
  URLs (`/about`, `/give`, …) would be a natural follow-up.
- **Theme** — light/dark resolves in priority order: `?theme=` URL param →
  saved preference → OS `prefers-color-scheme` → local clock (dark 7pm–7am).
  An inline script in `index.html` applies it before first paint to avoid a
  flash, and follows the OS setting live while the tab is open.
- **Embeds** — sermons, calendars, and giving are live Subsplash embeds;
  Connect Card and Discover Hope are Planning Center / Google Form iframes.
- **Forms** — the Visit and Contact forms open the visitor's email client
  via `mailto:info@hopejc.org`. Wiring them to a real form backend is a
  follow-up.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **Import** the repo. Vercel auto-detects Vite
   (build `vite build`, output `dist`) — no extra config needed.
3. Add the custom domain when ready.

## Known follow-ups

- Real per-page URLs / deep linking and SEO metadata per page.
- Server-side form handling for the Visit and Contact forms.
