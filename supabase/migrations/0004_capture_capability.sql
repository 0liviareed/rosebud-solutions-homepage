-- Capture capability — real per-org enquiry + automation-event data, replacing
-- the engine.rosebud.global demo's hardcoded CORE/FEED/SOURCES numbers for real
-- clients (see src/app/demo/BUILD_MAP.md §3 for the full node-by-node mapping).
-- Run once in the rosebud-app Supabase project (SQL Editor), after 0001-0003.
-- Same convention as 0001: RLS on everywhere, service role (server routes / the
-- workflow engine / the seed script) bypasses it and does all writes; policies
-- below open only the org-scoped reads the logged-in client needs.

-- ─────────────────────────────────────────────────────────────────────────────
-- ENQUIRIES — one row per lead captured, across every intake channel.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists enquiries (
  id                      uuid primary key default gen_random_uuid(),
  org_id                  uuid not null references orgs(id) on delete cascade,

  -- intake
  channel                 text not null,              -- phone | sms | whatsapp | web_form | email | facebook_messenger | ...
  source                  text,                       -- google_ads | organic_search | referral | direct | facebook_ads | existing_client | ...
  ad_click_id             text,                       -- populated only for ad-sourced records (closed-loop attribution add-on)

  -- dedup / merge (Duplicate Check + Record Merge nodes)
  is_duplicate            boolean not null default false,
  duplicate_of_enquiry_id uuid references enquiries(id) on delete set null,
  merged                  boolean not null default false,  -- true once actually merged into its canonical record (subset of is_duplicate)

  -- first response
  first_response_at       timestamptz,
  first_response_ooh      boolean not null default false,  -- sent outside configured business hours

  -- missed-call recovery
  missed_call             boolean not null default false,

  -- CRM write-back (kept distinct from "captured" so a write failure is a visible gap)
  crm_written_at          timestamptz,
  crm_write_failed        boolean not null default false,

  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
create index if not exists enquiries_org_created_idx on enquiries(org_id, created_at desc);
create index if not exists enquiries_org_channel_idx  on enquiries(org_id, channel);
create index if not exists enquiries_dup_of_idx       on enquiries(duplicate_of_enquiry_id) where duplicate_of_enquiry_id is not null;

-- ─────────────────────────────────────────────────────────────────────────────
-- WORKFLOW_EVENTS — one row per automation step firing. Deliberately generic
-- (not just Capture): step_name is free text, not a check-constrained enum,
-- because later capabilities (Qualify/Book/Retain/Reactivate/Follow through —
-- see BUILD_MAP.md §3) append new step names here without another migration.
-- Capture's step names today:
--   channel_intake | source_attribution | duplicate_check | first_response
--   | record_merge | duplicate_reply_prevented | missed_call_textback | crm_write
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists workflow_events (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references orgs(id) on delete cascade,
  enquiry_id  uuid references enquiries(id) on delete set null,
  step_name   text not null,
  occurred_at timestamptz not null default now(),
  meta        jsonb not null default '{}'::jsonb
);
create index if not exists workflow_events_org_step_idx on workflow_events(org_id, step_name, occurred_at desc);
create index if not exists workflow_events_enquiry_idx  on workflow_events(enquiry_id) where enquiry_id is not null;

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS — service role bypasses all of this. Policies below open only org-scoped
-- SELECT for the logged-in client, mirroring 0001's orgs/subscriptions/onboarding
-- pattern. No insert/update/delete policy for authenticated users — every write
-- comes from the service role, same as checkout_leads in 0001.
-- ─────────────────────────────────────────────────────────────────────────────
alter table enquiries       enable row level security;
alter table workflow_events enable row level security;

create policy enquiries_member_read on enquiries for select
  using (exists (select 1 from org_members m where m.org_id = enquiries.org_id and m.user_id = auth.uid()));
create policy workflow_events_member_read on workflow_events for select
  using (exists (select 1 from org_members m where m.org_id = workflow_events.org_id and m.user_id = auth.uid()));
