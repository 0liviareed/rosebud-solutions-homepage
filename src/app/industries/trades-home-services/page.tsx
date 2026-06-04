import type { Metadata } from "next";
import SevenStepTimeline, { type TimelineStep } from "@/components/SevenStepTimeline";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import TradesHomeServicesFAQ from "@/components/TradesHomeServicesFAQ";
import BookDemoCTA from "@/components/BookDemoCTA";
import BookCTA from "@/components/BookCTA";
import RelatedIndustries from "@/components/RelatedIndustries";

const TRADES_STEPS: TimelineStep[] = [
  [
    "Inquiry comes in",
    "Phone during a job. Form at 9pm. DM on a Saturday. Always the wrong moment.",
  ],
  [
    "Qualify the job",
    "Domestic or commercial? Type of work? Budget? Access? Half the questions get missed.",
  ],
  [
    "Book the survey or quote visit",
    "Diary cross-checked manually. Right tech, right job — done by hand every time.",
  ],
  [
    "Send the quote",
    "Built Wednesday. Sent Thursday. No reply. Followed up Monday. Customer already booked someone else.",
  ],
  [
    "Chase the paperwork",
    "Deposit invoice goes out Monday. Customer pays Friday. Site nearly delayed. Every job.",
  ],
  [
    "Status updates to customer",
    "“When are you starting?” “What time?” “Has the part come in?” Three or four calls a day per active job.",
  ],
  [
    "Invoice, chase payment, follow up",
    "Half pay in 14 days. The rest need reminders. Three months later, that customer calls someone else for the next job.",
  ],
];

const TRADES_ROLES: SplitRole[] = [
  {
    num: "I",
    label: "Inquiry Capture Engine",
    body:
      "Every inquiry answered in under 60 seconds, across every channel. The 7am boiler emergency reaches you first.",
  },
  {
    num: "II",
    label: "Job Qualification & Triage",
    body:
      "Type of work, urgency, budget, access — captured before your office touches the file. Emergencies routed to dispatch. Time-wasters never reach you.",
  },
  {
    num: "III",
    label: "Survey & Quote Booking",
    body:
      "Slots offered against live diary. Right tech sent to the right job. Office stops being the bottleneck.",
  },
  {
    num: "IV",
    label: "Quote Follow-Up & Conversion",
    body:
      "Most trades send quotes and hope. We run the quote like a sales pipeline. The 48-hour follow-up. The “let me think about it” nurture. The price objection handled before it kills the job. Conversion on the quotes you already send — doubles or triples.",
  },
  {
    num: "V",
    label: "Paperwork & Documentation Chase",
    body:
      "Deposit invoices, signed quotes, site photos, insurance docs, building control sign-off — collected in conversation, not chased by email. Filed straight into your system.",
  },
  {
    num: "VI",
    label: "Status Updates to Customers",
    body:
      "“When are the lads arriving?” answered before it's asked. Daily or job-stage updates sent automatically. Office only involved when a human is genuinely needed.",
  },
  {
    num: "VII",
    label: "Invoicing, Payment Chase & Customer Follow-Up",
    body:
      "Invoices out automatically. Payment reminders on the cadence that gets you paid. Then — the part most trades skip — every customer followed up at 3, 6, 12 months. Repeat work and referrals stop being accidental.",
  },
];

const COMPARE_ROWS: Array<[string, string]> = [
  [
    "Calls go to voicemail",
    "Every inquiry answered in under 60 seconds",
  ],
  [
    "Office qualifying every job manually",
    "Pre-qualified before they reach your team",
  ],
  [
    "Quotes sent, half ignored",
    "Every quote followed up on a structured cadence",
  ],
  [
    "Customers chased by email for paperwork",
    "Documents collected in conversation, filed straight in",
  ],
  [
    "Office answering “when are the lads coming?” all day",
    "Status updates sent automatically",
  ],
  [
    "Invoices late, payment chase inconsistent",
    "Invoicing and payment chase automated",
  ],
  [
    "Past customers never followed up",
    "Every customer chased at 3, 6, 12 months",
  ],
];

export const metadata: Metadata = {
  title: "Trades & Home Services — AI Workflow for Trades Offices",
  description:
    "AI for trades and home services: every inquiry answered in under 60 seconds, jobs qualified, quotes chased, paperwork collected, past customers brought back. Built around ServiceTitan, Jobber, Housecall Pro, FieldEdge, simPRO, ServiceM8. Live in 5 weeks.",
  alternates: { canonical: "/industries/trades-home-services" },
  openGraph: {
    title: "Trades & Home Services — AI Workflow for Trades Offices | Rosebud Global",
    description:
      "A custom system that answers every customer inquiry, qualifies every job, chases every quote, collects every paperwork request, and follows up every past customer for repeat work. Built around your job management system. Live in 5 weeks.",
    url: "https://rosebud.global/industries/trades-home-services",
    type: "website",
  },
};

/* JSON-LD — Service, FAQPage, BreadcrumbList. Crawlers (Google, Bing,
   GPTBot, ClaudeBot, PerplexityBot) index the offering and FAQs without
   running JavaScript. */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Automation System for Trades & Home Services Offices",
  provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  description:
    "Custom system that captures every customer inquiry across phone, web, and social channels, qualifies each job, books surveys, chases quotes and paperwork, sends status updates, and follows up past customers for repeat work. Built around your job management system. Built and run by Rosebud for trades and home services businesses.",
  offers: {
    "@type": "Offer",
    priceCurrency: "GBP",
    description:
      "Pricing scoped to job volume and the size of your office team. Shared on demo call.",
  },
};

const TRADES_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast does the system respond to a new inquiry?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Under 60 seconds, every time. Most calls land while your team is on a job. We answer immediately, qualify, and either book, dispatch, or hand back with full context.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system qualify a job before it reaches my office?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Type of work, property type, urgency, budget, access — captured in conversation. Emergencies flagged. Time-wasters answered without reaching your team.",
      },
    },
    {
      "@type": "Question",
      name: "How are jobs routed to the right person or trade?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We read the conversation, identify fit, and route to the right estimator, dispatcher, or tech with full context.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system chase quotes?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every quote followed up on a structured cadence — 24 hours, 48 hours, 7 days. The \"let me think about it\" gets a nurture sequence. Price objections handled before they kill the job.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle paperwork chase?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Through guided conversation, not email. Each document requested at the right point, walked through with the customer, filed into your system.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle \"when are you arriving\" calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Daily or job-stage updates sent automatically. Office only involved when something genuinely needs a human.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle invoicing and payment chase?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Invoices out at completion. Reminders on the cadence that gets you paid. Aged debtor reports surfaced before they become a problem.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system bring back past customers?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every customer followed up at 3, 6, 12 months. Service reminders, annual inspections, next projects. Repeat work stops being accidental.",
      },
    },
    {
      "@type": "Question",
      name: "Which job management systems do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Workiz, Tradify, simPRO, ServiceM8 — and most platforms trades businesses actually run.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure the system launches safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Built around how your office runs — your trades, your job types, your tone. Five-week deployment. You test it, you sign it off. By go-live, you know exactly what it says.",
      },
    },
  ],
};

const TRADES_BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://rosebud.global/industries/trades-home-services" },
    { "@type": "ListItem", position: 3, name: "Trades & Home Services", item: "https://rosebud.global/industries/trades-home-services" },
  ],
};

export default function TradesHomeServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TRADES_FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TRADES_BREADCRUMBS) }}
      />

      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">VI</span>By Industry &middot; Trades &amp; Home Services
          </p>
          <h1 className="rb-page-hero-h1">
            Your office runs the business. <em>We run the office.</em>
          </h1>
          <p className="rb-page-hero-sub">
            Calls answered. Jobs qualified. Quotes chased. Paperwork collected.
            Past customers brought back. Built around your job management
            system. We run it. You own it.
          </p>

          <ul className="rb-hero-stats" aria-label="Key trades and home services metrics">
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">&lt; 60s</span>
              <span className="rb-hero-stat-label">
                Response to every customer inquiry
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">24/7</span>
              <span className="rb-hero-stat-label">
                Coverage across calls, texts, and forms
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">2–3 hrs / day</span>
              <span className="rb-hero-stat-label">
                Admin returned to each office staffer
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">5 weeks</span>
              <span className="rb-hero-stat-label">
                We build it. You quote, schedule, invoice.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — SOUND FAMILIAR? ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Where the office time goes">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Sound familiar?
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Where the office time <em>goes.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Your field team is productive. Your office is the bottleneck.
                Calls, quotes, paperwork, status updates — all landing on one
                or two people already running flat out. Slow quotes lose jobs.
                Missed calls lose customers. Late paperwork delays the next
                stage.
              </p>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={TRADES_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every customer, the same loop. Every job, the same chase.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              One missed inquiry a week at £2,500 average is £130,000 a year.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              One quote lost to a faster competitor is another £130,000.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              Past customers you never follow up — at £2,500 a job, every 100
              not chased is £50K–£75K of repeat revenue gone.
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              For most trades businesses, the combined leak runs into six
              figures every year. Recovered.
              <span className="rb-aftertext-footnote">*</span>
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              <span className="rb-aftertext-footnote">*</span> Illustrative;
              actual figures vary by trade and ticket size.
            </p>

            <div data-rb-fade="3">
              <BookCTA label="See what runs itself" />
            </div>
          </div>
        </section>

        {/* ===================== II — EVERY DEPLOYMENT INCLUDES ===================== */}
        <section
          className="rb-sec rb-sec-split"
          data-rb-sec
          aria-label="Every deployment includes"
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
                  Built around your office. One setup. One monthly figure. No
                  per-seat pricing. Live in 5 weeks.
                </p>
                <p className="rb-split-body rb-split-body-quiet" data-rb-fade="3">
                  Built around the work you do, the customers you serve, and
                  the systems you already run — ServiceTitan, Housecall Pro,
                  Jobber, FieldEdge, Service Fusion, Workiz, Tradify, simPRO,
                  ServiceM8.
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
                    <span className="rb-book-link-underline" aria-hidden="true" />
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
              ariaLabel="Seven roles in every trades and home services deployment"
              roles={TRADES_ROLES}
            />
          </div>

          <div className="rb-wrap">
            <p className="rb-aftertext" data-rb-fade="3">
              You own every system we build. No lock-in. Cancel any time.
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to job volume and
              office size.
            </p>
          </div>
        </section>

        {/* Voices slot intentionally omitted — release with this section once a
            trades or home-services testimonial closes. Trades buyers are
            heavily peer-validated and a generic operational quote softens
            the page rather than strengthening it. */}

        {/* ===================== III — THE DIFFERENCE ===================== */}
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
              <p className="rb-before-after-eyebrow">What lands in your system</p>
              <p className="rb-before-after-bridge">
                Of the seven steps between a customer calling and the final
                invoice paid, your office runs two. We run the{" "}
                <em>other five.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>Missed calls and voicemails</li>
                    <li>Quotes sitting in inboxes</li>
                    <li>Paperwork chased manually</li>
                    <li>Past customers gone cold</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Every call captured</li>
                    <li>Every quote followed up</li>
                    <li>Paperwork collected</li>
                    <li>Customers chased for repeat work</li>
                  </ul>
                </div>
              </div>
            </div>

            <div data-rb-fade="3">
              <BookCTA label="See how this runs for my office" />
            </div>
          </div>
        </section>

        {/* ===================== IV — THE HONEST FILTER ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Who this is for">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">IV</span>The honest filter
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Built for trades businesses <em>already busy.</em>
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
                  <li>You&apos;re handling 50+ inquiries a month</li>
                  <li>Your office is the bottleneck, not your field team</li>
                  <li>
                    You&apos;re on ServiceTitan, Jobber, Housecall Pro,
                    FieldEdge, simPRO, or similar
                  </li>
                  <li>
                    You&apos;ve got past customers you&apos;ve never followed
                    up
                  </li>
                  <li>
                    You want your office running quotes and scheduling — not
                    the same call on repeat
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
                  <span className="rb-label">This isn&apos;t for you if</span>
                </span>
                <ul className="rb-filter-list">
                  <li>
                    You&apos;re a sole trader or two-person op — the math
                    doesn&apos;t work yet
                  </li>
                  <li>
                    You&apos;re the owner doing your own quotes and surveys —
                    we extend your office, we don&apos;t replace your
                    estimator
                  </li>
                  <li>
                    Your inquiry volume is under 30/month — you don&apos;t
                    have a response problem, you have a lead-gen problem
                  </li>
                  <li>
                    You expect this to generate leads — we handle inbound, not
                    paid acquisition
                  </li>
                  <li>
                    You don&apos;t have job management software and won&apos;t
                    adopt any — we connect to your systems, we don&apos;t
                    replace them
                  </li>
                  <li>You want software to run yourself — this is a service</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== V — SEE IT IN ACTION ===================== */}
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
                Let&apos;s build <em>your system.</em>
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
              <TradesHomeServicesFAQ />
            </div>
          </div>
        </section>

        <RelatedIndustries
          items={[
            {
              href: "/industries/real-estate",
              title: "Real Estate",
              desc: "For the agents booking your team for pre-list repairs and post-close handovers.",
            },
            {
              href: "/industries/insurance",
              title: "Insurance",
              desc: "For the brokers routing claims your way — restoration, roofing, plumbing emergencies.",
            },
            {
              href: "/industries/mortgage-lending",
              title: "Mortgage & Lending",
              desc: "For the LOs needing appraisal-flagged repairs done before close.",
            },
          ]}
        />
      </main>
    </>
  );
}
