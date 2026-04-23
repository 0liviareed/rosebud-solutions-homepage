import Runtime from "@/components/Runtime";
import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";
import CalEmbed from "@/components/CalEmbed";
import FloatingPaths from "@/components/FloatingPaths";

export default function Home() {
  return (
    <>
      <Runtime />
      {/* Two opposing FloatingPaths give the atmospheric layer more depth
          (positive drifts up-right, negative drifts up-left). Fixed to
          viewport — persists through the whole scroll. */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
      <Hero />

      <main className="rb-content">
        {/* ===================== I — CREDENTIALS ===================== */}
        <section
          className="rb-sec rb-sec-credentials"
          data-rb-sec
          aria-label="Credentials"
        >
          <div className="rb-topo rb-topo-1" aria-hidden="true">
            <svg viewBox="0 0 600 340" preserveAspectRatio="none">
              <path className="rb-bright" d="M -10 40 Q 110 26 220 42 T 440 34 T 640 42" />
              <path d="M -10 62 Q 112 46 222 64 T 442 54 T 640 62" />
              <path d="M -10 86 Q 114 66 224 88 T 444 76 T 640 84" />
              <path className="rb-bright" d="M -10 112 Q 116 90 226 114 T 446 100 T 640 110" />
              <path d="M -10 138 Q 118 114 228 142 T 448 126 T 640 136" />
              <path d="M -10 166 Q 120 140 230 170 T 450 154 T 640 164" />
              <path className="rb-bright" d="M -10 196 Q 122 168 232 200 T 452 184 T 640 194" />
              <path d="M -10 226 Q 124 198 234 232 T 454 214 T 640 224" />
              <path d="M -10 256 Q 126 226 236 264 T 456 246 T 640 254" />
              <path d="M -10 288 Q 128 256 238 296 T 458 278 T 640 286" />
            </svg>
          </div>
          <div className="rb-wrap">
            <p
              className="rb-eyebrow"
              data-rb-fade="0"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span className="rb-num">I</span>Built in rooms like these
            </p>
            <div
              className="rb-credentials-line"
              data-rb-fade="1"
              aria-label="Partner credentials"
            >
              <span className="rb-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/699f346d2b4a5acddf7b7436_FSCA.avif" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="rb-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/699f346bae59ff807b9a5ac5_ASIC.avif" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="rb-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/699f346a9b7307d9f51b022e_5.avif" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="rb-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/699f34783fdf19aad5d31024_VFSC.avif" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="rb-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/699f346f9c3537e27b103066_4.avif" alt="" loading="lazy" decoding="async" />
              </span>
            </div>
          </div>
        </section>

        {/* ===================== II — DIGITAL TEAM ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Your Digital Team">
          <div className="rb-topo rb-topo-2" aria-hidden="true">
            <svg viewBox="0 0 420 320" preserveAspectRatio="none">
              <path d="M 210 160 C 140 100, 280 80, 340 170 C 360 220, 280 260, 190 248 C 110 236, 80 180, 100 130 C 120 100, 160 95, 210 160 Z" />
              <path className="rb-bright" d="M 210 160 C 150 110, 268 96, 320 170 C 336 208, 266 240, 192 230 C 126 220, 98 176, 116 138 C 132 114, 168 110, 210 160 Z" />
              <path d="M 210 160 C 160 120, 256 112, 300 170 C 312 198, 254 220, 196 212 C 140 204, 114 170, 130 142 C 144 124, 174 122, 210 160 Z" />
              <path d="M 210 160 C 168 130, 246 126, 282 170 C 290 190, 244 206, 200 200 C 152 192, 130 166, 144 144 C 154 132, 180 130, 210 160 Z" />
              <path className="rb-bright" d="M 210 160 C 174 138, 236 136, 264 170 C 270 184, 234 194, 202 188 C 162 180, 142 162, 154 146 C 162 138, 184 138, 210 160 Z" />
              <path d="M 210 160 C 182 146, 226 144, 248 170 C 252 180, 226 186, 204 180 C 172 174, 154 160, 164 148 C 170 142, 190 144, 210 160 Z" />
              <path d="M 210 160 C 188 152, 218 150, 232 170 C 234 176, 218 180, 204 176 C 182 170, 168 162, 176 152 C 180 148, 194 150, 210 160 Z" />
              <path d="M 210 160 C 196 156, 212 154, 220 170 C 220 174, 212 176, 204 174 C 192 170, 184 164, 188 156 C 192 154, 202 156, 210 160 Z" />
            </svg>
          </div>
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II</span>Rosebud Solutions&apos; key features
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Your Digital <em>Team.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Deployed to handle the work your team shouldn&apos;t be spending time on.
              </p>
            </div>

            <div data-rb-fade="3">
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">01</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Receptionist &amp; Appointment Setter</span>
                  <h3 className="rb-statement">Stop being the first person every enquiry has to reach.</h3>
                </div>
              </div>
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">02</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Lead Management &amp; Qualification</span>
                  <h3 className="rb-statement">Know which leads are worth your time before you pick up the phone.</h3>
                </div>
              </div>
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">03</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Omnichannel Communications</span>
                  <h3 className="rb-statement">One consistent voice across every channel. Without you managing it.</h3>
                </div>
              </div>
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">04</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Client Engagement &amp; Follow-up</span>
                  <h3 className="rb-statement">Every follow-up sent. Every reminder delivered. None of it done by <em>you</em>.</h3>
                </div>
              </div>
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">05</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Operations &amp; Insights</span>
                  <h3 className="rb-statement">No more Sunday night reporting. It&apos;s already done.</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== III — RECEIPTS ===================== */}
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
                <p className="rb-value">Claude &middot; n8n &middot; Stripe &middot; Twilio &middot; Google Workspace</p>
              </div>
              <div className="rb-entry rb-entry-labeled">
                <span className="rb-label">Typical system</span>
                <p className="rb-value">1,000 leads per batch &middot; 30 emails per day &middot; 5 week deployment</p>
              </div>
              <div className="rb-entry rb-entry-labeled">
                <span className="rb-label">Lead scoring</span>
                <p className="rb-value">Hot 80&ndash;100 &middot; Warm 55&ndash;79 &middot; Nurture 30&ndash;54</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== IV — METHOD ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Method">
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
                <span className="rb-num">IV</span>How we work
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Three phases. Built to run <em>without you.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Each phase compounds on the last. Ship, measure, expand.
              </p>
            </div>

            <div data-rb-fade="3">
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">01</span>
                <div className="rb-body-stack">
                  <span className="rb-label">Phase One &middot; 5 weeks</span>
                  <h3 className="rb-statement">The Lead <em>Engine.</em></h3>
                  <p className="rb-body-copy">
                    We find them, score them, route them. Every lead lands in
                    your pipeline pre-qualified and assigned to the right
                    person on your team.
                  </p>
                </div>
              </div>
              <div className="rb-entry rb-entry-numbered" tabIndex={0}>
                <span className="rb-num-big">02</span>
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
                <span className="rb-num-big">03</span>
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

        {/* ===================== V — CALCULATOR ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="Efficiency impact calculator"
        >
          <div className="rb-topo rb-topo-5" aria-hidden="true">
            <svg viewBox="0 0 120 520" preserveAspectRatio="none">
              <path d="M 14 0 C 22 70, 10 140, 20 210 C 30 280, 14 360, 22 520" />
              <path className="rb-bright" d="M 28 0 C 36 65, 22 138, 34 208 C 44 280, 28 360, 36 520" />
              <path d="M 42 0 C 50 60, 36 135, 48 206 C 58 278, 42 360, 50 520" />
              <path d="M 56 0 C 64 58, 50 130, 62 204 C 72 278, 56 360, 64 520" />
              <path className="rb-bright" d="M 70 0 C 78 58, 64 125, 76 202 C 86 278, 70 360, 78 520" />
              <path d="M 84 0 C 92 58, 78 120, 90 200 C 100 278, 84 360, 92 520" />
              <path d="M 98 0 C 106 58, 92 115, 104 198 C 114 278, 98 360, 106 520" />
              <path className="rb-bright" d="M 112 0 C 120 58, 106 110, 118 196 C 128 278, 112 360, 120 520" />
            </svg>
          </div>
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">V</span>Efficiency impact calculator
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                The Cost of <em>Manual.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                See what manual work is really costing your business each year,
                based on your industry and location.
              </p>
            </div>
            <Calculator />
          </div>
        </section>

        {/* ===================== VI — ABOUT ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="About">
          <div className="rb-topo rb-topo-6" aria-hidden="true">
            <svg viewBox="0 0 360 260" preserveAspectRatio="none">
              <path className="rb-bright" d="M 0 210 C 40 160, 90 90, 124 128 C 144 150, 156 114, 178 112 C 200 110, 218 146, 242 128 C 264 112, 296 160, 360 200" />
              <path d="M 0 224 C 42 176, 94 106, 128 140 C 146 158, 160 124, 180 122 C 204 120, 220 154, 246 138 C 268 124, 300 172, 360 214" />
              <path d="M 0 238 C 46 196, 98 124, 132 154 C 150 170, 164 134, 184 132 C 206 130, 222 162, 250 146 C 272 134, 304 184, 360 226" />
              <path className="rb-bright" d="M 0 250 C 50 214, 102 140, 136 168 C 154 182, 168 146, 188 144 C 208 142, 226 170, 254 154 C 278 142, 308 194, 360 236" />
              <path d="M 10 258 C 56 228, 108 156, 140 182 C 156 194, 172 158, 192 156 C 212 154, 230 178, 258 162 C 280 154, 310 202, 360 244" />
            </svg>
          </div>
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">VI</span>About
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                The minds behind <em>Rosebud Solutions.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Two operators who built the system first, then packaged it for others.
              </p>
            </div>

            <div data-rb-fade="3">
              <article className="rb-founder" tabIndex={0}>
                <div className="rb-founder-image" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/695e6ab65c5d3e60230ce3cd_6F48C0E8-F97B-4C36-950F-4CEDF3C8FEFD.avif" alt="Anselm Jr. Okojie" loading="lazy" decoding="async" />
                </div>
                <div className="rb-founder-info">
                  <span className="rb-founder-role">Founder &amp; CEO</span>
                  <h3 className="rb-founder-name">Anselm Jr. Okojie</h3>
                  <p className="rb-founder-bio">
                    Systems operator with a background in systematic FX
                    execution, now leading the design and deployment of AI
                    automation and voice systems for business operations.
                    Founder of Rosebud Capital Solutions, responsible for the
                    architecture of its AI automation frameworks, execution
                    logic, and automation governance layer.
                  </p>
                </div>
              </article>
              <article className="rb-founder rb-founder-2" tabIndex={0}>
                <div className="rb-founder-image" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://cdn.prod.website-files.com/68c850ffb6742cb4ace5211c/695e6cd4f4ae02d41a03a510_D83AC58F-AD6A-4138-9A65-E046DDCFF322.avif" alt="Sajni Okojie" loading="lazy" decoding="async" />
                </div>
                <div className="rb-founder-info">
                  <span className="rb-founder-role">Co-founder &amp; COO</span>
                  <h3 className="rb-founder-name">Sajni Okojie</h3>
                  <p className="rb-founder-bio">
                    Senior operator with a corporate background at Ralph
                    Lauren, delivering £36m in direct commercial impact and
                    leading large-scale technology initiatives. Oversees
                    AI-enabled operations, governance, and commercial
                    infrastructure to support disciplined, scalable growth.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ===================== VII — BOOK ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Book a consultation">
          <div className="rb-topo rb-topo-7" aria-hidden="true">
            <svg viewBox="0 0 420 240" preserveAspectRatio="none">
              <path className="rb-bright" d="M 0 120 C 100 108, 220 134, 420 114" />
              <path d="M 0 146 C 114 130, 236 158, 420 138" />
              <path d="M 0 172 C 128 154, 252 184, 420 164" />
              <path d="M 0 196 C 140 176, 268 208, 420 190" />
              <path className="rb-bright" d="M 40 84 C 130 76, 224 92, 320 84" />
              <path d="M 70 56 C 150 48, 246 62, 340 56" />
            </svg>
          </div>
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">VII</span>Book a consultation
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Find out what&apos;s costing you <em>the most time.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                A 30-minute call where we map exactly what&apos;s running on your
                personal effort and what should be running automatically.
                You&apos;ll leave knowing precisely what to fix — whether you work
                with us or not.
              </p>
            </div>

            <div
              data-rb-fade="3"
              style={{ maxWidth: "640px", margin: "0 auto" }}
            >
              <div className="rb-entry rb-entry-labeled">
                <span className="rb-label">What to expect</span>
                <p className="rb-value-sans">
                  We find where your business leaks time. You leave with a
                  clear picture of what to automate first.
                </p>
              </div>
              <div className="rb-entry rb-entry-labeled">
                <span className="rb-label">Duration</span>
                <p className="rb-value-sans">
                  30 minutes. Zoom. No prep needed.
                </p>
              </div>
            </div>

            <div className="rb-cal-wrap" data-rb-fade="4">
              <CalEmbed />
            </div>
          </div>
        </section>

        <div className="rb-end" aria-hidden="true">
          <span className="rb-end-mark">— Rosebud Solutions</span>
        </div>
      </main>
    </>
  );
}
