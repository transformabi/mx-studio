/**
 * Scroll-driven ("scrub") math for src/components/site/scrolling-site.tsx, kept pure so it can be tested.
 * Every value is in CSS pixels; progress runs from 0 (top of the page inside the frame) to 1 (bottom).
 */

/** Class names of the pinned section. Their CSS lives in globals.css and the no-JS reset in reveal-noscript.tsx. */
export const PIN_TRACK = 'scrub-pin';
export const PIN_STAGE = 'scrub-pin-stage';

export const clamp01 = (value: number) => (value > 1 ? 1 : value > 0 ? value : 0);

/**
 * Pinned on desktop: 0 when the tall track's top reaches the top of the viewport (the stage starts sticking),
 * 1 when its bottom meets the stage's bottom (the stage lets go).
 */
export function pinnedProgress(trackTop: number, trackHeight: number, stageHeight: number) {
  const run = trackHeight - stageHeight;
  if (run <= 0) return trackTop < 0 ? 1 : 0;
  return clamp01(-trackTop / run);
}

/**
 * Not pinned (phones, tablets, short screens): 0 while the frame's top is still below `start` of the viewport,
 * 1 once its bottom has risen above `end`, so the whole page plays while the frame crosses the screen.
 */
export function travelProgress(frameTop: number, frameHeight: number, viewportHeight: number, start = 0.85, end = 0.2) {
  const from = viewportHeight * start;
  const to = viewportHeight * end - frameHeight;
  return clamp01((from - frameTop) / (from - to));
}

/**
 * How far the page body moves up inside the frame: at 1, its last pixel sits on the frame's bottom edge.
 * The menu strip on top covers `headerHeight` of the box, so only the rest of the box shows the body.
 */
export function scrubOffset(progress: number, bodyHeight: number, boxHeight: number, headerHeight = 0) {
  return clamp01(progress) * Math.max(0, bodyHeight - (boxHeight - headerHeight));
}
