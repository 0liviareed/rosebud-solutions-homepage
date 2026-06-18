import type { Metadata } from "next";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import TradesHomeServicesFAQ from "@/components/TradesHomeServicesFAQ";
import RelatedIndustries from "@/components/RelatedIndustries";
import TradesHero from "@/components/TradesHero";
import BuildSection from "@/components/BuildSection";
import CalEmbed from "@/components/CalEmbed";

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
      <TradesHero />

      <main className="rb-content">
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

        {/* ===================== BUILD THE FUTURE WITH AI ===================== */}
        <BuildSection>
          <div id="rb-book" style={{ scrollMarginTop: "40px" }}>
            <CalEmbed />
          </div>
        </BuildSection>

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
