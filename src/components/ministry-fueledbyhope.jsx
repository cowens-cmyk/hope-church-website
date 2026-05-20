// Hope Church — Fueled by Hope (Senior Adult Ministry) detail page
import React from 'react';
import { Button, Icon, PageHeader } from './shared.jsx';
import { SubsplashFueledByHopeCalendar } from './embeds.jsx';
//
// slug: ministry-fueledbyhope
//
// "Even youths grow tired and weary, and young men stumble and fall;
//  but those who hope in the Lord will renew their strength. They will
//  soar on wings like eagles; they will run and not grow weary, they
//  will walk and not be faint."  — Isaiah 40:30–31
//
// A ministry for adults 50+ that meets monthly for a wide variety of
// activities: outdoor outings, meals out, attending local venues, and
// outreach. The visual direction leans into the autumn-mountains hero
// photo: deep navy + warm amber/ember accent (the "fuel" in Fueled by
// Hope), echoing the fall ridge in the artwork. Same section rhythm as
// the Woven / H.I.T. / College pages so the ministry sits inside the
// church family, not beside it.

function FueledByHopeMinistryPage({ onNav }) {
  const FACEBOOK_URL = 'https://www.facebook.com/groups/501035948126139';
  const CONTACT_EMAIL = 'mailto:info@hopejc.org?subject=Fueled%20by%20Hope%20%E2%80%94%20Senior%20Adult%20Ministry';

  return (
    <>
      {/* ===== Section 1: Anchor — title + Isaiah 40 + photo card ===== */}
      <section className="fh-anchor">
        <div className="container fh-anchor-inner">
          <div className="fh-anchor-copy">
            <span className="fh-anchor-eyebrow">A Ministry of Hope Church &middot; Adults 50+</span>

            <h1>Fueled <em>by Hope</em>.</h1>

            <p className="fh-anchor-mission">
              A growing community for adults <strong>50 and up</strong> at Hope Church. We meet monthly for a wide variety of get-togethers &mdash; outdoor outings, meals out, local venues, and outreach &mdash; sharing this season of life with each other and with the Lord who keeps renewing our strength.
            </p>

            <div className="fh-anchor-divider"></div>

            <blockquote className="fh-verse">
              <span className="fh-verse-ref">Isaiah 40:30 &ndash; 31</span>
              <p>
                &ldquo;Even youths grow tired and weary, and young men stumble and fall; but <em>those who hope in the Lord will renew their strength</em>. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.&rdquo;
              </p>
            </blockquote>

            <div className="fh-anchor-actions">
              <Button variant="primary" size="lg" icon="facebook" onClick={() => window.open(FACEBOOK_URL, '_blank', 'noopener')}>Facebook Group</Button>
              <Button variant="outline-on-dark" size="lg" iconRight="arrow" onClick={() => window.location.href = CONTACT_EMAIL}>Ask about Fueled by Hope</Button>
            </div>
          </div>

          <div className="fh-anchor-media">
            <div className="fh-anchor-photo">
              <img src="assets/fueled-cross-hike.jpg" alt="The Fueled by Hope group gathered together on a hike beneath a wooden cross in the autumn mountains of East Tennessee"/>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: A new ministry — single-column copy band ===== */}
      <section className="fh-secondhalf">
        <div className="container">
          <div className="fh-secondhalf-copy">
            <span className="fh-eyebrow">A New Ministry at Hope</span>
            <h2>Built around <em>this season</em> of life.</h2>
            <p>
              Fueled by Hope is a <strong>new ministry for adults 50 and up</strong> at Hope Church. We try to meet monthly and do a wide variety of activities &mdash; outdoor outings, eating out, attending local venues together, and outreach opportunities along the way.
            </p>
            <p>
              We&rsquo;d love to have you join us and get involved with this fun, dynamic group.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Calendar (Subsplash) ===== */}
      <section className="fh-calendar">
        <div className="container">
          <header className="fh-calendar-head">
            <span className="fh-eyebrow">What&rsquo;s Coming Up</span>
            <h2>The Fueled by Hope <em>calendar</em>.</h2>
            <p>Pulled live from our church calendar so the dates, times, and locations are always current. See something you like &mdash; just come.</p>
          </header>
          <div className="fh-calendar-frame">
            <SubsplashFueledByHopeCalendar/>
          </div>
        </div>
      </section>

      {/* ===== Section 5: CTA band — Facebook group + contact ===== */}
      <section className="fh-cta-band">
        <div className="container">
          <span className="fh-eyebrow">Stay in the Loop</span>
          <h2>Join us on <em>Facebook</em>.</h2>
          <p>Our Facebook group is the easiest way to keep up with what&rsquo;s going on &mdash; upcoming gatherings, photos from recent outings, and general updates from the group.</p>
          <div className="cta-band-actions">
            <Button variant="primary" size="xl" icon="facebook" onClick={() => window.open(FACEBOOK_URL, '_blank', 'noopener')}>Fueled by Hope Facebook Group</Button>
            <Button variant="outline-on-dark" size="xl" iconRight="arrow" onClick={() => window.location.href = CONTACT_EMAIL}>Ask about Fueled by Hope</Button>
          </div>
          <div className="fh-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { FueledByHopeMinistryPage };
