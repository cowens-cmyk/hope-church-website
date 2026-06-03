import React from 'react';
import { Icon, Button } from './shared.jsx';
import { PageHeader } from './pages.jsx';
// Hope Church — Prayer Request page + Podcast page (RSS-driven)

const { useState: useStatePP, useEffect: useEffectPP, useRef: useRefPP, useMemo: useMemoPP } = React;

// ============================================================
// Prayer Request Page
// ============================================================
function PrayerRequestPage() {
  // Planning Center form — submissions land in PCO People and notify info@hopejc.org.
  const formUrl = 'https://hopejc.churchcenter.com/people/forms/1235486';
  return (
    <div data-screen-label="Page · Prayer Requests">
      <PageHeader
        eyebrow="Prayer Requests"
        title="We'd be honored to pray with you."
        lead="Share what's on your heart — a burden, a celebration, a question. Our pastoral team and prayer ministry will pray over every request that comes in."
      />
      <section className="prayer-section">
        <div className="container prayer-grid">
          <div className="connect-embed-wrap reveal-fade">
            <iframe
              src={`${formUrl}?open_in_church_center_modal=false`}
              title="Prayer Request — Hope Church"
              className="connect-embed"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>

          <aside className="prayer-aside reveal-stagger">
            <div className="prayer-verse-card reveal">
              <div className="v-eyebrow">A Promise</div>
              <blockquote>
                Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.
              </blockquote>
              <cite>Philippians 4:6</cite>
            </div>

            <div className="prayer-team-card reveal">
              <h3>Need pastoral care?</h3>
              <p>For urgent care, a hospital visit, or a longer conversation with a pastor, please reach out directly &mdash; we&rsquo;d love to walk with you.</p>
              <div className="meta">
                <Icon name="mail" size={15} color="var(--hope-blue)" />
                <a href="mailto:info@hopejc.org">info@hopejc.org</a>
              </div>
              <div className="meta" style={{marginTop:6}}>
                <Icon name="phone" size={15} color="var(--hope-blue)" />
                <span>(423) 207&ndash;3341</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// Podcast Page (RSS-driven)
// ============================================================

const PODCASTS = [
  {
    id: 'sunday',
    name: 'Hope Church Johnson City',
    short: 'Sunday Sermons',
    tagline: 'Sunday Sermons',
    rss: 'https://podcasts.subsplash.com/4sgn2fc/podcast.rss',
    apple: 'https://podcasts.apple.com/us/podcast/hope-church-johnson-city/id1234567890',
    description: "Sunday-morning messages from Hope Church Johnson City \u2014 verse-by-verse teaching for everyday life. Listen anywhere you get podcasts, or right here.",
    cover: 'https://images.subsplash.com/base64/L2ltYWdlLmpwZz9pZD1lYWY3MzFmMy0wYjIxLTRlM2QtYmY1OS0zY2FlMTUwMDE0OGImdz0zMDAwJmg9MzAwMCZhbGxvd191cHNjYWxlPXRydWU.jpg',
  },
  {
    id: 'finding-hope',
    name: 'Finding Hope',
    short: 'Finding Hope',
    tagline: 'A weekly conversation',
    rss: 'https://podcasts.subsplash.com/bn2x4jj/podcast.rss',
    description: "Life is hard, but there's always hope. Pastors and friends walk through faith, family, theology, and the hard questions of the Bible.",
    cover: 'https://images.subsplash.com/base64/L2ltYWdlLmpwZz9pZD1lYWYzMWFiMi1iNWUxLTQ4NzctOTVmMy0xYTAxYjU2NDA0OWQmdz0zMDAwJmg9MzAwMCZhbGxvd191cHNjYWxlPXRydWU.jpg',
  },
];

// ------------------------------------------------------------
// Static fallback data (snapshot from the live feeds).
// Used when the browser can't reach the RSS endpoint (CORS,
// offline, etc). Audio URLs are the real Subsplash CDN links
// so playback works in every environment.
// Admins can refresh this snapshot from the Admin > Podcasts panel.
// ------------------------------------------------------------
const FALLBACK_EPISODES = {
  'sunday': [
    { id: 's1', title: "Everybody's Got an Opinion",     subtitle: 'Romans 14:1-12',  author: 'Rick Keller', pubDate: '2026-05-17', duration: 2720,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHL2EzMzRmM2JkLTQ5ODktNDk0OS1iYTZmLWJkZjEyMTA2ZTlmYS9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=gtc6h86' },
    { id: 's2', title: 'Love Fulfills the Law',          subtitle: 'Romans 13:8-14',  author: 'Rick Keller', pubDate: '2026-05-10', duration: 2579,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHL2ZlZmI2ZDlkLTdkYmMtNGU1My1hZDJhLWJiOWIyNjE1NjQ3Yy9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=w52tzk9' },
    { id: 's3', title: 'The Tension of Authority',       subtitle: 'Romans 13:1-7',   author: 'Will Easler', pubDate: '2026-05-03', duration: 2432,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHLzA3MzMzMDNhLWQ2NTAtNGZhMS04MGE5LTE0MzJiMjVmMjg5YS9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=9pgt3tj' },
  ],
  'finding-hope': [
    { id: 'f041', title: '041 Romans 13:8-14',     pubDate: '2026-05-14', duration: 2880,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHLzE5NDk1MTgyLTA3NDctNDRmYy1iNzRkLTM1YjJmZTIyYTE2ZC9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=t6w2yv8' },
    { id: 'f040', title: '040 Romans 13:1-7',      pubDate: '2026-05-13', duration: 2291,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHL2Y4MWQxZWVkLTRkOWUtNGIzZC04MDkxLWYwNmM2YzdmZDY3OS9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=pdjx9rk' },
    { id: 'f039', title: '039 Romans 12:13-21',    pubDate: '2026-04-28', duration: 3066,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHLzY2YzU2OTk4LWIxYWMtNGQzNC1iN2ViLTk5MjgyYTg3MTg0ZC9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=3kjz8k5' },
    { id: 'f038', title: '038 Romans 12:9-12',     pubDate: '2026-04-21', duration: 2908,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHLzdjMThiNTVlLTU2M2YtNDhhMS05NWUyLTI0NDE1ZDNjZDA2NC9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=tsghfs8' },
    { id: 'f037', title: '037 Romans 12:3-8',      pubDate: '2026-04-13', duration: 3114,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHLzQ4ZTE1ZDkxLWQ4OTQtNDVmZi1hZGQxLWYxYTYxYzYzNDgzMy9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=mfbvfq2' },
    { id: 'f036', title: '036 Even If Conference', pubDate: '2026-04-11', duration: 2517,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHL2Q5MDU4Y2IxLTk3NGQtNDFhNy05NjhmLWViYWIyNzdlNDAwZC9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=bwt8c9f' },
    { id: 'f035', title: '035 Romans 12:1-2',      pubDate: '2026-04-06', duration: 2076,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHL2VkYjQ0YzEwLTc4M2YtNGUzMS1iNTFiLWRkMjM3YzcxNzkxYi9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=8bx8dyc' },
    { id: 'f034', title: '034 Romans 11:25-36',    pubDate: '2026-04-01', duration: 2310,
      audio: 'https://t.subsplash.com/r/aHR0cHM6Ly9jZG4uc3Vic3BsYXNoLmNvbS9hdWRpb3MvM05ETkNHL2E0NGRjMGI5LTUzMzYtNDEyOC1hZDNiLTgzMjUwMzQzNTNiMS9hdWRpby5tcDM.mp3?k=3NDNCG&s=3&sapid=cf3wtqt' },
  ],
};

function formatDuration(seconds) {
  const s = Number(seconds);
  if (!s || isNaN(s)) return '';
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

function formatDate(d) {
  try {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) { return ''; }
}

function stripHtml(s) {
  if (!s) return '';
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Parse a Subsplash RSS feed (plain XML). Tolerant of missing fields.
function parseFeed(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'application/xml');
  const errNode = doc.querySelector('parsererror');
  if (errNode) throw new Error('Could not parse RSS feed');

  const channel = doc.querySelector('channel');
  if (!channel) throw new Error('No <channel> in feed');

  // iTunes namespace lookup helper
  const getITunes = (parent, tag) => {
    const el = parent.getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd', tag)[0];
    return el ? (el.getAttribute('href') || el.textContent || '') : '';
  };

  const channelTitle = channel.querySelector(':scope > title')?.textContent?.trim() || '';
  const channelDesc  = channel.querySelector(':scope > description')?.textContent?.trim() || '';
  const channelImage =
    getITunes(channel, 'image') ||
    channel.querySelector(':scope > image > url')?.textContent?.trim() || '';

  const itemNodes = Array.from(channel.querySelectorAll(':scope > item'));
  const items = itemNodes.map((item, i) => {
    const title = item.querySelector(':scope > title')?.textContent?.trim() || `Episode ${i+1}`;
    const subtitle = getITunes(item, 'subtitle') || '';
    const author   = getITunes(item, 'author') || '';
    const summary  = getITunes(item, 'summary') || '';
    const desc     = item.querySelector(':scope > description')?.textContent?.trim() || '';
    const pubDate  = item.querySelector(':scope > pubDate')?.textContent?.trim() || '';
    const duration = getITunes(item, 'duration');
    const enclosure = item.querySelector(':scope > enclosure');
    const audio = enclosure ? enclosure.getAttribute('url') : '';
    const image = getITunes(item, 'image') || channelImage;
    return {
      id: item.querySelector(':scope > guid')?.textContent?.trim() || `${i}`,
      title, subtitle, author,
      summary: stripHtml(summary || desc),
      pubDate, duration, audio, image,
    };
  });

  return { title: channelTitle, description: channelDesc, image: channelImage, items };
}

async function fetchFeed(url) {
  // 1) Try direct (works if feed sends CORS headers)
  try {
    const r = await fetch(url, { headers: { Accept: 'application/rss+xml, application/xml;q=0.9, */*;q=0.8' } });
    if (r.ok) {
      const text = await r.text();
      const parsed = parseFeed(text);
      if (parsed.items.length || parsed.title) return parsed;
    }
  } catch (e) { /* fall through to proxy */ }

  // 2) Try a CORS-friendly proxy (allorigins) — raw passthrough
  try {
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const r = await fetch(proxied);
    if (r.ok) {
      const text = await r.text();
      return parseFeed(text);
    }
  } catch (e) { /* fall through */ }

  throw new Error('Could not load podcast feed.');
}

function useFeed(channel) {
  const url = channel.rss;
  const fallbackData = useMemoPP(() => ({
    title: channel.name,
    description: channel.description,
    image: channel.cover,
    items: (FALLBACK_EPISODES[channel.id] || []).map(ep => ({
      ...ep,
      summary: '',
      image: channel.cover,
    })),
    isFallback: true,
  }), [channel.id]);

  const [state, setState] = useStatePP({ loading: false, error: null, data: fallbackData });

  useEffectPP(() => {
    let cancel = false;
    // Reset to fallback when channel switches; always show something instantly.
    setState({ loading: false, error: null, data: fallbackData });
    // Attempt a live refresh; if it succeeds, swap in the live data. If it fails
    // (CORS, offline, etc) we silently keep the fallback — no error UI.
    fetchFeed(url)
      .then((data) => {
        if (cancel) return;
        if (data && data.items && data.items.length) {
          setState({ loading: false, error: null, data: { ...data, isFallback: false } });
        }
      })
      .catch(() => { /* keep fallback */ });
    return () => { cancel = true; };
  }, [url]);
  return state;
}

function PlayIcon({ playing }) {
  if (playing) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="5" width="4" height="14" rx="1"/>
        <rect x="14" y="5" width="4" height="14" rx="1"/>
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5.5v13c0 .8.9 1.3 1.6.8l10-6.5a1 1 0 0 0 0-1.7l-10-6.4A1 1 0 0 0 7 5.5z"/>
    </svg>
  );
}

function PodcastEpisodeRow({ ep, index, isCurrent, onPlay }) {
  return (
    <article className="podcast-episode">
      <div className="podcast-episode-num">{String(index + 1).padStart(2, '0')}</div>
      <div className="podcast-episode-body">
        <h3 className="podcast-episode-title">{ep.title}</h3>
        <div className="podcast-episode-meta">
          {ep.subtitle && <span className="podcast-episode-subtitle">{ep.subtitle}</span>}
          {ep.subtitle && ep.pubDate && <span className="dot" aria-hidden="true"/>}
          {ep.pubDate && <span>{formatDate(ep.pubDate)}</span>}
          {ep.duration && <span className="dot" aria-hidden="true"/>}
          {ep.duration && <span>{formatDuration(ep.duration)}</span>}
          {ep.author && <span className="dot" aria-hidden="true"/>}
          {ep.author && <span>{ep.author}</span>}
        </div>
      </div>
      <button
        type="button"
        className={`podcast-play-btn ${isCurrent ? 'is-playing' : ''}`}
        onClick={() => onPlay(ep)}
        aria-label={isCurrent ? `Pause ${ep.title}` : `Play ${ep.title}`}
      >
        <PlayIcon playing={isCurrent}/>
      </button>
    </article>
  );
}

function PodcastSkeleton({ rows = 6 }) {
  return (
    <div className="podcast-skeleton">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="podcast-skeleton-row" key={i}>
          <div className="podcast-skel-block" style={{width: 20, height: 14}}/>
          <div>
            <div className="podcast-skel-block" style={{width: '60%'}}/>
            <div className="podcast-skel-block short"/>
          </div>
          <div className="podcast-skel-circle"/>
        </div>
      ))}
    </div>
  );
}

function ApplePodcastsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 3.4 1.7 6.4 4.3 8.2l.4-1.5C4.5 17.1 3.5 14.7 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5c0 2.7-1 5.1-3.2 6.7l.4 1.5C20.3 18.4 22 15.4 22 12c0-5.5-4.5-10-10-10zm0 4.5c-3 0-5.5 2.5-5.5 5.5 0 1.7.8 3.2 2 4.2l.4-1.5C8 13.9 7.5 13 7.5 12c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 1-.5 1.9-1.4 2.7l.4 1.5c1.2-1 2-2.5 2-4.2 0-3-2.5-5.5-5.5-5.5zm0 4a1.5 1.5 0 0 0-1.5 1.5c0 .6.3 1.1.8 1.4L10 22h4l-1.3-8.6c.5-.3.8-.8.8-1.4a1.5 1.5 0 0 0-1.5-1.5z"/>
    </svg>
  );
}
function SpotifyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.5c-.2.3-.6.4-.9.2-2.4-1.5-5.5-1.8-9.1-1-.4.1-.7-.2-.8-.5-.1-.4.2-.7.5-.8 4-.9 7.4-.5 10.1 1.1.4.2.4.6.2 1zm1.2-2.8c-.3.4-.7.5-1.1.3-2.8-1.7-7-2.2-10.2-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.7-1.1 8.3-.6 11.5 1.4.4.2.5.7.3 1zm.1-2.9c-3.3-2-8.8-2.2-12-1.2a1 1 0 0 1-.5-2c3.7-1.1 9.7-.9 13.5 1.4a1 1 0 1 1-1 1.8z"/>
    </svg>
  );
}
function RssIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 3a16 16 0 0 1 16 16h-3A13 13 0 0 0 5 6V3zm0 6a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V9zm1.5 7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>
    </svg>
  );
}

function PodcastChannelView({ channel }) {
  const feed = useFeed(channel);
  const [current, setCurrent] = useStatePP(null);
  const audioRef = useRefPP(null);

  // Reset current episode when channel changes
  useEffectPP(() => { setCurrent(null); }, [channel.id]);

  const onPlay = (ep) => {
    if (!ep.audio) return; // silently ignore episodes with no audio URL
    if (current && current.audio === ep.audio) {
      const a = audioRef.current;
      if (a) { if (a.paused) a.play(); else a.pause(); }
    } else {
      setCurrent(ep);
      setTimeout(() => {
        const a = audioRef.current;
        if (a) { a.play().catch(() => {}); }
      }, 50);
    }
  };

  const cover = feed.data?.image || channel.cover || '';

  return (
    <>
      <section className="podcast-section">
        <div className="container">
          <header className="podcast-channel-header">
            <div className="podcast-cover reveal-fade">
              {cover ? <img src={cover} alt={`${channel.name} cover art`}/> : null}
            </div>
            <div className="podcast-channel-text reveal-stagger">
              <div className="eyebrow reveal">{channel.tagline}</div>
              <h1 className="reveal">{channel.name}</h1>
              <p className="reveal">{channel.description}</p>
              <div className="podcast-channel-links reveal">
                <a className="podcast-link-pill" href={channel.rss} target="_blank" rel="noopener">
                  <RssIcon/> RSS Feed
                </a>
                <a className="podcast-link-pill" href={`https://podcasts.apple.com/search?term=${encodeURIComponent(channel.name)}`} target="_blank" rel="noopener">
                  <ApplePodcastsIcon/> Apple Podcasts
                </a>
                <a className="podcast-link-pill" href={`https://open.spotify.com/search/${encodeURIComponent(channel.name)}/podcastAndEpisodes`} target="_blank" rel="noopener">
                  <SpotifyIcon/> Spotify
                </a>
              </div>
            </div>
          </header>

          <div className="podcast-episodes-header reveal">
            <h2>Episodes</h2>
            {feed.data && (
              <span className="count">{feed.data.items.length} episode{feed.data.items.length === 1 ? '' : 's'}{feed.data.isFallback ? ' \u00b7 recent' : ''}</span>
            )}
          </div>

          {feed.data && feed.data.items.length > 0 && (
            <div className="podcast-episodes">
              {feed.data.items.map((ep, i) => (
                <PodcastEpisodeRow
                  key={ep.id}
                  ep={ep}
                  index={i}
                  isCurrent={current && current.audio === ep.audio}
                  onPlay={onPlay}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Now-playing dock — only mounted when there's a current episode */}
      {current && (
        <div className="podcast-dock is-open">
          <div className="container podcast-dock-inner">
            <div className="podcast-dock-meta">
              <div className="podcast-dock-show">{channel.short}</div>
              <div className="podcast-dock-title">{current.title}</div>
            </div>
            <audio
              ref={audioRef}
              className="podcast-dock-audio"
              controls
              autoPlay
              src={current.audio}
            />
            <button
              type="button"
              className="podcast-dock-close"
              onClick={() => {
                const a = audioRef.current; if (a) a.pause();
                setCurrent(null);
              }}
              aria-label="Close player"
            >&times;</button>
          </div>
        </div>
      )}
    </>
  );
}

function PodcastPage({ initialChannel }) {
  const [activeId, setActiveId] = useStatePP(initialChannel || PODCASTS[0].id);
  const channel = useMemoPP(() => PODCASTS.find(p => p.id === activeId) || PODCASTS[0], [activeId]);

  // Allow switching via prop change (e.g. footer click while on page)
  useEffectPP(() => {
    if (initialChannel && initialChannel !== activeId) setActiveId(initialChannel);
    // eslint-disable-next-line
  }, [initialChannel]);

  return (
    <div data-screen-label="Page · Podcasts">
      <PageHeader
        eyebrow="Listen"
        title="Hope Church Podcasts"
        lead={"Take Hope with you. Sunday sermons and our weekly Finding Hope conversation \u2014 free, wherever you listen."}
      />
      <div className="podcast-tabs">
        <div className="container">
          <div className="podcast-tabs-inner" role="tablist">
            {PODCASTS.map(p => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === activeId}
                className={`podcast-tab ${p.id === activeId ? 'active' : ''}`}
                onClick={() => setActiveId(p.id)}
              >
                {p.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PodcastChannelView channel={channel}/>
    </div>
  );
}

export { PrayerRequestPage, PodcastPage, PODCASTS, AppPage, ApplePodcastsIcon, SpotifyIcon, RssIcon };

// ============================================================
// App Page
// ============================================================
const APP_STORE_URL = 'https://apps.apple.com/us/app/hope-church-jc/id1427669078';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.subsplashconsulting.s_3NDNCG&pcampaignid=web_share';

function AppPageAppleBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM248.5 84.5c25.9-30.8 25.4-72.2 25.2-78.5-25.2 1.5-54.3 17.2-71 36.6-18.4 20.7-29.2 46.3-26.9 71.3 27.2 2.1 52.2-12 72.7-29.4z"/>
    </svg>
  );
}
function AppPageGoogleBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden="true">
      <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z" fill="#00d7fe"/>
      <path d="M104.6 13c-2.5 1.5-4.6 4.5-4.6 9.4v467.2c0 4.5 1.7 7.7 4.5 9.1l163.8-242.5z" fill="#22bb47"/>
      <path d="M325.3 277.7 104.5 498.7c4.5 2.4 11 1.9 16.8-1.5l284-161.7-79.6-58.4z" fill="#ff3a44"/>
      <path d="M484.6 222.5 425.7 188 358.5 256l67.2 67 58.9-33.7c20.9-11.6 20.9-44.6 0-56.2z" fill="#ffce00"/>
    </svg>
  );
}

function AppStoreButtons({ className = '' }) {
  return (
    <div className={`app-stores ${className}`}>
      <a
        className="app-store-btn"
        href={APP_STORE_URL}
        target="_blank" rel="noopener"
        aria-label="Download Hope Church JC on the App Store"
      >
        <AppPageAppleBadge/>
        <div>
          <div className="app-store-btn-small">Download on the</div>
          <div className="app-store-btn-big">App Store</div>
        </div>
      </a>
      <a
        className="app-store-btn"
        href={PLAY_STORE_URL}
        target="_blank" rel="noopener"
        aria-label="Get Hope Church JC on Google Play"
      >
        <AppPageGoogleBadge/>
        <div>
          <div className="app-store-btn-small">Get it on</div>
          <div className="app-store-btn-big">Google Play</div>
        </div>
      </a>
    </div>
  );
}

function AppFeature({ icon, title, children }) {
  return (
    <div className="app-feature-card">
      <div className="app-feature-icon">
        <Icon name={icon} size={22} color="var(--hope-blue)" strokeWidth={1.8}/>
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function AppPage() {
  const features = [
    { icon: 'mic',      title: 'Sermon library',    body: 'Every Sunday message \u2014 audio and video. Pick up where you left off.' },
    { icon: 'book',     title: 'Notes & Bible',     body: 'Follow along with the speaker\u2019s notes and tap any verse to open it in-line.' },
    { icon: 'calendar', title: 'Events & RSVPs',    body: 'See what\u2019s happening this week, register for events, and add them to your calendar.' },
    { icon: 'gift',     title: 'Give in seconds',   body: 'Securely give one-time or recurring \u2014 tithe, missions, or any fund \u2014 right from your phone.' },
  ];

  return (
    <div data-screen-label="Page · The Hope App">
      <section className="app-page-hero">
        <div className="container app-page-hero-inner">
          <div>
            <div className="app-page-eyebrow reveal-now">The Hope App</div>
            <h1 className="app-page-title reveal-now reveal-delay-1">Take Sunday <em>with you.</em></h1>
            <p className="app-page-lead reveal-now reveal-delay-2">
              Listen to sermons, follow along with notes, give, send prayer requests, and stay connected to everything happening at Hope &mdash; right from your pocket.
            </p>
            <div className="reveal-now reveal-delay-3"><AppStoreButtons/></div>
          </div>
          <div className="app-page-phone-wrap reveal-now reveal-delay-2" aria-hidden="true">
            <div className="app-phone">
              <div className="app-phone-notch"></div>
              <div className="app-phone-screen app-phone-screen--image">
                <img src={window.__resources.appScreenshot} alt="Hope Church app screenshot"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-page-features">
        <div className="container">
          <header className="app-page-features-header reveal-stagger">
            <div className="eyebrow reveal">Everything in one place</div>
            <h2 className="reveal">Built for the rhythms of our church.</h2>
            <p className="reveal">The Hope App is how a lot of our church family stays plugged in during the week. Here&rsquo;s what you&rsquo;ll find inside.</p>
          </header>
          <div className="app-page-features-grid reveal-stagger">
            {features.map(f => (
              <div className="reveal" key={f.title}>
                <AppFeature icon={f.icon} title={f.title}>{f.body}</AppFeature>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-page-install">
        <div className="container">
          <div className="app-page-install-inner">
            <div className="app-page-install-text reveal-stagger">
              <div className="eyebrow reveal">Get it on your phone</div>
              <h2 className="reveal">Two taps and you&rsquo;re in.</h2>
              <p className="reveal">Free in the App Store and on Google Play. Sign in with your Hope account if you have one &mdash; or just browse as a guest.</p>
              <div className="reveal"><AppStoreButtons/></div>
            </div>
            <ol className="app-page-install-steps reveal-stagger">
              <li className="reveal">Tap the badge for your phone &mdash; App Store or Google Play.</li>
              <li className="reveal">Install the app (it&rsquo;s free) and open it once installed.</li>
              <li className="reveal">Optional: sign in to give, save notes, and sync across devices.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
