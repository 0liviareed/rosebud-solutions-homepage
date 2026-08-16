// Runs as `postbuild` on every `next build`. Submits every URL in the
// freshly-generated sitemap to IndexNow (Bing, Yandex, and other
// participating engines) so new/changed pages get picked up within
// minutes instead of waiting for a normal crawl.
//
// Reads .next/server/app/sitemap.xml.body — the actual static output
// `next build` just wrote for src/app/sitemap.ts — rather than
// re-deriving the URL list here or fetching the live sitemap.xml (which
// would still be serving the *previous* deploy at build time). This
// guarantees the submitted list can never drift out of sync with the
// real sitemap.
//
// Non-fatal by design: any failure here (network issue, IndexNow down,
// missing env) is logged and swallowed, never fails the build. Getting
// indexed a few minutes later than ideal is not worth breaking a deploy.

const fs = require("fs");
const path = require("path");

const INDEXNOW_KEY = "59ff57b68751399f596ad7c125067df8";
const KEY_LOCATION = `https://rosebud.global/${INDEXNOW_KEY}.txt`;
const HOST = "rosebud.global";

async function main() {
  // Only fire on real production deploys — not local builds (VERCEL_ENV
  // unset), not preview deployments (VERCEL_ENV=preview). The inverse of
  // this check (skip only when explicitly non-production) let local test
  // builds through — caught by actually running this locally, not assumed.
  if (process.env.VERCEL_ENV !== "production") {
    console.log(`[indexnow] skipping — VERCEL_ENV=${process.env.VERCEL_ENV ?? "(unset)"}`);
    return;
  }

  const sitemapPath = path.join(process.cwd(), ".next/server/app/sitemap.xml.body");
  if (!fs.existsSync(sitemapPath)) {
    console.warn("[indexnow] sitemap.xml.body not found, skipping — did the sitemap route build?");
    return;
  }

  const xml = fs.readFileSync(sitemapPath, "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urls.length === 0) {
    console.warn("[indexnow] no URLs found in sitemap, skipping");
    return;
  }

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList: urls }),
    });
    console.log(`[indexnow] submitted ${urls.length} URLs — HTTP ${res.status}`);
    if (!res.ok) {
      console.warn("[indexnow] non-OK response:", await res.text().catch(() => ""));
    }
  } catch (err) {
    console.warn("[indexnow] submission failed (non-fatal):", err instanceof Error ? err.message : String(err));
  }
}

main().catch((err) => {
  console.warn("[indexnow] unexpected error (non-fatal):", err instanceof Error ? err.message : String(err));
});
