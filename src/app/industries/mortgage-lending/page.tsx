import type { Metadata } from "next";
import MortgageHero from "@/components/MortgageHero";
import MortgageLendingFAQ from "@/components/MortgageLendingFAQ";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BuildSection from "@/components/BuildSection";
import CalEmbed from "@/components/CalEmbed";
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

      {/* ========== PAGE HERO (animated workflow) ========== */}
      <MortgageHero />

      <main className="rb-content">
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
                      href="https://cal.eu/rosebudsolutions/demo"
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
              No lock-in. Cancel any time.
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
              <h2 className="rb-h2" data-rb-fade="1">
                In their words, <em>not ours.</em>
              </h2>
            </div>
            <div data-rb-fade="2">
              <Voices voices={MORTGAGE_VOICES} />
            </div>
          </div>
        </section>

        {/* ===== BUILD THE FUTURE WITH AI — shared homepage section, with
             the cal.eu booking embed surfaced above the calculator entry ===== */}
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
