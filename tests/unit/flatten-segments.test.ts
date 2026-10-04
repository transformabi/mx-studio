import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { flattenSegments, nestedSegments } from '../../scripts/flatten-segments.mjs';

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'flatten-segments-'));
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

const put = (path: string, content: string) => {
  const full = join(dir, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
};
const read = (path: string) => readFileSync(join(dir, path), 'utf8');
const rel = (path: string) => relative(dir, path).split(sep).join('/');

/** Every file under the temp dir as 'relative/path' → content, to compare whole trees. */
function tree(root = dir): Record<string, string> {
  return Object.fromEntries(
    readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
      const full = join(root, entry.name);
      return entry.isDirectory() ? Object.entries(tree(full)) : [[rel(full), readFileSync(full, 'utf8')]];
    }),
  );
}

describe('flattenSegments', () => {
  it('copies a nested segment file to the flat name the client requests, keeping the original', () => {
    put('route/__next.!abc/demo/$d$slug/__PAGE__.txt', 'page payload');

    const written = flattenSegments(dir);

    expect(written.map(({ from, to }) => [rel(from), rel(to)])).toEqual([
      ['route/__next.!abc/demo/$d$slug/__PAGE__.txt', 'route/__next.!abc.demo.$d$slug.__PAGE__.txt'],
    ]);
    expect(read('route/__next.!abc.demo.$d$slug.__PAGE__.txt')).toBe('page payload');
    expect(read('route/__next.!abc/demo/$d$slug/__PAGE__.txt')).toBe('page payload');
  });

  it('anchors at the top-most __next.* directory, at the root and in deep routes', () => {
    put('__next.!root/__PAGE__.txt', 'root page');
    put('en/demo/moda-arte/__next.!x/__next.y/z.txt', 'deep');

    flattenSegments(dir);

    expect(read('__next.!root.__PAGE__.txt')).toBe('root page');
    expect(read('en/demo/moda-arte/__next.!x.__next.y.z.txt')).toBe('deep');
  });

  it('leaves an already-flat export untouched', () => {
    put('index.html', '<html></html>');
    put('__next._tree.txt', 'tree');
    put('demo/moda-arte/__next.!KHB0KQ.demo.$d$slug.__PAGE__.txt', 'page');
    put('_next/static/chunks/app.js', 'js');
    const before = tree();

    expect(nestedSegments(dir)).toEqual([]);
    expect(flattenSegments(dir)).toEqual([]);
    expect(tree()).toEqual(before);
  });

  it('can run twice', () => {
    put('route/__next.!abc/demo/$d$slug/__PAGE__.txt', 'page payload');

    expect(flattenSegments(dir)).toHaveLength(1);
    const after = tree();
    expect(flattenSegments(dir)).toEqual([]);
    expect(tree()).toEqual(after);
  });

  it('replaces a flat copy whose content differs from the nested file', () => {
    put('route/__next.!abc/__PAGE__.txt', 'new');
    put('route/__next.!abc.__PAGE__.txt', 'old');

    expect(flattenSegments(dir)).toHaveLength(1);
    expect(read('route/__next.!abc.__PAGE__.txt')).toBe('new');
  });
});
