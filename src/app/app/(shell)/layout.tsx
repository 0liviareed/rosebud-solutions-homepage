import type { ReactNode } from "react";
import { requireAppSession, displayName, initials } from "@/lib/app/session";
import AppShell from "./shell/AppShell";
import NoOrgState from "./shell/NoOrgState";

export const dynamic = "force-dynamic";

// Every page under app.rosebud.global except /login and /welcome (route group
// (bare)) renders inside this shell. The session lookup is React-cached, so a
// page calling requireAppSession() again in the same request does one query.
//
// Pages render concurrently with this layout, so a page must handle the
// "no-org" result itself (return null) — the layout renders NoOrgState in
// place of the children.

// Pre-hydration: restore the collapsed-rail preference before first paint so
// the nav doesn't flash from expanded to collapsed. Attribute only, on <html>.
const RAIL_BOOT = `try{if(localStorage.getItem("rb.rail.min")==="1")document.documentElement.setAttribute("data-rail","min")}catch(e){}`;

export default async function ShellLayout({ children }: { children: ReactNode }) {
  const result = await requireAppSession();
  if (result.kind !== "ok") return <NoOrgState />;
  const s = result.session;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: RAIL_BOOT }} />
      <AppShell
        nav={{
          ctx: { claOn: s.claOn, handoverCount: null },
          user: { name: displayName(s), business: s.businessName, initials: initials(s) },
        }}
      >
        {children}
      </AppShell>
    </>
  );
}
