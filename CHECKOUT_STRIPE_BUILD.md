# Checkout, Stripe & Accounts — build checklist

> ## ⛔ PRODUCTION GATE — do not ship `/pricing` to production yet
> The new pricing page (`PricingV2`) lives on the **`redesign`** branch, which is
> a Vercel **preview** — it is **not** in production. Production (`main`,
> rosebud.global) still serves the old pricing page. **`/pricing` must not reach
> `main` until checkout works behind it**, or "Choose [plan]" leads to a dead
> `/checkout`. When the redesign merges to `main`, either (a) checkout is built
> (Phases 1–6 below), or (b) temporarily gate `/pricing` — redirect to the old
> page / a "pricing coming soon" / keep the old route — so the redesign can ship
> without exposing a broken buy flow. Un-gate once checkout is live-tested.

Everything to take the pricing page from "Choose [plan]" through payment, account
creation, transactional emails, and onboarding. Scoped from build brief v1 (Stripe
object model / data model / webhooks / entitlements / security), v2 (auth, signup,
purchase flow), v3 (interface — `rosebud-frontend-build-brief-v3`). Reference design:
`Pricing Page.dc.html` (checkout + success views).

Legend: `[ ]` todo · `[~]` in progress · `[x]` done · **DECISION** = needs a call before building.

The pricing page (`/pricing`, `PricingV2.tsx`) is **done** and hands config to
`/checkout?plan&cycle&currency&seats&cla`. Everything below is what `/checkout` needs.

---

## Phase 0 — Decisions  ✅ SETTLED (2026-07-21)
- [x] **Where accounts live → NEW dedicated Supabase project** ("rosebud-app"). Isolates customer PII + billing from the internal war-room/dialler + marketing-forms data. Holds orgs, users, memberships, subscriptions, `checkout_leads`.
- [x] **Auth → Supabase Auth** (email/password at checkout, breached-password check on, session cookie + middleware for `/app/*`). Same stack as the dialler.
- [x] **Billing model → CHARGE TODAY + refund window.** Subscription starts at checkout; card charged immediately; renewal date = today; full refund if they cancel before the onboarding session. (Resolves the brief's conflict — the reference checkout/success copy already matches this.) → Stripe **Subscription** (not SetupIntent).
- [x] **Tax → Stripe Tax (automatic).** UK VAT, EU reverse-charge on valid VAT number, US sales tax by state — feeds Stripe's compliant invoices.
- [x] **Email → Resend + Stripe split:**
  - **Stripe sends** the payment **receipt** and the **VAT invoice (PDF)** — compliant invoicing (sequential numbers, VAT no., tax breakdown) for free; enable in Stripe settings, brand with logo/domain.
  - **Resend sends** the lifecycle emails Stripe doesn't know about — **account-creation confirmation**, **"book your onboarding"** (cal.eu link), and the optional **abandoned-checkout nudge** — fired from the webhook / app logic with branded React templates.
- [ ] **Prerequisite (you):** a Stripe account under the Rosebud Global entity with **GBP + USD** enabled, and a **Resend** account with the sending domain verified (SPF/DKIM/DMARC).

---

## Phase 1 — Stripe setup
- [ ] Create Products in Stripe: **Start / Grow / Expand / Scale** (Enterprise is sales-only, no product).
- [ ] Prices per product: monthly + yearly (yearly = round(monthly × 0.90)), in **GBP and USD**. Yearly billed annually.
- [ ] **Closed-loop attribution** as a separate recurring Price (£750 / $950 flat, **never discounted** on yearly) — added as a line item, not folded into the plan.
- [ ] **Extra seats** as a metered/quantity Price (£10 / $13 per seat, flat) — quantity = extraSeats.
- [ ] **Stripe Tax** on (decided): UK VAT 20%, reverse-charge for EU business with a valid VAT number, US sales tax by state — registered origin address + tax settings configured.
- [ ] Webhook endpoint + signing secret. Handle: `checkout.session.completed`, `customer.subscription.created/updated/deleted`, `invoice.paid`, `invoice.payment_failed`.
- [ ] Billing Portal configuration (manage payment method, cancel).
- [ ] Test-mode keys in Vercel env; live keys gated behind go-live.

## Phase 2 — Data model (new dedicated "rosebud-app" Supabase project)
- [ ] `plans` — key, name, price_gbp, price_usd, lead_cap, base_seats, seat_cap, cla_default, self_serve, stripe_price ids. **Single source** — pricing page + checkout + billing all read this (brief §4.2, §11).
- [ ] `orgs` — id, name, country, vat_number, stripe_customer_id, created_at.
- [ ] `users` — id (Supabase auth), email, first_name, last_name, phone.
- [ ] `org_members` — org_id, user_id, role (owner/admin/member). Middleware resolves org server-side; client never supplies org_id (brief §1).
- [ ] `subscriptions` — org_id, plan_key, cycle, seats, cla_on, stripe_subscription_id, state (pending/active/past_due/suspended/cancelled), current_period_end, go_live_date.
- [ ] `onboarding` — org_id, stage, blocked_on, target_go_live (drives the timeline, brief §6.1).
- [ ] **`checkout_leads`** — the abandoned-capture table (see Phase 5). first_name, last_name, email, phone, plan_intent, cycle, currency, seats, cla, stage_reached, created_at, converted_org_id.
- [ ] RLS: service-role for writes; org-scoped reads for `/app/*`.

## Phase 3 — Checkout flow (`/checkout`)
- [ ] Read config from query (`plan, cycle, currency, seats, cla`); keep editable in the order summary throughout (brief §5.3). A summary edit must never wipe typed form fields (§5.3, §11).
- [ ] **Step 1 — Create account:** first name, last name, work email (uniqueness on blur), password (≥10, breached check, strength bar guides not rejects), company, phone, marketing opt-in. Validation on blur (brief §5.1).
- [ ] **Step 2 — Payment:** Stripe Checkout (hosted) or Payment Element; country + optional VAT (valid non-UK VAT → reverse charge live); billing address; invoice email; mandate line. "What happens next" block (§5.2).
- [ ] Order summary: base, CLA if on, extra seats, subtotal, annual subtotal on yearly, VAT, **Due** line. Sticky desktop / above form mobile. Editable cycle + seats + CLA with the seat-ceiling nudge (§5.3).
- [ ] One shared **price function** imported by pricing page + summary + billing (§4.1, §11). Unit tests: 4 tiers × 2 cycles × CLA on/off × seat counts.
- [ ] Success page (`/checkout/success`): plan, renewal date, confirmation no., "what happens next", onboarding booking CTA.
- [ ] **Sales-issued links** `/checkout/link/[token]`: config **read-only**, quoted price is charged; expired/used token → explanation + contact, never falls back to self-serve (§5.4).

## Phase 4 — Account creation, auth & entitlements
- [ ] `POST /api/signup` — creates user + org + owner membership in **one transaction** (§10). Idempotent, keyed on client request id.
- [ ] `POST /api/checkout/session` — Stripe Checkout session for the config.
- [ ] Webhook → on `checkout.session.completed`: mark subscription active/pending, set go_live/renewal, link stripe_customer_id, flip the `checkout_leads` row to converted.
- [ ] Session + middleware for `/app/*`; org context resolved server-side.
- [ ] Entitlement state machine (plan → caps/seats/modules/CLA) per brief v1.

## Phase 5 — Abandoned-checkout lead capture  ← explicitly requested · **MUST BUILD**

**The flow (build exactly this):**
`capture` → **`rosebud-app.checkout_leads`** (buffer) → **on abandonment** → push into the **CRM `leads` + Telegram** for human follow-up → **on conversion** → mark converted so it **exits the lead pipeline** and becomes a **customer**. A Resend "you left something behind" nudge is an optional extra on top. **Copy for the "you left something" email is supplied by Jay/Saj — not blocked on copywriting.**

**Where it lives — the split (a customer ≠ a lead):**
- **`rosebud-app.checkout_leads`** = the transient capture *buffer* (checkout-session state: stage_reached, plan config). Owned by the checkout lifecycle — resume, convert, link to account on success. **Not** the CRM's job.
- **The CRM `leads` table** (canonical war-room store) = the sales pipeline. On abandonment the lead is **forwarded** here so a setter can call it — owned in the pool, `lead_status = Not Contacted`, with a **Telegram alert** (`@RosebudWarRoom_bot`), same route as the site forms.

Tasks:
- [ ] Capture **first name, last name, email, phone** to `rosebud-app.checkout_leads` on **blur / step-advance, BEFORE payment** (reference HTML build note: "an abandoned checkout still leaves us a qualified lead — do not gate capture on completeCheckout").
- [ ] Upsert as they type more (keyed on email); record `stage_reached` + plan config.
- [ ] **Forward abandoned rows to the CRM `leads` pipeline + Telegram** (dedupe on email so it doesn't double-fire; a prospect who started checkout is a hot, callable lead).
- [ ] On successful checkout, mark the buffer row converted → it exits the lead pipeline and becomes a customer in rosebud-app (don't double-count / don't keep chasing).
- [ ] **CONFIRM: do the current site forms write to the war-room CRM Supabase (→ dialler-callable) or a separate marketing Supabase?** Points the forward at the right project.
- [ ] Resend **"you left something behind"** nudge to non-converted `checkout_leads` (copy already in hand — drop into a template + trigger).

## Phase 6 — Transactional emails  ← explicitly requested · **Stripe + Resend split**
**Stripe sends (enable in Stripe settings, brand with logo/domain):**
- [ ] **Payment receipt** — auto on successful charge.
- [ ] **VAT invoice (PDF)** — Stripe-hosted, compliant (sequential invoice no., VAT no., tax breakdown from Stripe Tax). Itemised base + CLA + seats + VAT. *Don't hand-roll this — Stripe's is legally correct.*
- [ ] Payment-failed / card-expiring dunning — Stripe Smart Retries + emails.

**Resend sends (branded React templates, fired from the webhook / app logic):**
- [ ] **Account-creation confirmation** — on signup: "your account is live", set expectations, link to sign in.
- [ ] **Book your onboarding** — the cal.eu onboarding link (`https://cal.eu/rosebudsolutions/onboarding`) as the primary next step (brief moved "next steps" into this email, §4.2). Triggered on `checkout.session.completed`.
- [ ] **Abandoned-checkout nudge** (optional) — to `checkout_leads` who didn't convert.
- [ ] Resend domain verified (SPF/DKIM/DMARC) on the sending subdomain so these inbox.

## Phase 7 — Account surfaces (`/app/*`, brief §6)
- [ ] `/app/onboarding` — 5-step timeline driven by `onboarding.stage` + `blocked_on` (names the blocker by name).
- [ ] `/app/billing` — plan + state pill, line-item breakdown, next invoice / go-live date, Stripe Billing Portal link, change plan, **usage meter** (amber ≥90%, names next tier, never a lockout), CLA panel, cancel copy.
- [ ] `/app/team` — seat counter + stepper, member table, invite field. **Seat cap enforced server-side at the invite endpoint** (§6.3, §11) — stepper is a courtesy.

## Phase 8 — Analytics, a11y, DoD
- [ ] PostHog events (§9): `pricing_viewed`, `cycle_toggled`, `leads_selected`, `seat_changed`, `cla_toggled`, `cla_modal_opened`, `plan_selected`, `checkout_step_viewed`, `checkout_field_error` (by field), `account_created`, `checkout_completed`, `sales_link_opened/expired`.
- [ ] Accessibility (§8): every field labelled + `aria-describedby` errors, `role="switch"` toggles, stepper `aria-label`s, modal focus trap, keyboard-completable, colour never the sole signal, `prefers-reduced-motion`.
- [ ] Copy review (§4.5): never place Rosebud in the ad account · no monetary-value claim at launch · no "months later" (window is 63 days) · gate stated **per campaign** (30–50) · closed-loop **never "Included"** (always "+£750 · on by default") · no "front office" · no un-live integration named.
- [ ] Definition of done (§11): one price fn everywhere + tests · seat ceiling enforced at stepper **and** invite endpoint · CLA never yearly-discounted · every price shows VAT · pre-go-live screens say nothing charged · summary edits never wipe form · expired sales link never self-serves · full flow keyboard + screen-reader clean.

---

### Suggested build order
1. Phase 0 decisions (esp. billing model + email provider — they gate everything).
2. Stripe setup + `plans`/data model (Phase 1–2).
3. `/checkout` UI from the reference HTML + shared price fn (Phase 3) — **with abandoned capture wired from the first keystroke (Phase 5)**, since that's live value even before payment works.
4. Signup + session + Stripe session + webhook (Phase 4).
5. Transactional emails (Phase 6).
6. `/app/*` account surfaces (Phase 7).
7. Analytics + a11y + DoD pass (Phase 8).
