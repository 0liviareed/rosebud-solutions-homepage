import type { Metadata } from "next";
import RealEstateFAQ from "@/components/RealEstateFAQ";
import SevenStepTimeline, {
  type TimelineStep,
} from "@/components/SevenStepTimeline";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BookDemoCTA from "@/components/BookDemoCTA";
import BookCTA from "@/components/BookCTA";

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

const REAL_ESTATE_STEPS: TimelineStep[] = [
  [
    "Lead comes in",
    "Zillow inquiry. Realtor.com form. Open-house signup. Redfin alert. Website IDX. Cold text. Always at the worst possible time — Sunday morning, Tuesday evening, mid-showing.",
  ],
  [
    "Qualify the lead",
    "Buyer or seller? Budget? Pre-approval? Timeline? Working with anyone else already? Five questions you need to ask before they're worth a calendar slot.",
  ],
  [
    "Route to the right agent",
    "Luxury, first-time buyer, investor, rental — every lead needs to land with the right person on your team. Misroute it and you've already lost.",
  ],
  [
    "Book the showing",
    "Cross-checking the calendar, matching agent availability, confirming with the buyer, writing it into Follow Up Boss, kvCORE, or Sierra. Manual every time.",
  ],
  [
    "Remind. Confirm. Reschedule.",
    "The day-before text. The morning-of confirmation. The reschedule when their kid gets sick. The no-show that costs you the slot.",
  ],
  [
    "Follow up on the showing",
    "The “what did you think” call. The pricing discussion. The next property suggestion. The work that decides whether they make an offer with you.",
  ],
  [
    "Long-tail nurture",
    "Most buyers aren't ready for 6–12 months. Most agents drop them after 3 follow-ups. The leads you stopped chasing are buying houses with someone else next spring.",
  ],
];

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

      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">IV</span>By Industry &middot; Real Estate
          </p>
          <h1 className="rb-page-hero-h1">
            Your leads are messaging four other agents.{" "}
            <em>The first one back wins.</em>
          </h1>
          <p className="rb-page-hero-sub">
            Agentic real estate orchestration — from first inquiry to closed
            deal. Autonomously qualify buyer and seller leads the moment they
            come in, schedule showings into your calendar, and keep dormant
            prospects warm until they&rsquo;re ready to transact. Coordinated
            across Zillow, Realtor.com, Redfin, your IDX feed, Facebook,
            Instagram, and the CRM you already run.
          </p>

          <ul
            className="rb-hero-stats"
            aria-label="Key real estate metrics"
          >
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">&lt; 60s</span>
              <span className="rb-hero-stat-label">
                Response time to every lead
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">First</span>
              <span className="rb-hero-stat-label">
                Most leads close with whoever answers first
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
                We build it. We run it. You close.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — WHERE THE DEALS LEAK ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="Where the deals leak"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Sound familiar?
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Where the deals <em>leak.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Most agents lose deals at the same point: the gap between a
                lead coming in and a human getting back to them. Two to three
                hours is the industry average. By then your prospect has
                talked to two other agents and toured a property with
                whichever one called first. The system below isn&rsquo;t
                about doing more outreach. It&rsquo;s about closing the
                window your competitors are walking through.
              </p>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={REAL_ESTATE_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every lead, the same loop. Every cold prospect, the same gap.
              And every gap is a deal that closed with whichever agent was
              faster, more available, or just luckier on timing.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              One missed buyer lead a week at an average commission of
              $9,000 per side is $468,000 walking past your door every year.
              Two missed seller listings a month at the same rate is
              $216,000.<sup>*</sup>
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if six of those seven steps ran <em>without you?</em>
            </p>
            <p
              className="rb-aftertext rb-aftertext-quiet"
              data-rb-fade="3"
              style={{ fontSize: 11.5, marginTop: 8 }}
            >
              <sup>*</sup> Illustrative — based on average US commission of
              $9,000 per side; actual figures will vary by market and price
              point.
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
            </div>
            <div data-rb-fade="1">
              <Voices voices={REAL_ESTATE_VOICES} />
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
                  "Zillow and Realtor.com leads sit unread for 2–3 hours while you're at a showing",
                  "Every lead answered in under 60 seconds, across every channel",
                ],
                [
                  "Qualifying every new lead manually before knowing if they're worth your time",
                  "Pre-qualified before they hit your phone — budget, pre-approval, timeline all captured",
                ],
                [
                  "Manually keying buyer details into Follow Up Boss or kvCORE after every call",
                  "Lead data filed into your CRM in the format it expects",
                ],
                [
                  "Day-of texts to remind buyers about showings",
                  "Reminders sent automatically, reschedules handled in-conversation",
                ],
                [
                  "Long-tail leads dropped after three follow-ups when they don't bite",
                  "6–12 month nurture sequences that bring buyers back when they're ready",
                ],
                [
                  "Voicemails from after-hours leads sitting until Monday morning",
                  "Every after-hours lead handled the moment it comes in",
                ],
                [
                  "Strategic guesswork on where leads are leaking",
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
                What lands in your CRM
              </p>
              <p className="rb-before-after-intro">
                By the time a lead reaches your team, they&rsquo;re
                qualified, scheduled, and ready for the conversation that
                closes the deal.
              </p>
              <p className="rb-before-after-bridge">
                Of the seven steps between inquiry and a signed contract,
                your team runs two. We run the <em>other five.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>Leads sitting in Zillow inbox</li>
                    <li>Half-captured qualification</li>
                    <li>No idea who&rsquo;s actually ready</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Full conversation logged</li>
                    <li>Qualification complete</li>
                    <li>Showing booked</li>
                    <li>Ready for the close</li>
                  </ul>
                </div>
              </div>
            </div>

            <div data-rb-fade="3">
              <BookCTA label="See how this runs for my team" />
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
                Built for teams <em>already closing.</em>
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
                    You&rsquo;re handling 30+ leads a month across buyers
                    and sellers
                  </li>
                  <li>
                    Your team is missing inquiries because nobody&rsquo;s on
                    the phone after 6pm
                  </li>
                  <li>
                    You&rsquo;re running Follow Up Boss, kvCORE, Sierra,
                    Chime, BoomTown, LionDesk, or similar
                  </li>
                  <li>
                    You&rsquo;ve got a long-tail of dormant leads you stopped
                    following up on
                  </li>
                  <li>
                    You want your agents at showings and closings, not on
                    intake calls
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
                    You&rsquo;re a solo agent doing under 12 transactions a
                    year — the math doesn&rsquo;t work yet
                  </li>
                  <li>
                    Your lead volume is under 30/month — you don&rsquo;t
                    have a response-speed problem, you have a lead-gen
                    problem
                  </li>
                  <li>
                    You expect this to generate leads — Rosebud handles
                    inbound, it doesn&rsquo;t run paid acquisition
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
                the leads are leaking. You leave with a clear map of what to
                automate and how.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to the kind of leads you&rsquo;re
                  handling every day. You&rsquo;ll see the conversation, the
                  qualification, the CRM hand-off, and the calendar booking.
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
              <RealEstateFAQ />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
