import { NextResponse } from "next/server";
import { presetCatalogue } from "@/lib/onboarding/presets";

export const dynamic = "force-dynamic";

// The W2 preset catalogue (Welcome doc §4, GET /api/presets → key, label,
// order; neutral always present). Static today — no auth needed, it's the same
// list for every tenant. When the catalogue becomes tenant- or launch-scoped,
// gate it here.
export function GET() {
  return NextResponse.json({ presets: presetCatalogue() });
}
