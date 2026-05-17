"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Borrower Inquiry & Pre-Qualification",
    items: [
      {
        q: "How fast does the system respond to a new borrower inquiry?",
        a: "Under 60 seconds, every time, regardless of channel or time of day. The industry average is 2–3 hours — and rate-shoppers are typically comparing 3–5 lenders inside a 14-day credit pull window. By the time the average broker replies, your borrower has already had two qualifying conversations elsewhere. The system closes that gap before your competitors know there's a gap to close.",
      },
      {
        q: "How does the system pre-qualify borrowers?",
        a: "Through structured conversation across the signals that actually matter — loan purpose, property type, estimated credit, income, employment, existing debts, timeline. Strong files get routed to your top LO with full context. Marginal credit profiles get routed to a credit-improvement nurture. Your LOs stop wasting hours on borrowers who can't qualify yet.",
      },
      {
        q: "How are borrowers routed to the right loan officer?",
        a: "The agent reads the conversation, identifies fit — loan type, loan size, complexity, location, language preference — and routes to the right LO on your team with full context attached. No misrouted files, no “let me transfer you,” no delays.",
      },
    ],
  },
  {
    label: "Application, Documentation & Pipeline",
    items: [
      {
        q: "How does the system collect documentation from borrowers?",
        a: "Through guided conversation, not chased over email. The system walks borrowers through the application portal, requests each document at the right point in the loan lifecycle, and files everything straight into your LOS as it comes in. Self-employed borrowers — usually the slowest files in the pipeline — get walked through tax returns, P&L, and business bank statements without three weeks of back-and-forth. Stale docs get flagged before they expire. Conditions get worked the moment the underwriter flags them.",
      },
      {
        q: "How does the system handle status updates to borrowers, Realtors, and referral partners?",
        a: "Automatically. Daily or weekly updates sent to the borrower, both real estate agents, and the referral source — covering appraisal status, underwriting progress, conditions outstanding, and clear-to-close timeline. The “where are we?” questions that eat your morning are answered before they're asked.",
      },
      {
        q: "What happens when conditions are flagged or re-docs are needed?",
        a: "The system pings the borrower, walks them through what the underwriter needs, collects the re-doc, and files it back. The rate-lock clock gets watched automatically — extensions flagged before they're needed, not after. Loans stop falling through at week five because the gap that swallowed them is closed.",
      },
    ],
  },
  {
    label: "Compliance, Integrations & Operations",
    items: [
      {
        q: "Which LOS and CRMs do you integrate with?",
        a: "Encompass, Calyx Point, LendingPad, Surefire CRM, BNTouch, Jungo, Velocify, Total Expert, and most of the platforms US mortgage teams actually run. Borrower data, conversation transcripts, qualification details, and documentation all file directly into the system in the format it expects.",
      },
      {
        q: "Is this designed for mortgage compliance?",
        a: "Yes. Every workflow is built around RESPA, TILA, ECOA, TCPA, and fair lending requirements — including consent capture, adverse action handling, state-by-state quiet hours, and DNC filtering. Compliance is built in from the first touchpoint, not retrofitted afterwards.",
      },
      {
        q: "What visibility do branch managers and ops leaders get?",
        a: "Every conversation logged, every application tracked, every condition visible in one place. Managers see exactly what's happening across the pipeline — what's pre-approved, what's in processing, what's stuck at underwriting, where rate locks are at risk. Decisions stop being best guesses.",
      },
      {
        q: "How do you make sure the system launches safely?",
        a: "Every workflow is built around how your shop actually runs — your loan products, your investors, your overlays, your tone. We build it across a five-week deployment, you test it, you sign it off. By the time the system goes live, you know exactly what it says, how it handles edge cases, and where it escalates. You're not handing over your phone. You're extending your team.",
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

          <div className="rb-faq-items">
            {group.items.map((item, ii) => {
              const id = `${gi}-${ii}`;
              const isOpen = open.has(id);
              return (
                <div
                  key={id}
                  className={`rb-faq-item ${isOpen ? "rb-faq-item-open" : ""}`}
                >
                  <button
                    type="button"
                    className="rb-faq-question"
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${id}`}
                  >
                    <span className="rb-faq-q-text">{item.q}</span>
                    <span className="rb-faq-mark" aria-hidden="true">
                      <svg viewBox="0 0 12 12" width="12" height="12">
                        <path
                          d="M6 1.5 V10.5"
                          className="rb-faq-mark-v"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1.5 6 H10.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${id}`}
                    className="rb-faq-answer"
                    role="region"
                    aria-hidden={!isOpen}
                  >
                    <div className="rb-faq-answer-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
