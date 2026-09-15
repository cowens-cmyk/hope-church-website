/* Picks the next Discover Hope class out of src/generated/events.json and writes
   src/generated/discover-hope.json before the build.

   Runs straight after gen-events, so it reads the calendar that script just
   fetched and makes no request of its own. The Discover Hope page bakes this
   file into its pre-rendered HTML, then checks the live calendar when it loads
   (src/discoverHope.js), so a class added after this build still appears.

   Like the other generators, a failure here must never fail the build: keep
   whatever the last successful run wrote. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pickNextDiscoverHope, todayInJohnsonCity, classLabel } from '../src/discoverHopeNext.js';

const EVENTS = new URL('../src/generated/events.json', import.meta.url);
const OUT = new URL('../src/generated/discover-hope.json', import.meta.url);

try {
  const events = JSON.parse(readFileSync(EVENTS, 'utf8'));
  const next = pickNextDiscoverHope(events, todayInJohnsonCity());
  writeFileSync(OUT, JSON.stringify(next, null, 2) + '\n');
  console.log(next
    ? `Wrote src/generated/discover-hope.json (${classLabel(next.date)}${next.signupUrl ? '' : ', no sign-up link yet'})`
    : 'Wrote src/generated/discover-hope.json (no upcoming Discover Hope on the calendar)');
} catch (err) {
  console.warn(`gen-discover-hope: ${err.message}`);
  if (existsSync(OUT)) {
    console.warn('gen-discover-hope: keeping the previous file');
  } else {
    writeFileSync(OUT, 'null\n');
    console.warn('gen-discover-hope: wrote null; the page will rely on the live calendar');
  }
}
