"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, NAV_SECTION_LABEL, isActive, navBadge, navItemsIn, type NavContext, type NavItem } from "@/lib/app/nav";
import { NAV_ICON, CollapseIcon } from "./NavIcons";
import styles from "./shell.module.css";

export type NavRailProps = {
  ctx: NavContext;
  user: { name: string; business: string | null; initials: string };
};

type Props = NavRailProps & {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onNavigate: () => void;
};

function Item({ item, ctx, pathname, onNavigate }: { item: NavItem; ctx: NavContext; pathname: string; onNavigate: () => void }) {
  const on = isActive(item, pathname);
  const badge = navBadge(item, ctx);
  const Icon = NAV_ICON[item.id];
  const off = badge === "Off";
  return (
    <Link
      href={item.href}
      className={`${styles.it} ${on ? styles.on : ""} ${off ? styles.off : ""}`}
      aria-current={on ? "page" : undefined}
      onClick={onNavigate}
      title={item.label}
    >
      <Icon />
      <span className={styles.lb}>{item.label}</span>
      {badge !== null && <span className={styles.bd}>{badge}</span>}
    </Link>
  );
}

export default function NavRail({ ctx, user, collapsed, onToggleCollapsed, onNavigate }: Props) {
  const pathname = usePathname();
  const sections: Array<"main" | "automation" | "analytics"> = ["main", "automation", "analytics"];
  return (
    <nav className={styles.nav} aria-label="Main">
      <div className={styles.brand}>
        <button
          type="button"
          className={styles.tg}
          aria-label={collapsed ? "Expand menu" : "Collapse menu"}
          aria-pressed={collapsed}
          onClick={onToggleCollapsed}
        >
          <CollapseIcon />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/rosebud-logo.png" alt="Rosebud Solutions" className={styles.orb} width={26} height={26} />
        <span className={styles.lb}>Rosebud Solutions</span>
      </div>

      {sections.map((section) => (
        <div key={section} style={{ display: "contents" }}>
          {NAV_SECTION_LABEL[section] && <div className={styles.sec}>{NAV_SECTION_LABEL[section]}</div>}
          {navItemsIn(section).map((item) => (
            <Item key={item.id} item={item} ctx={ctx} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </div>
      ))}

      <div className={styles.grow} />
      <div className={styles.foot}>
        {navItemsIn("footer").map((item) => (
          <Item key={item.id} item={item} ctx={ctx} pathname={pathname} onNavigate={onNavigate} />
        ))}
        <Link href="/settings/account" className={styles.user} onClick={onNavigate} title={user.name}>
          <span className={styles.av}>{user.initials}</span>
          <span className={styles.lb}>
            {user.name}
            {user.business && <small>{user.business}</small>}
          </span>
        </Link>
      </div>
      {/* NAV_ITEMS is the single source of truth; referenced so the import is used when sections are exhaustive */}
      <span hidden>{NAV_ITEMS.length}</span>
    </nav>
  );
}
