"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !fired.current) {
          fired.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { value, ref };
}

export default function Receipts() {
  const hot  = useCountUp(100, 1000);
  const warm = useCountUp(79,  1200);
  const nur  = useCountUp(54,  1400);

  return (
    <section className="rb-sec" data-rb-sec aria-label="The Receipts">
      <div className="rb-topo rb-topo-3" aria-hidden="true">
        <svg viewBox="0 0 460 300" preserveAspectRatio="none">
          <path className="rb-bright" d="M -20 280 C 70 220, 140 160, 210 98" />
          <path d="M 10 290 C 100 232, 170 170, 240 112" />
          <path d="M 40 298 C 130 244, 200 182, 268 126" />
          <path d="M 70 302 C 160 254, 228 196, 296 140" />
          <path className="rb-bright" d="M 100 302 C 190 260, 256 204, 324 154" />
          <path d="M 130 300 C 220 264, 284 214, 352 168" />
          <path d="M 160 296 C 250 266, 310 220, 380 182" />
          <path className="rb-bright" d="M 192 290 C 274 266, 334 226, 406 196" />
          <path d="M 224 282 C 294 262, 358 230, 430 210" />
          <path d="M 258 272 C 314 256, 380 234, 452 220" />
        </svg>
      </div>
      <div className="rb-wrap">
        <div className="rb-head">
          <p className="rb-eyebrow rb-purple" data-rb-fade="0">
            <span className="rb-num">III</span>The receipts
          </p>
          <h2 className="rb-h2" data-rb-fade="1">
            What we actually <em>build.</em>
          </h2>
          <p className="rb-sub" data-rb-fade="2">
            No vague AI promises. The real stack, the real outputs, the real timelines.
          </p>
        </div>

        <div data-rb-fade="3">
          <div className="rb-entry rb-entry-labeled">
            <span className="rb-label">Built on</span>
            <p className="rb-value">
              Claude &middot; n8n &middot; Stripe &middot; Twilio &middot; Google Workspace
            </p>
          </div>
          <div className="rb-entry rb-entry-labeled">
            <span className="rb-label">Typical system</span>
            <p className="rb-value">
              Custom-scoped to your pipeline &middot; Multi-channel outreach &middot; 5-week deployment
            </p>
          </div>

          {/* Lead scoring with count-up */}
          <div className="rb-entry rb-entry-labeled" ref={hot.ref}>
            <span className="rb-label">Lead scoring</span>
            <div className="rb-receipts-scores">
              <div className="rb-receipts-tier">
                <span className="rb-receipts-tier-name">Hot</span>
                <span className="rb-receipts-tier-range">
                  80&ndash;<span className="rb-receipts-num">{hot.value}</span>
                </span>
              </div>
              <div className="rb-receipts-tier">
                <span className="rb-receipts-tier-name">Warm</span>
                <span className="rb-receipts-tier-range">
                  55&ndash;<span className="rb-receipts-num">{warm.value}</span>
                </span>
              </div>
              <div className="rb-receipts-tier">
                <span className="rb-receipts-tier-name">Nurture</span>
                <span className="rb-receipts-tier-range">
                  30&ndash;<span className="rb-receipts-num">{nur.value}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
