# Hope Church — multi-page + SEO update

## What changed and why

The site used to be a single-page React app: every "page" (Events, About, etc.)
was just a piece of state, so there was only **one real URL** and Google only ever
saw a blank HTML shell. That was the cause of both problems — no separate pages, and
the Search Console "duplicate / not indexed" warnings.

It's now a **statically pre-rendered, multi-page site**. Each page is generated as
its own real HTML file at build time, so both visitors and Google get complete,
readable HTML immediately.

### Every page now has its own URL

| Page | URL |
|------|-----|
| Home | `/` |
| Plan a Visit | `/visit` |
| About | `/about` |
| Team | `/team` |
| Sermons | `/sermons` |
| Events | `/events` |
| Ministries | `/ministries` |
| Kids / Students / College … | `/ministries/kids`, `/ministries/students`, … |
| Give | `/give` |
| Serve | `/serve` |
| Next Steps | `/next-steps` |
| Contact | `/contact` |
| Life Groups | `/life-groups` |
| Missions | `/missions` |
| Connect Card | `/connect` |
| Discover Hope | `/discover-hope` |
| Prayer | `/prayer` |
| Podcast / Finding Hope | `/podcast`, `/podcast/finding-hope` |
| App | `/app` |
| Privacy / Accessibility | `/privacy`, `/accessibility` |

### SEO fixes

- **Unique `<title>`, meta description, and `<link rel="canonical">` on every page**
  (canonical points at the `www.hopejc.org` version). This resolves
  "Duplicate without user-selected canonical."
- **`sitemap.xml`** (auto-generated from the page list at build time) and
  **`robots.txt`** that points to it — so Google can discover every page.
- **Real 404 page** (`/404`) that returns a proper not-found status.
- **Old `?page=…` links still work** — they redirect to the new clean URL, so any
  bookmarked or already-indexed links won't break.
- Header and footer navigation now use real `<a href>` links, so Google can crawl
  from page to page.

## How to deploy

From the project folder:

```bash
npm install            # picks up the new build tooling (vite-react-ssg, react-router-dom)
git add -A
git commit -m "Convert to multi-page pre-rendered site + SEO (sitemap, canonical, 404)"
git push
```

Vercel will rebuild automatically. The build command is unchanged in name
(`npm run build`) — it now runs the pre-rendering step and writes one HTML file per
page into `dist/`. No Vercel dashboard changes are required.

### One Vercel thing to confirm

You're currently redirecting `hopejc.org` → `www.hopejc.org`, and all the canonical
tags match that (`www`). That's correct and consistent — no action needed unless you
*prefer* the bare `hopejc.org`. If you ever switch, change the canonical domain in
`src/nav.js` (`SITE_ORIGIN`) and the redirect direction in Vercel together.

## After it's live — in Google Search Console

1. Submit the sitemap: **Indexing → Sitemaps →** add `https://www.hopejc.org/sitemap.xml`.
2. Use **URL Inspection** on a couple of the new pages (e.g. `/events`, `/about`) and
   click **Request indexing**.
3. The existing warnings clear on their own over the next crawl cycles now that each
   page is real and canonicalized — this can take days to a few weeks.

## Where things live (for future edits)

- `src/nav.js` — the master list of page → URL. Add a page here.
- `src/seo.jsx` — the title/description for each page.
- `src/routes.jsx` — wires each URL to its existing page component.
- `src/components/…` — your actual page content (unchanged).
