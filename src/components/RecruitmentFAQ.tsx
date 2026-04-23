"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Candidate Sourcing & Qualification",
    items: [
      {
        q: "How fast can you respond to a new candidate?",
        a: "The average recruiter takes 2–3 hours to follow up on a new enquiry. By then, two other agencies already have. Rosebud agents respond instantly — capturing availability, salary expectations, and experience level the moment a candidate makes contact. Your consultants step in only when there's someone worth speaking to.",
      },
      {
        q: "How does pre-screening work before our team touches the file?",
        a: "A consultant handling 30 live roles shouldn't spend half their day on first-stage screening. Rosebud connects to your ATS and job boards, assesses suitability against live roles, and flags who is ready to move — so by the time a consultant picks up the phone, the work is already done.",
      },
      {
        q: "How are candidates routed to the right consultant?",
        a: "Every misrouted candidate is a delayed placement. Your agent gathers role type, salary band, location, and notice period, then routes each candidate to the right consultant with full context attached. No confusion. No delays. Just qualified candidates ready to progress before the competition even responds.",
      },
    ],
  },
  {
    label: "Client Engagement & Business Development",
    items: [
      {
        q: "How quickly can we move from brief to active search?",
        a: "Every new role brief involves the same back-and-forth — job title, responsibilities, salary range, timeline, hiring manager preferences. Your agent handles the entire intake automatically and has the brief structured before a consultant picks up the phone. What used to take two days of emails takes under an hour.",
      },
      {
        q: "What stops warm clients going cold?",
        a: "Most agencies lose business not because they did a bad job — but because they went quiet. Automated follow-ups keep every client and prospect engaged after every touchpoint, progressing stalled briefs and putting your agency front of mind the moment a new hiring need surfaces. You stop reacting. You start leading.",
      },
      {
        q: "How do we see where every placement stands?",
        a: "No more end-of-week pipeline reviews that reveal a candidate dropped off three days ago. Every interaction is logged, every stage is tracked, and managers get live visibility into where briefs are stalling and where consultants need support — before a placement is lost, not after.",
      },
    ],
  },
  {
    label: "Operations & Insights",
    items: [
      {
        q: "Is this built for regulated recruitment environments?",
        a: "GDPR compliance isn't optional — and neither is getting it wrong. Every candidate interaction, data capture, and communication is structured to meet employment agency compliance requirements from the first touchpoint, across your operation and every client account you manage.",
      },
      {
        q: "What visibility do managers get across pipelines?",
        a: "When a placement slips, you need to know why — not two weeks later. Every interaction is logged with clear records of candidate conversations, qualification data, and progression. Managers get real-time transparency into pipeline activity, consultant performance, and exactly where drop-off is happening.",
      },
      {
        q: "How do you make sure the system works from day one?",
        a: "No guesswork, no surprises. Every workflow is tested and validated before launch — your agent follows approved messaging, routes candidates and clients correctly, and operates to the standard your agency is known for from day one.",
      },
    ],
  },
];

export default function RecruitmentFAQ() {
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
