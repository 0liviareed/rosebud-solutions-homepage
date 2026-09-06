import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireAppSession } from "@/lib/app/session";
import { getPlanUsage } from "@/lib/dashboardMetrics";
import styles from "../../shell/shell.module.css";

export const dynamic = "force-dynamic";

function fmtDate(iso: string | null, timeZone: string): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-GB", { timeZone, day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

const row: React.CSSProperties = { display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderTop: "1px solid var(--line)", fontSize: 14 };

export default async function PlanSettingsPage() {
  const result = await requireAppSession();
  if (result.kind !== "ok") return null;
  const s = result.session;
  const usage = await getPlanUsage(appSupabaseAdmin(), s);

  return (
    <div className={styles.panel} style={{ padding: "22px 24px", maxWidth: 720 }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 500, color: "var(--ink)", marginBottom: 4 }}>
        {usage ? `${usage.planName} plan` : "No plan on this account"}
      </div>
      <p style={{ margin: "0 0 14px", color: "var(--ink-2)" }}>
        {usage
          ? "What your plan includes and where you are against it this month."
          : "This login has no active subscription. If you've just paid, give it a minute and refresh; otherwise email contact@rosebud.global."}
      </p>
      {usage && (
        <div>
          <div style={row}><span style={{ color: "var(--ink-2)" }}>Leads this month</span><strong>{usage.used.toLocaleString("en-GB")} of {usage.cap.toLocaleString("en-GB")}</strong></div>
          <div style={row}><span style={{ color: "var(--ink-2)" }}>Resets</span><strong>{fmtDate(usage.resetsAt, s.timezone)}</strong></div>
          <div style={row}><span style={{ color: "var(--ink-2)" }}>Team seats</span><strong>{usage.seats ?? usage.baseSeats} in use · {usage.baseSeats} included · up to {usage.seatCap}</strong></div>
          <div style={row}><span style={{ color: "var(--ink-2)" }}>Subscription renews</span><strong>{fmtDate(usage.renewsAt, s.timezone)}</strong></div>
          <div style={row}><span style={{ color: "var(--ink-2)" }}>Closed-loop attribution</span><strong>{s.claOn ? "On" : "Off"}</strong></div>
          <div style={row}><span style={{ color: "var(--ink-2)" }}>Status</span><strong style={{ textTransform: "capitalize" }}>{s.subscriptionStatus?.replace("_", " ") ?? "—"}</strong></div>
        </div>
      )}
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          disabled
          style={{ font: "inherit", fontWeight: 500, padding: "9px 16px", borderRadius: 999, border: "1px solid var(--line)", background: "rgba(255,255,255,.55)", color: "var(--ink-3)", cursor: "not-allowed" }}
          title="Billing portal coming — email contact@rosebud.global to change your plan"
        >
          Manage billing
        </button>
        <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
          Billing portal coming. To change plan or seats, email <a href="mailto:contact@rosebud.global">contact@rosebud.global</a>.
        </span>
      </div>
    </div>
  );
}
