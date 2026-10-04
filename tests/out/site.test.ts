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

  it('has its own canonical and no language alternates', () => {
    const html = read('fundadores.html');
    expect(html).toContain('<link rel="canonical" href="https://mxstudioweb.com.br/fundadores"');
    expect(html).not.toMatch(/<link rel="alternate"[^>]*hrefLang=/i);
  });
});

describe('search engines', () => {
  const hreflang = (html: string, lang: string, url: string) =>
    new RegExp(`<link[^>]*hrefLang="${lang}"[^>]*href="${url}"|<link[^>]*href="${url}"[^>]*hrefLang="${lang}"`, 'i').test(html);

  it('links the three languages of the home page to each other', () => {
    for (const file of ['index.html', 'en.html', 'es.html']) {
      const html = read(file);
      expect(hreflang(html, 'pt-BR', 'https://mxstudioweb.com.br'), file).toBe(true);
      expect(hreflang(html, 'en', 'https://mxstudioweb.com.br/en'), file).toBe(true);
      expect(hreflang(html, 'es', 'https://mxstudioweb.com.br/es'), file).toBe(true);
      expect(hreflang(html, 'x-default', 'https://mxstudioweb.com.br'), file).toBe(true);
    }
    expect(read('en.html')).toContain('<link rel="canonical" href="https://mxstudioweb.com.br/en"');
  });

  it('describes the studio with structured data', () => {
    const html = read('index.html');
    expect(html).toContain('"@type":"ProfessionalService"');
    expect(html).toContain('"email":"contato@mxstudioweb.com.br"');
  });

  it('has share images per language', () => {
    expect(read('index.html')).toContain('og-pt.png');
    expect(read('en.html')).toContain('og-en.png');
  });

  it('has exactly one canonical, description and share image per page', () => {
    const count = (html: string, re: RegExp) => html.match(re)?.length ?? 0;
    for (const file of ['index.html', 'en.html', 'es.html', 'fundadores.html', 'demo/moda-arte.html', 'es/demo/rota-clara.html']) {
      const html = read(file);
      expect(count(html, /<link rel="canonical"/g), file).toBe(1);
      expect(count(html, /<meta name="description"/g), file).toBe(1);
      expect(count(html, /<meta property="og:image"/g), file).toBe(1);
      expect(count(html, /<title>/g), file).toBe(1);
    }
  });

  it('indexes showcased demos and hides the four without photos', () => {
    expect(read('demo/moda-arte.html')).not.toContain('noindex');
    for (const slug of ['lumi-odonto', 'iris-estetica', 'alicerce-construtora', 'mare-salao']) {
      expect(read(`demo/${slug}.html`)).toContain('<meta name="robots" content="noindex, nofollow"');
    }
  });

  it('lists only public pages in the sitemap', () => {
    const xml = read('sitemap.xml');
    expect(xml).toContain('<loc>https://mxstudioweb.com.br</loc>');
    expect(xml).toContain('<loc>https://mxstudioweb.com.br/es/demo/rota-clara</loc>');
    for (const hidden of ['fundadores', 'carrossel', 'brand-kit', 'lumi-odonto', 'mare-salao']) expect(xml).not.toContain(hidden);
  });

  it('points robots to the sitemap', () => {
    expect(read('robots.txt')).toContain('Sitemap: https://mxstudioweb.com.br/sitemap.xml');
  });
});
