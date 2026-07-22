import { NextResponse } from "next/server";
import Stripe from "stripe";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { sendWelcomeOnboarding } from "@/lib/email";

export const dynamic = "force-dynamic";

// Stripe webhook — the "completed" data capture. On checkout.session.completed we
// flip the pending subscription to active, stamp the Stripe ids + renewal, seed
// onboarding, and (next) fire the Resend welcome + onboarding emails. Signature is
// verified with STRIPE_WEBHOOK_SECRET (created when the endpoint is added in Stripe
// after deploy). Subscription lifecycle events keep status in sync.

export async function POST(request: Request) {
  const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 500 });
  }
  const stripe = new Stripe(STRIPE_SECRET_KEY);

  const sig = request.headers.get("stripe-signature");
  const raw = await request.text(); // raw body required for signature verification
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("stripe webhook signature failed:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  const sb = appSupabaseAdmin();

  // Newer Stripe API versions moved current_period_end onto subscription items;
  // read it either way, runtime-safe.
  const periodEndISO = (s: unknown): string | null => {
    const x = s as { current_period_end?: number; items?: { data?: Array<{ current_period_end?: number }> } };
    const t = x?.current_period_end ?? x?.items?.data?.[0]?.current_period_end;
    return t ? new Date(t * 1000).toISOString() : null;
  };

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = typeof s.subscription === "string" ? s.subscription : s.subscription?.id ?? null;
        const orgId = s.metadata?.org_id ?? null;
        const subRowId = s.metadata?.subscription_id ?? null;

        // Renewal + go-live from the Stripe subscription.
        let currentPeriodEnd: string | null = null;
        if (subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          currentPeriodEnd = periodEndISO(sub);
        }

        if (subRowId) {
          await sb.from("subscriptions").update({
            status: "active",
            stripe_subscription_id: subscriptionId,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          }).eq("id", subRowId);
        }
        if (orgId) {
          // Seed onboarding + a signed booking token (used by the gated onboarding link).
          const token = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
          await sb.from("onboarding").upsert({ org_id: orgId, stage: "plan_chosen", booking_token: token, updated_at: new Date().toISOString() }, { onConflict: "org_id" });

          const email = s.customer_details?.email?.toLowerCase() ?? null;
          if (email) {
            // Mark the checkout lead converted (belt-and-braces; signup does it too).
            await sb.from("checkout_leads").update({ converted_org_id: orgId, stage_reached: "converted", updated_at: new Date().toISOString() }).eq("email", email);
            // Welcome + book-onboarding email (Resend). Stripe sends receipt/invoice separately.
            const { data: subInfo } = await sb.from("subscriptions").select("plan_key").eq("id", subRowId ?? "").maybeSingle();
            const { data: prof } = await sb.from("profiles").select("first_name").eq("email", email).maybeSingle();
            const planKey = subInfo?.plan_key ?? "";
            const planName = planKey ? planKey.charAt(0).toUpperCase() + planKey.slice(1) : "your";
            const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rosebud.global";
            await sendWelcomeOnboarding({ email, firstName: prof?.first_name ?? null, planName, bookingUrl: `${site}/onboarding/${token}` });
          }
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const map: Record<string, string> = { active: "active", past_due: "past_due", unpaid: "suspended", canceled: "cancelled", incomplete_expired: "cancelled" };
        const status = event.type === "customer.subscription.deleted" ? "cancelled" : (map[sub.status] ?? "active");
        await sb.from("subscriptions").update({
          status,
          current_period_end: periodEndISO(sub),
          updated_at: new Date().toISOString(),
        }).eq("stripe_subscription_id", sub.id);
        break;
      }

      case "invoice.payment_failed": {
        const inv = event.data.object as unknown as { subscription?: string | { id: string } };
        const subId = typeof inv.subscription === "string" ? inv.subscription : inv.subscription?.id;
        if (subId) await sb.from("subscriptions").update({ status: "past_due", updated_at: new Date().toISOString() }).eq("stripe_subscription_id", subId);
        break;
      }
    }
  } catch (err) {
    console.error(`stripe webhook ${event.type} handler failed:`, err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "handler error" }, { status: 500 }); // 500 → Stripe retries
  }

  return NextResponse.json({ received: true });
}
