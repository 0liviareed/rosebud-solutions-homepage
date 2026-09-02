-- First-login onboarding (screen group W) — the mandatory welcome flow a paid
-- client completes before reaching the setup checklist. Spec:
-- ~/Downloads/Rosebud_Engine_Onboarding_Welcome_Build_Doc_v2.md (§4 data model).
-- Companion to the self-serve build (0005_connections.sql). tenant_id
-- throughout the doc is this project's existing orgs.id (0001) — no new
-- identity model.
--
-- Two jobs, per §0: get to know the business and fill the profile
-- (tenant_profile), then record the client's stack (connection_intent) so the
-- Connections screen (S2, built in 0005) arrives pre-selected. Intents carry
-- NO tokens and grant NO access — they only pre-highlight the client's own
-- cards; the real OAuth still runs on Connections.
--
-- Same convention as 0001/0004/0005: RLS on everywhere, the service role
-- (server routes only) bypasses it and does every write; the policies below
-- open only the org-scoped reads the logged-in client needs.
-- Run once in the rosebud-app Supabase project (SQL Editor), after 0001-0005.

-- ─────────────────────────────────────────────────────────────────────────────
-- TENANT_PROFILE — one row per org. Enriches the org created at checkout
-- (signup writes orgs.name + profiles.first_name; those prefill W1 and the W0
-- greeting). profile_complete gates first-login into the welcome flow and
-- routes every later login straight to setup. current_step is the resume
-- point so leaving and returning never loses progress (§2).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists tenant_profile (
  tenant_id             uuid primary key references orgs(id) on delete cascade,

  business_name         text,            -- W1, required to complete (prefilled from orgs.name)
  website               text,            -- W1
  no_website            boolean not null default false,  -- W1 escape → disables web-form channel + Install
  logo_url              text,

  -- W2: which starter preset loads. 'neutral' for "Something else". The preset
  -- selector is horizontal — this only picks defaults, never product scope.
  preset_key            text,
  custom_business_desc  text,            -- W2 free text when preset_key = 'neutral'

  timezone              text,            -- W1, inferred from the browser, confirmed later on Book

  profile_complete      boolean not null default false,
  current_step          text,           -- 'W1'..'W5' resume point; null before start / after finish
  onboarding_completed_at timestamptz,

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- CONNECTION_INTENT — the client's declared stack (§4). Read by the Connections
-- screen to pre-select the client's own providers. No tokens, no access.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists connection_intent (
  tenant_id         uuid primary key references orgs(id) on delete cascade,

  has_crm           boolean,             -- W4; false = "I don't have a CRM" (surfaces the included CRM)
  crm_provider      text,                -- W4; null when has_crm = false
  calendar_provider text,                -- W5
  channels          text[] not null default '{}',  -- W3, >= 1 to complete

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS — service role bypasses all of this; these open ONLY the client reads.
-- ─────────────────────────────────────────────────────────────────────────────
alter table tenant_profile   enable row level security;
alter table connection_intent enable row level security;

create policy tenant_profile_member_read on tenant_profile for select
  using (exists (select 1 from org_members m where m.org_id = tenant_profile.tenant_id and m.user_id = auth.uid()));
create policy connection_intent_member_read on connection_intent for select
  using (exists (select 1 from org_members m where m.org_id = connection_intent.tenant_id and m.user_id = auth.uid()));

-- ─────────────────────────────────────────────────────────────────────────────
-- BACKFILL — every org that already exists predates this flow and was set up
-- manually/through the managed path, so mark it complete. Only orgs created
-- AFTER this migration (which get no tenant_profile row at signup) will hit
-- the welcome gate. Without this backfill, every live client would be forced
-- back through onboarding on their next login.
-- ─────────────────────────────────────────────────────────────────────────────
insert into tenant_profile (tenant_id, business_name, profile_complete, current_step, onboarding_completed_at)
  select id, name, true, null, now() from orgs
on conflict (tenant_id) do nothing;
