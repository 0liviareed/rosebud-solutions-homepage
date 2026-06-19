import type { Metadata } from "next";
import HealthcareHero from "@/components/HealthcareHero";
import HealthcareFAQ from "@/components/HealthcareFAQ";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BuildSection from "@/components/BuildSection";
import CalEmbed from "@/components/CalEmbed";

const HEALTHCARE_ROLES: SplitRole[] = [
  { num: "I",   label: "Enquiry Intake",                    body: "Every enquiry across every channel — phone, Instagram DM, contact form, WhatsApp — answered the moment it lands. The aesthetic enquiry who messaged five clinics before bed gets a proper answer from yours. The dental patient calling on their lunch break hits a booking, not a voicemail." },
  { num: "II",  label: "Patient Triage & Qualification",    body: "Treatment needs, suitability flags, urgency, and finance questions captured through structured conversation. Routine queries get answered without clinical input; anything that needs clinical eyes — a dental emergency at 9pm, a post-treatment patient worried about swelling — gets escalated the moment the agent recognises it." },
  { num: "III", label: "Records & Documentation Collection", body: "Medical history, pre-treatment photos, consent paperwork, finance details — collected through guided conversation, not chased over email. Filed straight into your practice management system so the clinician walks in with the full picture." },
  { num: "IV",  label: "Booking & Diary Management",        body: "Slots offered against live practitioner availability, confirmed in real time, written into your PMS. Slots fill while your team is on the floor." },
  { num: "V",   label: "Reminders & Reschedules",           body: "Reminders sent at the cadence that actually moves the no-show number. Reschedules handled the moment a patient flags one. Day-before confirmations sent automatically. Your diary stays tight without anyone manually working it." },
  { num: "VI",  label: "Post-Visit Follow-up & Aftercare",  body: "Aftercare for aesthetic clients. Hygiene guidance between dental visits. Treatment-plan progress chases for Invisalign or implant patients. Triggered by the appointment itself, sequenced to the treatment." },
  { num: "VII", label: "Recall & Retention",                body: "Recall cycles diarised by treatment type — three-month aesthetic top-ups, six-month hygiene checks, twelve-month ortho reviews — plus the sequenced touchpoints across multi-visit courses like Profhilo, polynucleotides, or laser hair removal. The patients you assumed went elsewhere end up back in your diary, often without a single human touching the thread." },
];

// Re-order Voices so the operational / fast-build / quietly-running quotes
// lead — those carry best across dental, aesthetic, and private healthcare
// audiences where the value prop is "the system runs while the clinical
// team stays human".
const HEALTHCARE_VOICES = [3, 5, 1, 7, 0, 4, 6, 2].map((i) => VOICES[i]);

export const metadata: Metadata = {
  title: "Dental, Aesthetic & Private Healthcare — AI-Powered Patient Operations",
  description:
    "AI for dental, aesthetic & private healthcare: answers every enquiry across calls, DMs, forms, books patients into Dentally / SOE / Pabau, runs recall.",
  alternates: { canonical: "/industries/healthcare" },
  openGraph: {
    title:
      "Dental, Aesthetic & Private Healthcare — AI-Powered Patient Operations | Rosebud Global",
    description:
      "Agentic patient orchestration — from first enquiry to long-term loyalty. Autonomously answer calls, DMs, and contact forms, qualify and book patients into your diary, and run the recall sequences that keep them coming back.",
    url: "https://rosebud.global/industries/healthcare",
    type: "website",
  },
};

/* JSON-LD schemas — Service (the patient-ops automation), FAQPage
   (the 9 FAQ items), BreadcrumbList. Rendered as <script type="application/ld+json">
   inline so crawlers (Google, Bing, GPTBot, ClaudeBot, PerplexityBot) can
   index the offering and the FAQs without running JavaScript. */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Patient Operations System",
  provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  description:
    "Custom AI-powered patient operations system for dental, aesthetic, and private healthcare clinics — enquiry intake, triage, records collection, booking, reminders, aftercare, and recall. Built and run by Rosebud.",
  offers: {
    "@type": "Offer",
    priceCurrency: "GBP",
    description:
      "Pricing scoped to enquiry volume and treatments offered. Shared on demo call.",
  },
};

const HEALTHCARE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you handle treatment enquiries and pricing questions instantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Conversational agents handle high-volume patient questions — treatment options, pricing ranges, suitability, finance enquiries — and capture qualifying signals like treatment need, urgency, and timeline. Patients get an immediate answer; your front desk only handles the conversations that need a human.",
      },
    },
    {
      "@type": "Question",
      name: "How is enquiry intake and qualification automated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The agent connects to your practice management system — Dentally, SOE, Pabau, Open Dental, Aesthetic Nurse Software — to collect patient details, assess suitability, and guide them through the booking process. It identifies whether someone is comparing clinics, ready to book, or needs clinical input — so your team spends time on the patients most likely to convert.",
      },
    },
    {
      "@type": "Question",
      name: "How are urgent cases routed to the right person?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The agent reads the conversation, identifies urgency, and escalates to the right person without delay. A dental emergency at 9pm or a post-treatment patient with a concern reaches a clinician with full context attached, while routine bookings work themselves out.",
      },
    },
    {
      "@type": "Question",
      name: "How do you support consultation prep and records collection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The agent collects medical history, pre-treatment photos, consent documentation, and finance details before the appointment — preparing structured data that lands in your PMS. The clinician walks into the appointment with the full picture. No repeated questions.",
      },
    },
    {
      "@type": "Question",
      name: "How are recall and lapsed-patient outreach managed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Recall sequences run by treatment type — three-month aesthetic top-ups, six-month hygiene checks, twelve-month ortho reviews — plus the sequenced touchpoints across multi-visit courses like Profhilo or laser hair removal. Replies get handled in-conversation. Appointments get booked. The patients you assumed went elsewhere end up back in your diary.",
      },
    },
    {
      "@type": "Question",
      name: "How do you reduce no-shows and handle aftercare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reminders go out at the cadence that actually moves the no-show number, reschedules are handled the moment a patient flags one, and aftercare is sequenced from the appointment itself. Patients experience a clinic that remembers them and follows through.",
      },
    },
    {
      "@type": "Question",
      name: "Is this designed for regulated healthcare environments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Systems are built to support the regulatory requirements of dental, aesthetic, and private healthcare environments — including consent capture, data handling, and clinical escalation — while respecting clinical decision-making boundaries.",
      },
    },
    {
      "@type": "Question",
      name: "What visibility do practice managers get across patient communications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every conversation logged, every booking tracked, every follow-up visible in one place. Practice managers see exactly what's happening across patient communications — what's booked, what's pending, what's been quoted, where revenue is sitting in the funnel. Decisions stop being best guesses.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure the system launches safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every workflow is built around how your practice actually runs — your treatment list, your finance options, your booking rules, your tone. We build it across a five-week deployment, you test it, you sign it off. By the time the agent goes live, you know exactly what it says, how it handles edge cases, and where it escalates. You're not handing over the front desk. You're extending it.",
      },
    },
  ],
};

const HEALTHCARE_BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Industries",
      item: "https://rosebud.global/industries/healthcare",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Dental, Aesthetic & Private Healthcare",
      item: "https://rosebud.global/industries/healthcare",
    },
  ],
};

export default function HealthcarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HEALTHCARE_FAQ_SCHEMA),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HEALTHCARE_BREADCRUMBS),
        }}
      />
      {/* ========== PAGE HERO (animated workflow) ========== */}
      <HealthcareHero />

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
                  Built around your treatments, your PMS, your patient base.
                  One setup. One monthly figure. No per-seat pricing. Live
                  in 5 weeks.
                </p>
                <p className="rb-split-body rb-split-body-quiet" data-rb-fade="3">
                  Every deployment is built around the treatments you offer,
                  the systems you already run — Dentally, SOE, Pabau, Open
                  Dental, Aesthetic Nurse Software — and the patients you
                  already serve. Seven roles run as one system, operated by
                  us, handed to you.
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
              ariaLabel="Seven roles in every healthcare deployment"
              roles={HEALTHCARE_ROLES}
            />
          </div>

          <div className="rb-wrap">
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to your enquiry volume
              and the treatments you offer.
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
              <Voices voices={HEALTHCARE_VOICES} />
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
              <HealthcareFAQ />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
