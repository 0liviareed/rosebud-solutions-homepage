import type { Metadata } from "next";
import MortgageLendingFAQ from "@/components/MortgageLendingFAQ";
import SevenStepTimeline, {
  type TimelineStep,
} from "@/components/SevenStepTimeline";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BookDemoCTA from "@/components/BookDemoCTA";
import BookCTA from "@/components/BookCTA";

// Voices re-ordered to lead with ops/pipeline-visibility/quietly-running
// quotes — same logic as real-estate. The mortgage audience cares about
// pipeline integrity and time saved, not raw growth pitches.
const MORTGAGE_VOICES = [5, 2, 3, 0, 7, 1, 4, 6].map((i) => VOICES[i]);

// SEO — target "AI for mortgage brokers", "AI mortgage workflow",
// "loan officer AI", "Encompass AI", "LendingPad AI" etc.
export const metadata: Metadata = {
  title:
    "Mortgage & Lending — AI Workflow for Brokers, LOs & Mortgage Teams",
  description:
    "AI for mortgage brokers: answers every LendingTree, Zillow & referral inquiry in <60s, pre-qualifies borrowers, chases conditions & re-docs, files into Encompass / Calyx / LendingPad.",
  keywords: [
    "ai for mortgage",
    "ai for mortgage brokers",
    "ai mortgage workflow",
    "loan officer ai",
    "ai mortgage operations",
    "encompass ai",
    "calyx point ai",
    "lendingpad ai",
    "surefire crm ai",
    "ai loan documentation",
    "mortgage ai automation",
    "ai rate lock management",
  ],
  alternates: { canonical: "/industries/mortgage-lending" },
  openGraph: {
    title:
      "Mortgage & Lending — AI Workflow for Brokers, LOs & Teams | Rosebud Global",
    description:
      "Agentic mortgage orchestration — from first inquiry to funded loan. Autonomously qualify borrowers, collect documentation, manage conditions and rate-lock timelines, and keep applications moving from pre-approval to clear-to-close.",
    url: "https://rosebud.global/industries/mortgage-lending",
    type: "website",
  },
};

const MORTGAGE_STEPS: TimelineStep[] = [
  [
    "Inquiry comes in",
    "Zillow Premier Agent referral. LendingTree match. Realtor partner referral. Website form. Cold text from a Facebook ad. Always the moment your team is in an application or out at a meeting.",
  ],
  [
    "Qualify the borrower",
    "Loan purpose? Property type? Estimated credit score? Income? Employment status? Existing debts? Timeline? The pre-screen that decides whether they're a one-week pre-approval or a three-month nurture.",
  ],
  [
    "Send the application link",
    "1003 portal link. Account creation. Login support. The first place 30% of borrowers drop off because nobody walked them through it.",
  ],
  [
    "Chase documentation",
    "W-2s. Pay stubs. Two months of bank statements. Tax returns. ID. Employment verification. The first email. The second. The third. The “still waiting on” Slack message to the processor.",
  ],
  [
    "Status updates to borrower and Realtor",
    "The borrower texts at 8am: “Any update on the appraisal?” The buyer's agent emails at 9am: “Where are we on conditions?” The listing agent calls at 10am: “Are we still on for the 28th?” The referral partner pings at noon: “How's it looking?” Three or four people, every loan, every day, asking the same questions across email, text, and phone. Half your morning, gone.",
  ],
  [
    "Conditions and re-docs",
    "Underwriter flags two conditions at 4pm Friday. Borrower needs the bank statement re-pulled with a different date range, plus a letter of explanation on a large deposit. By the time you see it Monday, the rate lock is 11 days out. By the time the borrower responds Wednesday, you're at 7 days. By the time it clears underwriting Friday, you're chasing a rate-lock extension that costs your shop $400. Every loan. Every week.",
  ],
  [
    "Funded — and the next one starts",
    "Loan funds. Commission hits. Pipeline empties. Lead volume restarts. The loop resets.",
  ],
];

const MORTGAGE_ROLES: SplitRole[] = [
  {
    num: "I",
    label: "Inquiry Capture Engine",
    body: "Every borrower inquiry across every channel — LendingTree, Zillow, Realtor partner referrals, website forms, your IDX, Facebook, Instagram, SMS, missed calls — answered the moment it lands. The borrower who filled out three lender forms before bed gets their first call back from you. The rate-shopper texting at 9pm hits a qualified conversation, not a voicemail.",
  },
  {
    num: "II",
    label: "Borrower Pre-Qualification",
    body: "Loan purpose, property type, estimated credit, income, employment, existing debts, timeline — captured through structured conversation before a loan officer touches the file. Hot leads with strong pre-quals get routed to your top LO. Marginal credit profiles get routed to a credit-improvement nurture. Nobody on your team spends an hour on a borrower who's six months from a real application.",
  },
  {
    num: "III",
    label: "Application & Document Collection",
    body: "1003 walkthroughs, application portal logins, and document collection — handled in conversation, not chased over email. Pay stubs, W-2s, bank statements, tax returns, business returns for self-employed borrowers, gift letters, source-of-funds documentation — collected at the right point in the loan lifecycle, flagged before they go stale, filed straight into your LOS. The self-employed borrower who'd normally take three weeks of back-and-forth gets through pre-approval in three days.",
  },
  {
    num: "IV",
    label: "LOS & CRM Auto-Population",
    body: "Borrower details, conversation transcripts, qualification data, document uploads — written into Encompass, Calyx, LendingPad, Surefire, BNTouch, Jungo, or whatever you're running. Nothing typed. Your LO walks into every borrower call with full context, not a half-filled-in 1003.",
  },
  {
    num: "V",
    label: "Status Updates to Borrower, Realtor & Referral Partners",
    body: "“Where are we on the appraisal?” answered before it's asked. Daily or weekly status updates sent automatically to the borrower, the buyer's agent, the listing agent, and the referral source. The questions that used to eat an hour of your day every morning are already handled.",
  },
  {
    num: "VI",
    label: "Conditions, Re-Docs & Rate-Lock Management",
    body: "The underwriter flags a condition at 4pm Friday. Under the manual process, the LO sees it Monday, emails the borrower Tuesday, gets the re-doc Thursday, files it back Friday — and the rate lock expires the following Wednesday. Rosebud pings the borrower the moment the condition fires, walks them through what's needed, collects the re-doc, files it back into your LOS, and notifies the processor it's clear — usually inside the same business day. Rate-lock clocks get watched automatically. Extension requests get flagged before they're urgent. Loans stop dying at week five because the operational gap that used to swallow them is closed.",
  },
  {
    num: "VII",
    label: "Operational Audit & Roadmap",
    body: "Where your pipeline is leaking, and what to fix next. Reviewed quarterly with you, refined into the system.",
  },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Mortgage & Lending Operations System",
  provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  description:
    "AI workflow for mortgage brokers, loan officers, and lending teams. Answers LendingTree, Zillow, and referral inquiries in under 60 seconds, pre-qualifies borrowers, walks them through 1003 applications, chases conditions and re-docs, manages rate-lock timelines, and files everything into Encompass / Calyx / LendingPad / Surefire / BNTouch / Jungo. Built and run by Rosebud.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description:
      "Pricing scoped to monthly application volume and loan officer team size. Shared on demo call.",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast does the AI respond to a new mortgage borrower inquiry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under 60 seconds, every time. The industry average is 2–3 hours — rate-shoppers are comparing 3–5 lenders inside a 14-day credit pull window. The system closes that gap before competitors know there's a gap to close.",
      },
    },
    {
      "@type": "Question",
      name: "How does the AI pre-qualify mortgage borrowers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through structured conversation across loan purpose, property type, estimated credit, income, employment, existing debts, and timeline. Strong files route to your top LO with full context; marginal credit profiles route to a credit-improvement nurture.",
      },
    },
    {
      "@type": "Question",
      name: "How are mortgage borrowers routed to the right loan officer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The agent reads the conversation, identifies fit — loan type, loan size, complexity, location, language preference — and routes to the right LO on your team with full context attached.",
      },
    },
    {
      "@type": "Question",
      name: "How does the AI collect mortgage documentation from borrowers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through guided conversation, not chased over email. The system walks borrowers through the application portal, requests each document at the right point in the loan lifecycle (W-2s, pay stubs, bank statements, tax returns, business returns for self-employed borrowers, gift letters, source-of-funds documentation), and files everything straight into your LOS.",
      },
    },
    {
      "@type": "Question",
      name: "How does the AI handle status updates to borrowers, Realtors, and referral partners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Automatically. Daily or weekly updates sent to the borrower, both real estate agents, and the referral source — covering appraisal status, underwriting progress, conditions outstanding, and clear-to-close timeline.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when underwriter conditions or re-docs are needed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The system pings the borrower the moment the condition fires, walks them through what's needed, collects the re-doc, and files it back into the LOS. Rate-lock clocks are watched automatically and extensions flagged before they're needed.",
      },
    },
    {
      "@type": "Question",
      name: "Which mortgage LOS and CRMs do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Encompass, Calyx Point, LendingPad, Surefire CRM, BNTouch, Jungo, Velocify, Total Expert, and most of the platforms US mortgage teams actually run.",
      },
    },
    {
      "@type": "Question",
      name: "Is this designed for mortgage compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every workflow is built around RESPA, TILA, ECOA, TCPA, and fair lending requirements — including consent capture, adverse action handling, state-by-state quiet hours, and DNC filtering.",
      },
    },
  ],
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://rosebud.global/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Industries",
      item: "https://rosebud.global/industries/mortgage-lending",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Mortgage & Lending",
      item: "https://rosebud.global/industries/mortgage-lending",
    },
  ],
};

export default function MortgageLendingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS) }}
      />

      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">V</span>By Industry &middot; Mortgage &amp;
            Lending
          </p>
          <h1 className="rb-page-hero-h1">
            Half your applications die at conditions.{" "}
            <em>That&rsquo;s the half we run.</em>
          </h1>
          <p className="rb-page-hero-sub">
            Agentic mortgage orchestration — from first inquiry to funded
            loan. Autonomously qualify borrowers, collect documentation
            through guided conversation, manage conditions and rate-lock
            timelines, and keep applications moving from pre-approval to
            clear-to-close. Coordinated across your LOS, CRM, and every
            channel your borrowers use.
          </p>

          <ul
            className="rb-hero-stats"
            aria-label="Key mortgage and lending metrics"
          >
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">&lt; 60s</span>
              <span className="rb-hero-stat-label">
                Response time to every borrower inquiry
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">First</span>
              <span className="rb-hero-stat-label">
                Most rate-shoppers convert with whoever answers first
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">24/7</span>
              <span className="rb-hero-stat-label">
                Coverage across calls, texts, and forms
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">5 weeks</span>
              <span className="rb-hero-stat-label">
                We build it. We run it. You fund.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — WHERE THE LOANS STALL ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="Where the loans stall"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Sound familiar?
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Where the loans <em>stall.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Most mortgage brokers lose loans at two points: the gap
                between a borrower inquiring and getting back to them, and
                the gap between pre-approval and clear-to-close where
                documentation goes missing and conditions sit unanswered.
                The system below isn&rsquo;t about generating more leads.
                It&rsquo;s about closing both gaps — so the borrowers who
                reach out actually fund, and the loans in your pipeline
                don&rsquo;t fall through at week five.
              </p>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={MORTGAGE_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every borrower, the same loop. Every loan in process, the same
              risk of falling through. And it all lands on a loan officer
              who should be writing new applications, not chasing W-2s.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              One missed pre-approval inquiry a week at an average broker
              commission of $4,500 per funded loan is $234,000 walking past
              your desk every year. One loan a month falling through at the
              conditions stage at the same rate is $54,000 in pipeline that
              already had your time invested in it. Plus rate-lock
              extensions running $300–$500 each — every extension is your
              shop&rsquo;s profit on the loan, not the borrower&rsquo;s
              cost. One a week is $20,000+ a year, paid for slow
              operations.<sup>*</sup>
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if six of those seven steps ran <em>without you?</em>
            </p>
            <p
              className="rb-aftertext rb-aftertext-quiet"
              data-rb-fade="3"
              style={{ fontSize: 11.5, marginTop: 8 }}
            >
              <sup>*</sup> Illustrative — based on average US broker
              commission of $4,500 per funded loan; actual figures will
              vary by market, loan size, and compensation structure.
            </p>

            <div data-rb-fade="3">
              <BookCTA label="See what runs itself" />
            </div>
          </div>
        </section>

        {/* ===================== II — STICKY SPLIT: SEVEN ROLES ===================== */}
        <section
          className="rb-sec rb-sec-split"
          data-rb-sec
          aria-label="What's included"
        >
          <div className="rb-wrap rb-split">
            <div className="rb-split-left">
              <div className="rb-split-left-inner">
                <p className="rb-eyebrow" data-rb-fade="0">
                  <span className="rb-num">II</span>Every deployment includes
                </p>
                <h2 className="rb-h2" data-rb-fade="1">
                  One system. <em>All seven roles.</em>
                </h2>
                <p className="rb-split-body" data-rb-fade="2">
                  A custom system we build around your team. One setup. One
                  monthly figure. No per-seat pricing. Deployed in 5 weeks.
                </p>
                <p
                  className="rb-split-body rb-split-body-quiet"
                  data-rb-fade="3"
                >
                  Every deployment is built around the loans you write, the
                  borrowers you serve, and the systems you already run —
                  Encompass, Calyx Point, LendingPad, Surefire CRM, BNTouch,
                  Jungo, Velocify, Total Expert. Seven roles run as one
                  system, operated by us, handed to you.
                </p>

                <div className="rb-split-ctas" data-rb-fade="3">
                  <a href="/pricing" className="rb-book-link">
                    <span className="rb-book-link-label">Get started</span>
                    <span className="rb-book-link-arrow" aria-hidden="true">
                      <svg viewBox="0 0 36 12" width="36" height="12">
                        <path
                          className="rb-book-link-shaft"
                          d="M0 6 L28 6"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          className="rb-book-link-head"
                          d="M22 1.5 L28 6 L22 10.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    <span
                      className="rb-book-link-underline"
                      aria-hidden="true"
                    />
                  </a>
                  <span className="rb-split-cta-glow-wrap">
                    <span
                      className="rb-split-cta-glow rb-split-cta-glow-pedestal"
                      aria-hidden="true"
                    />
                    <span
                      className="rb-split-cta-glow rb-split-cta-glow-halo"
                      aria-hidden="true"
                    />
                    <a
                      href="https://www.cal.eu/rosebudsolutions/30min?overlayCalendar=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rb-book-cta rb-book-cta-inline"
                    >
                      <span className="rb-book-cta-label">Schedule demo</span>
                      <span className="rb-book-cta-arrow" aria-hidden="true">
                        <svg viewBox="0 0 42 12" width="42" height="12">
                          <path
                            className="rb-book-cta-shaft"
                            d="M0 6 L32 6"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            className="rb-book-cta-head"
                            d="M26 1.5 L32 6 L26 10.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                      <span
                        className="rb-book-cta-underline"
                        aria-hidden="true"
                      />
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <SplitRoles
              ariaLabel="Seven roles in every mortgage and lending deployment"
              roles={MORTGAGE_ROLES}
            />
          </div>

          <div className="rb-wrap">
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to your monthly
              application volume and loan officer team size.
            </p>
          </div>
        </section>

        {/* ===================== VOICES ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Voices">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II&middot;V</span>Voices
              </p>
            </div>
            <div data-rb-fade="1">
              <Voices voices={MORTGAGE_VOICES} />
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
                  "LendingTree and Zillow leads sit unread for 2–3 hours while your LO is in application",
                  "Every inquiry answered in under 60 seconds, across every channel",
                ],
                [
                  "Qualifying every borrower manually before knowing if they're worth a pre-approval pull",
                  "Pre-qualified before they hit your LO — loan purpose, credit, income, timeline all captured",
                ],
                [
                  "Emailing borrowers three times for W-2s, pay stubs, and bank statements",
                  "Documentation collected through guided conversation, filed straight into your LOS",
                ],
                [
                  "Manually answering “where's my loan at?” texts from borrowers and Realtors all day",
                  "Status updates sent automatically to borrower, agents, and referral partners",
                ],
                [
                  "Loans stalling at conditions because nobody chased the re-doc fast enough",
                  "Conditions, re-docs, and rate-lock timelines tracked in-conversation with the borrower",
                ],
                [
                  "Referral partner relationships dying from silence between deals",
                  "Realtors and referral sources kept in the loop on every loan they sent you",
                ],
                [
                  "Strategic guesswork on where the pipeline is leaking",
                  "Every conversation logged, every drop-off point visible",
                ],
              ].map(([manual, rosebud], i) => (
                <div key={i} className="rb-compare-row">
                  <span className="rb-compare-cell rb-compare-cell-manual">
                    <span
                      className="rb-compare-mark rb-compare-mark-x"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 12 12" width="10" height="10">
                        <path
                          d="M2.5 2.5 L9.5 9.5 M9.5 2.5 L2.5 9.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span>{manual}</span>
                  </span>
                  <span className="rb-compare-cell rb-compare-cell-rosebud">
                    <span
                      className="rb-compare-mark rb-compare-mark-check"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 12 12" width="11" height="11">
                        <path
                          d="M2.25 6.25 L5 9 L9.75 3.25"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    <span>{rosebud}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="rb-before-after" data-rb-fade="3">
              <p className="rb-before-after-eyebrow">
                What lands in your LOS
              </p>
              <p className="rb-before-after-intro">
                By the time a loan reaches your LO, the borrower is
                qualified, the application is started, and the documentation
                is in. Every file arrives processor-ready.
              </p>
              <p className="rb-before-after-bridge">
                Of the seven steps between inquiry and a funded loan, your
                team runs two. We run the <em>other five.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>Inquiries sitting in LendingTree inbox</li>
                    <li>Half-captured pre-qual</li>
                    <li>Documentation chased manually for weeks</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Full conversation logged</li>
                    <li>Pre-qualification complete</li>
                    <li>Documentation filed</li>
                    <li>Ready for the underwriter</li>
                  </ul>
                </div>
              </div>
            </div>

            <div data-rb-fade="3">
              <BookCTA label="See how this runs for my pipeline" />
            </div>
          </div>
        </section>

        {/* ===================== IV — HONEST FILTER ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Who this is for">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">IV</span>The honest filter
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Built for brokers <em>already writing loans.</em>
              </h2>
            </div>

            <div className="rb-filter-cols" data-rb-fade="2">
              <div className="rb-filter-col rb-filter-col-yes">
                <span className="rb-filter-head">
                  <span className="rb-filter-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path
                        d="M3 8.5 L6.5 12 L13 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  <span className="rb-label">This works for you if</span>
                </span>
                <ul className="rb-filter-list">
                  <li>
                    You&rsquo;re handling 30+ borrower inquiries a month
                    across purchase and refi
                  </li>
                  <li>
                    Your LOs are missing deals because nobody&rsquo;s
                    responding to LendingTree leads after hours
                  </li>
                  <li>
                    You&rsquo;re running Encompass, Calyx, LendingPad,
                    Surefire, BNTouch, Jungo, or similar
                  </li>
                  <li>
                    You&rsquo;ve got Realtor and referral partners who need
                    consistent status updates to keep sending deals
                  </li>
                  <li>
                    You want your LOs writing applications and structuring
                    loans, not chasing W-2s
                  </li>
                </ul>
              </div>
              <div className="rb-filter-col rb-filter-col-no">
                <span className="rb-filter-head">
                  <span className="rb-filter-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path
                        d="M4 4 L12 12 M12 4 L4 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="rb-label">This isn&rsquo;t for you if</span>
                </span>
                <ul className="rb-filter-list">
                  <li>
                    You&rsquo;re a solo originator doing under 15 loans a
                    year — the math doesn&rsquo;t work yet
                  </li>
                  <li>
                    Your shop is purely refi-focused and rate-sensitive —
                    Rosebud&rsquo;s economics fit purchase pipelines and
                    stable refi shops, not high-velocity rate-driven refi
                    waves
                  </li>
                  <li>
                    Your inquiry volume is under 20/month — you don&rsquo;t
                    have a response-speed problem, you have a lead-gen
                    problem
                  </li>
                  <li>
                    You expect this to generate leads — Rosebud handles
                    inbound and pipeline, it doesn&rsquo;t run paid
                    acquisition
                  </li>
                  <li>
                    You want a chatbot or a single AI tool, not a system
                  </li>
                  <li>
                    You want software to run yourself — this is a service,
                    not a product
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
                Let&rsquo;s build <em>your system.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                A 30-minute call to understand how your team runs and where
                the loans are stalling. You leave with a clear map of what
                to automate and how.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to the kind of borrowers and loans
                  you&rsquo;re handling every day. You&rsquo;ll see the
                  conversation, the qualification, the LOS hand-off, and
                  the conditions tracking.
                </p>
              </div>
              <div className="rb-demo-card">
                <span className="rb-label">Duration</span>
                <p>30 minutes. Zoom. No prep needed.</p>
              </div>
            </div>

            <p className="rb-demo-reassure" data-rb-fade="3">
              We build it. We run it. You own it. No lock-in. Cancel any
              time.
            </p>

            <div data-rb-fade="3">
              <BookDemoCTA href="https://cal.eu/rosebudsolutions/30min" />
            </div>
          </div>
        </section>

        {/* ===================== VI — FAQ ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="Frequently asked questions"
        >
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
              <MortgageLendingFAQ />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
