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
    "Phone call during a job. Website form. Facebook DM. Google Business message. Referral from a previous customer. Always at the worst time — mid-callout, end of day, weekends.",
  ],
  [
    "Qualify the job",
    "Domestic or commercial? Type of work? Property type? Budget range? Insurance claim or private pay? Timeline? Access? The questions you need to ask before you can quote it or send a tech.",
  ],
  [
    "Book the survey or quote visit",
    "Cross-checking the diary, matching the right tech or estimator, confirming with the customer, writing it into ServiceTitan, Jobber, FieldEdge, or whatever you're running.",
  ],
  [
    "Send the quote",
    "Office staff build the quote on Wednesday. Send it Thursday. No reply. Send a follow-up Monday. No reply. Send another the following Friday. Customer's already had three other trades round and booked one of them. Half a day of office time, no job, no feedback. Repeat next week.",
  ],
  [
    "Chase the paperwork",
    "Deposit invoice goes out Monday. Customer hasn't paid by Wednesday — site starts Friday. Office calls. Customer doesn't pick up. Office texts. Customer responds Thursday evening: “Can you send the bank details again?” Job nearly delayed. Multiply by every job in the pipeline.",
  ],
  [
    "Status updates to customer",
    "“When are you starting?” “What time will the lads be there?” “Has the part come in yet?” “How long until you're finished?” Three or four people per active job, asking the same questions across phone, text, and email.",
  ],
  [
    "Invoice, chase payment, follow up",
    "Final invoice sent at job completion. Half pay within 14 days. The other half need a reminder at 21 days, a phone call at 30, an awkward email at 45. Three months later, that customer's boiler dies and they call a different plumber — because nobody from your office checked in. Job lost. Referrals lost.",
  ],
];

const TRADES_ROLES: SplitRole[] = [
  {
    num: "I",
    label: "Inquiry Capture Engine",
    body:
      "Every customer inquiry across every channel — phone, website, Facebook, Google Business, WhatsApp, SMS, missed calls — answered the moment it lands. The boiler emergency that calls three plumbers at 7am gets a real conversation with you first. The homeowner asking about an extension at 9pm hits a qualified booking, not a voicemail. The commercial enquiry that lands while you're on site gets handled before you've finished the callout.",
  },
  {
    num: "II",
    label: "Job Qualification & Triage",
    body:
      "Type of work, property type, urgency, budget range, insurance claim vs private pay, timeline, access — captured through structured conversation before an office staffer touches the file. Emergency callouts get routed to dispatch the moment they're flagged. Quote-stage enquiries get triaged by job size and value. Time-wasters get answered without ever reaching your office team.",
  },
  {
    num: "III",
    label: "Survey & Quote Booking",
    body:
      "Slots offered against live diary availability, confirmed in real time, written into your job management system. The right estimator, surveyor, or tech sent to the right job. Your office stops being the bottleneck between an enquiry and a site visit.",
  },
  {
    num: "IV",
    label: "Quote Follow-Up & Conversion",
    body:
      "Most trades businesses send quotes and hope. Rosebud runs the quote like a sales pipeline. The customer who didn't reply within 48 hours gets a structured follow-up. The “let me think about it” gets a nurture sequence with project photos, testimonials, and a price-anchoring conversation. The price objection gets handled before it kills the job. Quotes stop sitting in inboxes. The conversion rate on quotes you already sent doubles or triples — without sending more.",
  },
  {
    num: "V",
    label: "Paperwork & Documentation Chase",
    body:
      "Deposit invoices, signed quotes, site photos, insurance claim docs, building control sign-off, material specifications — collected through guided conversation, not chased over email. The paperwork that holds up the next stage of every job gets handled the moment the job moves forward, not three days later.",
  },
  {
    num: "VI",
    label: "Status Updates to Customers",
    body:
      "“When are the lads arriving?” answered before it's asked. “Has the part come in?” answered before it's asked. “How long until you're done?” answered before it's asked. Daily or job-stage updates sent automatically to customers, with escalation to your office only when something genuinely needs a human. The questions that eat your office team's morning are handled before they hit the inbox.",
  },
  {
    num: "VII",
    label: "Invoicing, Payment Chase & Customer Follow-Up",
    body:
      "Final invoice goes out automatically. Payment reminders sent at the cadence that actually gets you paid. Then — the part most trades businesses skip — every completed customer gets a follow-up at 3 months, 6 months, 12 months to ask how the work is holding up. The boiler service. The annual inspection. The next project. Repeat work and referrals stop being accidental.",
  },
];

const COMPARE_ROWS: Array<[string, string]> = [
  [
    "Calls go to voicemail when the office is on another line or out at lunch",
    "Every call, message, and form answered in under 60 seconds, every time",
  ],
  [
    "Office staff qualifying every job manually before the diary even opens",
    "Pre-qualified before they hit your office — work type, urgency, budget, access all captured",
  ],
  [
    "Quotes sent, half ignored, no time to chase them properly",
    "Every quote followed up on a structured cadence, converted or cleanly closed",
  ],
  [
    "Calling and emailing customers three times for site photos and signed paperwork",
    "Documentation collected through guided conversation, filed straight into your system",
  ],
  [
    "Office staff answering “when are the lads coming?” calls all day",
    "Status updates sent automatically to every active customer",
  ],
  [
    "Invoices going out late, payment chases inconsistent",
    "Invoicing and payment follow-up automated to the cadence that gets you paid",
  ],
  [
    "Completed customers never followed up — repeat work and referrals lost",
    "Every customer followed up at 3, 6, 12 months — repeat work and referrals built in",
  ],
];

export const metadata: Metadata = {
  title: "Trades & Home Services — AI Workflow for Trades Offices",
  description:
    "AI for trades and home services: answers every inquiry in under 60 seconds, qualifies jobs, books surveys, chases quotes and paperwork, and brings past customers back. Built around your job management system. Live in 5 weeks.",
  alternates: { canonical: "/industries/trades-home-services" },
  openGraph: {
    title: "Trades & Home Services — AI Workflow for Trades Offices | Rosebud Global",
    description:
      "AI for trades and home services: a custom system that answers every customer inquiry, qualifies every job, chases every quote, collects every paperwork request, and follows up every past customer for repeat work. Built around ServiceTitan, Jobber, Housecall Pro, FieldEdge, simPRO and others. Live in 5 weeks.",
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
      name: "How fast does the system respond to a new customer inquiry?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Under 60 seconds, every time, regardless of channel or time of day. The reality of trades is that most calls land while your team is on a job — and the customer calling about an emergency boiler at 7am isn't going to wait. The system answers immediately, qualifies the job, and either books a slot, dispatches an emergency callout, or hands the conversation back to your office with full context.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system qualify a job before it reaches my office?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Through structured conversation across the signals that decide whether a job is worth a quote — type of work, property type, urgency, budget range, insurance claim vs private pay, timeline, access. Emergency callouts get flagged immediately. Quote-stage enquiries get prioritised by job size and likelihood of conversion. Time-wasters get answered without ever reaching your team.",
      },
    },
    {
      "@type": "Question",
      name: "How are jobs routed to the right person or trade?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The agent reads the conversation, identifies fit — domestic vs commercial, type of work, location, urgency, complexity — and routes to the right estimator, dispatcher, or tech with full context attached. Multi-trade businesses get jobs routed to the right division. Single-trade shops get jobs routed to the right person on the team.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system chase quotes that haven't been replied to?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every quote sent gets followed up on a structured cadence — 24 hours, 48 hours, 7 days — with the message tone matched to your business. The 'let me think about it' customer gets a nurture sequence with project photos, testimonials, and a price-anchoring conversation. Price objections get handled before they kill the job. Quotes stop sitting in inboxes unconverted.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle paperwork chase — deposits, photos, signed quotes?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Through guided conversation, not chased over email. The system requests each document at the right point in the job lifecycle, walks the customer through what's needed, collects it, and files it into your job management system. The paperwork that used to hold up the next stage of every job gets handled the moment the job moves forward.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle 'when are you arriving' calls and customer updates?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Daily or job-stage updates sent automatically to every active customer — covering arrival windows, parts orders, completion timelines, and next steps. The questions that used to eat your office team's morning are answered before they're asked. Customers only ring through to your office when something genuinely needs a human.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle invoicing and payment chase?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Final invoices go out automatically at job completion. Payment reminders sent at the cadence that actually gets you paid — without the awkwardness of you or your office team chasing customers for late payment manually. Aged debtor reports surfaced before they become a problem, not after.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system bring back past customers for repeat work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every completed customer gets followed up at 3 months, 6 months, and 12 months — service reminders for boilers, annual inspections, maintenance contracts, seasonal work, and the 'is everything still holding up?' check-in most trades businesses never get round to. Repeat work and referrals stop being accidental and start being a system.",
      },
    },
    {
      "@type": "Question",
      name: "Which job management systems do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Workiz, Tradify, simPRO, ServiceM8, and most of the platforms trades and home services teams actually run. Customer data, conversation transcripts, job details, paperwork, and invoicing all file directly into the system in the format it expects.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure the system launches safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every workflow is built around how your office actually runs — your trades, your job types, your pricing structure, your tone of voice. We build it across a five-week deployment, you test it, you sign it off. By the time the system goes live, you know exactly what it says to your customers, how it handles edge cases, and where it escalates to a human. You're not handing over your phone. You're extending your office.",
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
            The admin work your office team shouldn&apos;t be doing —
            answering every call, qualifying every job, chasing every quote,
            handling every paperwork request, and following up every past
            customer for repeat work. Built around your job management
            system. We run it. You own it.
          </p>

          <ul className="rb-hero-stats" aria-label="Key trades and home services metrics">
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">&lt; 60s</span>
              <span className="rb-hero-stat-label">
                Response time to every customer inquiry
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
                We build it. We run it. You quote, schedule, invoice.
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
                Most trades businesses lose money in the same place: the
                office. Your field teams are productive — the work happens.
                But the calls, the quotes, the chasing for site photos, the
                deposit invoices, the certificate paperwork, the follow-up
                texts — all of it lands on one or two office staff who are
                already running flat out. Slow quotes lose jobs. Missed
                calls lose customers. Late paperwork delays the next stage.
                The system below doesn&apos;t replace your office team. It
                hands them back the half of their day that should never
                have been theirs.
              </p>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={TRADES_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every customer, the same loop. Every job, the same paperwork
              chase. And it all lands on the office staff who should be
              running the business, not answering the same question for the
              fourth time today.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              One missed inquiry a week at an average job value of £2,500 is
              £130,000 walking past your door every year. One quote a week
              lost to a competitor that responded faster is another
              £130,000. And the average trades business converts 20–30% of
              past customers into repeat work when they actually get
              followed up — at £2,500 a job, every 100 customers you
              don&apos;t chase is £50,000–£75,000 of repeat revenue your
              competitors are earning instead.
              <span className="rb-aftertext-footnote">*</span>
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if six of those seven steps ran without them?
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              <span className="rb-aftertext-footnote">*</span> Illustrative —
              based on a £2,500 average job value across trades and home
              services; actual figures will vary by trade and ticket size.
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
                  A custom system we build around your office. One setup.
                  One monthly figure. No per-seat pricing. Deployed in 5
                  weeks.
                </p>
                <p className="rb-split-body rb-split-body-quiet" data-rb-fade="3">
                  Every deployment is built around the work you do, the
                  customers you serve, and the systems you already run —
                  ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service
                  Fusion, Workiz, Tradify, simPRO, ServiceM8, or your own
                  CRM. Seven roles run as one system, operated by us,
                  handed to you.
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
              You own every system we build. Full access, full credentials,
              full data. No lock-in. Cancel any time.
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to your job volume
              and the size of your office team.
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
                  Manual &middot; the reality now
                </span>
                <span className="rb-compare-label rb-compare-label-rosebud">
                  Rosebud runs it for you
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
              <p className="rb-before-after-intro">
                By the time a job reaches your office team, the customer is
                qualified, the visit is booked, the paperwork is in, and
                the next step is clear. Every job arrives ready to move.
              </p>
              <p className="rb-before-after-bridge">
                Of the seven steps between a customer calling and the final
                invoice paid, your office runs two. We run the{" "}
                <em>other five.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>Missed calls and voicemails only</li>
                    <li>Quotes sitting in inboxes</li>
                    <li>Paperwork chased manually for weeks</li>
                    <li>Past customers gone cold</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Full conversation logged</li>
                    <li>Quote followed up and converted</li>
                    <li>Paperwork collected</li>
                    <li>Customers followed up for repeat work</li>
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
                  <li>
                    You&apos;re handling 50+ inquiries a month across calls,
                    forms, and referrals
                  </li>
                  <li>Your office is the bottleneck — not your field team</li>
                  <li>
                    You&apos;re running ServiceTitan, Jobber, Housecall Pro,
                    FieldEdge, simPRO, or similar job management software
                  </li>
                  <li>
                    You&apos;ve got past customers you&apos;ve never followed up
                    for repeat work
                  </li>
                  <li>
                    You want your office team running quotes, scheduling, and
                    customers — not answering the same questions on repeat
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
                    You&apos;re a sole trader or two-person operation — the
                    math doesn&apos;t work yet
                  </li>
                  <li>
                    You&apos;re the owner-operator doing your own quotes and
                    surveys — Rosebud handles inbound and admin, but the quote
                    itself still needs your expertise. We extend your office
                    team. We don&apos;t replace your estimator.
                  </li>
                  <li>
                    Your inquiry volume is under 30/month — you don&apos;t have
                    a response-speed problem, you have a lead-gen problem
                  </li>
                  <li>
                    You expect this to generate leads — Rosebud handles inbound
                    and admin, it doesn&apos;t run paid acquisition or
                    door-knocking
                  </li>
                  <li>
                    You don&apos;t have job management software and don&apos;t
                    want to adopt any — this is a service that connects to your
                    systems, not a replacement for them
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
                A 30-minute call to understand how your office runs and
                where the time is leaking. You leave with a clear map of
                what to automate and how.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to the kind of jobs you&apos;re
                  handling every day. You&apos;ll see the conversation, the
                  qualification, the diary booking, and the paperwork
                  hand-off.
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
