/* Generates public/sitemap.xml from the single source-of-truth URL map in
   src/nav.js, so the sitemap can never drift out of sync with the real routes.
   Runs before each build (see package.json "build" script). */
import { writeFileSync } from 'node:fs';
import { KEY_TO_PATH, SITE_ORIGIN } from '../src/nav.js';

const paths = [...new Set(Object.values(KEY_TO_PATH))];
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
