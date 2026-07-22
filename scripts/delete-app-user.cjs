// One-off: fully remove an app account created during testing (auth user + org +
// profile + membership + pending subscription + checkout lead). Test data only.
//   node scripts/delete-app-user.cjs someone@example.com
// Reads NEXT_PUBLIC_APP_SUPABASE_URL + APP_SUPABASE_SERVICE_ROLE_KEY from .env.local.
const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const URL = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
const KEY = process.env.APP_SUPABASE_SERVICE_ROLE_KEY;
const EMAIL = (process.argv[2] || "").trim().toLowerCase();
if (!URL || !KEY) throw new Error("NEXT_PUBLIC_APP_SUPABASE_URL / APP_SUPABASE_SERVICE_ROLE_KEY missing");
if (!EMAIL) throw new Error("Usage: node scripts/delete-app-user.cjs <email>");

const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const rest = (p, opts = {}) => fetch(`${URL}/rest/v1/${p}`, { ...opts, headers: { ...H, ...(opts.headers || {}) } });
const del = (p) => rest(p, { method: "DELETE", headers: { Prefer: "return=representation" } });

async function main() {
  console.log(`Target: ${EMAIL}\n`);

  // 1. profile (profiles.id == auth user id, set at signup)
  const prof = await (await rest(`profiles?email=eq.${encodeURIComponent(EMAIL)}&select=id`)).json();
  const userId = prof[0]?.id ?? null;
  console.log(`profile / user id: ${userId ?? "(none)"}`);

  // 2. org ids this user belongs to
  let orgIds = [];
  if (userId) {
    const mem = await (await rest(`org_members?user_id=eq.${userId}&select=org_id`)).json();
    orgIds = [...new Set(mem.map((r) => r.org_id))];
  }
  console.log(`orgs: ${orgIds.length ? orgIds.join(", ") : "(none)"}`);

  // 3. Delete every child that references orgs FIRST (incl. checkout_leads via
  //    converted_org_id), then the orgs themselves — order matters for the FKs.
  const cl = await del(`checkout_leads?email=eq.${encodeURIComponent(EMAIL)}`); console.log(`checkout_leads deleted: ${(await cl.json()).length}`);
  if (orgIds.length) {
    const inList = `(${orgIds.join(",")})`;
    const s = await del(`subscriptions?org_id=in.${inList}`);        console.log(`  subscriptions deleted: ${(await s.json()).length}`);
    const o = await del(`onboarding?org_id=in.${inList}`);           console.log(`  onboarding deleted: ${(await o.json()).length}`);
    const m = await del(`org_members?org_id=in.${inList}`);          console.log(`  org_members deleted: ${(await m.json()).length}`);
    await del(`checkout_leads?converted_org_id=in.${inList}`);       // any other leads tied to these orgs
    const g = await del(`orgs?id=in.${inList}`);
    const gj = await g.json(); console.log(`  orgs deleted: ${Array.isArray(gj) ? gj.length : JSON.stringify(gj)}`);
  }

  // 4. profile
  if (userId) { const p = await del(`profiles?id=eq.${userId}`); console.log(`profiles deleted: ${(await p.json()).length}`); }

  // 5. the auth user itself
  if (userId) {
    const r = await fetch(`${URL}/auth/v1/admin/users/${userId}`, { method: "DELETE", headers: H });
    console.log(`auth user delete: HTTP ${r.status}${r.ok ? " ✅" : " — " + (await r.text())}`);
  } else {
    console.log("no auth user id resolved — nothing to delete in auth");
  }
  console.log("\nDone.");
}
main().catch((e) => { console.error(e); process.exit(1); });
