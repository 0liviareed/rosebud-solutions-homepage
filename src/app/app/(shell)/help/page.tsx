import { requireAppSession } from "@/lib/app/session";
import styles from "../shell/shell.module.css";

export const dynamic = "force-dynamic";

const CARDS = [
  {
    t: "Request a change",
    s: "Rules, channels, hours, wording — tell us what should be different and we'll make the change with you.",
    href: "mailto:contact@rosebud.global?subject=Change%20request%20%E2%80%94%20Rosebud%20console",
    cta: "Email a request",
  },
  {
    t: "Talk to a person",
    s: "Something urgent, or a question about your account or billing.",
    href: "mailto:contact@rosebud.global",
    cta: "contact@rosebud.global",
  },
  {
    t: "How each capability works",
    s: "Capture, Qualify, Book, Retain, Reactivate, Follow through and closed-loop attribution, explained.",
    href: "https://rosebud.global/capabilities/capture",
    cta: "Read the guides",
  },
];

export default async function HelpPage() {
  const result = await requireAppSession();
  if (result.kind !== "ok") return null;
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <h1>Help</h1>
          <p>Real people, same day. Every link below reaches the team that runs your account.</p>
        </div>
      </div>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 30 }}>
        {CARDS.map((c) => (
          <div key={c.t} className={styles.panel} style={{ padding: "20px 22px", display: "grid", gap: 8, alignContent: "start" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>{c.t}</div>
            <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 14 }}>{c.s}</p>
            <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ marginTop: 6 }}>
              {c.cta} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
