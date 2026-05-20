// Hope Church — Subsplash embed components
// Two flavors: iframe-based (recent media) and script-based (events, media library)
import React from 'react';

const { useEffect: useEffectSE, useRef: useRefSE } = React;

// ---------- Subsplash: Most Recent Media (simple iframe) ----------
function SubsplashRecent() {
  return (
    <div className="sap-embed-player">
      <iframe
        src="https://subsplash.com/u/hopechurchjc/media/embed/d/*recent"
        frameBorder="0"
        allow="clipboard-read; clipboard-write"
        allowFullScreen
        title="Most recent sermon"
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

function SubsplashMediaLibrary() {
  return <SubsplashScriptEmbed embedId="subsplash-embed-95z9nk2" embedKey="+4h5t/lb/li/+95z9nk2?embed&1779113816390" />;
}

// ---------- Subsplash: Linked 56 calendar ----------
// Uses the exact embed snippet provided by Subsplash, verbatim — same pattern as SubsplashEvents.
function SubsplashLinked56Calendar() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
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

// ---------- Online Giving embed ----------
// Uses Hope's hosted giving form, verbatim per the official embed snippet.
function GiveEmbed() {
  const hostRef = useRefSE(null);
  useEffectSE(() => {
    const host = hostRef.current;
    if (!host) return;
    host.innerHTML = '';

    const target = document.createElement('script');
    target.id = 'subsplash-embed-4h5t';
    target.type = 'text/javascript';
    target.text = [
      'var target = document.getElementById("subsplash-embed-4h5t");',
      'var script = document.createElement("script");',
      'script.type = "text/javascript";',
      'script.onload = function() {',
      '  subsplashEmbed(',
      '    "u/-3NDNCG/give?&embed=true",',
      '    "https://subsplash.com/",',
      '    "subsplash-embed-4h5t"',
      '  );',
      '};',
      'script.src = "https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js";',
      'target.parentElement.insertBefore(script, target);'
    ].join('\n');
    host.appendChild(target);

    return () => { if (host) host.innerHTML = ''; };
  }, []);

  return <div className="subsplash-embed-host give-embed-host" ref={hostRef} />;
}

export { SubsplashRecent, SubsplashScriptEmbed, SubsplashEvents, SubsplashMediaLibrary, SubsplashLinked56Calendar, SubsplashStudentsCalendar, SubsplashKidsCalendar, SubsplashCollegeCalendar, SubsplashWomenCalendar, SubsplashMenCalendar, SubsplashFueledByHopeCalendar, GiveEmbed };
