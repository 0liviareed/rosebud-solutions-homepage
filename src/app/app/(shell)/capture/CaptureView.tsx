"use client";

import { useState } from "react";
import type { CaptureMetrics } from "@/lib/captureMetrics";
import { buildCaptureFlow } from "@/lib/captureFlow";
import CaptureFrame from "./CaptureFrame";
import FlowDiagram from "./FlowDiagram";
import Inspector from "./Inspector";

export default function CaptureView({ metrics }: { metrics: CaptureMetrics }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const flow = buildCaptureFlow(metrics);

  return (
    <CaptureFrame
      period={metrics.period}
      inspector={<Inspector metrics={metrics} flow={flow} selectedId={selectedId} />}
    >
      <FlowDiagram flow={flow} selectedId={selectedId} onSelect={setSelectedId} />
    </CaptureFrame>
  );
}
