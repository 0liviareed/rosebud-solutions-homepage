-- Per-day hours commitment + days/week + timezone on the appointment-setter
-- application form. Replaces the single hours_per_week field.
--
-- New columns are nullable + CHECK-constrained so existing rows stay valid;
-- the API enforces "must be present" server-side for new submissions.
--
-- hours_per_week is kept (legacy) so the dashboard view doesn't break;
-- new submissions populate it as the sum of mon+tue+wed+thu+fri.

ALTER TABLE appointment_setter_applications
  ADD COLUMN IF NOT EXISTS hours_monday    SMALLINT CHECK (hours_monday    BETWEEN 0 AND 16),
  ADD COLUMN IF NOT EXISTS hours_tuesday   SMALLINT CHECK (hours_tuesday   BETWEEN 0 AND 16),
  ADD COLUMN IF NOT EXISTS hours_wednesday SMALLINT CHECK (hours_wednesday BETWEEN 0 AND 16),
  ADD COLUMN IF NOT EXISTS hours_thursday  SMALLINT CHECK (hours_thursday  BETWEEN 0 AND 16),
  ADD COLUMN IF NOT EXISTS hours_friday    SMALLINT CHECK (hours_friday    BETWEEN 0 AND 16),
  ADD COLUMN IF NOT EXISTS days_per_week   SMALLINT CHECK (days_per_week   BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS timezone        TEXT;
