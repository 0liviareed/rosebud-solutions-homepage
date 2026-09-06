import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireAppSession } from "@/lib/app/session";
import { parsePeriod } from "@/lib/app/period";
import { getCaptureMetrics } from "@/lib/captureMetrics";
import CaptureView from "./CaptureView";

export const dynamic = "force-dynamic";

export default async function CapturePage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period: periodParam } = await searchParams;
  const period = parsePeriod(periodParam);

  const result = await requireAppSession();
  if (result.kind !== "ok") return null; // the (shell) layout renders NoOrgState
  const s = result.session;

  const metrics = await getCaptureMetrics(appSupabaseAdmin(), s.orgId, period, s.timezone);
  return <CaptureView metrics={metrics} />;
}
