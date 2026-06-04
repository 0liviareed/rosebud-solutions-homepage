"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Borrower Inquiry & Pre-Qualification",
    items: [
      {
        q: "How fast does the system respond to a new inquiry?",
        a: "Under 60 seconds, every time. Industry average is 2–3 hours. Rate-shoppers compare 3–5 lenders inside a 14-day credit pull window — the broker who responds first wins.",
      },
      {
        q: "How does the system pre-qualify borrowers?",
        a: "Loan purpose, credit, income, employment, debts, timeline — captured in structured conversation. Strong files routed to your top LO. Marginal credit routed to nurture.",
      },
      {
        q: "How are borrowers routed to the right loan officer?",
        a: "We read the conversation, identify fit — loan type, size, complexity, language — and route to the right LO with full context.",
      },
    ],
  },
  {
    label: "Application, Documentation & Pipeline",
    items: [
      {
        q: "How does the system collect documentation?",
        a: "Through guided conversation, not email. Each document requested at the right point, filed into your LOS as it comes in. Self-employed borrowers through pre-approval in three days instead of three weeks. Stale docs flagged before they expire.",
      },
      {
        q: "How does the system handle status updates?",
        a: "Automatically. Daily or weekly updates to the borrower, both real estate agents, and the referral source. Appraisal, underwriting, conditions, clear-to-close — all answered before they're asked.",
      },
      {
        q: "What happens when conditions are flagged?",
        a: "The system pings the borrower the moment the condition fires, walks them through it, collects the re-doc, files it back. Rate-lock clocks watched automatically — extensions flagged before they're urgent.",
      },
    ],
  },
  {
    label: "Compliance, Integrations & Operations",
    items: [
      {
        q: "Which LOS and CRMs do you integrate with?",
        a: "Encompass, Calyx Point, LendingPad, Surefire CRM, BNTouch, Jungo, Velocify, Total Expert — and most platforms US mortgage teams actually run.",
      },
      {
        q: "Is this designed for mortgage compliance?",
        a: "Yes. Every workflow built around RESPA, TILA, ECOA, TCPA, and fair lending — consent capture, adverse action handling, state-by-state quiet hours, DNC filtering. Built in, not retrofitted.",
      },
      {
        q: "What visibility do branch managers and ops leaders get?",
        a: "Every conversation logged, every application tracked, every condition visible. Managers see what's pre-approved, in processing, stuck at underwriting, and where rate locks are at risk.",
      },
      {
        q: "How do you make sure the system launches safely?",
        a: "Built around how your shop runs — your loan products, investors, overlays. Five-week deployment. You test it, sign it off. By go-live, you know exactly what it says.",
      },
    ],
  },
];

export default function MortgageLendingFAQ() {
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
