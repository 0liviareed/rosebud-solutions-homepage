import { NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";

export const dynamic = "force-dynamic";

// Abandoned-checkout capture. Called on blur / step-advance from the checkout form,
// BEFORE payment — so a checkout that's started and abandoned still leaves us a
// qualified lead (see CHECKOUT_STRIPE_BUILD.md Phase 5). Upserts into
// checkout_leads keyed on the (lowercased) email. Best-effort: never blocks the
// user, always returns ok so a capture failure can't break the form.

type Body = {
  email?: string; first_name?: string; last_name?: string; phone?: string;
  plan?: string; cycle?: string; currency?: string; seats?: number; cla?: boolean;
  stage?: string;
};

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
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("checkout/capture failed:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
