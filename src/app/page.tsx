import Hero from "@/components/Hero";
import IsThisYou from "@/components/IsThisYou";
import HomepageFlow from "@/components/HomepageFlow";
import HomepageOwn from "@/components/HomepageOwn";
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

        {/* ===================== I — HOW WE WORK (animated flow) ===================== */}
        <HomepageFlow />

        {/* ===================== II — VOICES ===================== */}
        <section className="rb-sec rb-sec-voices" data-rb-sec aria-label="Voices">
          <div className="rb-wrap">
            <div className="rb-head" style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II</span>Voices
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                In their words, <em>not ours.</em>
              </h2>
            </div>
            <div data-rb-fade="2">
              <Voices />
            </div>
          </div>
        </section>

        {/* ===================== III — WHAT YOU ACTUALLY GET ===================== */}
        <HomepageOwn marker="III" />

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
