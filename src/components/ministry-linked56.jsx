import React from 'react';
import { Button } from './shared.jsx';
import { SubsplashLinked56Calendar } from './embeds.jsx';
// Hope Church — Linked 56 ministry detail page (slug: ministry-linked56)
// 5th–6th grade tweens. Hope Tweens sub-brand. Identity in Christ (1 Peter 2:9).
// Design language: dark artistic hero · bright blue logo card · light minimal sections.

function Linked56MinistryPage({ onNav }) {
  const SERVE_URL = 'https://hopejc.churchcenter.com/people/forms/589479';
  const FB_URL = 'https://www.facebook.com/groups/6330937060346904/';

  return (
    <>
      {/* ===== Dark artistic hero ===== */}
      <section className="l56-hero">
        <div className="l56-hero-art" aria-hidden="true">
          <span className="l56-shard l56-shard-1"></span>
          <span className="l56-shard l56-shard-2"></span>
          <span className="l56-shard l56-shard-3"></span>
          <span className="l56-shard l56-shard-4"></span>
          <span className="l56-shard l56-shard-5"></span>
          <span className="l56-shard l56-shard-6"></span>
        </div>
        <div className="container l56-hero-inner">
          <h1 className="l56-hero-title">Linked 56</h1>
          <p className="l56-hero-eyebrow">5th – 6th Grade</p>
          <p className="l56-hero-lead">Linked 56 is an exclusive group of 5th and 6th graders that are part of a ministry specifically designed for them. Led by Stacie Taylor, our goal at Hope Church is to encourage them to deepen their relationships with Jesus at such a significant time in their lives. Our motto is <em>“Discovering True Identity In Christ.”</em> We want to build personal connections by showing them the love of Jesus while they learn what it means to love and serve others. With His guidance, we will help them understand who they are, where they belong and that they are not alone in this world.</p>
          <div className="l56-hero-actions">
            <button className="l56-hero-btn" onClick={() => window.open(SERVE_URL, '_blank', 'noopener')}>Serve</button>
            <button className="l56-hero-btn" onClick={() => window.open(FB_URL, '_blank', 'noopener')}>Linked Facebook Group</button>
          </div>
        </div>
      </section>

      {/* ===== Hope Tweens logo card + intro copy ===== */}
      <section className="l56-brand">
        <div className="container l56-brand-inner">
          <div className="l56-brand-card">
            <img src="assets/linked56-logo.png" alt="Linked &mdash; Hope Tweens · 1 Peter 2:9"/>
            <div className="l56-brand-card-mark">
              <span className="l56-brand-card-hope">HOPE</span>
              <span className="l56-brand-card-tweens">TWEENS</span>
            </div>
          </div>
          <p className="l56-brand-body">Nothing is more important to us than giving our Next Generation the opportunity to develop in their faith so that they can have a solid Biblical foundation to stand on. Ministry to Preteens curriculum is one of the learning tools we use to help them succeed. Investing in the lives of our tweens will strengthen and spiritually prepare them to transition into our Student Ministry and beyond. When it comes to our Next Generation, we want to journey alongside each parent/guardian to help equip them in shepherding their families.</p>
        </div>
      </section>

      {/* ===== Sunday Morning ===== */}
      <section className="l56-block">
        <div className="container l56-block-inner">
          <h2 className="l56-block-title">Sunday Morning</h2>
          <p className="l56-block-times">8:00am, 9:45am, and 11:30am</p>
          <p className="l56-block-body">During each Sunday morning service, Linked 56 will worship with their families in the main auditorium. Once worship has ended, they are dismissed and escorted to their class for large group time, age specific lessons, engaging Bible discussions and activities.</p>
          <p className="l56-block-body">Keeping our Next Generation safe is very important to us. Every volunteer receives a background check and is carefully considered for their roles in our ministry. We require each child to be checked-in and given a name tag with a code that is unique to your family. After each service, parents use their tags to ensure safe pick up of their children.</p>
        </div>
      </section>

      {/* ===== Wednesday Night ===== */}
      <section className="l56-block">
        <div className="container l56-block-inner">
          <h2 className="l56-block-title">Wednesday Night</h2>
          <p className="l56-block-times">6:30pm</p>
          <p className="l56-block-body">On Wednesday nights, we gather for a time of fellowship starting at 6:30pm-8:30pm. Linked 56 will meet for fun, games, and a Bible lesson review. Our Wednesday service is a great way for your kids to come together, refresh and reconnect with one another during the week.</p>
        </div>
      </section>

      {/* ===== Photo strip ===== */}
      <section className="l56-photo-section">
        <div className="container">
          <div className="l56-photo-frame">
            <img src="assets/linked56-classroom.png" alt="Linked 56 students gathered for a lesson"/>
          </div>
        </div>
      </section>

      {/* ===== Calendar ===== */}
      <section className="l56-block l56-calendar-section">
        <div className="container l56-block-inner">
          <h2 className="l56-block-title">What&rsquo;s Coming Up</h2>
          <p className="l56-block-times">The Linked 56 calendar</p>
          <p className="l56-block-body">Events, retreats, service days, and milestones &mdash; everything happening in Linked 56, pulled live so you never miss a thing.</p>
          <div className="l56-calendar-frame">
            <SubsplashLinked56Calendar/>
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="l56-cta">
        <div className="container l56-cta-inner">
          <h2 className="l56-cta-title">Walk with our tweens.</h2>
          <p className="l56-cta-body">Linked 56 needs Bible teachers, game leaders, and general helpers on Sunday mornings and Wednesday nights. Sign up to serve, or join the parent group to stay in the loop.</p>
          <div className="l56-cta-actions">
            <Button variant="primary" size="xl" iconRight="arrow" onClick={() => window.open(SERVE_URL, '_blank', 'noopener')}>Serve in Linked 56</Button>
            <Button variant="outline-on-dark" size="xl" icon="facebook" onClick={() => window.open(FB_URL, '_blank', 'noopener')}>Linked Facebook Group</Button>
          </div>
          <div className="l56-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { Linked56MinistryPage };
