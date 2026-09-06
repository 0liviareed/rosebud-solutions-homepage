import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireAppSession } from "@/lib/app/session";
import { parsePeriod } from "@/lib/app/period";
import { getDashboardData } from "@/lib/dashboardMetrics";
import DashboardView from "./DashboardView";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period: periodParam } = await searchParams;
  const period = parsePeriod(periodParam);

  const result = await requireAppSession();
  if (result.kind !== "ok") return null;
  const s = result.session;

  const data = await getDashboardData(appSupabaseAdmin(), s, period);
  return <DashboardView session={s} data={data} />;
}
