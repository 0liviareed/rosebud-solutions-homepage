import Link from "next/link";
import type { AppSession } from "@/lib/app/session";
import { PERIOD_SENTENCE } from "@/lib/app/period";
import { pctOf, type DashboardData } from "@/lib/dashboardMetrics";
import RangeToggle from "../shell/RangeToggle";
import { BoltIcon, CalendarListIcon, ChatListIcon, ClockIcon, LinesIcon } from "../shell/NavIcons";
import ActivityChart from "./ActivityChart";
import shell from "../shell/shell.module.css";
import styles from "./dashboard.module.css";

// The v9 Dashboard, app side. Every number is real or absent — see
// src/lib/dashboardMetrics.ts for the honesty contract. Layout mirrors the
// demo's viewOperation() exactly (shared contract).

const nf = (n: number) => n.toLocaleString("en-GB");

function fmtMonthDay(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone, day: "numeric", month: "long" }).format(new Date(iso));
}
function fmtMonthYear(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone, month: "long", year: "numeric" }).format(new Date(iso));
}

export default function DashboardView({ session: s, data: d }: { session: AppSession; data: DashboardData }) {
  const first = s.firstName?.trim();
  const sinceText = d.sinceGoLive.since
    ? ` since ${d.sinceGoLive.sinceLabel === "go-live" ? "go-live" : "setup"} in ${fmtMonthYear(d.sinceGoLive.since, d.timeZone)}`
    : "";
  const headline =
    d.sinceGoLive.booked !== null
      ? `Rosebud has captured ${nf(d.sinceGoLive.captured)} enquiries and booked ${nf(d.sinceGoLive.booked)} consultations${sinceText}`
      : `Rosebud has captured ${nf(d.sinceGoLive.captured)} ${d.sinceGoLive.captured === 1 ? "enquiry" : "enquiries"}${sinceText}`;

  const capsLabel = `${d.capabilitiesRunning} ${d.capabilitiesRunning === 1 ? "capability" : "capabilities"} running`;
  const sourcesLabel =
    d.sources.expected !== null
      ? `${d.sources.connected} of ${d.sources.expected} sources connected`
      : `${d.sources.connected} ${d.sources.connected === 1 ? "source" : "sources"} connected`;

  const period = PERIOD_SENTENCE[d.period];
  const periodCap = period.charAt(0).toUpperCase() + period.slice(1);
  const tzNote = d.timezoneIsFallback ? "Calendar month in UTC (no timezone set for your account yet)" : `Calendar month in ${d.timeZone}`;

  const pu = d.planUsage;
  const pct = pu && pu.cap > 0 ? Math.min(100, Math.round((pu.used / pu.cap) * 100)) : 0;

  const series = [
    { id: "captured", label: "Captured", color: "#1f9d78", values: d.daily.captured },
    { id: "qualified", label: "Qualified", color: "#5b4bb6", values: d.daily.qualified },
    { id: "messages", label: "Messages sent", color: "#b86aa8", values: d.daily.messages },
    { id: "emails", label: "Emails sent", color: "#2d67d3", values: d.daily.emails },
    { id: "booked", label: "Booked", color: "#c5443e", values: d.daily.booked },
  ];

  return (
    <div className={shell.wrap}>
      <div className={shell.head}>
        <div>
          <h1>Welcome{first ? ` ${first}` : ""}</h1>
          <p>{headline}</p>
        </div>
        <div className={styles.chips}>
          <div className={styles.chip}><span className={styles.dot} />{capsLabel}</div>
          <Link href="/settings/connections" className={styles.chip} style={{ color: "var(--ink)" }}>
            <span className={`${styles.dot} ${d.sources.connected === 0 ? styles.muted : ""}`} />
            {sourcesLabel}
          </Link>
        </div>
      </div>

      <RangeToggle period={d.period} basePath="/dashboard" timezoneNote={tzNote} />

      <div className={styles.stats}>
        {/* Team handover — no queue exists yet: honest empty, never a number */}
        <div className={`${shell.panel} ${styles.actions}`}>
          <div className={styles.top}>
            <div className={styles.l}>
              <div className={styles.ic}><BoltIcon /></div>
              <div>
                <div className={styles.t}>Team handover</div>
                <div className={styles.s}>Human in the loop actions</div>
              </div>
            </div>
            <div>
              <div className={`${styles.n} ${d.handover ? "" : styles.dash}`}>{d.handover ? d.handover.total : "—"}</div>
              <div className={styles.due}>{d.handover ? `${d.handover.readyNow} ready for you now` : "Not live yet"}</div>
            </div>
          </div>
          <div className={styles.sub}>
            {d.handover ? (
              <>
                <span><ClockIcon />{d.handover.clinical} clinical</span>
                <span><LinesIcon />{d.handover.admin} admin</span>
              </>
            ) : (
              <span className={styles.muted}><ClockIcon />Arrives with Qualify &amp; Triage</span>
            )}
          </div>
        </div>

        <div className={`${shell.panel} ${styles.leads}`}>
          <div>
            <div className={styles.l}>Captured</div>
            <div className={styles.n}>{nf(d.tiles.captured)}</div>
            <div className={styles.m}>Enquiries in, every channel<br />{periodCap}</div>
          </div>
          <div>
            <div className={styles.l}>Qualified</div>
            <div className={`${styles.n} ${d.tiles.qualified === null ? styles.dash : ""}`}>{d.tiles.qualified === null ? "—" : nf(d.tiles.qualified)}</div>
            <div className={styles.m}>{d.tiles.qualified === null ? <span className={styles.nl}>Not live yet</span> : pctOf(d.tiles.qualified, d.tiles.captured) ?? "—"}<br />{periodCap}</div>
          </div>
          <div>
            <div className={styles.l}>Booked</div>
            <div className={`${styles.n} ${d.tiles.booked === null ? styles.dash : ""}`}>{d.tiles.booked === null ? "—" : nf(d.tiles.booked)}</div>
            <div className={styles.m}>{d.tiles.booked === null ? <span className={styles.nl}>Not live yet</span> : pctOf(d.tiles.booked, d.tiles.captured) ?? "—"}<br />{periodCap}</div>
          </div>
        </div>

        <div className={`${shell.panel} ${styles.plan}`}>
          <div className={styles.top}><span>Plan usage</span><Link href="/settings/plan">Manage</Link></div>
          {pu ? (
            <>
              <div className={styles.n}>{nf(pu.used)}<small>of {nf(pu.cap)} leads</small></div>
              <div className={styles.bar}><i style={{ ["--pct" as string]: `${pct}%` }} /></div>
              <div className={styles.m}>{pu.planName} plan · resets {fmtMonthDay(pu.resetsAt, d.timeZone)} · {nf(pu.remaining)} leads remaining</div>
            </>
          ) : (
            <>
              <div className={`${styles.n} ${styles.dash}`}>—</div>
              <div className={styles.bar}><i /></div>
              <div className={styles.m}>No active plan on this account</div>
            </>
          )}
        </div>
      </div>

      <div className={`${shell.panel} ${styles.chart}`}>
        <div className={styles.hd}>
          <div>
            <h2>Activity Overview</h2>
            <p>Enquiries captured, qualified, contacted and booked each day</p>
          </div>
          <div className={styles.legend}>
            {series.map((sr) => (
              <span key={sr.id} className={sr.values === null ? styles.off : ""} title={sr.values === null ? "Not live yet" : undefined}>
                <i style={{ background: sr.color }} />{sr.label}{sr.values === null ? " · not live" : ""}
              </span>
            ))}
          </div>
        </div>
        <ActivityChart dayLabels={d.dayLabels} series={series} />
      </div>

      <div className={styles.two}>
        <div className={`${shell.panel} ${styles.list}`}>
          <div className={styles.hd}>
            <div className={styles.l}>
              <div className={`${styles.ic} ${styles.a}`}><CalendarListIcon /></div>
              <div><h3>Latest bookings</h3><p>Qualified and booked into your diary</p></div>
            </div>
            <Link href="/book">View more</Link>
          </div>
          {d.latestBookings.live ? (
            d.latestBookings.items.map((b) => (
              <div className={styles.item} key={b.id}>
                <div className={styles.av}>{b.who.slice(0, 2).toUpperCase()}</div>
                <div className={styles.body}><div className={styles.who}>{b.who}</div><div className={styles.what}>{b.what}</div></div>
                <div className={`${styles.tier} ${b.tier === "hi" ? styles.hi : ""}`}>{b.tierLabel}</div>
              </div>
            ))
          ) : (
            <div className={styles.empty}><span className={styles.nl}>Not live yet</span>&nbsp; Bookings appear here once Book into Diary is running for your account.</div>
          )}
        </div>

        <div className={`${shell.panel} ${styles.list}`}>
          <div className={styles.hd}>
            <div className={styles.l}>
              <div className={`${styles.ic} ${styles.b}`}><ChatListIcon /></div>
              <div><h3>Latest replies</h3><p>Recent responses from your enquiries</p></div>
            </div>
            <Link href="/inbox">View more</Link>
          </div>
          {d.latestReplies.live ? (
            d.latestReplies.items.map((r) => (
              <div className={styles.item} key={r.id}>
                <div className={styles.av}>{r.who.slice(0, 2).toUpperCase()}</div>
                <div className={styles.body}><div className={`${styles.who} ${styles.plain}`}>{r.who}</div><div className={styles.snip}>{r.snippet}</div><div className={styles.what}>{r.what}</div></div>
                <div className={styles.when}>{r.at}</div>
              </div>
            ))
          ) : (
            <div className={styles.empty}><span className={styles.nl}>Not live yet</span>&nbsp; Replies appear here once a sending capability is running for your account.</div>
          )}
        </div>
      </div>
    </div>
  );
}
