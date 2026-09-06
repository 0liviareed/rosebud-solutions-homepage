// workflow_events.step_name CONTRACT for the flows beyond Capture.
//
// `workflow_events.step_name` is deliberately free text (see
// supabase/migrations/0004_capture_capability.sql, "step_name vocabulary") so
// later capabilities can append step names without a migration. These are the
// names the dashboard READS today (they return 0 rows until the runtime for
// each flow exists and writes them). When you build Qualify / Book / Retain /
// Reactivate, write exactly these step names — one row per event, `meta` free.
//
// Capture's own step names (channel_intake, source_attribution, duplicate_check,
// first_response, record_merge, duplicate_reply_prevented, missed_call_textback,
// crm_write) are documented in 0004 and unchanged.
export const WORKFLOW_STEP = {
  qualified: "qualified",        // Qualify & Triage passed the enquiry (one per enquiry)
  booked: "booked",              // Book into Diary confirmed a slot (one per booking)
  messageSent: "message_sent",   // any outbound SMS / WhatsApp (reminders, nurture, replies)
  emailSent: "email_sent",       // any outbound email
} as const;

export type WorkflowStep = (typeof WORKFLOW_STEP)[keyof typeof WORKFLOW_STEP];

export const DASHBOARD_STEPS: readonly WorkflowStep[] = [
  WORKFLOW_STEP.qualified,
  WORKFLOW_STEP.booked,
  WORKFLOW_STEP.messageSent,
  WORKFLOW_STEP.emailSent,
];
