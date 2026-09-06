import type { FlowIcon } from "@/lib/captureFlow";

/* Icon paths ported verbatim from the engine.rosebud.global demo's NI
   lookup (src/app/demo/dashboard.html) for the 7 icons Capture's real
   flow uses — same visual language, real data behind them. */
const PATHS: Record<FlowIcon, string> = {
  in: '<path d="M10 3.5v9"/><path d="M6.4 9.1 10 12.7l3.6-3.6"/><path d="M3.5 14v2A1.5 1.5 0 0 0 5 17.5h10a1.5 1.5 0 0 0 1.5-1.5v-2"/>',
  tag: '<path d="M10.4 3H16a1 1 0 0 1 1 1v5.6a1 1 0 0 1-.3.7l-6.4 6.4a1 1 0 0 1-1.4 0l-5.6-5.6a1 1 0 0 1 0-1.4l6.4-6.4a1 1 0 0 1 .7-.3z"/><circle cx="13.4" cy="6.6" r="1.1"/>',
  match: '<circle cx="7.4" cy="10" r="4.4"/><circle cx="12.6" cy="10" r="4.4"/>',
  reply: '<path d="M8 5.5 3.5 10 8 14.5"/><path d="M3.5 10h8.2a4.8 4.8 0 0 1 4.8 4.8v.7"/>',
  merge:
    '<path d="M4 4.5h3.2a3 3 0 0 1 2.4 1.2l3.2 4.3a3 3 0 0 0 2.4 1.2H17"/><path d="M4 15.5h3.2a3 3 0 0 0 2.4-1.2l1-1.3"/><path d="M14.4 8.6 17 11l-2.6 2.4"/>',
  phone:
    '<path d="M6 3.5 8.2 7 6.7 8.9a9.5 9.5 0 0 0 4.4 4.4L13 11.8l3.5 2.2v2.2a1.4 1.4 0 0 1-1.6 1.4C9 16.8 3.2 11 2.4 5.1A1.4 1.4 0 0 1 3.8 3.5z"/>',
  db: '<ellipse cx="10" cy="5.2" rx="6.2" ry="2.4"/><path d="M3.8 5.2v9.6c0 1.3 2.8 2.4 6.2 2.4s6.2-1.1 6.2-2.4V5.2"/><path d="M3.8 10c0 1.3 2.8 2.4 6.2 2.4s6.2-1.1 6.2-2.4"/>',
};

export default function NodeIcon({ icon }: { icon: FlowIcon }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: PATHS[icon] }}
    />
  );
}
