/* Hope Church — which Discover Hope class is next.

   Pure functions with no React and no browser APIs, so the build script
   (scripts/gen-discover-hope.mjs) and the page (src/discoverHope.js) apply the
   same rule and cannot drift apart.

   The class itself lives on the events calendar in the CMS, like every other
   event. This file only picks it out: the earliest event titled "Discover Hope"
   that has not finished yet, judged by the date in Johnson City. */

const TITLE = /discover\s*hope/i;

/** Today's date in Johnson City as YYYY-MM-DD, whatever timezone the visitor is in. */
export function todayInJohnsonCity(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now);
}

/**
 * The next Discover Hope class in a list of calendar events, or null.
 *
 * A class stays "next" through the whole of its own day, so the sign-up is
 * still there for someone checking that afternoon. Calendar dates are Johnson
 * City dates, which is why they are compared as YYYY-MM-DD strings against
 * todayInJohnsonCity() rather than as instants -- no daylight-saving arithmetic.
 */
export function pickNextDiscoverHope(events, today) {
  const upcoming = (Array.isArray(events) ? events : [])
    .filter((e) => e && TITLE.test(e.title || '') && (e.end_date || e.start_date || '') >= today)
    .sort((a, b) => (a.start_date || '').localeCompare(b.start_date || '')
      || (a.start_time || '').localeCompare(b.start_time || ''));
  const e = upcoming[0];
  if (!e || !e.start_date) return null;
  return {
    slug: e.slug || null,
    date: e.start_date,
    endDate: e.end_date || e.start_date,
    time: e.start_time || null,
    signupUrl: e.signup_url || null,
  };
}

/** 'YYYY-MM-DD' -> 'Wednesday, October 7'. Built from the date's own parts in UTC, so every visitor sees the same day. */
export function classLabel(date) {
  const [y, m, d] = String(date).split('-').map(Number);
  if (!y || !m || !d) return '';
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric' })
    .format(new Date(Date.UTC(y, m - 1, d)));
}

/** '18:30' -> '6:30pm', the way the rest of the site writes times. Falls back to
    the class's usual start when an event was saved without one -- matched with a
    pattern rather than split(':'), which let a blank time through as "12:undefinedam". */
export function timeLabel(time) {
  const m = /^(\d{1,2}):(\d{2})/.exec(String(time || ''));
  if (!m) return '6:30pm';
  const h = Number(m[1]);
  return `${((h + 11) % 12) + 1}:${m[2]}${h >= 12 ? 'pm' : 'am'}`;
}
