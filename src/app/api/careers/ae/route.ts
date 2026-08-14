import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * Account Executive (full-cycle closer) application handler.
 * Sibling of the SDR handler (/api/careers/sdr) — same plain
 * Next.js + Supabase + Telegram pattern, different fields.
 *
 * Flow:
 *   1. Validate every required field server-side.
 *   2. Insert one row into account_executive_applications.
 *   3. Fire a role-tagged Telegram alert to the warroom chat(s).
 *      Alert is awaited (fire-and-forget dies in Vercel serverless);
 *      the Supabase insert is authoritative.
 *
 * Env vars (shared with the SDR route, set in Vercel):
 *   - NEXT_PUBLIC_SUPABASE_URL          (dialler project)
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - TELEGRAM_BOT_TOKEN
 *   - TELEGRAM_WARROOM_CHAT_IDS         (comma-separated)
 */

const CLOSING_EXPERIENCE_OPTIONS = new Set([
  "None",
  "Under 6 months",
  "6–18 months",
  "18 months – 3 years",
  "3+ years",
]);

const DEMO_EXPERIENCE_OPTIONS = new Set([
  "None",
  "Some",
  "Significant",
]);

const DEAL_VALUE_OPTIONS = new Set([
  "Under £5k",
  "£5k–£20k",
  "£20k–£50k",
  "£50k+",
  "Varies",
]);

const CLOSE_RATE_OPTIONS = new Set([
  "Under 15%",
  "15–25%",
  "25–40%",
  "40%+",
  "Not sure",
]);

const EQUIPMENT_OPTIONS = new Set([
  "Computer or laptop",
  "Headset with microphone",
  "Webcam",
  "Wired or stable Wi-Fi internet",
  "Quiet, professional environment for video calls",
]);

const TIMEZONE_OPTIONS = new Set([
  "Europe/London",
  "Europe/Dublin",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Athens",
  "Africa/Lagos",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Manila",
  "Asia/Singapore",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Mexico_City",
  "America/Sao_Paulo",
  "Australia/Sydney",
  "Pacific/Auckland",
  "UTC",
]);

type Body = {
  first_name?: string;
  last_name?: string;
  email?: string;
  location?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  closing_experience?: string;
  commission_role_before?: boolean;
  demo_experience?: string;
  deal_value?: string;
  close_rate?: string;
  managed_accounts?: boolean;
  revenue_target?: string;
  businesses_sold_to?: string;
  crm_experience?: string;
  own_network?: string;
  experience_notes?: string;
  equipment_check?: string[];
  availability?: string;
  earliest_start_date?: string;
  timezone?: string;
  gdpr_consent?: boolean;
  commission_consent?: boolean;
  attribution_consent?: boolean;
  location_consent?: boolean;
};

function bad(detail: string) {
  return NextResponse.json({ error: detail }, { status: 400 });
}

function nonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function validIsoDate(v: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(v) && !isNaN(new Date(v).getTime());
}

function validateArray(input: unknown, allowed: Set<string>): string[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const cleaned: string[] = [];
  for (const item of input) {
    if (typeof item !== "string") return null;
    if (!allowed.has(item)) return null;
    cleaned.push(item);
  }
  return cleaned;
}

async function fireTelegram(name: string, email: string, location: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_WARROOM_CHAT_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chats.length === 0) return;

  // Plain text only — no parse_mode. Applicant fields routinely contain
  // characters Markdown/HTML treats as markup, which return 400 from Telegram
  // and silently fail. Role-tagged so AE and SDR alerts are distinguishable.
  const msg = `New AE application\n${name}\n${email}\n${location}`;

  await Promise.all(
    chats.map(async (chatId) => {
      try {
        const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: msg }),
        });
        if (!r.ok) {
          const t = await r.text().catch(() => "");
          console.error(
            `[ae] telegram send to ${chatId} failed status=${r.status} body=${t.slice(0, 200)}`
          );
        }
      } catch (e) {
        console.error(
          `[ae] telegram send to ${chatId} threw:`,
          e instanceof Error ? e.message : String(e)
        );
      }
    })
  );
}

export async function POST(req: Request) {
  const bot = await checkBotId();
  if (bot.isBot) return NextResponse.json({ error: "Request blocked." }, { status: 403 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("Invalid JSON body");
  }

  // String fields
  if (!nonEmptyString(body.first_name)) return bad("First name is required");
  if (!nonEmptyString(body.last_name)) return bad("Last name is required");
  if (!nonEmptyString(body.email) || !validEmail(body.email))
    return bad("A valid email address is required");
  if (!nonEmptyString(body.location)) return bad("Location is required");

  // LinkedIn — required, but accepts "N/A"; validate as URL only if it looks like one
  if (!nonEmptyString(body.linkedin_url)) return bad("LinkedIn URL is required (or 'N/A')");
  let linkedinUrl = body.linkedin_url.trim();
  if (/^https?:\/\//i.test(linkedinUrl)) {
    // ok
  } else if (linkedinUrl.toLowerCase() === "n/a") {
    linkedinUrl = "N/A";
  } else if (/linkedin\.com/i.test(linkedinUrl)) {
    linkedinUrl = `https://${linkedinUrl.replace(/^\/+/, "")}`;
  }

  // Optional portfolio URL
  let portfolioUrl: string | null = null;
  if (nonEmptyString(body.portfolio_url)) {
    const u = body.portfolio_url.trim();
    if (!/^https?:\/\//i.test(u)) return bad("Portfolio URL must start with http(s)://");
    portfolioUrl = u;
  }

  // Single-select radios
  if (!nonEmptyString(body.closing_experience) || !CLOSING_EXPERIENCE_OPTIONS.has(body.closing_experience))
    return bad("Select your closing / AE / B2B sales experience");
  const closingExperience = body.closing_experience;

  if (typeof body.commission_role_before !== "boolean")
    return bad("Answer the commission-role question");

  if (!nonEmptyString(body.demo_experience) || !DEMO_EXPERIENCE_OPTIONS.has(body.demo_experience))
    return bad("Select how much closing/demo experience you have");
  const demoExperience = body.demo_experience;

  if (!nonEmptyString(body.deal_value) || !DEAL_VALUE_OPTIONS.has(body.deal_value))
    return bad("Select the typical value of the deals you've closed");
  const dealValue = body.deal_value;

  if (!nonEmptyString(body.close_rate) || !CLOSE_RATE_OPTIONS.has(body.close_rate))
    return bad("Select your typical close rate");
  const closeRate = body.close_rate;

  if (typeof body.managed_accounts !== "boolean")
    return bad("Answer the account-management question");

  // Required free-text
  if (!nonEmptyString(body.revenue_target)) return bad("Tell us about your revenue target and performance");
  const revenueTarget = body.revenue_target.trim();

  if (!nonEmptyString(body.crm_experience)) return bad("Tell us which CRMs you've used");
  const crmExperience = body.crm_experience.trim();

  if (!nonEmptyString(body.experience_notes)) return bad("Add a note about your experience, or write 'N/A'");
  const experienceNotes = body.experience_notes.trim();

  // Optional free-text
  const businessesSoldTo = nonEmptyString(body.businesses_sold_to) ? body.businesses_sold_to.trim() : null;
  const ownNetwork = nonEmptyString(body.own_network) ? body.own_network.trim() : null;

  // Equipment multiselect
  const equipment = validateArray(body.equipment_check, EQUIPMENT_OPTIONS);
  if (!equipment) return bad("Select at least one item for the equipment check");

  // Availability free-text
  if (!nonEmptyString(body.availability)) return bad("Tell us your availability to run scheduled demos");
  const availability = body.availability.trim();

  // Timezone
  if (!nonEmptyString(body.timezone) || !TIMEZONE_OPTIONS.has(body.timezone))
    return bad("Select your time zone");
  const timezone = body.timezone;

  // Date — today or later
  if (!nonEmptyString(body.earliest_start_date) || !validIsoDate(body.earliest_start_date))
    return bad("Earliest start date is required");
  const startDate = body.earliest_start_date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (new Date(startDate).getTime() < today.getTime() - 24 * 60 * 60 * 1000)
    return bad("Start date must be today or later");

  // Consents (four)
  if (!body.gdpr_consent) return bad("Privacy policy consent is required");
  if (!body.commission_consent) return bad("Commission-role acknowledgment is required");
  if (!body.attribution_consent) return bad("CRM-attribution acknowledgment is required");
  if (!body.location_consent) return bad("Right-to-work confirmation is required");

  // Insert into Supabase
  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[ae] missing Supabase env");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const userAgent = req.headers.get("user-agent") || null;

  const { error: insertErr } = await supabase
    .from("account_executive_applications")
    .insert({
      first_name: body.first_name.trim(),
      last_name: body.last_name.trim(),
      email: body.email.trim(),
      location: body.location.trim(),
      linkedin_url: linkedinUrl,
      portfolio_url: portfolioUrl,
      closing_experience: closingExperience,
      commission_role_before: body.commission_role_before,
      demo_experience: demoExperience,
      deal_value: dealValue,
      close_rate: closeRate,
      managed_accounts: body.managed_accounts,
      revenue_target: revenueTarget,
      businesses_sold_to: businessesSoldTo,
      crm_experience: crmExperience,
      own_network: ownNetwork,
      experience_notes: experienceNotes,
      equipment_check: equipment,
      availability: availability,
      earliest_start_date: startDate,
      timezone,
      gdpr_consent: body.gdpr_consent,
      commission_consent: body.commission_consent,
      attribution_consent: body.attribution_consent,
      location_consent: body.location_consent,
      user_agent: userAgent,
    });

  if (insertErr) {
    console.error("[ae] insert failed:", insertErr.message);
    return NextResponse.json(
      { error: "Couldn't save your application. Please try again, or email contact@rosebud.global." },
      { status: 500 }
    );
  }

  // Await the Telegram alert — void/fire-and-forget doesn't work in Vercel
  // serverless (the runtime terminates the function as the response returns).
  const fullName = `${body.first_name.trim()} ${body.last_name.trim()}`;
  await fireTelegram(fullName, body.email.trim(), body.location.trim());

  return NextResponse.json({ ok: true });
}
