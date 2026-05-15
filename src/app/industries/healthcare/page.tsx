import type { Metadata } from "next";
import HealthcareFAQ from "@/components/HealthcareFAQ";
import SevenStepTimeline, { type TimelineStep } from "@/components/SevenStepTimeline";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BookDemoCTA from "@/components/BookDemoCTA";
import BookCTA from "@/components/BookCTA";

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
    "Agentic patient orchestration for dental, aesthetic, and private healthcare clinics — from first enquiry to long-term loyalty. Built and run by Rosebud. Live in 5 weeks.",
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

/* Healthcare-specific seven-step loop. Same component as recruitment — passed
   different step copy via the `steps` prop. Carousel behaviour, keyboard
   navigation, swipe, and visual treatment are shared. */
const HEALTHCARE_STEPS: TimelineStep[] = [
  [
    "Enquiry comes in",
    "Instagram DM at 11pm. Contact form during a treatment. The practice line at lunch. Every channel, the same starting line.",
  ],
  [
    "Qualify the patient",
    "Suitable for treatment? Recent fillers, dental work, or contraindications? On blood thinners? Comparing other clinics? The screening conversation before a slot gets offered.",
  ],
  [
    "Chase for records and consent",
    "Medical history forms. Anti-wrinkle questionnaires. Pre-treatment photos for aesthetics. Finance applications for £4k Invisalign plans. The first email, then the second, then the third.",
  ],
  [
    "Find a slot and book",
    "Cross-checking Dentally, SOE, Pabau, Open Dental, or Aesthetic Nurse Software against practitioner availability, confirming with the patient, keying it in.",
  ],
  [
    "Remind. Confirm. Reschedule.",
    "24-hour reminder. Day-of confirmation. Reschedules when the patient pushes back. The admin loop that eats half a morning.",
  ],
  [
    "Post-visit follow-up",
    "Aftercare instructions. Treatment plan progress. Payment chases. The work that decides whether they come back.",
  ],
  [
    "Recall — and the loop starts again",
    "Three months for Botox. Six months for hygiene. Twelve months for Invisalign reviews. Until the cycle restarts.",
  ],
];

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
      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">III</span>For Dental, Aesthetic &amp;
            Private Healthcare
          </p>
          <h1 className="rb-page-hero-h1">
            AI-Powered Patient <em>Operations Software.</em>
          </h1>
          <p className="rb-page-hero-sub">
            Agentic patient orchestration — from first enquiry to long-term
            loyalty. Autonomously answer calls, DMs, and contact forms, qualify
            and book patients into your diary, and run the recall and aftercare
            sequences that quietly keep them coming back. Coordinated across
            your phones, inbox, social channels, and practice management
            system.
          </p>

          {/* Stats row — inline beneath subhead. Four KPIs, each a big number
              and a one-line label. Designed to scan in under five seconds. */}
          <ul className="rb-hero-stats" aria-label="Key healthcare metrics">
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">&lt; 60s</span>
              <span className="rb-hero-stat-label">
                Response time to every enquiry
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">24/7</span>
              <span className="rb-hero-stat-label">
                Coverage across calls, DMs, and forms
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">2–3 hrs / day</span>
              <span className="rb-hero-stat-label">
                Admin returned to each receptionist
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">5 weeks</span>
              <span className="rb-hero-stat-label">
                From kickoff to live system
              </span>
            </li>
          </ul>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — SEVEN-STEP LOOP ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Where the hours go">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Sound familiar?
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Where the hours <em>go.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Your clinicians spend the day with patients. Your front desk
                spends theirs answering the same questions, chasing the same
                documents, and rebooking the same recall list. We build the
                system that takes the repetitive half off your team&rsquo;s
                desk, so the patient-facing half gets its hours back.
              </p>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={HEALTHCARE_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every patient, the same loop. Every recall, the loop starts
              again. And it all lands on the front desk who should be looking
              after the patients in the building, not chasing the ones who
              aren&rsquo;t.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              One missed aesthetic enquiry per day at £350 average treatment
              value is £127K a year walking past your door. A 400-patient
              hygiene recall list at £85 per visit is £68K of revenue that
              depends entirely on whether someone remembers to chase it.
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if five of those seven steps ran without them?
            </p>

            <div data-rb-fade="3">
              <BookCTA label="See what runs itself" />
            </div>
          </div>
        </section>

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

        {/* ===================== VOICES — between II & III ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Voices">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II&middot;V</span>Voices
              </p>
            </div>
            <div data-rb-fade="1">
              <Voices voices={HEALTHCARE_VOICES} />
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
                  "Instagram DMs sit unread until someone has time to check the inbox",
                  "Every enquiry answered the moment it lands, across every channel",
                ],
                [
                  "Calling and emailing patients three times for medical history and pre-treatment photos",
                  "Documentation collected through structured conversation, no chasing required",
                ],
                [
                  "Reception manually keying patient details into the practice management system",
                  "Patient data filed into your PMS in the format it expects",
                ],
                [
                  "Front desk juggling reminders and reschedules alongside walk-ins",
                  "Reminders sent automatically, reschedules handled in-conversation",
                ],
                [
                  "Recall lists running on a spreadsheet — or not at all",
                  "Recall cycles triggered automatically at the right interval per treatment",
                ],
                [
                  "Aftercare depending on which receptionist remembers to send it",
                  "Aftercare sequenced from the appointment itself",
                ],
                [
                  "Strategic guesswork on where the diary is leaking",
                  "Every conversation logged, every booking tracked, every decision visible",
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
              <p className="rb-before-after-eyebrow">What lands in your PMS</p>
              <p className="rb-before-after-intro">
                By the time a patient arrives, the qualifying conversation is
                done, the records are in, and the appointment is ready.
              </p>
              <p className="rb-before-after-bridge">
                Of the seven steps between enquiry and a patient in your chair,
                your team runs two. We run the <em>other five.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>DMs and missed calls only</li>
                    <li>Half-captured patient details</li>
                    <li>Missing medical history and consent</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Full conversation logged</li>
                    <li>Medical history and consent collected</li>
                    <li>Treatment plan ready for sign-off</li>
                    <li>Patient in the chair on time, fully briefed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div data-rb-fade="3">
              <BookCTA label="See how this runs for my practice" />
            </div>
          </div>
        </section>

        {/* ===================== IV — WHO THIS IS FOR ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Who this is for">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">IV</span>The honest filter
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Built for clinics <em>already busy.</em>
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
                    You&rsquo;re handling enquiry volume across multiple
                    treatments or services
                  </li>
                  <li>
                    Your front desk is drowning in repetitive inbound and
                    recall
                  </li>
                  <li>
                    You&rsquo;ve got a patient list with recurring treatments —
                    hygiene checks, Botox top-ups, ortho reviews, treatment
                    plans
                  </li>
                  <li>
                    You&rsquo;re already using a practice management system,
                    or you&rsquo;re open to adopting one
                  </li>
                  <li>
                    You want your clinical team focused on patients, not
                    paperwork
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
                    Your front desk has under 100 inbound enquiries a month —
                    you don&rsquo;t have a volume problem yet
                  </li>
                  <li>
                    You&rsquo;re a solo practitioner doing two days a week with
                    no growth plans
                  </li>
                  <li>
                    You&rsquo;re looking for a chatbot or a plug-in tool, not a
                    system
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
                A 30-minute call to understand how your practice runs and where
                the revenue is leaking. You leave with a clear map of what to
                automate and how.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to the kind of patient you&rsquo;re
                  handling every day. You&rsquo;ll see the conversation, the
                  structured data, the PMS hand-off, and the pipeline view.
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
