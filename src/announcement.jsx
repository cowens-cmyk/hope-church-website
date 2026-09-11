/* Hope Church — the site-wide announcement bar, driven by the CMS.

   The text, link and schedule come from the App Layout document at
   media.hopejc.org — the same document the iOS and Android apps read, so a
   change made there shows on the website and in the apps together. This file
   decides whether the bar shows for this visitor; AnnouncementBar in
   components/shared.jsx draws it.

   Add ?previewBanner to any URL to see the current announcement outside its
   window, or after dismissing it. */
import React, { useEffect, useState } from 'react';
import BUILT from './generated/announcement.json';

const CMS_ORIGIN = (import.meta.env && import.meta.env.VITE_CMS_ORIGIN) || 'https://media.hopejc.org';

// Holds the `key` of the announcement this visitor closed. The CMS derives the
// key from the words, link and start, so editing the message brings it back
// and merely extending its end date does not.
const DISMISSED_KEY = 'hope_announcement_dismissed';

// The hard-coded bar this replaced remembered a dismissal under its own name.
// Someone who closed the fourth-service bar should not see it again just because
// it now comes from the CMS -- but only that announcement, recognised by the
// start it shipped with. A new announcement still has to reach them.
const LEGACY_DISMISSED_KEY = 'fourth-service-banner-dismissed';
const LEGACY_STARTS_AT = '2026-08-25T12:00:00Z';

export function isLive(a, now = Date.now()) {
  if (!a || !a.enabled || !a.text) return false;
  if (a.startsAt && now < Date.parse(a.startsAt)) return false;
  if (a.endsAt && now >= Date.parse(a.endsAt)) return false;
  return true;
}

/** `**bold**` is the only formatting the CMS offers, so this is the whole parser. */
export function renderRich(text) {
  return String(text || '').split('**').map((part, i) =>
    (i % 2 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>));
}

/** A link into this site becomes a path, so it stays on whichever host the page is on. */
export function hrefFor(url) {
  try {
    const u = new URL(url);
    if (u.hostname === 'www.hopejc.org' || u.hostname === 'hopejc.org') return u.pathname + u.search + u.hash;
    return u.toString();
  } catch {
    return null;
  }
}

function readFlags() {
  let preview = false;
  let dismissed = '';
  try {
    if (new URLSearchParams(window.location.search).has('previewBanner')) {
      window.sessionStorage.setItem('previewBanner', '1');
    }
    preview = window.sessionStorage.getItem('previewBanner') === '1';
    dismissed = window.localStorage.getItem(DISMISSED_KEY) || '';
  } catch { /* storage unavailable: show it, forget nothing */ }
  return { preview, dismissed };
}

function migrateLegacyDismissal(a) {
  try {
    if (a && a.key && a.startsAt === LEGACY_STARTS_AT
        && window.localStorage.getItem(LEGACY_DISMISSED_KEY) === '1') {
      window.localStorage.setItem(DISMISSED_KEY, a.key);
      window.localStorage.removeItem(LEGACY_DISMISSED_KEY);
    }
  } catch { /* storage unavailable */ }
}

/**
 * The announcement this visitor should see, and a function that dismisses it.
 *
 * `shown` starts null on purpose: the pre-rendered HTML carries no bar, so the
 * first client render must not either, or React reports a hydration mismatch.
 * The effect then shows the copy baked in at build time straight away, and swaps
 * in the live copy when the request returns.
 */
export function useAnnouncement(pathname) {
  const [current, setCurrent] = useState(BUILT);
  const [shown, setShown] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${CMS_ORIGIN}/api/public/app-layout`)
      .then((r) => (r.ok ? r.json() : null))
      .then((layout) => {
        if (!cancelled && layout && Array.isArray(layout.tabs)) setCurrent(layout.announcement || null);
      })
      .catch(() => { /* keep the built-in copy */ });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    migrateLegacyDismissal(current);
    const { preview, dismissed } = readFlags();
    const visible = !!(current && current.text && (preview || (isLive(current) && dismissed !== current.key)));
    setShown(visible ? current : null);
  }, [current, pathname]);

  const dismiss = () => {
    try {
      if (shown && shown.key) window.localStorage.setItem(DISMISSED_KEY, shown.key);
      window.sessionStorage.removeItem('previewBanner');
    } catch { /* ignore */ }
    setShown(null);
  };

  return [shown, dismiss];
}
