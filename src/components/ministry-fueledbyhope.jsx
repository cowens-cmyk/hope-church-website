import React from 'react';
import { Button } from './shared.jsx';
import { SubsplashFueledByHopeCalendar } from './embeds.jsx';
// Hope Church — Fueled by Hope (Senior Adult Ministry) detail page
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
          <div className="fh-anchor-copy reveal-stagger">
            <span className="fh-anchor-eyebrow reveal">A Ministry of Hope Church &middot; Adults 50+</span>

            <h1 className="reveal">Fueled <em>by Hope</em>.</h1>

            <p className="fh-anchor-mission reveal">
              A growing community for adults <strong>50 and up</strong> at Hope Church. We meet monthly for a wide variety of get-togethers &mdash; outdoor outings, meals out, local venues, and outreach &mdash; sharing this season of life with each other and with the Lord who keeps renewing our strength.
            </p>

            <div className="fh-anchor-divider"></div>

            <blockquote className="fh-verse reveal">
              <span className="fh-verse-ref">Isaiah 40:30 &ndash; 31</span>
              <p>
                &ldquo;Even youths grow tired and weary, and young men stumble and fall; but <em>those who hope in the Lord will renew their strength</em>. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.&rdquo;
              </p>
            </blockquote>

            <div className="fh-anchor-actions reveal">
              <Button variant="primary" size="lg" icon="facebook" onClick={() => window.open(FACEBOOK_URL, '_blank', 'noopener')}>Facebook Group</Button>
              <Button variant="outline-on-dark" size="lg" iconRight="arrow" onClick={() => window.location.href = CONTACT_EMAIL}>Ask about Fueled by Hope</Button>
            </div>
          </div>

          <div className="fh-anchor-media reveal-fade">
            <div className="fh-anchor-photo">
              <img src="assets/fbh-potluck-1.jpg" alt="The Fueled by Hope group gathered around a long table for a potluck by the creek, sharing a meal together on a sunny afternoon"/>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: A new ministry — single-column copy band ===== */}
      <section className="fh-secondhalf">
        <div className="container">
          <div className="fh-secondhalf-copy reveal-stagger">
            <span className="fh-eyebrow reveal">A New Ministry at Hope</span>
            <h2 className="reveal">Built around <em>this season</em> of life.</h2>
            <p className="reveal">
              Fueled by Hope is a <strong>new ministry for adults 50 and up</strong> at Hope Church. We try to meet monthly and do a wide variety of activities &mdash; outdoor outings, eating out, attending local venues together, and outreach opportunities along the way.
            </p>
            <p className="reveal">
              We&rsquo;d love to have you join us and get involved with this fun, dynamic group.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Section 3: Gallery — recent gatherings ===== */}
      <section className="fh-gallery">
        <div className="container">
          <header className="fh-gallery-head reveal-stagger">
            <span className="fh-eyebrow reveal">Life Together</span>
            <h2 className="reveal">Scenes from <em>recent gatherings</em>.</h2>
            <p className="reveal">A look at what we&rsquo;ve been up to &mdash; bingo nights, meals out, day trips around East Tennessee, picnics on the creek, and serving our neighbors together.</p>
          </header>

          <div className="fh-gallery-grid reveal-stagger">
            <figure className="fh-gphoto fh-gphoto-porch reveal-fade">
              <img src="assets/fueled-group-porch.jpg" alt="Large group of Fueled by Hope members posed together on a decorated front porch during a Christmas outing in Jonesborough"/>
              <figcaption>Christmas in Jonesborough</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-bingo reveal-fade">
              <img src="assets/fueled-bingo-friends.jpg" alt="Six smiling friends gathered around a table covered in green bingo cards at a community bingo night"/>
              <figcaption>Community bingo night</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-perkins reveal-fade">
              <img src="assets/fueled-perkins-table.jpg" alt="A long restaurant table filled with Fueled by Hope members sharing a meal together at Perkins"/>
              <figcaption>Lunch out together</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-jonesborough reveal-fade">
              <img src="assets/fueled-jonesborough.jpg" alt="Five Fueled by Hope friends posing together outside the Mary B. Martin Storytelling Hall in downtown Jonesborough"/>
              <figcaption>Storytelling Hall, Jonesborough</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-creek reveal-fade">
              <img src="assets/fueled-creek-friends.jpg" alt="Two women smiling arm in arm beside a creek in the woods on a sunny afternoon"/>
              <figcaption>An afternoon on the creek</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-outreach reveal-fade">
              <img src="assets/fueled-outreach-meals.jpg" alt="Four women holding wrapped meals and dishes, getting ready to deliver them to neighbors as part of a Fueled by Hope outreach"/>
              <figcaption>Meals for our neighbors</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-picnic reveal-fade">
              <img src="assets/fueled-picnic-couple.jpg" alt="A couple smiling at a creekside picnic, holding a covered container of potato salad to share with the group"/>
              <figcaption>Potluck by the creek</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-bays reveal-fade">
              <img src="assets/fbh-bays-mountain.jpg" alt="The Fueled by Hope group hiking together at Bays Mountain on a clear summer day"/>
              <figcaption>Hiking Bays Mountain</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-occ reveal-fade">
              <img src="assets/fbh-occ-nc.jpg" alt="Fueled by Hope volunteers serving at the Operation Christmas Child processing center in North Carolina"/>
              <figcaption>Operation Christmas Child &middot; NC</figcaption>
            </figure>
            <figure className="fh-gphoto fh-gphoto-potluck2 reveal-fade">
              <img src="assets/fbh-potluck-2.jpg" alt="Fueled by Hope members sharing a meal together at the potluck by the creek"/>
              <figcaption>Around the table</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Calendar (Subsplash) ===== */}
      <section className="fh-calendar">
        <div className="container">
          <header className="fh-calendar-head reveal-stagger">
            <span className="fh-eyebrow reveal">What&rsquo;s Coming Up</span>
            <h2 className="reveal">The Fueled by Hope <em>calendar</em>.</h2>
            <p className="reveal">Pulled live from our church calendar so the dates, times, and locations are always current. See something you like &mdash; just come.</p>
          </header>
          <div className="fh-calendar-frame reveal">
            <SubsplashFueledByHopeCalendar/>
          </div>
        </div>
      </section>

      {/* ===== Section 5: CTA band — Facebook group + contact ===== */}
      <section className="fh-cta-band">
        <div className="container reveal-stagger">
          <span className="fh-eyebrow reveal">Stay in the Loop</span>
          <h2 className="reveal">Join us on <em>Facebook</em>.</h2>
          <p className="reveal">Our Facebook group is the easiest way to keep up with what&rsquo;s going on &mdash; upcoming gatherings, photos from recent outings, and general updates from the group.</p>
          <div className="cta-band-actions reveal">
            <Button variant="primary" size="xl" icon="facebook" onClick={() => window.open(FACEBOOK_URL, '_blank', 'noopener')}>Fueled by Hope Facebook Group</Button>
            <Button variant="outline-on-dark" size="xl" iconRight="arrow" onClick={() => window.location.href = CONTACT_EMAIL}>Ask about Fueled by Hope</Button>
          </div>
          <div className="fh-cta-back reveal-soft">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { FueledByHopeMinistryPage };
