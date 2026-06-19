import type { Metadata } from "next";
import InsuranceHero from "@/components/InsuranceHero";
import InsuranceFAQ from "@/components/InsuranceFAQ";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BuildSection from "@/components/BuildSection";
import CalEmbed from "@/components/CalEmbed";
import RelatedIndustries from "@/components/RelatedIndustries";

const INSURANCE_ROLES: SplitRole[] = [
  { num: "I",   label: "Enquiry Intake",            body: "Every new enquiry answered the moment it lands, with the qualifying questions asked before a licensed advisor picks it up." },
  { num: "II",  label: "Fact-Find Automation",      body: "Risk details, claims history, and documentation requests captured through structured conversation, not email back-and-forth." },
  { num: "III", label: "Market Submission Support", body: "Client data prepared in the format each carrier's portal expects, so no-one's retyping the same information five times." },
  { num: "IV",  label: "Quote Comparison Assembly", body: "Carrier responses pulled together into client-ready comparisons automatically." },
  { num: "V",   label: "CRM Auto-Population",       body: "Every conversation, every document, every decision filed directly into your CRM." },
  { num: "VI",  label: "Renewal & MTA Management",  body: "Renewal cycles diarised, mid-term adjustments handled without dropping in your advisors' laps." },
  { num: "VII", label: "Operational Audit & Roadmap", body: "Where your operation is losing time, and what to fix next." },
];

export const metadata: Metadata = {
  title: "Insurance — AI Workflow for Brokers & Agencies",
  description:
    "AI for insurance brokers: qualifies enquiries, automates fact-finds, preps carrier submissions, assembles quote comparisons, runs renewals.",
  alternates: { canonical: "/industries/insurance" },
  openGraph: {
    title: "Insurance — AI Workflow for Brokers & Agencies | Rosebud Global",
    description:
      "AI for insurance brokers: a custom workflow that qualifies enquiries, automates fact-finds, prepares carrier-ready submissions, assembles quote comparisons, and runs renewals. Built and run by Rosebud. Live in 5 weeks.",
    url: "https://rosebud.global/industries/insurance",
    type: "website",
  },
};

/* JSON-LD — Service + FAQPage + BreadcrumbList, same pattern as the
   recruitment page. Lets crawlers index the offering and FAQs
   without executing JavaScript. */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Insurance Operations System",
  provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  description:
    "Custom insurance operations system that handles enquiry intake, fact-finding, market submission prep, and renewals. Built and run by Rosebud for brokers, agencies, and carriers.",
  offers: {
    "@type": "Offer",
    priceCurrency: "GBP",
    description:
      "Pricing scoped to volume of enquiries and complexity of lines. Shared on demo call.",
  },
};

const INSURANCE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you handle policy inquiries and coverage questions instantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Conversational agents manage high-volume client questions — from coverage details and policy options to pricing ranges and documentation requirements. Prospects receive immediate answers while the system captures key qualification signals such as coverage needs, location, and timeline, reducing friction at the top of the funnel.",
      },
    },
    {
      "@type": "Question",
      name: "How is lead intake and pre-qualification automated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Connect your agent to your CRM and quoting tools to collect prospect details, assess eligibility, and guide them through the early stages of the buying process. The system can identify whether someone is shopping, comparing policies, or ready to speak with an agent, ensuring licensed staff spend time on the most qualified opportunities.",
      },
    },
    {
      "@type": "Question",
      name: "How are prospects routed to the right advisor at the right moment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agents gather relevant information such as coverage type, budget range, household details, and renewal timelines, then route qualified leads to the appropriate agent or team. This prevents wasted conversations and dramatically improves close rates by ensuring prospects reach specialists prepared with context.",
      },
    },
    {
      "@type": "Question",
      name: "How do you support quote preparation and application workflows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI agents collect required details for quotes, confirm information accuracy, and prepare structured data for underwriting or quoting systems. This reduces repetitive data entry and shortens the time between initial interest and receiving a policy proposal.",
      },
    },
    {
      "@type": "Question",
      name: "How are follow-ups managed and undecided prospects nurtured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Automated follow-ups keep prospects engaged after their first inquiry — answering additional questions, reminding them to complete applications, and surfacing new policy options when relevant. Agencies maintain momentum without requiring agents to manually chase every lead.",
      },
    },
    {
      "@type": "Question",
      name: "How do agents assist with policy updates and service requests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "From coverage adjustments and renewal reminders to document requests and policy explanations, AI agents handle routine servicing tasks so teams can focus on advisory work and closing business.",
      },
    },
    {
      "@type": "Question",
      name: "Is this designed for regulated insurance environments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Systems are structured to support U.S. insurance regulatory requirements, ensuring conversations and data collection follow appropriate compliance standards while respecting licensing boundaries.",
      },
    },
    {
      "@type": "Question",
      name: "What visibility do agencies get across interactions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every interaction is logged with clear records of inquiries, qualification data, and next steps. Managers gain transparency into pipeline activity, lead quality, and operational performance.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure workflows launch safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Workflows are tested and validated before launch to ensure the agent follows approved scripts, routes prospects correctly, and supports compliance requirements across client interactions.",
      },
    },
  ],
};

const INSURANCE_BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://rosebud.global/industries/insurance" },
    { "@type": "ListItem", position: 3, name: "Insurance", item: "https://rosebud.global/industries/insurance" },
  ],
};

// Reorder so insurance-adjacent quotes (chasing/warm clients, personalised
// follow-ups, five-week build) lead; operational ones follow.
const INSURANCE_VOICES = [0, 3, 5, 2, 6, 1, 4, 7].map((i) => VOICES[i]);

export default function InsurancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(INSURANCE_FAQ_SCHEMA),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(INSURANCE_BREADCRUMBS),
        }}
      />
      {/* ========== PAGE HERO (animated workflow) ========== */}
      <InsuranceHero />

      <main className="rb-content">
        {/* ===================== II — WHAT'S INCLUDED ===================== */}
        <section className="rb-sec rb-sec-split" data-rb-sec aria-label="What's included">
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
                  Built around your lines, your carriers, your book. One
                  setup. One monthly figure. No per-seat pricing. Live in 5
                  weeks.
                </p>
                <p className="rb-split-body rb-split-body-quiet" data-rb-fade="3">
                  Every deployment is built around the lines you write, the
                  carriers you place with, and the clients you serve. Seven
                  roles run as one system — operated by us, handed to you.
                </p>

                <div className="rb-split-ctas" data-rb-fade="3">
                  <a href="/pricing" className="rb-book-link">
                    <span className="rb-book-link-label">Get started</span>
                    <span className="rb-book-link-arrow" aria-hidden="true">
                      <svg viewBox="0 0 36 12" width="36" height="12">
                        <path className="rb-book-link-shaft" d="M0 6 L28 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                        <path className="rb-book-link-head" d="M22 1.5 L28 6 L22 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </span>
                    <span className="rb-book-link-underline" aria-hidden="true" />
                  </a>
                  <span className="rb-split-cta-glow-wrap">
                    <span className="rb-split-cta-glow rb-split-cta-glow-pedestal" aria-hidden="true" />
                    <span className="rb-split-cta-glow rb-split-cta-glow-halo" aria-hidden="true" />
                    <a
                      href="https://www.cal.eu/rosebudsolutions/30min?overlayCalendar=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rb-book-cta rb-book-cta-inline"
                    >
                      <span className="rb-book-cta-label">Schedule demo</span>
                      <span className="rb-book-cta-arrow" aria-hidden="true">
                        <svg viewBox="0 0 42 12" width="42" height="12">
                          <path className="rb-book-cta-shaft" d="M0 6 L32 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                          <path className="rb-book-cta-head" d="M26 1.5 L32 6 L26 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      </span>
                      <span className="rb-book-cta-underline" aria-hidden="true" />
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <SplitRoles
              ariaLabel="Seven roles in every insurance deployment"
              roles={INSURANCE_ROLES}
            />
          </div>

          <div className="rb-wrap">
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to the volume of
              enquiries and the complexity of the lines you write.
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
              <Voices voices={INSURANCE_VOICES} />
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
              <InsuranceFAQ />
            </div>
          </div>
        </section>

        <RelatedIndustries
          items={[
            {
              href: "/industries/trades-home-services",
              title: "Trades & Home Services",
              desc: "For the restoration, roofing, and plumbing teams your property claims route to.",
            },
            {
              href: "/industries/real-estate",
              title: "Real Estate",
              desc: "For the agents whose closings drive your new business and renewals.",
            },
            {
              href: "/industries/mortgage-lending",
              title: "Mortgage & Lending",
              desc: "For the LOs needing the binder on the property before close.",
            },
          ]}
        />
      </main>
    </>
  );
}
