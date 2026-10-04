import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { showcase } from '@/lib/estudio';
import { portrait, shots } from '@/lib/images';

const file = (src: string) => join(process.cwd(), 'public', src);
const { scroll } = shots.sulamita;
const all = [
  shots.sulamita.desktop,
  shots.sulamita.detail,
  shots.sulamita.mobile,
  scroll.header,
  scroll.body,
  scroll.bodySmall,
  portrait,
  ...showcase.map((s) => shots.demos[s]),
];

describe('real images', () => {
  it('exist for the client case, every showcased demo and the portrait', () => {
    for (const img of all) expect(existsSync(file(img.src)), img.src).toBe(true);
  });

  it('declare the real pixel size, so the layout never jumps', async () => {
    for (const img of all) {
      const meta = await sharp(file(img.src)).metadata();
      expect([meta.width, meta.height], img.src).toEqual([img.width, img.height]);
    }
  });

  it('keep the scrolling page strips of the client case in step', () => {
    // The frame lays the body out from the 1200px file; the 768px copy must be the same strip, only smaller.
    expect(scroll.bodySmall.height / scroll.bodySmall.width).toBeCloseTo(scroll.body.height / scroll.body.width, 2);
    expect(scroll.header.width).toBe(scroll.body.width);
  });

  it('ship Open Graph images for the three languages', () => {
    for (const l of ['pt', 'en', 'es']) expect(existsSync(file(`/og/og-${l}.png`))).toBe(true);
  });
});
