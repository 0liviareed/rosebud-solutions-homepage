import { NextResponse } from "next/server";
import crypto from "crypto";
import { appSupabaseAdmin } from "@/lib/appSupabase";

export const dynamic = "force-dynamic";

// Cal.eu booking webhook — the belt-and-braces gate. The onboarding page already
// blocks non-active customers, but a stale/shared link could still reach Cal, so we
// re-verify here: read subscription_id from the booking metadata, confirm the
// subscription is ACTIVE, and if not, cancel the booking + flag for sales.
// Configure in Cal: Webhooks → subscriber URL = /api/cal/webhook, event = Booking
// Created, secret = CAL_WEBHOOK_SECRET.

type CalBody = {
  triggerEvent?: string;
  payload?: {
    uid?: string;
    bookingId?: number;
    metadata?: Record<string, string>;
    attendees?: Array<{ email?: string; name?: string }>;
  };
};

export async function POST(request: Request) {
  const raw = await request.text();

  // Verify signature if a secret is configured (Cal signs the raw body HMAC-SHA256).
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (secret) {
    const sig = request.headers.get("x-cal-signature-256") ?? "";
    const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
    if (sig !== expected) {
      console.error("cal webhook signature mismatch");
      return NextResponse.json({ error: "bad signature" }, { status: 401 });
    }
  }

  let body: CalBody;
  try { body = JSON.parse(raw) as CalBody; } catch { return NextResponse.json({ error: "invalid json" }, { status: 400 }); }

  // Only act on new bookings.
  if (body.triggerEvent && body.triggerEvent !== "BOOKING_CREATED") {
    return NextResponse.json({ received: true, ignored: body.triggerEvent });
  }

  const meta = body.payload?.metadata ?? {};
  const subscriptionId = meta.subscription_id ?? null;
  const uid = body.payload?.uid ?? null;
  const attendeeEmail = body.payload?.attendees?.[0]?.email ?? null;

  const sb = appSupabaseAdmin();

  // Resolve the subscription: prefer the hidden metadata id, else fall back to the
  // attendee email → their org's latest subscription.
  let status: string | null = null;
  let orgId: string | null = null;
  if (subscriptionId) {
    const { data } = await sb.from("subscriptions").select("status, org_id").eq("id", subscriptionId).maybeSingle();
    status = data?.status ?? null; orgId = data?.org_id ?? null;
  } else if (attendeeEmail) {
    const { data: prof } = await sb.from("profiles").select("id").eq("email", attendeeEmail.toLowerCase()).maybeSingle();
    if (prof?.id) {
      const { data: mem } = await sb.from("org_members").select("org_id").eq("user_id", prof.id).maybeSingle();
      if (mem?.org_id) {
        orgId = mem.org_id;
        const { data: sub } = await sb.from("subscriptions").select("status").eq("org_id", mem.org_id).order("created_at", { ascending: false }).limit(1).maybeSingle();
        status = sub?.status ?? null;
      }
    }
  }

  const active = status === "active";

  if (active) {
    // Stamp onboarding as booked (best-effort).
    if (orgId) await sb.from("onboarding").update({ stage: "booked", updated_at: new Date().toISOString() }).eq("org_id", orgId);
    return NextResponse.json({ received: true, verified: true });
  }

  // Not active → this booking shouldn't stand. Cancel via Cal API (needs CAL_API_KEY)
  // and flag for sales. Cancel is best-effort so a Cal API hiccup never 500s the hook.
  console.error(`cal booking ${uid} from ${attendeeEmail} has no active subscription (status=${status ?? "none"}) — cancelling + routing to sales`);
  const apiKey = process.env.CAL_API_KEY;
  const apiBase = process.env.CAL_API_BASE ?? "https://api.cal.eu/v2";
  if (apiKey && uid) {
    try {
      const r = await fetch(`${apiBase}/bookings/${uid}/cancel`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "cal-api-version": "2024-08-13" },
        body: JSON.stringify({ cancellationReason: "No active subscription for this account." }),
      });
      console.log(`cal cancel ${uid}: HTTP ${r.status}`);
    } catch (err) {
      console.error("cal cancel failed:", err instanceof Error ? err.message : String(err));
    }
  }
  // 200 so Cal doesn't retry — we've handled it (cancelled/flagged), not errored.
  return NextResponse.json({ received: true, verified: false, action: "cancelled_no_active_subscription" });
}
