import { Resend } from "resend";

// Transactional emails via Resend (Stripe sends the receipt + VAT invoice; Resend
// sends the lifecycle emails Stripe doesn't know about). From-address is a verified
// Resend sending domain — set RESEND_FROM in Vercel, else a sensible default.
const FROM = process.env.RESEND_FROM ?? "Rosebud Solutions <hello@rosebud.global>";
// Replies land in a monitored Zoho inbox (hello@ is send-only / may not exist).
const REPLY_TO = process.env.RESEND_REPLY_TO ?? "contact@rosebud.global";
const A = "#8B7DD8";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rosebud.global").replace(/\/$/, "");
const LOGO = `${SITE}/rosebud-icon.png`; // live on production, circular brand orb
// Escape user-supplied values (first name) before interpolating into email HTML.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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

export type EmailResult = { ok: boolean; id?: string | null; error?: string };

/** Post-purchase: confirms the account + subscription and books onboarding (signed link). */
export async function sendWelcomeOnboarding(opts: { email: string; firstName?: string | null; planName: string; bookingUrl: string; }): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.warn("RESEND_API_KEY missing — skipping welcome email"); return { ok: false, error: "RESEND_API_KEY missing" }; }
  const name = opts.firstName ? ` ${esc(opts.firstName)}` : "";
  const planName = esc(opts.planName);
  const bookingURL = opts.bookingUrl;
  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>You're on the ${planName} plan</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#e9e6f6; -webkit-text-size-adjust:100%;">
<span style="display:none; font-size:1px; color:#e9e6f6; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">Welcome${name} — your account is live. Next step: book your onboarding session so we can get your system live.</span>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#e9e6f6;">
  <tr>
    <td align="center" style="padding:36px 16px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="width:600px; max-width:600px;">

        <!-- Logo mark + wordmark -->
        <tr>
          <td class="px" style="padding:6px 10px 22px 10px;" align="left">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="30" style="width:30px;"><a href="${SITE}"><img src="${LOGO}" alt="Rosebud Solutions" width="30" height="30" style="display:block; width:30px; height:30px; border-radius:50%; border:0;"></a></td>
                <td style="padding-left:10px; font-family:Georgia, 'Times New Roman', serif; font-size:19px; color:#22243c;"><a href="${SITE}" style="color:#22243c; text-decoration:none;">Rosebud Solutions</a></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background-color:#ffffff; border-radius:22px; box-shadow:0 24px 48px -28px rgba(60,66,120,.5);">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

              <tr>
                <td class="px" style="padding:46px 52px 0 52px;">
                  <span style="font-family:Helvetica, Arial, sans-serif; font-size:11px; font-weight:bold; letter-spacing:2.5px; color:#a7a1c0; text-transform:uppercase;">Welcome</span>
                </td>
              </tr>

              <tr>
                <td class="px" style="padding:18px 52px 0 52px;">
                  <h1 style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-weight:normal; font-size:32px; line-height:38px; mso-line-height-rule:exactly; letter-spacing:-.3px; color:#22243c;">You're on the <span style="color:#5877e8;">${planName}</span>&nbsp;plan</h1>
                </td>
              </tr>

              <tr>
                <td class="px" style="padding:22px 52px 0 52px; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:26px; mso-line-height-rule:exactly; color:#6b6e8a;">
                  Welcome${name}. Your account is live and your subscription is active. Your receipt arrives separately from Stripe.
                </td>
              </tr>

              <tr>
                <td class="px" style="padding:20px 52px 0 52px; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:26px; mso-line-height-rule:exactly; color:#6b6e8a;">
                  <strong style="color:#22243c;">Next step:</strong> book your onboarding session so we can get your system live. Pick a time here:
                </td>
              </tr>

              <!-- Bulletproof pill button -->
              <tr>
                <td class="px" align="left" style="padding:30px 52px 0 52px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td bgcolor="#2c2f4a" style="border-radius:28px;">
                        <a href="${bookingURL}" style="display:block; padding:15px 30px; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:20px; mso-line-height-rule:exactly; color:#ffffff; text-decoration:none; font-weight:bold; border-radius:28px;">Book your onboarding &nbsp;&rarr;</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td class="px" style="padding:30px 52px 0 52px; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:26px; mso-line-height-rule:exactly; color:#6b6e8a;">
                  Book a slot in the next few days. Your subscription is already running, so the sooner we onboard, the sooner your system is working for you. Most clients are live within one to two weeks of that session.
                </td>
              </tr>

              <!-- On the call -->
              <tr>
                <td class="px" style="padding:30px 52px 48px 52px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#eceafa; border-radius:16px;">
                    <tr>
                      <td style="padding:22px 26px;">
                        <span style="display:block; font-family:Helvetica, Arial, sans-serif; font-size:10.5px; font-weight:bold; letter-spacing:2px; color:#5877e8; text-transform:uppercase; padding-bottom:8px;">On the call</span>
                        <span style="font-family:Helvetica, Arial, sans-serif; font-size:14px; line-height:23px; mso-line-height-rule:exactly; color:#3a3d5c;">We'll agree your good-lead definition, connect your CRM and calendar, and set your escalation rules.</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="px" align="center" style="padding:28px 10px 8px 10px; font-family:Helvetica, Arial, sans-serif; font-size:12px; line-height:19px; mso-line-height-rule:exactly; color:#8a87a6;">
            Rosebud Solutions &middot; You're receiving this because you created an account at <a href="${SITE}" style="color:#5877e8; text-decoration:none;">rosebud.global</a>.<br>
            Questions? Reply to this email or write to <a href="mailto:contact@rosebud.global" style="color:#5877e8; text-decoration:none;">contact@rosebud.global</a>.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
  try {
    const resend = new Resend(key);
    const r = await resend.emails.send({ from: FROM, replyTo: REPLY_TO, to: opts.email, subject: `You're on the ${opts.planName} plan — let's book your onboarding`, html });
    if (r.error) { console.error("sendWelcomeOnboarding resend error:", JSON.stringify(r.error)); return { ok: false, error: JSON.stringify(r.error) }; }
    return { ok: true, id: r.data?.id ?? null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("sendWelcomeOnboarding failed:", msg);
    return { ok: false, error: msg };
  }
}

/** Resource lead-magnet delivery: emails the download links for a gated resource. */
export async function sendResourceDownload(opts: { email: string; firstName?: string | null; resourceTitle: string; files: { label: string; url: string }[] }): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.warn("RESEND_API_KEY missing — skipping resource download email"); return { ok: false, error: "RESEND_API_KEY missing" }; }
  const links = opts.files.map((f) => `<p style="margin:0 0 14px;">${btn(f.url, f.label)}</p>`).join("");
  const greeting = opts.firstName ? `Hi ${esc(opts.firstName)},` : "Hi,";
  const html = shell(`
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:24px;margin:8px 0 14px;">${esc(opts.resourceTitle)}</h1>
    <p style="margin:0 0 20px;">${greeting} as requested — here are your files.</p>
    ${links}
    <p style="margin:20px 0 0;color:#8a8698;font-size:13px;">Questions? Just reply to this email.</p>
  `);
  try {
    const resend = new Resend(key);
    const r = await resend.emails.send({ from: FROM, replyTo: REPLY_TO, to: opts.email, subject: `Your download: ${opts.resourceTitle}`, html });
    if (r.error) { console.error("sendResourceDownload resend error:", JSON.stringify(r.error)); return { ok: false, error: JSON.stringify(r.error) }; }
    return { ok: true, id: r.data?.id ?? null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("sendResourceDownload failed:", msg);
    return { ok: false, error: msg };
  }
}

/** Wasted lead spend calculator: emails the visitor their own figures on request ("Email it to me"). */
export async function sendCalculatorResult(opts: {
  email: string;
  currency: "$" | "£";
  spend: number;
  leads: number;
  replyOutOfTen: number;
  customerValue: number | null;
  closeOutOfTen: number | null;
}): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.warn("RESEND_API_KEY missing — skipping calculator result email"); return { ok: false, error: "RESEND_API_KEY missing" }; }

  const cur = opts.currency;
  const money = (n: number) => `${cur}${Math.round(n).toLocaleString("en-US")}`;
  const money2 = (n: number) => `${cur}${n.toFixed(2)}`;

  const rate = opts.replyOutOfTen / 10;
  const worked = opts.leads * rate;
  const lost = opts.leads - worked;
  const cpl = opts.spend / opts.leads;
  const cplw = worked > 0 ? opts.spend / worked : 0;
  const wasted = opts.spend * (1 - rate);

  const rows = [
    ["Monthly spend on enquiries nobody replies to", money(wasted)],
    ["That is, a year", money(wasted * 12)],
    ["What each enquiry costs you", money2(cpl)],
    ["What each enquiry you actually reply to costs you", worked > 0 ? money2(cplw) : "n/a"],
    ["Enquiries a month nobody replies to", Math.round(lost).toLocaleString("en-US")],
  ];

  if (opts.closeOutOfTen && opts.closeOutOfTen > 0 && opts.customerValue && opts.customerValue > 0) {
    const closeRate = opts.closeOutOfTen / 10;
    const customers = lost * closeRate;
    rows.push(
      ["Customers those enquiries would have become, a month", customers.toFixed(1)],
      ["What that is worth a year, at your figures", money(customers * opts.customerValue * 12)],
      ["What each customer currently costs you", worked * closeRate > 0 ? money(opts.spend / (worked * closeRate)) : "n/a"],
    );
  }

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6b6880;font-size:13.5px;">${esc(label)}</td><td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;font-weight:700;color:#17131F;font-size:15px;">${esc(value)}</td></tr>`
    )
    .join("");

  const html = shell(`
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:24px;margin:8px 0 14px;">Your wasted lead spend breakdown</h1>
    <p style="margin:0 0 20px;">Here are the figures from the calculator, based on what you entered.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${table}</table>
    <p style="margin:20px 0 0;color:#8a8698;font-size:13px;">Estimates from your own figures and our 2026 study benchmark — not a forecast. Questions? Just reply to this email.</p>
    <p style="margin:16px 0 0;">${btn("https://rosebud.global/pricing", "See how Rosebud handles this")}</p>
  `);

  try {
    const resend = new Resend(key);
    const r = await resend.emails.send({ from: FROM, replyTo: REPLY_TO, to: opts.email, subject: "Your wasted lead spend breakdown", html });
    if (r.error) { console.error("sendCalculatorResult resend error:", JSON.stringify(r.error)); return { ok: false, error: JSON.stringify(r.error) }; }
    return { ok: true, id: r.data?.id ?? null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("sendCalculatorResult failed:", msg);
    return { ok: false, error: msg };
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
    await resend.emails.send({ from: FROM, replyTo: REPLY_TO, to: opts.email, subject: "You left something behind", html });
  } catch (err) {
    console.error("sendAbandonedNudge failed:", err instanceof Error ? err.message : String(err));
  }
}
