import type { Metadata } from "next";
import RecruitmentHero from "@/components/RecruitmentHero";
import RecruitmentFAQ from "@/components/RecruitmentFAQ";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BookDemoCTA from "@/components/BookDemoCTA";

// Reorder so recruitment-adjacent quotes (pipeline scoring, chasing deals,
// fast build time) lead — the general operational ones follow.
const RECRUITMENT_VOICES = [2, 0, 5, 3, 6, 1, 4, 7].map((i) => VOICES[i]);

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
        {/* NEW SECTION GOES HERE — sections I (seven-step loop), II (seven
            roles), III (what changes day one + what lands in your CRM), and
            IV (the honest filter) removed 2026-06-18, pending replacement. */}

        {/* ===================== VOICES ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Voices">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II&middot;V</span>Voices
              </p>
            </div>
            <div data-rb-fade="1">
              <Voices voices={RECRUITMENT_VOICES} />
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
                See how this runs for <em>your desks.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                A 30-minute walkthrough of the system mapped to the roles you
                actually hire for. You&apos;ll see the sourcing, the screening
                logic, and how candidates land in your calendar.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to one of your open briefs. You&apos;ll
                  see the candidate profiles, the screening decisions, and the
                  pipeline view.
                </p>
              </div>
              <div className="rb-demo-card">
                <span className="rb-label">Duration</span>
                <p>30 minutes. Zoom. No prep needed.</p>
              </div>
            </div>

            <p className="rb-demo-reassure" data-rb-fade="3">
              We build it. We run it. You own it. No lock-in. Cancel any time.
            </p>

            <div data-rb-fade="3">
              <BookDemoCTA href="https://cal.eu/rosebudsolutions/30min" />
            </div>
          </div>
        </section>

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
