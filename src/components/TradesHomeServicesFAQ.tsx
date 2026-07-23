"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Inquiry Handling & Job Qualification",
    items: [
      {
        q: "How fast does the system respond to a new inquiry?",
        a: "Under 60 seconds, every time. Most calls land while your team is on a job — the ones that ring out get a text back in seconds, qualified, then booked, dispatched, or handed back with full context.",
      },
      {
        q: "How does the system qualify a job before it reaches my office?",
        a: "Type of work, property type, urgency, budget, access — captured in conversation. Emergencies flagged. Time-wasters answered without reaching your team.",
      },
      {
        q: "How are jobs routed to the right person or trade?",
        a: "We read the conversation, identify fit, and route to the right estimator, dispatcher, or tech with full context.",
      },
    ],
  },
  {
    label: "Quotes, Paperwork & Customer Communication",
    items: [
      {
        q: "How does the system chase quotes?",
        a: "Every quote followed up on a structured cadence — 24 hours, 48 hours, 7 days. The “let me think about it” gets a nurture sequence. Price objections handled before they kill the job.",
      },
      {
        q: "How does the system handle paperwork chase?",
        a: "Through guided conversation, not email. Each document requested at the right point, walked through with the customer, filed into your system.",
      },
      {
        q: "How does the system handle “when are you arriving” messages?",
        a: "Daily or job-stage updates sent automatically. Office only involved when something genuinely needs a human.",
      },
    ],
  },
  {
    label: "Invoicing, Repeat Work & Operations",
    items: [
      {
        q: "How does the system handle invoicing and payment chase?",
        a: "Invoices out at completion. Reminders on the cadence that gets you paid. Aged debtor reports surfaced before they become a problem.",
      },
      {
        q: "How does the system bring back past customers?",
        a: "Every customer followed up at 3, 6, 12 months. Service reminders, annual inspections, next projects. Repeat work stops being accidental.",
      },
      {
        q: "Which job management systems do you integrate with?",
        a: "ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Workiz, Tradify, simPRO, ServiceM8 — and most platforms trades businesses actually run.",
      },
      {
        q: "How do you make sure the system launches safely?",
        a: "Built around how your office runs — your trades, your job types, your tone. Five-week deployment. You test it, you sign it off. By go-live, you know exactly what it says.",
      },
    ],
  },
];

export default function TradesHomeServicesFAQ() {
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
