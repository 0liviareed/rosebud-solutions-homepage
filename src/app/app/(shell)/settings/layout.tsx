import type { ReactNode } from "react";
import SettingsTabs from "./SettingsTabs";
import styles from "../shell/shell.module.css";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <h1>Settings</h1>
          <p>Your connected systems, your plan, and your account.</p>
        </div>
      </div>
      <SettingsTabs />
      {children}
    </div>
  );
}
