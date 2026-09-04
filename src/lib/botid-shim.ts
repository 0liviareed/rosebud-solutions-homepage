// Cloudflare migration: drop-in replacement for Vercel BotID's `checkBotId()`.
//
// BotID only works on Vercel infrastructure — its client instrumentation and
// the header signals `checkBotId()` verifies are injected by Vercel's edge.
// On Cloudflare Workers those signals never exist, so the real checkBotId()
// would reject every legitimate submission (the same failure mode as the
// bid-template route before it was added to BOTID_PROTECTED).
//
// This shim FAILS OPEN: every request is treated as human. Baseline bot
// pressure is handled at the Cloudflare zone level (Bot Fight Mode / WAF);
// if form spam becomes a problem the per-route upgrade path is Cloudflare
// Turnstile, which slots in at the same call sites.
export async function checkBotId(): Promise<{ isBot: boolean }> {
  return { isBot: false };
}
