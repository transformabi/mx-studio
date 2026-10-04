// Gives every Next.js segment-prefetch file the flat name the browser asks for.
// On some machines (seen on Windows) the static export writes them nested,
//   out/<route>/__next.<a>/<b>/<file>.txt
// while the Next 16 client requests
//   out/<route>/__next.<a>.<b>.<file>.txt
// so this copies each nested file to its flat name (keeping the original).
// Where the export is already flat (Linux, Cloudflare's build) it does nothing.
// Usage: node scripts/flatten-segments.mjs [dir]   (default: out; runs after next build)
import { copyFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * @typedef {{ from: string, to: string }} SegmentCopy
 * `from` is a file inside a `__next.*` directory; `to` is its flat name in the route directory.
 */

/**
 * Lists every file that lives inside a `__next.*` directory (at any depth below it),
 * paired with its flat name: the top-most `__next.*` directory name and the remaining
 * path segments joined with '.', placed in that directory's parent (the route directory).
 * @param {string} outDir
 * @returns {SegmentCopy[]}
 */
export function nestedSegments(outDir) {
  /** @type {SegmentCopy[]} */
  const found = [];

  /**
   * @param {string} dir
   * @param {{ routeDir: string, parts: string[] } | null} segment the top-most `__next.*` directory we are inside, if any
   */
  const walk = (dir, segment) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (segment) walk(full, { routeDir: segment.routeDir, parts: [...segment.parts, entry.name] });
        else walk(full, entry.name.startsWith('__next.') ? { routeDir: dir, parts: [entry.name] } : null);
      } else if (entry.isFile() && segment) {
        found.push({ from: full, to: join(segment.routeDir, [...segment.parts, entry.name].join('.')) });
      }
    }
  };

  walk(outDir, null);
  return found;
}

/**
 * Copies each nested segment file to its flat name. Originals stay where they are, and a flat
 * file that already has the same content is left alone, so running it again changes nothing.
 * @param {string} outDir
 * @returns {SegmentCopy[]} the copies actually written
 */
export function flattenSegments(outDir) {
  /** @type {SegmentCopy[]} */
  const written = [];
  for (const copy of nestedSegments(outDir)) {
    if (existsSync(copy.to) && readFileSync(copy.to).equals(readFileSync(copy.from))) continue;
    copyFileSync(copy.from, copy.to);
    written.push(copy);
  }
  return written;
}

// Run only when invoked directly (node scripts/flatten-segments.mjs), not when imported by tests.
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const dir = process.argv[2] ?? 'out';
  if (!existsSync(dir)) {
    console.error(`flatten-segments: ${dir}/ not found (run next build first)`);
    process.exit(1);
  }
  const written = flattenSegments(dir);
  console.log(`flatten-segments: flattened ${written.length} file(s) in ${dir}/`);
}
