-- Appointment Setter applications
--
-- Stores submissions from /careers/appointment-setter/apply. Replaces the
-- Brevo form embed. Service role inserts; Supabase Auth users do NOT see
-- this table.

CREATE TABLE IF NOT EXISTS appointment_setter_applications (
  id                       UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name               TEXT        NOT NULL,
  last_name                TEXT        NOT NULL,
  email                    TEXT        NOT NULL,
  location                 TEXT        NOT NULL,
  linkedin_url             TEXT,
  b2b_experience           TEXT[]      NOT NULL DEFAULT '{}',
  commission_role_before   BOOLEAN     NOT NULL,
  commission_role_details  TEXT,
  industry_experience      TEXT[]      NOT NULL DEFAULT '{}',
  equipment_check          TEXT[]      NOT NULL DEFAULT '{}',
  hours_per_week           INT         NOT NULL CHECK (hours_per_week > 0 AND hours_per_week <= 80),
  earliest_start_date      DATE        NOT NULL,
  gdpr_consent             BOOLEAN     NOT NULL,
  commission_consent       BOOLEAN     NOT NULL,
  location_consent         BOOLEAN     NOT NULL,
  user_agent               TEXT,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS appointment_setter_applications_created_idx
  ON appointment_setter_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS appointment_setter_applications_email_idx
  ON appointment_setter_applications (lower(email));

ALTER TABLE appointment_setter_applications ENABLE ROW LEVEL SECURITY;
