-- Manual applicant pipeline (kanban) shown on the war-room dashboard's
-- /applicants page above the form-submission list. Hand-entered cards
-- only; not auto-populated from appointment_setter_applications.

CREATE TABLE IF NOT EXISTS applicant_pipeline (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  social_url  TEXT,
  stage       TEXT        NOT NULL CHECK (stage IN (
                            'applied',
                            'interviewed',
                            'proposal_sent',
                            'contract_sent',
                            'onboarding',
                            'declined'
                          )),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS applicant_pipeline_stage_idx
  ON applicant_pipeline (stage, created_at DESC);

ALTER TABLE applicant_pipeline ENABLE ROW LEVEL SECURITY;

-- Convenience: bump updated_at on update.
CREATE OR REPLACE FUNCTION applicant_pipeline_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS applicant_pipeline_updated_at ON applicant_pipeline;
CREATE TRIGGER applicant_pipeline_updated_at
  BEFORE UPDATE ON applicant_pipeline
  FOR EACH ROW EXECUTE FUNCTION applicant_pipeline_set_updated_at();
