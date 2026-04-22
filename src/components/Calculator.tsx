"use client";

import { useRef, useState } from "react";

const DATA: Record<
  string,
  Record<string, [number, number, string]>
> = {
  b2b: { uk: [720, 8314, "£"], us: [720, 11200, "$"], eu: [720, 9400, "€"] },
  aes: { uk: [640, 7100, "£"], us: [640, 9600, "$"], eu: [640, 8200, "€"] },
  mtg: { uk: [820, 12400, "£"], us: [820, 16800, "$"], eu: [820, 14100, "€"] },
  leg: { uk: [780, 13600, "£"], us: [780, 18200, "$"], eu: [780, 15400, "€"] },
  prp: { uk: [700, 9800, "£"], us: [700, 13200, "$"], eu: [700, 11100, "€"] },
  rec: { uk: [880, 11200, "£"], us: [880, 15100, "$"], eu: [880, 12700, "€"] },
  hos: { uk: [560, 6400, "£"], us: [560, 8600, "$"], eu: [560, 7300, "€"] },
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Calculator() {
  const [industry, setIndustry] = useState("b2b");
  const [location, setLocation] = useState("uk");
  const [hours, setHours] = useState(720);
  const [money, setMoney] = useState(8314);
  const [pulse, setPulse] = useState(false);
  const currentRef = useRef({ hours: 720, money: 8314 });

  const currency = DATA[industry][location][2];

  const animate = (from: number, to: number, duration: number, setter: (v: number) => void) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setter(to);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      setter(Math.round(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const onChange = (nextIndustry: string, nextLocation: string) => {
    const [h, m] = DATA[nextIndustry][nextLocation];
    setPulse(true);
    animate(currentRef.current.hours, h, 850, setHours);
    animate(currentRef.current.money, m, 900, setMoney);
    currentRef.current = { hours: h, money: m };
    window.setTimeout(() => setPulse(false), 1100);
  };

  return (
    <div
      className="rb-calc"
      data-rb-fade="3"
      role="region"
      aria-label="Impact calculator"
    >
      <div className="rb-calc-selects">
        <label>
          <span>Industry</span>
          <span className="rb-select-inline">
            <select
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                onChange(e.target.value, location);
              }}
              aria-label="Industry"
            >
              <option value="b2b">B2B Services &amp; Marketing</option>
              <option value="aes">Aesthetics &amp; Wellness</option>
              <option value="mtg">Mortgage &amp; Finance</option>
              <option value="leg">Legal Services</option>
              <option value="prp">Property &amp; Real Estate</option>
              <option value="rec">Recruitment</option>
              <option value="hos">Hospitality</option>
            </select>
          </span>
        </label>
        <label>
          <span>Location</span>
          <span className="rb-select-inline">
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                onChange(industry, e.target.value);
              }}
              aria-label="Location"
            >
              <option value="uk">United Kingdom</option>
              <option value="us">United States</option>
              <option value="eu">Europe</option>
            </select>
          </span>
        </label>
      </div>

      <div className="rb-calc-metric">
        <div className={`rb-calc-num ${pulse ? "rb-pulse" : ""}`}>
          <span className="rb-num-prefix">~</span>
          <span>{hours.toLocaleString()}</span>
        </div>
        <div className="rb-calc-label">Hours saved per year</div>
      </div>

      <div className="rb-calc-rule" />

      <div className="rb-calc-metric">
        <div className={`rb-calc-num ${pulse ? "rb-pulse" : ""}`}>
          <span className="rb-num-prefix">~</span>
          <span className="rb-num-cur">{currency}</span>
          <span>{money.toLocaleString()}</span>
        </div>
        <div className="rb-calc-label">Saved per year</div>
      </div>

      <p className="rb-calc-foot">
        Figures based on typical deployments: 1,000 leads per batch, 30 outreach
        emails per day. Actual savings vary by industry and location.
      </p>
    </div>
  );
}
