# Engine Console — Build Map

What this document is: a field-by-field map of `dashboard.html` (the engine.rosebud.global
console) from "illustrative demo" to "actually running on a real client's data." For every
number, chip, toggle and log line on the page, this says where it comes from today and what
would need to feed it in production.

Read this before wiring up a real client. Don't ship a page section live for a paying
client until the row for it below has a real answer in the "What it needs" column — a
polished number that's actually static is worse than an honest "coming soon."

---

## 0. The prerequisite — none of this works until this exists

Today `dashboard.html` is a single static file with **zero network calls anywhere in it**.
Every object below (`CORE`, `QUEUE`, `CAPS`, `BILL`, `PROFILE`, `USAGE`, etc.) is a hardcoded
JS literal for one fictional account ("Cedar & Park Realty"). Before any per-page mapping
below matters, four things have to exist:

1. **Per-client auth.** Right now the whole console sits behind one shared password
   (`DASHBOARD_PASSWORD`, checked in `middleware.ts`). A real client needs their own login,
   scoped so they only ever see their own data — this is a different auth model, not a
   config tweak.
2. **A real backend / data layer.** Something this page can `fetch()` from — an API route,
   or direct Supabase client calls with RLS scoped to the logged-in account. Every object
   below becomes an API response instead of a JS literal.
3. **A data model** covering (at minimum): enquiries/leads, per-capability workflow events,
   the escalation queue, per-client configuration (channels/rules/tiers), usage & billing,
   health/monitoring pings, and account/profile. See the sketch in §1.
4. **A refresh strategy.** Nothing in this file polls or subscribes today — it renders once
   from static data. The live-feeling parts (live activity feed, queue, system status) need
   either polling or a subscription (Supabase Realtime / websocket) once real data exists.

Everything below assumes those four exist. The per-page notes are about **what query or
event feeds which specific number**, not about the plumbing to get data into the page at all.

---

## 1. Sketch of the data model needed

Not a schema — just the entities that would need to exist for the mappings below to be
real, so whoever builds this knows what tables/APIs to reach for:

- `accounts` — one row per client (company name, city, logo, plan, go-live date)
- `users` — per-account team members + role (owner/manager/agent), replaces `PROFILE.seats`
- `enquiries` — one row per lead: source, channel, timestamps, qualification verdict, value
  tier, booking outcome, owner. This is the spine almost everything else joins against.
- `workflow_events` — one row per automation step firing (capture/qualify/book/retain/
  reactivate/follow-through), timestamped, keyed to an `enquiry_id`. This is what actually
  drives every flow-diagram node's numbers and the Logs page.
- `queue_items` — real escalations written by the workflow engine when a rule says "hand to
  a person," with a resolve/close action wired back to whatever created it (Zoho, etc.)
- `config` — per-account settings: which channels are on, qualification rules, value bands,
  connected systems, add-on status. Drives Settings' Configuration/Your rules/Integrations
  tabs and the channel chips shown per-capability.
- `usage_counters` — per-account, per-period rollups (today/week/month) of every `CORE`
  field, ideally computed from `workflow_events` rather than hand-maintained.
- `billing` — plan, seats, payment method, invoices, credit balance, overage settings —
  from the actual billing provider (Stripe or similar), not a static array.
- `health_checks` — synthetic-monitoring results per integration (channel, CRM sync,
  calendar, deliverability), from whatever's actually pinging those systems.

---

## 2. Dashboard (`viewOperation`, id `operation`)

| Element | Demo source today | What it needs in production |
|---|---|---|
| Greeting ("Good evening, Olivia") | `PROFILE.first` + `new Date().getHours()` | Real logged-in user's name — the time-of-day logic itself is fine as-is, no backend needed |
| KPI strip (Answered / First response / Booked / Time back) | `CORE[period]` fields (`captured`, `booked`) + hardcoded median (`sr.resp`) + hardcoded "~12 hrs/wk" | Real period-scoped aggregates from `enquiries`; first-response median computed from actual reply timestamps, not a hardcoded string; "Time back" is a genuine estimate (volume × per-task-minutes agreed at onboarding) — keep as a computed estimate, not literal system speed |
| KPI sparklines | `SERIES[period].c` / `.b` (hand-authored arrays) | Real daily/weekly time-series from `enquiries`, bucketed same as the period toggle |
| Enquiry-to-booking funnel | `CORE[period]` (`captured`→`qualified`→`convo`→`booked`) | Same aggregates as above, funnel-shaped; "Your conversion" stages (showing completed / offer made) are explicitly **not tracked by Rosebud** — correctly shown as "yours to measure," leave as a static disclaimer, not a data gap |
| Live activity feed | `FEED` array, cycles via `setInterval` (`startFeed`) | Real recent-event stream from `workflow_events`, newest-first, polled or subscribed — the cosmetic "just now / Ns ago" cycling can stay, just needs real rows behind it |
| "Last night" / "Tonight so far" | `nightData()` — picks a fixed number set by hour-of-day | Real count of enquiries/qualified/booked/voicemail in the actual 7pm–8am window from `enquiries`, not a fixed illustrative number |
| Enquiry sources table | `SOURCES` (hand-authored array) | Real per-channel volume + book-rate, joining `enquiries.source` against booking outcome |
| "Since go-live" stats | Hardcoded string in `OPERATION.cum` (6,240 / 1,140 / 0) | Real all-time counters from the account's actual go-live date — needs `accounts.go_live_date` + a lifetime aggregate, not a rolling period one |
| "This week's read" (inspector) | `OPERATION.read`, static prose | Either a templated summary computed from real week-over-week deltas, or an LLM-generated one-liner off real numbers — currently just written copy |
| Queue ("Handed to your team") | `QUEUE` array, hardcoded 6 items | Real rows from `queue_items`, written by the workflow engine when an escalation rule fires — `clearItem()`'s "resolve" action needs to actually call back to whatever queued it (mark resolved in `queue_items`, and where relevant push the outcome to the CRM) |
| System status panel | Hardcoded ("9/9", "99.8%", "4m ago") + `ALLOWANCE`/live `CORE.month.captured` for the two computed rows | Real integration-health snapshot (`health_checks`) + real plan-usage numbers, refreshed on an interval |

---

## 3. Capability pages — the pattern (worked example: Capture)

This is the piece you flagged: **every flow-diagram node is currently illustration.** The
node shapes, branching, and animated "spark" travel between them (`walk()` / `startEngine()`)
are cosmetic and can stay purely decorative — that's fine, it's explaining a process, not
claiming to show individual real events moving live (though it *could* be wired to a real
event stream later as a nice-to-have). **The numbers printed on each node are not
illustration and need to be real.**

The current data model has a problem worth calling out explicitly: most nodes don't have
their own counter — they *reuse* one of a handful of coarse per-period fields (`captured`,
`matched`, `ooh`, `missedCall`) from a single shared `CORE` object, and several numbers are
bare hardcoded strings with **no backing field at all**. A real build needs one counter
per distinct claim, ideally sourced straight from `workflow_events` grouped by step name.

Full node-by-node audit for **Capture** (`CAPS[0]`):

| Node | Metric shown | Backed by today | What it needs |
|---|---|---|---|
| Channel Intake | "487 enquiries" | `CORE.captured` (real counter, just needs to be real) | Count of `enquiries` created this period — fine to reuse a single counter here, this genuinely is the same number |
| Channel Intake | "9 sources" | **Hardcoded `'9'`** | Count of connected/enabled intake channels+sources for this account — should read from `config`, not be a literal |
| Source Attribution | "487 attributed" | Reuses `CORE.captured` | This is a distinct claim (does every record actually carry channel+click attribution?) — needs its own counter: enquiries with attribution data populated, ideally always = 100% or it's a real bug to surface |
| Source Attribution | "0 ad-sourced" | **Hardcoded `'0'`** | Real count of enquiries carrying an ad click ID — meaningful once Closed-loop attribution is in play, currently always zero because it's not connected |
| Duplicate Check | "matched" | `CORE.matched` | Real count of dedup matches this period from the actual matching logic |
| First Response | "14s median" | **Hardcoded `'14s'`** | Real median(first_reply_at − enquiry_created_at) for the period — this is a specific, checkable metric, not a vibe |
| First Response | "ooh" (out of hours) | `CORE.ooh` | Real count of first-responses sent outside configured business hours |
| Record Merge | "merged" / "0 duplicate replies" | `CORE.matched` reused + hardcoded `'0'` | Own counter for records actually merged (subset of matched) + real count of prevented duplicate sends |
| Missed Call Capture | "captured" | `CORE.missedCall` | Real count of missed-call text-backs sent |
| Missed Call Capture | "31% go on to book" | **Hardcoded `'31%'`** | Real conversion rate specifically for the missed-call-recovery segment — join missed-call leads through to booking outcome |
| CRM Write | "written" | Reuses `CORE.captured` | Count of successful CRM writes — should be its own counter so a write *failure* is visible as a gap between captured and written, not silently hidden by reusing the same number |
| CRM Write | "1.4s to appear" | **Hardcoded `'1.4s'`** | Real write-latency telemetry from the CRM integration, if it's worth showing at all |

The other five capability pages follow the identical shape and the identical problem —
same handful of `CORE` fields reused across nodes, same scattering of literal hardcoded
numbers/percentages with no backing metric. Rather than re-list every node, here's what
each page's flow reuses vs. invents, so the same audit can be repeated per page before build:

- **Qualify** (`CAPS[1]`) — reuses `captured`/`qualified`/`routed`/`escalated`/`notQualified`/
  `returned`. Hardcoded, needs real metrics: "86.4% pass rate", "90s to pick up" (escalation
  pickup time), "3 tiers"/"£4,200 median estimate" (real median of assigned value tiers).
  The `rule` chips ("budget ≥ £5,000", "location in your list"...) are shown as fixed text —
  in production these must render the **account's actual configured qualification rules**
  from `config`, not this generic placeholder set.
- **Book** (`CAPS[2]`) — reuses `qualified`/`booked`/`released`. Hardcoded: "14 diaries" (real
  connected-calendar count), "0 double bookings", "3 slots offered", "40s to choose",
  "80% accept", "24.3% of conversations" (real book-rate). `rule` chips (appointment length,
  travel buffer, notice window) must come from the account's actual configured booking
  rules, not this placeholder set.
- **Retain** (`CAPS[3]`) — reuses `booked`/`dayBefore`/`attended`/`moved`/`noShow`/
  `reminders`. Hardcoded: "41% reply", "92% turn up", "4 rebooked".
- **Reactivate** (`CAPS[4]`) — reuses `pool`/`touches`/`engagement`/`returned`/`reEngaged`/
  `optOut`. Hardcoded: "3 found today", "4 touches each", "0 held today" (send-gate holds).
- **Follow through** (`CAPS[5]`) — reuses `updates`/`chased`/`handedOver`. Hardcoded: "1 of 5
  optional modules" (should read live from which `mods` are actually enabled), "3 touches
  each", "2 ageing". The `mods` toggle list must reflect the account's real enabled modules
  from `config`, driving both this page's copy and the Settings "Optional modules" group —
  right now they're two separate hardcoded lists that happen to agree.

Per-capability sidebar data, same pattern across all six pages:

| Element | Demo source | What it needs |
|---|---|---|
| Channel chips (`ch.list`) | Hardcoded on/off per channel, per capability | Real connected-channel status from `config`/integration state — must be one source of truth shared with the Settings "Reply channels" toggles, not independently hardcoded per page |
| Configuration key-values (`cfg`) | Hardcoded strings | Real per-account configured values (reply channels in use, value-tier count, calendar connected, cadence, etc.) |
| Recent records (`recs`) | Hardcoded 2–3 rows per page | Real recent `workflow_events` for that specific capability, most-recent-first |

---

## 4. Closed-loop attribution (`ADDONS[0]`, gated add-on)

| Element | Demo source | What it needs |
|---|---|---|
| Gated flow nodes (Click Match / Verdict Tag / File Delivery) | Static, all counters hardcoded `'0'` since the add-on is off | Once purchased: real click-ID match counts, real qualified/not-qualified tag counts, real file-delivery log — same pattern as §3 |
| Requirements checklist (`gate.list`) | Hardcoded `ok:1/0` per requirement | Real checks: consent-recorded rate, qualify-verdict coverage, own-domain confirmation, actual Google Ads lead volume — computed against the account's real data, not asserted |
| Upsell modal copy/price/cards | `upsell` block, static | Fine as static marketing copy — this is pricing/positioning text, not a data claim |
| "Add closed-loop to my plan" → Request a change | Opens the generic request form, no real submit endpoint | Needs the request to actually land somewhere — see §6 |

---

## 5. Usage (`viewUsage`, id `usage`)

| Element | Demo source | What it needs |
|---|---|---|
| Usage chart (cumulative vs. allowance) | `USAGE.cum` (hand-authored weekly cumulative array) + `ALLOWANCE.leads` | Real running-total enquiry count this billing month vs. the account's actual plan allowance |
| Overage panel (Auto-Overage toggle, thresholds) | `OVER` object, in-memory only | Real per-account overage setting (persisted), real billing-provider integration so the "kill switch" claim is actually true — i.e. capture really does pause if this is off and the cap is hit |
| Credit balance + buy-credits dialog | `OVER.balance`, in-memory | Real Stripe (or equivalent) payment — a real charge, a real balance stored server-side, not `OVER.balance += x` in a JS variable |
| Team seats meter | `ALLOWANCE.seats` / `.seatsCap` | Real active-user count vs. plan seat limit |
| Plan ceilings table (`lim`) | Hardcoded per-plan limits | Real plan-tier config (channels/nurture touches/no-show attempts/reminder cadence per plan) |
| "Where it went" breakdown | Reuses the same `CORE` fields as the capability pages | Same per-capability real counters as §3 |

---

## 6. Settings (`viewSettings`, 5 sub-tabs)

| Tab | Element | Demo source | What it needs |
|---|---|---|---|
| Profile | Name/email/phone fields | `PROFILE`, edits kept in memory only (lost on reload) | Real user-profile read/write against `users`, not just local state |
| Profile | Account name/city/logo | `ACCOUNT`, persisted to **browser localStorage only** | This is the one piece with real persistence today — but scoped to one browser/device. For a real multi-seat client this needs to live server-side against `accounts`, so a rename by one teammate is visible to the rest of the team |
| Profile | Seats list | `PROFILE.seats`, static | Real `users` rows for the account, with real add/remove/role-change wired to auth |
| Billing | Subscription/price/renewal | `BILL`, static | Real subscription state from the billing provider |
| Billing | Payment method (card mark, expiry) | `BILL.card`/`.brand`, updated by `openCard()` in memory only | Real Stripe payment method — `openCard()`'s form already collects the right fields, it just needs to submit to a real payment-method-update endpoint instead of writing to a JS object |
| Billing | Card-declined state | `BILL.cardDeclined`, manually toggled in code | Real webhook-driven flag — e.g. Stripe `invoice.payment_failed`/`payment_method.updated` flipping a real per-account flag, which is what should drive the nav dimming built earlier this session |
| Billing | Invoices table | `BILL.invoices`, static array, "View" links do nothing (`href="#"`) | Real invoice list + real links to hosted invoice PDFs from the billing provider |
| Billing | Usage credits (balance, buy) | Same as §5 | Same as §5 |
| Configuration | Channel/source/add-on/module toggles | `SETTINGS.groups`, all read-only display (toggles aren't actually clickable — copy says "we do it for you") | If this stays "request-only," it's already accurate as static config display. If it becomes self-serve, each toggle needs to actually flip a real `config` row and propagate to the relevant capability page's channel chips |
| Your rules | Rule list | `SETTINGS.rules`, static, generic | Real per-account configured rules from onboarding — this must be the **same source of truth** referenced in the `rule` chips on Qualify/Book flow nodes (§3), not a separately-hardcoded copy |
| Integrations | Connected systems | `SETTINGS.systems`, static | Real per-account connection status (CRM type + health, calendar, messaging, ad platform) |
| (any tab) | "Request a change" modal | `openRequest()` — builds a full form, `Send request` shows a fake "Sent to Sebastian" success state with no actual submission | Needs a real destination: a ticket in whatever the CS team actually uses, or at minimum a webhook/email so a request doesn't just vanish into a client-side confirmation screen |

---

## 7. Logs / Health (`viewLogs` — currently dead code — and `viewHealth`, which the "Logs" nav item actually opens)

Worth flagging on its own: the `LOGS` object and `viewLogs()` function exist in the file but
are **never reached** — `LOGS` isn't in the `ALL` array and no nav button points at
`id:'logs'`. The "Logs" nav item actually opens `HEALTH` (which happens to render its own
copy of the same event-log table plus a health-checks section). Either wire `viewLogs()` up
as a real distinct page, or delete it — right now it's dead code that could confuse whoever
picks this file up next.

| Element | Demo source | What it needs |
|---|---|---|
| Event log rows | `HEALTH`/`LOGS.rows`, static | Real structured event log — this is exactly `workflow_events` rendered chronologically, plus system-level events (feed outages, recoveries) |
| "What the system depends on" (channel/CRM/calendar/deliverability health) | `HEALTH.items`, static | Real synthetic-monitoring pings per integration, on the stated cadence |
| Monitoring & alerting stats (uptime %, check cadence) | `HEALTH.mon`, static | Real uptime computed from the monitoring system, not an asserted "99.8%" |

---

## 8. Account chip / branding

| Element | Demo source | What it needs |
|---|---|---|
| Company name, city, logo (rail footer chip) | `ACCOUNT`, persisted to `localStorage` | As above (§6) — needs to move server-side for real multi-seat/multi-device use |
| Plan label next to city | `ACCOUNT.plan` | Real current plan from billing |

---

## 9. Suggested build order

Roughly in order of "blocks everything else" → "polish":

1. **Auth + one real client's data model** (`enquiries`, `workflow_events`, `queue_items`) —
   nothing else matters until one real account can log in and see real numbers.
2. **Dashboard KPIs + funnel + sources**, since they're the highest-visibility page and
   mostly just need `enquiries`/`workflow_events` aggregation — no new UI needed.
3. **Per-capability node counters** (§3) — this is the biggest single chunk of hardcoded-
   literal cleanup; budget time to give each node its own real counter rather than reusing
   `CORE` fields, or the "why it matters" claims (e.g. "0 duplicate replies") stay unverifiable.
4. **Queue + Request-a-change real submission** — both are "write" paths into a real system
   (escalation resolution, change requests) and are currently pure UI with no destination.
5. **Settings (Your rules / Integrations / Configuration)** sourced from real per-account
   config — also the source of truth the capability pages' `rule`/`ch` fields should read
   from, so they stop being hardcoded twice.
6. **Billing/Usage against a real payment provider** — highest risk if left fake (a client
   clicking "Buy credits" and genuinely believing they were charged), do this before any
   real client sees the Billing tab.
7. **Health/Logs against real monitoring** — least urgent, most tolerable to leave partly
   illustrative a little longer, but "99.8% uptime" as a literal string is a claim someone
   could quote back at you.
