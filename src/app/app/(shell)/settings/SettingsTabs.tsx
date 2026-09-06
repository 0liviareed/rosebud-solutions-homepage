"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../shell/shell.module.css";

const TABS = [
  { href: "/settings/connections", label: "Connections" },
  { href: "/settings/plan", label: "Plan" },
  { href: "/settings/account", label: "Account" },
];

export default function SettingsTabs() {
  const pathname = usePathname();
  return (
    <div className={styles.range} style={{ justifyContent: "flex-start" }} role="tablist" aria-label="Settings sections">
      {TABS.map((t) => {
        const on = pathname === t.href || pathname.startsWith(t.href + "/");
        return (
          <Link key={t.href} href={t.href} className={on ? styles.on : ""} role="tab" aria-selected={on}>
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
