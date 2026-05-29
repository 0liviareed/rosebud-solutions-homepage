-- Pricing enquiries
--
-- Replaces the Brevo embed on /pricing. Service-role writes; row-level
-- security on (no public access).

CREATE TABLE IF NOT EXISTS pricing_enquiries (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name                 TEXT        NOT NULL,
  email                TEXT        NOT NULL,
  industry_interest    TEXT[]      NOT NULL DEFAULT '{}',
  request              TEXT        NOT NULL,
  consent              BOOLEAN     NOT NULL,
  user_agent           TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pricing_enquiries_created_idx
  ON pricing_enquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS pricing_enquiries_email_idx
  ON pricing_enquiries (lower(email));

ALTER TABLE pricing_enquiries ENABLE ROW LEVEL SECURITY;
