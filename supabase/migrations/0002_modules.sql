-- Modules-as-add-ons (2026-07-22). Run in the rosebud-app SQL Editor.
-- Tracks which optional modules a subscription carries, and what the abandoned-
-- checkout buffer captured. jsonb array of module keys, e.g. ["status","invoice"].
alter table subscriptions  add column if not exists modules jsonb not null default '[]'::jsonb;
alter table checkout_leads add column if not exists modules jsonb;
