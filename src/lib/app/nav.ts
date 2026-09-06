// Client-console navigation + core-flow catalogue — SOURCE OF TRUTH for the
// app shell (app.rosebud.global). The sales demo (src/app/demo/dashboard.html)
// mirrors this list by hand; keep the two in step.
//
// Pure module: no runtime imports, so `node --test` and client components can
// both load it.
//
// Decisions (Saj, 2026-09-06): Follow through is NOT in the nav (it is the
// optional modules, not a core flow). Write to CRM has no nav item (nothing to
// configure) but IS a core flow, so it counts in "N capabilities running".

export type NavSection = "main" | "automation" | "analytics" | "footer";

export type NavItemId =
  | "dashboard"
  | "inbox"
  | "capture"
  | "qualify"
  | "book"
  | "retain"
  | "reactivate"
  | "attribution"
  | "usage"
  | "logs"
  | "settings"
  | "help";

export type NavItem = {
  id: NavItemId;
  label: string;
  href: string;
  section: NavSection;
  // `live` = the page shows real, working functionality today. Stubs are
  // still linked (the nav must match the demo) but render "Not live yet".
  live: boolean;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", section: "main", live: true },
  { id: "inbox", label: "Inbox", href: "/inbox", section: "main", live: false },
  { id: "capture", label: "Capture", href: "/capture", section: "automation", live: true },
  { id: "qualify", label: "Qualify", href: "/qualify", section: "automation", live: false },
  { id: "book", label: "Book", href: "/book", section: "automation", live: false },
  { id: "retain", label: "Retain", href: "/retain", section: "automation", live: false },
  { id: "reactivate", label: "Reactivate", href: "/reactivate", section: "automation", live: false },
  { id: "attribution", label: "Attribution", href: "/attribution", section: "automation", live: false },
  { id: "usage", label: "Usage", href: "/usage", section: "analytics", live: true },
  { id: "logs", label: "Logs", href: "/logs", section: "analytics", live: false },
  { id: "settings", label: "Settings", href: "/settings", section: "footer", live: true },
  { id: "help", label: "Help", href: "/help", section: "footer", live: true },
];

export const NAV_SECTION_LABEL: Record<NavSection, string | null> = {
  main: null,
  automation: "Automation",
  analytics: "Analytics",
  footer: null,
};

export type CoreFlowKey = "capture" | "qualify" | "book" | "retain" | "reactivate" | "crm";

export type CoreFlow = {
  key: CoreFlowKey;
  label: string;         // the canonical six names
  short: string;         // as used in the nav / capability pages
  navId: NavItemId | null;
  // `live` = the runtime for this flow exists and writes real data. Only
  // Capture's metrics exist today (and nothing writes them yet); every other
  // flow flips to true when its runtime ships.
  live: boolean;
};

export const CORE_FLOWS: readonly CoreFlow[] = [
  { key: "capture", label: "Capture & Respond", short: "Capture", navId: "capture", live: true },
  { key: "qualify", label: "Qualify & Triage", short: "Qualify", navId: "qualify", live: false },
  { key: "book", label: "Book into Diary", short: "Book", navId: "book", live: false },
  { key: "retain", label: "Remind & Reschedule", short: "Retain", navId: "retain", live: false },
  { key: "reactivate", label: "Recall & Nurture", short: "Reactivate", navId: "reactivate", live: false },
  { key: "crm", label: "Write to CRM", short: "Write to CRM", navId: null, live: false },
];

export function coreFlow(key: CoreFlowKey): CoreFlow {
  return CORE_FLOWS.find((f) => f.key === key) as CoreFlow;
}

export function liveFlowCount(): number {
  return CORE_FLOWS.filter((f) => f.live).length;
}

export type NavBadge = number | "Off" | null;

export type NavContext = {
  claOn: boolean;
  handoverCount: number | null; // null = no queue exists yet
};

export function navBadge(item: NavItem, ctx: NavContext): NavBadge {
  if (item.id === "inbox") return ctx.handoverCount && ctx.handoverCount > 0 ? ctx.handoverCount : null;
  if (item.id === "attribution") return ctx.claOn ? null : "Off";
  return null;
}

export function isActive(item: NavItem, pathname: string): boolean {
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export function navItemsIn(section: NavSection): NavItem[] {
  return NAV_ITEMS.filter((i) => i.section === section);
}
