import type { SupabaseClient } from "@supabase/supabase-js";
import { periodRange, zonedDayKey, zonedStartOfMonth, zonedStartOfNextMonth, type Period } from "./app/period";
import { bucketDaily } from "./app/daily";
import { CORE_FLOWS, liveFlowCount } from "./app/nav";
import { DASHBOARD_STEPS, WORKFLOW_STEP } from "./workflowSteps";
import { intentHighlightKeys, type ConnectionIntent } from "./onboarding/state";
import type { AppSession } from "./app/session";

// Dashboard data for app.rosebud.global — REAL queries only.
//
// Honesty contract (Saj, 2026-09-06): every figure here is either read from a
// real table or is `null`, meaning "no runtime writes this yet" — the UI shows
// "Not live yet" for null, never a fabricated number and never a misleading 0.
// Counts from `workflow_events` are only surfaced once the owning core flow is
// marked live in src/lib/app/nav.ts; until then they stay null even though
// the query runs (so the day the runtime lands, the number appears with no
// UI change).

export type DashboardData = {
  period: Period;
  timeZone: string;
  timezoneIsFallback: boolean;
  dayLabels: string[];
  sinceGoLive: {
    captured: number;
    booked: number | null;
    since: string | null; // ISO
    sinceLabel: "go-live" | "setup" | null;
  };
  capabilitiesRunning: number;
  capabilitiesTotal: number;
  sources: { connected: number; expected: number | null };
  handover: null | { total: number; readyNow: number; clinical: number; admin: number };
  tiles: { captured: number; qualified: number | null; booked: number | null };
  planUsage: PlanUsage | null;
  daily: {
    captured: number[];
    qualified: number[] | null;
    messages: number[] | null;
    emails: number[] | null;
    booked: number[] | null;
  };
  latestBookings: { live: false } | { live: true; items: Array<{ id: string; who: string; what: string; tier: "hi" | "warm" | "booked"; tierLabel: string }> };
  latestReplies: { live: false } | { live: true; items: Array<{ id: string; who: string; snippet: string; what: string; at: string }> };
};

export type PlanUsage = {
  used: number;
  cap: number;
  planName: string;
  planKey: string;
  resetsAt: string; // ISO — start of next calendar month in the tenant tz
  remaining: number;
  seats: number | null;
  baseSeats: number;
  seatCap: number;
  renewsAt: string | null; // subscriptions.current_period_end
};

const liveByFlow = (key: (typeof CORE_FLOWS)[number]["key"]) => CORE_FLOWS.find((f) => f.key === key)?.live === true;

export async function getPlanUsage(admin: SupabaseClient, session: AppSession, now: Date = new Date()): Promise<PlanUsage | null> {
  if (!session.plan) return null;
  const tz = session.timezone;
  const start = zonedStartOfMonth(now, tz);
  const next = zonedStartOfNextMonth(now, tz);
  const { count } = await admin
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("org_id", session.orgId)
    .gte("created_at", start.toISOString());
  const used = count ?? 0;
  return {
    used,
    cap: session.plan.leadCap,
    planName: session.plan.name,
    planKey: session.plan.key,
    resetsAt: next.toISOString(),
    remaining: Math.max(0, session.plan.leadCap - used),
    seats: session.seats,
    baseSeats: session.plan.baseSeats,
    seatCap: session.plan.seatCap,
    renewsAt: session.currentPeriodEnd,
  };
}

export async function getDashboardData(
  admin: SupabaseClient,
  session: AppSession,
  period: Period,
  now: Date = new Date()
): Promise<DashboardData> {
  const range = periodRange(period, session.timezone, now);
  const sinceIso = range.since.toISOString();
  const org = session.orgId;

  const [
    { data: inRange },
    { count: lifetime },
    { data: events },
    { count: connected },
    { data: intent },
    planUsage,
  ] = await Promise.all([
    admin.from("enquiries").select("created_at").eq("org_id", org).gte("created_at", sinceIso),
    admin.from("enquiries").select("id", { count: "exact", head: true }).eq("org_id", org),
    admin
      .from("workflow_events")
      .select("step_name, occurred_at")
      .eq("org_id", org)
      .in("step_name", DASHBOARD_STEPS as unknown as string[])
      .gte("occurred_at", sinceIso),
    admin.from("connections").select("id", { count: "exact", head: true }).eq("org_id", org).eq("status", "active"),
    admin.from("connection_intent").select("*").eq("tenant_id", org).maybeSingle(),
    getPlanUsage(admin, session, now),
  ]);

  const keyOf = (d: Date) => zonedDayKey(d, range.timeZone);
  const created = (inRange ?? []).map((r) => r.created_at as string);
  const capturedDaily = bucketDaily(created, range.dayKeys, keyOf);

  const byStep = (step: string) =>
    (events ?? []).filter((e) => e.step_name === step).map((e) => e.occurred_at as string);
  const stepDaily = (step: string, live: boolean) => (live ? bucketDaily(byStep(step), range.dayKeys, keyOf) : null);
  const sum = (xs: number[] | null) => (xs ? xs.reduce((a, b) => a + b, 0) : null);

  const qualifiedDaily = stepDaily(WORKFLOW_STEP.qualified, liveByFlow("qualify"));
  const bookedDaily = stepDaily(WORKFLOW_STEP.booked, liveByFlow("book"));
  // Outbound messaging exists once any sending flow is live.
  const sendingLive = liveByFlow("retain") || liveByFlow("reactivate") || liveByFlow("qualify");
  const messagesDaily = stepDaily(WORKFLOW_STEP.messageSent, sendingLive);
  const emailsDaily = stepDaily(WORKFLOW_STEP.emailSent, sendingLive);

  // Sources: numerator is real; the denominator is what the client declared
  // in the welcome flow (connection_intent), clamped so it can never read
  // "9 of 4". No intent → no denominator.
  const expectedFromIntent = intent ? intentHighlightKeys(intent as Partial<ConnectionIntent>).length : 0;
  const connectedN = connected ?? 0;
  const expected = intent && expectedFromIntent > 0 ? Math.max(expectedFromIntent, connectedN) : null;

  // "Since go-live": subscriptions.go_live_date is the honest date but nothing
  // writes it yet; tenant_profile.onboarding_completed_at is the fallback,
  // labelled "setup" (0006 backfilled it to migration time for older orgs).
  const since = session.goLiveDate ?? session.onboardingCompletedAt;
  const sinceLabel: DashboardData["sinceGoLive"]["sinceLabel"] = session.goLiveDate ? "go-live" : since ? "setup" : null;

  return {
    period,
    timeZone: range.timeZone,
    timezoneIsFallback: session.timezoneIsFallback,
    dayLabels: range.dayLabels,
    sinceGoLive: {
      captured: lifetime ?? 0,
      booked: liveByFlow("book") ? sum(bookedDaily) : null,
      since,
      sinceLabel,
    },
    capabilitiesRunning: liveFlowCount(),
    capabilitiesTotal: CORE_FLOWS.length,
    sources: { connected: connectedN, expected },
    handover: null, // no queue table exists yet (Inbox / "Handed to your team" is a future build)
    tiles: {
      captured: created.length,
      qualified: sum(qualifiedDaily),
      booked: sum(bookedDaily),
    },
    planUsage,
    daily: {
      captured: capturedDaily,
      qualified: qualifiedDaily,
      messages: messagesDaily,
      emails: emailsDaily,
      booked: bookedDaily,
    },
    latestBookings: { live: false }, // enquiries has no contact name / booking columns by design
    latestReplies: { live: false }, // no message bodies are stored anywhere
  };
}

export function pctOf(part: number | null, whole: number): string | null {
  if (part === null || whole <= 0) return null;
  return `${Math.round((part / whole) * 100)}% of captured`;
}
