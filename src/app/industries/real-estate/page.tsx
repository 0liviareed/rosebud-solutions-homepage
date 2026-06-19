import type { Metadata } from "next";
import RealEstateHero from "@/components/RealEstateHero";
import RealEstateFAQ from "@/components/RealEstateFAQ";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BuildSection from "@/components/BuildSection";
import CalEmbed from "@/components/CalEmbed";
import RelatedIndustries from "@/components/RelatedIndustries";

// Reorder Voices so quotes about lead response speed, pipeline visibility,
// and quietly-running operations lead — those carry best for real estate
// teams who feel the response-speed pain first.
const REAL_ESTATE_VOICES = [2, 5, 0, 3, 7, 1, 4, 6].map((i) => VOICES[i]);

// SEO — keywords prospects actually search: "AI for real estate",
// "AI workflow for real estate", "real estate lead response automation".
// Title leads with the keyword, description repeats it naturally.
export const metadata: Metadata = {
  title:
    "Real Estate — AI Workflow for Estate Agents, Brokers & Teams",
  description:
    "AI for real estate: answers every Zillow, Realtor.com & IDX lead in <60s, qualifies buyers + sellers, books showings into Follow Up Boss / kvCORE.",
  keywords: [
    "ai for real estate",
    "ai workflow for real estate",
    "real estate lead response automation",
    "real estate ai agent",
    "follow up boss ai",
    "kvcore ai",
    "sierra interactive ai",
    "zillow lead response",
    "real estate ai assistant",
    "ai showing booking",
  ],
  alternates: { canonical: "/industries/real-estate" },
  openGraph: {
    title:
      "Real Estate — AI Workflow for Estate Agents & Brokers | Rosebud Global",
    description:
      "Agentic real estate orchestration — from first inquiry to closed deal. Autonomously qualify buyer and seller leads the moment they come in, schedule showings, and keep dormant prospects warm until they're ready to transact.",
    url: "https://rosebud.global/industries/real-estate",
    type: "website",
  },
};

const REAL_ESTATE_ROLES: SplitRole[] = [
  {
    num: "I",
    label: "Lead Capture Engine",
    body: "Every inquiry across every channel — Zillow, Realtor.com, Redfin, Homes.com, your IDX, Facebook, Instagram, SMS, missed calls — answered the moment it lands. The Zillow lead who filled out three forms before bed gets their first call back from you. The buyer who texted at 9pm hits a qualified conversation, not a “we'll get back to you Monday.”",
  },
  {
    num: "II",
    label: "Buyer & Seller Qualification",
    body: "Pre-approval status, budget, timeline, motivation, working-with-an-agent flag — captured through structured conversation before a human agent touches the file. Hot leads get routed to a closer. Long-tail prospects get routed to nurture. Nobody on your team wastes an hour on a buyer who's six months from a mortgage application.",
  },
  {
    num: "III",
    label: "Showing & Listing Appointment Booking",
    body: "Slots offered against live agent availability, confirmed in real time, written into your CRM. Buyers book showings directly. Sellers book listing appointments. Your calendar fills while you're at a closing.",
  },
  {
    num: "IV",
    label: "CRM Auto-Population",
    body: "Lead details, conversation transcripts, qualification data, next steps — written into Follow Up Boss, kvCORE, Sierra, Chime, BoomTown, or whatever you're running. Nothing typed. Your agents walk into every showing with full context, not a half-filled-in card.",
  },
  {
    num: "V",
    label: "Reminders, Confirmations & Reschedules",
    body: "Day-before reminders. Morning-of confirmations. Reschedule handling the moment a buyer flags one. No-shows drop because the system is in the conversation, not waiting on someone to make the call.",
  },
  {
    num: "VI",
    label: "Long-Tail Nurture",
    body: "The buyer who said “maybe next spring.” The seller circling for six months. The investor watching the market. Most agents drop these leads after three follow-ups. Rosebud handles them across SMS, email, and voice for as long as it takes — adjusting cadence based on engagement signals, pulling in listings that match their criteria, and routing them back to your closer the moment a buying signal fires. Not a drip sequence. A conversation that resumes when they're ready.",
  },
  {
    num: "VII",
    label: "Operational Audit & Roadmap",
    body: "Where your operation is losing leads, and what to fix next. Reviewed quarterly with you, refined into the system.",
  },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Real Estate Lead Operations System",
  provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  description:
    "AI workflow for real estate teams. Answers Zillow, Realtor.com, Redfin, IDX, and social leads in under 60 seconds, qualifies buyers and sellers, books showings into Follow Up Boss / kvCORE / Sierra Interactive, and runs the 6–12 month long-tail nurture that converts dormant leads. Built and run by Rosebud.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description:
      "Pricing scoped to lead volume and team size. Shared on demo call.",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast does the system respond to a new real estate lead?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under 60 seconds, every time, regardless of channel or time of day. The industry average is 2–3 hours. By the time the average agent replies, your prospect has already talked to two other agents and toured a property with whichever one called first.",
      },
    },
    {
      "@type": "Question",
      name: "How does the AI qualify buyers and sellers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through structured conversation across the qualifying signals that matter — pre-approval status, budget, timeline, motivation, whether they're working with another agent. Hot leads get routed straight to your closer with full context. Long-tail prospects get routed to nurture.",
      },
    },
    {
      "@type": "Question",
      name: "How are real estate leads routed to the right agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The agent reads the conversation, identifies fit — luxury, first-time buyer, investor, rental, location — and routes to the right person on your team with full context attached.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system book showings and listing appointments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Slots offered against live agent availability, confirmed in real time, written into your CRM. Buyers book showings directly through the conversation. Sellers book listing appointments.",
      },
    },
    {
      "@type": "Question",
      name: "How does long-tail real estate nurture work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not a drip sequence. The system stays in conversation with 6-to-12-month buyers across SMS, email, and voice — adjusting cadence based on engagement, pulling in market updates and listings that match their criteria, and routing back to your closer the moment a buying signal fires.",
      },
    },
    {
      "@type": "Question",
      name: "Which real estate CRMs do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Follow Up Boss, kvCORE, Sierra Interactive, Chime, BoomTown, LionDesk, Wise Agent, Realvolve, and most of the platforms US real estate teams actually run.",
      },
    },
    {
      "@type": "Question",
      name: "Is this designed for TCPA compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every workflow respects TCPA consent requirements, DNC filtering, and quiet hours by state. The system is built for US real estate compliance from the first touchpoint — not retrofitted afterwards.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure the system launches safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every workflow is built around how your team actually runs — your service area, your price points, your specialties, your tone. We build it across a five-week deployment, you test it, you sign it off.",
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
      item: "https://rosebud.global/industries/real-estate",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Real Estate",
      item: "https://rosebud.global/industries/real-estate",
    },
  ],
};

export default function RealEstatePage() {
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
      <RealEstateHero />

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
                  A custom system we build around your team. One setup. One
                  monthly figure. No per-seat pricing. Deployed in 5 weeks.
                </p>
                <p
                  className="rb-split-body rb-split-body-quiet"
                  data-rb-fade="3"
                >
                  Every deployment is built around the listings you sell,
                  the leads you generate, and the CRM you already run —
                  Follow Up Boss, kvCORE, Sierra Interactive, Chime,
                  BoomTown, LionDesk. Seven roles run as one system,
                  operated by us, handed to you.
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
              ariaLabel="Seven roles in every real estate deployment"
              roles={REAL_ESTATE_ROLES}
            />
          </div>

          <div className="rb-wrap">
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to your lead volume
              and team size.
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
              <Voices voices={REAL_ESTATE_VOICES} />
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
                <span className="rb-num">VI</span>Frequently asked
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                The questions we get on <em>every demo call.</em>
              </h2>
            </div>

            <div data-rb-fade="2">
              <RealEstateFAQ />
            </div>
          </div>
        </section>

        <RelatedIndustries
          items={[
            {
              href: "/industries/trades-home-services",
              title: "Trades & Home Services",
              desc: "For the plumbers, sparkies, roofers, and HVAC teams handling pre-list repairs, inspections, and post-close work.",
            },
            {
              href: "/industries/mortgage-lending",
              title: "Mortgage & Lending",
              desc: "For the LOs co-piloting your buyers from pre-approval to funded close.",
            },
            {
              href: "/industries/insurance",
              title: "Insurance",
              desc: "For the brokers running new business, claims, and renewals on the homes you sell.",
            },
          ]}
        />
      </main>
    </>
  );
}
