"use client";

import { useState } from "react";

type Card = {
  num: string;
  label: string;
  body: string;
};

const CARDS: Card[] = [
  {
    num: "I",
    label: "The Build",
    body: "A live, operational system in five weeks. Discovered, configured, deployed, and integrated with the tools you already run. Your team is five Mondays away from running it.",
  },
  {
    num: "II",
    label: "The Team",
    body: "A team running the system on your behalf. Day-to-day operation, refinement as you grow, and the work the system produces handled for you — so the only thing your team touches is the work that needs them.",
  },
  {
    num: "III",
    label: "The Scope",
    body: "Five to seven roles, custom-built around your operation, working as one system. Not a tool you configure. A team you don't have to hire.",
  },
];

export default function PricingCardsDrawer() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div className="rb-pricing-drawers">
      {CARDS.map((card, i) => {
        const isOpen = open.has(i);
        return (
          <div
            key={card.num}
            className={`rb-pricing-drawer ${
              isOpen ? "rb-pricing-drawer-open" : ""
            }`}
          >
            <button
              type="button"
              className="rb-pricing-drawer-trigger"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`rb-pricing-body-${i}`}
            >
              <span className="rb-pricing-drawer-num">{card.num}</span>
              <span className="rb-pricing-drawer-label">{card.label}</span>
              <span className="rb-pricing-drawer-mark" aria-hidden="true">
                <svg viewBox="0 0 12 12" width="12" height="12">
                  <path
                    d="M6 1.5 V10.5"
                    className="rb-pricing-drawer-mark-v"
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
              id={`rb-pricing-body-${i}`}
              className="rb-pricing-drawer-body"
              role="region"
              aria-hidden={!isOpen}
            >
              <div className="rb-pricing-drawer-body-inner">
                <p>{card.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
