/* Hope Church — application entry point.
   Mounts the public site into #root. Page navigation is client-side state
   (the prototype kept the URL at "/" — preserved here as-is). */
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import {
  AnnouncementBar, SundayStrip, SiteHeader, Footer,
  MissionBar, ServiceTimes, NewHereBlock,
} from './components/shared.jsx';
import {
  HeroA, HeroB, HeroC, ThisWeekSermon, UpcomingEvents,
  MinistriesBlock, AppBand, GiveCTA,
} from './components/homepage.jsx';
import {
  VisitPage, AboutPage, TeamPage, SermonsPage, EventsPage,
  GivePage, MinistriesPage, MinistryDetailPage, ServePage,
  NextStepsPage, ContactPage,
} from './components/pages.jsx';
import {
  LifeGroupsPage, MissionsPage, ConnectCardPage, DiscoverHopePage,
} from './components/getinvolved.jsx';

// Site-wide toggles. Hero variant A (photo hero) is the final design choice;
// the announcement bar is off until there's something to announce.
const TWEAKS = {
  heroVariant: 'A',
  announcementVisible: false,
  headerDark: false,
};

// Persist the current page across reloads.
function lsGet(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

function HomePage({ variant, onNav }) {
  const Hero = variant === 'B' ? HeroB : variant === 'C' ? HeroC : HeroA;
  return (
    <>
      <Hero onVisit={() => onNav('visit')} onWatch={() => window.open('https://www.youtube.com/@hopechurchjohnsoncity', '_blank', 'noopener')} />
      {variant !== 'A' && <MissionBar/>}
      <NewHereBlock onVisit={() => onNav('visit')} />
      <ThisWeekSermon onSermons={() => onNav('sermons')} />
      <ServiceTimes/>
      <MinistriesBlock onMinistries={() => onNav('ministries')} />
      <UpcomingEvents onEvents={() => onNav('events')} />
      <AppBand/>
      <GiveCTA onGive={() => onNav('give')} />
    </>
  );
}

function PublicSite({ tweaks }) {
  const [page, setPage] = useState(() => lsGet('hope_page', 'home'));
  useEffect(() => lsSet('hope_page', page), [page]);

  // Scroll to top on nav change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [page]);

  const [announceVisible, setAnnounceVisible] = useState(true);
  const showAnnounce = tweaks.announcementVisible && announceVisible;

  const navHandler = (p) => setPage(p);
  const pages = {
    home: <HomePage variant={tweaks.heroVariant} onNav={navHandler}/>,
    visit: <VisitPage/>,
    about: <AboutPage onNav={navHandler}/>,
    team: <TeamPage/>,
    sermons: <SermonsPage/>,
    events: <EventsPage/>,
    ministries: <MinistriesPage onNav={navHandler}/>,
    'ministry-kids': <MinistryDetailPage slug="ministry-kids" onNav={navHandler}/>,
    'ministry-linked56': <MinistryDetailPage slug="ministry-linked56" onNav={navHandler}/>,
    'ministry-students': <MinistryDetailPage slug="ministry-students" onNav={navHandler}/>,
    'ministry-college': <MinistryDetailPage slug="ministry-college" onNav={navHandler}/>,
    'ministry-women': <MinistryDetailPage slug="ministry-women" onNav={navHandler}/>,
    'ministry-men': <MinistryDetailPage slug="ministry-men" onNav={navHandler}/>,
    'ministry-worship': <MinistryDetailPage slug="ministry-worship" onNav={navHandler}/>,
    'ministry-fueledbyhope': <MinistryDetailPage slug="ministry-fueledbyhope" onNav={navHandler}/>,
    give: <GivePage/>,
    serve: <ServePage/>,
    nextsteps: <NextStepsPage/>,
    contact: <ContactPage/>,
    lifegroups: <LifeGroupsPage onNav={navHandler}/>,
    missions: <MissionsPage onNav={navHandler}/>,
    connect: <ConnectCardPage/>,
    discover: <DiscoverHopePage onNav={navHandler}/>,
  };

  const isHome = page === 'home';
  const useDarkHeader = tweaks.headerDark && isHome && tweaks.heroVariant === 'C';

  return (
    <div data-screen-label={`Site · ${page}`}>
      <AnnouncementBar
        visible={showAnnounce}
        text="Baptism Sunday is May 16 — all three services."
        link="Learn more →"
        onDismiss={() => setAnnounceVisible(false)}
      />
      <SundayStrip/>
      <SiteHeader onNav={navHandler} current={page} dark={useDarkHeader}/>
      <main>{pages[page] || pages.home}</main>
      <Footer onNav={navHandler}/>
    </div>
  );
}

function App() {
  return <PublicSite tweaks={TWEAKS}/>;
}

createRoot(document.getElementById('root')).render(<App/>);
