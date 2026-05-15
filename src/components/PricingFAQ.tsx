"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "How the pricing works",
    items: [
      {
        q: "How is pricing structured?",
        a: "Every engagement has two components: a one-time setup fee covering the build, and a monthly retainer covering the team running the system on your behalf. The exact figures are scoped on the demo call against your enquiry volume and workflow complexity.",
      },
      {
        q: "Why isn't there a price on this page?",
        a: "Every operation we build is scoped to the business we're building it for. A two-person dental practice and a fifteen-consultant recruitment agency need different systems, different integrations, and different operational load on our side. Templated pricing would mean templated systems.",
      },
      {
        q: "What determines the retainer figure?",
        a: "Enquiry volume, number of integrations, workflow complexity, and the operational load of running the system on your behalf. A clinic handling 200 enquiries a month sits at one tier; an agency running six live desks at high volume sits at another.",
      },
    ],
  },
  {
    label: "What working with us looks like",
    items: [
      {
        q: "What happens in the five-week build?",
        a: "Week one is discovery — we map your operation, integrations, and the workflows we're building. Weeks two to four are configuration and integration. Week five is testing and sign-off. On the Monday of week six, the system is live and running against your business.",
      },
      {
        q: "What's expected of my team during the build?",
        a: "A weekly check-in with whoever owns the operation on your side, access to the tools we're integrating with, and sign-off on the workflows before they go live. After kickoff week, expect to spend two to three hours a week on the build — not more.",
      },
      {
        q: "Who actually runs the system once it's live?",
        a: "Our team. The retainer covers day-to-day operation, refinement as your business evolves, and the work the system produces. Your team handles the work that needs them — closing deals, treating patients, advising clients.",
      },
    ],
  },
  {
    label: "Ownership, risk, and exit",
    items: [
      {
        q: "Do I own the system?",
        a: "Yes. Full access, full credentials, full data. The IP and infrastructure sit in your accounts. We operate it during the engagement; you own it before, during, and after.",
      },
      {
        q: "Is there a minimum term?",
        a: "Twelve months. The system needs time to learn your data, refine its logic, and produce compounding results. We don't take on engagements where the client expects to evaluate the work inside thirty days — that's not how operational systems work.",
      },
      {
        q: "What happens after the twelve-month term?",
        a: "The engagement renews on a rolling monthly basis. Continue, scale up, scale down, or end with thirty days' notice after the initial term. The system itself stays yours either way.",
      },
      {
        q: "What if it doesn't work?",
        a: "Every workflow is built and signed off with you before it goes live — so by the time the system is operating, you've already approved exactly what it does. If something needs refinement after launch, the retainer covers that. The “doesn't work” scenario most clients worry about is “what if it doesn't deliver enough”; in that case we're already inside a system you own, with a team operating it, and we adjust scope at the quarterly review.",
      },
    ],
  },
];

export default function PricingFAQ() {
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
