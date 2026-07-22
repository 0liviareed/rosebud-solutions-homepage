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
import SplitRoles, { type SplitRole } from "@/components/SplitRoles";
import FamilyLawFAQ from "@/components/FamilyLawFAQ";
import RelatedIndustries from "@/components/RelatedIndustries";
import LegalHero from "@/components/LegalHero";
import BuildSection from "@/components/BuildSection";
import CalEmbed from "@/components/CalEmbed";

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
      <LegalHero />

      <main className="rb-content">
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
              ariaLabel="Seven roles in every family law and consumer legal deployment"
              roles={FAMILY_LAW_ROLES}
            />
          </div>

          <div className="rb-wrap">
            <p className="rb-aftertext" data-rb-fade="3">
              No lock-in. Cancel any time.
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

        {/* ===================== BUILD THE FUTURE WITH AI ===================== */}
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
