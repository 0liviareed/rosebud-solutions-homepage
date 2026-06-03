"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Intake, Engagement & Conflict Checks",
    items: [
      {
        q: "How fast does the system respond to a new inquiry?",
        a: "Under 60 seconds, every time. Industry average is two to three hours. The firm that responds first lands the retainer.",
      },
      {
        q: "Does the system run conflict checks?",
        a: "No. We capture the inputs — opposing party, related parties, prior representations. You run the check.",
      },
      {
        q: "How does the engagement letter workflow work?",
        a: "Once your attorney accepts representation, we handle letter delivery, signature chase, and retainer tracking. Two-day cycle instead of seven.",
      },
    ],
  },
  {
    label: "Deadlines, Documents, Records & Scheduling",
    items: [
      {
        q: "How does the system handle court deadlines?",
        a: "Every deadline computed off a trigger. Reminders fire to the attorney, paralegal, and client. Substantive deadline judgment stays with the attorney.",
      },
      {
        q: "How does document collection work?",
        a: "Through a structured client portal, not email chase. Documents requested at the right point, walked through with the client, filed into your practice management system.",
      },
      {
        q: "How does records-request tracking work?",
        a: "Every third-party request tracked from request through receipt. What's outstanding, who needs a follow-up — surfaced in one view.",
      },
      {
        q: "How does scheduling coordination work?",
        a: "We gather availability across opposing counsel, court reporters, mediators, and experts. Propose dates. Chase confirmations. Fire reminders the day before.",
      },
      {
        q: "Does the system file in court?",
        a: "No. We prepare, organise, and remind. Filing requires attorney credentials. That stays with you.",
      },
    ],
  },
  {
    label: "Billing, Compliance & Operations",
    items: [
      {
        q: "How does the system capture time?",
        a: "Prompted in real time from calendar activity and matter touchpoints. Industry data: attorneys capturing time in real time bill 15–25% more.",
      },
      {
        q: "Is this designed to operate inside attorney ethics obligations?",
        a: "Built to operate inside state bar constraints — confidentiality, privilege, conflict-check workflow, UPL boundaries. Reviewed against ABA Model Rules during the build. Your bar counsel should review the deployment before go-live.",
      },
      {
        q: "How is confidentiality protected?",
        a: "Encrypted in transit and at rest. The system operates inside your practice management environment — Clio, MyCase, Smokeball. No third-party data exposure outside the systems you've already vetted.",
      },
      {
        q: "What about IOLTA and trust accounting?",
        a: "We don't touch trust accounting. Read-only integration on balances. We don't move money.",
      },
      {
        q: "Which practice management systems do you integrate with?",
        a: "Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, CosmoLex, Filevine — and most platforms US small-firm legal practices actually run.",
      },
      {
        q: "How do you make sure the system launches safely?",
        a: "Built around how your firm actually runs. Tested across the five-week deployment. Your attorneys sign off on every client-facing communication before launch. Bar counsel review strongly recommended before go-live.",
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
