// Static list of every card the S2 screen renders (Rosebud_Engine_SelfServe_Build_Doc_v3.md
// §5's wireframe/table), independent of which adapters are actually wired up
// yet. `built: false` cards render disabled ("Connect" does nothing but show
// "Coming soon") — this lets the screen match the full spec visually from
// day one while providers land behind it incrementally, per §10's own build
// order ("add the remaining ... behind the same uniform card").

export type CategoryKey = "crm" | "calendar" | "channel";

export type ProviderEntry = {
  key: string;
  label: string;
  built: boolean;
  supportsRegion?: boolean;
  // OAuth providers redirect via /start; credential providers open a form
  // modal and POST to /credential; guided (WhatsApp) drives Meta's Embedded
  // Signup JS SDK; meta_oauth (Instagram) is OAuth via the shared callback,
  // kept as its own method value per the v3 doc's method taxonomy even
  // though it's mechanically identical to "oauth" today. Only meaningful
  // when built: true.
  method?: "oauth" | "credential" | "guided" | "meta_oauth";
  // Field spec for credential-method providers — drives CredentialModal's
  // form without a per-provider component.
  credentialFields?: { key: string; label: string; type: "text" | "password" | "number" }[];
};

export type CategorySection = {
  category: CategoryKey;
  label: string;
  required: "one" | "all"; // crm/calendar: exactly one must be active; channel: at least one
  providers: ProviderEntry[];
};

const SENDGRID_FIELDS = [{ key: "api_key", label: "API key", type: "password" as const }];

const SMTP_FIELDS = [
  { key: "host", label: "Host", type: "text" as const },
  { key: "port", label: "Port", type: "number" as const },
  { key: "user", label: "Username", type: "text" as const },
  { key: "password", label: "Password", type: "password" as const },
  { key: "sending_domain", label: "Sending domain", type: "text" as const },
];

const TWILIO_FIELDS = [
  { key: "account_sid", label: "Account SID", type: "text" as const },
  { key: "auth_token", label: "Auth Token", type: "password" as const },
];

const BREVO_FIELDS = [{ key: "api_key", label: "API key", type: "password" as const }];
const MAILGUN_FIELDS = [{ key: "api_key", label: "API key", type: "password" as const }];
const POSTMARK_FIELDS = [{ key: "api_key", label: "Server API token", type: "password" as const }];

export const PROVIDER_CATALOGUE: CategorySection[] = [
  {
    category: "crm",
    label: "CRM",
    required: "one",
    providers: [
      { key: "zoho", label: "Zoho", built: true, method: "oauth", supportsRegion: true },
      { key: "hubspot", label: "HubSpot", built: true, method: "oauth" },
      { key: "salesforce", label: "Salesforce", built: true, method: "oauth", supportsRegion: true },
      { key: "pipedrive", label: "Pipedrive", built: true, method: "oauth" },
    ],
  },
  {
    category: "calendar",
    label: "Calendar",
    required: "one",
    providers: [
      { key: "google", label: "Google Calendar", built: true, method: "oauth" },
      { key: "microsoft", label: "Outlook", built: true, method: "oauth" },
      { key: "calcom", label: "Cal.com", built: true, method: "oauth" },
      { key: "calendly", label: "Calendly", built: true, method: "oauth" },
    ],
  },
  {
    category: "channel",
    label: "Channels",
    required: "one",
    providers: [
      { key: "google", label: "Email — Google Workspace", built: true, method: "oauth" },
      { key: "microsoft", label: "Email — Microsoft 365", built: true, method: "oauth" },
      { key: "sendgrid", label: "Email — SendGrid", built: true, method: "credential", credentialFields: SENDGRID_FIELDS },
      { key: "brevo", label: "Email — Brevo", built: true, method: "credential", credentialFields: BREVO_FIELDS },
      { key: "mailgun", label: "Email — Mailgun", built: true, method: "credential", credentialFields: MAILGUN_FIELDS },
      { key: "postmark", label: "Email — Postmark", built: true, method: "credential", credentialFields: POSTMARK_FIELDS },
      { key: "smtp", label: "Email — SMTP", built: true, method: "credential", credentialFields: SMTP_FIELDS },
      { key: "twilio", label: "SMS — Twilio", built: true, method: "credential", credentialFields: TWILIO_FIELDS },
      { key: "whatsapp", label: "WhatsApp", built: true, method: "guided" },
      { key: "instagram", label: "Instagram", built: true, method: "meta_oauth" },
    ],
  },
];

// §5: "Where the tenant's vertical is US dental, those two channel cards
// render `unavailable` with a one-line reason" (Meta won't sign a BAA).
// NOT wired up yet — orgs has no vertical/industry column today (flagged as
// a known gap in the Phase 1 plan), so there's nothing real to key this
// check off. Left as a named constant + comment rather than half-built
// plumbing that can never actually fire — wire this in once that column
// exists, keyed off org.vertical === 'dental' && org.country === 'US'.
export const META_UNAVAILABLE_PROVIDERS = new Set(["whatsapp", "instagram"]);
