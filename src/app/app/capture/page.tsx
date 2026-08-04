import { redirect } from "next/navigation";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { createAppSupabaseServerComponentClient } from "@/lib/appSupabaseSession";
import { getCaptureMetrics, type Period } from "@/lib/captureMetrics";
import CaptureView from "./CaptureView";

export const dynamic = "force-dynamic";

function NoOrgState() {
  return (
    <div style={{ minHeight: "100vh", background: "#050304", color: "#f5f1ea", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "DM Sans, sans-serif" }}>
      <p>No account is linked to this login yet.</p>
    </div>
  );
}

export default async function CapturePage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period: periodParam } = await searchParams;
  const period: Period = (["today", "week", "month"] as string[]).includes(periodParam ?? "")
    ? (periodParam as Period)
    : "week";

  const supabase = await createAppSupabaseServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/app/login");

  const admin = appSupabaseAdmin();
  const { data: membership } = await admin
    .from("org_members")
    .select("org_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!membership) return <NoOrgState />;

  const metrics = await getCaptureMetrics(admin, membership.org_id, period);
  return <CaptureView metrics={metrics} />;
}
