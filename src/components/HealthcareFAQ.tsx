"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Patient Enquiry & Booking",
    items: [
      {
        q: "How do you handle treatment enquiries and pricing questions instantly?",
        a: "Conversational agents handle high-volume patient questions — treatment options, pricing ranges, suitability, finance enquiries — and capture qualifying signals like treatment need, urgency, and timeline. Patients get an immediate answer; your front desk only handles the conversations that need a human.",
      },
      {
        q: "How is enquiry intake and qualification automated?",
        a: "The agent connects to your practice management system — Dentally, SOE, Pabau, Open Dental, Aesthetic Nurse Software — to collect patient details, assess suitability, and guide them through the booking process. It identifies whether someone is comparing clinics, ready to book, or needs clinical input — so your team spends time on the patients most likely to convert.",
      },
      {
        q: "How are urgent cases routed to the right person?",
        a: "The agent reads the conversation, identifies urgency, and escalates to the right person without delay. A dental emergency at 9pm or a post-treatment patient with a concern reaches a clinician with full context attached, while routine bookings work themselves out.",
      },
    ],
  },
  {
    label: "Patient Engagement & Recall",
    items: [
      {
        q: "How do you support consultation prep and records collection?",
        a: "The agent collects medical history, pre-treatment photos, consent documentation, and finance details before the appointment — preparing structured data that lands in your PMS. The clinician walks into the appointment with the full picture. No repeated questions.",
      },
      {
        q: "How are recall and lapsed-patient outreach managed?",
        a: "Recall sequences run by treatment type — three-month aesthetic top-ups, six-month hygiene checks, twelve-month ortho reviews — plus the sequenced touchpoints across multi-visit courses like Profhilo or laser hair removal. Replies get handled in-conversation. Appointments get booked. The patients you assumed went elsewhere end up back in your diary.",
      },
      {
        q: "How do you reduce no-shows and handle aftercare?",
        a: "Reminders go out at the cadence that actually moves the no-show number, reschedules are handled the moment a patient flags one, and aftercare is sequenced from the appointment itself. Patients experience a clinic that remembers them and follows through.",
      },
    ],
  },
  {
    label: "Operations & Insights",
    items: [
      {
        q: "Is this designed for regulated healthcare environments?",
        a: "Systems are built to support the regulatory requirements of dental, aesthetic, and private healthcare environments — including consent capture, data handling, and clinical escalation — while respecting clinical decision-making boundaries.",
      },
      {
        q: "What visibility do practice managers get across patient communications?",
        a: "Every conversation logged, every booking tracked, every follow-up visible in one place. Practice managers see exactly what's happening across patient communications — what's booked, what's pending, what's been quoted, where revenue is sitting in the funnel. Decisions stop being best guesses.",
      },
      {
        q: "How do you make sure the system launches safely?",
        a: "Every workflow is built around how your practice actually runs — your treatment list, your finance options, your booking rules, your tone. We build it across a five-week deployment, you test it, you sign it off. By the time the agent goes live, you know exactly what it says, how it handles edge cases, and where it escalates. You're not handing over the front desk. You're extending it.",
      },
    ],
  },
];

export default function HealthcareFAQ() {
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
