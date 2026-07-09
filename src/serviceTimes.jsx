import React from 'react';

/* Hope Church — Sunday service times, single source of truth.

   The NEW Sunday schedule goes live on the website on
   Sunday, July 26 2026 at 1:00pm ET (EDT = UTC-4 -> 17:00 UTC).
   Before that instant the site shows the current (OLD) times; after it,
   the NEW times — flipped automatically, no redeploy needed.

   `stream` is the livestreamed service (currently the 9:45am service; it
   maps to the new 9:15am service). Change here if a different service is
   streamed after the switch. */
const { useState, useEffect } = React;

export const SERVICE_TIMES_SWITCH = Date.parse('2026-07-26T17:00:00Z');

const OLD = { first: '8:00am', second: '9:45am', third: '11:30am', stream: '9:45am', runthrough: '7:00am', runthroughEnd: '7:30am' };
const NEW = { first: '7:30am', second: '9:15am', third: '11:00am', stream: '9:15am', runthrough: '6:30am', runthroughEnd: '7:00am' };

export const OLD_SERVICE_TIMES = OLD;
export const NEW_SERVICE_TIMES = NEW;

// Client-side date gate. The static/SSR render uses the current (OLD) times
// so hydration matches; after mount it swaps to NEW once past the switch.
// Add ?previewTimes=new (or =old) to any URL to force a set for QA.
export function useServiceTimes() {
  const [times, setTimes] = useState(OLD);
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
