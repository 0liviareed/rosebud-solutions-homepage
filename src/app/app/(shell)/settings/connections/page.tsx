import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireAppSession } from "@/lib/app/session";
import ConnectionsView from "./ConnectionsView";
import { intentHighlightKeys, type ConnectionIntent } from "@/lib/onboarding/state";
import type { ConnectionSummary } from "@/app/api/connections/route";

export const dynamic = "force-dynamic";

export default async function ConnectionsPage() {
  const result = await requireAppSession();
  if (result.kind !== "ok") return null;
  const { orgId } = result.session;

  const admin = appSupabaseAdmin();
  const [{ data: connections }, { data: intent }] = await Promise.all([
    admin
      .from("connections")
      .select("id, category, provider, method, status, external_account_ref, region, health_reason")
      .eq("org_id", orgId)
      .order("category", { ascending: true }),
    admin.from("connection_intent").select("*").eq("tenant_id", orgId).maybeSingle(),
  ]);

  const recommended = intent ? intentHighlightKeys(intent as Partial<ConnectionIntent>) : [];

  return (
    <ConnectionsView
      initialConnections={(connections ?? []) as ConnectionSummary[]}
      recommended={recommended}
    />
  );
}
