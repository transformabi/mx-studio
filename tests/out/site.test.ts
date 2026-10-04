import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { demos } from '@/lib/estudio';

const OUT = join(process.cwd(), 'out');
const read = (p: string) => readFileSync(join(OUT, p), 'utf8');

function htmlFiles(dir = OUT): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === '_next' ? [] : htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

/** '/' → out/index.html, '/demo/x' → out/demo/x.html (or x/index.html), files as-is. */
function resolves(href: string) {
  const path = decodeURI(href.split(/[?#]/)[0]);
  if (path === '/' || path === '') return existsSync(join(OUT, 'index.html'));
  const base = join(OUT, path);
  return (
    existsSync(`${base}.html`) ||
    existsSync(join(base, 'index.html')) ||
    (existsSync(base) && statSync(base).isFile())
  );
}

describe('static export', () => {
  it('serves each language with the right <html lang>', () => {
    expect(read('index.html')).toMatch(/<html[^>]*lang="pt-BR"/);
    expect(read('en.html')).toMatch(/<html[^>]*lang="en"/);
    expect(read('es.html')).toMatch(/<html[^>]*lang="es"/);
  });

  it('has a 404 page', () => {
    expect(existsSync(join(OUT, '404.html'))).toBe(true);
  });

  it('builds every demo in every language', () => {
    for (const { slug } of demos) {
      for (const prefix of ['', '/en', '/es']) expect(resolves(`${prefix}/demo/${slug}`), `${prefix}/demo/${slug}`).toBe(true);
    }
  });

  it('keeps the internal tools out of search', () => {
    expect(read('carrossel.html')).toMatch(/<meta name="robots" content="noindex, nofollow"/);
    expect(read('brand-kit.html')).toMatch(/<meta name="robots" content="noindex, nofollow"/);
  });
});
