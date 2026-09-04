// Reads a file from public/ in a way that works on BOTH runtimes:
//  - Node (next dev, `next build` prerender): straight fs read from disk.
//  - Cloudflare Workers (OpenNext): no filesystem — public/ files are served
//    by the Worker's ASSETS binding, so fetch the bytes from there instead.
//    (A plain fetch to our own hostname is not an option: a Worker cannot
//    fetch itself — same limitation that broke the dialler's queue-cron.)
//
// Used by the opengraph-image routes, which previously called
// fs.readFileSync(join(process.cwd(), "public", ...)) directly and 500'd on
// Workers with "[unenv] fs.readFileSync is not implemented".

export async function readPublicAsset(relPath: string): Promise<Buffer> {
  const clean = relPath.replace(/^\/+/, "");
  try {
    const { readFileSync } = await import("fs");
    const { join } = await import("path");
    return readFileSync(join(process.cwd(), "public", clean));
  } catch {
    // Workers path — ASSETS serves the deploy's static files; the hostname in
    // the URL is irrelevant (the binding routes internally, no network).
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const assets = (env as { ASSETS?: { fetch: (r: Request) => Promise<Response> } }).ASSETS;
    if (!assets) throw new Error(`readPublicAsset: no fs and no ASSETS binding for ${clean}`);
    const res = await assets.fetch(new Request(`https://assets.local/${clean}`));
    if (!res.ok) throw new Error(`readPublicAsset: ASSETS ${res.status} for ${clean}`);
    return Buffer.from(await res.arrayBuffer());
  }
}
