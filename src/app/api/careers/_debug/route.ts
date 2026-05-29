import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * TEMPORARY DEBUG ENDPOINT — diagnosing why the careers form's Telegram
 * alert isn't firing. Returns the SHAPE of env vars (not the values),
 * plus the result of a live Telegram getMe call. Delete after fixing.
 */
export async function GET() {
  const tok = process.env.TELEGRAM_BOT_TOKEN || "";
  const chats = process.env.TELEGRAM_WARROOM_CHAT_IDS || "";

  // Identify the bot the token belongs to
  let botInfo: unknown = "n/a";
  if (tok) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${tok}/getMe`);
      botInfo = await r.json();
    } catch (e) {
      botInfo = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    has_token: !!tok,
    token_length: tok.length,
    token_prefix: tok.slice(0, 10),
    token_suffix: tok.slice(-4),
    has_chats: !!chats,
    chats_raw: chats,
    chats_parsed: chats.split(",").map((s) => s.trim()).filter(Boolean),
    bot_info: botInfo,
    supabase_url_set: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_key_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}
