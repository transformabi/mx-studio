import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '../..');
const fontsTs = path.join(root, 'src/lib/fonts.ts');
const fontsDir = path.join(root, 'src/fonts');

describe('vendored fonts', () => {
  it('does not import next/font/google (CI-safe loader)', () => {
    const source = readFileSync(fontsTs, 'utf8');
    expect(source).not.toMatch(/from ['"]next\/font\/google['"]/);
    expect(source).toMatch(/from ['"]next\/font\/local['"]/);
    expect(source).toMatch(/--font-bricolage/);
    expect(source).toMatch(/--font-jetbrains/);
  });

  it('keeps latin woff2 files on disk for every studio family', () => {
    expect(existsSync(fontsDir)).toBe(true);
    const files = readdirSync(fontsDir).filter((name) => name.endsWith('.woff2'));
    expect(files.length).toBeGreaterThanOrEqual(6);
    for (const stem of [
      'bricolage-grotesque',
      'figtree',
      'jetbrains-mono',
      'space-grotesk',
      'instrument-serif',
      'instrument-sans',
    ]) {
      expect(files.some((name) => name.startsWith(stem)), stem).toBe(true);
    }
  });
});
