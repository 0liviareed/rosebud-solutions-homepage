import { Resend } from "resend";

// Transactional emails via Resend (Stripe sends the receipt + VAT invoice; Resend
// sends the lifecycle emails Stripe doesn't know about). From-address is a verified
// Resend sending domain — set RESEND_FROM in Vercel, else a sensible default.
const FROM = process.env.RESEND_FROM ?? "Rosebud Solutions <hello@rosebud.global>";
const A = "#8B7DD8";

function shell(inner: string): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#EDEBF3;padding:32px 0;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 20px 50px -30px rgba(23,19,31,.25);">
    <div style="padding:28px 34px 8px;"><span style="font-size:13px;letter-spacing:.28em;text-transform:uppercase;color:${A};font-weight:600;">Rosebud Solutions</span></div>
    <div style="padding:8px 34px 32px;color:#17131F;font-size:15px;line-height:1.6;">${inner}</div>
    <div style="padding:16px 34px;background:#f7f5fc;border-top:1px solid #eee;font-size:12px;color:#8a8698;">Rosebud Global Ltd · You're receiving this because you created an account at rosebud.global.</div>
  </div></div>`;
}
const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:${A};color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 26px;border-radius:12px;">${label}</a>`;

/** Post-purchase: confirms the account + subscription and books onboarding (signed link). */
export async function sendWelcomeOnboarding(opts: { email: string; firstName?: string | null; planName: string; bookingUrl: string; }): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.warn("RESEND_API_KEY missing — skipping welcome email"); return; }
  const name = opts.firstName ? `${opts.firstName}, ` : "";
  const html = shell(`
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:26px;margin:8px 0 14px;">You're on the ${opts.planName} plan</h1>
    <p style="margin:0 0 16px;">Welcome ${name}— your account is live and your subscription is active. Your receipt and VAT invoice arrive separately from Stripe.</p>
    <p style="margin:0 0 20px;"><b>Next step:</b> book your onboarding session so we can get your system live. Pick a time here:</p>
    <p style="margin:0 0 22px;">${btn(opts.bookingUrl, "Book your onboarding →")}</p>
    <p style="margin:0;color:#6b6878;font-size:13.5px;">On the call we'll agree your good-lead definition, connect your CRM &amp; calendar, and set your escalation rules. Full refund if you cancel before that session.</p>
  `);
  try {
    const resend = new Resend(key);
    await resend.emails.send({ from: FROM, to: opts.email, subject: `You're on the ${opts.planName} plan — let's book your onboarding`, html });
  } catch (err) {
    console.error("sendWelcomeOnboarding failed:", err instanceof Error ? err.message : String(err));
  }
}

/** Abandoned-checkout nudge (copy supplied by Jay/Saj — placeholder body until then). */
export async function sendAbandonedNudge(opts: { email: string; firstName?: string | null; resumeUrl: string; }): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const html = shell(`
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:24px;margin:8px 0 14px;">You left something behind</h1>
    <p style="margin:0 0 20px;">Your plan is still saved — pick up right where you left off whenever you're ready.</p>
    <p style="margin:0 0 8px;">${btn(opts.resumeUrl, "Finish setting up →")}</p>
  `);
  try {
    const resend = new Resend(key);
    await resend.emails.send({ from: FROM, to: opts.email, subject: "You left something behind", html });
  } catch (err) {
    console.error("sendAbandonedNudge failed:", err instanceof Error ? err.message : String(err));
  }
}
