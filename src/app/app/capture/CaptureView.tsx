"use client";

import Link from "next/link";
import styles from "./capture.module.css";
import type { CaptureMetrics, Period } from "@/lib/captureMetrics";

const PERIOD_LABEL: Record<Period, string> = { today: "Today", week: "This week", month: "This month" };

function fmtSeconds(s: number | null): string {
  if (s === null) return "—";
  if (s < 60) return `${Math.round(s)}s`;
  return `${Math.round(s / 60)}m`;
}

function fmtWhen(iso: string): string {
  const d = new Date(iso);
  // Explicit UTC — without it, the server (UTC) and the browser (local
  // timezone) render different text for the same timestamp, which is a
  // hydration mismatch (React error #418), not just a display nuance.
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export default function CaptureView({ metrics }: { metrics: CaptureMetrics }) {
  const m = metrics;

  async function handleSignOut() {
    await fetch("/api/app/logout", { method: "POST" });
    window.location.href = "/app/login";
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <em>Capture</em>
        </h1>
        <span className={styles.periodTabs}>
          {(["today", "week", "month"] as Period[]).map((p) => (
            <Link
              key={p}
              href={`/app/capture?period=${p}`}
              className={`${styles.periodTab} ${p === m.period ? styles.periodTabOn : ""}`}
            >
              {PERIOD_LABEL[p]}
            </Link>
          ))}
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.tile}>
          <div className={styles.tileLabel}>Captured</div>
          <div className={styles.tileValue}>{m.captured}</div>
          <div className={styles.tileNote}>enquiries this period</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.tileLabel}>Attributed</div>
          <div className={styles.tileValue}>{m.attributed}</div>
          <div className={styles.tileNote}>{m.adSourced} ad-sourced</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.tileLabel}>Duplicate check</div>
          <div className={styles.tileValue}>{m.duplicateMatched}</div>
          <div className={styles.tileNote}>
            {m.merged} merged · {m.duplicateReplyPrevented} replies prevented
          </div>
        </div>
        <div className={styles.tile}>
          <div className={styles.tileLabel}>First response</div>
          <div className={styles.tileValue}>{fmtSeconds(m.firstResponseMedianSeconds)}</div>
          <div className={styles.tileNote}>median · {m.outOfHours} out of hours</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.tileLabel}>Missed-call capture</div>
          <div className={styles.tileValue}>{m.missedCallTextback}</div>
          <div className={styles.tileNote}>text-backs sent</div>
        </div>
        <div className={`${styles.tile} ${m.crmWriteFailed > 0 ? styles.tileWarn : ""}`}>
          <div className={styles.tileLabel}>CRM write</div>
          <div className={styles.tileValue}>
            {m.crmWritten}
            {m.crmWriteFailed > 0 && <span> / {m.crmWriteFailed} failed</span>}
          </div>
          <div className={styles.tileNote}>of {m.captured} captured</div>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHead}>Recent records</div>
        {m.recentRecords.length === 0 ? (
          <div className={styles.empty}>Nothing captured yet this period.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>When (UTC)</th>
                <th>Channel</th>
                <th>Source</th>
                <th>First response</th>
              </tr>
            </thead>
            <tbody>
              {m.recentRecords.map((r) => (
                <tr key={r.id}>
                  <td>{fmtWhen(r.createdAt)}</td>
                  <td>
                    {r.channel}
                    {r.missedCall && <span className={styles.missedTag}>missed call</span>}
                    {r.isDuplicate && <span className={styles.dupTag}>duplicate</span>}
                  </td>
                  <td>{r.source ?? "—"}</td>
                  <td>{r.firstResponseAt ? fmtWhen(r.firstResponseAt) : "pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={styles.footer}>
        <button className={styles.signOut} onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
