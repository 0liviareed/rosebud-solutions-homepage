"use client";

// Rosebud Solutions — "Voices" section (sitewide testimonials), redesigned as a
// multi-card carousel. Drop-in replacement: same { voices } prop contract and
// same VOICES data, so every call site (homepage + industry pages) is unchanged
// and the testimonial content is identical. Adapted to the design system
// (Cormorant / DM Sans, system purple) the same way the industry heroes were.
//
// The page sections already render the "Voices" eyebrow, so this component
// renders only the carousel chrome (arrows + cards + counter/dots) — no internal
// eyebrow or title, to avoid duplicating headers or introducing new copy.

import { useState, useRef, useEffect, useCallback } from "react";
import { VOICES, type Voice } from "./voices-data";

const GAP = 22;

function initials(name = ""): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

export default function Voices({ voices = VOICES }: { voices?: Voice[] } = {}) {
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [reduced, setReduced] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  const step = useCallback(() => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>(".rbv-card");
    return card ? card.offsetWidth + GAP : 380;
  }, []);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / step());
    setActive(Math.max(0, Math.min(voices.length - 1, i)));
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, [step, voices.length]);

  useEffect(() => {
    sync();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const go = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * step(), behavior: reduced ? "auto" : "smooth" });
  };

  const toCard = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * step(), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="rbv">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="rbv-controls">
        <div className="rbv-arrows">
          <button
            type="button"
            className="rbv-arrow"
            onClick={() => go(-1)}
            disabled={!canPrev}
            aria-label="Previous testimonials"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            className="rbv-arrow"
            onClick={() => go(1)}
            disabled={!canNext}
            aria-label="Next testimonials"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      <div
        className="rbv-scroller"
        ref={scrollerRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        tabIndex={0}
      >
        {voices.map((v, i) => (
          <figure className="rbv-card" key={v.name + i}>
            <span className="rbv-mark" aria-hidden="true">&#8220;</span>
            <blockquote className="rbv-quote">{v.quote}</blockquote>
            <figcaption className="rbv-cap">
              <span className="rbv-avatar" aria-hidden="true">{initials(v.name)}</span>
              <span className="rbv-who">
                <span className="rbv-name">{v.name}</span>
                <span className="rbv-role">{v.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="rbv-foot">
        <span className="rbv-count">
          {String(active + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
        </span>
        <div className="rbv-dots" role="tablist" aria-label="Choose testimonial">
          {voices.map((v, i) => (
            <button
              key={"d" + i}
              type="button"
              className={"rbv-dot" + (i === active ? " is-active" : "")}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => toCard(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const css = `
.rbv{
  /* Site design-system tokens (globals.css :root) — bone-tinted surfaces +
     system purple, matching the native rb-entry / rb-compare cards. */
  --card:var(--rb-bone-whisper); --card-bd:var(--rb-bone-faint);
  --line:var(--rb-bone-hair); --accent:var(--rb-purple); --accent-soft:var(--rb-purple);
  --text:var(--rb-bone); --muted:var(--rb-bone-dim); --chip:var(--rb-bone-whisper);
  --serif:var(--font-cormorant),Georgia,serif; --sans:var(--font-dm-sans),-apple-system,BlinkMacSystemFont,sans-serif;
  position:relative; color:var(--text); font-family:var(--sans);
}

/* arrows row, right-aligned above the cards (the page supplies the eyebrow) */
.rbv-controls{display:flex; justify-content:flex-end; margin:0 0 22px;}
.rbv-arrows{display:flex; gap:10px;}
.rbv-arrow{width:46px; height:46px; border-radius:50%; border:1px solid var(--card-bd); background:var(--card); color:var(--text); font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:border-color .25s, color .25s, opacity .25s, background .25s;}
.rbv-arrow:hover:not(:disabled){border-color:var(--accent); color:var(--accent-soft);}
.rbv-arrow:disabled{opacity:.32; cursor:default;}
.rbv-arrow:focus-visible{outline:2px solid var(--accent); outline-offset:2px;}

/* card scroller */
.rbv-scroller{
  display:flex; gap:${GAP}px;
  overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding-left:0;
  padding-bottom:6px; scrollbar-width:none;
}
.rbv-scroller::-webkit-scrollbar{display:none;}
.rbv-scroller:focus-visible{outline:2px solid var(--accent); outline-offset:6px; border-radius:14px;}

.rbv-card{
  scroll-snap-align:start; flex:0 0 auto; width:min(86vw,372px); margin:0;
  display:flex; flex-direction:column; min-height:340px;
  padding:30px 30px 26px; border-radius:14px;
  background:var(--card); border:1px solid var(--card-bd); backdrop-filter:blur(5px);
}
.rbv-mark{font-family:var(--serif); font-style:italic; font-size:64px; line-height:.6; color:var(--accent); opacity:.55; display:block; height:34px;}
.rbv-quote{font-family:var(--serif); font-weight:400; font-size:clamp(17px,1.5vw,20px); line-height:1.5; color:var(--text); margin:8px 0 0; flex:1;}
.rbv-cap{display:flex; align-items:center; gap:14px; margin-top:26px; padding-top:20px; border-top:1px solid var(--line);}
.rbv-avatar{flex:none; width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:var(--serif); font-style:italic; font-size:15px; color:var(--accent-soft); background:var(--chip); border:1px solid var(--card-bd); overflow:hidden;}
.rbv-who{display:flex; flex-direction:column; gap:2px;}
.rbv-name{font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--text);}
.rbv-role{font-family:var(--serif); font-style:italic; font-size:14px; color:var(--muted);}

/* footer: count + dots */
.rbv-foot{margin:34px 0 0; display:flex; flex-direction:column; align-items:center; gap:16px;}
.rbv-count{font-family:var(--serif); font-style:italic; font-size:13px; letter-spacing:.1em; color:var(--muted);}
.rbv-dots{display:flex; gap:10px;}
.rbv-dot{width:7px; height:7px; padding:0; border-radius:50%; border:0; background:var(--card-bd); cursor:pointer; transition:background .25s, transform .25s;}
.rbv-dot:hover{background:var(--muted);}
.rbv-dot.is-active{background:var(--accent); transform:scale(1.25);}
.rbv-dot:focus-visible{outline:2px solid var(--accent); outline-offset:3px;}

@media (max-width:680px){
  .rbv-card{width:84vw; min-height:300px; padding:26px 24px 22px;}
}
@media (prefers-reduced-motion:reduce){
  .rbv-dot{transition:none;}
  .rbv-arrow{transition:none;}
}
`;
