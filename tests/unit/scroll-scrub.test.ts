import { describe, expect, it } from 'vitest';
import { clamp01, pinnedProgress, scrubOffset, travelProgress } from '@/lib/scroll-scrub';

describe('scroll scrub', () => {
  it('clamps progress to 0..1, NaN included', () => {
    expect([clamp01(-0.2), clamp01(0.4), clamp01(3), clamp01(Number.NaN)]).toEqual([0, 0.4, 1, 0]);
  });

  it('runs the pinned progress over the track minus the stage', () => {
    // 2250px track (250vh at 900), 900px stage: 1350px of scroll while pinned.
    expect(pinnedProgress(200, 2250, 900)).toBe(0);
    expect(pinnedProgress(0, 2250, 900)).toBe(0);
    expect(pinnedProgress(-675, 2250, 900)).toBe(0.5);
    expect(pinnedProgress(-1350, 2250, 900)).toBe(1);
    expect(pinnedProgress(-3000, 2250, 900)).toBe(1);
  });

  it('never divides by zero when the track is no taller than the stage', () => {
    expect(pinnedProgress(10, 800, 800)).toBe(0);
    expect(pinnedProgress(-10, 800, 800)).toBe(1);
  });

  it('runs the travel progress from the frame top at 85% to its bottom at 20% of the viewport', () => {
    const vh = 800;
    const frame = 200;
    expect(travelProgress(vh, frame, vh)).toBe(0);
    expect(travelProgress(0.85 * vh, frame, vh)).toBe(0);
    expect(travelProgress(0.2 * vh - frame, frame, vh)).toBe(1);
    expect(travelProgress(-vh, frame, vh)).toBe(1);
    // Halfway between both marks.
    expect(travelProgress((0.85 * vh + 0.2 * vh - frame) / 2, frame, vh)).toBeCloseTo(0.5);
  });

  it('moves the body until its last pixel meets the bottom of the frame, under the menu', () => {
    // Frame 686px wide: box 428.75px, menu 38.9px, body 2459.3px.
    expect(scrubOffset(0, 2459.3, 428.75, 38.9)).toBe(0);
    expect(scrubOffset(1, 2459.3, 428.75, 38.9)).toBeCloseTo(2459.3 - (428.75 - 38.9));
    expect(scrubOffset(0.5, 1000, 400)).toBe(300);
    expect(scrubOffset(2, 1000, 400)).toBe(600);
  });

  it('does not move a body that already fits', () => {
    expect(scrubOffset(1, 300, 400, 20)).toBe(0);
  });

  it('follows the page scroll in step, only ever moving the way the visitor scrolls', () => {
    // Pinned at 1440x900: 1350px of page scroll carry the body over its whole run, linearly.
    const run = scrubOffset(1, 2459.3, 428.75, 38.9);
    let prev = -1;
    for (let scrolled = 0; scrolled <= 1350; scrolled += 45) {
      const y = scrubOffset(pinnedProgress(-scrolled, 2250, 900), 2459.3, 428.75, 38.9);
      expect(y).toBeGreaterThan(prev);
      expect(y).toBeCloseTo((scrolled / 1350) * run);
      prev = y;
    }
  });
});
