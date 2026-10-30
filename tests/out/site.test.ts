import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { demos, lcpSeconds, showcase } from '@/lib/estudio';
import { nestedSegments } from '../../scripts/flatten-segments.mjs';

const OUT = join(process.cwd(), 'out');
const read = (p: string) => readFileSync(join(OUT, p), 'utf8');

function htmlFiles(dir = OUT): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === '_next' ? [] : htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

/** Visible text of a page: no tags, no React's <!-- --> separators, collapsed spaces. */
const text = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<!-- -->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ ([.,])/g, '$1');

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

  const noscriptCss = (html: string) => html.match(/<noscript><style>([^<]*)<\/style><\/noscript>/)?.[1] ?? '';

  it('shows the fade-in content when JavaScript is off', () => {
    for (const file of ['index.html', 'en.html', 'es.html', 'fundadores.html']) {
      const html = read(file);
      expect(noscriptCss(html), file).toContain('.reveal{opacity:1!important;transform:none!important;translate:none!important}');
      expect(html, file).toMatch(/class="reveal /);
    }
  });

  it('drops the pin of the client case when JavaScript is off', () => {
    for (const file of ['index.html', 'en.html', 'es.html']) {
      const html = read(file);
      expect(html, file).toContain('class="scrub-pin"');
      expect(html, file).toContain('class="scrub-pin-stage"');
      expect(noscriptCss(html), file).toContain('.scrub-pin{height:auto!important;margin-block:0!important}');
      expect(noscriptCss(html), file).toContain('.scrub-pin-stage{position:static!important;');
    }
  });

  it('pins the client case only on screens tall enough for it in every language, and never in print', () => {
    const css = [...read('index.html').matchAll(/<link rel="stylesheet" href="\/([^"]+\.css)"/g)]
      .map(([, href]) => read(href))
      .join('');
    const pin = css.match(/@media([^{]*)\{\.scrub-pin\{/)?.[1] ?? '';
    const queries = pin.split(',').map((q) => q.trim());
    expect(queries.length, pin).toBeGreaterThan(0);
    for (const q of queries) {
      expect(q).toMatch(/^screen and /);
      expect(q).toContain('prefers-reduced-motion:no-preference');
      // The case needs about 660px at 1024px wide in Spanish or with the fallback fonts, 646px from 1280px.
      const [, w] = q.match(/min-width:(\d+)rem/) ?? [];
      const [, h] = q.match(/min-height:(\d+)rem/) ?? [];
      expect(Number(h) * 16, q).toBeGreaterThanOrEqual(Number(w) >= 80 ? 656 : 672);
    }
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

  it('has a flat copy of every nested segment-prefetch file', () => {
    // Passes trivially where the export is already flat (no __next.* directories).
    const missing = nestedSegments(OUT).filter(({ from, to }) => !existsSync(to) || !readFileSync(to).equals(readFileSync(from)));
    expect(missing.map(({ to }) => to.replace(OUT, ''))).toEqual([]);
  });
});

describe('home page', () => {
  const pages = { pt: 'index.html', en: 'en.html', es: 'es.html' } as const;

  it.each(Object.entries(pages))('%s has every section and the contact e-mail', (_, file) => {
    const html = read(file);
    for (const id of ['case', 'work', 'process', 'planos', 'about', 'faq', 'contact']) expect(html).toContain(`id="${id}"`);
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

  it('shows each showcased demo load time with one decimal, in the page language', () => {
    const pt = text(read('index.html'));
    const en = text(read('en.html'));
    for (const slug of showcase) {
      const s = lcpSeconds[slug].toFixed(1);
      expect(pt).toContain(`Carrega em ${s.replace('.', ',')} s no 4G`);
      expect(en).toContain(`Loads in ${s} s on 4G`);
    }
  });

  it('keeps only the priced plans: no image cards, no price-on-request services', () => {
    const html = read('index.html').replace(/\s/g, ' ');
    expect(html).not.toContain('Valores a consultar');
    expect(html).not.toContain('id="pricing"');
    expect(html).not.toContain('Serviços e preços');
    expect(html).not.toContain('Pedir orçamento');
    expect(html).not.toContain('href="/#pricing"');
    expect(html).toContain('href="/#planos"');
    expect(html).toContain('Consulte sites para pequenas empresas');
    expect(html).toContain('href="/#planos"');
    expect(html).toContain('cta-call');
    // The retired BRL subscription cards (images + Stripe checkout) are gone.
    for (const gone of ['R$ 297', 'R$ 447', 'R$ 597', '/planos/', 'create-checkout-session', 'Essencial', 'Site por assinatura']) {
      expect(html).not.toContain(gone);
    }
    expect(html).not.toContain('R$ 497');
    expect(html).not.toContain('R$ 3.500');
    expect(html).not.toContain('R$ 4.900');
    expect(html).not.toContain('R$ 9.900');
    expect(html).not.toContain('R$ 16.000');
    expect(html).not.toContain('mxstudioweb.vercel.app');
    expect(html).not.toContain('mx-studio-web.vercel.app');
  });

  it('shows the small-business plans (setup + monthly, 14 days) in every language and currency', () => {
    const nbsp = (s: string) => s.replace(/\u00a0|&nbsp;/g, ' ');
    const pt = nbsp(text(read('index.html')));
    const en = nbsp(text(read('en.html')));
    const es = nbsp(text(read('es.html')));
    for (const file of ['index.html', 'en.html', 'es.html']) {
      const html = read(file);
      expect(html).toContain('id="planos"');
      for (const id of ['launch', 'business', 'growth']) expect(html).toContain(`data-plan="${id}"`);
      // The site's currency selector sits on the plans.
      expect(html).toContain('id="currency-label"');
      expect(html.match(/role="radio"/g)?.length).toBe(4);
    }
    for (const page of [pt, en, es]) for (const name of ['Launch', 'Business', 'Growth']) expect(page).toContain(name);
    // Prerendered in the language's default currency: BRL in Portuguese and USD in English (converted, "≈"), exact euros in Spanish.
    expect(pt).toMatch(/≈ R\$ \d+/);
    expect(en).toMatch(/≈ \$\d+/);
    for (const a of ['150 €', '20 €', '350 €', '25 €', '650 €', '35 €']) expect(es).toContain(a);
    expect(read('es.html')).toContain(encodeURIComponent('plan Business: 350\u00a0€ de creación + 25\u00a0€/mes'));
    expect(en).toContain('Live in 14 days');
    expect(pt).toContain('No ar em 14 dias');
    // Each CTA opens WhatsApp with the chosen plan and the amounts shown on screen.
    expect(read('en.html')).toContain(encodeURIComponent('I want the Launch plan'));
    expect(read('index.html')).toMatch(/wa\.me\/[^"]*%E2%89%88%20R%24/);
    expect(nbsp(text(read('en.html')))).not.toContain('Price on request');
    expect(nbsp(text(read('es.html')))).not.toContain('Valores a consultar');
    // Structured data lists the euro offers, without the retired BRL range.
    expect(read('en.html')).toContain('"priceCurrency":"EUR"');
    expect(read('index.html')).toContain('"priceRange":"€150–650 + €20–35/mo"');
  });

  it('has no broken internal link or asset', () => {
    // Includes the four hidden demos: they render stand-in art instead of requesting photos that don't exist yet.
    const broken: string[] = [];
    for (const file of htmlFiles()) {
      const html = readFileSync(file, 'utf8');
      for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"/][^"]*|\/)"/g)) {
        if (!resolves(url)) broken.push(`${file.replace(OUT, '')} → ${url}`);
      }
      // Responsive candidates (<img srcset>, <picture><source srcset>): "url 768w, url 1920w".
      for (const [, set] of html.matchAll(/srcset="([^"]+)"/gi)) {
        for (const url of set.split(',').map((c) => c.trim().split(/\s+/)[0])) {
          if (url.startsWith('/') && !resolves(url)) broken.push(`${file.replace(OUT, '')} → ${url} (srcset)`);
        }
      }
    }
    expect(broken).toEqual([]);
  });
});

describe('/fundadores', () => {
  it('is Portuguese only, out of search, and shows the small-business plans instead of the retired prices', () => {
    const html = read('fundadores.html').replace(/\s/g, ' ');
    expect(html).toMatch(/<html[^>]*lang="pt-BR"/);
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow"/);
    expect(html).toContain('id="planos"');
    for (const id of ['launch', 'business', 'growth']) expect(html).toContain(`data-plan="${id}"`);
    expect(html).not.toContain('R$ 297');
    expect(html).not.toContain('R$ 447');
    expect(html).not.toContain('R$ 597');
    expect(html).not.toContain('R$ 497');
    expect(html).not.toContain('R$ 149,90');
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
    expect(html).toContain('"knowsLanguage":["pt-BR","en","es"]');
    expect(html).toContain('"areaServed":[');
    expect(html).not.toContain('"inLanguage"');
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
