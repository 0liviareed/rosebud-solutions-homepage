-- Three new fields on the appointment-setter application form:
--   outbound_experience  — required radio (None / Some / Significant)
--   outbound_feeling     — required radio (Love it / Fine with it / Prefer minimal / Avoid if possible)
--   calling_notes        — optional free text
--
-- Existing rows stay valid (columns are nullable + CHECK constraints
-- pass NULL through). New submissions are validated server-side in the
-- API route.

ALTER TABLE appointment_setter_applications
  ADD COLUMN IF NOT EXISTS outbound_experience TEXT
    CHECK (outbound_experience IN ('None', 'Some', 'Significant')),
  ADD COLUMN IF NOT EXISTS outbound_feeling TEXT
    CHECK (outbound_feeling IN ('Love it', 'Fine with it', 'Prefer minimal', 'Avoid if possible')),
  ADD COLUMN IF NOT EXISTS calling_notes TEXT;
