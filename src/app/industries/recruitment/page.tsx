import type { Metadata } from "next";
import RecruitmentHero from "@/components/RecruitmentHero";
import RecruitmentFAQ from "@/components/RecruitmentFAQ";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BuildSection from "@/components/BuildSection";
import CalEmbed from "@/components/CalEmbed";

// Reorder so recruitment-adjacent quotes (pipeline scoring, chasing deals,
// fast build time) lead — the general operational ones follow.
const RECRUITMENT_VOICES = [2, 0, 5, 3, 6, 1, 4, 7].map((i) => VOICES[i]);

const RECRUITMENT_ROLES: SplitRole[] = [
  { num: "I",   label: "Candidate Sourcing Engine",       body: "Targeted search across LinkedIn and sector networks, filtered against your ICP." },
  { num: "II",  label: "CV Screening & Shortlisting",     body: "Agentic AI reading every profile against your criteria." },
  { num: "III", label: "Automated Outreach Sequences",    body: "Multi-touch personalised sequences, sent without manual input." },
  { num: "IV",  label: "CRM Auto-Population",             body: "Everything written directly into your CRM, nothing typed." },
  { num: "V",   label: "Pipeline Management",             body: "Warm candidates tracked, re-engaged, ready when the next role opens." },
  { num: "VI",  label: "Behaviour-Triggered Follow-Up",   body: "Re-engagement handled automatically." },
  { num: "VII", label: "Operational Audit & Roadmap",     body: "Where your operation is losing time, and what to fix next." },
];

export const metadata: Metadata = {
  title: "Recruitment — AI Workflow for Agencies & In-House Teams",
  description:
    "AI for recruitment agencies: sources candidates against your ICP, screens CVs, sequences outreach, writes everything into your ATS. Live in 5 weeks.",
  alternates: { canonical: "/industries/recruitment" },
  openGraph: {
    title: "Recruitment — AI Workflow for Agencies & In-House Teams | Rosebud Global",
    description:
      "AI for recruitment agencies: a custom workflow that sources candidates against your ICP, screens CVs, sequences outreach across LinkedIn and email, and writes everything into your ATS. Live in 5 weeks.",
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
      {/* ========== PAGE HERO (animated workflow) ========== */}
      <RecruitmentHero />

      <main className="rb-content">
        {/* ===================== II — WHAT'S INCLUDED ===================== */}
        <section className="rb-sec rb-sec-split" data-rb-sec aria-label="What's included">
          <div className="rb-wrap rb-split">
            {/* Left column — sticky-pinned heading + CTAs */}
            <div className="rb-split-left">
              <div className="rb-split-left-inner">
                <p className="rb-eyebrow" data-rb-fade="0">
                  <span className="rb-num">II</span>Every deployment includes
                </p>
                <h2 className="rb-h2" data-rb-fade="1">
                  One system. <em>All seven roles.</em>
                </h2>
                <p className="rb-split-body" data-rb-fade="2">
                  A custom system we build around your desks. One setup. One
                  monthly figure. No per-seat pricing. Deployed in 5 weeks.
                </p>
                <p className="rb-split-body rb-split-body-quiet" data-rb-fade="3">
                  Every deployment is built around your desks, your briefs,
                  and your ICP. Seven roles run as one system — operated by
                  us, handed to you.
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
              ariaLabel="Seven roles in every recruitment deployment"
              roles={RECRUITMENT_ROLES}
            />
          </div>

          <div className="rb-wrap">
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to the volume and
              seniority of the roles you hire for.
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
              <Voices voices={RECRUITMENT_VOICES} />
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
              <RecruitmentFAQ />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
