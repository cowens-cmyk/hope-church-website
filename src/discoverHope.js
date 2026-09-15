import React from 'react';
import BUILT from './generated/discover-hope.json';
import { todayInJohnsonCity, pickNextDiscoverHope, classLabel, timeLabel } from './discoverHopeNext.js';

/* Hope Church — the next Discover Hope class, read from the events calendar.

   Discover Hope is an ordinary event in the CMS. To post next month's class,
   add it on the CMS Events page with its Church Center sign-up link -- that is
   the whole job. The CMS rebuilds the site whenever an event changes, and this
   page also checks the live calendar when it loads, so a new class shows up
   even before that rebuild finishes.

   This used to be three hand-edited fields in this file (link, date label and
   a cutoff instant), so the page went stale every month until someone edited
   code. In mid-September 2026 it was still pointing at September 2 and showing
   "Sign up coming soon" while the October class sat on the events page.

   How the page decides:
     * The next class is the earliest event titled "Discover Hope" that has not
       finished, by the date in Johnson City (src/discoverHopeNext.js).
     * With a sign-up link, it shows the date and the sign-up button.
     * Without a link yet, "Sign up coming soon", naming the date.
     * With no upcoming class on the calendar, "Sign up coming soon" alone.

   The build writes src/generated/discover-hope.json (scripts/gen-discover-hope.mjs)
   so the class is in the pre-rendered HTML for crawlers and no-JS visitors.
   The server render and the first client render both start from that file, so
   they agree and React reports no hydration mismatch; the effect then applies
   today's date and the live calendar.

   QA: append ?previewSignup=closed to see the "coming soon" state. */

const { useState, useEffect } = React;

const CMS_ORIGIN = (import.meta.env && import.meta.env.VITE_CMS_ORIGIN) || 'https://media.hopejc.org';

function previewClosed() {
  try {
    return new URLSearchParams(window.location.search).get('previewSignup') === 'closed';
  } catch {
    return false;
  }
}

export function useNextDiscoverHope() {
  const [cls, setCls] = useState(BUILT || null);
  // null until mounted: the server has no "today", so the baked class is shown as-is.
  const [today, setToday] = useState(null);
  const [forcedClosed, setForcedClosed] = useState(false);

  useEffect(() => {
    setToday(todayInJohnsonCity());
    setForcedClosed(previewClosed());
    let cancelled = false;
    fetch(`${CMS_ORIGIN}/api/public/calendar`)
      .then((r) => (r.ok ? r.json() : null))
      .then((body) => {
        if (!cancelled && body && Array.isArray(body.events)) {
          setCls(pickNextDiscoverHope(body.events, todayInJohnsonCity()));
        }
      })
      .catch(() => { /* keep the copy baked in at build */ });
    return () => { cancelled = true; };
  }, []);

  const current = cls && (today === null || cls.endDate >= today) ? cls : null;
  const signupUrl = current && current.signupUrl ? current.signupUrl : null;

  return {
    open: !!signupUrl && !forcedClosed,
    signupUrl,
    label: current ? classLabel(current.date) : null,
    time: current ? timeLabel(current.time) : null,
  };
}

/* ── Why this is a button and not an embedded form ──────────────────
   Church Center sends `X-Frame-Options: SAMEORIGIN` on every /registrations/*
   URL, so the sign-up cannot be put in an iframe on hopejc.org — the browser
   blocks it (ERR_BLOCKED_BY_RESPONSE) and the visitor gets an empty box.
   Church Center's own modal script (js.churchcenter.com/modal/v1) hits the
   same wall: it loads the registration in an iframe too, so it just spins.

   Church Center *Forms* (/people/forms/*) and Giving send no such header —
   that's why the Plan a Visit and Connect Card embeds elsewhere on the site
   do work. If we ever want Discover Hope truly embedded on the page, the
   sign-up has to be built as a Church Center Form rather than a Registration;
   then this can become an <iframe> like ConnectCardPage's. */
