/**
 * Global hiker path — a right-edge descent with asymmetric switchbacks.
 * Viewport-space coordinates; rebuilt on resize.
 *
 * Desktop: seven Bezier segments hugging the right ~90px of viewport,
 * with the strongest inflection (amp ≈ 1.02) landing mid-descent.
 *
 * Mobile (≤820px): same switchback geometry at larger amplitude so
 * the pattern reads as "walked" not "vertical". Trail may graze the
 * rightmost sliver of content at the strongest inflection — intended,
 * atmospheric layer at low opacity.
 */
export function buildGlobalPath(w: number, h: number): string {
  const isNarrow = w <= 820;
  const margin = isNarrow
    ? Math.max(26, Math.min(40, w * 0.075))
    : Math.max(72, Math.min(128, w * 0.065));
  const x = w - margin;
  const a = isNarrow
    ? Math.max(22, Math.min(34, w * 0.06))
    : Math.max(30, Math.min(58, w * 0.034));
  return [
    `M ${x} -24`,
    `C ${x + a * 0.12} ${h * 0.06}, ${x - a * 0.3} ${h * 0.11}, ${x - a * 0.18} ${h * 0.17}`,
    `C ${x - a * 0.08} ${h * 0.22}, ${x - a * 0.48} ${h * 0.26}, ${x - a * 0.7} ${h * 0.33}`,
    `C ${x - a * 0.88} ${h * 0.38}, ${x - a * 1.02} ${h * 0.44}, ${x - a * 0.52} ${h * 0.5}`,
    `C ${x - a * 0.12} ${h * 0.55}, ${x + a * 0.28} ${h * 0.59}, ${x + a * 0.18} ${h * 0.66}`,
    `C ${x + a * 0.06} ${h * 0.72}, ${x - a * 0.42} ${h * 0.77}, ${x - a * 0.32} ${h * 0.83}`,
    `C ${x - a * 0.22} ${h * 0.88}, ${x + a * 0.08} ${h * 0.92}, ${x - a * 0.04} ${h * 0.96}`,
    `C ${x - a * 0.12} ${h * 0.99}, ${x} ${h + 4}, ${x} ${h + 24}`,
  ].join(" ");
}

/**
 * Hero-local horizontal sweep — desktop (landscape 1920×1080).
 * Enters top-right, descends into right margin, sweeps across the
 * lower third (under the headline), rises on the left, exits top-left.
 */
export const HERO_PATH_D = [
  "M 1800 -40",
  "C 1790 120, 1740 220, 1660 340",
  "C 1580 440, 1460 520, 1340 600",
  "C 1200 690, 1020 750, 860 760",
  "C 700 770, 540 740, 400 680",
  "C 280 630, 180 540, 140 440",
  "C 100 340, 100 240, 160 150",
  "C 220 80, 300 40, 380 40",
].join(" ");
export const HERO_VIEWBOX_DESKTOP = "0 0 1920 1080";

/**
 * Hero-local sweep — mobile (portrait 400×720). Three-segment S-curve
 * with perfectly G1-continuous joints: at each joint the incoming and
 * outgoing Bézier handles are collinear and equal length, so the path
 * has no direction-change kinks. The hiker's progress along it feels
 * smooth end-to-end, matching the polish of the desktop variant.
 *
 * Enters top-right, sweeps down-left through the upper third, bows
 * out across the middle-left, returns across to bottom-right.
 *
 * Joint at (240, 240): handles (340, 160) → (140, 320). Mirrored.
 * Joint at (100, 520): handles (60, 400) → (140, 640). Mirrored.
 */
export const HERO_PATH_MOBILE_D = [
  "M 370 -30",
  "C 380 80, 340 160, 240 240",
  "C 140 320, 60 400, 100 520",
  "C 140 640, 280 680, 380 720",
].join(" ");
export const HERO_VIEWBOX_MOBILE = "0 0 400 720";
