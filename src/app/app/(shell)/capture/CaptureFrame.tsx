import type { ReactNode } from "react";
import RangeToggle from "../shell/RangeToggle";
import type { Period } from "@/lib/app/period";
import styles from "./frame.module.css";

// Capture's page frame inside the v9 shell: topbar (title + range pills) over
// a two-column body (flow diagram | inspector). The inspector stays
// Capture-only; the global nav lives in the (shell) layout.
export default function CaptureFrame({
  period,
  children,
  inspector,
}: {
  period: Period;
  children: ReactNode;
  inspector: ReactNode;
}) {
  return (
    <div className={styles.frame}>
      <div className={styles.tb}>
        <span className={styles.tbT}>Capture</span>
        <span className={styles.sp} />
        <RangeToggle period={period} basePath="/capture" compact />
      </div>
      <div className={styles.body}>
        <div className={styles.scroll}>{children}</div>
        {inspector}
      </div>
    </div>
  );
}
