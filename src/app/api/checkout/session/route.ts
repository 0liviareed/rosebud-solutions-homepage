import { NextResponse } from "next/server";
import Stripe from "stripe";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { planByKey, extraSeats, MODULES, type Cur, type Cycle, type ModuleKey } from "@/lib/pricing";

export const dynamic = "force-dynamic";

// Build the Stripe Checkout Session from a plan config. Composes line items from
// stripe_prices (plan + optional CLA + seats×qty + modules/bundle), creates a
// pending subscription row, and returns the hosted checkout URL. Billing model:
// charge today (mode: subscription). Tax handled by Stripe Tax (automatic_tax).

type Body = {
  org_id?: string; email?: string;
  plan?: string; cycle?: Cycle; currency?: Cur; seats?: number; cla?: boolean; modules?: ModuleKey[];
};

export async function POST(request: Request) {
  const { STRIPE_SECRET_KEY } = process.env;
  if (!STRIPE_SECRET_KEY) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

  let b: Body;
  try { b = (await request.json()) as Body; } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const plan = planByKey(b.plan ?? "");
  const cycle: Cycle = b.cycle === "monthly" ? "monthly" : "yearly";
  const currency: Cur = b.currency === "USD" ? "USD" : "GBP";
  const seats = typeof b.seats === "number" ? b.seats : plan?.baseSeats ?? 0;
  const cla = !!b.cla;
  const mods = Array.isArray(b.modules) ? b.modules.filter((m) => MODULES.some((x) => x.key === m)) : [];
  if (!plan || !b.org_id || !b.email) return NextResponse.json({ error: "Missing plan / account context" }, { status: 400 });

  const stripe = new Stripe(STRIPE_SECRET_KEY);
  const sb = appSupabaseAdmin();

  // Which stripe_prices products this config needs.
  const needed = new Set<string>([plan.key]);
  if (cla) needed.add("cla");
  const nSeats = extraSeats(plan, seats);
  if (nSeats > 0) needed.add("seat");
  const allMods = mods.length >= MODULES.length;
  if (allMods) needed.add("mod_bundle");
  else for (const m of mods) needed.add(`mod_${m}`);

  // Resolve price ids for this cycle.
  const { data: priceRows, error: pErr } = await sb.from("stripe_prices")
    .select("product, stripe_price_id").eq("cycle", cycle).in("product", [...needed]);
  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });
  const priceOf = (product: string) => priceRows?.find((r) => r.product === product)?.stripe_price_id;

  const planPrice = priceOf(plan.key);
  if (!planPrice) return NextResponse.json({ error: "Plan price not found — has the Stripe catalogue been created?" }, { status: 500 });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{ price: planPrice, quantity: 1 }];
  if (cla) { const id = priceOf("cla"); if (id) line_items.push({ price: id, quantity: 1 }); }
  if (nSeats > 0) { const id = priceOf("seat"); if (id) line_items.push({ price: id, quantity: nSeats }); }
  if (allMods) { const id = priceOf("mod_bundle"); if (id) line_items.push({ price: id, quantity: 1 }); }
  else for (const m of mods) { const id = priceOf(`mod_${m}`); if (id) line_items.push({ price: id, quantity: 1 }); }

  try {
    // Reuse the org's Stripe customer if it has one, else create + persist.
    const { data: org } = await sb.from("orgs").select("stripe_customer_id, name").eq("id", b.org_id).maybeSingle();
    let customerId = org?.stripe_customer_id ?? null;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: b.email, name: org?.name ?? undefined, metadata: { org_id: b.org_id } });
      customerId = customer.id;
      await sb.from("orgs").update({ stripe_customer_id: customerId }).eq("id", b.org_id);
    }

    // Pending subscription row — the webhook flips it to active on completion.
    const { data: sub, error: sErr } = await sb.from("subscriptions").insert({
      org_id: b.org_id, plan_key: plan.key, cycle, currency, seats, cla_on: cla, modules: mods,
      stripe_customer_id: customerId, status: "pending",
    }).select("id").single();
    if (sErr || !sub) return NextResponse.json({ error: sErr?.message ?? "subscription create failed" }, { status: 500 });

    const origin = new URL(request.url).origin;
    // Stripe Tax (automatic_tax) requires Tax to be activated + an origin address in
    // the dashboard. Opt in via env so a not-yet-configured account doesn't hard-fail
    // checkout; flip STRIPE_TAX_ENABLED=true once Tax is set up. Billing-address and
    // VAT-number collection do NOT need Tax, so they run regardless.
    const taxOn = process.env.STRIPE_TAX_ENABLED === "true";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items,
      currency: currency.toLowerCase(),
      payment_method_types: ["card"],          // card only — no Klarna / BNPL
      billing_address_collection: "required",  // always collect a billing address
      tax_id_collection: { enabled: true },    // optional VAT / tax-ID field
      customer_update: { address: "auto", name: "auto" }, // persist address + name to the customer
      automatic_tax: { enabled: taxOn },
      subscription_data: { metadata: { org_id: b.org_id, subscription_id: sub.id } },
      metadata: { org_id: b.org_id, subscription_id: sub.id },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?plan=${plan.key}&cycle=${cycle}&currency=${currency}&seats=${seats}&cla=${cla}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("checkout session create failed:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
