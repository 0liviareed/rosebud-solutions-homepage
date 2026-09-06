import Link from "next/link";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireAppSession } from "@/lib/app/session";
import { CORE_FLOWS } from "@/lib/app/nav";
import { getDashboardData } from "@/lib/dashboardMetrics";
import ActivityChart from "../dashboard/ActivityChart";
import shell from "../shell/shell.module.css";
import styles from "../dashboard/dashboard.module.css";

export const dynamic = "force-dynamic";

const nf = (n: number) => n.toLocaleString("en-GB");
const fmtDate = (iso: string, tz: string) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, day: "numeric", month: "long" }).format(new Date(iso));

// Usage — real: this calendar month's enquiries against the plan's lead cap
// (the cap is "per month" in the pricing copy, so the window is the calendar
// month in the tenant's timezone, not the Stripe billing period, which is
// shown separately as "renews"). Per-capability rows are honest: only
// Capture has a runtime today.
export default async function UsagePage() {
  const result = await requireAppSession();
  if (result.kind !== "ok") return null;
  const s = result.session;
  const d = await getDashboardData(appSupabaseAdmin(), s, "calmonth");
  const pu = d.planUsage;
  const pct = pu && pu.cap > 0 ? Math.min(100, Math.round((pu.used / pu.cap) * 100)) : 0;

  return (
    <div className={shell.wrap}>
      <div className={shell.head}>
        <div>
          <h1>Usage</h1>
          <p>{pu ? `${pu.planName} plan · ${nf(pu.cap)} leads a month · resets ${fmtDate(pu.resetsAt, d.timeZone)}` : "No active plan on this account."}</p>
        </div>
        <div className={styles.chips}>
          <Link href="/settings/plan" className={styles.chip} style={{ color: "var(--ink)" }}><span className={styles.dot} />Manage plan</Link>
        </div>
      </div>

      <div className={styles.stats} style={{ marginTop: 30 }}>
        <div className={`${shell.panel} ${styles.plan}`}>
          <div className={styles.top}><span>Leads this month</span></div>
          {pu ? (
            <>
              <div className={styles.n}>{nf(pu.used)}<small>of {nf(pu.cap)}</small></div>
              <div className={styles.bar}><i style={{ ["--pct" as string]: `${pct}%` }} /></div>
              <div className={styles.m}>{nf(pu.remaining)} remaining · {pct}% used</div>
            </>
          ) : (
            <div className={`${styles.n} ${styles.dash}`}>—</div>
          )}
        </div>
        <div className={`${shell.panel} ${styles.leads}`}>
          <div>
            <div className={styles.l}>Team seats</div>
            <div className={styles.n}>{pu ? (pu.seats ?? pu.baseSeats) : "—"}</div>
            <div className={styles.m}>{pu ? `${pu.baseSeats} included · up to ${pu.seatCap}` : "No plan"}</div>
          </div>
          <div>
            <div className={styles.l}>Capabilities</div>
            <div className={styles.n}>{d.capabilitiesRunning}</div>
            <div className={styles.m}>of {d.capabilitiesTotal} running</div>
          </div>
          <div>
            <div className={styles.l}>Sources</div>
            <div className={styles.n}>{d.sources.connected}</div>
            <div className={styles.m}>{d.sources.expected !== null ? `of ${d.sources.expected} connected` : "connected"}</div>
          </div>
        </div>
        <div className={`${shell.panel} ${styles.plan}`}>
          <div className={styles.top}><span>Subscription</span></div>
          <div className={styles.n} style={{ fontSize: 22 }}>{pu?.renewsAt ? `Renews ${fmtDate(pu.renewsAt, d.timeZone)}` : "—"}</div>
          <div className={styles.m}>{s.subscriptionStatus ? `Status: ${s.subscriptionStatus.replace("_", " ")}` : "No subscription on file"}</div>
        </div>
      </div>

      <div className={`${shell.panel} ${styles.chart}`}>
        <div className={styles.hd}>
          <div>
            <h2>Enquiries this month</h2>
            <p>Captured each day, counted against your plan</p>
          </div>
        </div>
        <ActivityChart dayLabels={d.dayLabels} series={[{ id: "captured", label: "Captured", color: "#1f9d78", values: d.daily.captured }]} />
      </div>

      <div className={`${shell.panel} ${styles.list}`} style={{ marginTop: 30 }}>
        <div className={styles.hd}>
          <div className={styles.l}><div><h3>By capability</h3><p>What each core flow did this month</p></div></div>
        </div>
        {CORE_FLOWS.map((f) => (
          <div className={styles.item} key={f.key}>
            <div className={styles.body}>
              <div className={`${styles.who} ${styles.plain}`}>{f.label}</div>
              <div className={styles.what}>
                {f.key === "capture" ? `${nf(d.tiles.captured)} enquiries captured` : f.live ? "Live" : "Not running for your account yet"}
              </div>
            </div>
            {!f.live && <span className={styles.nl}>Not live yet</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
