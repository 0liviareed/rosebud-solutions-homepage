// Data for the /resources library (index) and /resources/[slug] (article)
// templates. Add an entry to RESOURCES to publish it — the index page,
// filters, tallies and sort all update themselves off this one array.
// `stage` must match a key in STAGES, `sector` a key in SECTORS, `kind` a
// key in KINDS. Stage keys mirror the capability slugs in capabilityData.ts
// so the same taxonomy is used site-wide.

// Paragraph/list/callout/quote text supports **bold** inline markup, parsed
// at render time — keeps authoring close to the source markdown rather than
// needing a separate rich-text schema.
export type ResourceBody =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "list"; ordered?: boolean; items: { lead?: string; text: string }[] }
  | { type: "callout"; lines: string[] }
  | { type: "quote"; text: string }
  | { type: "stat-row"; stats: { value: string; label: string }[] }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "related"; items: { href: string; title: string; desc?: string }[] }
  | { type: "cta-download"; heading: string; body: string; buttonLabel: string; resourceKey: string };

export type ResourceItem = {
  slug: string;
  title: string;
  dek: string;
  stage: string;
  sector: string;
  kind: string;
  mins: number;
  date: string; // ISO yyyy-mm-dd
  author?: { name: string; role: string };
  toc?: { id: string; label: string }[];
  // Full article body — placeholder until real copy is supplied.
  body: ResourceBody[];
};

export const STAGES: { key: string; name: string }[] = [
  { key: "capture", name: "Capture" },
  { key: "qualify", name: "Qualify" },
  { key: "book", name: "Book" },
  { key: "retain", name: "Retain" },
  { key: "reactivate", name: "Reactivate" },
  { key: "follow-through", name: "Follow through" },
  { key: "closed-loop-attribution", name: "Attribution" },
];

export const SECTORS: { key: string; name: string }[] = [
  { key: "all", name: "Every sector" },
  { key: "trades", name: "Trades" },
  { key: "dental", name: "Dental & aesthetics" },
  { key: "law", name: "Family law" },
  { key: "mortgage", name: "Mortgage & lending" },
  { key: "cleaning", name: "Commercial cleaning" },
];

export const KINDS: { key: string; name: string }[] = [
  { key: "guide", name: "Guide" },
  { key: "template", name: "Template" },
  { key: "checklist", name: "Checklist" },
  { key: "study", name: "Research" },
];

export const SORTS: { key: string; label: string; fn: (a: ResourceItem, b: ResourceItem) => number }[] = [
  { key: "new", label: "Newest first", fn: (a, b) => b.date.localeCompare(a.date) },
  { key: "old", label: "Oldest first", fn: (a, b) => a.date.localeCompare(b.date) },
  { key: "short", label: "Quickest read", fn: (a, b) => a.mins - b.mins || a.title.localeCompare(b.title) },
  { key: "az", label: "A to Z", fn: (a, b) => a.title.localeCompare(b.title) },
];

export const nameOf = (list: { key: string; name: string }[], key: string) =>
  list.find((x) => x.key === key)?.name ?? key;

// ── Published resources ──────────────────────────────────────────────────
// PLACEHOLDER: article body below is a stand-in structure awaiting the real
// write-up (findings, methodology, numbers) — swap the `body` array once
// copy is ready. Title/dek/mins/date are also placeholders pending sign-off.
export const RESOURCES: Record<string, ResourceItem> = {
  "2026-us-service-business-response-study": {
    slug: "2026-us-service-business-response-study",
    title: "The 2026 US Service Business Response Study",
    dek: "Standardised enquiries submitted to 273 owner-operated service businesses across five sectors. What came back, and what did not.",
    stage: "capture",
    sector: "all",
    kind: "study",
    mins: 12,
    date: "2026-08-13",
    body: [
      { type: "p", text: "[PLACEHOLDER — awaiting final copy. Replace this section with the study's overview: what was tested, why, and the headline finding.]" },
      { type: "h2", text: "Methodology" },
      { type: "p", text: "[PLACEHOLDER — how the 273 businesses were selected, what the standardised enquiry looked like, the response window, and what counted as a response.]" },
      { type: "stat-row", stats: [
        { value: "273", label: "Businesses enquired" },
        { value: "—", label: "Responded" },
        { value: "—", label: "Median response time" },
      ] },
      { type: "h2", text: "What came back" },
      { type: "p", text: "[PLACEHOLDER — sector-by-sector breakdown of response rate and speed.]" },
      { type: "h2", text: "What this means" },
      { type: "p", text: "[PLACEHOLDER — the takeaway for an owner reading this.]" },
    ],
  },

  "how-to-get-cleaning-contracts": {
    slug: "how-to-get-cleaning-contracts",
    title: "How to Get Cleaning Contracts: Where to Find Them & How to Bid",
    dek: "Where cleaning contracts are posted, how to bid on them, and how to win the office, government, post-construction and apartment work that never reaches a bid board.",
    stage: "capture",
    sector: "cleaning",
    kind: "guide",
    mins: 12,
    date: "2026-08-13",
    author: { name: "Sajni Richardson", role: "COO, Rosebud Solutions" },
    toc: [
      { id: "where-cleaning-contracts-actually-come-from", label: "Where cleaning contracts actually come from" },
      { id: "where-open-bids-for-cleaning-contracts-are-posted", label: "Where open bids are posted" },
      { id: "how-to-get-cleaning-contracts-with-the-government", label: "How to get contracts with the government" },
      { id: "how-to-get-office-cleaning-contracts", label: "How to get office cleaning contracts" },
      { id: "how-to-get-post-construction-cleaning-contracts", label: "How to get post-construction contracts" },
      { id: "how-to-get-cleaning-contracts-with-apartment-buildings--banks", label: "Apartment buildings & banks" },
      { id: "how-to-bid-on-cleaning-contracts", label: "How to bid on cleaning contracts" },
      { id: "how-to-tell-whether-a-bid-is-worth-your-time", label: "Is the bid worth your time?" },
      { id: "the-part-most-cleaning-companies-lose-on", label: "The part most companies lose on" },
      { id: "get-the-bid-template", label: "Get the bid template" },
      { id: "where-to-start-this-week", label: "Where to start this week" },
      { id: "frequently-asked-questions", label: "Frequently asked questions" },
    ],
    body: [
      { type: "p", text: "Most commercial cleaning companies find work the same way: a referral, a drive-by, a call from a property manager who is unhappy with their current contractor. It works, and it does not scale, because none of it is on a schedule you control." },
      { type: "p", text: "There are three routes to a cleaning contract, and only one of them is published. This guide covers all three, then the bid itself, then the part that decides most of them." },

      { type: "h2", id: "where-cleaning-contracts-actually-come-from", text: "Where cleaning contracts actually come from" },
      { type: "list", items: [
        { lead: "Published bids.", text: "Public agencies are required to advertise. Schools, hospitals, housing authorities and transit agencies mostly follow the same practice. These are the contracts you can find on a schedule, and they are the only ones where the competition is visible." },
        { lead: "Direct approach to private buildings.", text: "Offices, retail, medical suites, industrial units. Nothing is published. The work moves when a building owner or facilities manager gets frustrated with their incumbent and asks two or three companies for a quote. This is the largest pool by a distance." },
        { lead: "Subcontracting under a prime.", text: "National facility services companies hold contracts covering more buildings than they staff directly and subcontract portions. Lower margin, no sales cost, and useful volume while you build direct accounts." },
      ] },
      { type: "p", text: "Most companies work one of these three. The ones that grow work all three at once, because the published route has a predictable calendar and the private route has the better margin." },

      { type: "h2", id: "where-open-bids-for-cleaning-contracts-are-posted", text: "Where open bids for cleaning contracts are posted" },
      { type: "h3", text: "SAM.gov, for federal contracts" },
      { type: "p", text: "Federal agencies post janitorial solicitations valued above $25,000 on [SAM.gov](https://sam.gov/), and [Federal Acquisition Regulation Part 5](https://www.acquisition.gov/far/part-5#FAR_5_101) requires them to be published so competition is open. It is the single largest published source of cleaning work in the United States." },
      { type: "p", text: "Two filters save the most time. [Filter by response date](https://sam.gov/opportunities), or you will read a solicitation that closed eight months ago. Then read the notice type, because sources sought, presolicitation, solicitation and award notice each call for a different action. A sources sought notice is market research, not a bid. An award notice tells you who won and at what price, which is the most useful competitive intelligence available to you, and it is free." },
      { type: "h3", text: "State, county & city purchasing portals" },
      { type: "p", text: "This is where most cleaning companies should start. The contracts are smaller, the competition is local, and a completed municipal contract is the past performance record that qualifies you for larger work later." },
      { type: "p", text: "Go directly to the purchasing or procurement page for your city, county and state. Many agencies post solicitations on their own site and never list them on a third-party platform. Practice varies: some cities require vendor registration before you can submit anything, and others let you subscribe to automatic notification emails whenever a bid matching your categories is published. Register everywhere you would realistically send a crew, then let the notifications do the searching." },
      { type: "h3", text: "Institutional buyers" },
      { type: "p", text: "School districts, universities, hospitals, housing authorities and transit agencies run large facilities and rebid them on a cycle. Their purchasing pages work like a municipality's." },
      { type: "p", text: "Worth tracking specifically, because the square footage is large, the terms are long, and the buyer cares more about whether you can staff the building reliably than whether you are the cheapest number on the table." },
      { type: "h3", text: "Aggregators" },
      { type: "p", text: "[BidNet Direct](https://www.bidnetdirect.com/company), GovernmentBids.com, GovWin and similar services pull solicitations from many sources into one feed. BidNet Direct alone carries a network of over a thousand local government agencies, on BidNet's own figures, uploading bid documents directly." },
      { type: "p", text: "Most charge a subscription. The honest calculation is whether it costs less than the hours you would spend checking two dozen portals every morning. Bidding in one county, it usually does not. Bidding across a state, it usually does." },

      { type: "h2", id: "how-to-get-cleaning-contracts-with-the-government", text: "How to get cleaning contracts with the government" },
      { type: "p", text: "Registration comes before searching, because it takes longer than most response windows." },
      { type: "list", ordered: true, items: [
        { lead: "Get a Unique Entity ID on [SAM.gov](https://sam.gov/entity-registration).", text: "You cannot bid on federal facility work without one." },
        { lead: "[Register the right NAICS codes](https://sam.gov/entity-registration).", text: "Janitorial services is 561720. Add 561790 for specialized cleaning such as windows, carpet and upholstery, and 561730 for landscaping and grounds where a facility contract bundles them. If you are not registered for the code on a solicitation, it may not surface in your searches, and agencies researching contractors will not find you." },
        { lead: "Verify as a small business.", text: "The federal government sets a goal of awarding [23% of all contracts](https://www.sba.gov/about-sba/sba-locations/headquarters-offices/office-government-contracting-business-development) to small businesses, and only firms verified as small on SAM are eligible for those set-asides. Janitorial is one of the more accessible categories under that goal." },
        { lead: "Build local past performance first.", text: "A city or school district contract is smaller, faster to win, and produces the documented record a federal evaluator will ask you for. Working the federal route first, with nothing behind you, is the most common way to spend six months and win nothing." },
      ] },

      { type: "h2", id: "how-to-get-office-cleaning-contracts", text: "How to get office cleaning contracts" },
      { type: "p", text: "Office work is almost entirely private, which means there is no list. There are three ways in." },
      { type: "p", text: "**Property management and commercial real estate firms.** They control multiple buildings and maintain approved vendor lists. Register, then stay in front of the facilities manager. One relationship here can carry more square footage than a year of individual buildings." },
      { type: "p", text: "**Direct approach to the building.** Identify the buildings you can service well from where your crews already are. Find the property manager rather than the tenant. The tenant does not hold the contract." },
      { type: "p", text: "Three methods do the work here, and they are ranked by what actually converts:" },
      { type: "list", items: [
        { lead: "Walk-ins.", text: "Visit local commercial buildings, business parks and strip malls and ask at reception for the name of the office or facility manager. You are collecting a name, not pitching. Most walk-ins fail because the cleaner tries to sell to whoever is at the desk." },
        { lead: "Cold calling and emailing.", text: "Call the named manager and offer a free, no-obligation walkthrough and estimate. Offering the walkthrough converts far better than offering a quote, because it costs them nothing and it puts you in the building." },
        { lead: "Networking with brokers and property managers.", text: "Commercial real estate brokers and property management firms know which buildings are changing hands and which managers are unhappy. One broker relationship surfaces more opportunities than a month of walk-ins." },
      ] },
      { type: "p", text: "**Being available at the moment they are frustrated.** The office cleaning contract changes hands when a building has a bad month, and the manager contacts two or three companies that day. You cannot schedule that. You can only make sure the enquiry reaches you and gets answered, which is [the section further down](#the-part-most-cleaning-companies-lose-on)." },

      { type: "h2", id: "how-to-get-post-construction-cleaning-contracts", text: "How to get post construction cleaning contracts" },
      { type: "p", text: "Post-construction is a different sale, because the buyer is the general contractor, not the building owner." },
      { type: "p", text: "The work splits into three phases:" },
      { type: "list", ordered: true, items: [
        { lead: "Rough clean.", text: "Heavy debris removal while construction is still running." },
        { lead: "Final clean.", text: "Full detail before handover to the client." },
        { lead: "Touch-up.", text: "The last pass after the punch list is closed out." },
      ] },
      { type: "p", text: "Some GCs contract all three. Most contract the final clean." },
      { type: "p", text: "Two things make this route worth building." },
      { type: "p", text: "**Rates are higher.** It is heavier, dirtier work with debris, dust and adhesive residue, and it is priced accordingly, usually hourly or at a per-square-foot rate well above routine janitorial." },
      { type: "p", text: "**It repeats.** A general contractor who trusts you on one handover calls you on the next project, and the next. The relationship is with the project manager, not the property. Build a short list of GCs working in your area, find the project managers, and stay in front of them between projects." },
      { type: "p", text: "The catch is the schedule. Handover dates move, and they move late. If you cannot mobilize a crew at two days' notice you will lose the second job even after winning the first." },

      { type: "h2", id: "how-to-get-cleaning-contracts-with-apartment-buildings--banks", text: "How to get cleaning contracts with apartment buildings & banks" },
      { type: "p", text: "**Apartments** are volume work with three components: unit turnovers between tenants, common area cleaning on a fixed schedule, and periodic deep cleans. The buyer is usually a property management company running several properties, so one contract can cover a portfolio. Turnovers are unpredictable in timing and predictable in volume, which suits a company that can flex crew hours. Expect churn: management companies change hands and rebid." },
      { type: "p", text: "**Banks** are branch network contracts. They are slower to win and stickier once won. Expect background checks on every person entering a branch, documented security procedures, and cleaning outside banking hours. The decision often sits with a regional facilities manager rather than the branch, and larger networks frequently buy through a national facility management firm, which means the realistic route in is as a subcontractor rather than a prime." },

      { type: "h2", id: "how-to-bid-on-cleaning-contracts", text: "How to bid on cleaning contracts" },
      { type: "p", text: "The bid is a labor calculation with a margin on it. Everything else is presentation." },
      { type: "p", text: "**Walk the building first.** A walkthrough on anything above roughly $1,500 a month is not optional. A floor plan will not show you high ceilings, delicate flooring, furniture density, soil load or restroom count. It is also your only chance to meet the decision maker before they see your number." },
      { type: "p", text: "**Calculate labor from a production rate.** Production rate is how many square feet one cleaner covers per hour for a given task, and it is the number that decides whether the bid is profitable. The [ISSA 612 cleaning times standard](https://www.issa.com/articles/how-to-calculate-cleaning-times/) is the industry benchmark. Published general-office figures vary by source, roughly 2,500 to 4,200 square feet per hour, and medical space runs far slower at around 2,200. That spread is the point: use your own measured rate, and break the building into area types rather than applying one rate to the whole floor." },
      { type: "callout", lines: ["Cleanable square footage ÷ production rate = hours per visit", "Hours per visit × visits per month × fully loaded labor rate = monthly labor cost"] },
      { type: "p", text: "Fully loaded means wage plus payroll taxes, workers' compensation and insurance, not the hourly wage." },
      { type: "p", text: "**Add what people forget.** Drive time, because a crew driving 45 minutes each way costs you an hour and a half of unpaid labor per visit. Supervision, because somebody has to check the work and take the client's calls. Consumables, because trash liners and paper products add up faster than chemicals do." },
      { type: "p", text: "**Then add margin, do not hope for it.** Monthly bid = total monthly cost ÷ (1 − target margin). Pricing off what you think the client wants to pay is how companies win contracts that cost them money every month." },
      { type: "p", text: "**Present a monthly figure.** Give the total monthly cost and a complete scope. Buyers do not want to audit your labor hours, and showing them invites a negotiation on your production rate rather than on your service." },
      { type: "p", text: "**Then follow up.** Follow up within 48 hours of submitting, and again about five days later. A large share of bids are lost to silence rather than to price." },

      { type: "h2", id: "how-to-tell-whether-a-bid-is-worth-your-time", text: "How to tell whether a bid is worth your time" },
      { type: "p", text: "Three checks, in order." },
      { type: "list", items: [
        { lead: "Is it real work, or market research?", text: "Sources sought means the agency is finding out who exists. Answer it briefly. Do not build a proposal against it." },
        { lead: "Who held it before?", text: "Incumbent information is often published, and SAM.gov holds historical award data including previous winning amounts. If the same contractor has held it three cycles with no complaint on record, your odds are poor and your time is better spent on a building whose manager is already unhappy." },
        { lead: "Can you staff it on day one?", text: "Winning a building you cannot crew costs more than losing it. Check required hours, clearances, the wage determination if it is federal, and whether the specification requires a supervisor on site." },
      ] },

      { type: "h2", id: "the-part-most-cleaning-companies-lose-on", text: "The part most cleaning companies lose on" },
      { type: "p", text: "Everything above finds the opportunity. The opportunity then arrives as an enquiry, and that is where most of them are lost." },
      { type: "p", text: "A property manager fills in the contact form on your site at 4pm on a Friday because their contractor missed two nights. A facilities coordinator emails asking whether you can walk the building next week. A general contractor sends a post-construction request with a Monday deadline. None of them announce themselves as a contract worth six figures over three years, and all of them go to whoever answers first." },
      { type: "quote", text: "We tested this. We submitted enquiries to hundreds of US service businesses, commercial cleaning companies among them, and a striking share had no working web enquiry form at all. Of the enquiries that did arrive, most got no reply inside three days." },
      { type: "p", text: "That is the real gap. The bid boards are public and available to everyone equally. What happens in the hours after somebody decides to contact you is not." },
      { type: "p", text: "Three things close it, and none require new software:" },
      { type: "list", items: [
        { lead: "Test your own form from outside your network.", text: "Send yourself an enquiry from a phone on cellular data, not office wifi, and confirm it arrives." },
        { lead: "Reply in minutes, not hours.", text: "The first company to respond books the walkthrough. The second is told the decision is made." },
        { lead: "Follow up on a schedule that runs without anyone remembering.", text: "Most cleaning enquiries do not convert on the first exchange. They convert on the third." },
      ] },

      {
        type: "cta-download",
        heading: "Get the bid template",
        body: "Two parts. Part one is a pricing worksheet you keep: production rates by area type, fully loaded labor rate, the costs most bids forget, and a margin formula you cannot get wrong. Part two is the bid document you send, with scope, exclusions, insurance, references and a follow-up schedule.",
        buttonLabel: "Send me the bid template",
        resourceKey: "cleaning-bid-template",
      },

      { type: "h2", id: "where-to-start-this-week", text: "Where to start this week" },
      { type: "p", text: "Register on SAM.gov, because registration is the slowest step and you want it done before you need it. Find the purchasing page for your city and county and subscribe to bid notifications. Then list ten property managers and five general contractors operating in your service area and find the right name at each." },
      { type: "p", text: "Then test your own enquiry form. The published bids are competitive by design. The private enquiry that lands on your website is not, unless you make it so by taking a day to answer it." },

      {
        type: "faq", items: [
          { q: "How do you bid on cleaning contracts?", a: "Walk the building, measure the cleanable square footage, and divide it by your production rate to get hours per visit. Multiply by visits per month and your fully loaded labor rate, add supplies, drive time and supervision, then divide the total by one minus your target margin. Present a single monthly figure with a complete scope rather than a breakdown of hours." },
          { q: "How do you find commercial cleaning contracts?", a: "Published work is on SAM.gov for federal contracts and on city, county and state purchasing portals for local ones. Private work is not published anywhere, so it comes from property management firms, direct approach to buildings you can service, and subcontracting under national facility services companies." },
          { q: "How do you get your first cleaning contract?", a: "Set the business up properly first: registration, general liability and workers' compensation insurance, because no commercial buyer will sign without them. Then pick a small area you can service reliably and work it three ways: walk into local commercial buildings and get the facility manager's name, call that name and offer a free walkthrough and estimate, and register on your city and county purchasing portals for published bids. The first contract almost always comes from direct outreach rather than a bid board, and a small building you service well becomes the reference that wins the next one." },
          { q: "How do you get cleaning contracts for a new cleaning business?", a: "Once the first account is running, the constraint changes from finding work to being findable. Register on every city and county purchasing portal in your service area so published bids arrive by email rather than by search, get on the approved vendor list of two or three property management firms, and ask your first client for a written reference naming the building type and square footage. A new company loses most contracts to not being asked, not to being outbid." },
          { q: "How do you get Airbnb cleaning contracts?", a: "Airbnb turnover work comes from property managers running multiple listings rather than from individual hosts. Approach short-term rental management companies directly, and be explicit about turnaround time, since same-day turnover between a checkout and a check-in is the constraint that decides who they hire. This is residential turnover work and prices differently from commercial janitorial." },
          { q: "How much do cleaning contracts pay?", a: "Routine janitorial contracts commonly price between roughly $0.08 and $0.15 per square foot per month at around three visits a week, varying widely by facility type, frequency, scope and local labor cost. Medical, industrial and post-construction work prices well above that range. Price from your own measured costs rather than a benchmark, because a rate that is profitable in one market loses money in another." },
          { q: "How do you win a cleaning contract against a cheaper competitor?", a: "Most contracts are lost to silence rather than price. Follow up within 48 hours of submitting and again around day five, do a proper walkthrough so your scope is visibly more complete than a competitor's, and give the buyer a reference from a comparable building. Where price is genuinely the deciding factor, the buyer is usually one you would lose money serving anyway." },
          { q: "How do you get cleaning contracts with the government?", a: "Get a Unique Entity ID on SAM.gov, register NAICS code 561720 for janitorial services along with 561790 and 561730, and verify as a small business so you are eligible for set-aside contracts. Then filter solicitations by response date and notice type, and use published award notices to see who held the contract before and at what price." },
          { q: "How do you start a contract cleaning business?", a: "Register the business, get general liability and workers' compensation insurance, and work out your fully loaded hourly labor cost before you quote anything. Then pick one building type you can service well from where you are based, rather than bidding everything. The first three contracts come from direct approach, not from bid boards." },
        ],
      },

      {
        type: "related", items: [
          { href: "/industries/commercial-cleaning", title: "Commercial cleaning enquiry handling", desc: "How Rosebud answers and books every enquiry that lands" },
          { href: "/pricing", title: "Pricing" },
        ],
      },
    ],
  },
};
