import { NextResponse } from "next/server";
import Stripe from "stripe";
import { appSupabaseAdmin } from "@/lib/appSupabase";

export const dynamic = "force-dynamic";

// Safe, display-only details for the success page. Retrieves the completed Checkout
// Session and returns the plan name, email, and renewal date — nothing sensitive.
export async function GET(request: Request) {
  const { STRIPE_SECRET_KEY } = process.env;
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!STRIPE_SECRET_KEY || !sessionId) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const email = session.customer_details?.email ?? null;
    const paid = session.payment_status === "paid" || session.status === "complete";

    let planName = "your";
    let renewalDate: string | null = null;
    const subRowId = session.metadata?.subscription_id;
    if (subRowId) {
      const { data: sub } = await appSupabaseAdmin().from("subscriptions").select("plan_key, current_period_end").eq("id", subRowId).maybeSingle();
      if (sub?.plan_key) planName = (sub.plan_key as string).charAt(0).toUpperCase() + (sub.plan_key as string).slice(1);
      if (sub?.current_period_end) renewalDate = new Date(sub.current_period_end as string).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    }
    return NextResponse.json({ ok: true, paid, planName, email, renewalDate, orderNo: sessionId.slice(-10).toUpperCase() });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
