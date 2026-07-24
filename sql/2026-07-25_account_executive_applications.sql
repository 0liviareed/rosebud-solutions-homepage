-- Account Executive applications
--
-- Stores submissions from /careers/ae/apply. Sibling of
-- appointment_setter_applications — same pattern (service role inserts via the
-- SUPABASE_SERVICE_ROLE_KEY; Supabase Auth users do NOT see this table; RLS on
-- with no policies, so the service role bypasses and anon has no access).
--
-- Columns mirror the payload inserted by src/app/api/careers/ae/route.ts.
-- Run once in the dialler-project Supabase (the NEXT_PUBLIC_SUPABASE_URL project).

CREATE TABLE IF NOT EXISTS account_executive_applications (
  id                       UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name               TEXT        NOT NULL,
  last_name                TEXT        NOT NULL,
  email                    TEXT        NOT NULL,
  location                 TEXT        NOT NULL,
  linkedin_url             TEXT        NOT NULL,      -- required in form; may be 'N/A'
  portfolio_url            TEXT,                      -- optional

  -- Section 2 · Experience
  closing_experience       TEXT        NOT NULL,      -- None / Under 6 months / 6–18 months / 18 months – 3 years / 3+ years
  commission_role_before   BOOLEAN     NOT NULL,      -- worked a 100% commission role before
  demo_experience          TEXT        NOT NULL,      -- None / Some / Significant
  deal_value               TEXT        NOT NULL,      -- Under £5k / £5k–£20k / £20k–£50k / £50k+ / Varies
  close_rate               TEXT        NOT NULL,      -- Under 15% / 15–25% / 25–40% / 40%+ / Not sure
  managed_accounts         BOOLEAN     NOT NULL,      -- managed clients/accounts after the sale
  revenue_target           TEXT        NOT NULL,      -- carried a target + performance (free text)
  businesses_sold_to       TEXT,                      -- optional
  crm_experience           TEXT        NOT NULL,      -- which CRMs + how pipeline was logged
  own_network              TEXT,                      -- optional
  experience_notes         TEXT        NOT NULL,      -- 'anything else' (may be 'N/A')

  -- Section 3 · Setup
  equipment_check          TEXT[]      NOT NULL DEFAULT '{}',
  availability             TEXT        NOT NULL,      -- days/hours to run scheduled demos (free text)
  earliest_start_date      DATE        NOT NULL,
  timezone                 TEXT        NOT NULL,

  -- Data protection (four consents)
  gdpr_consent             BOOLEAN     NOT NULL,
  commission_consent       BOOLEAN     NOT NULL,      -- 100% commission + 3mo runway
  attribution_consent      BOOLEAN     NOT NULL,      -- commission paid only on logged/attributed closes
  location_consent         BOOLEAN     NOT NULL,      -- right to work as self-employed contractor

  user_agent               TEXT,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS account_executive_applications_created_idx
  ON account_executive_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS account_executive_applications_email_idx
  ON account_executive_applications (lower(email));

ALTER TABLE account_executive_applications ENABLE ROW LEVEL SECURITY;
