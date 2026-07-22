// Clean up test accounts from the rosebud-app DB. DRY-RUN by default (lists what
// it would delete); pass `delete` to actually remove them.
//   node scripts/cleanup-test-data.cjs          # dry run — lists + flags
//   node scripts/cleanup-test-data.cjs delete    # hard-delete flagged accounts
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
if (!URL || !KEY) throw new Error("NEXT_PUBLIC_APP_SUPABASE_URL / APP_SUPABASE_SERVICE_ROLE_KEY missing");
const DO_DELETE = process.argv[2] === "delete";

const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const rest = (p, opts = {}) => fetch(`${URL}/rest/v1/${p}`, { ...opts, headers: { ...H, ...(opts.headers || {}) } });
const del = (p) => rest(p, { method: "DELETE", headers: { Prefer: "return=representation" } });

// A rosebud-app account is a customer of the tool. Our own domain, example.com, and
// the specific emails we test-purchased with are never real customers.
const KNOWN_TEST = new Set([
  "sajni.richardson@gmail.com",
  "rosebudglobalsolutions@gmail.com",
  "rosebudcapitalmanagement@gmail.com",
  "hello.oliviareed@gmail.com",
  "test@test.com",
]);
const isTestEmail = (email) => {
  if (!email) return true;
  const e = email.toLowerCase();
  return e.endsWith("@rosebud.global") || e.endsWith("@example.com") || KNOWN_TEST.has(e);
};

async function delOrgFootprint(orgId, email) {
  // children that reference the org first, then the org
  if (email) await del(`checkout_leads?email=eq.${encodeURIComponent(email)}`);
  await del(`checkout_leads?converted_org_id=eq.${orgId}`);
  await del(`subscriptions?org_id=eq.${orgId}`);
  await del(`onboarding?org_id=eq.${orgId}`);
  await del(`org_members?org_id=eq.${orgId}`);
  await del(`orgs?id=eq.${orgId}`);
}

async function main() {
  const profiles = await (await rest("profiles?select=id,email,first_name,created_at")).json();
  const orgs = await (await rest("orgs?select=id,name,created_at")).json();
  const members = await (await rest("org_members?select=org_id,user_id,role")).json();
  const subs = await (await rest("subscriptions?select=org_id,status,plan_key")).json();

  const orgOfUser = {};
  for (const m of members) orgOfUser[m.user_id] = m.org_id;
  const subByOrg = {};
  for (const s of subs) subByOrg[s.org_id] = s;
  const orgsWithMembers = new Set(members.map((m) => m.org_id));

  console.log(`\n=== ACCOUNTS (${profiles.length}) ===`);
  const testAccounts = [], realAccounts = [];
  for (const p of profiles) {
    const orgId = orgOfUser[p.id] ?? null;
    const sub = orgId ? subByOrg[orgId] : null;
    const test = isTestEmail(p.email);
    const row = { ...p, orgId, subStatus: sub?.status ?? "-", plan: sub?.plan_key ?? "-", test };
    (test ? testAccounts : realAccounts).push(row);
    console.log(`  ${test ? "TEST " : "KEEP "}| ${p.email ?? "(no email)"} | ${row.plan}/${row.subStatus} | org ${orgId ?? "-"}`);
  }

  // Orphan orgs = no members and not already covered by a test account's org
  const testOrgIds = new Set(testAccounts.map((a) => a.orgId).filter(Boolean));
  const orphanOrgs = orgs.filter((o) => !orgsWithMembers.has(o.id) && !testOrgIds.has(o.id));
  console.log(`\n=== ORPHAN ORGS (no members) (${orphanOrgs.length}) ===`);
  for (const o of orphanOrgs) console.log(`  ORPHAN | ${o.name} | ${o.id}`);

  console.log(`\nSummary: ${testAccounts.length} test accounts, ${orphanOrgs.length} orphan orgs, ${realAccounts.length} to KEEP.`);
  if (realAccounts.length) {
    console.log("KEEP list (real / non-test):");
    for (const a of realAccounts) console.log(`  • ${a.email}`);
  }

  if (!DO_DELETE) { console.log("\nDRY RUN — nothing deleted. Re-run with `delete` to remove the TEST + ORPHAN rows above."); return; }

  console.log("\n=== DELETING ===");
  for (const a of testAccounts) {
    if (a.orgId) await delOrgFootprint(a.orgId, a.email);
    await del(`profiles?id=eq.${a.id}`);
    const r = await fetch(`${URL}/auth/v1/admin/users/${a.id}`, { method: "DELETE", headers: H });
    console.log(`  deleted ${a.email} — auth HTTP ${r.status}`);
  }
  for (const o of orphanOrgs) { await delOrgFootprint(o.id, null); console.log(`  deleted orphan org ${o.name}`); }
  console.log("\nDone.");
}
main().catch((e) => { console.error(e); process.exit(1); });
