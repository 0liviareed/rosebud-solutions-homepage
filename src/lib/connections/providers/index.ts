// Side-effect import barrel — every adapter calls registerProvider() at
// module load time. Routes import this file (not the individual adapters)
// so the registry is always fully populated regardless of which route ran
// first.
import "./googleCalendar";
import "./googleWorkspaceMail";
import "./zoho";
import "./sendgrid";
import "./smtp";
import "./twilio";
import "./hubspot";
import "./salesforce";
import "./pipedrive";
import "./microsoftCalendar";
import "./microsoftMail";
import "./calcom";
import "./calendly";
import "./brevo";
import "./mailgun";
import "./postmark";
import "./whatsapp";
import "./instagram";

export { PROVIDERS, getProvider } from "./registry";
