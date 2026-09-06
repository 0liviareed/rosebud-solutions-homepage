import { requireAppSession } from "@/lib/app/session";
import NotLiveYet from "./NotLiveYet";
import styles from "./shell.module.css";

// One honest page for every nav destination whose runtime doesn't exist yet.
// Mirrors the demo's view titles so the two surfaces read the same.
export default async function StubPage({
  title,
  intro,
  line,
}: {
  title: string;
  intro: string;
  line: string;
}) {
  const result = await requireAppSession();
  if (result.kind !== "ok") return null;
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <NotLiveYet title={title} line={line} />
      </div>
    </div>
  );
}
