"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { label: string; items: FAQItem[] };

const GROUPS: FAQGroup[] = [
  {
    label: "Lead Response & Qualification",
    items: [
      {
        q: "How fast does the system respond to a new lead?",
        a: "Under 60 seconds, every time, regardless of channel or time of day. The industry average is 2–3 hours. By the time the average agent replies, your prospect has already talked to two other agents and toured a property with whichever one called first. The system closes that gap before your competitors know there's a gap to close.",
      },
      {
        q: "How does the system qualify buyers and sellers?",
        a: "Through structured conversation across the qualifying signals that actually matter — pre-approval status, budget, timeline, motivation, whether they're working with another agent. Hot leads get routed straight to your closer with full context. Long-tail prospects get routed to nurture. Your agents stop wasting hours on buyers six months from a mortgage application.",
      },
      {
        q: "How are leads routed to the right agent on my team?",
        a: "The agent reads the conversation, identifies fit — luxury, first-time buyer, investor, rental, location — and routes to the right person on your team with full context attached. No misrouted leads, no “let me transfer you,” no delays.",
      },
    ],
  },
  {
    label: "Showings, Listings & Calendar",
    items: [
      {
        q: "How does the system book showings and listing appointments?",
        a: "Slots offered against live agent availability, confirmed in real time, written into your CRM. Buyers book showings directly through the conversation. Sellers book listing appointments. Your calendar fills while you're at a closing.",
      },
      {
        q: "How do you reduce no-shows on showings?",
        a: "Reminders sent at the cadence that actually moves the no-show number, reschedules handled the moment a buyer flags one, day-of confirmations sent automatically. Your showings stay on the calendar without anyone manually working it.",
      },
      {
        q: "How does long-tail nurture actually work?",
        a: "Not a drip sequence. The system stays in conversation with 6-to-12-month buyers across SMS, email, and voice — adjusting cadence based on engagement, pulling in market updates and listings that match their criteria, and routing back to your closer the moment a buying signal fires. The seller who said “maybe next spring” comes back to you, not the agent they talked to once.",
      },
    ],
  },
  {
    label: "CRM, Compliance & Operations",
    items: [
      {
        q: "Which CRMs do you integrate with?",
        a: "Follow Up Boss, kvCORE, Sierra Interactive, Chime, BoomTown, LionDesk, Wise Agent, Realvolve, and most of the platforms US real estate teams actually run. Lead data, conversation transcripts, qualification details, and next steps all file directly into the CRM in the format it expects.",
      },
      {
        q: "Is this designed for TCPA compliance?",
        a: "Yes. Every workflow respects TCPA consent requirements, DNC filtering, and quiet hours by state. The system is built for US real estate compliance from the first touchpoint — not retrofitted afterwards.",
      },
      {
        q: "What visibility do team leaders get?",
        a: "Every conversation logged, every booking tracked, every follow-up visible in one place. Team leaders see exactly what's happening across lead communications — what's booked, what's pending, where deals are sitting in the funnel. Decisions stop being best guesses.",
      },
      {
        q: "How do you make sure the system launches safely?",
        a: "Every workflow is built around how your team actually runs — your service area, your price points, your specialties, your tone. We build it across a five-week deployment, you test it, you sign it off. By the time the system goes live, you know exactly what it says, how it handles edge cases, and where it escalates. You're not handing over your phone. You're extending your team.",
      },
    ],
  },
];

export default function RealEstateFAQ() {
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
