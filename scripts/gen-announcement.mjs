/* Fetches the site-wide announcement from the CMS and writes
   src/generated/announcement.json before the build.

   The bar across the top of every page used to be hard-coded in routes.jsx, so
   changing a word meant editing source and redeploying -- and the apps never
   showed it at all. It now lives in the App Layout document in the CMS, the same
   one the iOS and Android apps read, so one edit reaches all three.

   Baked in at build time so the bar can appear the moment the page becomes
   interactive, without waiting on a request. The page still fetches the live
   copy afterwards (src/announcement.jsx), so an edit shows up even before the
   rebuild the CMS triggers has finished.

   Like gen-events, a failure here must never fail the build: keep whatever the
   last successful run wrote. */
import { writeFileSync, existsSync } from 'node:fs';

const API = 'https://media.hopejc.org/api/public/app-layout';
const OUT = new URL('../src/generated/announcement.json', import.meta.url);
// Unique per run so no proxy can hand back a response from a previous build.
const TAG = `${process.pid}-${Date.now().toString(36)}`;

async function main() {
  const res = await fetch(`${API}?b=${TAG}`, {
    headers: { 'user-agent': 'hope-church-build/1.0', 'cache-control': 'no-cache' },
  });
  if (!res.ok) throw new Error(`layout responded ${res.status}`);
  const layout = await res.json();
  if (!layout || !Array.isArray(layout.tabs)) throw new Error('unexpected response shape');
  const a = layout.announcement || null;
  writeFileSync(OUT, JSON.stringify(a, null, 2) + '\n');
  console.log(a
    ? `Wrote src/generated/announcement.json (${a.enabled ? 'on' : 'off'}: "${a.text.slice(0, 48)}${a.text.length > 48 ? '…' : ''}")`
    : 'Wrote src/generated/announcement.json (no announcement)');
}

main().catch((err) => {
  console.warn(`gen-announcement: ${err.message}`);
  if (existsSync(OUT)) {
    console.warn('gen-announcement: keeping the previous file');
  } else {
    writeFileSync(OUT, 'null\n');
    console.warn('gen-announcement: wrote null; the page will rely on the live copy');
  }
});
