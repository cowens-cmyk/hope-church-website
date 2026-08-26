import React from 'react';

/* Hope Church — Sunday service times, single source of truth.

   The NEW Sunday schedule goes live on the website on
   Sunday, July 26 2026 at 1:00pm ET (EDT = UTC-4 -> 17:00 UTC).
   Before that instant the site shows the current (OLD) times; after it,
   the NEW times — flipped automatically, no redeploy needed.

   `stream` is the livestreamed service (currently the 9:45am service; it
   maps to the new 9:00am service). Change here if a different service is
   streamed after the switch. */
const { useState, useEffect } = React;

export const SERVICE_TIMES_SWITCH = Date.parse('2026-07-26T17:00:00Z');

const OLD = { first: '8:00am', second: '9:45am', third: '11:30am', stream: '9:45am', runthrough: '7:00am', runthroughEnd: '7:30am', isNew: false };
const NEW = { first: '7:30am', second: '9:00am', third: '11:00am', fourth: '12:45pm', stream: '9:00am', runthrough: '6:30am', runthroughEnd: '7:00am', isNew: true };

export const OLD_SERVICE_TIMES = OLD;
export const NEW_SERVICE_TIMES = NEW;

// The switch (Jul 26 2026) is now permanently in the past, so NEW is the
// default the static/SSR render bakes in — this keeps the pre-rendered HTML
// and SEO structured data correct for no-JS visitors and crawlers, with no
// flash of old times. The date gate below is retained for safety/preview.
// Add ?previewTimes=new (or =old) to any URL to force a set for QA.
// Shared note: under the new schedule the 7:30 service is nursery & preschool
// only (no K–4th grade, no Linked 5–6th).

// The fourth service (12:45pm) begins Sunday, September 20 2026 at 12:45pm ET
// (EDT = UTC-4 -> 16:45 UTC). Until that instant the site shows it as "coming
// soon"; after it, as a regular service — flipped automatically, no redeploy.
// Add ?previewFourth=live (or =soon) to any URL to force a state for QA.
export const FOURTH_SERVICE_START = Date.parse('2026-09-20T16:45:00Z');

// Initial state is deliberately `false` so the pre-rendered HTML and the first
// client render agree (no hydration mismatch); the effect corrects it. After
// Sep 20 a redeploy bakes the live state into the static HTML for crawlers.
export function useFourthServiceLive() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    let force = null;
    try {
      const p = new URLSearchParams(window.location.search).get('previewFourth');
      if (p === 'live' || p === 'soon') window.sessionStorage.setItem('previewFourth', p);
      else if (p === 'off') window.sessionStorage.removeItem('previewFourth');
      const stored = window.sessionStorage.getItem('previewFourth');
      if (stored === 'live') force = true;
      else if (stored === 'soon') force = false;
    } catch { /* ignore */ }
    setLive(force !== null ? force : Date.now() >= FOURTH_SERVICE_START);
  }, []);
  return live;
}
export function KidsServiceNote({ className }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  if (!st.isNew) return null;
  const withClasses = fourthLive
    ? <>the {st.second}, {st.third}, and {st.fourth} services</>
    : <>the {st.second} and {st.third} services</>;
  return (
    <p className={className}>
      <strong>Heads up for the {st.first} service:</strong> we offer nursery &amp; preschool only.
      Kindergarten&ndash;4th grade and Linked 5&ndash;6th grade classes meet at {withClasses}.
    </p>
  );
}

export function useServiceTimes() {
  const [times, setTimes] = useState(NEW);
  useEffect(() => {
    let force = null;
    try {
      // Persist the preview choice in sessionStorage so it survives in-app
      // navigation (the ?previewTimes param is dropped on client-side nav).
      const p = new URLSearchParams(window.location.search).get('previewTimes');
      if (p === 'new' || p === 'old') window.sessionStorage.setItem('previewTimes', p);
      else if (p === 'off') window.sessionStorage.removeItem('previewTimes');
      const stored = window.sessionStorage.getItem('previewTimes');
      if (stored === 'new') force = NEW;
      else if (stored === 'old') force = OLD;
    } catch { /* ignore */ }
    setTimes(force || (Date.now() >= SERVICE_TIMES_SWITCH ? NEW : OLD));
  }, []);
  return times;
}
