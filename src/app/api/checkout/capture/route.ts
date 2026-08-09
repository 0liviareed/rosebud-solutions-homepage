import { NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";

export const dynamic = "force-dynamic";

// Abandoned-checkout capture. Called on blur / step-advance from the checkout form,
// BEFORE payment — so a checkout that's started and abandoned still leaves us a
// qualified lead (see CHECKOUT_STRIPE_BUILD.md Phase 5). Upserts into
// checkout_leads keyed on the (lowercased) email. Best-effort: never blocks the
// user, always returns ok so a capture failure can't break the form.

type Body = {
  email?: string; first_name?: string; last_name?: string; phone?: string; company?: string;
  plan?: string; cycle?: string; currency?: string; seats?: number; cla?: boolean; modules?: string[];
  stage?: string;
};

// Fire-and-forget sync into war-room's pipeline so Sebastian (AE) and Jay see
// a real dropped-checkout lead, plus an immediate email alert on first
// creation — added 2026-08-09. Never awaited into the response, never allowed
// to affect this route's own ok/fail result; checkout_leads (above) stays the
// source of truth for this repo regardless of whether the war-room call
// succeeds. `modules` and `company` were already being typed on the client
// form/capture signature but never actually sent to this route — fixed
// alongside this so the sync has real data to forward.
// Awaited (not void-fired) — Vercel can terminate the function once the
// response is sent, which would silently drop an un-awaited fetch. Still
// never lets a failure here affect this route's own ok/fail result.
async function syncToDialler(body: Body, email: string) {
  const secret = process.env.DIALLER_CHECKOUT_SYNC_SECRET;
  if (!secret) { console.error("checkout/capture: DIALLER_CHECKOUT_SYNC_SECRET not set — dialler sync skipped"); return; }
  try {
    const res = await fetch("https://dialler.rosebud.global/api/leads/checkout-capture", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email, first_name: clean(body.first_name), last_name: clean(body.last_name),
        phone: clean(body.phone), company_name: clean(body.company),
        plan: clean(body.plan), cycle: clean(body.cycle), currency: clean(body.currency),
        seats: typeof body.seats === "number" ? body.seats : undefined,
        cla: typeof body.cla === "boolean" ? body.cla : undefined,
        modules: Array.isArray(body.modules) ? body.modules.length : undefined,
      }),
    });
    if (!res.ok) console.error("checkout/capture: dialler sync non-ok:", res.status, await res.text().catch(() => ""));
  } catch (e) {
    console.error("checkout/capture: dialler sync failed:", e instanceof Error ? e.message : String(e));
  }
}

const clean = (v: unknown) => {
  const s = typeof v === "string" ? v.trim() : "";
  return s.length ? s : null;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  const email = clean(body.email)?.toLowerCase() ?? null;
  // Nothing worth capturing without at least an email.
  if (!email) return NextResponse.json({ ok: false, reason: "no-email" }, { status: 200 });

  const patch = {
    email,
    first_name: clean(body.first_name),
    last_name: clean(body.last_name),
    phone: clean(body.phone),
    plan_intent: clean(body.plan),
    cycle: clean(body.cycle),
    currency: clean(body.currency),
    seats: typeof body.seats === "number" ? body.seats : null,
    cla: typeof body.cla === "boolean" ? body.cla : null,
    stage_reached: clean(body.stage) ?? "step1_partial",
    updated_at: new Date().toISOString(),
  };

  try {
    const sb = appSupabaseAdmin();
    // Manual upsert on lowercased email (the unique index is on lower(email), an
    // expression index PostgREST on_conflict can't target). Coalesce so a later,
    // sparser keystroke never nulls a value we already captured.
    const { data: existing } = await sb
      .from("checkout_leads")
      .select("id, first_name, last_name, phone, plan_intent, cycle, currency, seats, cla")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      const keep = <T,>(next: T, prev: T) => (next === null || next === undefined ? prev : next);
      await sb.from("checkout_leads").update({
        first_name: keep(patch.first_name, existing.first_name),
        last_name: keep(patch.last_name, existing.last_name),
        phone: keep(patch.phone, existing.phone),
        plan_intent: keep(patch.plan_intent, existing.plan_intent),
        cycle: keep(patch.cycle, existing.cycle),
        currency: keep(patch.currency, existing.currency),
        seats: keep(patch.seats, existing.seats),
        cla: keep(patch.cla, existing.cla),
        stage_reached: patch.stage_reached,
        updated_at: patch.updated_at,
      }).eq("id", existing.id);
    } else {
      await sb.from("checkout_leads").insert(patch);
    }
    await syncToDialler(body, email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("checkout/capture failed:", err instanceof Error ? err.message : String(err));
    // checkout_leads write failed — still worth trying the dialler sync,
    // since it's an independent destination with its own dedup.
    await syncToDialler(body, email);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
