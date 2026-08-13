import React from 'react';

/* Hope Church — Discover Hope sign-up, single source of truth.

   Discover Hope meets the first Wednesday of every month at 6:30pm.
   Registration lives in Church Center and gets a brand-new link for each
   month's class, so this file is the one place that has to change.

   ── Posting next month's class ──────────────────────────────────────
   Update the three fields below:
     signupUrl   the new Church Center registration link
     classLabel  the class date, written the way it should read on the page
     closesAt    midnight ET the morning AFTER the class (table below)

   Once `closesAt` passes, the sign-up button comes down on its own and the
   page shows "Sign up coming soon" — no deploy needed to pull the old link.
   The next deploy with a fresh signupUrl puts the button back.

   ── closesAt for upcoming classes ───────────────────────────────────
     Wed Sep 2 2026  ->  '2026-09-03T04:00:00Z'
     Wed Oct 7 2026  ->  '2026-10-08T04:00:00Z'
     Wed Nov 4 2026  ->  '2026-11-05T05:00:00Z'   (EST — clocks fell back Nov 1)
     Wed Dec 2 2026  ->  '2026-12-03T05:00:00Z'
     Wed Jan 6 2027  ->  '2027-01-07T05:00:00Z'
     Wed Feb 3 2027  ->  '2027-02-04T05:00:00Z'
   These are UTC instants so the cutoff lands at midnight in Johnson City no
   matter where the visitor is. Eastern is UTC-4 in summer (T04:00:00Z) and
   UTC-5 in winter (T05:00:00Z) — DST flips the first Sunday in November and
   the second Sunday in March. (Congress keeps floating permanent DST; as of
   Aug 2026 it is not law and clocks still change. If that ever passes, every
   closesAt below the switch becomes T04:00:00Z year-round.)

   QA: append ?previewSignup=closed to the page URL to see the "coming soon"
   state early, or ?previewSignup=open to force the sign-up back on. */

const { useState, useEffect } = React;

export const DISCOVER_HOPE = {
  signupUrl: 'https://hopejc.churchcenter.com/registrations/events/3816583',
  classLabel: 'Wednesday, September 2',
  closesAt: Date.parse('2026-09-03T04:00:00Z'), // midnight ET, Thu Sep 3 2026
};

/* True while the current class's sign-up should be showing.

   The static/SSR render bakes in "open" so the sign-up is in the HTML for
   crawlers and no-JS visitors; the effect below closes it once closesAt has
   passed. That means a visitor with JS off could still see a stale button in
   the gap between a class and the next update — the Church Center link itself
   stops accepting registrations at that point, so it fails safe. */
export function useDiscoverHopeSignupOpen() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    let force = null;
    try {
      const p = new URLSearchParams(window.location.search).get('previewSignup');
      if (p === 'open') force = true;
      else if (p === 'closed') force = false;
    } catch { /* ignore */ }
    setOpen(force !== null ? force : Date.now() < DISCOVER_HOPE.closesAt);
  }, []);
  return open;
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
