-- rosebud-app — accounts, billing, checkout capture. Run once in the NEW
-- rosebud-app Supabase project (SQL Editor). Automatic RLS is on, so every table
-- starts locked; policies below open exactly what the client may read. All writes
-- go through the service-role key (server routes), which bypasses RLS.

-- ─────────────────────────────────────────────────────────────────────────────
-- CATALOGUE (public-readable — the pricing page / /api/plans read this)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists plans (
  key            text primary key,              -- start | grow | expand | scale
  name           text not null,
  list_price_gbp integer not null,              -- monthly list, minor-unit-free (whole £)
  list_price_usd integer not null,
  lead_cap       integer not null,
  base_seats     integer not null,
  seat_cap       integer not null,
  cla_default    boolean not null default false,
  self_serve     boolean not null default true,
  sort_order     integer not null
);

-- All Stripe Price ids (6 products × 2 cycles = 12 rows). Populated by the Stripe
-- setup script. product: start|grow|expand|scale|cla|seat · cycle: monthly|yearly.
create table if not exists stripe_prices (
  product         text not null,
  cycle           text not null check (cycle in ('monthly','yearly')),
  stripe_price_id text not null,
  primary key (product, cycle)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- ACCOUNTS
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists orgs (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  country            text,
  vat_number         text,
  stripe_customer_id text unique,
  created_at         timestamptz not null default now()
);

-- App-level profile keyed to Supabase Auth (auth.users). The signup route inserts
-- this in the same transaction as the org + membership.
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  first_name text,
  last_name  text,
  phone      text,
  created_at timestamptz not null default now()
);

create table if not exists org_members (
  org_id     uuid not null references orgs(id) on delete cascade,
  user_id    uuid not null references profiles(id) on delete cascade,
  role       text not null default 'member' check (role in ('owner','admin','member')),
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);
create index if not exists org_members_user_idx on org_members(user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- BILLING
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  org_id                 uuid not null references orgs(id) on delete cascade,
  plan_key               text not null references plans(key),
  cycle                  text not null check (cycle in ('monthly','yearly')),
  currency               text not null check (currency in ('GBP','USD')),
  seats                  integer not null,        -- total seats (base + extra)
  cla_on                 boolean not null default false,
  stripe_subscription_id text unique,
  stripe_customer_id     text,
  status                 text not null default 'pending'
                           check (status in ('pending','active','past_due','suspended','cancelled')),
  current_period_end     timestamptz,
  go_live_date           date,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index if not exists subscriptions_org_idx on subscriptions(org_id);

create table if not exists onboarding (
  org_id             uuid primary key references orgs(id) on delete cascade,
  stage              text not null default 'plan_chosen',
  blocked_on         text,
  target_go_live     date,
  booking_token      text unique,                 -- signed per-customer booking token
  booking_confirmed_at timestamptz,
  updated_at         timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- ABANDONED-CHECKOUT CAPTURE (server-managed buffer; never client-readable)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists checkout_leads (
  id                uuid primary key default gen_random_uuid(),
  email             text not null,
  first_name        text,
  last_name         text,
  phone             text,
  plan_intent       text,
  cycle             text,
  currency          text,
  seats             integer,
  cla               boolean,
  stage_reached     text,                          -- e.g. 'step1_partial' | 'step2' | 'converted'
  converted_org_id  uuid references orgs(id),
  forwarded_to_crm_at timestamptz,                 -- set when pushed to the CRM leads + Telegram
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create unique index if not exists checkout_leads_email_idx on checkout_leads(lower(email));

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS — service role bypasses all of this; these open ONLY the client reads.
-- ─────────────────────────────────────────────────────────────────────────────
alter table plans           enable row level security;
alter table stripe_prices   enable row level security;
alter table orgs            enable row level security;
alter table profiles        enable row level security;
alter table org_members     enable row level security;
alter table subscriptions   enable row level security;
alter table onboarding      enable row level security;
alter table checkout_leads  enable row level security;

-- Catalogue: anyone may read (pricing page).
create policy plans_public_read  on plans         for select using (true);
create policy prices_public_read on stripe_prices  for select using (true);

-- A user sees their own profile.
create policy profiles_self on profiles for select using (auth.uid() = id);
create policy profiles_self_update on profiles for update using (auth.uid() = id);

-- Org-scoped reads: you can read an org (+ its subscription/onboarding/members)
-- only if you're a member of it.
create policy orgs_member_read on orgs for select
  using (exists (select 1 from org_members m where m.org_id = orgs.id and m.user_id = auth.uid()));
create policy members_read on org_members for select
  using (exists (select 1 from org_members m2 where m2.org_id = org_members.org_id and m2.user_id = auth.uid()));
create policy subs_member_read on subscriptions for select
  using (exists (select 1 from org_members m where m.org_id = subscriptions.org_id and m.user_id = auth.uid()));
create policy onboarding_member_read on onboarding for select
  using (exists (select 1 from org_members m where m.org_id = onboarding.org_id and m.user_id = auth.uid()));

-- checkout_leads: no client policy → only the service role can touch it. (Intentional.)

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED the catalogue (mirrors PricingV2 — keep in sync; this becomes the source).
-- Stripe price ids are filled by the setup script, not here.
-- ─────────────────────────────────────────────────────────────────────────────
insert into plans (key, name, list_price_gbp, list_price_usd, lead_cap, base_seats, seat_cap, cla_default, self_serve, sort_order) values
  ('start',  'Start',   660, 850,  500,  2,  4,  false, true, 1),
  ('grow',   'Grow',   1650, 2100, 1800, 5,  9,  false, true, 2),
  ('expand', 'Expand', 2500, 3200, 3500, 10, 19, true,  true, 3),
  ('scale',  'Scale',  4900, 6300, 4000, 20, 20, true,  true, 4)
on conflict (key) do update set
  name = excluded.name, list_price_gbp = excluded.list_price_gbp, list_price_usd = excluded.list_price_usd,
  lead_cap = excluded.lead_cap, base_seats = excluded.base_seats, seat_cap = excluded.seat_cap,
  cla_default = excluded.cla_default, self_serve = excluded.self_serve, sort_order = excluded.sort_order;
