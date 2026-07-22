"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";
const AD = "#6E5FB8";
const INK = "#17131F";
const ONBOARDING = "https://cal.eu/rosebudsolutions/demo";

type Status = { planName: string; email: string | null; renewalDate: string | null; orderNo: string } | null;

const STEPS = [
  { n: "1", t: "Onboarding session", d: "We agree your good-lead definition, escalation rules, value tiers and how not-qualified leads are handled." },
  { n: "2", t: "Connect & configure", d: "Your six capabilities are labelled and your tone trained; CRM and calendar connected — plus the capture script if closed-loop is on." },
  { n: "3", t: "End-to-end validation", d: "A real enquiry runs the full path into your CRM before anything goes live." },
  { n: "4", t: "Go-live", d: "Your system opens for enquiries and starts qualifying and booking on your live traffic." },
];

function SuccessInner() {
  const q = useSearchParams();
  const [st, setSt] = useState<Status>(null);
  useEffect(() => {
    const id = q.get("session_id");
    if (!id) return;
    fetch(`/api/checkout/session-status?session_id=${encodeURIComponent(id)}`).then((r) => r.json()).then((d) => { if (d.ok) setSt(d); }).catch(() => {});
  }, [q]);

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: INK, background: "#EDEBF3", minHeight: "100vh" }}>
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "120px 24px 120px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, margin: "0 auto 22px", borderRadius: 999, background: "rgba(139,125,216,0.14)", border: "1px solid rgba(139,125,216,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: AD }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg>
        </div>
        <div style={{ fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 16 }}>Payment received</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.05, margin: 0 }}>You&apos;re on the <em style={{ fontStyle: "italic", color: AD }}>{st?.planName ?? "your"}</em> plan</h1>
        <p style={{ margin: "22px auto 0", maxWidth: 500, fontSize: 15.5, lineHeight: 1.62, color: "rgba(23,19,31,0.62)" }}>
          <b style={{ color: INK }}>Payment received.</b> Your subscription is active{st?.renewalDate ? ` and renews on ${st.renewalDate}` : ""}. Confirmation, your receipt, and your onboarding booking link are on the way{st?.email ? ` to ${st.email}` : ""}.
        </p>
        {st?.orderNo && (
          <div style={{ margin: "20px auto 0", display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.6)", border: "1px solid rgba(23,19,31,0.12)", borderRadius: 999, padding: "8px 16px", fontSize: 13, color: "rgba(23,19,31,0.62)" }}>
            Confirmation no.<span style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontWeight: 600, letterSpacing: "0.04em", color: INK }}>{st.orderNo}</span>
          </div>
        )}

        <div style={{ margin: "34px auto 0", maxWidth: 520, textAlign: "left", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.72)", boxShadow: "0 20px 50px -34px rgba(23,19,31,0.25), inset 0 1px 0 rgba(255,255,255,0.6)", borderRadius: 18, padding: "24px 26px" }}>
          <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, color: "rgba(23,19,31,0.42)", marginBottom: 16 }}>What happens next</div>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {STEPS.map((s) => (
              <li key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ width: 26, height: 26, flex: "none", borderRadius: 8, background: "rgba(139,125,216,0.14)", color: AD, fontSize: 12, fontWeight: 700, display: "grid", placeItems: "center" }}>{s.n}</span>
                <div><div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{s.t}</div><div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(23,19,31,0.6)" }}>{s.d}</div></div>
              </li>
            ))}
          </ol>
        </div>

        <div style={{ marginTop: 30 }}>
          <a href={ONBOARDING} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: A, color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "15px 28px", borderRadius: 13, boxShadow: "0 16px 38px -16px rgba(139,125,216,0.8)" }}>Book your onboarding session</a>
        </div>
        <div style={{ marginTop: 22, fontSize: 12.5, color: "rgba(23,19,31,0.5)" }}>Full refund if you cancel before your onboarding session.</div>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return <Suspense fallback={null}><SuccessInner /></Suspense>;
}
