import type { SupabaseClient } from "@supabase/supabase-js";

export type Period = "today" | "week" | "month";

// Period boundaries: "today" is the current UTC calendar day; "week"/"month"
// are rolling windows (last 7 / last 30 days), not calendar week/month — no
// per-org timezone is stored anywhere yet, so this is the simplest correct
// thing until that exists (see BUILD_MAP.md §3, "Period windows").
function periodStart(period: Period): Date {
  const now = new Date();
  if (period === "today") {
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  }
  const days = period === "week" ? 7 : 30;
  return new Date(now.getTime() - days * 86400000);
}

export type CaptureMetrics = {
  period: Period;
  captured: number;
  attributed: number;
  adSourced: number;
  duplicateMatched: number;
  merged: number;
  duplicateReplyPrevented: number;
  firstResponseMedianSeconds: number | null;
  outOfHours: number;
  missedCallTextback: number;
  crmWritten: number;
  crmWriteFailed: number;
  recentRecords: Array<{
    id: string;
    channel: string;
    source: string | null;
    createdAt: string;
    firstResponseAt: string | null;
    missedCall: boolean;
    isDuplicate: boolean;
  }>;
};

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export async function getCaptureMetrics(
  admin: SupabaseClient,
  orgId: string,
  period: Period
): Promise<CaptureMetrics> {
  const since = periodStart(period).toISOString();

  const { data: rows, error } = await admin
    .from("enquiries")
    .select(
      "id, channel, source, ad_click_id, is_duplicate, merged, first_response_at, first_response_ooh, missed_call, crm_written_at, crm_write_failed, created_at"
    )
    .eq("org_id", orgId)
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  if (error) throw new Error("getCaptureMetrics: " + error.message);
  const all = rows ?? [];

  const responseSeconds = all
    .filter((r) => r.first_response_at)
    .map((r) => (new Date(r.first_response_at as string).getTime() - new Date(r.created_at).getTime()) / 1000);

  return {
    period,
    captured: all.length,
    attributed: all.filter((r) => r.source !== null).length,
    adSourced: all.filter((r) => r.ad_click_id !== null).length,
    duplicateMatched: all.filter((r) => r.is_duplicate).length,
    merged: all.filter((r) => r.merged).length,
    duplicateReplyPrevented: all.filter((r) => r.is_duplicate && !r.merged).length,
    firstResponseMedianSeconds: median(responseSeconds),
    outOfHours: all.filter((r) => r.first_response_ooh).length,
    missedCallTextback: all.filter((r) => r.missed_call).length,
    crmWritten: all.filter((r) => r.crm_written_at !== null).length,
    crmWriteFailed: all.filter((r) => r.crm_write_failed).length,
    recentRecords: all.slice(0, 10).map((r) => ({
      id: r.id,
      channel: r.channel,
      source: r.source,
      createdAt: r.created_at,
      firstResponseAt: r.first_response_at,
      missedCall: r.missed_call,
      isDuplicate: r.is_duplicate,
    })),
  };
}
