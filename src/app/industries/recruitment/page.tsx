import type { Metadata } from "next";
import RecruitmentFAQ from "@/components/RecruitmentFAQ";
import SevenStepTimeline from "@/components/SevenStepTimeline";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BookDemoCTA from "@/components/BookDemoCTA";
import BookCTA from "@/components/BookCTA";

// Reorder so recruitment-adjacent quotes (pipeline scoring, chasing deals,
// fast build time) lead — the general operational ones follow.
const RECRUITMENT_VOICES = [2, 0, 5, 3, 6, 1, 4, 7].map((i) => VOICES[i]);

export const metadata: Metadata = {
  title: "Recruitment — Custom AI System",
  description:
    "A custom recruitment system we build and run for you. Deployed in 5 weeks. Not a tool — a service.",
  alternates: { canonical: "/industries/recruitment" },
  openGraph: {
    title: "Recruitment — Custom AI System | Rosebud Global",
    description:
      "A custom recruitment system we build and run for you. Deployed in 5 weeks. Not a tool — a service.",
    url: "https://rosebud.global/industries/recruitment",
    type: "website",
  },
};

/* JSON-LD schemas — Service (the recruitment automation), FAQPage
   (the 9 FAQ items), BreadcrumbList (Home → Industries → Recruitment).
   Rendered inside the page body via a <script type="application/ld+json">
   tag so crawlers (Google, Bing, GPTBot, ClaudeBot, PerplexityBot) can
   index the offering and the FAQs without running JavaScript. */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Recruitment Automation System",
  provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  description:
    "Custom recruitment system that sources, screens, and qualifies candidates automatically. Built and run by Rosebud for recruitment agencies and in-house talent teams.",
  offers: {
    "@type": "Offer",
    priceCurrency: "GBP",
    description:
      "Pricing scoped to volume and seniority of roles hired for. Shared on demo call.",
  },
};

const RECRUITMENT_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can you respond to a new candidate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average recruiter takes 2–3 hours to follow up on a new enquiry. By then, two other agencies already have. Rosebud agents respond instantly — capturing availability, salary expectations, and experience level the moment a candidate makes contact. Your consultants step in only when there's someone worth speaking to.",
      },
    },
    {
      "@type": "Question",
      name: "How does pre-screening work before our team touches the file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A consultant handling 30 live roles shouldn't spend half their day on first-stage screening. Rosebud connects to your ATS and job boards, assesses suitability against live roles, and flags who is ready to move — so by the time a consultant picks up the phone, the work is already done.",
      },
    },
    {
      "@type": "Question",
      name: "How are candidates routed to the right consultant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every misrouted candidate is a delayed placement. Your agent gathers role type, salary band, location, and notice period, then routes each candidate to the right consultant with full context attached. No confusion. No delays. Just qualified candidates ready to progress before the competition even responds.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can we move from brief to active search?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every new role brief involves the same back-and-forth — job title, responsibilities, salary range, timeline, hiring manager preferences. Your agent handles the entire intake automatically and has the brief structured before a consultant picks up the phone. What used to take two days of emails takes under an hour.",
      },
    },
    {
      "@type": "Question",
      name: "What stops warm clients going cold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most agencies lose business not because they did a bad job — but because they went quiet. Automated follow-ups keep every client and prospect engaged after every touchpoint, progressing stalled briefs and putting your agency front of mind the moment a new hiring need surfaces. You stop reacting. You start leading.",
      },
    },
    {
      "@type": "Question",
      name: "How do we see where every placement stands?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No more end-of-week pipeline reviews that reveal a candidate dropped off three days ago. Every interaction is logged, every stage is tracked, and managers get live visibility into where briefs are stalling and where consultants need support — before a placement is lost, not after.",
      },
    },
    {
      "@type": "Question",
      name: "Is this built for regulated recruitment environments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GDPR compliance isn't optional — and neither is getting it wrong. Every candidate interaction, data capture, and communication is structured to meet employment agency compliance requirements from the first touchpoint, across your operation and every client account you manage.",
      },
    },
    {
      "@type": "Question",
      name: "What visibility do managers get across pipelines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When a placement slips, you need to know why — not two weeks later. Every interaction is logged with clear records of candidate conversations, qualification data, and progression. Managers get real-time transparency into pipeline activity, consultant performance, and exactly where drop-off is happening.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure the system works from day one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No guesswork, no surprises. Every workflow is tested and validated before launch — your agent follows approved messaging, routes candidates and clients correctly, and operates to the standard your agency is known for from day one.",
      },
    },
  ],
};

const RECRUITMENT_BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://rosebud.global/industries/recruitment" },
    { "@type": "ListItem", position: 3, name: "Recruitment", item: "https://rosebud.global/industries/recruitment" },
  ],
};

export default function RecruitmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(RECRUITMENT_FAQ_SCHEMA),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(RECRUITMENT_BREADCRUMBS),
        }}
      />
      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">I</span>By Industry &middot; Recruitment
          </p>
          <h1 className="rb-page-hero-h1">
            Your recruitment, <em>rebuilt.</em>
          </h1>
          <p className="rb-page-hero-sub">
            Not a tool. A custom recruitment system we build and run for you.
          </p>
          <p className="rb-page-hero-caption">
            We build it in 5 weeks. We run it. You interview.
          </p>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — SEVEN-STEP LOOP ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="The seven-step loop">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Sound familiar?
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Here&apos;s how recruitment runs on your desk <em>right now.</em>
              </h2>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every pound fixing a bad hire is a pound not going into
              campaigns, clients, or growth. And it all lands on one person.
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if six of those seven steps ran without them?
            </p>

            <div data-rb-fade="3">
              <BookCTA label="See what runs itself" />
            </div>
          </div>
        </section>

        {/* ===================== II — WHAT'S INCLUDED ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="What's included">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II</span>Every deployment includes
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                One system. <em>All seven roles.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                A custom system we build around your desks. One setup. One
                monthly figure. No per-seat pricing. Deployed in 5 weeks.
              </p>
            </div>

            <p className="rb-included-intro" data-rb-fade="3">
              Every deployment is built around your desks, your briefs, and
              your ICP. Seven roles run as one system — operated by us, handed
              to you.
            </p>

            <div data-rb-fade="3">
              {[
                [
                  "Candidate Sourcing Engine",
                  "Targeted search across LinkedIn and sector networks, filtered against your ICP.",
                ],
                [
                  "CV Screening & Shortlisting",
                  "Agentic AI reading every profile against your criteria.",
                ],
                [
                  "Automated Outreach Sequences",
                  "Multi-touch personalised sequences, sent without manual input.",
                ],
                [
                  "CRM Auto-Population",
                  "Everything written directly into your CRM, nothing typed.",
                ],
                [
                  "Pipeline Management",
                  "Warm candidates tracked, re-engaged, ready when the next role opens.",
                ],
                [
                  "Behaviour-Triggered Follow-Up",
                  "Re-engagement handled automatically.",
                ],
                [
                  "Operational Audit & Roadmap",
                  "Where your operation is losing time, and what to fix next.",
                ],
              ].map(([title, body], i) => (
                <div key={i} className="rb-entry rb-entry-numbered" tabIndex={0}>
                  <span className="rb-num-big">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="rb-body-stack">
                    <span className="rb-label">{title}</span>
                    <p className="rb-body-copy">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              You own every system we build. Full access. Full credentials.
              Full data. No lock-in. Cancel any time.
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to the volume and
              seniority of the roles you hire for.
            </p>
          </div>
        </section>

        {/* ===================== VOICES — between II & III ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Voices">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II&middot;V</span>Voices
              </p>
            </div>
            <div data-rb-fade="1">
              <Voices voices={RECRUITMENT_VOICES} />
            </div>
          </div>
        </section>

        {/* ===================== III — WHAT CHANGES DAY ONE ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="What changes on day one"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">III</span>The difference
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                What changes on <em>day one.</em>
              </h2>
            </div>

            <div className="rb-compare" data-rb-fade="2">
              <div className="rb-compare-head">
                <span className="rb-compare-label rb-compare-label-manual">
                  Manual &middot; the reality now
                </span>
                <span className="rb-compare-label rb-compare-label-rosebud">
                  Rosebud runs it for you
                </span>
              </div>

              {[
                [
                  "Manual LinkedIn and network search",
                  "Candidates sourced automatically against your criteria",
                ],
                [
                  "Manual review and filtering of every application",
                  "Screened before your team sees a single name",
                ],
                [
                  "Manually written and sent follow-up emails",
                  "Personalised outreach sent and sequenced automatically",
                ],
                [
                  "Manual data entry after every candidate interaction",
                  "Every profile filed directly into your CRM — nothing typed",
                ],
                [
                  "Manually tracking where every candidate sits",
                  "Full pipeline visibility in real time",
                ],
                [
                  "Chasing no-shows and dormant candidates by hand",
                  "Re-engagement handled automatically",
                ],
                [
                  "Strategic guesswork on where the operation is losing time",
                  "You already know — and it's already fixed",
                ],
              ].map(([manual, rosebud], i) => (
                <div key={i} className="rb-compare-row">
                  <span className="rb-compare-cell rb-compare-cell-manual">
                    <span className="rb-compare-mark rb-compare-mark-x" aria-hidden="true">
                      <svg viewBox="0 0 12 12" width="10" height="10">
                        <path d="M2.5 2.5 L9.5 9.5 M9.5 2.5 L2.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>{manual}</span>
                  </span>
                  <span className="rb-compare-cell rb-compare-cell-rosebud">
                    <span className="rb-compare-mark rb-compare-mark-check" aria-hidden="true">
                      <svg viewBox="0 0 12 12" width="11" height="11">
                        <path d="M2.25 6.25 L5 9 L9.75 3.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </span>
                    <span>{rosebud}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="rb-before-after" data-rb-fade="3">
              <p className="rb-before-after-eyebrow">What lands in your CRM</p>
              <p className="rb-before-after-intro">
                By the time a candidate moves forward, they&apos;ve been
                cross-referenced and validated across multiple sources. Every
                profile arrives interview-ready.
              </p>
              <p className="rb-before-after-bridge">
                Of the eight steps between brief and interview, your recruiter
                runs two. We run the <em>other six.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>LinkedIn only</li>
                    <li>Unverified</li>
                    <li>Unknown availability</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Validated across sources</li>
                    <li>Availability confirmed</li>
                    <li>Rate captured</li>
                    <li>Ready to move</li>
                  </ul>
                </div>
              </div>
            </div>

            <div data-rb-fade="3">
              <BookCTA label="See how this runs for my desks" />
            </div>
          </div>
        </section>

        {/* ===================== IV — WHO THIS IS FOR ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Who this is for">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">IV</span>The honest filter
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                This works if you&apos;re <em>already hiring.</em>
              </h2>
            </div>

            <div className="rb-filter-cols" data-rb-fade="2">
              <div className="rb-filter-col rb-filter-col-yes">
                <span className="rb-filter-head">
                  <span className="rb-filter-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path d="M3 8.5 L6.5 12 L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </span>
                  <span className="rb-label">This works for you if</span>
                </span>
                <ul className="rb-filter-list">
                  <li>You&apos;re running multiple live briefs at once</li>
                  <li>Your biggest bottleneck is CV volume, not client volume</li>
                  <li>You&apos;re already using a CRM or open to one</li>
                  <li>You can commit to an ICP definition session in week one</li>
                  <li>You want candidates sourced, not applicants filtered</li>
                </ul>
              </div>
              <div className="rb-filter-col rb-filter-col-no">
                <span className="rb-filter-head">
                  <span className="rb-filter-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="rb-label">This isn&apos;t for you if</span>
                </span>
                <ul className="rb-filter-list">
                  <li>You hire purely through word-of-mouth and relationships</li>
                  <li>
                    You&apos;re looking for a chatbot or a single AI tool, not a
                    system
                  </li>
                  <li>
                    You want software to run yourself — this is a service, not
                    a product
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== V — BOOK A DEMO ===================== */}
        <section
          id="rb-book"
          className="rb-sec"
          data-rb-sec
          aria-label="Request a demo"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">V</span>See it in action
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                See how this runs for <em>your desks.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                A 30-minute walkthrough of the system mapped to the roles you
                actually hire for. You&apos;ll see the sourcing, the screening
                logic, and how candidates land in your calendar.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to one of your open briefs. You&apos;ll
                  see the candidate profiles, the screening decisions, and the
                  pipeline view.
                </p>
              </div>
              <div className="rb-demo-card">
                <span className="rb-label">Duration</span>
                <p>30 minutes. Zoom. No prep needed.</p>
              </div>
            </div>

            <p className="rb-demo-reassure" data-rb-fade="3">
              We build it. We run it. You own it. No lock-in. Cancel any time.
            </p>

            <div data-rb-fade="3">
              <BookDemoCTA href="https://cal.eu/rosebudsolutions/30min" />
            </div>
          </div>
        </section>

        {/* ===================== VI — FAQ ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Frequently asked questions">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">VI</span>Frequently asked
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                The questions we get on <em>every demo call.</em>
              </h2>
            </div>

            <div data-rb-fade="2">
              <RecruitmentFAQ />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
