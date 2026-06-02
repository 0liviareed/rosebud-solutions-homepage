"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Inquiry Handling & Job Qualification",
    items: [
      {
        q: "How fast does the system respond to a new customer inquiry?",
        a: "Under 60 seconds, every time, regardless of channel or time of day. The reality of trades is that most calls land while your team is on a job — and the customer calling about an emergency boiler at 7am isn't going to wait. The system answers immediately, qualifies the job, and either books a slot, dispatches an emergency callout, or hands the conversation back to your office with full context.",
      },
      {
        q: "How does the system qualify a job before it reaches my office?",
        a: "Through structured conversation across the signals that decide whether a job is worth a quote — type of work, property type, urgency, budget range, insurance claim vs private pay, timeline, access. Emergency callouts get flagged immediately. Quote-stage enquiries get prioritised by job size and likelihood of conversion. Time-wasters get answered without ever reaching your team.",
      },
      {
        q: "How are jobs routed to the right person or trade?",
        a: "The agent reads the conversation, identifies fit — domestic vs commercial, type of work, location, urgency, complexity — and routes to the right estimator, dispatcher, or tech with full context attached. Multi-trade businesses get jobs routed to the right division. Single-trade shops get jobs routed to the right person on the team.",
      },
    ],
  },
  {
    label: "Quotes, Paperwork & Customer Communication",
    items: [
      {
        q: "How does the system chase quotes that haven't been replied to?",
        a: "Every quote sent gets followed up on a structured cadence — 24 hours, 48 hours, 7 days — with the message tone matched to your business. The “let me think about it” customer gets a nurture sequence with project photos, testimonials, and a price-anchoring conversation. Price objections get handled before they kill the job. Quotes stop sitting in inboxes unconverted.",
      },
      {
        q: "How does the system handle paperwork chase — deposits, photos, signed quotes?",
        a: "Through guided conversation, not chased over email. The system requests each document at the right point in the job lifecycle, walks the customer through what's needed, collects it, and files it into your job management system. The paperwork that used to hold up the next stage of every job gets handled the moment the job moves forward.",
      },
      {
        q: "How does the system handle \"when are you arriving\" calls and customer updates?",
        a: "Daily or job-stage updates sent automatically to every active customer — covering arrival windows, parts orders, completion timelines, and next steps. The questions that used to eat your office team's morning are answered before they're asked. Customers only ring through to your office when something genuinely needs a human.",
      },
    ],
  },
  {
    label: "Invoicing, Repeat Work & Operations",
    items: [
      {
        q: "How does the system handle invoicing and payment chase?",
        a: "Final invoices go out automatically at job completion. Payment reminders sent at the cadence that actually gets you paid — without the awkwardness of you or your office team chasing customers for late payment manually. Aged debtor reports surfaced before they become a problem, not after.",
      },
      {
        q: "How does the system bring back past customers for repeat work?",
        a: "Every completed customer gets followed up at 3 months, 6 months, and 12 months — service reminders for boilers, annual inspections, maintenance contracts, seasonal work, and the “is everything still holding up?” check-in most trades businesses never get round to. Repeat work and referrals stop being accidental and start being a system.",
      },
      {
        q: "Which job management systems do you integrate with?",
        a: "ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Workiz, Tradify, simPRO, ServiceM8, and most of the platforms trades and home services teams actually run. Customer data, conversation transcripts, job details, paperwork, and invoicing all file directly into the system in the format it expects.",
      },
      {
        q: "How do you make sure the system launches safely?",
        a: "Every workflow is built around how your office actually runs — your trades, your job types, your pricing structure, your tone of voice. We build it across a five-week deployment, you test it, you sign it off. By the time the system goes live, you know exactly what it says to your customers, how it handles edge cases, and where it escalates to a human. You're not handing over your phone. You're extending your office.",
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
