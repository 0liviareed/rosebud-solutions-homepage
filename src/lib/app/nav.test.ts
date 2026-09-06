import { test } from "node:test";
import assert from "node:assert/strict";
import { CORE_FLOWS, NAV_ITEMS, isActive, liveFlowCount, navBadge, navItemsIn } from "./nav.ts";

test("nav is exactly the v9 list, in order", () => {
  assert.deepEqual(
    NAV_ITEMS.map((i) => i.id),
    ["dashboard", "inbox", "capture", "qualify", "book", "retain", "reactivate", "attribution", "usage", "logs", "settings", "help"]
  );
  assert.ok(!NAV_ITEMS.some((i) => /follow/i.test(i.label)), "Follow through must not be in the nav");
  assert.deepEqual(navItemsIn("footer").map((i) => i.id), ["settings", "help"]);
});

test("core flows are the six, Write to CRM has no nav item", () => {
  assert.deepEqual(
    CORE_FLOWS.map((f) => f.label),
    ["Capture & Respond", "Qualify & Triage", "Book into Diary", "Remind & Reschedule", "Recall & Nurture", "Write to CRM"]
  );
  assert.equal(CORE_FLOWS.find((f) => f.key === "crm")?.navId, null);
  assert.equal(liveFlowCount(), 1);
});

test("badges", () => {
  const inbox = NAV_ITEMS.find((i) => i.id === "inbox")!;
  const attribution = NAV_ITEMS.find((i) => i.id === "attribution")!;
  const dashboard = NAV_ITEMS.find((i) => i.id === "dashboard")!;
  assert.equal(navBadge(inbox, { claOn: false, handoverCount: null }), null);
  assert.equal(navBadge(inbox, { claOn: false, handoverCount: 0 }), null);
  assert.equal(navBadge(inbox, { claOn: false, handoverCount: 6 }), 6);
  assert.equal(navBadge(attribution, { claOn: false, handoverCount: null }), "Off");
  assert.equal(navBadge(attribution, { claOn: true, handoverCount: null }), null);
  assert.equal(navBadge(dashboard, { claOn: false, handoverCount: 9 }), null);
});

test("isActive matches nested settings routes", () => {
  const settings = NAV_ITEMS.find((i) => i.id === "settings")!;
  const capture = NAV_ITEMS.find((i) => i.id === "capture")!;
  assert.ok(isActive(settings, "/settings"));
  assert.ok(isActive(settings, "/settings/plan"));
  assert.ok(!isActive(settings, "/settingsx"));
  assert.ok(isActive(capture, "/capture"));
  assert.ok(!isActive(capture, "/dashboard"));
});
