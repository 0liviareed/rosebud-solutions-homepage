import { test } from "node:test";
import assert from "node:assert/strict";
import { buildLineChart, niceMax } from "./chartPath.ts";

test("niceMax picks the smallest 4-step ceiling", () => {
  assert.equal(niceMax(0), 4);
  assert.equal(niceMax(3), 4);
  assert.equal(niceMax(70), 80);
  assert.equal(niceMax(80), 80);
  assert.equal(niceMax(81), 100);
  assert.equal(niceMax(312), 400);
  assert.equal(niceMax(45000), 80000);
});

test("geometry matches the mockup frame", () => {
  const labels = Array.from({ length: 30 }, (_, i) => `d${i}`);
  const g = buildLineChart(labels, [
    { id: "c", label: "Captured", color: "#1f9d78", values: labels.map((_, i) => (i === 17 ? 70 : 10)) },
    { id: "q", label: "Qualified", color: "#5b4bb6", values: null },
  ]);
  assert.equal(g.width, 1240);
  assert.deepEqual(g.grid, [20, 60, 100, 140, 180]);
  assert.deepEqual(g.yTicks.map((t) => t.label), ["80", "60", "40", "20", "0"]);
  assert.deepEqual(g.xTicks.map((t) => t.x), [60, 260, 460, 660, 860, 1060, 1220]);
  assert.equal(g.lines.length, 1, "null series draw no line");
  assert.ok(g.lines[0].d.startsWith("M60,160 L100,160"));
  assert.ok(g.lines[0].d.includes("L740,40"), "peak of 70 on a max of 80 sits at y=40");
  assert.ok(g.area && g.area.d.endsWith("L1220,180 L60,180 Z"));
  assert.equal(g.empty, false);
});

test("empty when every live series is zero", () => {
  const g = buildLineChart(["a", "b"], [{ id: "c", label: "Captured", color: "#000", values: [0, 0] }]);
  assert.equal(g.empty, true);
  assert.equal(g.lines.length, 1);
});

test("single point centres", () => {
  const g = buildLineChart(["a"], [{ id: "c", label: "Captured", color: "#000", values: [4] }]);
  assert.equal(g.lines[0].d, "M640,20");
  assert.deepEqual(g.xTicks.map((t) => t.x), [640]);
});
