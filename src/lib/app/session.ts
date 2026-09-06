// Server-only by construction: imports next/navigation + the server Supabase
// clients (the `server-only` package isn't installed in this repo).
import { cache } from "react";
import { redirect } from "next/navigation";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { createAppSupabaseServerComponentClient } from "@/lib/appSupabaseSession";
import { isValidTimezone } from "./period";

// ONE session + org lookup for every page under app.rosebud.global. Replaces
// the auth + org_members block that was copy-pasted into capture, connections
// and welcome. React `cache()` dedupes the lookup between the (shell) layout
// and the page for a single request (layouts and pages render concurrently).
//
// Org = the user's first org_members row by created_at (there is no org
// switcher). Everything else is best-effort: a missing profile / subscription
// yields nulls, never a throw — the shell must always render for a paying
// client even when a lookup hiccups.

export type AppPlan = {
  key: string;
  name: string;
  leadCap: number;
  baseSeats: number;
  seatCap: number;
};

export type AppSession = {
  userId: string;
  email: string | null;
  orgId: string;
  firstName: string | null;
  lastName: string | null;
  businessName: string | null;
  timezone: string; // tenant_profile.timezone, "UTC" when unset/invalid
  timezoneIsFallback: boolean;
  plan: AppPlan | null;
  seats: number | null;
  claOn: boolean;
  subscriptionStatus: string | null;
  currentPeriodEnd: string | null;
  goLiveDate: string | null;
  onboardingCompletedAt: string | null;
};

export type AppSessionResult = { kind: "ok"; session: AppSession } | { kind: "no-org"; userId: string };

type SubRow = {
  plan_key: string;
  seats: number | null;
  cla_on: boolean | null;
  status: string | null;
  current_period_end: string | null;
  go_live_date: string | null;
  created_at: string;
  plans: { key: string; name: string; lead_cap: number; base_seats: number; seat_cap: number } | null;
};

export const requireAppSession = cache(async (): Promise<AppSessionResult> => {
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
  if (!membership) return { kind: "no-org", userId: user.id };
  const orgId = membership.org_id as string;

  const [{ data: profile }, { data: org }, { data: tenant }, { data: sub }] = await Promise.all([
    admin.from("profiles").select("first_name, last_name, email").eq("id", user.id).maybeSingle(),
    admin.from("orgs").select("name").eq("id", orgId).maybeSingle(),
    admin
      .from("tenant_profile")
      .select("business_name, timezone, onboarding_completed_at")
      .eq("tenant_id", orgId)
      .maybeSingle(),
    admin
      .from("subscriptions")
      .select("plan_key, seats, cla_on, status, current_period_end, go_live_date, created_at, plans(key, name, lead_cap, base_seats, seat_cap)")
      .eq("org_id", orgId)
      .in("status", ["active", "past_due", "pending"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const s = (sub ?? null) as SubRow | null;
  const tz = tenant?.timezone as string | null | undefined;
  const timezoneOk = isValidTimezone(tz);

  return {
    kind: "ok",
    session: {
      userId: user.id,
      email: (profile?.email as string | null) ?? user.email ?? null,
      orgId,
      firstName: (profile?.first_name as string | null) ?? null,
      lastName: (profile?.last_name as string | null) ?? null,
      businessName: (tenant?.business_name as string | null) ?? (org?.name as string | null) ?? null,
      timezone: timezoneOk ? (tz as string) : "UTC",
      timezoneIsFallback: !timezoneOk,
      plan: s?.plans
        ? {
            key: s.plans.key,
            name: s.plans.name,
            leadCap: s.plans.lead_cap,
            baseSeats: s.plans.base_seats,
            seatCap: s.plans.seat_cap,
          }
        : null,
      seats: s?.seats ?? null,
      claOn: s?.cla_on === true,
      subscriptionStatus: s?.status ?? null,
      currentPeriodEnd: s?.current_period_end ?? null,
      goLiveDate: s?.go_live_date ?? null,
      onboardingCompletedAt: (tenant?.onboarding_completed_at as string | null) ?? null,
    },
  };
});

export function displayName(s: AppSession): string {
  const full = [s.firstName, s.lastName].filter(Boolean).join(" ");
  return full || s.email || "Your account";
}

export function initials(s: AppSession): string {
  const parts = [s.firstName, s.lastName].filter(Boolean) as string[];
  if (parts.length === 0) return (s.email ?? "?").slice(0, 2).toUpperCase();
  return parts.map((p) => p[0]!.toUpperCase()).join("").slice(0, 2);
}
