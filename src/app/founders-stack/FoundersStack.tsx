"use client";

import LiquidBackground from "@/components/LiquidBackground";

const AVATAR_SRC =
  "data:image/jpeg;base64,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";

const CHECKOUT_URL =
  "https://gumroad.com/checkout?_gl=1*1aamj7a*_ga*NTg0MDY0NjI5LjE3NzUyNjI3NjA.*_ga_6LJN6D94N6*czE3NzUyNjI3NjAkbzEkZzEkdDE3NzUyNjI3NjMkajU3JGwwJGgw";

const FEATURES: {
  title: string;
  body: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Income & Expenses",
    body: "Log all income sources and expenses monthly. Net profit calculated automatically across 12 months plus an annual total.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4f86f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Budget & Spending Tracker",
    body: "Set budgets per category, track actual spend vs plan, flags when you're over, calculates what's left.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4f86f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M6 8h4M6 11h6" />
      </svg>
    ),
  },
  {
    title: "Wealth Allocation Tool",
    body: "You decide the % — investments, savings, taxes, sinking funds. Enter net profit and it distributes automatically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4f86f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Net Worth Tracker",
    body: "Assets, liabilities, net worth month by month. Know exactly what you own, what you owe, and whether you're growing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4f86f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: "Milestone Goals",
    body: "Set financial and business goals with target dates and amounts. Track status from Not Started to Achieved.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4f86f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Wish List & Unlock System",
    body: "Shop without guilt. Set a fund target — the sheet tells you exactly when you've earned it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4f86f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "8 Income Streams + Business Expenses",
    body: "Track each stream separately. See which ones are performing. Detailed expense breakdown across 7 business categories.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4f86f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const INCLUDED: string[] = [
  "Income & Expenses (12 months + annual)",
  "Budget & Spending Tracker",
  "Wealth Allocation Tool",
  "Net Worth Tracker",
  "Milestone Goals",
  "Wish List & Unlock System",
  "8 Income Streams tracker",
  "Business Expenses (7 categories)",
  "Currency settings (£, $, €)",
  "Full setup instructions",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none">
      <path
        d="M2 5l2.5 2.5L8 3"
        stroke="#4f86f7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FoundersStack() {
  return (
    <div className="fs-root">
      <LiquidBackground />

      <div className="fs-page">
        {/* LEFT — sales copy */}
        <div className="fs-left">
          <div className="fs-founder-row">
            <div className="fs-founder-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={AVATAR_SRC} alt="Jay Okojie" />
            </div>
            <div>
              <div className="fs-founder-name">Jay Okojie</div>
              <a
                className="fs-founder-handle"
                href="https://www.instagram.com/jayokojie/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @jayokojie
              </a>
            </div>
          </div>

          <div className="fs-badge">
            <div className="fs-badge-dot" />
            <span>Google Sheets &middot; Instant Download</span>
          </div>

          <h1 className="fs-headline">
            Stop guessing where
            <br />
            your money <em>actually</em> went.
          </h1>

          <p className="fs-subhead">
            Learning about wealth and actually <em>implementing</em> wealth
            moves create two very different outcomes. The Founder&rsquo;s
            Financial Stack gives you the system to do both — personal and
            business finances, in one place.
          </p>

          <div className="fs-features">
            {FEATURES.map((f, i) => (
              <div key={i} className="fs-feature">
                <div className="fs-feature-icon">{f.icon}</div>
                <div className="fs-feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.body}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="fs-sheets-note">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#7a9bc8" strokeWidth="1.5" />
              <path d="M3 9h18M9 3v18" stroke="#7a9bc8" strokeWidth="1.5" />
            </svg>
            Designed exclusively for Google Sheets &middot; Available in £, $, and €
          </div>

          <div className="fs-social-proof">
            <div className="fs-star-row" aria-hidden="true">★★★★★</div>
            <span>Built for founders who are serious about building real wealth</span>
          </div>
        </div>

        {/* RIGHT — checkout */}
        <div className="fs-right">
          <div className="fs-checkout-card">
            <div className="fs-price-row">
              <div className="fs-price">£27</div>
              <div className="fs-price-sub">one-time</div>
            </div>
            <div className="fs-price-desc">
              The Founder&rsquo;s Financial Stack &middot; Instant Google Sheets access
            </div>

            <div className="fs-included-title">What&rsquo;s included</div>
            <ul className="fs-included-list">
              {INCLUDED.map((item, i) => (
                <li key={i}>
                  <span className="fs-check">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="fs-cta-btn"
            >
              Get Instant Access &rarr;
            </a>
            <div className="fs-cta-sub">
              Secure checkout &middot; Instant delivery to your inbox
            </div>

            <div className="fs-guarantee">
              <div className="fs-guarantee-icon" aria-hidden="true">🛡️</div>
              <div className="fs-guarantee-text">
                <strong>Built for founders, by a founder</strong>
                <span>
                  This is the exact system Jay uses to track personal and
                  business finances in one place. No fluff, no filler.
                </span>
              </div>
            </div>

            <div className="fs-ls-note">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#a8c0d8" strokeWidth="1.5" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#a8c0d8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Powered by Lemon Squeezy &middot; VAT included for EU buyers
            </div>
          </div>
        </div>
      </div>

      <div className="fs-page-footer">
        <span className="fs-footer-text">Follow Jay</span>
        <a
          className="fs-social-link"
          href="https://www.instagram.com/jayokojie/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#3a5a9a" strokeWidth="1.7" />
            <circle cx="12" cy="12" r="4.2" stroke="#3a5a9a" strokeWidth="1.7" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="#3a5a9a" />
          </svg>
        </a>
        <a
          className="fs-social-link"
          href="https://www.tiktok.com/@jayokojie"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12.5a4 4 0 1 0 4 4V4.5a5.5 5.5 0 0 0 5.5 5.5"
              stroke="#3a5a9a"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <span className="fs-footer-text">&copy; 2026 Jay Okojie</span>
      </div>

      <style>{`
        .fs-root {
          position: relative;
          min-height: 100vh;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          color: #0a1b40;
          background: #d1e2fb;
          overflow-x: hidden;
        }

        .fs-page {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 32px;
          gap: 32px;
          align-items: start;
        }

        /* Left column */
        .fs-left {
          display: flex;
          flex-direction: column;
          padding-right: 16px;
          animation: fsFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }

        .fs-founder-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }
        .fs-founder-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255,255,255,0.95);
          box-shadow: 0 8px 32px rgba(79,134,247,0.28), 0 0 0 1px rgba(79,134,247,0.12);
          flex-shrink: 0;
        }
        .fs-founder-avatar img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
        .fs-founder-name {
          font-size: 15px;
          font-weight: 600;
          color: #0a1b40;
        }
        .fs-founder-handle {
          font-size: 13px;
          color: #7a9bc8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .fs-founder-handle:hover { color: #4f86f7; }

        .fs-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(230, 242, 255, 0.48) 100%
          );
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 100px;
          padding: 5px 14px 5px 9px;
          margin-bottom: 20px;
          width: fit-content;
          box-shadow:
            0 2px 10px rgba(79, 134, 247, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        .fs-badge-dot {
          width: 7px; height: 7px;
          background: #4f86f7;
          border-radius: 50%;
          animation: fsPulse 2.4s ease-in-out infinite;
        }
        .fs-badge span {
          font-size: 11px;
          font-weight: 600;
          color: #1a4fd6;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        @keyframes fsPulse {
          0%, 100% { opacity: 1;    transform: scale(1);    }
          50%      { opacity: 0.38; transform: scale(0.72); }
        }

        .fs-headline {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 700;
          color: #0a1b40;
          line-height: 1.12;
          letter-spacing: -0.035em;
          margin: 0 0 18px;
        }
        .fs-headline em {
          font-style: italic;
          font-weight: 300;
          color: #4f86f7;
        }

        .fs-subhead {
          font-size: 16px;
          color: #3d5a80;
          line-height: 1.7;
          margin: 0 0 36px;
          max-width: 480px;
        }
        .fs-subhead em { color: #1a4fd6; font-style: italic; font-weight: 500; }

        /* Feature list — glass cards */
        .fs-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
        }
        .fs-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.52) 0%,
            rgba(230, 242, 255, 0.32) 100%
          );
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow:
            0 2px 10px rgba(79, 134, 247, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition:
            background 0.3s cubic-bezier(0.16,1,0.3,1),
            transform 0.3s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.3s cubic-bezier(0.16,1,0.3,1),
            border-color 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .fs-feature:hover {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.72) 0%,
            rgba(230, 242, 255, 0.48) 100%
          );
          transform: translateX(4px);
          border-color: rgba(79, 134, 247, 0.3);
          box-shadow:
            0 6px 20px rgba(79, 134, 247, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        .fs-feature-icon {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: rgba(79, 134, 247, 0.12);
          border: 1px solid rgba(79, 134, 247, 0.16);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .fs-feature-icon svg { width: 17px; height: 17px; }
        .fs-feature-text strong {
          display: block;
          font-size: 13.5px;
          font-weight: 600;
          color: #0a1b40;
          margin-bottom: 2px;
        }
        .fs-feature-text span {
          font-size: 12.5px;
          color: #3d5a80;
          line-height: 1.5;
        }

        .fs-sheets-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #7a9bc8;
          font-style: italic;
          margin-bottom: 32px;
        }
        .fs-sheets-note svg { width: 16px; height: 16px; flex-shrink: 0; }

        .fs-social-proof {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #3d5a80;
        }
        .fs-star-row {
          color: #f5a623;
          letter-spacing: 1px;
          font-size: 14px;
        }

        /* Right column — checkout card */
        .fs-right {
          position: sticky;
          top: 48px;
          animation: fsFadeUp 0.8s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }

        .fs-checkout-card {
          position: relative;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.62) 0%,
            rgba(230, 242, 255, 0.38) 100%
          );
          backdrop-filter: blur(48px) saturate(180%);
          -webkit-backdrop-filter: blur(48px) saturate(180%);
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          border-radius: 28px;
          padding: 36px 36px 32px;
          box-shadow:
            0 4px 6px rgba(50,100,220,0.06),
            0 12px 40px rgba(50,100,220,0.13),
            0 32px 80px rgba(50,100,220,0.09),
            0 1px 0 rgba(255,255,255,1) inset;
        }

        .fs-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 6px;
        }
        .fs-price {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: #0a1b40;
          letter-spacing: -0.04em;
        }
        .fs-price-sub {
          font-size: 13px;
          color: #7a9bc8;
        }
        .fs-price-desc {
          font-size: 13px;
          color: #3d5a80;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(79, 134, 247, 0.12);
        }

        .fs-included-title {
          font-size: 11px;
          font-weight: 600;
          color: #7a9bc8;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .fs-included-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin: 0 0 28px;
          padding: 0;
        }
        .fs-included-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: #3d5a80;
        }
        .fs-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: rgba(79, 134, 247, 0.12);
          border: 1px solid rgba(79, 134, 247, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .fs-check svg { width: 10px; height: 10px; }

        .fs-cta-btn {
          display: block;
          width: 100%;
          background: linear-gradient(180deg, #142658 0%, #0a1b40 100%);
          color: #ffffff;
          border: 1px solid rgba(79, 134, 247, 0.3);
          border-radius: 12px;
          padding: 16px 24px;
          font-size: 15px;
          font-weight: 700;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.01em;
          text-align: center;
          text-decoration: none;
          box-shadow:
            0 6px 22px rgba(10,27,64,0.3),
            0 12px 40px rgba(79,134,247,0.18),
            inset 0 1px 0 rgba(255,255,255,0.08);
          transition:
            background 0.2s,
            transform 0.15s,
            box-shadow 0.2s,
            border-color 0.2s;
          margin-bottom: 14px;
        }
        .fs-cta-btn:hover {
          background: linear-gradient(180deg, #1a3168 0%, #0f2552 100%);
          border-color: rgba(79, 134, 247, 0.55);
          transform: translateY(-2px);
          box-shadow:
            0 10px 32px rgba(10,27,64,0.42),
            0 18px 56px rgba(79,134,247,0.32),
            inset 0 1px 0 rgba(255,255,255,0.14);
        }
        .fs-cta-btn:active { transform: translateY(0); }

        .fs-cta-sub {
          text-align: center;
          font-size: 12px;
          color: #7a9bc8;
          margin-bottom: 22px;
        }

        .fs-guarantee {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: linear-gradient(
            180deg,
            rgba(240, 246, 255, 0.6) 0%,
            rgba(220, 235, 255, 0.4) 100%
          );
          backdrop-filter: blur(8px);
          border: 1px solid rgba(79, 134, 247, 0.18);
          border-radius: 12px;
          padding: 12px 14px;
        }
        .fs-guarantee-icon {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .fs-guarantee-text strong {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          color: #0a1b40;
          margin-bottom: 2px;
        }
        .fs-guarantee-text span {
          font-size: 12px;
          color: #7a9bc8;
          line-height: 1.5;
        }

        .fs-ls-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 16px;
          font-size: 11.5px;
          color: #7a9bc8;
        }
        .fs-ls-note svg { width: 14px; height: 14px; }

        /* Footer */
        .fs-page-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 0 32px 40px;
        }
        .fs-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .fs-social-link:hover {
          background: rgba(255, 255, 255, 0.85);
          transform: translateY(-2px);
        }
        .fs-social-link svg { width: 15px; height: 15px; display: block; }
        .fs-footer-text { font-size: 12px; color: rgba(50, 80, 140, 0.6); }

        @keyframes fsFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @media (max-width: 840px) {
          .fs-page {
            grid-template-columns: 1fr;
            padding: 32px 20px;
            gap: 24px;
          }
          .fs-right { position: static; top: auto; }
          .fs-headline { font-size: clamp(26px, 7vw, 36px); }
          .fs-checkout-card { padding: 28px 24px 26px; }
        }
      `}</style>
    </div>
  );
}
