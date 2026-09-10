/* Fetches the published events from the CMS and writes src/generated/events.json.

   This runs before the build so vite-react-ssg can pre-render a real static page
   per event: correct <title>, description and Open Graph image, with the content
   already in the HTML. The page still fetches live data when it mounts, so an
   edit made in the CMS after the build shows up without a redeploy.

   Recently-finished events are fetched too, not just upcoming ones. The CMS list
   defaults to upcoming, so an event lost its pre-rendered page the morning after
   it happened and every link anyone had shared -- a Facebook post, a text, an
   order of service -- quietly degraded to the plainer CMS-rendered page. That
   went unnoticed while builds were rare; the CMS now rebuilds the site whenever
   an event changes, so it would have started happening the day after every
   event. PAST_DAYS is the window: long enough that links stay good for a season,
   short enough that we are not pre-rendering years of history on every build.

   The window is a date, not a count, on purpose. The list is ordered by start
   date ascending under a LIMIT, so asking for past events by count returns the
   OLDEST ones and pushes upcoming events off the end -- the opposite of what is
   wanted. `from` bounds it by time instead, which cannot do that.

   If the CMS is unreachable the build must NOT fail -- a network blip should not
   take the whole site down. We fall back to whatever was generated last time. */
import { writeFileSync, existsSync, readFileSync } from 'node:fs';

const API = 'https://media.hopejc.org/api/public/calendar';
const OUT = new URL('../src/generated/events.json', import.meta.url);
// Unique per run so no proxy can hand us a response from a previous build.
const BUILD_TAG = `${process.pid}-${Date.now().toString(36)}`;
// How far back to keep pre-rendering finished events.
const PAST_DAYS = 180;

function windowStart() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - PAST_DAYS);
  return d.toISOString().slice(0, 10);
}

async function main() {
  const from = windowStart();
  const res = await fetch(`${API}?past=1&from=${from}&limit=400&b=${BUILD_TAG}`, {
    headers: { 'user-agent': 'hope-church-build/1.0', 'cache-control': 'no-cache' },
  });
  if (!res.ok) throw new Error(`list responded ${res.status}`);
  const { events = [] } = await res.json();

  // One detail fetch per event: the list omits description and contact details.
  const full = [];
  for (const e of events) {
    try {
      // Cache-bust: media.hopejc.org is proxied through Vercel, which edge-caches
      // worker responses. A stale entry from before this endpoint existed returns
      // the whole LIST, and an unvalidated push would write that into the file.
      const r = await fetch(`${API}/${encodeURIComponent(e.slug)}?b=${BUILD_TAG}`, {
        headers: { 'user-agent': 'hope-church-build/1.0', 'cache-control': 'no-cache' },
      });
      if (!r.ok) { console.warn(`  skipped ${e.slug}: HTTP ${r.status}`); continue; }
      const body = await r.json();
      // Must be one event, and the one we asked for.
      if (!body || typeof body !== 'object' || Array.isArray(body) || body.events || body.slug !== e.slug) {
        console.warn(`  skipped ${e.slug}: unexpected response shape (got ${Object.keys(body || {}).slice(0, 4).join(',')})`);
        continue;
      }
      full.push(body);
    } catch (err) {
      console.warn(`  skipped ${e.slug}: ${err.message}`);
    }
  }
  if (!full.length) throw new Error('no events could be fetched');
  writeFileSync(OUT, JSON.stringify(full, null, 2) + '\n');
  const today = new Date().toISOString().slice(0, 10);
  const past = full.filter((e) => (e.end_date || e.start_date || '') < today).length;
  console.log(`Wrote src/generated/events.json (${full.length} events: ` +
    `${full.length - past} upcoming, ${past} finished since ${from})`);
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
