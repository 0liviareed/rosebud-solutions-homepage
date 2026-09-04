import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default OpenNext Cloudflare config, same as portal/dashboard/dialler.
// Incremental-cache backends (R2 / D1 / KV) can be added if ISR shows up —
// the marketing site is SSG at build time and the engine/app surfaces are
// auth-gated SSR, so the in-Worker default is fine.
export default defineCloudflareConfig();
