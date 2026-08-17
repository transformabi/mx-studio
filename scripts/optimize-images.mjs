/**
 * Converts every raster asset under /public to WebP at sane display dimensions.
 *
 * The demos shipped 59 MB of PNG/JPEG (hero art alone was 23.8 MB of PNG), which
 * pushed real-world LCP on throttled 4G to 8-17s. Originals are left in place —
 * only the .webp siblings are referenced by the app.
 */
import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC = path.resolve('public');
const EXT = new Set(['.png', '.jpg', '.jpeg']);

// Heroes render full-bleed; everything else renders in a card or grid cell.
const widthFor = (rel) => (rel.startsWith('heros') ? 1920 : 1200);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = await walk(PUBLIC);
let before = 0;
let after = 0;
const rows = [];

for (const file of files) {
  const rel = path.relative(PUBLIC, file).replace(/\\/g, '/');
  const src = await stat(file);
  const target = file.replace(/\.(png|jpe?g)$/i, '.webp');

  const buf = await sharp(file)
    .resize({ width: widthFor(rel), withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();

  await writeFile(target, buf);
  before += src.size;
  after += buf.length;
  rows.push({ rel, from: src.size, to: buf.length });
}

rows.sort((a, b) => b.from - a.from);
for (const r of rows.slice(0, 8)) {
  console.log(
    `  ${r.rel.padEnd(38)} ${(r.from / 1048576).toFixed(2).padStart(6)} MB -> ${(r.to / 1024).toFixed(0).padStart(5)} KB`
  );
}

console.log(
  `\n${files.length} arquivos | ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB ` +
    `(-${(100 - (after / before) * 100).toFixed(1)}%)`
);
