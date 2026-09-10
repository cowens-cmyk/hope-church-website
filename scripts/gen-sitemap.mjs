/* Generates public/sitemap.xml from the single source-of-truth URL map in
   src/nav.js, so the sitemap can never drift out of sync with the real routes.
   Runs before each build (see package.json "build" script). */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { KEY_TO_PATH, SITE_ORIGIN } from '../src/nav.js';

// Individual events are real pages on this site now, not proxied CMS pages, so
// they belong in the sitemap. Written by gen-events.mjs, which runs first.
//
// Upcoming ones only. gen-events also pre-renders recently-finished events so
// that links people have already shared keep working, but a finished event has
// nothing to attend and does not belong in a sitemap -- submitting it competes
// for attention with the events that are still to come, and leaves Google
// holding a growing list of pages about things that already happened. The pages
// stay reachable either way; they are simply not advertised.
function eventPaths() {
  const f = new URL('../src/generated/events.json', import.meta.url);
  if (!existsSync(f)) return [];
  // Local to this function: the module-level `today` below is still in its
  // temporal dead zone when this runs.
  const cutoff = new Date().toISOString().slice(0, 10);
  try {
    return JSON.parse(readFileSync(f, 'utf8'))
      .filter((e) => (e.end_date || e.start_date || '') >= cutoff)
      .map((e) => `/events/${e.slug}`);
  } catch {
    return [];
  }
}

const paths = [...new Set([...Object.values(KEY_TO_PATH), ...eventPaths()])];
const today = new Date().toISOString().slice(0, 10);

const urls = paths
  .map((p) => {
    const loc = SITE_ORIGIN + p;
    const priority = p === '/' ? '1.0' : '0.7';
    const changefreq = p === '/' || p === '/events' || p === '/sermons' ? 'weekly' : 'monthly';
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`Wrote public/sitemap.xml (${paths.length} URLs)`);
