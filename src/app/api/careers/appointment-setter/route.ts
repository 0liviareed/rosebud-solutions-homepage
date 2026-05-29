import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * Custom appointment-setter application handler.
 *
 * Replaces the Brevo form embed (which kept breaking under styling
 * overrides). This is plain Next.js + Supabase + Telegram.
 *
 * Flow:
 *   1. Validate every required field server-side.
 *   2. Insert one row into appointment_setter_applications.
 *   3. Fire a Telegram alert to the warroom chat(s) with the highlights.
 *      Alert is fire-and-forget — Supabase insert is authoritative.
 *
 * Env vars (set in Vercel):
 *   - NEXT_PUBLIC_SUPABASE_URL          (dialler project)
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - TELEGRAM_BOT_TOKEN
 *   - TELEGRAM_WARROOM_CHAT_IDS         (comma-separated, e.g. "8224244641,1655224604")
 */

const B2B_OPTIONS = new Set([
  "None",
  "Under 6 months",
  "6–18 months",
  "18 months – 3 years",
  "3+ years",
]);

const INDUSTRY_OPTIONS = new Set([
  "Dental, Aesthetic & Private Healthcare",
  "Mortgage & Lending",
  "Insurance",
  "Real Estate",
  "Recruitment",
  "Enterprise",
  "Other",
]);

const EQUIPMENT_OPTIONS = new Set([
  "Computer or laptop",
  "Headset with microphone",
  "Wired or stable Wi-Fi internet",
  "Quiet calling environment",
]);

type Body = {
  first_name?: string;
  last_name?: string;
  email?: string;
  location?: string;
  linkedin_url?: string;
  b2b_experience?: string[];
  commission_role_before?: boolean;
  commission_role_details?: string;
  industry_experience?: string[];
  equipment_check?: string[];
  hours_per_week?: number;
  earliest_start_date?: string;
  gdpr_consent?: boolean;
  commission_consent?: boolean;
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

async function fireTelegram(name: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_WARROOM_CHAT_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chats.length === 0) return;

  // Plain text only — no parse_mode. Applicant fields routinely contain
  // characters Markdown/HTML treats as markup (underscores in emails,
  // ampersands in companies, etc.) which return 400 from Telegram and
  // silently fail. Plain text is bulletproof.
  const msg = `🌹 New application: ${name}`;

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
            `[appointment-setter] telegram send to ${chatId} failed status=${r.status} body=${t.slice(0, 200)}`
          );
        }
      } catch (e) {
        console.error(
          `[appointment-setter] telegram send to ${chatId} threw:`,
          e instanceof Error ? e.message : String(e)
        );
      }
    })
  );
}

export async function POST(req: Request) {
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

  // Optional LinkedIn URL — light validation
  let linkedinUrl: string | null = null;
  if (nonEmptyString(body.linkedin_url)) {
    const u = body.linkedin_url.trim();
    if (u.length > 0) {
      if (!/^https?:\/\//i.test(u)) return bad("LinkedIn URL must start with http(s)://");
      linkedinUrl = u;
    }
  }

  // Multiselects
  const b2b = validateArray(body.b2b_experience, B2B_OPTIONS);
  if (!b2b) return bad("Select at least one option for B2B experience");

  const industry = validateArray(body.industry_experience, INDUSTRY_OPTIONS);
  if (!industry) return bad("Select at least one option for industry experience");

  const equipment = validateArray(body.equipment_check, EQUIPMENT_OPTIONS);
  if (!equipment) return bad("Select at least one item for the equipment check");

  // Yes/No commission role
  if (typeof body.commission_role_before !== "boolean")
    return bad("Answer the commission-role question");
  let commissionDetails: string | null = null;
  if (body.commission_role_before) {
    if (!nonEmptyString(body.commission_role_details))
      return bad("Describe your previous commission role");
    commissionDetails = body.commission_role_details.trim();
  } else if (nonEmptyString(body.commission_role_details)) {
    commissionDetails = body.commission_role_details.trim();
  }

  // Hours per week
  const hours = Number(body.hours_per_week);
  if (!Number.isFinite(hours) || hours <= 0 || hours > 80)
    return bad("Hours per week must be between 1 and 80");

  // Date
  if (!nonEmptyString(body.earliest_start_date) || !validIsoDate(body.earliest_start_date))
    return bad("Earliest start date is required");
  const startDate = body.earliest_start_date;
  // Must be today or later
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (new Date(startDate).getTime() < today.getTime() - 24 * 60 * 60 * 1000)
    return bad("Start date must be today or later");

  // Consents
  if (!body.gdpr_consent) return bad("Privacy policy consent is required");
  if (!body.commission_consent) return bad("Commission-role acknowledgement is required");
  if (!body.location_consent) return bad("Right-to-work confirmation is required");

  // Insert into Supabase
  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[appointment-setter] missing Supabase env");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const userAgent = req.headers.get("user-agent") || null;

  const { error: insertErr } = await supabase
    .from("appointment_setter_applications")
    .insert({
      first_name: body.first_name.trim(),
      last_name: body.last_name.trim(),
      email: body.email.trim(),
      location: body.location.trim(),
      linkedin_url: linkedinUrl,
      b2b_experience: b2b,
      commission_role_before: body.commission_role_before,
      commission_role_details: commissionDetails,
      industry_experience: industry,
      equipment_check: equipment,
      hours_per_week: hours,
      earliest_start_date: startDate,
      gdpr_consent: body.gdpr_consent,
      commission_consent: body.commission_consent,
      location_consent: body.location_consent,
      user_agent: userAgent,
    });

  if (insertErr) {
    console.error("[appointment-setter] insert failed:", insertErr.message);
    return NextResponse.json(
      { error: "Couldn't save your application. Please try again, or email contact@rosebud.global." },
      { status: 500 }
    );
  }

  // Fire-and-forget Telegram alert
  const fullName = `${body.first_name.trim()} ${body.last_name.trim()}`;
  void fireTelegram(fullName);

  return NextResponse.json({ ok: true });
}
