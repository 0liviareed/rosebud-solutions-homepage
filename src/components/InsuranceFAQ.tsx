"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Lead Management & Qualification",
    items: [
      {
        q: "How do you handle policy inquiries and coverage questions instantly?",
        a: "Conversational agents manage high-volume client questions — from coverage details and policy options to pricing ranges and documentation requirements. Prospects receive immediate answers while the system captures key qualification signals such as coverage needs, location, and timeline, reducing friction at the top of the funnel.",
      },
      {
        q: "How is lead intake and pre-qualification automated?",
        a: "Connect your agent to your CRM and quoting tools to collect prospect details, assess eligibility, and guide them through the early stages of the buying process. The system can identify whether someone is shopping, comparing policies, or ready to speak with an agent, ensuring licensed staff spend time on the most qualified opportunities.",
      },
      {
        q: "How are prospects routed to the right advisor at the right moment?",
        a: "Agents gather relevant information such as coverage type, budget range, household details, and renewal timelines, then route qualified leads to the appropriate agent or team. This prevents wasted conversations and dramatically improves close rates by ensuring prospects reach specialists prepared with context.",
      },
    ],
  },
  {
    label: "Client Engagement & Follow-Up",
    items: [
      {
        q: "How do you support quote preparation and application workflows?",
        a: "AI agents collect required details for quotes, confirm information accuracy, and prepare structured data for underwriting or quoting systems. This reduces repetitive data entry and shortens the time between initial interest and receiving a policy proposal.",
      },
      {
        q: "How are follow-ups managed and undecided prospects nurtured?",
        a: "Automated follow-ups keep prospects engaged after their first inquiry — answering additional questions, reminding them to complete applications, and surfacing new policy options when relevant. Agencies maintain momentum without requiring agents to manually chase every lead.",
      },
      {
        q: "How do agents assist with policy updates and service requests?",
        a: "From coverage adjustments and renewal reminders to document requests and policy explanations, AI agents handle routine servicing tasks so teams can focus on advisory work and closing business.",
      },
    ],
  },
  {
    label: "Operations & Insights",
    items: [
      {
        q: "Is this designed for regulated insurance environments?",
        a: "Systems are structured to support U.S. insurance regulatory requirements, ensuring conversations and data collection follow appropriate compliance standards while respecting licensing boundaries.",
      },
      {
        q: "What visibility do agencies get across interactions?",
        a: "Every interaction is logged with clear records of inquiries, qualification data, and next steps. Managers gain transparency into pipeline activity, lead quality, and operational performance.",
      },
      {
        q: "How do you make sure workflows launch safely?",
        a: "Workflows are tested and validated before launch to ensure the agent follows approved scripts, routes prospects correctly, and supports compliance requirements across client interactions.",
      },
    ],
  },
];

export default function InsuranceFAQ() {
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
