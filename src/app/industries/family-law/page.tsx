/* ============================================================
 * /industries/family-law — Family Law & Consumer Legal Practices
 *
 * Operator flags before this ships in production:
 * 1. Bar counsel review is mandatory before publishing. State bar
 *    ethics rules vary materially — a page that passes review in
 *    California may be flagged in Texas or Florida. Have counsel
 *    review: (a) the "Where the line is" section in full, (b) the
 *    seven role descriptions individually with attention to Roles
 *    I, II, V, VI, (c) FAQ group iii (Billing, Compliance &
 *    Operations), and (d) the H1 and subhead.
 * 2. Voices section intentionally omitted. Attorney advertising
 *    rules govern what clients can say in published testimonials
 *    and vary state-by-state. Don't ship Voices without counsel
 *    review of the proposed quote.
 * 3. The 15–25% real-time billing recovery stat is sourced from
 *    LexisNexis, Clio Legal Trends Report, and Thomson Reuters
 *    surveys. Citation defensible on demo calls.
 * ============================================================ */

import type { Metadata } from "next";
import SevenStepTimeline, { type TimelineStep } from "@/components/SevenStepTimeline";
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import FamilyLawFAQ from "@/components/FamilyLawFAQ";
import BookDemoCTA from "@/components/BookDemoCTA";
import BookCTA from "@/components/BookCTA";
import RelatedIndustries from "@/components/RelatedIndustries";

const FAMILY_LAW_STEPS: TimelineStep[] = [
  [
    "Intake call comes in",
    "Potential client calls Tuesday afternoon. Receptionist's already on another line. Goes to voicemail. They call two other firms before yours rings them back Thursday. Lost retainer.",
  ],
  [
    "Initial qualification and conflict check setup",
    "Caller's situation captured manually. Conflicting parties checked against your client list — a process that needs a human, but only after the system has gathered the names, dates, and matter type. Half the qualifying questions get missed because reception is doing five other things.",
  ],
  [
    "Engagement letter and retainer",
    "Letter drafted, sent, chased. Client takes three days to sign. Retainer takes another five to land. Work can't start. Statute clock keeps ticking.",
  ],
  [
    "Document collection and records requests",
    "W-2s, tax returns, bank statements, custody arrangements, prior orders, asset disclosures from the client. School records, medical records, subpoenaed financials from third parties. First request goes out Monday. No reply by Friday. Paralegal sends a follow-up. Two weeks pass. Discovery deadline looms.",
  ],
  [
    "Court deadlines, hearings, scheduling",
    "Response due in 21 days. Hearing scheduled for the 14th. Status conference the following month. Deposition needs four calendars aligned — yours, opposing counsel, the deponent, the court reporter. Mediation needs a date that works for two parties and the mediator. All tracked in Outlook reminders that only get reviewed when someone remembers to check.",
  ],
  [
    "Status updates to client",
    "“Where are we with the filing?” “Did the other side respond?” “When's the next hearing?” “What did the judge say?” Five phone calls a day per active matter, every one of them billable time spent on something the client could read in an email.",
  ],
  [
    "Invoicing, time entry, payment chase",
    "Time entries reconstructed at month-end from calendar reverse-engineering. Invoices sent two weeks later. Payment lands 45–60 days after that, behind two reminders and an awkward email. Cash flow stays tight while the work keeps moving.",
  ],
];

const FAMILY_LAW_ROLES: SplitRole[] = [
  {
    num: "I",
    label: "Client Intake Engine",
    body:
      "Every new client inquiry across every channel — phone, website forms, lawyer referral, social — answered the moment it lands. The potential client calling about a custody emergency at 6pm gets a real conversation with your firm first, before they call two other lawyers. Matter type, urgency, opposing party names, related parties, jurisdiction — captured through structured conversation and prepared for your team's conflict-check review.",
  },
  {
    num: "II",
    label: "Qualification & Engagement Workflow",
    body:
      "The pre-engagement workflow that turns an inquiry into a signed retainer — capturing matter details, preparing the data for your attorney's conflict-check and acceptance decision, then once your attorney accepts representation, sending the engagement letter, chasing e-signature, and tracking retainer payment. The seven-day gap between “we want to hire you” and “you can actually start working” collapses to two. Acceptance of representation always stays with the attorney.",
  },
  {
    num: "III",
    label: "Document Collection & Records-Request Tracking",
    body:
      "Two pipelines, one system. Client-side: tax returns, financial disclosures, custody arrangements, prior orders, asset documentation, identification — collected through a structured client portal and guided conversation. Third-party: school records, medical records, subpoenaed financials, employment records, expert reports — tracked from request through receipt, with what was sent, what's outstanding, and which custodians need a follow-up surfaced in one view. Documents that used to take three weeks of email chase get to your paralegal in three days, organised and filed in your practice management system.",
  },
  {
    num: "IV",
    label: "Calendar, Deadline & Scheduling Coordination",
    body:
      "Every court date, hearing, response deadline, statute, and procedural trigger tracked in one system. Reminders fire to the attorney, paralegal, and client on the cadence that prevents missed dates. Deadlines computed off triggers — file date plus 21 days, served date plus 30, statute clock running on a custody petition. Beyond your firm's calendar: depositions, mediations, hearings, and expert witness scheduling coordinated across opposing counsel's office, court reporters, mediators, and outside experts — availability gathered, invites sent, confirmations chased, follow-up reminders fired the day before. The four-calendar alignment that used to take a paralegal a full day collapses to one round of structured messages.",
  },
  {
    num: "V",
    label: "Status Updates & Client Communication",
    body:
      "“Where are we with the filing?” answered before it's asked. Templated, event-triggered factual updates to clients — document filed, hearing scheduled, deadline approaching, next action required from the client. Strictly procedural and factual; never interpretive. Any client question that asks “what does this mean” or “should I do X” routes to the attorney immediately, with full conversation context attached. Five phone calls a day per matter drop to one — without crossing into legal advice.",
  },
  {
    num: "VI",
    label: "Document Assembly from Templates",
    body:
      "Routine administrative documents and correspondence populated from intake data — engagement letters, fee agreements, retainer receipts, scheduling letters, status correspondence, certificates of service, declarations of mailing, and standard client communication. The system prepares the draft. The attorney reviews, edits, and signs every output. Anything substantive — petitions, motions, pleadings, agreements that carry legal argument — stays with the attorney. The system never touches them.",
  },
  {
    num: "VII",
    label: "Time Capture, Billing & Payment Recovery",
    body:
      "The single largest revenue lever in small-firm legal practice. Time entries prompted in real time from calendar activity, document drafting, client communication, and matter touchpoints — captured the moment work happens, not reconstructed two weeks later. Industry data is consistent: attorneys who capture time in real time bill 15–25% more than attorneys who reconstruct at month-end. Invoices generated on the cadence that fits your firm. Payment reminders sent automatically — without your office staff making the awkward phone call. Aged debtor reports surfaced before they become a problem. The recovered billing capture typically pays for the Rosebud retainer two or three times over.",
  },
];

type LineBlock = { title: string; body: string };

const LINE_BLOCKS: LineBlock[] = [
  {
    title: "Legal drafting that carries argument stays with you.",
    body:
      "Routine administrative documents and correspondence get prepared from your intake data. Anything that requires legal strategy, argument, or judgment — petitions, motions, pleadings, settlement positions, brief writing, contract negotiation language — stays with the attorney. The system prepares administrative outputs; you write the law.",
  },
  {
    title: "Conflict checks stay with you.",
    body:
      "The system captures opposing party names, related parties, prior representations, and jurisdictional details, then prepares the data for your conflict-check workflow. The check itself is a human decision made inside your practice management system. We surface the inputs; you run the check.",
  },
  {
    title: "Legal advice and interpretation stay with you.",
    body:
      "Every client conversation operates inside a defined scope: procedural and administrative only. The system is built to recognise legal questions — anything that asks for interpretation, strategy, or advice — and route those to a licensed attorney in your firm before responding. No exceptions, no overrides.",
  },
  {
    title: "Court filing stays with you.",
    body:
      "DC, federal, state — the system prepares filings, organises exhibits, tracks filing deadlines, and reminds your team when filings are due. The actual filing requires attorney credentials and substantive review. That stays with your team.",
  },
  {
    title: "Discovery review stays with you. Discovery organisation doesn't.",
    body:
      "The system indexes, tags, and tracks discovery materials — what was produced, what's outstanding, what's been reviewed, what's privileged, what's responsive. The substantive review — relevance, privilege calls, work product analysis — is the work only an attorney or trained paralegal can do. We handle the organisation so your team can focus on the review.",
  },
  {
    title: "Emotional counsel stays with you.",
    body:
      "Family law clients are often in crisis. The system handles administrative communication only — clearly bounded, clearly scripted. Any conversation that needs human judgment, empathy, or counsel routes to you immediately, with full context attached.",
  },
];

const COMPARE_ROWS: Array<[string, string]> = [
  [
    "Intake calls go to voicemail when reception is on another line",
    "Every inquiry answered in under 60 seconds, across every channel",
  ],
  [
    "Qualifying every new caller manually before knowing if there's a conflict",
    "Pre-qualified before they reach you — matter type, opposing party, jurisdiction captured for your conflict-check review",
  ],
  [
    "Engagement letters sent, chased, signed, and tracked in email threads",
    "Engagement workflow run end-to-end after attorney acceptance, retainer landed in days, not weeks",
  ],
  [
    "Calling clients three times for financial disclosures and chasing third parties for records",
    "Documents and records-requests tracked from request through receipt in one view",
  ],
  [
    "Four-calendar alignment for depositions taking a paralegal a full day",
    "Scheduling coordinated across opposing counsel, court reporters, experts automatically",
  ],
  [
    "Court deadlines tracked in Outlook reminders nobody checks",
    "Every deadline computed from triggers, reminders fired automatically",
  ],
  [
    "Five “where are we?” calls a day per active matter",
    "Factual status updates sent automatically; substantive questions routed to the attorney",
  ],
  [
    "Time entries reconstructed at month-end, invoices sent late, payment chased manually",
    "Time captured in real time, invoices generated on schedule, payment chased automatically",
  ],
];

export const metadata: Metadata = {
  title: "Family Law & Consumer Legal — AI Workflow for Small Law Firms",
  description:
    "AI for family law and consumer legal practices: every intake answered in under 60 seconds, qualification and engagement run end-to-end, document and records-request tracking, deadline and scheduling coordination, factual status updates, and real-time billing capture. Built around Clio, MyCase, PracticePanther, Smokeball, CosmoLex, and Filevine. We don't replace your judgment. We replace the admin around it.",
  alternates: { canonical: "/industries/family-law" },
  openGraph: {
    title:
      "Family Law & Consumer Legal — AI Workflow for Small Law Firms | Rosebud Global",
    description:
      "A custom system that handles the admin around your legal work — intake, engagement workflow, document and records-request tracking, deadline and scheduling coordination, factual status updates, and real-time billing capture. No legal drafting. No conflict checks. No advice. Built around your practice management system. Live in 5 weeks.",
    url: "https://rosebud.global/industries/family-law",
    type: "website",
  },
};

/* JSON-LD — Service, FAQPage, BreadcrumbList. Crawlers (Google, Bing,
   GPTBot, ClaudeBot, PerplexityBot) index the offering and FAQs without
   running JavaScript. */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Automation System for Family Law & Consumer Legal Practices",
  provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
  areaServed: { "@type": "Country", name: "United States" },
  description:
    "Custom system that captures every new client inquiry, runs the pre-engagement workflow up to attorney acceptance, tracks document and third-party records requests, coordinates court deadlines and multi-party scheduling, sends factual status updates to clients, prepares routine administrative documents for attorney review, and captures time in real time with automated invoicing and payment chase. The system never drafts substantive legal work, runs conflict checks, files in court, or gives legal advice — those stay with the attorney. Built around your practice management system. Built and run by Rosebud for small family law and consumer legal practices.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description:
      "Pricing scoped to matter volume and the size of your firm. Shared on demo call.",
  },
};

const FAMILY_LAW_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast does the system respond to a new client inquiry?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Under 60 seconds, every time, regardless of channel or time of day. The reality of consumer legal practice is that potential clients call multiple firms — and the firm that responds first lands a disproportionate share of retainers. The system answers immediately, captures matter details, gathers conflict-check inputs for your team's review, and either books a consultation or hands the conversation back to your attorney with full context.",
      },
    },
    {
      "@type": "Question",
      name: "Does the system run conflict checks?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. The system captures the data a conflict check needs — opposing party names, related parties, prior representations, jurisdictional details — and prepares it for your team to run in your practice management system. The check itself is a human decision. We don't touch that.",
      },
    },
    {
      "@type": "Question",
      name: "How does the engagement letter workflow work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Once your attorney has run the conflict check and accepted representation, the system handles engagement letter delivery, e-signature chase, and retainer payment tracking. The seven-day gap between \"we want to hire you\" and \"you can start working\" typically collapses to two. The decision to accept representation always stays with the attorney.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle court deadlines and statute clocks?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every deadline gets computed off a trigger — file date plus response window, serve date plus discovery period, statute clock running from incident date. Reminders fire to the attorney, paralegal, and client on a cadence that prevents missed dates. The system flags timing risk before it becomes a problem — but the substantive deadline judgment remains with the attorney.",
      },
    },
    {
      "@type": "Question",
      name: "How does document collection from clients work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Through a structured client portal and guided conversation, not email chase. Financial disclosures, tax returns, custody documents, prior orders, identification — the system requests each document at the right point in the matter, walks the client through what's needed, collects it, and files it into your practice management system. Discovery materials, sensitive financials, and privileged communications all handled inside the portal — no email exposure.",
      },
    },
    {
      "@type": "Question",
      name: "How does records-request tracking work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every third-party request — school records, medical records, subpoenaed financials, employment records, expert reports — gets tracked from request through receipt. What was sent, when, to whom, what's outstanding, who needs a follow-up. The dashboard answers the question every paralegal asks at 4pm on a Friday before a discovery deadline: what's still missing?",
      },
    },
    {
      "@type": "Question",
      name: "How does scheduling coordination work for depositions and hearings?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The system gathers availability from opposing counsel's office, court reporters, mediators, and expert witnesses through structured outreach — then proposes dates, sends invites, chases confirmations, and fires reminders the day before. The four-calendar alignment that used to take a paralegal a full day collapses to one round of structured messages.",
      },
    },
    {
      "@type": "Question",
      name: "Does the system file documents in court?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. The system can prepare filings, organise exhibits, track deadlines, and remind your team when filings are due. The actual filing — DC, federal, state — requires attorney credentials, review, and judgment. We don't touch that.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system capture time and handle billing?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Time entries are prompted in real time from calendar activity, document drafting, client communication, and matter touchpoints — captured the moment work happens, not reconstructed at month-end. Industry data shows attorneys capturing time in real time bill 15–25% more than attorneys reconstructing later. Invoices generate on the cadence that fits your firm; payment reminders fire automatically without your office team making the awkward call.",
      },
    },
    {
      "@type": "Question",
      name: "Is this designed to operate inside attorney ethics obligations?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The system is built to operate inside the constraints of state bar ethics rules — including confidentiality obligations, the structural integrity of attorney-client privilege, the conflict-check workflow, and unauthorised practice of law boundaries. Every workflow is reviewed against ABA Model Rules and state-specific equivalents during the build. Your bar counsel should review the deployment before go-live; we build it to make that review straightforward.",
      },
    },
    {
      "@type": "Question",
      name: "How is client confidentiality protected?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every client communication is encrypted in transit and at rest. The system operates inside your practice management environment — Clio, MyCase, Smokeball, CosmoLex — meaning client data sits in the platform you've already vetted for confidentiality. No third-party data exposure outside the systems you already use.",
      },
    },
    {
      "@type": "Question",
      name: "What about IOLTA and trust accounting?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The system tracks retainer payments and earned-fee invoicing, but does not touch trust accounting directly. IOLTA reconciliation remains a function of your accountant and practice management system. Where we integrate, we integrate read-only on trust account balances — we don't move money.",
      },
    },
    {
      "@type": "Question",
      name: "Which practice management systems do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, CosmoLex, Filevine, and most of the platforms US small-firm legal practices actually run. Client data, conversation transcripts, document uploads, time entries, and matter activity all file directly into the system in the format it expects.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure the system launches safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every workflow is built around how your firm actually runs — your matter types, your courts, your jurisdiction, your tone of voice. We build it across a five-week deployment, your team tests it, and your attorneys sign off on every client-facing communication before it goes live. We strongly recommend bar counsel review of the deployment before launch, and we build to make that review straightforward.",
      },
    },
  ],
};

const FAMILY_LAW_BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://rosebud.global/industries/family-law" },
    { "@type": "ListItem", position: 3, name: "Family Law & Consumer Legal Practices", item: "https://rosebud.global/industries/family-law" },
  ],
};

export default function FamilyLawPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAMILY_LAW_FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAMILY_LAW_BREADCRUMBS) }}
      />

      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">VII</span>By Industry &middot; Family Law &amp; Consumer Legal Practices
          </p>
          <h1 className="rb-page-hero-h1">
            We don&apos;t replace your judgment. <em>We replace the admin around it.</em>
          </h1>
          <p className="rb-page-hero-sub">
            The intake calls, deadline tracking, document chasing, scheduling
            coordination, status updates, and billing follow-up that eat your
            week — handled by a system we build around your firm. No legal
            drafting. No conflict checks. No advice. Just the admin that&apos;s
            stopping you from doing the work only you can do.
          </p>

          <ul className="rb-hero-stats" aria-label="Key family law and consumer legal metrics">
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">&lt; 60s</span>
              <span className="rb-hero-stat-label">
                Response time to every new client inquiry
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">24/7</span>
              <span className="rb-hero-stat-label">
                Coverage across calls, forms, and intake
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">2–3 hrs / day</span>
              <span className="rb-hero-stat-label">
                Admin returned to each attorney and paralegal
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">5 weeks</span>
              <span className="rb-hero-stat-label">
                We build it. We run it. You practice law.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — SOUND FAMILIAR? ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Where the billable hours go">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Sound familiar?
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Where the billable hours <em>go.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Most small firms lose money in the same place: the gap between
                billable work and the admin that surrounds it. Your attorneys
                are trained to draft, argue, advise, and counsel — and
                they&apos;re spending half their day on intake calls, deadline
                reminders, document chasing, scheduling coordination, status
                updates, and unpaid invoices. The system below doesn&apos;t
                draft a single motion. It doesn&apos;t run a single conflict
                check. It handles the work that shouldn&apos;t be a
                partner&apos;s job in the first place.
              </p>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={FAMILY_LAW_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every client, the same loop. Every matter, the same admin chase.
              And it all lands on attorneys and paralegals who should be
              drafting, arguing, and advising — not chasing W-2s and sending
              status updates.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              The math compounds three ways. A solo family law attorney loses
              8–12 hours a week to non-billable admin — at $300–$450 an hour,
              that&apos;s $125,000–$280,000 a year of unrealised billing time.
              Attorneys who capture time in real time bill 15–25% more than
              attorneys who reconstruct at month-end — adding another
              $40,000–$80,000 of recovered revenue annually. And every
              retainer that lands two days faster instead of two weeks faster
              is two days of billable work added to every new matter. For a
              5-attorney firm, the combined recovery typically runs
              $750,000–$1.6M in annual capacity.
              <span className="rb-aftertext-footnote">*</span>
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if six of those seven steps ran without them?
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              <span className="rb-aftertext-footnote">*</span> Illustrative —
              based on industry averages for small family and consumer law
              practices; actual figures vary by billing structure, market, and
              matter mix.
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
                  A custom system we build around your firm. One setup. One
                  monthly figure. No per-seat pricing. Deployed in 5 weeks.
                </p>
                <p className="rb-split-body rb-split-body-quiet" data-rb-fade="3">
                  Every deployment is built around the matter types you handle,
                  the courts you practice in, and the systems you already run —
                  Clio, MyCase, PracticePanther, Smokeball, Rocket Matter,
                  CosmoLex, Filevine. Seven roles run as one system, operated
                  by us, handed to you.
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
              ariaLabel="Seven roles in every family law and consumer legal deployment"
              roles={FAMILY_LAW_ROLES}
            />
          </div>

          <div className="rb-wrap">
            <p className="rb-aftertext" data-rb-fade="3">
              You own every system we build. Full access, full credentials,
              full data. No lock-in. Cancel any time.
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to your matter volume
              and the size of your firm.
            </p>
          </div>
        </section>

        {/* ===================== II·B — WHERE THE LINE IS ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Where the line is">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II·B</span>Where the line is
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                What stays with <em>you.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Most legal AI vendors over-promise. We don&apos;t. There&apos;s
                a clean line between the admin around your work and the work
                itself — and we stay on the right side of it. This isn&apos;t a
                limitation. It&apos;s the reason the system is safe to deploy
                in a regulated practice.
              </p>
            </div>

            <div className="rb-line-blocks" data-rb-fade="3">
              {LINE_BLOCKS.map((b, i) => (
                <div key={i} className="rb-line-block">
                  <h3 className="rb-line-block-title">{b.title}</h3>
                  <p className="rb-line-block-body">{b.body}</p>
                </div>
              ))}
            </div>

            <div className="rb-line-why" data-rb-fade="3">
              <p className="rb-line-why-label">Why this matters</p>
              <p className="rb-line-why-body">
                The reason most legal AI deployments fail audits or trigger bar
                complaints is that the line between &ldquo;admin&rdquo; and
                &ldquo;legal work&rdquo; gets blurred. By the time it does, the
                firm is exposed. Rosebud is built around the line, not against
                it.
              </p>
            </div>
          </div>
        </section>

        {/* Voices slot intentionally omitted. Attorney advertising rules
            govern what clients can say in published testimonials and vary
            state-by-state. Do not ship Voices without counsel review. */}

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
              <p className="rb-before-after-eyebrow">
                What lands in your practice management system
              </p>
              <p className="rb-before-after-intro">
                By the time a matter reaches your attorneys, the client is
                qualified, the engagement letter is signed, the documents are
                in, the calendar is aligned, and the next step is clear. Every
                matter arrives ready to work.
              </p>
              <p className="rb-before-after-bridge">
                Of the seven steps between a client calling and the bill being
                paid, your attorneys run two — the work that genuinely needs
                your judgment. We run the <em>other five.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>Intake calls missed</li>
                    <li>Engagement letters delayed</li>
                    <li>Documents and records chased manually for weeks</li>
                    <li>Scheduling coordinated by phone tag</li>
                    <li>Deadlines tracked in Outlook reminders</li>
                    <li>Status calls eating billable hours</li>
                    <li>Time entries reconstructed at month-end</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Every intake captured</li>
                    <li>Engagement workflow run end-to-end</li>
                    <li>Documents and records collected and tracked</li>
                    <li>Scheduling coordinated across all parties</li>
                    <li>Deadlines monitored automatically</li>
                    <li>Factual status updates sent before they&apos;re asked</li>
                    <li>Time captured in real time</li>
                  </ul>
                </div>
              </div>
            </div>

            <div data-rb-fade="3">
              <BookCTA label="See how this runs for my firm" />
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
                Built for firms <em>practising law,</em> not running ops.
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
                    You&apos;re a solo or small firm (2–15 attorneys) in family
                    law, estate planning, immigration, personal injury, or
                    general consumer practice
                  </li>
                  <li>
                    Your attorneys are spending more than 5 hours a week on
                    non-billable admin
                  </li>
                  <li>
                    You&apos;re running Clio, MyCase, PracticePanther,
                    Smokeball, CosmoLex, or similar practice management
                    software
                  </li>
                  <li>
                    You&apos;re losing potential clients to slow intake
                    response or document chase delays
                  </li>
                  <li>
                    You want your attorneys drafting and arguing, not chasing
                    W-2s and sending status updates
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
                    You want a system that drafts motions, gives advice, runs
                    conflict checks, or handles substantive legal work — we
                    explicitly don&apos;t, and that&apos;s by design
                  </li>
                  <li>
                    You&apos;re a corporate, M&amp;A, IP, or large-firm
                    litigation practice — different operational model,
                    different page
                  </li>
                  <li>
                    You&apos;re a solo handling fewer than 8 active matters at
                    a time — the math doesn&apos;t work yet
                  </li>
                  <li>
                    You&apos;re looking for legal research AI (Harvey,
                    CoCounsel, Spellbook) — different category of product
                  </li>
                  <li>
                    You don&apos;t have practice management software and
                    don&apos;t want to adopt any — this is a service that
                    connects to your systems, not a replacement
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
                A 30-minute call to understand how your firm runs and where
                the billable hours are leaking. You leave with a clear map of
                what to automate and how — and a clear understanding of what
                we won&apos;t touch.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to the matter types you actually
                  handle. You&apos;ll see the intake conversation, the document
                  collection workflow, the deadline tracking, the scheduling
                  coordination, and the status update flow.
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
                <span className="rb-num">VI</span>FAQs
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                The questions we get on <em>every demo call.</em>
              </h2>
            </div>

            <div data-rb-fade="2">
              <FamilyLawFAQ />
            </div>
          </div>
        </section>

        <RelatedIndustries
          items={[
            {
              href: "/industries/insurance",
              title: "Insurance",
              desc: "For brokers referring personal injury and first-party claims work to plaintiff-side attorneys.",
            },
            {
              href: "/industries/real-estate",
              title: "Real Estate",
              desc: "For agents needing transactional support on closings, contract review, and title escalations.",
            },
            {
              href: "/industries/mortgage-lending",
              title: "Mortgage & Lending",
              desc: "For LOs facing title, foreclosure, or document review questions inside live loans.",
            },
          ]}
        />
      </main>
    </>
  );
}
