import { requireAppSession } from "@/lib/app/session";
import NotLiveYet from "../shell/NotLiveYet";
import styles from "../shell/shell.module.css";

export const dynamic = "force-dynamic";

// Closed-loop attribution (the add-on). The on/off state is REAL
// (subscriptions.cla_on); the reporting behind it is not built yet.
export default async function AttributionPage() {
  const result = await requireAppSession();
  if (result.kind !== "ok") return null;
  const { claOn } = result.session;
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <h1>Attribution</h1>
          <p>
            Closed-loop attribution is <strong style={{ color: "var(--ink)" }}>{claOn ? "on" : "off"}</strong> for your account.
            {!claOn && " It can be added to any plan — email contact@rosebud.global to switch it on."}
          </p>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <NotLiveYet
          title="Closed-loop attribution"
          line="Once live, this page shows the qualified and booked outcomes matched back to the ad click that produced them, and the daily export delivered to your media team."
        />
      </div>
    </div>
  );
}
