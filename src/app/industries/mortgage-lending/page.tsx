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
import RelatedIndustries from "@/components/RelatedIndustries";

// Single Sinclair quote, per the tightened brief — leads with the
// "made my job smaller instead of bigger" framing that matches the
// page's "the loans we already have actually fund" thesis.
const MORTGAGE_VOICES = [VOICES[5]];

export const metadata: Metadata = {
  title:
    "Mortgage & Lending — AI Workflow for Brokers, LOs & Mortgage Teams",
  description:
    "AI for mortgage brokers: every inquiry answered in <60s, borrowers pre-qualified, documentation collected, conditions chased, rate-lock clocks watched. Built around Encompass, Calyx, LendingPad, Surefire, BNTouch, Jungo. Live in 5 weeks.",
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
      "Inquiries qualified. Documentation collected. Conditions chased. Rate-lock clocks watched. Built around your LOS and CRM. We run it. You fund.",
    url: "https://rosebud.global/industries/mortgage-lending",
    type: "website",
  },
};

const MORTGAGE_STEPS: TimelineStep[] = [
  [
    "Inquiry comes in",
    "Zillow. LendingTree. Realtor referral. Website form. Always the moment your team is in an application.",
  ],
  [
    "Qualify the borrower",
    "Loan purpose, credit, income, employment, debts, timeline. The pre-screen that decides if they're worth pulling credit.",
  ],
  [
    "Send the application link",
    "1003 link. Account creation. Login support. 30% of borrowers drop off here — nobody walked them through.",
  ],
  [
    "Chase documentation",
    "W-2s. Pay stubs. Bank statements. Tax returns. First email Monday. Second Wednesday. Third Friday. Processor still waiting.",
  ],
  [
    "Status updates to borrower and Realtor",
    "Borrower at 8am: “Any update on the appraisal?” Buyer's agent at 9am: “Where are we on conditions?” Listing agent at 10am: “Still on for the 28th?” Referral partner at noon: “How's it looking?” Half your morning, gone.",
  ],
  [
    "Conditions and re-docs",
    "Underwriter flags two conditions at 4pm Friday. Monday: rate lock 11 days out. Wednesday: borrower replies, 7 days out. Friday: clears underwriting. Rate-lock extension costs your shop $400. Every loan. Every week.",
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
    body:
      "Every inquiry answered in under 60 seconds, across every channel — LendingTree, Zillow, Realtor referrals, website, SMS. The 9pm rate-shopper hits a qualified conversation, not a voicemail.",
  },
  {
    num: "II",
    label: "Borrower Pre-Qualification",
    body:
      "Loan purpose, credit, income, employment, debts, timeline — captured before an LO touches the file. Strong pre-quals routed to your top LO. Marginal credit routed to nurture.",
  },
  {
    num: "III",
    label: "Application & Document Collection",
    body:
      "1003 walkthroughs, portal logins, document collection — handled in conversation, not chased by email. Pay stubs, tax returns, bank statements, gift letters, source-of-funds. Self-employed borrowers through pre-approval in three days instead of three weeks. Stale docs flagged before they expire.",
  },
  {
    num: "IV",
    label: "LOS & CRM Auto-Population",
    body:
      "Borrower data, transcripts, qualification details, document uploads — written into Encompass, Calyx, LendingPad, Surefire, BNTouch, Jungo. Nothing typed. Your LO walks in with full context, not a half-filled-in 1003.",
  },
  {
    num: "V",
    label: "Status Updates to Borrower, Realtor & Referral Partners",
    body:
      "“Where are we on the appraisal?” answered before it's asked. Daily or weekly updates to the borrower, both agents, and the referral source. The morning that used to disappear to status calls — recovered.",
  },
  {
    num: "VI",
    label: "Conditions, Re-Docs & Rate-Lock Management",
    body:
      "Underwriter flags a condition at 4pm Friday. Manual process: LO sees it Monday, borrower replies Thursday, rate lock expires Wednesday. Rosebud: borrower pinged immediately, walked through it, re-doc collected, filed into your LOS, processor notified — same business day. Rate-lock clocks watched automatically. Loans stop dying at week five.",
  },
  {
    num: "VII",
    label: "Operational Audit & Roadmap",
    body:
      "Where your pipeline is leaking, and what to fix next. Reviewed quarterly with you, refined into the system.",
  },
];

const COMPARE_ROWS: Array<[string, string]> = [
  [
    "LendingTree leads sit unread for 2–3 hours",
    "Every inquiry answered in under 60 seconds",
  ],
  [
    "Qualifying every borrower manually",
    "Pre-qualified before they hit your LO",
  ],
  [
    "Emailing borrowers three times for W-2s",
    "Documentation collected in conversation, filed into your LOS",
  ],
  [
    "Answering “where's my loan at?” texts all day",
    "Status updates sent automatically to borrower, agents, partners",
  ],
  [
    "Loans stalling at conditions, re-docs uncaught",
    "Conditions and rate-locks tracked in conversation with the borrower",
  ],
  [
    "Referral partners going cold between deals",
    "Realtors and partners kept in the loop on every loan",
  ],
  [
    "Strategic guesswork on where the pipeline is leaking",
    "Every conversation logged, every drop-off point visible",
  ],
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
      name: "How fast does the system respond to a new inquiry?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Under 60 seconds, every time. Industry average is 2–3 hours. Rate-shoppers compare 3–5 lenders inside a 14-day credit pull window — the broker who responds first wins.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system pre-qualify borrowers?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Loan purpose, credit, income, employment, debts, timeline — captured in structured conversation. Strong files routed to your top LO. Marginal credit routed to nurture.",
      },
    },
    {
      "@type": "Question",
      name: "How are borrowers routed to the right loan officer?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We read the conversation, identify fit — loan type, size, complexity, language — and route to the right LO with full context.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system collect documentation?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Through guided conversation, not email. Each document requested at the right point, filed into your LOS as it comes in. Self-employed borrowers through pre-approval in three days instead of three weeks. Stale docs flagged before they expire.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle status updates?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Automatically. Daily or weekly updates to the borrower, both real estate agents, and the referral source. Appraisal, underwriting, conditions, clear-to-close — all answered before they're asked.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when conditions are flagged?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The system pings the borrower the moment the condition fires, walks them through it, collects the re-doc, files it back. Rate-lock clocks watched automatically — extensions flagged before they're urgent.",
      },
    },
    {
      "@type": "Question",
      name: "Which LOS and CRMs do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Encompass, Calyx Point, LendingPad, Surefire CRM, BNTouch, Jungo, Velocify, Total Expert — and most platforms US mortgage teams actually run.",
      },
    },
    {
      "@type": "Question",
      name: "Is this designed for mortgage compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Every workflow built around RESPA, TILA, ECOA, TCPA, and fair lending — consent capture, adverse action handling, state-by-state quiet hours, DNC filtering. Built in, not retrofitted.",
      },
    },
    {
      "@type": "Question",
      name: "What visibility do branch managers and ops leaders get?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every conversation logged, every application tracked, every condition visible. Managers see what's pre-approved, in processing, stuck at underwriting, and where rate locks are at risk.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure the system launches safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Built around how your shop runs — your loan products, investors, overlays. Five-week deployment. You test it, sign it off. By go-live, you know exactly what it says.",
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
            Inquiries qualified. Documentation collected. Conditions chased.
            Rate-lock clocks watched. Built around your LOS and CRM. We run
            it. You fund.
          </p>

          <ul
            className="rb-hero-stats"
            aria-label="Key mortgage and lending metrics"
          >
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">&lt; 60s</span>
              <span className="rb-hero-stat-label">
                Response to every borrower inquiry
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
                We build it. You fund.
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
                Loans die in two places: the gap between an inquiry and your
                response, and the gap between pre-approval and
                clear-to-close. We close both. Not by generating more leads —
                by making the ones you already have actually fund.
              </p>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={MORTGAGE_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every borrower, the same loop. Every loan, the same risk of
              falling through. And it all lands on an LO who should be writing
              new applications, not chasing W-2s.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              One missed pre-approval a week at $4,500 average commission is
              $234,000 a year.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              One loan a month falling through at conditions is another
              $54,000.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              Rate-lock extensions at $300–$500 each come out of your
              shop&rsquo;s profit. One a week is $20,000+ a year.
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              For most brokerages, the combined leak runs into six figures
              every year. Recovered.
              <span className="rb-aftertext-footnote">*</span>
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              <span className="rb-aftertext-footnote">*</span> Illustrative;
              actual figures vary by market, loan size, and compensation
              structure.
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if six of those seven steps ran <em>without you?</em>
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
                  Built around your team. One setup. One monthly figure. No
                  per-seat pricing. Live in 5 weeks.
                </p>
                <p
                  className="rb-split-body rb-split-body-quiet"
                  data-rb-fade="3"
                >
                  Built around the loans you write, the borrowers you serve,
                  and the systems you already run — Encompass, Calyx Point,
                  LendingPad, Surefire CRM, BNTouch, Jungo, Velocify, Total
                  Expert.
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
            <p className="rb-aftertext" data-rb-fade="3">
              You own every system we build. No lock-in. Cancel any time.
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to your monthly
              application volume and LO team size.
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
                  Manual
                </span>
                <span className="rb-compare-label rb-compare-label-rosebud">
                  Rosebud
                </span>
              </div>

              {COMPARE_ROWS.map(([manual, rosebud], i) => (
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
                By the time a loan reaches your LO, the borrower is qualified,
                the application started, the documentation in. Every file
                arrives processor-ready.
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
                    <li>Documentation chased manually</li>
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
                    You&rsquo;re handling 30+ inquiries a month across
                    purchase and refi
                  </li>
                  <li>
                    Your LOs are missing deals on after-hours LendingTree leads
                  </li>
                  <li>
                    You&rsquo;re on Encompass, Calyx, LendingPad, Surefire,
                    BNTouch, Jungo, or similar
                  </li>
                  <li>
                    You&rsquo;ve got referral partners who need status updates
                    to keep sending deals
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
                    Your shop is rate-driven refi only — our economics fit
                    purchase pipelines and stable refi shops
                  </li>
                  <li>
                    Your inquiry volume is under 20/month — you don&rsquo;t
                    have a response problem, you have a lead-gen problem
                  </li>
                  <li>
                    You expect this to generate leads — we handle inbound and
                    pipeline, not paid acquisition
                  </li>
                  <li>
                    You want a chatbot or a single AI tool, not a system
                  </li>
                  <li>You want software to run yourself — this is a service</li>
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
                A 30-minute call. We map your operation, scope the system, and
                quote the build. You leave with a clear number.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">Duration</span>
                <p>30 minutes. Zoom. No prep.</p>
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
                <span className="rb-num">VI</span>FAQs
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

        <RelatedIndustries
          items={[
            {
              href: "/industries/real-estate",
              title: "Real Estate",
              desc: "For the agents you take referrals from and refer buyers back to.",
            },
            {
              href: "/industries/trades-home-services",
              title: "Trades & Home Services",
              desc: "For the home services teams handling appraisal-flagged repairs and post-close fit-outs.",
            },
            {
              href: "/industries/insurance",
              title: "Insurance",
              desc: "For the brokers writing the binder before close and the renewal after.",
            },
          ]}
        />
      </main>
    </>
  );
}
