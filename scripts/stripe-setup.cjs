/* eslint-disable @typescript-eslint/no-require-imports */
// One-off Stripe catalogue setup. Creates 6 products (4 plans + closed-loop + seat)
// and their 12 recurring Prices (monthly + yearly, each carrying GBP *and* USD via
// currency_options), then writes every price id into the rosebud-app `stripe_prices`
// table. Idempotent — safe to re-run; it reuses existing products/prices by
// metadata + lookup_key instead of duplicating.
//
// Run (Stripe TEST mode keys):
//   vercel env pull .env.local          # pulls STRIPE_SECRET_KEY + APP_SUPABASE_* locally
//   node scripts/stripe-setup.cjs
//
// Needs in env: STRIPE_SECRET_KEY, NEXT_PUBLIC_APP_SUPABASE_URL, APP_SUPABASE_SERVICE_ROLE_KEY

const fs = require("fs");
const path = require("path");

// ── tiny .env.local loader (no dotenv dependency) ────────────────────────────
(() => {
  const p = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
})();

const SK = process.env.STRIPE_SECRET_KEY;
const SB_URL = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
const SB_KEY = process.env.APP_SUPABASE_SERVICE_ROLE_KEY;
if (!SK) throw new Error("STRIPE_SECRET_KEY missing");
if (!SB_URL || !SB_KEY) throw new Error("NEXT_PUBLIC_APP_SUPABASE_URL / APP_SUPABASE_SERVICE_ROLE_KEY missing");
if (!SK.startsWith("sk_test_")) console.warn("⚠️  STRIPE_SECRET_KEY is not a test key — you are creating LIVE products.");

const Stripe = require("stripe");
const stripe = new Stripe(SK);

const p = (n) => Math.round(n * 100);            // £ → pence
const ym = (list) => Math.round(list * 0.9);     // discounted per-month (plans only)

// product → per-cycle { gbp, usd } amounts in minor units.
// plans: yearly = round(list*0.9)*12 (10% off). add-ons: yearly = monthly*12 (flat, no discount).
const CATALOGUE = [
  { key: "start",  name: "Start",  monthly: { gbp: p(660),  usd: p(850)  }, yearly: { gbp: p(ym(660) * 12),  usd: p(ym(850) * 12)  } },
  { key: "grow",   name: "Grow",   monthly: { gbp: p(1650), usd: p(2100) }, yearly: { gbp: p(ym(1650) * 12), usd: p(ym(2100) * 12) } },
  { key: "expand", name: "Expand", monthly: { gbp: p(2500), usd: p(3200) }, yearly: { gbp: p(ym(2500) * 12), usd: p(ym(3200) * 12) } },
  { key: "scale",  name: "Scale",  monthly: { gbp: p(4900), usd: p(6300) }, yearly: { gbp: p(ym(4900) * 12), usd: p(ym(6300) * 12) } },
  { key: "cla",    name: "Closed-loop attribution", monthly: { gbp: p(750), usd: p(950) }, yearly: { gbp: p(750 * 12), usd: p(950 * 12) } },
  { key: "seat",   name: "Extra seat",              monthly: { gbp: p(10),  usd: p(13)  }, yearly: { gbp: p(10 * 12),  usd: p(13 * 12)  } },
  // Optional modules — flat add-ons on any plan (no yearly discount). Plus the 5-module bundle.
  { key: "mod_status",  name: "Module — Status updates",                     monthly: { gbp: p(50),  usd: p(65)  }, yearly: { gbp: p(50 * 12),  usd: p(65 * 12)  } },
  { key: "mod_docs",    name: "Module — Document / records collection & chase", monthly: { gbp: p(75),  usd: p(95)  }, yearly: { gbp: p(75 * 12),  usd: p(95 * 12)  } },
  { key: "mod_quote",   name: "Module — Quote / proposal follow-up",         monthly: { gbp: p(75),  usd: p(95)  }, yearly: { gbp: p(75 * 12),  usd: p(95 * 12)  } },
  { key: "mod_invoice", name: "Module — Invoicing & payment chase",          monthly: { gbp: p(100), usd: p(130) }, yearly: { gbp: p(100 * 12), usd: p(130 * 12) } },
  { key: "mod_crm",     name: "Module — Custom CRM build",                   monthly: { gbp: p(150), usd: p(195) }, yearly: { gbp: p(150 * 12), usd: p(195 * 12) } },
  { key: "mod_bundle",  name: "Module bundle (all 5)",                       monthly: { gbp: p(300), usd: p(390) }, yearly: { gbp: p(300 * 12), usd: p(390 * 12) } },
];

async function findOrCreateProduct(key, name) {
  const found = await stripe.products.search({ query: `metadata['rb_key']:'${key}'`, limit: 1 });
  if (found.data[0]) return found.data[0];
  return stripe.products.create({ name: `Rosebud — ${name}`, metadata: { rb_key: key } });
}

async function findOrCreatePrice(productId, key, cycle, amt) {
  const lookup_key = `rb_${key}_${cycle}`;
  const existing = await stripe.prices.list({ lookup_keys: [lookup_key], limit: 1 });
  if (existing.data[0]) return existing.data[0];
  return stripe.prices.create({
    product: productId,
    lookup_key,
    currency: "gbp",
    unit_amount: amt.gbp,
    currency_options: { usd: { unit_amount: amt.usd } },
    recurring: { interval: cycle === "monthly" ? "month" : "year" },
    metadata: { rb_key: key, rb_cycle: cycle },
  });
}

async function main() {
  const rows = [];
  for (const c of CATALOGUE) {
    const product = await findOrCreateProduct(c.key, c.name);
    for (const cycle of ["monthly", "yearly"]) {
      const price = await findOrCreatePrice(product.id, c.key, cycle, c[cycle]);
      rows.push({ product: c.key, cycle, stripe_price_id: price.id });
      console.log(`  ${c.key.padEnd(7)} ${cycle.padEnd(7)} → ${price.id}`);
    }
  }

  // Upsert every price id into rosebud-app.stripe_prices.
  const res = await fetch(`${SB_URL}/rest/v1/stripe_prices`, {
    method: "POST",
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`stripe_prices upsert failed: ${res.status} ${await res.text()}`);

  console.log(`\n✅ ${rows.length} prices created/verified and written to stripe_prices.`);
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
