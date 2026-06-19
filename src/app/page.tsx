import Hero from "@/components/Hero";
import IsThisYou from "@/components/IsThisYou";
import DigitalTeam from "@/components/DigitalTeam";
import BuildSection from "@/components/BuildSection";
import CalEmbed from "@/components/CalEmbed";
import Voices from "@/components/Voices";

export default function Home() {
  return (
    <>
      {/* Runtime + FloatingPaths now live in layout.tsx so every page
          inherits the global hiker + atmospheric layer. */}
      <Hero />

      <main className="rb-content">
        {/* ===================== · — IS THIS YOU ===================== */}
        <IsThisYou />

        {/* ===================== I — METHOD ===================== */}
        <section className="rb-sec rb-sec-method" data-rb-sec aria-label="Method">
          <div className="rb-topo rb-topo-4" aria-hidden="true">
            <svg viewBox="0 0 480 340" preserveAspectRatio="none">
              <g>
                <path d="M 0 250 C 30 200, 65 170, 100 210 C 125 240, 140 190, 170 218" />
                <path className="rb-bright" d="M 0 270 C 34 230, 68 192, 106 228 C 130 252, 148 206, 178 230" />
                <path d="M 0 290 C 38 254, 72 214, 112 244 C 136 264, 156 222, 186 246" />
                <path d="M 6 306 C 42 280, 76 238, 118 262 C 142 280, 162 238, 194 262" />
              </g>
              <g>
                <path className="rb-bright" d="M 168 190 C 198 130, 240 96, 274 132 C 296 150, 312 112, 338 132" />
                <path d="M 176 210 C 204 152, 248 116, 282 148 C 304 168, 322 130, 348 150" />
                <path d="M 184 228 C 210 172, 256 136, 290 166 C 312 184, 330 146, 356 168" />
                <path d="M 192 244 C 220 192, 262 156, 298 182 C 320 200, 338 164, 364 184" />
              </g>
              <g>
                <path d="M 320 130 C 348 74, 378 48, 410 72 C 432 86, 442 60, 468 78" />
                <path d="M 326 150 C 354 96, 386 66, 418 90 C 440 104, 450 78, 476 94" />
                <path className="rb-bright" d="M 334 170 C 362 118, 392 86, 424 108 C 444 120, 454 98, 480 116" />
                <path d="M 342 190 C 370 142, 400 108, 432 126 C 450 138, 460 116, 486 132" />
              </g>
            </svg>
          </div>
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>How we work
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Three phases. Time back. <em>Revenue forward.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Each phase compounds on the last. Ship, measure, expand.
              </p>
            </div>

            <div data-rb-fade="3">
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">I</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Phase One &middot; 5 weeks to live</span>
                  <h3 className="rb-statement">The Lead <em>Engine.</em></h3>
                  <p className="rb-body-copy">
                    We find them, score them, route them. Every lead lands in
                    your pipeline pre-qualified and assigned to the right
                    person on your team.
                  </p>
                </div>
              </div>
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">II</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Phase Two</span>
                  <h3 className="rb-statement">The Voice <em>Layer.</em></h3>
                  <p className="rb-body-copy">
                    We call them, book them, follow up. The AI voice agent
                    handles first contact, nurture, and appointment booking.
                  </p>
                </div>
              </div>
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">III</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Phase Three</span>
                  <h3 className="rb-statement">The Insight <em>Layer.</em></h3>
                  <p className="rb-body-copy">
                    We invoice them, report it, refine it. Every number you
                    need to run the business, without you pulling it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== II — DIGITAL TEAM ===================== */}
        <DigitalTeam />

        {/* ===================== III — VOICES ===================== */}
        <section className="rb-sec rb-sec-voices" data-rb-sec aria-label="Voices">
          <div className="rb-wrap">
            <div className="rb-head" style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">III</span>Voices
              </p>
            </div>
            <div data-rb-fade="1">
              <Voices />
            </div>
          </div>
        </section>

        {/* ===================== · — BUILD + STEPS ===================== */}
        <BuildSection />

        {/* ===================== · — BOOK (cal embed only) ===================== */}
        <section
          id="rb-book"
          data-rb-sec
          aria-label="Book a consultation"
          style={{ scrollMarginTop: "40px", padding: "0 clamp(1.5rem,5vw,3rem) clamp(6rem,11vw,11rem)" }}
        >
          <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
            <CalEmbed />
          </div>
        </section>

      </main>
    </>
  );
}
