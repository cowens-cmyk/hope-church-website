import React from 'react';
import { PageHeader } from './pages.jsx';
// Hope Church — legal/info pages: Privacy + Accessibility

// ---------- Shared layout ----------
function LegalPage({ eyebrow, title, lead, updated, children }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />
      <section className="legal-page">
        <div className="container legal-inner">
          {updated && <p className="legal-updated">Last updated: {updated}</p>}
          <div className="legal-body">{children}</div>
        </div>
      </section>
    </>
  );
}

// ---------- Privacy ----------
function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="How Hope Church collects, uses, and protects the information you share with us."
      updated="August 31, 2026"
    >
      <h2>Our commitment</h2>
      <p>
        Hope Church values the trust you place in us when you share your contact information,
        prayer requests, giving, or family details. We collect only what we need to serve you
        well, and we never sell or rent your personal information to anyone.
      </p>

      <h2>What we collect</h2>
      <p>
        When you fill out a form on this site &mdash; a connect card, prayer request, event
        registration, or contact form &mdash; we may collect your name, email address, phone
        number, mailing address, and the details you choose to share with us.
      </p>
      <p>
        For online giving, payment information is processed by our secure third-party
        provider (Subsplash). Hope Church does not store your full card or bank account
        numbers on our servers.
      </p>
      <p>
        Like most websites, this site logs basic technical information &mdash; browser type,
        device, pages visited &mdash; to help us understand how the site is used and improve it
        over time.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your message, prayer request, or visit plan</li>
        <li>To process your gift and provide a year-end giving statement</li>
        <li>To send church updates, ministry information, and event details you&rsquo;ve asked for</li>
        <li>To improve our website, ministries, and Sunday experience</li>
      </ul>

      <h2>Children&rsquo;s information</h2>
      <p>
        Information collected for Hope Kids check-in or student ministry registration is used
        only for the safety and care of your child while they&rsquo;re with us. Access is limited
        to volunteers and staff serving that ministry.
      </p>

      <h2>Email and texts</h2>
      <p>
        You can unsubscribe from any email at any time using the link at the bottom of the
        message, or by replying STOP to a text. We&rsquo;ll still reach out personally about things
        you&rsquo;ve specifically asked us about &mdash; a prayer request, a visit, a baptism.
      </p>

      <h2>Cookies</h2>
      <p>
        This site uses small data files (cookies) to remember your preferences, such as light
        or dark mode and the last page you viewed. You can disable cookies in your browser
        settings; the site will still work, but a few preferences may not be remembered
        between visits.
      </p>

      <h2>Sharing with third parties</h2>
      <p>
        We share information only with the trusted tools that help us run the church &mdash; our
        church management system (Planning Center), giving processor (Subsplash), email
        platform, and similar services. Each is bound by their own privacy commitments.
      </p>

      <h2>Sermon video and YouTube</h2>
      <p>
        We publish our sermons to our own YouTube channel using a media system we run
        ourselves. That system uses YouTube API Services to upload our videos and to
        confirm which channel it is connected to. Our use of those features is also
        covered by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener">
        YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy"
        target="_blank" rel="noopener">Google Privacy Policy</a>.
      </p>
      <p>
        Our system stores an authorization token for our own channel, the channel&rsquo;s name,
        and the video ID of each sermon we upload. It does not read viewer data, watch
        history, comments, or analytics, and it has no access to any channel other than ours.
      </p>
      <p>
        Our staff can disconnect the channel at any time inside our media system, or revoke
        access directly at <a href="https://security.google.com/settings/security/permissions"
        target="_blank" rel="noopener">Google&rsquo;s permissions page</a>. Revoking access
        deletes the stored token and stops any future uploads; sermons already on YouTube stay
        there until we remove them.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us at any time to see, update, or delete the information we hold about
        you. Email <a href="mailto:info@hopejc.org">info@hopejc.org</a> and we&rsquo;ll take
        care of it within a reasonable time.
      </p>

      <h2>Questions</h2>
      <p>
        If you have any questions about this policy or how your information is handled,
        please reach out:
      </p>
      <p className="legal-contact">
        <strong>Hope Church</strong><br/>
        5034 Bobby Hicks Hwy<br/>
        Johnson City, TN 37615<br/>
        (423) 207-3341<br/>
        <a href="mailto:info@hopejc.org">info@hopejc.org</a>
      </p>
    </LegalPage>
  );
}

// ---------- Accessibility ----------
function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      lead="We want everyone to be able to engage with Hope Church &mdash; on our campus, online, and through this website."
      updated="May 1, 2026"
    >
      <h2>Our commitment</h2>
      <p>
        Hope Church is committed to making this website, our building, and our Sunday
        experience welcoming and usable for people of all abilities. We&rsquo;re working to meet
        the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener">
        WCAG 2.1 Level AA</a> standards for digital accessibility, and we keep improving as
        we learn.
      </p>

      <h2>On this website</h2>
      <ul>
        <li>Color combinations are chosen to meet AA contrast guidelines in both light and dark modes.</li>
        <li>Images include descriptive alternative text where they carry information.</li>
        <li>The site can be navigated using a keyboard alone &mdash; no mouse required.</li>
        <li>Headings, landmarks, and form labels are structured for screen readers.</li>
        <li>You can scale text up to 200% without breaking the layout.</li>
        <li>A dark mode is available for low-light reading and light sensitivity.</li>
      </ul>

      <h2>On Sunday mornings</h2>
      <ul>
        <li>Our building is fully wheelchair accessible, including the main entrance, worship center, restrooms, and kids&rsquo; check-in.</li>
        <li>Reserved parking is available close to the front doors.</li>
        <li>Large-print bulletins are available at the welcome desk on request.</li>
        <li>Closed captions and a sermon transcript are posted with each message on this site.</li>
        <li>A quiet room with audio of the service is available for nursing parents, sensory needs, or anyone who needs a break.</li>
      </ul>

      <h2>For Hope Kids &amp; Students</h2>
      <p>
        Our Kids and Student ministries welcome children of all abilities. If your child has
        sensory, mobility, or medical needs, please let us know before you visit so we can
        prepare a buddy, a quieter space, or whatever helps them feel at home.
      </p>

      <h2>Tell us how we can do better</h2>
      <p>
        Accessibility is never finished &mdash; it&rsquo;s an ongoing practice. If you run into
        something on this site that doesn&rsquo;t work for you, or if there&rsquo;s a barrier on
        campus we haven&rsquo;t thought of, please tell us. We take every report seriously and
        will respond within five business days.
      </p>
      <p className="legal-contact">
        <strong>Hope Church &mdash; Accessibility</strong><br/>
        <a href="mailto:info@hopejc.org">info@hopejc.org</a><br/>
        (423) 207-3341
      </p>
    </LegalPage>
  );
}

// ---------- Terms of Service ----------
function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lead="The basics of using this site and the sermon media we publish through it."
      updated="August 31, 2026"
    >
      <h2>About this site</h2>
      <p>
        This site is operated by Hope Church Johnson City, 5034 Bobby Hicks Hwy, Suite 10,
        Gray, TN 37615. It exists to share sermon audio, video, and written notes with our
        congregation and with anyone who wants to listen.
      </p>

      <h2>Our content</h2>
      <p>
        Sermon recordings, notes, artwork, and other media on this site remain the property
        of Hope Church. You are welcome to listen, watch, share links, and use our content
        for personal and non-commercial purposes. Please don&rsquo;t re-publish it, sell it,
        or present it as your own.
      </p>

      <h2>Embedded video</h2>
      <p>
        Some pages embed video hosted on YouTube. Using those players is also governed by the
        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener"> YouTube
        Terms of Service</a> and the <a href="https://policies.google.com/privacy"
        target="_blank" rel="noopener">Google Privacy Policy</a>.
      </p>

      <h2>Availability</h2>
      <p>
        We offer this site as-is. We work to keep it available and accurate, but we can&rsquo;t
        promise uninterrupted access, and we may add, change, or remove content at any time.
      </p>

      <h2>Your information</h2>
      <p>
        Anything you share with us through this site is handled according to our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, please ask &mdash; we&rsquo;d rather explain than have you
        guess.
      </p>
      <p className="legal-contact">
        <strong>Hope Church</strong><br/>
        5034 Bobby Hicks Hwy, Suite 10<br/>
        Gray, TN 37615<br/>
        (423) 207-3341<br/>
        <a href="mailto:info@hopejc.org">info@hopejc.org</a>
      </p>
    </LegalPage>
  );
}

export { PrivacyPage, AccessibilityPage, TermsPage };
