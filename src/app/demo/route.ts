import { DASHBOARD_HTML } from "./dashboard-html.gen";

// The dashboard markup is bundled at build time (scripts/gen-demo-html.cjs,
// run via `prebuild`) rather than fs-read — Cloudflare Workers has no
// filesystem, and the HTML can't live in public/ or the middleware demo gate
// would be bypassable via the direct asset URL. Any per-prospect
// customisation (company name, logo, outcome anchor) lives in the browser's
// localStorage on first visit.
export const dynamic = "force-static";

export async function GET() {
  return new Response(DASHBOARD_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      // Authed users only — keep CDNs and shared caches from holding it.
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
