import React from 'react';
import { Icon, Button } from './shared.jsx';
import { PageHeader } from './pages.jsx';
import { SubsplashLinked56Calendar } from './embeds.jsx';
// Hope Church — Linked 56 ministry detail page (slug: ministry-linked56)
// 5th–6th grade tweens. Brand: teal/cyan fingerprint mark · 1 Peter 2:9.
// Motto: "Discovering True Identity In Christ."

function Linked56MinistryPage({ onNav }) {
  const SERVE_URL = 'https://hopejc.churchcenter.com/people/forms/589479';
  const FB_URL = 'https://www.facebook.com/groups/6330937060346904/';

  const pillars = [
    {
      n: 'Identity',
      t: 'Who they are.',
      body: 'A chosen people. A royal priesthood. We anchor everything we do in the truth of 1 Peter 2:9 \u2014 helping each tween see themselves the way God sees them.',
    },
    {
      n: 'Belonging',
      t: 'Where they belong.',
      body: 'They\u2019re not little kids anymore, and they\u2019re not quite students yet. Linked 56 is a space made just for them \u2014 with real friendships and leaders who know their names.',
    },
    {
      n: 'Together',
      t: 'Not alone in this world.',
      body: 'Middle school is hard. We walk alongside each tween (and their parents) so they know exactly who is in their corner \u2014 and who they belong to in Christ.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="5th – 6th Grade"
        title="Linked 56"
        lead="An exclusive group of 5th and 6th graders, part of a ministry designed just for them. Led by Stacie Taylor, our heart is to encourage tweens to deepen their walk with Jesus at a pivotal moment in their lives."
      />

      {/* ===== Section 1: Identity intro + 1 Peter 2:9 verse ===== */}
      <section className="l56-intro">
        <div className="container l56-intro-inner">
          <div className="l56-intro-copy reveal-stagger">
            <span className="eyebrow reveal">Our Heart</span>
            <h2 className="reveal">Discovering true <em>identity in Christ</em>.</h2>
            <p className="lead reveal">Linked 56 is built around one simple motto. Every lesson, game, and conversation circles back to it &mdash; helping each 5th and 6th grader know who they are, where they belong, and that they are never alone.</p>
            <p className="reveal">We want to build personal connections by showing them the love of Jesus while they learn what it means to love and serve others. With His guidance, we help them understand who they are, where they belong, and that they are not alone in this world.</p>
          </div>
          <div className="l56-intro-photo reveal-fade">
            <div className="l56-photo-frame">
              <img src="assets/linked56-lesson.jpg" alt="Linked 56 tweens gathered with their Bibles during a Wednesday night lesson"/>
            </div>
            <div className="l56-verse-card">
              <span className="ref">1 Peter 2:9</span>
              <p className="verse">&ldquo;A chosen people, a royal priesthood, a holy nation, God&rsquo;s special possession.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Three identity pillars ===== */}
      <section className="l56-pillars">
        <div className="container">
          <header className="l56-pillars-head reveal-stagger">
            <span className="eyebrow reveal">What We Stand On</span>
            <h2 className="reveal">Three truths we want every tween to carry <em>with them</em>.</h2>
          </header>
          <div className="l56-pillars-grid reveal-stagger">
            {pillars.map((p, i) => (
              <article className="l56-pillar reveal" key={p.n}>
                <div className="l56-pillar-num">{String(i + 1).padStart(2, '0')} &middot; {p.n}</div>
                <h3>{p.t}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3: Foundation (dark) — fingerprint logo + curriculum ===== */}
      <section className="l56-foundation">
        <div className="container l56-foundation-inner">
          <div className="l56-foundation-logo reveal-fade">
            <img src="assets/linked56-logo.png" alt="Linked &mdash; Hope Youth, 1 Peter 2:9"/>
          </div>
          <div className="l56-foundation-copy reveal-stagger">
            <span className="eyebrow reveal">Building a Strong Foundation</span>
            <h2 className="reveal">Preparing tweens to step into student ministry &mdash; and beyond.</h2>
            <p className="reveal">Nothing is more important to us than giving our next generation the opportunity to develop in their faith so they can stand on a solid Biblical foundation. The <strong>Ministry to Preteens curriculum</strong> is one of the learning tools we use to help them succeed.</p>
            <p className="reveal">Investing in the lives of our tweens will strengthen and spiritually prepare them to transition into our Student Ministry &mdash; and into adulthood with confidence in their faith.</p>
            <p className="l56-foundation-coda reveal">When it comes to our next generation, we journey alongside each parent and guardian to help equip them in shepherding their families.</p>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Weekly rhythm — Sunday + Wednesday ===== */}
      <section className="l56-rhythm">
        <div className="container">
          <header className="l56-rhythm-head reveal-stagger">
            <span className="eyebrow reveal">When We Meet</span>
            <h2 className="reveal">Two times a week to gather, grow, and have fun.</h2>
          </header>
          <div className="l56-rhythm-grid reveal-stagger">
            <article className="l56-rhythm-card reveal">
              <span className="l56-rhythm-day">Sunday Morning</span>
              <h3>Worship & Word.</h3>
              <div className="l56-rhythm-times">
                <span>8:00am</span>
                <span className="l56-dot">&middot;</span>
                <span>9:45am</span>
                <span className="l56-dot">&middot;</span>
                <span>11:30am</span>
              </div>
              <p>Linked 56 worships with their families in the main auditorium first. Once worship has ended, they are dismissed and escorted to class for large group time.</p>
              <p>Age-specific lessons, engaging Bible discussions, and activities follow &mdash; built for exactly where 5th and 6th graders are.</p>
            </article>

            <article className="l56-rhythm-card reveal">
              <span className="l56-rhythm-day">Wednesday Night</span>
              <h3>Refresh & Reconnect.</h3>
              <div className="l56-rhythm-times">
                <span>6:30pm</span>
                <span className="l56-dot">&ndash;</span>
                <span>8:30pm</span>
              </div>
              <p>We gather for a time of fellowship from 6:30pm to 8:30pm. Linked 56 meets for fun, games, and a Bible lesson review from the week before.</p>
              <p>It&rsquo;s a great way for tweens to come together, refresh, and reconnect with one another mid-week.</p>
            </article>
          </div>

          <div className="l56-safety-note">
            <Icon name="check" size={18}/>
            <p><strong>Safety always.</strong> Every Linked 56 volunteer receives a background check and is carefully considered for their role. Each tween is checked in and given a name tag with a code unique to your family &mdash; parents use the matching tag for safe pickup after each service.</p>
          </div>
        </div>
      </section>

      {/* ===== Section 5: Linked 56 Calendar (Subsplash) ===== */}
      <section className="l56-calendar">
        <div className="container">
          <header className="l56-calendar-head reveal-stagger">
            <span className="eyebrow reveal">What’s Coming Up</span>
            <h2 className="reveal">The Linked 56 calendar.</h2>
            <p className="reveal">Events, retreats, service days, and milestones &mdash; everything happening in Linked 56, pulled live so you never miss a thing.</p>
          </header>
          <div className="l56-calendar-frame reveal">
            <SubsplashLinked56Calendar/>
          </div>
        </div>
      </section>

      {/* ===== Section 6: CTA band — Serve + Facebook ===== */}
      <section className="l56-cta-band">
        <div className="container reveal-stagger">
          <span className="eyebrow reveal">Get Involved</span>
          <h2 className="reveal">Walk with our tweens.</h2>
          <p className="reveal">Linked 56 needs Bible teachers, game leaders, and general helpers on Sunday mornings and Wednesday nights. Sign up to serve, or join the parent group to stay in the loop.</p>
          <div className="cta-band-actions reveal">
            <Button variant="primary" size="xl" iconRight="arrow" onClick={() => window.open(SERVE_URL, '_blank', 'noopener')}>Serve in Linked 56</Button>
            <Button variant="outline-on-dark" size="xl" icon="facebook" onClick={() => window.open(FB_URL, '_blank', 'noopener')}>Linked Facebook Group</Button>
          </div>
          <div className="l56-cta-back reveal-soft">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { Linked56MinistryPage };
