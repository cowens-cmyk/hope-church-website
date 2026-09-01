import React from 'react';
// Hope Church — Subsplash embed components
// Two flavors: iframe-based (recent media) and script-based (events, media library)

const { useEffect: useEffectSE, useRef: useRefSE } = React;

// Subsplash's embed loader reads `?sapurl=...` from the parent window URL and
// uses it to override the embed key passed in. That's fine for a single-embed
// page, but on this SPA, navigating between pages with different embeds leaves
// the sapurl stamped from the previous one — so the next embed loads the wrong
// content. Strip it before each embed mounts.
function clearSapUrlParam() {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('sapurl') || /[?&]sapurl=/.test(url.search)) {
      // Some URLs have malformed search strings like `?srcmap=1?sapurl=...`
      // (two `?` separators). Rebuild the search safely.
      const search = url.search.replace(/[?&]sapurl=[^&]*/g, '');
      const cleaned = search.replace(/^\?+/, '?').replace(/^\?$/, '');
      window.history.replaceState(null, '', url.pathname + cleaned + url.hash);
    }
  } catch (_) { /* ignore */ }
}

// ---------- Subsplash: Most Recent Media (simple iframe) ----------
function SubsplashRecent({ context = 'list:0aaf37f6-7651-48a1-b3b6-6a7f410ec35a', title = 'Most recent sermon' }) {
  return (
    <div className="sap-embed-player">
      <iframe
        src={`https://subsplash.com/u/hopechurchjc/media/embed/d/*recent?context=${context}`}
        frameBorder="0"
        allow="clipboard-read; clipboard-write"
        allowFullScreen
        title={title}
      />
    </div>
  );
}

// ---------- Subsplash: script-based embed (events / media library) ----------
// The Subsplash embed script looks for an element by exact id, then injects an iframe.
// We render a placeholder script tag with that exact id, then load the loader script
// which calls subsplashEmbed(key, host, id).
function SubsplashScriptEmbed({ embedId, embedKey }) {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    // Reset any prior contents (e.g. on page switch back)
    host.innerHTML = '';

    // The target needs to be a <script> with the exact id the loader looks up.
    const target = document.createElement('script');
    target.id = embedId;
    target.type = 'text/javascript';
    host.appendChild(target);

    // Loader
    const loader = document.createElement('script');
    loader.type = 'text/javascript';
    loader.src = 'https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js';
    loader.onload = function () {
      if (typeof window.subsplashEmbed === 'function') {
        try {
          window.subsplashEmbed(embedKey, 'https://subsplash.com/', embedId);
        } catch (err) {
          console.warn('Subsplash embed init failed', err);
        }
      }
    };
    // Match Subsplash's own pattern: insert the loader before the target.
    target.parentElement.insertBefore(loader, target);

    return () => {
      // Cleanup on unmount/route change
      if (host) host.innerHTML = '';
    };
  }, [embedId, embedKey]);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: Events ----------
// Uses the exact embed snippet provided by Subsplash, verbatim.
// We inject a real <script id="subsplash-embed-28hjdgf"> whose body is the
// official inline loader pattern, so Subsplash's loader sees the DOM shape it expects.
function SubsplashEvents() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    // The target MUST be a <script> with this exact id.
    const target = document.createElement('script');
    target.id = 'subsplash-embed-28hjdgf';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-28hjdgf");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/ca/+28hjdgf?embed",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-28hjdgf"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: Full Media Library ----------
// Uses the exact embed snippet provided by Subsplash, verbatim — same pattern as SubsplashEvents.
function SubsplashMediaLibrary() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-ffj2cbm';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-ffj2cbm");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/li/+ffj2cbm?embed&1779372830237",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-ffj2cbm"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: Linked 56 calendar ----------
// Uses the exact embed snippet provided by Subsplash, verbatim — same pattern as SubsplashEvents.
function SubsplashLinked56Calendar() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-3j67hmy';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-3j67hmy");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/ca/+3j67hmy?embed",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-3j67hmy"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: Hope Students calendar ----------
function SubsplashStudentsCalendar() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-55f72c2';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-55f72c2");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/ca/+55f72c2?embed",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-55f72c2"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: Hope Kids calendar ----------
function SubsplashKidsCalendar() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-4tswqyf';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-4tswqyf");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/ca/+4tswqyf?embed",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-4tswqyf"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: College & Career calendar ----------
function SubsplashCollegeCalendar() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-rpzgjpt';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-rpzgjpt");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/ca/+rpzgjpt?embed",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-rpzgjpt"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: Woven (Women's Ministry) calendar ----------
function SubsplashWomenCalendar() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-gtsnmpf';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-gtsnmpf");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/ca/+gtsnmpf?embed",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-gtsnmpf"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: H.I.T. Men (Men's Ministry) calendar ----------
function SubsplashMenCalendar() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-vdtznkr';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-vdtznkr");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/ca/+vdtznkr?embed",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-vdtznkr"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Subsplash: Fueled by Hope (Senior Adult Ministry) calendar ----------
function SubsplashFueledByHopeCalendar() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    clearSapUrlParam();
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-skftng2';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-skftng2");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "+4h5t/lb/ca/+skftng2?embed",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-skftng2"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host" ref={hostRef} />;
}

// ---------- Hope CMS embed (media.hopejc.org) ----------
// Hope's own CMS replaces the Subsplash embeds. It serves a player page per
// collection at /embed/<branch-slug> — e.g. students-messages.
//
// Two things worth knowing:
//   * The old address was cms.hopejc.org, which is not the CMS. It resolves to
//     an unrelated host, so that embed was showing nothing.
//   * The page measures itself and posts its height, so the frame grows to fit
//     instead of scrolling inside a fixed box. `height` is only the starting
//     size, used until the first message arrives.
const CMS_ORIGIN = 'https://media.hopejc.org';

function HopeCmsEmbed({ slug, query = '', title = 'Hope Church embed', height = 760 }) {
  const frameRef = useRefSE(null);
  const [h, setH] = React.useState(height);

  useEffectSE(() => {
    function onMessage(e) {
      // Only trust our own CMS, and only the one field we expect.
      if (e.origin !== CMS_ORIGIN) return;
      // ...and only from THIS iframe. The sermons page carries two embeds, and
      // without this both applied whichever height arrived last, so the short
      // "latest message" hero stretched to the full library's height.
      if (!frameRef.current || e.source !== frameRef.current.contentWindow) return;
      const next = e.data && e.data.hopeEmbedHeight;
      if (typeof next === 'number' && next > 200 && next < 6000) setH(next);
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="cms-embed-frame" style={{ borderRadius: 16, overflow: 'hidden' }}>
      <iframe
        ref={frameRef}
        src={`${CMS_ORIGIN}/embed/${slug}${query}`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
        style={{ width: '100%', height: h, border: 0, display: 'block' }}
      />
    </div>
  );
}

// ---------- Online Giving embed ----------
// Planning Center giving, embedded from Church Center. Church Center's Giving
// URLs send no X-Frame-Options (unlike /registrations/*, see src/discoverHope.js),
// so this can be a plain iframe — no third-party script required.
// `allow="payment"` lets Apple Pay / Google Pay work inside the frame.
const GIVING_URL = 'https://hopejc.churchcenter.com/giving';

function GiveEmbed() {
  return (
    <>
      <iframe
        src={GIVING_URL}
        title="Give to Hope Church"
        className="give-embed"
        loading="lazy"
        allow="payment; clipboard-write"
      />
      <p className="connect-embed-fallback">
        Form not loading? <a href={GIVING_URL} target="_blank" rel="noopener">Give at Church Center</a>.
      </p>
    </>
  );
}

export { SubsplashRecent, SubsplashScriptEmbed, SubsplashEvents, SubsplashMediaLibrary, SubsplashLinked56Calendar, SubsplashStudentsCalendar, SubsplashKidsCalendar, SubsplashCollegeCalendar, SubsplashWomenCalendar, SubsplashMenCalendar, SubsplashFueledByHopeCalendar, HopeCmsEmbed, GiveEmbed };
