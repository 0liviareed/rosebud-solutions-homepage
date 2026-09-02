import { redirect } from "next/navigation";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { createAppSupabaseServerComponentClient } from "@/lib/appSupabaseSession";
import ConnectionsView from "./ConnectionsView";
import type { ConnectionSummary } from "@/app/api/connections/route";

export const dynamic = "force-dynamic";

function NoOrgState() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p>No account is linked to this login yet.</p>
    </div>
  );
}

export default async function ConnectionsPage() {
  const supabase = await createAppSupabaseServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const admin = appSupabaseAdmin();
  const { data: membership } = await admin
    .from("org_members")
    .select("org_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!membership) return <NoOrgState />;

  const { data: connections } = await admin
    .from("connections")
    .select("id, category, provider, method, status, external_account_ref, region, health_reason")
    .eq("org_id", membership.org_id)
    .order("category", { ascending: true });

  return <ConnectionsView initialConnections={(connections ?? []) as ConnectionSummary[]} />;
}
