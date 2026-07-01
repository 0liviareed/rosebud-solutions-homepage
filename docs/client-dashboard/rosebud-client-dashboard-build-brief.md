# Rosebud Client Dashboard · Build Brief

**Artifact:** `rosebud-client-dashboard.html` (single file, two views)
**Status:** Demo built on sample data. Spec of record for the live client build.
**Sample client in the demo:** Cedar & Park Realty, Austin, 14 agents.

This brief documents what the dashboard is, the decisions baked into it, where every number comes from, and what still needs wiring before a live deployment. It is written to be handed to a developer or a build agent.

---

## 1. What this is, and who it is for

A client-facing operations dashboard for a deployed Rosebud system. It is the post-signing deliverable a client logs into, not the capability pitch. It has two tabs:

- **Live Operations.** The day-to-day outcomes a business owner cares about: leads handled, showings booked, response speed, what ran overnight.
- **Engine.** The system behind it, shown as an agent hierarchy so the owner can see the machine is real and running.

The board represents a **client's deployed system**. It must never expose Rosebud's own internal acquisition stack. This is a hard rule, expanded in section 9.

---

## 2. Non-negotiables that shape every decision

These are the constraints that drove the build. Any change to the dashboard is checked against them.

1. **Consultancy, not agency.** Rosebud operates the system; the client owns only their data. The word "lease" never appears in client copy, and there is no "you own it" language anywhere (the client owns their data, not the system).
2. **The responsibility boundary is the spine of the product.** The client brings demand (acquisition), Rosebud runs the middle of the funnel, the client converts. The dashboard makes this visible, and it must never claim data or outcomes past the handoff at "Showing booked."
3. **Metrics are controllable output, conservative, and honestly sourced.** Every number is one of three kinds: measured from logs, illustrative (sample), or untracked (the client's). These are never blurred.
4. **Brand and writing rules.** Cormorant Garamond for display, DM Sans for body. No em-dashes anywhere in copy. No green in the palette. "Rosebud Solutions" and "Rosebud Global" in full, never shortened. 5-week deployment, never "7 to 10 days."

---

## 3. View 1: Live Operations, component by component

### Value band ("Your operation, this month")

Four tiles plus a footer line. Each tile follows the **tooltip rule**: the on-face text is the number's plain meaning; the (i) carries the derivation plus the honesty caveat. All four tiles have an (i).

| Tile | On face | Source | (i) tooltip says |
|---|---|---|---|
| Standard | checkmark, "Met" | service standard set at go-live | measured against 14s median response, every follow-up sent, nothing to voicemail |
| Work carried | 1,948 | system logs | total enquiries and sequences processed this month, counted directly from logs |
| Answered after hours | 374 | message timestamps | enquiries answered outside working hours, a count of what was answered, not a revenue figure |
| Time back | ~12 hrs/wk | illustrative (see section 6) | the full derivation, ending with a note that the shown figure is illustrative, from sample data |

Footer: "Since go-live, March 2026 · 6,240 enquiries handled · 1,140 showings booked · 0 went to voicemail overnight." Note "went to voicemail" is provable from logs; the earlier "missed overnight" was not, and was removed. The earlier "Caught after hours or recovered" tile and its "None lost" claim were a recovered-value assertion with no client outcome data behind it. It was stripped back to a pure capture count.

### Live metrics

Five KPI cards with a Today / This week toggle: Leads captured, Showings booked, Speed to first response, Lead to showing book rate, Nurture pool. All within Rosebud's measured scope (nothing past booking).

### Conversion funnel (the boundary, made visual)

One funnel, three owner-labelled zones, top to bottom. This is the clearest single statement of the responsibility boundary.

- **Your acquisition** (greyed, recessed, "You" chip). One row, Captured, shown with a muted grey bar. This is the demand the client's marketing brings in. De-emphasised because it is theirs.
- Divider: "We take it from here."
- **Rosebud operations** (full colour, left accent, "Rosebud" chip). Qualified, Conversation started, Showing booked. The only vivid bars on the panel. This is the work Rosebud runs and measures.
- Divider: "Handed back to your team."
- **Your conversion** (greyed, recessed, "You" chip). Showing completed, Offer made. No numbers. Each row reads "Yours to measure" behind a dotted leader, with a caption stating the data stays in the client's CRM, on their terms.

The conversion zone carries **no figures** because Rosebud has no visibility past the booking and does not own that data. Showing numbers there would re-open the liability the boundary exists to close.

### Lead sources

Channel breakdown with volume and book rate. Sits below the funnel as supporting detail. Note: Missed-call recovery currently appears here as a channel; it is the one row that is Rosebud-created net-new rather than client-acquired (open item, section 11).

### Last night / overnight panel

Time-aware. Between 7pm and 8am it reads "Last night"; during those hours it reads "Tonight so far." Shows captured, qualified, booked, and voicemail counts for the overnight window.

### This week's read, Live activity feed, Team activity

The week's read is a plain-language summary. The live feed streams recent events (hot/warm/system/cold tagged) and refreshes on a timer. Team activity reports per-function figures (capture, qualification, booking, nurture, reminders), with any industry average shown only as a labelled benchmark.

### Footer health strip

Channels live, last lead captured, uptime, and System issues. The System issues number is fed by the System Health panel on the Engine tab (section 7), from a single shared source so the two can never drift.

---

## 4. View 2: Engine

### Hierarchy

Three tiers, reporting upward, with a workflow layer beneath.

- **Lead** (orchestrator, top).
- **Ops auditor** (audit and roadmap). Carries the Time back figure, labelled and tooltipped identically to the Live Operations tile, same value.
- **Six executors:** Lead capture (CAP), Qualification (QAL), Booking (BKG), Nurture (NUR), Reminders (RMD), CRM sync (CRM).

Connectors: solid lines for "reports to," dashed for "workflow." A work-packet pulse animates the reporting lines, and nodes flash as work passes, started on tab open.

### Sub-agents (the org tree)

Each of the six executors branches downward into its own sub-agents as separate node cards on a rail, in the same tree language as the tiers above. A descending work-packet lights each sub-agent in turn, desynced per column, so the board reads as live work. 28 sub-agents in total.

Sub-agent names are client-facing and, where a real workflow exists, each stands on it (section 9). They are never labelled "sub-agents" on the board, and never carry an internal name.

### Side column

Top to bottom: Quick actions, Notifications, **System health** (section 7), Roster (the 8 agents). Engine header stats: 8 agents live, 150 tasks today, 37 per hour throughput, 99.8% uptime.

### Live activity log

Timestamped agent actions at the foot of the Engine tab.

---

## 5. The Time back metric

The single output metric. "Time back," not "time saved" (saved invites "saved versus what," which a sharp owner audits).

**Locked formula, per workflow:**

```
Time back = [ (V_success × M × C) − (V_flagged × M_flag) ] ÷ 60
```

Run-tagged, so a given run is counted in exactly one of the two terms and the discount is never applied twice.

- **V_success**: count of successful runs, from logs. Displacement only: tasks the owner used to do by hand. Net-new work (for example missed-call recovery) and latency improvements (faster response) are excluded, because they are not time the owner used to spend.
- **M**: the owner's own minutes-per-task figure, agreed at onboarding, held about 20% conservative, locked. Never Rosebud's estimate.
- **C**: completeness, 0 to 1. The fraction the system does end-to-end. Carries all routine incompleteness.
- **V_flagged**: count of flagged, handed-back runs. The exceptions.
- **M_flag**: oversight minutes per flagged run. Recommended source: measured from flag-raised to flag-resolved timestamps, so the whole subtrahend is empirical (open item, section 11).

Sum across displacement workflows for the client total. A negative per-workflow result is a feature: it flags a workflow that is not yet earning its oversight, which is the Ops auditor's job to surface.

**Validator.** At each review, ask the owner "this says about X hours back, feel right?" The conservative construction is what makes a yes genuine rather than flattering.

**Known soft spot.** Time back multiplied by the owner's hourly value may land under the retainer. The defence is the conservative construction and the "you confirmed M" co-authorship, not the size of the number. Two rules follow: never inflate M to make the number prettier, and never place Time back on the same surface as the retainer figure, because that invites the comparison that loses.

---

## 6. System Health panel

Sits below Notifications in the Engine side column. Mirrors the internal send-health pattern, re-scoped to a client deployment.

- **Structure per check:** severity dot, title, detail line. Severities: healthy (purple-deep), warn (amber), critical (red), resolved (muted, kept for history).
- **Active count** (warn plus critical) feeds the footer System issues number from one shared source.
- **Cadence:** checked daily at 08:00 UTC.
- **Resolve behaviour:** a cleared breach flips to a muted "Resolved" row and stays for history. The demo carries one (a recovered channel-feed gap) to show the loop.

**Live checks in the demo:** Capture channels (a portal feed going dark is the client's blackout signal), CRM sync (failed-write detection), Lead follow-up (leads overdue past their stage window, stage-aware so late stages do not false-flag), Booking calendar (calendar connection down).

**Scoped, not yet built:** deliverability spiral (per-channel delivery-rate watch) and queue starvation (per-agent routing, the empty-pipeline case). Both reuse the same plumbing.

The demo ships all-green, so System issues reads 0 and stays consistent with the "Met" standard. The number only moves on a real breach.

---

## 7. Data model: what is real, what is sample, what is the client's

Every figure on the board is exactly one of these. The live build must preserve the distinction.

- **Measured (from logs).** Work carried, Answered after hours, capture / qualify / book volumes, channels live, system health checks, the Engine throughput and task counts. These wire to n8n and Supabase in the live build.
- **Illustrative (sample, demo only).** Time back (~12), and all Cedar & Park figures. Time back is marked illustrative on its face (tilde) and in its tooltip. In the live build it is computed by the formula in section 5 from real logs.
- **Untracked (the client's, no Rosebud visibility).** Showing completed, Offer made, and all conversion outcomes. These never carry a number. If the board is ever wired to live data, these two stages must not be populated from any source that implies Rosebud measured them.

---

## 8. Sub-agent inventory mapping

Client-facing names, drawn from Rosebud's real workflow inventory where a genuine workflow exists, so each node can be defended on a call. The rule: **never use an internal name** (no internal workflow IDs, no BDE, Kano, founder-inbox, or Reddit references), because the board is a client deployment and those belong to Rosebud's own acquisition engine.

- **CRM sync** and **Nurture** are fully backed by live workflows. These are the strongest to drill into.
- **Lead capture**, **Qualification**, **Booking** are partly backed; the remaining nodes are standard, buildable deployment capabilities.
- **Reminders** is the thinnest in Rosebud's own stack; its nodes are standard client capabilities. Know this before a technical buyer asks to see one running.

Final per-agent node names should be confirmed against the live n8n build before a client sees them.

---

## 9. Design and copy tokens

| Token | Value |
|---|---|
| Display type | Cormorant Garamond |
| Body type | DM Sans |
| Ink | #1c1922 |
| Purple (primary) | #6c5cae |
| Purple (bar fills) | #8b7ec9 |
| Purple (emphasis / positive) | #4f4288 |
| Purple (tint) | #efebf8 |
| Border | rgba(28,25,34,.08) |
| Border (purple) | rgba(108,92,174,.28) |

Copy rules: no em-dashes anywhere (use "·", commas, or full stops); "Rosebud Solutions" and "Rosebud Global" in full; consultancy not agency; 5-week deployment; no "you own it"; no green. Positive and healthy states use purple-deep, not green.

---

## 10. Open decisions

These are unresolved and should be closed before a client-facing release.

1. **Headline count.** The Engine header reads "8 live" while the tree now shows 28 sub-agents. Reconcile to a single honest figure or show both (for example "8 agents, 28 sub-agents").
2. **Captured zone placement.** Captured currently sits in the greyed acquisition zone (the leads the client brings). The alternative is to lift it into the lit Rosebud band ("we catch every lead your acquisition brings"), which credits the capture value but changes the boundary read. Pick the version that matches how it is sold.
3. **Missed-call recovery in Lead sources.** It is Rosebud-created net-new, not client acquisition, so it sits slightly oddly in a client-owned panel. Tag it as recovered by Rosebud, or move it.
4. **Tooltip clipping.** Centered tooltips on the rightmost value-band tile can run close to the edge on narrow screens. Anchor right-side tooltips to open leftward if the board will be demoed on small laptops.
5. **Extra health checks.** Deliverability spiral and queue starvation are scoped but not built.
6. **M_flag sourcing.** Confirm M_flag is measured from flag timestamps for the live Time back computation.
7. **Real sub-agent names.** Confirm each node against the live n8n build.

---

## 11. Wiring notes for going live

- Time back, the health checks, and the measured KPIs all read from n8n and Supabase in the live build. The dashboard figures here are sample.
- Keep client scope absolute. None of Rosebud's own acquisition workflows appear on a client board. The internal engine, if ever shown, is a separate asset for a separate audience.
- The System issues count and the System Health panel must continue to read from one shared source.
- Conversion stages stay unpopulated. The client owns and measures them.
