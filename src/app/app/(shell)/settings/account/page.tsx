import { requireAppSession, displayName } from "@/lib/app/session";
import SignOutButton from "./SignOutButton";
import styles from "../../shell/shell.module.css";

export const dynamic = "force-dynamic";

const row: React.CSSProperties = { display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderTop: "1px solid var(--line)", fontSize: 14 };

export default async function AccountSettingsPage() {
  const result = await requireAppSession();
  if (result.kind !== "ok") return null;
  const s = result.session;
  return (
    <div className={styles.panel} style={{ padding: "22px 24px", maxWidth: 720 }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 500, color: "var(--ink)", marginBottom: 4 }}>{displayName(s)}</div>
      <p style={{ margin: "0 0 14px", color: "var(--ink-2)" }}>Signed in as the owner of this account.</p>
      <div>
        <div style={row}><span style={{ color: "var(--ink-2)" }}>Email</span><strong>{s.email ?? "—"}</strong></div>
        <div style={row}><span style={{ color: "var(--ink-2)" }}>Business</span><strong>{s.businessName ?? "—"}</strong></div>
        <div style={row}><span style={{ color: "var(--ink-2)" }}>Timezone</span><strong>{s.timezone}{s.timezoneIsFallback ? " (default — set yours in the welcome flow)" : ""}</strong></div>
      </div>
      <div style={{ marginTop: 18 }}>
        <SignOutButton />
      </div>
    </div>
  );
}
