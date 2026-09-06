import Link from "next/link";
import { PERIODS, PERIOD_LABEL, type Period } from "@/lib/app/period";
import styles from "./shell.module.css";

// The v9 range pills (Today · 7 days · 30 days · This month). Plain links with
// ?period= so the server re-renders — no client state, no hydration risk.
export default function RangeToggle({
  period,
  basePath,
  compact = false,
  timezoneNote,
}: {
  period: Period;
  basePath: string;
  compact?: boolean;
  timezoneNote?: string | null;
}) {
  return (
    <div className={styles.range} style={compact ? { margin: 0 } : undefined} role="group" aria-label="Date range">
      {PERIODS.map((p) => (
        <Link
          key={p}
          href={`${basePath}?period=${p}`}
          className={p === period ? styles.on : ""}
          aria-current={p === period ? "true" : undefined}
          title={p === "calmonth" && timezoneNote ? timezoneNote : undefined}
          style={compact ? { padding: "6px 12px", fontSize: 13 } : undefined}
        >
          {PERIOD_LABEL[p]}
        </Link>
      ))}
    </div>
  );
}
