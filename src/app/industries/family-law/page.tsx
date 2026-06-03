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
    "Receptionist on another line. Voicemail. They call two other firms before you ring back.",
  ],
  [
    "Conflict check setup",
    "Caller's matter captured manually. Half the qualifying questions missed.",
  ],
  [
    "Engagement letter and retainer",
    "Letter sent. Signed three days later. Retainer lands five days after that. Statute clock ticking.",
  ],
  [
    "Document and records chase",
    "W-2s. Tax returns. School records. Medical records. First email goes out Monday. Discovery deadline looms.",
  ],
  [
    "Court deadlines and scheduling",
    "Response due in 21 days. Deposition needs four calendars aligned. Tracked in Outlook reminders nobody checks.",
  ],
  [
    "Status updates to client",
    "Five “where are we?” calls a day per matter. Every one of them billable time on something they could read in an email.",
  ],
  [
    "Invoicing and payment chase",
    "Time entries reconstructed at month-end. Invoices sent late. Payment lands 60 days later.",
  ],
];

const FAMILY_LAW_ROLES: SplitRole[] = [
  {
    num: "I",
    label: "Client Intake Engine",
    body:
      "Every inquiry answered in under 60 seconds. Matter type, opposing party, jurisdiction — captured for your conflict-check review.",
  },
  {
    num: "II",
    label: "Qualification & Engagement Workflow",
    body:
      "Matter details prepared for your attorney's acceptance decision. Once accepted, engagement letter delivered, signature chased, retainer tracked. Acceptance always stays with the attorney.",
  },
  {
    num: "III",
    label: "Document Collection & Records-Request Tracking",
    body:
      "Two pipelines, one system. Client documents collected through a structured portal. Third-party records tracked from request through receipt. What's outstanding, who needs a follow-up — all in one view.",
  },
  {
    num: "IV",
    label: "Calendar, Deadline & Scheduling Coordination",
    body:
      "Every deadline computed off triggers. Reminders fired automatically. Depositions, mediations, and expert scheduling coordinated across opposing counsel, court reporters, and outside parties.",
  },
  {
    num: "V",
    label: "Status Updates & Client Communication",
    body:
      "Factual updates only — document filed, hearing scheduled, deadline approaching. Strictly procedural; never interpretive. Substantive questions route to the attorney.",
  },
  {
    num: "VI",
    label: "Document Assembly from Templates",
    body:
      "Routine administrative documents from intake data — engagement letters, scheduling letters, certificates of service, standard correspondence. Anything substantive — petitions, motions, pleadings — stays with the attorney.",
  },
  {
    num: "VII",
    label: "Time Capture, Billing & Payment Recovery",
    body:
      "Time captured in real time, not reconstructed at month-end. Invoices generate on schedule. Payment chased automatically. Recovered billing typically pays the retainer two or three times over.",
  },
];

type LineItem = { topic: string; statement: string };

const LINE_ITEMS: LineItem[] = [
  { topic: "Legal drafting",   statement: "petitions, motions, pleadings, settlement positions. Yours." },
  { topic: "Conflict checks",  statement: "we capture inputs. You run the check." },
  { topic: "Legal advice",     statement: "every client conversation is procedural only. Legal questions route to you." },
  { topic: "Court filing",     statement: "we prepare. You file." },
  { topic: "Discovery review", statement: "we organise. You review." },
  { topic: "Emotional counsel", statement: "we handle admin. You handle clients." },
];

const COMPARE_ROWS: Array<[string, string]> = [
  [
    "Intake calls go to voicemail",
    "Every inquiry answered in under 60 seconds",
  ],
  [
    "Conflict-check data captured manually",
    "Pre-qualified — matter type, opposing party, jurisdiction captured",
  ],
  [
    "Engagement letters chased in email threads",
    "Workflow run end-to-end after attorney acceptance",
  ],
  [
    "Clients and third parties chased by phone",
    "Documents and records tracked in one view",
  ],
  [
    "Four-calendar alignment taking a paralegal a full day",
    "Scheduling coordinated automatically across all parties",
  ],
  [
    "Deadlines in Outlook reminders nobody checks",
    "Every deadline computed and fired automatically",
  ],
  [
    "Five “where are we?” calls a day per matter",
    "Factual status updates sent before they're asked",
  ],
  [
    "Time reconstructed at month-end",
    "Time captured in real time",
  ],
];

export const metadata: Metadata = {
  title: "Family Law & Consumer Legal — AI Workflow for Small Law Firms",
  description:
    "AI for family law and consumer legal practices: intake answered in under 60 seconds, deadlines tracked, documents chased, status updates sent, time captured in real time. No drafting. No advice. No conflict checks. Built around Clio, MyCase, PracticePanther, Smokeball, CosmoLex, and Filevine. Live in 5 weeks.",
  alternates: { canonical: "/industries/family-law" },
  openGraph: {
    title:
      "Family Law & Consumer Legal — AI Workflow for Small Law Firms | Rosebud Global",
    description:
      "A custom system that handles the admin around your legal work — intake, deadlines, document chase, status updates, and real-time billing. No drafting. No advice. No conflict checks. Built around your practice management system. Live in 5 weeks.",
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
      name: "How fast does the system respond to a new inquiry?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Under 60 seconds, every time. Industry average is two to three hours. The firm that responds first lands the retainer.",
      },
    },
    {
      "@type": "Question",
      name: "Does the system run conflict checks?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. We capture the inputs — opposing party, related parties, prior representations. You run the check.",
      },
    },
    {
      "@type": "Question",
      name: "How does the engagement letter workflow work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Once your attorney accepts representation, we handle letter delivery, signature chase, and retainer tracking. Two-day cycle instead of seven.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system handle court deadlines?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every deadline computed off a trigger. Reminders fire to the attorney, paralegal, and client. Substantive deadline judgment stays with the attorney.",
      },
    },
    {
      "@type": "Question",
      name: "How does document collection work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Through a structured client portal, not email chase. Documents requested at the right point, walked through with the client, filed into your practice management system.",
      },
    },
    {
      "@type": "Question",
      name: "How does records-request tracking work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every third-party request tracked from request through receipt. What's outstanding, who needs a follow-up — surfaced in one view.",
      },
    },
    {
      "@type": "Question",
      name: "How does scheduling coordination work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We gather availability across opposing counsel, court reporters, mediators, and experts. Propose dates. Chase confirmations. Fire reminders the day before.",
      },
    },
    {
      "@type": "Question",
      name: "Does the system file in court?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. We prepare, organise, and remind. Filing requires attorney credentials. That stays with you.",
      },
    },
    {
      "@type": "Question",
      name: "How does the system capture time?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Prompted in real time from calendar activity and matter touchpoints. Industry data: attorneys capturing time in real time bill 15–25% more.",
      },
    },
    {
      "@type": "Question",
      name: "Is this designed to operate inside attorney ethics obligations?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Built to operate inside state bar constraints — confidentiality, privilege, conflict-check workflow, UPL boundaries. Reviewed against ABA Model Rules during the build. Your bar counsel should review the deployment before go-live.",
      },
    },
    {
      "@type": "Question",
      name: "How is confidentiality protected?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Encrypted in transit and at rest. The system operates inside your practice management environment — Clio, MyCase, Smokeball. No third-party data exposure outside the systems you've already vetted.",
      },
    },
    {
      "@type": "Question",
      name: "What about IOLTA and trust accounting?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We don't touch trust accounting. Read-only integration on balances. We don't move money.",
      },
    },
    {
      "@type": "Question",
      name: "Which practice management systems do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, CosmoLex, Filevine — and most platforms US small-firm legal practices actually run.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make sure the system launches safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Built around how your firm actually runs. Tested across the five-week deployment. Your attorneys sign off on every client-facing communication before launch. Bar counsel review strongly recommended before go-live.",
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
            Intake. Deadlines. Document chase. Status updates. Billing. Handled
            by a system we build around your firm. No drafting. No advice. No
            conflict checks.
          </p>

          <ul className="rb-hero-stats" aria-label="Key family law and consumer legal metrics">
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">&lt; 60s</span>
              <span className="rb-hero-stat-label">
                Response to every new client inquiry
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">24/7</span>
              <span className="rb-hero-stat-label">
                Coverage across calls and forms
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">2–3 hrs / day</span>
              <span className="rb-hero-stat-label">
                Admin returned to each attorney
              </span>
            </li>
            <li className="rb-hero-stat">
              <span className="rb-hero-stat-num">5 weeks</span>
              <span className="rb-hero-stat-label">
                We build it. You practice law.
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
                Your attorneys are trained to draft, argue, and advise.
                They&apos;re spending half their day on intake, deadlines,
                document chase, and unpaid invoices. We handle the admin. You
                keep the law.
              </p>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={FAMILY_LAW_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every client, the same loop. Every matter, the same admin chase.
              And it all lands on attorneys who should be practising law.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              A solo attorney loses 8–12 hours a week to non-billable admin. At
              $300–$450 an hour, that&apos;s $125K–$280K a year of unrealised
              billing.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              Real-time time capture recovers another 15–25% in billing.
            </p>
            <p className="rb-aftertext" data-rb-fade="3">
              Faster retainer cycles add two days of billable work to every new
              matter.
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              For a 5-attorney firm: $750K–$1.6M in annual capacity. Recovered.
              <span className="rb-aftertext-footnote">*</span>
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              <span className="rb-aftertext-footnote">*</span> Illustrative;
              actual figures vary by billing structure, market, and matter mix.
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
                  Built around your firm. One setup. One monthly figure. No
                  per-seat pricing. Live in 5 weeks.
                </p>
                <p className="rb-split-body rb-split-body-quiet" data-rb-fade="3">
                  Built around the matters you handle, the courts you practice
                  in, and the systems you already run — Clio, MyCase,
                  PracticePanther, Smokeball, CosmoLex, Filevine.
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
              You own every system we build. No lock-in. Cancel any time.
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to your matter volume
              and firm size.
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
            </div>

            <ul className="rb-line-list" data-rb-fade="2">
              {LINE_ITEMS.map((b, i) => (
                <li key={i}>
                  <strong>{b.topic}</strong> — {b.statement}
                </li>
              ))}
            </ul>

            <p className="rb-line-close" data-rb-fade="3">
              This isn&apos;t a limitation. It&apos;s the reason the system is
              safe to deploy in a regulated practice.
            </p>
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
                  Manual
                </span>
                <span className="rb-compare-label rb-compare-label-rosebud">
                  Rosebud
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
              <p className="rb-before-after-bridge">
                Of the seven steps between a client calling and the bill being
                paid, your attorneys run two. We run the <em>other five.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>Intake missed</li>
                    <li>Documents chased manually</li>
                    <li>Status calls eating billable hours</li>
                    <li>Time reconstructed at month-end</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Every intake captured</li>
                    <li>Documents and records tracked</li>
                    <li>Status updates sent automatically</li>
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
                  <li>Solo or small firm (2–15 attorneys)</li>
                  <li>
                    Family law, estate planning, immigration, personal injury,
                    or general consumer practice
                  </li>
                  <li>
                    Your attorneys are spending 5+ hours a week on non-billable
                    admin
                  </li>
                  <li>
                    You&apos;re on Clio, MyCase, PracticePanther, Smokeball, or
                    CosmoLex
                  </li>
                  <li>
                    You want your attorneys drafting and arguing, not chasing
                    W-2s
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
                    You want a system that drafts motions, gives advice, or
                    runs conflict checks — we explicitly don&apos;t
                  </li>
                  <li>
                    You&apos;re corporate, M&amp;A, IP, or large-firm
                    litigation — different page
                  </li>
                  <li>
                    You&apos;re handling fewer than 8 active matters — the math
                    doesn&apos;t work yet
                  </li>
                  <li>
                    You&apos;re looking for legal research AI (Harvey,
                    CoCounsel) — different product category
                  </li>
                  <li>You want software to run yourself — this is a service</li>
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
                A 30-minute call. We map your operation, scope the system, and
                quote the build. You leave with a clear number and a clear
                understanding of what we won&apos;t touch.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">Duration</span>
                <p>30 minutes. Zoom. No prep.</p>
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
