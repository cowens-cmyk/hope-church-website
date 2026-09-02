/* Fetches the published events from the CMS and writes src/generated/events.json.

   This runs before the build so vite-react-ssg can pre-render a real static page
   per event: correct <title>, description and Open Graph image, with the content
   already in the HTML. The page still fetches live data when it mounts, so an
   edit made in the CMS after the build shows up without a redeploy.

   If the CMS is unreachable the build must NOT fail -- a network blip should not
   take the whole site down. We fall back to whatever was generated last time. */
import { writeFileSync, existsSync, readFileSync } from 'node:fs';

const API = 'https://media.hopejc.org/api/public/calendar';
const OUT = new URL('../src/generated/events.json', import.meta.url);

async function main() {
  const res = await fetch(`${API}?limit=200`, { headers: { 'user-agent': 'hope-church-build/1.0' } });
  if (!res.ok) throw new Error(`list responded ${res.status}`);
  const { events = [] } = await res.json();

  // One detail fetch per event: the list omits description and contact details.
  const full = [];
  for (const e of events) {
    try {
      const r = await fetch(`${API}/${encodeURIComponent(e.slug)}`, {
        headers: { 'user-agent': 'hope-church-build/1.0' },
      });
      if (r.ok) full.push(await r.json());
      else console.warn(`  skipped ${e.slug}: HTTP ${r.status}`);
    } catch (err) {
      console.warn(`  skipped ${e.slug}: ${err.message}`);
    }
  }
  if (!full.length) throw new Error('no events could be fetched');
  writeFileSync(OUT, JSON.stringify(full, null, 2) + '\n');
  console.log(`Wrote src/generated/events.json (${full.length} events)`);
}

main().catch((err) => {
  console.warn(`gen-events: ${err.message}`);
  if (existsSync(OUT)) {
    const n = JSON.parse(readFileSync(OUT, 'utf8')).length;
    console.warn(`gen-events: keeping the previous file (${n} events)`);
  } else {
    writeFileSync(OUT, '[]\n');
    console.warn('gen-events: wrote an empty list; event pages will render from the live API only');
  }
});
