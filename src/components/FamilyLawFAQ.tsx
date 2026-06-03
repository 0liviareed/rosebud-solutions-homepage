"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Intake, Engagement & Conflict Checks",
    items: [
      {
        q: "How fast does the system respond to a new client inquiry?",
        a: "Under 60 seconds, every time, regardless of channel or time of day. The reality of consumer legal practice is that potential clients call multiple firms — and the firm that responds first lands a disproportionate share of retainers. The system answers immediately, captures matter details, gathers conflict-check inputs for your team's review, and either books a consultation or hands the conversation back to your attorney with full context.",
      },
      {
        q: "Does the system run conflict checks?",
        a: "No. The system captures the data a conflict check needs — opposing party names, related parties, prior representations, jurisdictional details — and prepares it for your team to run in your practice management system. The check itself is a human decision. We don't touch that.",
      },
      {
        q: "How does the engagement letter workflow work?",
        a: "Once your attorney has run the conflict check and accepted representation, the system handles engagement letter delivery, e-signature chase, and retainer payment tracking. The seven-day gap between “we want to hire you” and “you can start working” typically collapses to two. The decision to accept representation always stays with the attorney.",
      },
    ],
  },
  {
    label: "Deadlines, Documents, Records & Scheduling",
    items: [
      {
        q: "How does the system handle court deadlines and statute clocks?",
        a: "Every deadline gets computed off a trigger — file date plus response window, serve date plus discovery period, statute clock running from incident date. Reminders fire to the attorney, paralegal, and client on a cadence that prevents missed dates. The system flags timing risk before it becomes a problem — but the substantive deadline judgment remains with the attorney.",
      },
      {
        q: "How does document collection from clients work?",
        a: "Through a structured client portal and guided conversation, not email chase. Financial disclosures, tax returns, custody documents, prior orders, identification — the system requests each document at the right point in the matter, walks the client through what's needed, collects it, and files it into your practice management system. Discovery materials, sensitive financials, and privileged communications all handled inside the portal — no email exposure.",
      },
      {
        q: "How does records-request tracking work?",
        a: "Every third-party request — school records, medical records, subpoenaed financials, employment records, expert reports — gets tracked from request through receipt. What was sent, when, to whom, what's outstanding, who needs a follow-up. The dashboard answers the question every paralegal asks at 4pm on a Friday before a discovery deadline: what's still missing?",
      },
      {
        q: "How does scheduling coordination work for depositions and hearings?",
        a: "The system gathers availability from opposing counsel's office, court reporters, mediators, and expert witnesses through structured outreach — then proposes dates, sends invites, chases confirmations, and fires reminders the day before. The four-calendar alignment that used to take a paralegal a full day collapses to one round of structured messages.",
      },
      {
        q: "Does the system file documents in court?",
        a: "No. The system can prepare filings, organise exhibits, track deadlines, and remind your team when filings are due. The actual filing — DC, federal, state — requires attorney credentials, review, and judgment. We don't touch that.",
      },
    ],
  },
  {
    label: "Billing, Compliance & Operations",
    items: [
      {
        q: "How does the system capture time and handle billing?",
        a: "Time entries are prompted in real time from calendar activity, document drafting, client communication, and matter touchpoints — captured the moment work happens, not reconstructed at month-end. Industry data shows attorneys capturing time in real time bill 15–25% more than attorneys reconstructing later. Invoices generate on the cadence that fits your firm; payment reminders fire automatically without your office team making the awkward call.",
      },
      {
        q: "Is this designed to operate inside attorney ethics obligations?",
        a: "The system is built to operate inside the constraints of state bar ethics rules — including confidentiality obligations, the structural integrity of attorney-client privilege, the conflict-check workflow, and unauthorised practice of law boundaries. Every workflow is reviewed against ABA Model Rules and state-specific equivalents during the build. Your bar counsel should review the deployment before go-live; we build it to make that review straightforward.",
      },
      {
        q: "How is client confidentiality protected?",
        a: "Every client communication is encrypted in transit and at rest. The system operates inside your practice management environment — Clio, MyCase, Smokeball, CosmoLex — meaning client data sits in the platform you've already vetted for confidentiality. No third-party data exposure outside the systems you already use.",
      },
      {
        q: "What about IOLTA and trust accounting?",
        a: "The system tracks retainer payments and earned-fee invoicing, but does not touch trust accounting directly. IOLTA reconciliation remains a function of your accountant and practice management system. Where we integrate, we integrate read-only on trust account balances — we don't move money.",
      },
      {
        q: "Which practice management systems do you integrate with?",
        a: "Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, CosmoLex, Filevine, and most of the platforms US small-firm legal practices actually run. Client data, conversation transcripts, document uploads, time entries, and matter activity all file directly into the system in the format it expects.",
      },
      {
        q: "How do you make sure the system launches safely?",
        a: "Every workflow is built around how your firm actually runs — your matter types, your courts, your jurisdiction, your tone of voice. We build it across a five-week deployment, your team tests it, and your attorneys sign off on every client-facing communication before it goes live. We strongly recommend bar counsel review of the deployment before launch, and we build to make that review straightforward.",
      },
    ],
  },
];

export default function FamilyLawFAQ() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="rb-faq">
      {GROUPS.map((group, gi) => (
        <div key={gi} className="rb-faq-group">
          <p className="rb-faq-group-label">
            <span className="rb-faq-group-num" aria-hidden="true">
              {["i", "ii", "iii"][gi]}
            </span>
            <span>{group.label}</span>
          </p>
          {group.items.map((item, ii) => {
            const id = `${gi}-${ii}`;
            const isOpen = open.has(id);
            return (
              <button
                key={ii}
                type="button"
                className={`rb-faq-row${isOpen ? " rb-faq-row-open" : ""}`}
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
              >
                <span className="rb-faq-q">
                  <span className="rb-faq-q-text">{item.q}</span>
                  <span className="rb-faq-chev" aria-hidden="true">
                    <svg viewBox="0 0 12 12" width="12" height="12">
                      <path
                        d="M3 4.5 L6 8 L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </span>
                {isOpen && <span className="rb-faq-a">{item.a}</span>}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
