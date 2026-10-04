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

describe('home page', () => {
  const pages = { pt: 'index.html', en: 'en.html', es: 'es.html' } as const;

  it.each(Object.entries(pages))('%s has every section and the contact e-mail', (_, file) => {
    const html = read(file);
    for (const id of ['case', 'work', 'process', 'pricing', 'about', 'faq', 'contact']) expect(html).toContain(`id="${id}"`);
    expect(html).toContain('contato@mxstudioweb.com.br');
    expect(html).toContain('sulamitaestetica.pt');
    expect(html).toMatch(/Wise/);
    expect(html).not.toMatch(/bitcoin|loremflickr|picsum/i);
  });

  it('lists only the six showcased demos', () => {
    const html = read('index.html');
    for (const slug of ['clinica-sereno', 'motta-advogados', 'moda-arte', 'restaurante-terra', 'costa-imoveis', 'rota-clara']) {
      expect(html).toContain(`href="/demo/${slug}"`);
    }
    for (const slug of ['lumi-odonto', 'iris-estetica', 'alicerce-construtora', 'mare-salao']) {
      expect(html).not.toContain(`/demo/${slug}`);
    }
    expect(read('en.html')).toContain('href="/en/demo/moda-arte"');
  });

  it('shows prices in reais by default in Portuguese', () => {
    expect(read('index.html').replace(/\s/g, ' ')).toContain('R$ 3.500');
  });

  it('has no broken internal link or asset', () => {
    // The four non-showcased demos are hidden (noindex) until they get photos, so their missing images are expected.
    const hiddenDemo = /[\\/]demo[\\/](lumi-odonto|iris-estetica|alicerce-construtora|mare-salao)\.html$/;
    const broken: string[] = [];
    for (const file of htmlFiles().filter((f) => !hiddenDemo.test(f))) {
      const html = readFileSync(file, 'utf8');
      for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"/][^"]*|\/)"/g)) {
        if (!resolves(url)) broken.push(`${file.replace(OUT, '')} → ${url}`);
      }
    }
    expect(broken).toEqual([]);
  });
});

describe('/fundadores', () => {
  it('is Portuguese only, out of search, and keeps the launch offer', () => {
    const html = read('fundadores.html').replace(/\s/g, ' ');
    expect(html).toMatch(/<html[^>]*lang="pt-BR"/);
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow"/);
    expect(html).toContain('R$ 497');
    expect(html).toContain('R$ 149,90');
    expect(html).toContain('sulamitaestetica.pt');
  });
});
