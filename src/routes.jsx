/* Hope Church — route table.

   This replaces the old "page is a string in React state" model with real,
   individually addressable, pre-rendered URLs. Every existing page component is
   reused unchanged; we simply give each one a path and keep the familiar
   onNav(key) callback working by wiring it to the router.

   vite-react-ssg walks this `routes` array at build time and writes one static
   HTML file per concrete path (dist/events/index.html, dist/about/index.html …)
   so search engines and first-paint both get real, complete HTML. */
import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import { KEY_TO_PATH, pathFor, keyForPath } from './nav.js';
import Seo from './seo.jsx';

import {
  AnnouncementBar, SundayStrip, SiteHeader, Footer, NewHereBlock, ServiceTimes,
} from './components/shared.jsx';
import {
  HeroA, ThisWeekSermon, UpcomingEvents, MinistriesBlock, AppBand, GiveCTA,
} from './components/homepage.jsx';
import {
  VisitPage, AboutPage, TeamPage, SermonsPage, EventsPage,
  GivePage, MinistriesPage, MinistryDetailPage, ServePage,
  NextStepsPage, ContactPage,
} from './components/pages.jsx';
import {
  LifeGroupsPage, MissionsPage, ConnectCardPage, DiscoverHopePage,
} from './components/getinvolved.jsx';
import { PrayerRequestPage, GetHelpPage, PodcastPage, AppPage } from './components/pages-extra.jsx';
import { GenerationsPage, GenerationsHomeBlock } from './components/generations.jsx';
import { PrivacyPage, AccessibilityPage, TermsPage } from './components/pages-legal.jsx';
import EventDetailPage from './components/event-detail.jsx';

// ServiceTimes lives in shared in some builds; import defensively from homepage.
// (Kept here so the homepage assembly below matches the original ordering.)

/* ---------- navigation helper ---------- */
// Returns an onNav(key) function with the exact signature every component
// already expects, but backed by the router instead of setState.
function useNav() {
  const navigate = useNavigate();
  return useCallback(
    (key) => {
      navigate(pathFor(key));
    },
    [navigate]
  );
}

/* ---------- small utilities ---------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

// Preserve any old, indexed/bookmarked "?page=key" deep links by forwarding
// them to the new clean URL. Runs only in the browser (inside an effect).
function LegacyPageRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p && KEY_TO_PATH[p]) navigate(KEY_TO_PATH[p], { replace: true });
    } catch {
      /* ignore */
    }
  }, [navigate]);
  return null;
}

/* ---------- homepage assembly (was inline in main.jsx) ---------- */
function HomePage({ onNav }) {
  return (
    <>
      <HeroA
        onVisit={() => onNav('visit')}
        onWatch={() =>
          window.open(
            'https://www.youtube.com/@hopechurchjohnsoncity',
            '_blank',
            'noopener'
          )
        }
      />
      <NewHereBlock onVisit={() => onNav('visit')} />
      <GenerationsHomeBlock onGenerations={() => onNav('generations')} />
      <ThisWeekSermon onSermons={() => onNav('sermons')} />
      <ServiceTimes />
      <MinistriesBlock onMinistries={() => onNav('ministries')} />
      <UpcomingEvents onEvents={() => onNav('events')} />
      <AppBand />
      <GiveCTA onGive={() => onNav('give')} />
    </>
  );
}

/* ---------- 404 ---------- */
function NotFound() {
  return (
    <>
      <Seo pageKey="home" />
      <section
        style={{
          padding: '120px 24px',
          textAlign: 'center',
          maxWidth: 640,
          margin: '0 auto',
        }}
      >
        <p style={{ fontSize: 14, letterSpacing: '0.08em', opacity: 0.6 }}>
          ERROR 404
        </p>
        <h1 style={{ fontSize: 36, margin: '12px 0 16px' }}>
          We couldn’t find that page
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.8 }}>
          The page you’re looking for may have moved or no longer exists.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn btn-primary" to="/">
            Back to home
          </Link>
        </p>
      </section>
    </>
  );
}

/* ---------- shared layout (header + footer wrap every page) ---------- */
// Fourth-service announcement window (absolute instants, timezone-proof):
//   Reveals   Tuesday, August 25 2026 at 8:00am ET (EDT = UTC-4 -> 12:00 UTC)
//   Auto-hides Sunday, September 20 2026 at 2:00pm ET (the 12:45 service has
//              started, so it is no longer "coming" -> 18:00 UTC)
// Add ?previewBanner to any URL to force it visible outside that window.
const SVC_BANNER_REVEAL = Date.parse('2026-08-25T12:00:00Z');
const SVC_BANNER_HIDE = Date.parse('2026-09-20T18:00:00Z');
// Bumping this key re-shows the bar to visitors who dismissed the previous one.
const SVC_BANNER_DISMISS_KEY = 'fourth-service-banner-dismissed';

function Layout() {
  const location = useLocation();
  const current = keyForPath(location.pathname);
  const onNav = useNav();

  const [bannerVisible, setBannerVisible] = useState(false);
  useEffect(() => {
    let preview = false;
    let dismissed = false;
    try {
      // Persist preview across in-app navigation (param is dropped on client nav).
      if (new URLSearchParams(window.location.search).has('previewBanner')) {
        window.sessionStorage.setItem('previewBanner', '1');
      }
      preview = window.sessionStorage.getItem('previewBanner') === '1';
      dismissed = window.localStorage.getItem(SVC_BANNER_DISMISS_KEY) === '1';
    } catch { /* ignore */ }
    const now = Date.now();
    const inWindow = now >= SVC_BANNER_REVEAL && now < SVC_BANNER_HIDE;
    // Preview always wins, so ?previewBanner reliably shows it even if previously dismissed.
    setBannerVisible(preview || (inWindow && !dismissed));
  }, [location.pathname]);

  const dismissBanner = () => {
    setBannerVisible(false);
    try { window.localStorage.setItem(SVC_BANNER_DISMISS_KEY, '1'); } catch { /* ignore */ }
  };

  return (
    <div data-screen-label={`Site · ${current}`}>
      <ScrollToTop />
      <LegacyPageRedirect />
      <AnnouncementBar
        visible={bannerVisible}
        text={<>A 4th service is coming! Starting <strong>Sunday, September 20</strong> we&rsquo;re adding a <strong>12:45pm</strong> service.</>}
        onDismiss={dismissBanner}
      />
      <SundayStrip />
      <SiteHeader onNav={onNav} current={current} dark={false} />
      <main>
        <Outlet />
      </main>
      <Footer onNav={onNav} />
      <Analytics />
    </div>
  );
}

/* ---------- page wrapper: injects SEO head + onNav into each page ---------- */
function View({ pageKey, Comp, extraProps }) {
  const onNav = useNav();
  return (
    <>
      <Seo pageKey={pageKey} />
      <Comp onNav={onNav} {...(extraProps || {})} />
    </>
  );
}

const ministry = (pageKey) => ({
  element: <View pageKey={pageKey} Comp={MinistryDetailPage} extraProps={{ slug: pageKey }} />,
});

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <View pageKey="home" Comp={HomePage} /> },
      { path: 'visit', element: <View pageKey="visit" Comp={VisitPage} /> },
      { path: 'about', element: <View pageKey="about" Comp={AboutPage} /> },
      { path: 'team', element: <View pageKey="team" Comp={TeamPage} /> },
      { path: 'sermons', element: <View pageKey="sermons" Comp={SermonsPage} /> },
      { path: 'events', element: <View pageKey="events" Comp={EventsPage} /> },
      // One event. Rendered here rather than proxied from the CMS so it keeps
      // the site header, nav and footer. Pre-rendered per event at build time
      // (see includedRoutes in vite.config.js); anything newer falls back to
      // the SPA shell and fetches live.
      { path: 'events/:slug', element: <EventDetailPage /> },
      { path: 'ministries', element: <View pageKey="ministries" Comp={MinistriesPage} /> },
      { path: 'ministries/kids', ...ministry('ministry-kids') },
      { path: 'ministries/linked56', ...ministry('ministry-linked56') },
      { path: 'ministries/students', ...ministry('ministry-students') },
      { path: 'ministries/college', ...ministry('ministry-college') },
      { path: 'ministries/women', ...ministry('ministry-women') },
      { path: 'ministries/men', ...ministry('ministry-men') },
      { path: 'ministries/worship', ...ministry('ministry-worship') },
      { path: 'ministries/fueled-by-hope', ...ministry('ministry-fueledbyhope') },
      { path: 'give', element: <View pageKey="give" Comp={GivePage} /> },
      { path: 'generations', element: <View pageKey="generations" Comp={GenerationsPage} /> },
      { path: 'serve', element: <View pageKey="serve" Comp={ServePage} /> },
      { path: 'next-steps', element: <View pageKey="nextsteps" Comp={NextStepsPage} /> },
      { path: 'contact', element: <View pageKey="contact" Comp={ContactPage} /> },
      { path: 'life-groups', element: <View pageKey="lifegroups" Comp={LifeGroupsPage} /> },
      { path: 'missions', element: <View pageKey="missions" Comp={MissionsPage} /> },
      { path: 'connect', element: <View pageKey="connect" Comp={ConnectCardPage} /> },
      { path: 'discover-hope', element: <View pageKey="discover" Comp={DiscoverHopePage} /> },
      { path: 'prayer', element: <View pageKey="prayer" Comp={PrayerRequestPage} /> },
      { path: 'get-help', element: <View pageKey="gethelp" Comp={GetHelpPage} /> },
      {
        path: 'podcast',
        element: <View pageKey="podcast" Comp={PodcastPage} extraProps={{ initialChannel: 'sunday' }} />,
      },
      {
        path: 'podcast/finding-hope',
        element: <View pageKey="podcast-finding-hope" Comp={PodcastPage} extraProps={{ initialChannel: 'finding-hope' }} />,
      },
      { path: 'app', element: <View pageKey="app" Comp={AppPage} /> },
      { path: 'privacy', element: <View pageKey="privacy" Comp={PrivacyPage} /> },
      { path: 'terms', element: <View pageKey="terms" Comp={TermsPage} /> },
      { path: 'accessibility', element: <View pageKey="accessibility" Comp={AccessibilityPage} /> },
      // Concrete 404 route so the build emits a real /404 page; copied to
      // dist/404.html in the postbuild step for Vercel to serve.
      { path: '404', element: <NotFound /> },
      // Client-side catch-all for unknown URLs.
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
