# Position snapshot — BEFORE the industry-rebuild launch

**Captured:** 2026-07-24, immediately before the coordinated production push.
**Source:** Semrush (live), database `us` (the retarget market). UK database and
the `www` host returned NOTHING FOUND — the domain is not in Semrush's UK index,
and www is not separately indexed.
**Purpose:** the only "before." Re-snapshot ~2 weeks post-launch against this file.

This is the honest baseline: a near-zero organic footprint, consistent with the
strategy doc ("current AI visibility is genuinely zero; the 14/100 is Rosebud
AI's footprint bleeding across"). The launch is what these numbers are measured
against.

## Domain totals — `domain_ranks`, us

| Metric | Value |
|---|---|
| Semrush Rank | 25,231,081 |
| Organic keywords | 3 |
| Organic traffic (est.) | 0 |
| Organic traffic cost | 0 |
| SERP-feature positions | 0 |

UK (`uk`): NOTHING FOUND — not indexed.

## Ranking keywords — `resource_organic`, us (all of them)

| Keyword | Position | Prev | Volume | CPC | KD | URL |
|---|---|---|---|---|---|---|
| rosebud loans | 13 | 13 | 70 | 2.77 | 4 | /industries/mortgage-lending |
| rosebud lending | 30 | 30 | 110 | 2.42 | 7 | /industries/mortgage-lending |
| rosebud company | 53 | 53 | 170 | 0.30 | 46 | /pricing |

That is the complete list — three keywords, all branded/navigational, none on a
target commercial term.

## Ranking pages — `resource_organic_unique`, us (all of them)

| URL | Keywords | Traffic | Commercial intent | Transactional |
|---|---|---|---|---|
| /industries/mortgage-lending | 2 | 0 | 1 | 0 |
| /pricing | 1 | 0 | 0 | 0 |

## Pages in scope for the launch (target-term positions to watch)

None of the retarget target terms currently rank, so the "before" for each is
**not present in the US top 100**:

- **trades-home-services** → `plumbing crm` — not ranking
- **family-law** → `legal intake software` — not ranking
- **dental-aesthetic** (new slug; was /healthcare) → `patient intake software` — not ranking
- **insurance** → `insurance agency automation` — not ranking
- **real-estate** → `real estate transaction management software` — not ranking
- **mortgage-lending** → `mortgage crm` — not ranking (branded "rosebud loans/lending" only, #13/#30)
- **/pricing** → ranks only for "rosebud company" (#53, branded)
- **/about**, **/privacy** — no organic keywords

## Re-snapshot instructions (~2 weeks out)

Re-run, same params, compare to this file:
- `domain_ranks` target=`rosebud.global` database=`us` — expect keyword count / rank to move.
- `resource_organic` target=`rosebud.global` database=`us` sort=position_asc — new target-term entries are the win signal.
- `resource_organic_unique` target=`rosebud.global` database=`us` — per-page keyword growth on the six industry pages + /pricing.
- Watch the six target terms above for first appearance in the top 100.
