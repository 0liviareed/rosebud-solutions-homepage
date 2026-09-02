-- Connections — the bring-your-own integration layer for the self-serve Engine
-- build (Phase 1 of ~/Downloads/Rosebud_Engine_SelfServe_Build_Doc_v3.md §5,
-- §5.1). A client connects THEIR OWN CRM/calendar/channel accounts; Rosebud
-- hosts nothing by default. This is a new, separate build from the Capture
-- capability in 0004 — see the Document Register: "Existing engine unchanged.
-- Tracking is additive. Tool shell is the new build." tenant_id in the v3 doc
-- is this project's existing org_id (orgs, from 0001) — no new identity model.
-- Run once in the rosebud-app Supabase project (SQL Editor), after 0001-0004.
-- Same convention as 0001/0004: RLS on everywhere, service role (server
-- routes only) bypasses it and does all writes; policies below open only the
-- org-scoped reads the logged-in client needs. connection_secrets gets NO
-- client policy at all, same posture as checkout_leads in 0001 — only the
-- service role may ever read a token.

-- ─────────────────────────────────────────────────────────────────────────────
-- CONNECTIONS — one row per (org, category, provider). A reconnect always
-- updates this same row rather than creating a new one (unique index below),
-- so anything that references connections.id later (Phase 2's config_version)
-- never dangles across a disconnect/reconnect cycle.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists connections (
  id                     uuid primary key default gen_random_uuid(),
  org_id                 uuid not null references orgs(id) on delete cascade,

  category               text not null check (category in ('crm', 'calendar', 'channel')),
  -- provider examples: zoho, hubspot, salesforce, pipedrive, google, microsoft,
  -- calcom, calendly, twilio, whatsapp, instagram, included_crm.
  provider               text not null,
  method                 text not null check (method in ('oauth', 'credential', 'guided', 'meta_oauth', 'included')),

  status                 text not null default 'pending'
                           check (status in ('pending', 'active', 'expired', 'broken', 'disconnected')),

  -- display only, e.g. "acme@zoho.eu" — the CLIENT's own account, never Rosebud's.
  external_account_ref   text,
  -- zoho: eu | us | in. salesforce: production | sandbox. null for everything else.
  region                 text,
  scopes                 text[] not null default '{}',

  -- pointer into connection_secrets.id — the token itself is NEVER in this row.
  secret_ref             uuid,

  -- in-flight OAuth state, cleared on success or failure — not a long-lived secret.
  oauth_nonce            text,
  oauth_state_created_at timestamptz,

  last_health_check      timestamptz,
  health_reason          text,

  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index if not exists connections_org_idx     on connections(org_id);
create index if not exists connections_org_cat_idx on connections(org_id, category);
create unique index if not exists connections_org_provider_uidx on connections(org_id, category, provider);

-- ─────────────────────────────────────────────────────────────────────────────
-- CONNECTION_SECRETS — envelope-encrypted (AES-256-GCM, key in the
-- CONNECTIONS_ENCRYPTION_KEY Vercel env var) OAuth tokens / API keys /
-- credentials. Referenced by connections.secret_ref, never joined directly by
-- anything client-facing. See src/lib/connections/secrets.ts.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists connection_secrets (
  id            uuid primary key default gen_random_uuid(),
  connection_id uuid references connections(id) on delete cascade,
  ciphertext    text not null,   -- base64
  iv            text not null,   -- base64
  auth_tag      text not null,   -- base64
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists connection_secrets_connection_idx on connection_secrets(connection_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────────────────────────────────────────
alter table connections        enable row level security;
alter table connection_secrets enable row level security;

create policy connections_member_read on connections for select
  using (exists (select 1 from org_members m where m.org_id = connections.org_id and m.user_id = auth.uid()));
-- connection_secrets: intentionally no policy at all — service role only.
