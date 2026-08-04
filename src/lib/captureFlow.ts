import type { CaptureMetrics } from "./captureMetrics";

export type FlowIcon = "in" | "tag" | "match" | "reply" | "merge" | "phone" | "db";

export type MetricPair = { value: string; label: string };

export type FlowStepNode = {
  kind: "node";
  id: string;
  icon: FlowIcon;
  title: string;
  subtitle: string;
  metrics: MetricPair[];
  why: string[];
  variant?: "warn";
};

export type FlowConnector = {
  kind: "connector";
  label?: string;
  tone?: "yes";
};

export type FlowSplitBranch = {
  connector: FlowConnector;
  weightPct: number;
  node: FlowStepNode;
};

export type FlowSplit = {
  kind: "split";
  branches: [FlowSplitBranch, FlowSplitBranch];
};

export type FlowOut = {
  kind: "out";
  title: string;
  to: string;
};

export type FlowItem = FlowStepNode | FlowConnector | FlowSplit | FlowOut;

export function fmtSeconds(s: number | null): string {
  if (s === null) return "—";
  if (s < 60) return `${Math.round(s)}s`;
  return `${Math.round(s / 60)}m`;
}

// Explicit UTC — without it, the server (UTC) and the browser (local
// timezone) render different text for the same timestamp, a hydration
// mismatch (React error #418), not just a display nuance.
export function fmtWhen(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function responseDelta(createdAt: string, firstResponseAt: string | null): string {
  if (!firstResponseAt) return "pending";
  const seconds = (new Date(firstResponseAt).getTime() - new Date(createdAt).getTime()) / 1000;
  return `replied in ${fmtSeconds(seconds)}`;
}

export function activityLine(r: {
  createdAt: string;
  channel: string;
  source: string | null;
  firstResponseAt: string | null;
  missedCall: boolean;
  isDuplicate: boolean;
}): string {
  const via = r.source ? ` via ${r.source}` : "";
  const flag = r.missedCall ? ", missed call" : r.isDuplicate ? ", duplicate" : "";
  return `${fmtWhen(r.createdAt)} · ${r.channel}${via}${flag}, ${responseDelta(r.createdAt, r.firstResponseAt)}`;
}

function pct(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 100);
}

export function buildCaptureFlow(m: CaptureMetrics): FlowItem[] {
  const matchPct = pct(m.duplicateMatched, m.captured);
  const noMatchPct = 100 - matchPct;

  const channelIntake: FlowStepNode = {
    kind: "node",
    id: "channel_intake",
    icon: "in",
    title: "Channel Intake",
    subtitle: "Creating the lead record",
    metrics: [
      { value: String(m.captured), label: "enquiries" },
      { value: String(m.channelMix.length), label: "channels" },
    ],
    why: [
      "Web forms, WhatsApp, SMS, email and missed calls all arrive as one lead record.",
      "Nothing sits unanswered in a separate inbox because it came in on a channel nobody was watching.",
    ],
  };

  const sourceAttribution: FlowStepNode = {
    kind: "node",
    id: "source_attribution",
    icon: "tag",
    title: "Source Attribution",
    subtitle: "Recording channel and click",
    metrics: [
      { value: String(m.attributed), label: "attributed" },
      { value: String(m.adSourced), label: "ad-sourced" },
    ],
    why: [
      "The contact, the channel, and where they came from are held from the second the enquiry arrives.",
      "Everything downstream — qualifying, booking, reporting — builds on that one clean file.",
    ],
  };

  const duplicateCheck: FlowStepNode = {
    kind: "node",
    id: "duplicate_check",
    icon: "match",
    title: "Duplicate Check",
    subtitle: "Matching against existing",
    metrics: [{ value: String(m.duplicateMatched), label: "matched" }],
    why: ["Checked on email and phone before anything is sent, so a returning enquirer continues the thread already open."],
  };

  const firstResponse: FlowStepNode = {
    kind: "node",
    id: "first_response",
    icon: "reply",
    title: "First Response",
    subtitle: "Sending the opening reply",
    metrics: [
      { value: fmtSeconds(m.firstResponseMedianSeconds), label: "median" },
      { value: String(m.outOfHours), label: "out of hours" },
    ],
    why: [
      "A lead who waits five minutes has already messaged someone else — answering happens as one event, with no queue.",
      "A 9pm web form and a Sunday message get the same instant answer as one at midday.",
    ],
  };

  const recordMerge: FlowStepNode = {
    kind: "node",
    id: "record_merge",
    icon: "merge",
    title: "Record Merge",
    subtitle: "Joining to existing",
    metrics: [
      { value: String(m.merged), label: "merged" },
      { value: String(m.duplicateReplyPrevented), label: "duplicate replies prevented" },
    ],
    why: ["A matched enquiry joins the record already open instead of starting a second thread the team has to notice and merge by hand."],
  };

  const missedCallCapture: FlowStepNode = {
    kind: "node",
    id: "missed_call_capture",
    icon: "phone",
    title: "Missed Call Capture",
    subtitle: "Triggering the text-back",
    metrics: [{ value: String(m.missedCallTextback), label: "text-backs sent" }],
    why: ["A missed call gets a text back before the caller tries the next number on their list."],
  };

  const crmWrite: FlowStepNode = {
    kind: "node",
    id: "crm_write",
    icon: "db",
    title: "CRM Write",
    subtitle: "Pushing to your system",
    metrics: [
      { value: String(m.crmWritten), label: "written" },
      { value: String(m.crmWriteFailed), label: "failed" },
    ],
    why: ["New leads are written straight into the CRM the team already uses — no new dashboard to learn."],
    variant: m.crmWriteFailed > 0 ? "warn" : undefined,
  };

  return [
    channelIntake,
    { kind: "connector", label: "Every Record", tone: "yes" },
    sourceAttribution,
    { kind: "connector", label: "Before Reply" },
    duplicateCheck,
    {
      kind: "split",
      branches: [
        {
          connector: { kind: "connector", label: "No Match", tone: "yes" },
          weightPct: noMatchPct,
          node: firstResponse,
        },
        {
          connector: { kind: "connector", label: "Match Found" },
          weightPct: matchPct,
          node: recordMerge,
        },
      ],
    },
    { kind: "connector", label: "Call Channel" },
    missedCallCapture,
    { kind: "connector", label: "Written Out", tone: "yes" },
    crmWrite,
    { kind: "out", title: "Qualify", to: "qualify" },
  ];
}

export const CAPABILITY_RAIL: Array<{ id: string; code: string; name: string; live: boolean }> = [
  { id: "capture", code: "CAP", name: "Capture", live: true },
  { id: "qualify", code: "QAL", name: "Qualify", live: false },
  { id: "book", code: "BKG", name: "Book", live: false },
  { id: "retain", code: "RTN", name: "Retain", live: false },
  { id: "reactivate", code: "RCT", name: "Reactivate", live: false },
  { id: "follow-through", code: "FLW", name: "Follow through", live: false },
];
