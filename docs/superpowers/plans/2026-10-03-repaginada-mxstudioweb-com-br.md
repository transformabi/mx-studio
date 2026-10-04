# Repaginada MX Studio Web + mxstudioweb.com.br — plano de execução

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refazer do zero o site do estúdio e publicá-lo como site estático na Cloudflare em `https://mxstudioweb.com.br`, em PT/EN/ES, com `contato@mxstudioweb.com.br` encaminhando para o Gmail e os links antigos da Vercel redirecionando.

**Architecture:** Next.js 16 App Router com `output: 'export'`. Três layouts raiz em grupos de rota — `(pt)` na raiz, `(intl)/[locale]` para `/en` e `/es`, `(tools)` para as ferramentas internas — para cada idioma ter o `<html lang>` certo sem cookies nem servidor. As demos saem de `src/app/demo` para `src/demos` e são servidas por uma rota `[slug]` em cada idioma. A moeda é escolhida no navegador (cotação buscada no build). Cloudflare Workers serve a pasta `out/`; a Vercel passa a só redirecionar.

**Tech Stack:** Next.js 16.3, React 19, Tailwind CSS 4, TypeScript, lucide-react, Vitest (testes), playwright-core + Microsoft Edge (prints e imagens OG), sharp (foto), Wrangler (Cloudflare).

**Spec:** `docs/superpowers/specs/2026-10-03-repaginada-mxstudioweb-com-br-design.md`

## Global Constraints

- Domínio: `https://mxstudioweb.com.br` (sem www). E-mail público: `contato@mxstudioweb.com.br`. WhatsApp: `5521993196171` / `(21) 99319-6171`. Instagram: `@mxstudioweb`.
- Preços (BRL, "a partir de"): landing 3500 · institucional 4900 · e-commerce 9900 · sistema 16000.
- Idiomas: `pt` em `/`, `en` em `/en`, `es` em `/es`. Moedas: `BRL`, `USD`, `EUR`, `GBP` — **sem BTC**.
- Formas de pagamento exibidas: PIX · cartão de crédito parcelado · Wise (internacional).
- Cliente real: **só** Sulamita Nascimento (sulamitaestetica.pt). Demos sempre rotuladas "Modelo de demonstração". Nada de depoimento, logo de cliente ou número inventado.
- Sobre: sem anos de experiência e sem passagem por agência; pode citar "consultoria de dados e BI" (sem o nome Transforma BI).
- Visual: nenhuma ilustração/arte em código, nenhum 3D, grão, cortina, marquee ou foto aleatória de fallback. Só prints reais e a foto do Max. Verde `#A4FE24` só em CTA principal e destaques pontuais.
- Vitrine: só `clinica-sereno`, `motta-advogados`, `moda-arte`, `restaurante-terra`, `costa-imoveis`, `rota-clara`. As outras 4 demos ficam acessíveis, `noindex`, fora do sitemap.
- Diagnóstico continua em `https://mx-studio-web.vercel.app/` (fora deste plano; ver "Mudanças em relação à spec").
- Não apagar projetos da Vercel nem repositórios; não tocar em projetos de clientes/propostas.
- Comentários de código em inglês (padrão do repositório); textos do site nos 3 idiomas.

## Mudanças em relação à spec (descobertas ao planejar)

1. **Diagnóstico fica onde está.** O projeto `mx-studio-web` não é só um formulário: tem `painel`, `proposta`, `chamado` e prévias em `/p/:slug` já enviadas a prospectos, com login no Supabase. Mudá-lo de domínio arrisca quebrar links e o login. O site novo aponta para `https://mx-studio-web.vercel.app/`; a migração vira projeto separado. O projeto `mx-studio-web` **não** recebe redirect.
2. **Sem filtro por ramo na vitrine.** São 6 demos de 6 ramos diferentes; um filtro com 1 item por opção não ajuda. A grade mostra o ramo em cada card.
3. **As demos são trilíngues** (cada `content.ts` tem PT/EN/ES), então existem também em `/en/demo/*` e `/es/demo/*`.

## Review Focus

1. Visitante com armazenamento bloqueado (aba anônima) troca a moeda → a troca vale na sessão, sem erro. Teste em `tests/unit/currency-store.test.ts` (Tarefa 1).
2. Visitante em `/fundadores` (só PT) clica em EN → vai para `/en`, não para uma página inexistente. Teste em `tests/unit/paths.test.ts` (Tarefa 1).
3. API de cotação fora do ar durante o build → o build não quebra e usa a cotação de reserva. Teste em `tests/unit/rates.test.ts` (Tarefa 1).
4. Celular de 375 px → nenhuma página com rolagem horizontal. Checagem por script no navegador nas Tarefas 6 e 7.
5. Link antigo com barra no fim (`/fundadores/`, `/demo/moda-arte/`) ou da Vercel (`mxstudioweb.vercel.app/fundadores`) → cai na página certa. `curl` nas Tarefas 11 e 12.

---

## Mapa de arquivos

```
next.config.js                         export estático + globalNotFound + imagens sem otimização
wrangler.jsonc                         Cloudflare Worker só com assets (pasta out/)
vercel.json                            (Tarefa 12) redirect 308 de tudo para o domínio novo
vitest.config.ts
scripts/shots.mjs                      prints reais (Edge) → public/shots/*.webp
scripts/portrait.mjs                   foto P&B → public/sobre/max-costa.webp
scripts/og.mjs                         imagens Open Graph → public/og/og-{pt,en,es}.png
scripts/source/max.jpg                 foto original enviada pelo Max
public/_headers                        cabeçalhos de segurança e cache
src/app/globals.css                    tokens e utilitários
src/app/global-not-found.tsx           404 único
src/app/sitemap.ts, src/app/robots.ts
src/app/(pt)/layout.tsx                raiz PT
src/app/(pt)/page.tsx                  home PT
src/app/(pt)/fundadores/page.tsx
src/app/(pt)/demo/[slug]/page.tsx
src/app/(intl)/[locale]/layout.tsx     raiz EN/ES
src/app/(intl)/[locale]/page.tsx
src/app/(intl)/[locale]/demo/[slug]/page.tsx
src/app/(tools)/layout.tsx             raiz das ferramentas internas (noindex)
src/app/(tools)/carrossel/**, src/app/(tools)/brand-kit/page.tsx   (movidos, sem mudança)
src/demos/<slug>/demo.tsx + content.ts (movidos de src/app/demo/<slug>/page.tsx)
src/demos/registry.tsx                 slug → componente (import dinâmico)
src/demos/route.tsx                    params, metadata e render compartilhados pelas rotas de demo
src/i18n/config.ts, paths.ts, format.ts, rates.ts, currency-store.ts, provider.tsx
src/i18n/messages/{pt,en,es}.ts, index.ts
src/lib/estudio.ts                     dados do estúdio, vitrine, serviços
src/lib/images.ts                      caminhos e tamanhos das imagens reais
src/lib/fonts.ts                       next/font compartilhado pelos layouts
src/lib/seo.tsx                        metadata, hreflang, JSON-LD
src/components/site/*                  header, footer, logo, lang-switch, currency-switch, price,
                                       button-link, section-header, browser-frame, phone-frame, site-chrome
src/components/home/*                  hero, client-case, showcase, showcase-card, process, pricing,
                                       about, faq, contact, contact-form, home-page
src/components/demo-frame.tsx          restyle
tests/unit/*.test.ts                   testes de módulos
tests/out/site.test.ts                 testes do HTML gerado em out/
```

---

### Task 1: Base de idiomas e moeda (sem BTC, sem cookies) + testes

**Files:**
- Create: `vitest.config.ts`, `src/i18n/paths.ts`, `src/i18n/currency-store.ts`, `tests/unit/paths.test.ts`, `tests/unit/format.test.ts`, `tests/unit/rates.test.ts`, `tests/unit/currency-store.test.ts`
- Modify: `package.json`, `src/i18n/config.ts`, `src/i18n/format.ts`, `src/i18n/rates.ts`, `eslint.config.mjs`

**Interfaces:**
- Produces: `locales`, `Locale`, `defaultLocale`, `prefixedLocales`, `currencies` (`'BRL'|'USD'|'EUR'|'GBP'`), `Currency`, `localeInfo`, `currencySymbol`, `defaultCurrency`, `isLocale`, `isCurrency`, `CURRENCY_STORAGE_KEY` (config); `splitLocale(pathname)`, `localizedPath(locale, path?)`, `switchLocalePath(pathname, target)`, `alternates(path)` (paths); `formatMoney(brl, locale, currency, rates, opts?)`, `fill(msg, vars)`, `Rates`, `MoneyOptions` (format); `getRates(): Promise<Rates>`, `fallbackRates` (rates); `readSavedCurrency()`, `saveCurrency(c)`, `subscribeCurrency(cb)` (currency-store).

- [ ] **Step 1: Instalar Vitest e ignorar `out/` no lint**

Run: `npm install -D vitest`

Em `package.json`, substituir o bloco `"scripts"` por:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "test": "vitest run tests/unit",
    "test:out": "vitest run tests/out",
    "check": "npm run lint && npm test && npm run build && npm run test:out",
    "shots": "node scripts/shots.mjs",
    "portrait": "node scripts/portrait.mjs",
    "og": "node scripts/og.mjs"
  },
```

E trocar `"name": "max-costa-estudio"` por `"name": "mx-studio-web"` e `"version": "1.0.0"` por `"version": "2.0.0"`.

Em `eslint.config.mjs`, trocar a linha do `globalIgnores` por:

```js
  globalIgnores(['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts']),
```

Create `vitest.config.ts`:

```ts
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: { environment: 'node' },
});
```

- [ ] **Step 2: Escrever os testes que falham**

Create `tests/unit/paths.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { alternates, localizedPath, splitLocale, switchLocalePath } from '@/i18n/paths';

describe('splitLocale', () => {
  it('treats unprefixed paths as Portuguese', () => {
    expect(splitLocale('/')).toEqual({ locale: 'pt', path: '/' });
    expect(splitLocale('/demo/moda-arte')).toEqual({ locale: 'pt', path: '/demo/moda-arte' });
  });
  it('reads the /en and /es prefixes', () => {
    expect(splitLocale('/en')).toEqual({ locale: 'en', path: '/' });
    expect(splitLocale('/es/demo/rota-clara')).toEqual({ locale: 'es', path: '/demo/rota-clara' });
    expect(splitLocale('/en/')).toEqual({ locale: 'en', path: '/' });
  });
});

describe('localizedPath', () => {
  it('keeps Portuguese at the root and prefixes the others', () => {
    expect(localizedPath('pt', '/')).toBe('/');
    expect(localizedPath('en', '/')).toBe('/en');
    expect(localizedPath('es', '/demo/moda-arte')).toBe('/es/demo/moda-arte');
    expect(localizedPath('en', 'demo/x/')).toBe('/en/demo/x');
  });
});

describe('switchLocalePath', () => {
  it('keeps the visitor on the same page in the other language', () => {
    expect(switchLocalePath('/demo/moda-arte', 'en')).toBe('/en/demo/moda-arte');
    expect(switchLocalePath('/en/demo/moda-arte', 'pt')).toBe('/demo/moda-arte');
    expect(switchLocalePath('/es', 'en')).toBe('/en');
  });
  it('sends Portuguese-only pages to the home page of the other language', () => {
    expect(switchLocalePath('/fundadores', 'en')).toBe('/en');
    expect(switchLocalePath('/fundadores', 'pt')).toBe('/fundadores');
  });
});

describe('alternates', () => {
  it('lists every language plus x-default', () => {
    expect(alternates('/demo/x')).toEqual({
      'pt-BR': '/demo/x',
      en: '/en/demo/x',
      es: '/es/demo/x',
      'x-default': '/demo/x',
    });
  });
});
```

Create `tests/unit/format.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { currencies } from '@/i18n/config';
import { fill, formatMoney, type Rates } from '@/i18n/format';

const rates: Rates = { BRL: 1, USD: 0.2, EUR: 0.17, GBP: 0.15 };
const plain = (s: string) => s.replace(/\s/g, ' ');

describe('formatMoney', () => {
  it('formats reais without cents', () => {
    expect(plain(formatMoney(4900, 'pt', 'BRL', rates, { decimals: 0 }))).toBe('R$ 4.900');
  });
  it('converts and rounds other currencies to the nearest 10', () => {
    expect(formatMoney(4900, 'en', 'USD', rates, { decimals: 0, round: true })).toBe('$980');
    expect(plain(formatMoney(4900, 'es', 'EUR', rates, { decimals: 0, round: true }))).toBe('830 €');
    expect(formatMoney(4900, 'en', 'GBP', rates, { decimals: 0, round: true })).toBe('£740');
  });
});

describe('currencies', () => {
  it('only offers the currencies the studio is paid in', () => {
    expect([...currencies]).toEqual(['BRL', 'USD', 'EUR', 'GBP']);
  });
});

describe('fill', () => {
  it('replaces placeholders', () => {
    expect(fill('Até {amount}', { amount: 'R$ 5.000' })).toBe('Até R$ 5.000');
  });
});
```

Create `tests/unit/rates.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fallbackRates, getRates } from '@/i18n/rates';

afterEach(() => vi.unstubAllGlobals());

describe('getRates', () => {
  it('falls back when the rates API is down, so the build never breaks', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    expect(await getRates()).toEqual(fallbackRates);
  });
  it('reads the fiat rates the site offers', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: { rates: { USD: '0.18', EUR: '0.16', GBP: '0.14', BTC: '0.000002' } } }),
      }),
    );
    expect(await getRates()).toEqual({ BRL: 1, USD: 0.18, EUR: 0.16, GBP: 0.14 });
  });
});
```

Create `tests/unit/currency-store.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('currency store', () => {
  it('remembers the choice in localStorage', async () => {
    const data = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, v),
    });
    const store = await import('@/i18n/currency-store');
    store.saveCurrency('EUR');
    expect(store.readSavedCurrency()).toBe('EUR');
  });

  it('still switches for the session when storage is blocked', async () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    });
    const store = await import('@/i18n/currency-store');
    expect(store.readSavedCurrency()).toBeNull();
    store.saveCurrency('USD');
    expect(store.readSavedCurrency()).toBe('USD');
  });

  it('ignores values that are not offered currencies', async () => {
    vi.stubGlobal('localStorage', { getItem: () => 'BTC', setItem: () => {} });
    const store = await import('@/i18n/currency-store');
    expect(store.readSavedCurrency()).toBeNull();
  });
});
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `npx vitest run tests/unit`
Expected: FAIL — `@/i18n/paths` e `@/i18n/currency-store` não existem; `currencies` ainda contém `BTC`; `fallbackRates` não é exportado.

- [ ] **Step 4: Implementar**

Replace `src/i18n/config.ts` inteiro:

```ts
export const locales = ['pt', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';
/** Served under a prefix (/en, /es); Portuguese lives at the root. */
export const prefixedLocales = ['en', 'es'] as const satisfies readonly Locale[];

/** Currencies the studio is paid in (PIX/card in BRL, Wise for the rest). */
export const currencies = ['BRL', 'USD', 'EUR', 'GBP'] as const;
export type Currency = (typeof currencies)[number];

export const CURRENCY_STORAGE_KEY = 'mx-currency';

export const localeInfo: Record<
  Locale,
  { name: string; short: string; htmlLang: string; intl: string; og: string }
> = {
  pt: { name: 'Português', short: 'PT', htmlLang: 'pt-BR', intl: 'pt-BR', og: 'pt_BR' },
  en: { name: 'English', short: 'EN', htmlLang: 'en', intl: 'en-US', og: 'en_US' },
  es: { name: 'Español', short: 'ES', htmlLang: 'es', intl: 'es-ES', og: 'es_ES' },
};

export const currencySymbol: Record<Currency, string> = {
  BRL: 'R$',
  USD: 'US$',
  EUR: '€',
  GBP: '£',
};

/** Currency shown until the visitor picks one. */
export const defaultCurrency: Record<Locale, Currency> = { pt: 'BRL', en: 'USD', es: 'USD' };

export const isLocale = (v: unknown): v is Locale =>
  typeof v === 'string' && (locales as readonly string[]).includes(v);

export const isCurrency = (v: unknown): v is Currency =>
  typeof v === 'string' && (currencies as readonly string[]).includes(v);
```

Create `src/i18n/paths.ts`:

```ts
import { defaultLocale, isLocale, type Locale } from './config';

/** Pages that only exist in Portuguese; switching language from them lands on that language's home. */
const ptOnly = ['/fundadores'];

const normalize = (path: string) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
};

/** '/en/demo/x' → { locale: 'en', path: '/demo/x' }; unprefixed paths are Portuguese. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = normalize(pathname || '/').split('/');
  if (first !== defaultLocale && isLocale(first)) {
    return { locale: first, path: normalize(`/${rest.join('/')}`) };
  }
  return { locale: defaultLocale, path: normalize(pathname || '/') };
}

/** Public URL of `path` in `locale`: ('en', '/') → '/en', ('es', '/demo/x') → '/es/demo/x'. */
export function localizedPath(locale: Locale, path = '/'): string {
  const clean = normalize(path);
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Where the language switcher sends a visitor who is on `pathname`. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { path } = splitLocale(pathname);
  const exists = target === defaultLocale || !ptOnly.includes(path);
  return localizedPath(target, exists ? path : '/');
}

/** hreflang map for a page that exists in every language. */
export function alternates(path: string): Record<string, string> {
  return {
    'pt-BR': localizedPath('pt', path),
    en: localizedPath('en', path),
    es: localizedPath('es', path),
    'x-default': localizedPath('pt', path),
  };
}
```

Replace `src/i18n/format.ts` inteiro:

```ts
import { localeInfo, type Currency, type Locale } from './config';

/** Multipliers from 1 BRL to each currency. */
export type Rates = Record<Currency, number>;

export type MoneyOptions = {
  /** Fraction digits (default 2). */
  decimals?: 0 | 2;
  /** Round converted amounts to the nearest 10 — for "starting at" prices. */
  round?: boolean;
  compact?: boolean;
};

/** All prices in the codebase are written in BRL and converted at display time. */
export function formatMoney(
  brl: number,
  locale: Locale,
  currency: Currency,
  rates: Rates,
  opts: MoneyOptions = {},
) {
  let value = brl * rates[currency];
  if (opts.round && currency !== 'BRL' && value >= 100) value = Math.round(value / 10) * 10;
  const digits = opts.compact ? undefined : (opts.decimals ?? 2);

  return new Intl.NumberFormat(localeInfo[locale].intl, {
    style: 'currency',
    currency,
    notation: opts.compact ? 'compact' : 'standard',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Replaces {placeholders} in a message. */
export const fill = (message: string, vars: Record<string, string | number>) =>
  message.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
```

Replace `src/i18n/rates.ts` inteiro:

```ts
import type { Rates } from './format';

/** Used when the rates API is unreachable at build time (BRL → currency, Oct/2026). */
export const fallbackRates: Rates = { BRL: 1, USD: 0.1947, EUR: 0.1686, GBP: 0.1442 };

const fiat = ['USD', 'EUR', 'GBP'] as const;

/** Fetched once per build: the site is static, so prices refresh on every publish. */
export async function getRates(): Promise<Rates> {
  try {
    const res = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=BRL', {
      cache: 'force-cache',
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return fallbackRates;

    const { data } = (await res.json()) as { data: { rates: Record<string, string> } };
    const rates: Rates = { ...fallbackRates };
    for (const code of fiat) {
      const value = Number(data.rates[code]);
      if (!Number.isFinite(value) || value <= 0) return fallbackRates;
      rates[code] = value;
    }
    return rates;
  } catch {
    return fallbackRates;
  }
}
```

Create `src/i18n/currency-store.ts`:

```ts
import { CURRENCY_STORAGE_KEY, isCurrency, type Currency } from './config';

// The visitor's currency is a per-browser convenience. Storage can be missing or throw
// (private windows, blocked site data), so the choice also lives in memory for the session.
let memory: Currency | null = null;
const listeners = new Set<() => void>();

export function readSavedCurrency(): Currency | null {
  try {
    const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (isCurrency(saved)) return saved;
  } catch {
    // fall through to the in-memory value
  }
  return memory;
}

export function saveCurrency(currency: Currency) {
  memory = currency;
  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  } catch {
    // the in-memory value still applies for this session
  }
  listeners.forEach((notify) => notify());
}

export function subscribeCurrency(notify: () => void) {
  listeners.add(notify);
  window.addEventListener('storage', notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener('storage', notify);
  };
}
```

- [ ] **Step 5: Rodar e ver passar**

Run: `npx vitest run tests/unit`
Expected: PASS (4 arquivos, todos verdes).

Nota: neste ponto o `next build` ainda quebra (o `preferences-menu` antigo usa `BTC`/cookies e o `layout.tsx` usa `i18n/server.ts`). A Tarefa 2 apaga esses arquivos; o build volta a passar no fim dela.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts eslint.config.mjs src/i18n tests/unit
git commit -m "Idiomas por rota e moeda no navegador, sem BTC e sem cookies"
```

---

### Task 2: Esqueleto estático — grupos de rota, demos movidas, limpeza

**Files:**
- Modify: `next.config.js`, `src/i18n/provider.tsx`, `src/lib/estudio.ts`, `package.json`
- Create: `src/lib/fonts.ts`, `src/components/site/site-chrome.tsx`, `src/app/(pt)/layout.tsx`, `src/app/(pt)/page.tsx`, `src/app/(pt)/demo/[slug]/page.tsx`, `src/app/(intl)/[locale]/layout.tsx`, `src/app/(intl)/[locale]/page.tsx`, `src/app/(intl)/[locale]/demo/[slug]/page.tsx`, `src/app/(tools)/layout.tsx`, `src/app/global-not-found.tsx`, `src/demos/registry.tsx`, `src/demos/route.tsx`, `tests/out/site.test.ts`
- Move: `src/app/demo/<slug>/page.tsx` → `src/demos/<slug>/demo.tsx`; `src/app/demo/<slug>/content.ts` → `src/demos/<slug>/content.ts`; `src/app/carrossel` → `src/app/(tools)/carrossel`; `src/app/brand-kit` → `src/app/(tools)/brand-kit`
- Delete: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/template.tsx`, `src/app/fundadores/` (refeita na Tarefa 7), `src/app/api/`, `src/proxy.ts`, `src/i18n/server.ts`, `src/lib/whatsapp-agent.ts`, `src/components/{nav,footer,btn,contact-form,faq-accordion,work-card,work-grid,process-timeline,preferences-menu,marquee,hide-on-carrossel,img-fallback,fashion-silhouettes}.tsx`, `src/components/fx/{hero-canvas,hero-backdrop,smooth-scroll,scroll-progress,spotlight-card,words}.tsx`, `public/*.md`, `public/heros/*.png`, `public/**/*.jpeg`, `public/clientes/`, `scripts/optimize-images.mjs`

**Interfaces:**
- Consumes: Tarefa 1 (`config`, `paths`, `format`, `rates`, `currency-store`).
- Produces: `I18nProvider({ locale, rates, children })` e `useI18n(): { locale, currency, intl, money(brl, opts?), setCurrency(c) }`; `fontVariables: string`; `SiteChrome({ locale, children })` (async server component); `showcase`, `ShowcaseSlug`, `isShowcased(slug)` (estudio); `demoParams()`, `demoMetadata(locale, slug): Metadata`, `DemoPage({ slug })`; `demoComponents: Record<DemoSlug, ComponentType>`; helpers de teste `htmlFiles()`, `resolves(href)`, `read(path)`, `OUT` em `tests/out/site.test.ts`.

- [ ] **Step 1: Escrever o teste do HTML gerado (falha)**

Create `tests/out/site.test.ts`:

```ts
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
```

Run: `npx vitest run tests/out`
Expected: FAIL — `out/` não existe.

- [ ] **Step 2: Configurar export estático e remover dependências mortas**

Replace `next.config.js` inteiro:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML in out/, served by Cloudflare. No server, no cookies.
  output: 'export',
  // Files in public/ are already sized WebP; there is no image server in a static export.
  images: { unoptimized: true },
  // One 404 page for every unmatched URL, across the three root layouts.
  experimental: { globalNotFound: true },
};

module.exports = nextConfig;
```

Run: `npm uninstall @anthropic-ai/sdk @upstash/redis three @types/three lenis`
Expected: `package.json` sem essas 5 dependências. (`framer-motion` fica: a demo Alicerce usa.)

- [ ] **Step 3: Apagar o que sai do site**

```bash
git rm -r -q src/app/api src/app/layout.tsx src/app/page.tsx src/app/template.tsx src/app/fundadores src/proxy.ts src/i18n/server.ts src/lib/whatsapp-agent.ts
git rm -q src/components/nav.tsx src/components/footer.tsx src/components/btn.tsx src/components/contact-form.tsx src/components/faq-accordion.tsx src/components/work-card.tsx src/components/work-grid.tsx src/components/process-timeline.tsx src/components/preferences-menu.tsx src/components/marquee.tsx src/components/hide-on-carrossel.tsx src/components/img-fallback.tsx src/components/fashion-silhouettes.tsx
git rm -q src/components/fx/hero-canvas.tsx src/components/fx/hero-backdrop.tsx src/components/fx/smooth-scroll.tsx src/components/fx/scroll-progress.tsx src/components/fx/spotlight-card.tsx src/components/fx/words.tsx
git rm -q public/CARROSSEL_INSTAGRAM.md public/IMAGENS_NECESSARIAS.md public/PROMPTS.md scripts/optimize-images.mjs
git rm -r -q public/clientes
git rm -q public/heros/*.png
git ls-files "public/*.jpeg" | xargs git rm -q
```

Run: `git grep -n -E "heros/[a-z-]+\.png|\.jpeg|components/(nav|footer|btn|work-card|img-fallback|hide-on-carrossel|marquee)|fx/(words|spotlight|hero|smooth|scroll)" -- src`
Expected: nenhum resultado. Se aparecer algo, ajustar o import no arquivo indicado antes de seguir.

- [ ] **Step 4: Mover demos e ferramentas**

```bash
for d in src/app/demo/*/; do s=$(basename "$d"); mkdir -p "src/demos/$s"; git mv "$d/page.tsx" "src/demos/$s/demo.tsx"; git mv "$d/content.ts" "src/demos/$s/content.ts"; done
mkdir -p "src/app/(tools)"
git mv src/app/carrossel "src/app/(tools)/carrossel"
git mv src/app/brand-kit "src/app/(tools)/brand-kit"
```

Run: `ls src/app/demo 2>/dev/null; ls src/demos`
Expected: `src/app/demo` vazio/ausente; `src/demos` com as 10 pastas, cada uma com `demo.tsx` e `content.ts`.

- [ ] **Step 5: Fontes, provider, vitrine e chrome compartilhados**

Create `src/lib/fonts.ts`:

```ts
import {
  Bricolage_Grotesque,
  Figtree,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Space_Grotesk,
} from 'next/font/google';

// Studio identity: the same family as the @mxstudioweb posts and the diagnosis form.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// The demos play other brands and keep their own type.
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument-sans', display: 'swap' });

export const fontVariables = [bricolage, figtree, jetbrains, spaceGrotesk, instrumentSerif, instrumentSans]
  .map((font) => font.variable)
  .join(' ');
```

Replace `src/i18n/provider.tsx` inteiro:

```tsx
'use client';

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { defaultCurrency, localeInfo, type Currency, type Locale } from './config';
import { readSavedCurrency, saveCurrency, subscribeCurrency } from './currency-store';
import { formatMoney, type MoneyOptions, type Rates } from './format';

type I18nValue = {
  locale: Locale;
  currency: Currency;
  /** BCP 47 tag for Intl / toLocaleDateString. */
  intl: string;
  money: (brl: number, opts?: MoneyOptions) => string;
  setCurrency: (currency: Currency) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

/** The language comes from the route; the currency is the visitor's choice, kept in the browser. */
export function I18nProvider({ locale, rates, children }: { locale: Locale; rates: Rates; children: ReactNode }) {
  // Server and first client render use the language default, so hydration always matches.
  const saved = useSyncExternalStore(subscribeCurrency, readSavedCurrency, () => null);
  const currency = saved ?? defaultCurrency[locale];

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      currency,
      intl: localeInfo[locale].intl,
      money: (brl, opts) => formatMoney(brl, locale, currency, rates, opts),
      setCurrency: saveCurrency,
    }),
    [locale, currency, rates],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
```

Run: `git grep -n -E "setLocale|pending|BTC" -- src/demos src/components`
Expected: nenhum resultado (as demos só usam `locale`, `money` e `intl`).

Em `src/lib/estudio.ts`, logo depois de `export const demoBySlug = ...;`, acrescentar:

```ts
/** The six demos with real photography, in display order. The other four stay off the showcase until they get photos. */
export const showcase = [
  'clinica-sereno',
  'motta-advogados',
  'moda-arte',
  'restaurante-terra',
  'costa-imoveis',
  'rota-clara',
] as const satisfies readonly DemoSlug[];
export type ShowcaseSlug = (typeof showcase)[number];
export const isShowcased = (slug: string): slug is ShowcaseSlug => (showcase as readonly string[]).includes(slug);
```

Create `src/components/site/site-chrome.tsx` (a Tarefa 4 acrescenta cabeçalho e rodapé):

```tsx
import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import { I18nProvider } from '@/i18n/provider';
import { getRates } from '@/i18n/rates';

/** Everything inside <body> that the Portuguese and the /en, /es root layouts share. */
export async function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const rates = await getRates();
  return (
    <I18nProvider locale={locale} rates={rates}>
      {children}
    </I18nProvider>
  );
}
```

- [ ] **Step 6: Layouts raiz, páginas provisórias e 404**

Create `src/app/(pt)/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { localeInfo } from '@/i18n/config';
import { SITE_URL } from '@/lib/estudio';
import { fontVariables } from '@/lib/fonts';
import { SiteChrome } from '@/components/site/site-chrome';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={localeInfo.pt.htmlLang} className={fontVariables}>
      <body>
        <SiteChrome locale="pt">{children}</SiteChrome>
      </body>
    </html>
  );
}
```

Create `src/app/(intl)/[locale]/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../../globals.css';
import { defaultLocale, isLocale, localeInfo, prefixedLocales } from '@/i18n/config';
import { SITE_URL } from '@/lib/estudio';
import { fontVariables } from '@/lib/fonts';
import { SiteChrome } from '@/components/site/site-chrome';

export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  return (
    <html lang={localeInfo[locale].htmlLang} className={fontVariables}>
      <body>
        <SiteChrome locale={locale}>{children}</SiteChrome>
      </body>
    </html>
  );
}
```

Create `src/app/(tools)/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { fontVariables } from '@/lib/fonts';

// Internal tools for making Instagram posts: never indexed, no site header or footer.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
```

Create `src/app/(pt)/page.tsx` (provisória; a Tarefa 6 substitui):

```tsx
export default function Home() {
  return <main className="p-10">MX Studio Web</main>;
}
```

Create `src/app/(intl)/[locale]/page.tsx` (provisória; a Tarefa 6 substitui):

```tsx
export default function LocaleHome() {
  return <main className="p-10">MX Studio Web</main>;
}
```

Create `src/app/global-not-found.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { MaxMonogram } from '@/components/max-monogram';
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Página não encontrada · MX Studio Web',
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>
        <main className="grid min-h-dvh place-items-center px-5 font-body">
          <div className="max-w-md text-center">
            <MaxMonogram className="mx-auto h-14 w-14" rounded={14} />
            <p className="mt-8 font-label text-xs uppercase tracking-[0.16em] text-white/50">Erro 404</p>
            <h1 className="mt-3 font-brand text-4xl font-bold tracking-tight">Página não encontrada</h1>
            <p className="mt-4 text-white/65">
              O endereço pode ter mudado. <span lang="en">Page not found.</span>{' '}
              <span lang="es">Página no encontrada.</span>
            </p>
            <nav className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              <Link className="rounded-full bg-lime px-5 py-2.5 font-semibold text-ink" href="/">
                Ir para o início
              </Link>
              <Link className="rounded-full border border-white/20 px-5 py-2.5" href="/en" hrefLang="en">
                English
              </Link>
              <Link className="rounded-full border border-white/20 px-5 py-2.5" href="/es" hrefLang="es">
                Español
              </Link>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Rotas das demos**

Create `src/demos/registry.tsx`:

```tsx
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { DemoSlug } from '@/lib/estudio';

/** One lazily loaded chunk per demo, so each page ships only the demo it shows. */
export const demoComponents: Record<DemoSlug, ComponentType> = {
  'moda-arte': dynamic(() => import('./moda-arte/demo')),
  'restaurante-terra': dynamic(() => import('./restaurante-terra/demo')),
  'clinica-sereno': dynamic(() => import('./clinica-sereno/demo')),
  'motta-advogados': dynamic(() => import('./motta-advogados/demo')),
  'costa-imoveis': dynamic(() => import('./costa-imoveis/demo')),
  'rota-clara': dynamic(() => import('./rota-clara/demo')),
  'lumi-odonto': dynamic(() => import('./lumi-odonto/demo')),
  'iris-estetica': dynamic(() => import('./iris-estetica/demo')),
  'alicerce-construtora': dynamic(() => import('./alicerce-construtora/demo')),
  'mare-salao': dynamic(() => import('./mare-salao/demo')),
};
```

Create `src/demos/route.tsx` (a Tarefa 9 troca `demoMetadata` pela versão completa de SEO):

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { demoBySlug, demos, isShowcased, type DemoSlug } from '@/lib/estudio';
import { demoComponents } from './registry';

export const demoParams = () => demos.map(({ slug }) => ({ slug }));

const isDemoSlug = (slug: string): slug is DemoSlug => slug in demoBySlug;

export function demoMetadata(_locale: Locale, slug: string): Metadata {
  if (!isDemoSlug(slug)) return {};
  return {
    title: `${demoBySlug[slug].clientName} · MX Studio Web`,
    robots: isShowcased(slug) ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export function DemoPage({ slug }: { slug: string }) {
  if (!isDemoSlug(slug)) notFound();
  const Demo = demoComponents[slug];
  return <Demo />;
}
```

Create `src/app/(pt)/demo/[slug]/page.tsx`:

```tsx
import { DemoPage, demoMetadata, demoParams } from '@/demos/route';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = demoParams;

export async function generateMetadata({ params }: Props) {
  return demoMetadata('pt', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <DemoPage slug={(await params).slug} />;
}
```

Create `src/app/(intl)/[locale]/demo/[slug]/page.tsx`:

```tsx
import { isLocale } from '@/i18n/config';
import { DemoPage, demoMetadata, demoParams } from '@/demos/route';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = demoParams;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  return isLocale(locale) ? demoMetadata(locale, slug) : {};
}

export default async function Page({ params }: Props) {
  return <DemoPage slug={(await params).slug} />;
}
```

- [ ] **Step 8: Build e teste do HTML**

Run: `npm run build`
Expected: build concluído e pasta `out/` com `index.html`, `en.html`, `es.html`, `404.html`, `demo/*.html`, `en/demo/*.html`, `es/demo/*.html`, `carrossel.html`, `brand-kit.html`.

**Se o build falhar por causa do `global-not-found`** (recurso experimental): apagar `src/app/global-not-found.tsx`, tirar `experimental` do `next.config.js`, mover o conteúdo do `<main>` para `src/app/(pt)/not-found.tsx` (sem `<html>`/`<body>`) e rodar de novo; conferir que `out/404.html` existe.

Run: `npx vitest run tests/out && npm test && npm run lint`
Expected: tudo PASS; lint sem erros (avisos tolerados).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Site estático com grupos de rota por idioma; demos em src/demos; remove código morto"
```

---

### Task 3: Conteúdo — dados do estúdio e textos PT/EN/ES

**Files:**
- Modify: `src/lib/estudio.ts`
- Replace: `src/i18n/messages/pt.ts`, `src/i18n/messages/en.ts`, `src/i18n/messages/es.ts`
- Create: `tests/unit/messages.test.ts`, `tests/unit/estudio.test.ts`

**Interfaces:**
- Consumes: `showcase`, `ShowcaseSlug`, `DemoNiche` (estudio, Tarefa 2).
- Produces: `estudio` (com `email`, `owner`, `instagramHandle`, `phoneE164`, `diagnostico`), `SITE_URL`, `services` (`readonly { key: ServiceKey; price: number }[]`), `ServiceKey`, `lcpSeconds: Record<ShowcaseSlug, number>`, `whatsappUrl(msg?)`; `Messages` com as chaves `meta, nav, whatsappMsg, hero, case, work, process, pricing, about, faq, contact, footer, demo`.

- [ ] **Step 1: Testes que falham**

Create `tests/unit/estudio.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { clientCases, demos, estudio, lcpSeconds, services, showcase, SITE_URL } from '@/lib/estudio';

describe('studio data', () => {
  it('uses the new domain and e-mail', () => {
    expect(SITE_URL).toBe('https://mxstudioweb.com.br');
    expect(estudio.email).toBe('contato@mxstudioweb.com.br');
  });

  it('shows Sulamita as the only real client', () => {
    expect(clientCases.map((c) => c.clientName)).toEqual(['Sulamita Nascimento']);
  });

  it('keeps the agreed starting prices', () => {
    expect(services).toEqual([
      { key: 'landing', price: 3500 },
      { key: 'institucional', price: 4900 },
      { key: 'ecommerce', price: 9900 },
      { key: 'sistema', price: 16000 },
    ]);
  });

  it('showcases only the six demos with real photography', () => {
    expect([...showcase].sort()).toEqual(
      ['clinica-sereno', 'costa-imoveis', 'moda-arte', 'motta-advogados', 'restaurante-terra', 'rota-clara'].sort(),
    );
    for (const slug of showcase) {
      expect(demos.some((d) => d.slug === slug)).toBe(true);
      expect(lcpSeconds[slug]).toBeGreaterThan(0);
    }
  });
});
```

Create `tests/unit/messages.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { messages } from '@/i18n/messages';

/** Same keys and same array lengths, so no language silently misses a line. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]).sort());
  }
  return typeof value;
}

describe('messages', () => {
  it('have the same structure in the three languages', () => {
    expect(shape(messages.en)).toEqual(shape(messages.pt));
    expect(shape(messages.es)).toEqual(shape(messages.pt));
  });

  it.each(['pt', 'en', 'es'] as const)('%s lists PIX, card and Wise and never Bitcoin', (locale) => {
    const all = JSON.stringify(messages[locale]);
    expect(all).not.toMatch(/bitcoin|btc/i);
    const methods = messages[locale].pricing.payments.methods.join(' ');
    expect(methods).toMatch(/PIX/);
    expect(methods).toMatch(/Wise/);
    expect(methods).toMatch(/cart|card|tarjeta/i);
  });

  it.each(['pt', 'en', 'es'] as const)('%s makes no claim about agencies or years of experience', (locale) => {
    const all = JSON.stringify(messages[locale]);
    expect(all).not.toMatch(/ag[eê]ncia|agency|anos de experi|years of experience|años de experiencia/i);
  });
});
```

Run: `npx vitest run tests/unit`
Expected: FAIL (SITE_URL antigo, e-mail Gmail, sem `services`/`lcpSeconds`, mensagens com estrutura antiga e "Bitcoin").

- [ ] **Step 2: Dados do estúdio**

Em `src/lib/estudio.ts`:

Trocar as duas primeiras linhas (comentário + `SITE_URL`) por:

```ts
/** Public address of this site; override per deploy with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mxstudioweb.com.br';
```

Trocar o objeto `estudio` inteiro por:

```ts
export const estudio = {
  name: 'MX Studio Web',
  owner: 'Max Costa',
  role: 'Estúdio digital freelance',
  tagline: 'Sites que trazem clientes para o seu negócio.',
  location: 'Rio de Janeiro · Brasil e exterior',
  whatsapp: '5521993196171',
  whatsappDisplay: '(21) 99319-6171',
  phoneE164: '+5521993196171',
  email: 'contato@mxstudioweb.com.br',
  instagram: 'https://www.instagram.com/mxstudioweb/',
  instagramHandle: '@mxstudioweb',
  linkedin: 'https://www.linkedin.com/company/145009011/',
  /** The free preview questionnaire (separate Vercel project with its own Supabase panel). */
  diagnostico: 'https://mx-studio-web.vercel.app/',
} as const;
```

Trocar `whatsappMsgDefault` por:

```ts
export const whatsappMsgDefault = 'Olá! Vim pelo site da MX Studio Web e quero conversar sobre um site.';
```

Depois do bloco `showcase` (Tarefa 2), acrescentar:

```ts
/** Load time on 4G measured in production, no cache, 4× slower CPU, worst of 3 runs (seconds). */
export const lcpSeconds: Record<ShowcaseSlug, number> = {
  'clinica-sereno': 1.8,
  'motta-advogados': 1.2,
  'moda-arte': 1.8,
  'restaurante-terra': 1.7,
  'costa-imoveis': 1.7,
  'rota-clara': 1.8,
};

/** Starting prices in BRL; other currencies are converted at display time. */
export const services = [
  { key: 'landing', price: 3500 },
  { key: 'institucional', price: 4900 },
  { key: 'ecommerce', price: 9900 },
  { key: 'sistema', price: 16000 },
] as const;
export type ServiceKey = (typeof services)[number]['key'];
```

No `clientCases`, trocar `image: '/clientes/sulamita-estetica.webp',` por `image: '/shots/sulamita-desktop.webp',`.

Run: `git grep -n "yearsExp" -- src`
Expected: nenhum resultado (o campo saiu do `estudio`; se alguma ferramenta interna usar, remover a linha que o usa).

- [ ] **Step 3: Textos em português**

Replace `src/i18n/messages/pt.ts` inteiro:

```ts
import type { DemoNiche, ServiceKey, ShowcaseSlug } from '@/lib/estudio';

type Service = { title: string; text: string; bullets: string[] };

export const pt = {
  meta: {
    title: 'MX Studio Web · Sites que trazem clientes',
    description:
      'Estúdio de sites sob medida no Rio de Janeiro. Sites rápidos para clínicas, escritórios, lojas e negócios locais, feitos para virar conversa no WhatsApp. Atendo Brasil e exterior.',
  },

  nav: {
    work: 'Trabalhos',
    process: 'Processo',
    pricing: 'Preços',
    about: 'Sobre',
    contact: 'Contato',
    cta: 'Pedir prévia grátis',
    home: 'MX Studio Web, página inicial',
    menuLabel: 'Navegação principal',
    menu: 'Abrir menu',
    close: 'Fechar menu',
    language: 'Idioma',
  },

  whatsappMsg: 'Olá! Vim pelo site da MX Studio Web e quero conversar sobre um site.',

  hero: {
    eyebrow: 'Estúdio de sites · Rio de Janeiro',
    titleA: 'Sites que trazem',
    titleAccent: 'clientes',
    titleB: 'para o seu negócio.',
    lead: 'Sites sob medida para clínicas, escritórios, lojas e negócios locais: rápidos no celular e feitos para virar conversa no WhatsApp. Você fala direto com quem desenha e programa.',
    primary: 'Pedir prévia grátis',
    note: 'Diagnóstico de 5 minutos. A prévia chega no seu WhatsApp.',
    secondary: 'Falar no WhatsApp',
    caseLabel: 'Cliente real · sulamitaestetica.pt',
    desktopAlt: 'Página inicial do site da Sulamita Nascimento no computador',
    mobileAlt: 'Site da Sulamita Nascimento no celular',
  },

  case: {
    label: 'Cliente real',
    title: 'Sulamita Nascimento, Estética de Resultados',
    text: 'Site bilíngue para uma especialista em estética em Caldas da Rainha, Portugal. Apresenta os tratamentos, passa confiança e leva a cliente direto para marcar a consulta.',
    facts: [
      { label: 'Domínio', value: 'sulamitaestetica.pt' },
      { label: 'Idiomas', value: 'Português e inglês' },
      { label: 'No ar desde', value: 'Setembro de 2026' },
    ],
    visit: 'Ver o site no ar',
    imageAlt: 'Seção de tratamentos do site da Sulamita Nascimento',
  },

  work: {
    label: 'Modelos',
    title: 'Modelos de site por ramo, funcionando de verdade.',
    lead: 'Cada modelo é um site completo, criado pela MX Studio Web para um negócio fictício. Abra, clique, faça uma reserva ou monte um carrinho: é assim que o seu vai funcionar.',
    badge: 'Modelo de demonstração',
    open: 'Abrir',
    lcp: 'Carrega em {value} no 4G',
    note: 'Tempo de carregamento medido em produção, sem cache, em 4G com processador 4× mais lento: o pior de 3 medições. Confira no PageSpeed Insights do Google.',
    cta: 'Quero um site assim',
    imageAlt: 'Página inicial do modelo {name}',
    niches: {
      saude: 'Saúde',
      beleza: 'Beleza e estética',
      advocacia: 'Advocacia',
      lojas: 'Loja virtual',
      restaurantes: 'Restaurante',
      imobiliarias: 'Imobiliária',
      construcao: 'Construção',
      cursos: 'Curso online',
    } as Record<DemoNiche, string>,
    cards: {
      'clinica-sereno': 'Clínica multiprofissional com agenda online',
      'motta-advogados': 'Escritório de advocacia com triagem de casos',
      'moda-arte': 'Loja de moda com carrinho e checkout',
      'restaurante-terra': 'Restaurante com cardápio e reservas',
      'costa-imoveis': 'Imobiliária com busca de imóveis em tempo real',
      'rota-clara': 'Página de vendas de curso online',
    } as Record<ShowcaseSlug, string>,
  },

  process: {
    label: 'Como funciona',
    title: 'Do primeiro contato ao site no ar, sem surpresa.',
    steps: [
      {
        title: 'Descoberta',
        duration: '3 a 5 dias',
        text: 'Uma conversa para entender o negócio, o público e o que já funciona. Saio dela com o briefing e a estrutura do site.',
      },
      {
        title: 'Design',
        duration: '1 a 2 semanas',
        text: 'Direção visual e telas do site. Você aprova tudo antes de qualquer linha de código.',
      },
      {
        title: 'Desenvolvimento',
        duration: '2 a 4 semanas',
        text: 'Programação do site, com um link de prévia para você acompanhar desde o primeiro dia.',
      },
      {
        title: 'Lançamento',
        duration: '2 a 3 dias',
        text: 'Site no ar no seu domínio, com SEO técnico, medição de visitas e um guia de uso.',
      },
    ],
  },

  pricing: {
    label: 'Serviços e preços',
    title: 'Preço claro desde a primeira conversa.',
    lead: 'Valores de partida. O orçamento final vem por escrito, com escopo e prazo, depois de entender o seu projeto.',
    from: 'a partir de',
    currency: 'Moeda',
    approx: 'Valores em outras moedas são aproximados, convertidos do real pela cotação do dia em que o site foi publicado.',
    items: {
      landing: {
        title: 'Landing page',
        text: 'Uma página focada em uma oferta ou serviço.',
        bullets: ['Texto pensado para vender', 'WhatsApp e formulário', 'Medição de visitas e anúncios', 'No ar em até 10 dias'],
      },
      institucional: {
        title: 'Site institucional',
        text: 'O site completo da sua empresa.',
        bullets: ['De 4 a 8 páginas', 'Design exclusivo', 'SEO técnico', 'Edição de textos (opcional)'],
      },
      ecommerce: {
        title: 'Loja virtual',
        text: 'Para vender pela internet.',
        bullets: ['Catálogo e carrinho', 'Pagamento por PIX e cartão', 'Área do cliente', 'Painel do lojista'],
      },
      sistema: {
        title: 'Sistema sob medida',
        text: 'Quando o site precisa fazer mais.',
        bullets: ['Login e níveis de acesso', 'Painel administrativo', 'Integrações', 'Escopo sob medida'],
      },
    } as Record<ServiceKey, Service>,
    ask: 'Pedir orçamento',
    askMsg: 'Olá! Vim pelo site da MX Studio Web e quero um orçamento de: {service}.',
    payments: {
      title: 'Formas de pagamento',
      methods: ['PIX', 'Cartão de crédito, parcelado', 'Wise, para clientes de outros países'],
      terms:
        'Contrato com escopo e prazo. Pagamento em 3 etapas: 40% no início, 30% na aprovação do design e 30% na entrega.',
      abroad: 'Está fora do Brasil? Envio o orçamento na sua moeda e você paga pela Wise.',
    },
  },

  about: {
    label: 'Sobre',
    title: 'Quem faz o seu site.',
    p1: 'Sou Max Costa, fundador da MX Studio Web. Cuido pessoalmente de cada projeto, da primeira conversa ao site no ar: você fala direto com quem desenha e programa.',
    p2: 'Também tenho uma consultoria de dados e BI. Por isso trato o site como ferramenta de negócio: ele existe para trazer contatos, e isso dá para medir.',
    points: [
      'Atendimento direto, sem intermediário',
      'Contrato com escopo e prazo',
      'Domínio e código no seu nome',
      'Rio de Janeiro, atendendo Brasil e exterior',
    ],
    photoAlt: 'Max Costa, fundador da MX Studio Web',
    role: 'Fundador da MX Studio Web',
  },

  faq: {
    label: 'Perguntas frequentes',
    title: 'O que costumam perguntar.',
    items: [
      {
        q: 'Como funciona a prévia grátis?',
        a: 'Você responde um diagnóstico de 5 minutos e envia sua logo e algumas fotos. Eu monto uma prévia do site para o seu negócio e mando pelo WhatsApp. Sem compromisso.',
      },
      {
        q: 'Em quanto tempo o site fica pronto?',
        a: 'De 3 a 7 semanas, conforme o tamanho do projeto. O cronograma vem na proposta, com as datas de cada etapa.',
      },
      {
        q: 'Como é o pagamento?',
        a: 'Com contrato, em 3 etapas: 40% no início, 30% na aprovação do design e 30% na entrega. Aceito PIX, cartão de crédito parcelado e Wise para clientes de fora do Brasil.',
      },
      {
        q: 'Você usa modelo pronto?',
        a: 'Não. Cada site é desenhado e programado para o seu negócio. No fim, o domínio e o código ficam no seu nome, sem fidelidade.',
      },
      {
        q: 'E depois que o site estiver no ar?',
        a: 'Você recebe um guia de uso e 30 dias de garantia para correções. Se quiser, contrata um plano mensal para eu cuidar das alterações.',
      },
      {
        q: 'Atende fora do Rio de Janeiro?',
        a: 'Sim. Atendo todo o Brasil, Portugal e outros países, por videochamada e WhatsApp. Clientes de fora do Brasil pagam pela Wise, na própria moeda.',
      },
    ],
  },

  contact: {
    label: 'Contato',
    title: 'Vamos conversar sobre o seu site?',
    lead: 'Conte rapidamente sobre o seu negócio. Respondo em até 24 horas em dias úteis.',
    channels: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      instagram: 'Instagram',
      preview: 'Prévia grátis',
      previewText: 'Diagnóstico de 5 minutos',
    },
    form: {
      name: 'Nome',
      namePlaceholder: 'Como prefere ser chamado?',
      email: 'E-mail',
      emailPlaceholder: 'voce@empresa.com',
      project: 'Tipo de projeto',
      projects: ['Site institucional', 'Loja virtual', 'Landing page', 'Sistema sob medida', 'Ainda não sei'],
      budget: 'Faixa de investimento',
      budgetUpTo: 'Até {amount}',
      budgetAbove: 'Acima de {amount}',
      message: 'Sobre o projeto',
      messagePlaceholder: 'O que a empresa faz, o que precisa e para quando.',
      footnote: 'Ao enviar, o WhatsApp abre com a sua mensagem pronta.',
      send: 'Enviar pelo WhatsApp',
      waIntro: 'Olá! Vim pelo site da MX Studio Web.',
      waProject: 'Projeto',
      waBudget: 'Investimento',
      errorName: 'Escreva seu nome.',
      errorEmail: 'Confira o e-mail.',
      errorMessage: 'Conte um pouco mais sobre o projeto.',
      sentTitle: 'Quase lá',
      sentText: 'Abri o WhatsApp com a sua mensagem, {name}. É só tocar em enviar por lá.',
      sentRetry: 'O WhatsApp não abriu? Toque aqui.',
    },
  },

  footer: {
    blurb: 'Sites sob medida que trazem clientes. Rio de Janeiro, atendendo Brasil e exterior.',
    navTitle: 'Navegação',
    contactTitle: 'Contato',
    languagesTitle: 'Idiomas',
    rights: 'Todos os direitos reservados.',
    location: 'Rio de Janeiro, Brasil',
  },

  demo: {
    badge: 'Modelo de demonstração',
    description:
      '{name} é um modelo de site criado pela MX Studio Web para um negócio fictício. Abra e teste: tudo funciona.',
  },
};

export type Messages = typeof pt;
```

- [ ] **Step 4: Textos em inglês**

Replace `src/i18n/messages/en.ts` inteiro:

```ts
import type { Messages } from './pt';

export const en: Messages = {
  meta: {
    title: 'MX Studio Web · Websites that bring customers',
    description:
      'Custom website studio in Rio de Janeiro, Brazil. Fast websites for clinics, law firms, shops and local businesses, built to turn visits into conversations. Serving clients worldwide.',
  },

  nav: {
    work: 'Work',
    process: 'Process',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    cta: 'Get a free preview',
    home: 'MX Studio Web, home page',
    menuLabel: 'Main navigation',
    menu: 'Open menu',
    close: 'Close menu',
    language: 'Language',
  },

  whatsappMsg: 'Hi! I found MX Studio Web through your website and would like to talk about a website.',

  hero: {
    eyebrow: 'Website studio · Rio de Janeiro, Brazil',
    titleA: 'Websites that bring',
    titleAccent: 'customers',
    titleB: 'to your business.',
    lead: 'Custom websites for clinics, law firms, shops and local businesses: fast on mobile and built to turn visits into conversations. You talk directly to the person who designs and builds it.',
    primary: 'Get a free preview',
    note: 'A 5-minute questionnaire. The preview arrives on your WhatsApp.',
    secondary: 'Message on WhatsApp',
    caseLabel: 'Real client · sulamitaestetica.pt',
    desktopAlt: "Home page of Sulamita Nascimento's website on a computer",
    mobileAlt: "Sulamita Nascimento's website on a phone",
  },

  case: {
    label: 'Real client',
    title: 'Sulamita Nascimento, Estética de Resultados',
    text: 'Bilingual website for an aesthetics specialist in Caldas da Rainha, Portugal. It presents the treatments, builds trust and takes clients straight to booking a consultation.',
    facts: [
      { label: 'Domain', value: 'sulamitaestetica.pt' },
      { label: 'Languages', value: 'Portuguese and English' },
      { label: 'Live since', value: 'September 2026' },
    ],
    visit: 'See the live website',
    imageAlt: "Treatments section of Sulamita Nascimento's website",
  },

  work: {
    label: 'Models',
    title: 'Website models by industry, fully working.',
    lead: 'Each model is a complete website built by MX Studio Web for a fictional business. Open it, click around, book a table or fill a cart: that is how yours will work.',
    badge: 'Demo website',
    open: 'Open',
    lcp: 'Loads in {value} on 4G',
    note: 'Load time measured in production, without cache, on 4G with a 4× slower CPU: the worst of 3 runs. Check it yourself on Google PageSpeed Insights.',
    cta: 'I want a website like this',
    imageAlt: 'Home page of the {name} model',
    niches: {
      saude: 'Healthcare',
      beleza: 'Beauty and aesthetics',
      advocacia: 'Law firm',
      lojas: 'Online store',
      restaurantes: 'Restaurant',
      imobiliarias: 'Real estate',
      construcao: 'Construction',
      cursos: 'Online course',
    },
    cards: {
      'clinica-sereno': 'Multidisciplinary clinic with online booking',
      'motta-advogados': 'Law firm with case intake',
      'moda-arte': 'Fashion store with cart and checkout',
      'restaurante-terra': 'Restaurant with menu and reservations',
      'costa-imoveis': 'Real estate agency with live property search',
      'rota-clara': 'Sales page for an online course',
    },
  },

  process: {
    label: 'How it works',
    title: 'From first contact to launch, with no surprises.',
    steps: [
      {
        title: 'Discovery',
        duration: '3 to 5 days',
        text: 'A conversation to understand the business, the audience and what already works. I come out of it with the brief and the site structure.',
      },
      {
        title: 'Design',
        duration: '1 to 2 weeks',
        text: 'Visual direction and page designs. You approve everything before a single line of code.',
      },
      {
        title: 'Development',
        duration: '2 to 4 weeks',
        text: 'The site is built, with a preview link so you can follow along from day one.',
      },
      {
        title: 'Launch',
        duration: '2 to 3 days',
        text: 'The site goes live on your domain, with technical SEO, visit tracking and a user guide.',
      },
    ],
  },

  pricing: {
    label: 'Services and pricing',
    title: 'Clear pricing from the first conversation.',
    lead: 'Starting prices. The final quote comes in writing, with scope and timeline, once I understand your project.',
    from: 'from',
    currency: 'Currency',
    approx: 'Prices in other currencies are approximate, converted from Brazilian reais at the exchange rate on the day the site was published.',
    items: {
      landing: {
        title: 'Landing page',
        text: 'One page focused on one offer or service.',
        bullets: ['Copy written to sell', 'WhatsApp and contact form', 'Visit and ad tracking', 'Live within 10 days'],
      },
      institucional: {
        title: 'Business website',
        text: 'The complete website for your company.',
        bullets: ['4 to 8 pages', 'Custom design', 'Technical SEO', 'Text editing (optional)'],
      },
      ecommerce: {
        title: 'Online store',
        text: 'To sell online.',
        bullets: ['Catalogue and cart', 'Card and PIX payments', 'Customer area', 'Store dashboard'],
      },
      sistema: {
        title: 'Custom system',
        text: 'When the website needs to do more.',
        bullets: ['Login and access levels', 'Admin dashboard', 'Integrations', 'Tailored scope'],
      },
    },
    ask: 'Request a quote',
    askMsg: 'Hi! I found MX Studio Web through your website and would like a quote for: {service}.',
    payments: {
      title: 'Payment methods',
      methods: ['PIX (Brazil)', 'Credit card, in instalments', 'Wise, for clients outside Brazil'],
      terms: 'Contract with scope and timeline. Payment in 3 stages: 40% upfront, 30% on design approval and 30% on delivery.',
      abroad: 'Outside Brazil? I send the quote in your currency and you pay through Wise.',
    },
  },

  about: {
    label: 'About',
    title: 'Who builds your website.',
    p1: "I'm Max Costa, founder of MX Studio Web. I personally handle every project, from the first conversation to launch: you talk directly to the person who designs and builds it.",
    p2: 'I also run a data and BI consultancy. That is why I treat a website as a business tool: it exists to bring in leads, and that can be measured.',
    points: [
      'Direct contact, no middlemen',
      'Contract with scope and timeline',
      'Domain and code in your name',
      'Based in Rio de Janeiro, serving clients worldwide',
    ],
    photoAlt: 'Max Costa, founder of MX Studio Web',
    role: 'Founder of MX Studio Web',
  },

  faq: {
    label: 'FAQ',
    title: 'What people usually ask.',
    items: [
      {
        q: 'How does the free preview work?',
        a: 'You answer a 5-minute questionnaire and send your logo and a few photos. I put together a preview of a website for your business and send it on WhatsApp. No commitment.',
      },
      {
        q: 'How long does it take?',
        a: 'From 3 to 7 weeks, depending on the size of the project. The schedule comes in the proposal, with dates for each stage.',
      },
      {
        q: 'How does payment work?',
        a: 'With a contract, in 3 stages: 40% upfront, 30% on design approval and 30% on delivery. I accept PIX, credit card in instalments and Wise for clients outside Brazil.',
      },
      {
        q: 'Do you use templates?',
        a: 'No. Every website is designed and built for your business. At the end, the domain and the code are in your name, with no lock-in.',
      },
      {
        q: 'What happens after launch?',
        a: 'You get a user guide and a 30-day warranty for fixes. If you like, you can hire a monthly plan and I take care of the changes.',
      },
      {
        q: 'Do you work with clients outside Brazil?',
        a: 'Yes. I work with clients across Brazil, Portugal and other countries, over video calls and WhatsApp. Clients outside Brazil pay through Wise, in their own currency.',
      },
    ],
  },

  contact: {
    label: 'Contact',
    title: 'Shall we talk about your website?',
    lead: 'Tell me briefly about your business. I reply within 24 hours on business days.',
    channels: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      instagram: 'Instagram',
      preview: 'Free preview',
      previewText: '5-minute questionnaire',
    },
    form: {
      name: 'Name',
      namePlaceholder: 'What should I call you?',
      email: 'E-mail',
      emailPlaceholder: 'you@company.com',
      project: 'Project type',
      projects: ['Business website', 'Online store', 'Landing page', 'Custom system', 'Not sure yet'],
      budget: 'Budget',
      budgetUpTo: 'Up to {amount}',
      budgetAbove: 'Over {amount}',
      message: 'About the project',
      messagePlaceholder: 'What the company does, what it needs and by when.',
      footnote: 'Sending opens WhatsApp with your message ready.',
      send: 'Send via WhatsApp',
      waIntro: 'Hi! I found MX Studio Web through your website.',
      waProject: 'Project',
      waBudget: 'Budget',
      errorName: 'Please enter your name.',
      errorEmail: 'Please check the e-mail.',
      errorMessage: 'Tell me a bit more about the project.',
      sentTitle: 'Almost there',
      sentText: 'I opened WhatsApp with your message, {name}. Just tap send there.',
      sentRetry: "WhatsApp didn't open? Tap here.",
    },
  },

  footer: {
    blurb: 'Custom websites that bring customers. Rio de Janeiro, serving clients worldwide.',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    languagesTitle: 'Languages',
    rights: 'All rights reserved.',
    location: 'Rio de Janeiro, Brazil',
  },

  demo: {
    badge: 'Demo website',
    description: '{name} is a website model built by MX Studio Web for a fictional business. Open it and try it: everything works.',
  },
};
```

- [ ] **Step 5: Textos em espanhol**

Replace `src/i18n/messages/es.ts` inteiro:

```ts
import type { Messages } from './pt';

export const es: Messages = {
  meta: {
    title: 'MX Studio Web · Sitios web que traen clientes',
    description:
      'Estudio de sitios web a medida en Río de Janeiro, Brasil. Sitios rápidos para clínicas, despachos, tiendas y negocios locales, hechos para convertir visitas en conversaciones. Atiendo clientes de todo el mundo.',
  },

  nav: {
    work: 'Trabajos',
    process: 'Proceso',
    pricing: 'Precios',
    about: 'Sobre mí',
    contact: 'Contacto',
    cta: 'Pedir vista previa gratis',
    home: 'MX Studio Web, página de inicio',
    menuLabel: 'Navegación principal',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Idioma',
  },

  whatsappMsg: '¡Hola! Llegué por el sitio de MX Studio Web y quiero hablar sobre un sitio web.',

  hero: {
    eyebrow: 'Estudio de sitios web · Río de Janeiro, Brasil',
    titleA: 'Sitios web que traen',
    titleAccent: 'clientes',
    titleB: 'a tu negocio.',
    lead: 'Sitios a medida para clínicas, despachos, tiendas y negocios locales: rápidos en el móvil y hechos para convertir visitas en conversaciones. Hablas directamente con quien diseña y programa.',
    primary: 'Pedir vista previa gratis',
    note: 'Un cuestionario de 5 minutos. La vista previa llega a tu WhatsApp.',
    secondary: 'Escribir por WhatsApp',
    caseLabel: 'Cliente real · sulamitaestetica.pt',
    desktopAlt: 'Página de inicio del sitio de Sulamita Nascimento en un ordenador',
    mobileAlt: 'Sitio de Sulamita Nascimento en el móvil',
  },

  case: {
    label: 'Cliente real',
    title: 'Sulamita Nascimento, Estética de Resultados',
    text: 'Sitio bilingüe para una especialista en estética en Caldas da Rainha, Portugal. Presenta los tratamientos, transmite confianza y lleva a la clienta directamente a reservar la consulta.',
    facts: [
      { label: 'Dominio', value: 'sulamitaestetica.pt' },
      { label: 'Idiomas', value: 'Portugués e inglés' },
      { label: 'En línea desde', value: 'Septiembre de 2026' },
    ],
    visit: 'Ver el sitio en línea',
    imageAlt: 'Sección de tratamientos del sitio de Sulamita Nascimento',
  },

  work: {
    label: 'Modelos',
    title: 'Modelos de sitio por sector, funcionando de verdad.',
    lead: 'Cada modelo es un sitio completo creado por MX Studio Web para un negocio ficticio. Ábrelo, haz clic, reserva una mesa o llena un carrito: así funcionará el tuyo.',
    badge: 'Modelo de demostración',
    open: 'Abrir',
    lcp: 'Carga en {value} en 4G',
    note: 'Tiempo de carga medido en producción, sin caché, en 4G con un procesador 4× más lento: el peor de 3 mediciones. Compruébalo en PageSpeed Insights de Google.',
    cta: 'Quiero un sitio así',
    imageAlt: 'Página de inicio del modelo {name}',
    niches: {
      saude: 'Salud',
      beleza: 'Belleza y estética',
      advocacia: 'Despacho de abogados',
      lojas: 'Tienda online',
      restaurantes: 'Restaurante',
      imobiliarias: 'Inmobiliaria',
      construcao: 'Construcción',
      cursos: 'Curso online',
    },
    cards: {
      'clinica-sereno': 'Clínica multidisciplinar con agenda online',
      'motta-advogados': 'Despacho de abogados con evaluación de casos',
      'moda-arte': 'Tienda de moda con carrito y pago',
      'restaurante-terra': 'Restaurante con carta y reservas',
      'costa-imoveis': 'Inmobiliaria con búsqueda de inmuebles en tiempo real',
      'rota-clara': 'Página de ventas de un curso online',
    },
  },

  process: {
    label: 'Cómo funciona',
    title: 'Del primer contacto al sitio en línea, sin sorpresas.',
    steps: [
      {
        title: 'Descubrimiento',
        duration: '3 a 5 días',
        text: 'Una conversación para entender el negocio, el público y lo que ya funciona. Salgo de ella con el brief y la estructura del sitio.',
      },
      {
        title: 'Diseño',
        duration: '1 a 2 semanas',
        text: 'Dirección visual y pantallas del sitio. Apruebas todo antes de cualquier línea de código.',
      },
      {
        title: 'Desarrollo',
        duration: '2 a 4 semanas',
        text: 'Programación del sitio, con un enlace de vista previa para que lo sigas desde el primer día.',
      },
      {
        title: 'Lanzamiento',
        duration: '2 a 3 días',
        text: 'El sitio en línea en tu dominio, con SEO técnico, medición de visitas y una guía de uso.',
      },
    ],
  },

  pricing: {
    label: 'Servicios y precios',
    title: 'Precios claros desde la primera conversación.',
    lead: 'Precios de partida. El presupuesto final llega por escrito, con alcance y plazo, después de entender tu proyecto.',
    from: 'desde',
    currency: 'Moneda',
    approx: 'Los precios en otras monedas son aproximados, convertidos desde el real brasileño al tipo de cambio del día en que se publicó el sitio.',
    items: {
      landing: {
        title: 'Landing page',
        text: 'Una página centrada en una oferta o servicio.',
        bullets: ['Textos pensados para vender', 'WhatsApp y formulario', 'Medición de visitas y anuncios', 'En línea en 10 días'],
      },
      institucional: {
        title: 'Sitio corporativo',
        text: 'El sitio completo de tu empresa.',
        bullets: ['De 4 a 8 páginas', 'Diseño exclusivo', 'SEO técnico', 'Edición de textos (opcional)'],
      },
      ecommerce: {
        title: 'Tienda online',
        text: 'Para vender por internet.',
        bullets: ['Catálogo y carrito', 'Pago con tarjeta y PIX', 'Área del cliente', 'Panel de la tienda'],
      },
      sistema: {
        title: 'Sistema a medida',
        text: 'Cuando el sitio necesita hacer más.',
        bullets: ['Login y niveles de acceso', 'Panel de administración', 'Integraciones', 'Alcance a medida'],
      },
    },
    ask: 'Pedir presupuesto',
    askMsg: '¡Hola! Llegué por el sitio de MX Studio Web y quiero un presupuesto de: {service}.',
    payments: {
      title: 'Formas de pago',
      methods: ['PIX (Brasil)', 'Tarjeta de crédito, en cuotas', 'Wise, para clientes de otros países'],
      terms: 'Contrato con alcance y plazo. Pago en 3 etapas: 40% al inicio, 30% al aprobar el diseño y 30% en la entrega.',
      abroad: '¿Estás fuera de Brasil? Te envío el presupuesto en tu moneda y pagas por Wise.',
    },
  },

  about: {
    label: 'Sobre mí',
    title: 'Quién hace tu sitio.',
    p1: 'Soy Max Costa, fundador de MX Studio Web. Me ocupo personalmente de cada proyecto, de la primera conversación al sitio en línea: hablas directamente con quien diseña y programa.',
    p2: 'También tengo una consultora de datos y BI. Por eso trato el sitio como una herramienta de negocio: existe para traer contactos, y eso se puede medir.',
    points: [
      'Trato directo, sin intermediarios',
      'Contrato con alcance y plazo',
      'Dominio y código a tu nombre',
      'Río de Janeiro, atendiendo clientes de todo el mundo',
    ],
    photoAlt: 'Max Costa, fundador de MX Studio Web',
    role: 'Fundador de MX Studio Web',
  },

  faq: {
    label: 'Preguntas frecuentes',
    title: 'Lo que suelen preguntar.',
    items: [
      {
        q: '¿Cómo funciona la vista previa gratis?',
        a: 'Respondes un cuestionario de 5 minutos y envías tu logo y algunas fotos. Preparo una vista previa del sitio para tu negocio y te la mando por WhatsApp. Sin compromiso.',
      },
      {
        q: '¿Cuánto tarda el sitio?',
        a: 'De 3 a 7 semanas, según el tamaño del proyecto. El calendario va en la propuesta, con las fechas de cada etapa.',
      },
      {
        q: '¿Cómo es el pago?',
        a: 'Con contrato, en 3 etapas: 40% al inicio, 30% al aprobar el diseño y 30% en la entrega. Acepto PIX, tarjeta de crédito en cuotas y Wise para clientes fuera de Brasil.',
      },
      {
        q: '¿Usas plantillas?',
        a: 'No. Cada sitio se diseña y programa para tu negocio. Al final, el dominio y el código quedan a tu nombre, sin permanencia.',
      },
      {
        q: '¿Y después del lanzamiento?',
        a: 'Recibes una guía de uso y 30 días de garantía para correcciones. Si quieres, contratas un plan mensual y yo me ocupo de los cambios.',
      },
      {
        q: '¿Trabajas con clientes fuera de Brasil?',
        a: 'Sí. Atiendo todo Brasil, Portugal y otros países, por videollamada y WhatsApp. Los clientes fuera de Brasil pagan por Wise, en su propia moneda.',
      },
    ],
  },

  contact: {
    label: 'Contacto',
    title: '¿Hablamos de tu sitio web?',
    lead: 'Cuéntame brevemente sobre tu negocio. Respondo en menos de 24 horas en días laborables.',
    channels: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      instagram: 'Instagram',
      preview: 'Vista previa gratis',
      previewText: 'Cuestionario de 5 minutos',
    },
    form: {
      name: 'Nombre',
      namePlaceholder: '¿Cómo te llamo?',
      email: 'E-mail',
      emailPlaceholder: 'tu@empresa.com',
      project: 'Tipo de proyecto',
      projects: ['Sitio corporativo', 'Tienda online', 'Landing page', 'Sistema a medida', 'Aún no lo sé'],
      budget: 'Presupuesto',
      budgetUpTo: 'Hasta {amount}',
      budgetAbove: 'Más de {amount}',
      message: 'Sobre el proyecto',
      messagePlaceholder: 'Qué hace la empresa, qué necesita y para cuándo.',
      footnote: 'Al enviar, WhatsApp se abre con tu mensaje listo.',
      send: 'Enviar por WhatsApp',
      waIntro: '¡Hola! Llegué por el sitio de MX Studio Web.',
      waProject: 'Proyecto',
      waBudget: 'Presupuesto',
      errorName: 'Escribe tu nombre.',
      errorEmail: 'Revisa el e-mail.',
      errorMessage: 'Cuéntame un poco más sobre el proyecto.',
      sentTitle: 'Casi listo',
      sentText: 'Abrí WhatsApp con tu mensaje, {name}. Solo tienes que tocar enviar allí.',
      sentRetry: '¿No se abrió WhatsApp? Toca aquí.',
    },
  },

  footer: {
    blurb: 'Sitios web a medida que traen clientes. Río de Janeiro, atendiendo clientes de todo el mundo.',
    navTitle: 'Navegación',
    contactTitle: 'Contacto',
    languagesTitle: 'Idiomas',
    rights: 'Todos los derechos reservados.',
    location: 'Río de Janeiro, Brasil',
  },

  demo: {
    badge: 'Modelo de demostración',
    description: '{name} es un modelo de sitio creado por MX Studio Web para un negocio ficticio. Ábrelo y pruébalo: todo funciona.',
  },
};
```

- [ ] **Step 6: Rodar testes e build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: testes PASS; `tsc` sem erros; build OK.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Conteúdo novo em PT, EN e ES; domínio e e-mail novos; preços e vitrine no estudio.ts"
```

---

### Task 4: Sistema visual — tokens, cabeçalho, rodapé e peças base

**Files:**
- Replace: `src/app/globals.css`, `src/components/reveal.tsx`, `src/components/site/site-chrome.tsx`
- Create: `src/components/site/{logo,lang-switch,header,footer,button-link,section-header,browser-frame,phone-frame,currency-switch,price}.tsx`

**Interfaces:**
- Consumes: `Messages`, `localizedPath`, `switchLocalePath`, `useI18n`, `estudio`, `whatsappUrl`, `MaxMonogram`.
- Produces: `Header({ locale, t: Messages['nav'] })`, `Footer({ locale, t: Messages })`, `Logo()`, `LangSwitch({ label })`, `ButtonLink({ href, children, variant?: 'primary'|'outline'|'dark', external?, className? })`, `SectionHeader({ index, label, title, lead?, tone?: 'dark'|'light', className? })`, `type Img = { src: string; width: number; height: number }` e `BrowserFrame({ image, alt, url, priority?, sizes?, className? })` (ambos em `browser-frame.tsx`), `PhoneFrame({ image, alt, className? })`, `CurrencySwitch({ label })`, `Price({ brl, className? })`, `Reveal({ children, className?, delay?, as? })`. Utilitários CSS: `container-site`, `grid-lines`; cores `ink`, `ink-2`, `paper`, `bone`, `lime`.

- [ ] **Step 1: Tokens e base**

Replace `src/app/globals.css` inteiro:

```css
@import 'tailwindcss';

@theme {
  --color-ink: #0c0e0a;
  --color-ink-2: #141711;
  --color-paper: #f3f4ef;
  --color-bone: #fbfcf8;
  --color-lime: #a4fe24;

  /* Studio identity (same as the @mxstudioweb posts) */
  --font-brand: var(--font-bricolage), system-ui, sans-serif;
  --font-body: var(--font-figtree), system-ui, sans-serif;
  --font-label: var(--font-jetbrains), ui-monospace, monospace;

  /* Used by the demos, each playing its own client brand */
  --font-sans: var(--font-instrument-sans), system-ui, sans-serif;
  --font-display: var(--font-space-grotesk), system-ui, sans-serif;
  --font-serif: var(--font-instrument-serif), Georgia, serif;
}

@utility container-site {
  margin-inline: auto;
  width: 100%;
  max-width: 80rem;
  padding-inline: 1.25rem;
  @media (width >= 40rem) {
    padding-inline: 2rem;
  }
}

/* The square grid from the @mxstudioweb posts, kept faint */
@utility grid-lines {
  background-image:
    linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px);
  background-size: 72px 72px;
}

@layer base {
  /* Tailwind 4 changed the default border color; the demos were written for the v3 default. */
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentcolor);
  }

  button:not(:disabled),
  [role='button']:not(:disabled),
  summary {
    cursor: pointer;
  }

  :root {
    color-scheme: dark;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100dvh;
    overflow-x: hidden;
    background: var(--color-ink);
    color: var(--color-bone);
    /* Demos inherit this; studio pages set font-body themselves. */
    font-family: var(--font-instrument-sans), system-ui, sans-serif;
  }

  ::selection {
    background: rgb(164 254 36 / 0.3);
    color: #fff;
  }

  :focus-visible {
    outline: 2px solid var(--color-lime);
    outline-offset: 3px;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-delay: 0ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* Demos fade in on load (used inside src/demos) */
.page-enter {
  animation: page-enter 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}
/* Ends on `transform: none` so fixed-position modals inside demos keep working. */
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* FAQ uses native <details>; hide the marker and turn the + into an x when open */
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
details[open] .faq-icon {
  transform: rotate(45deg);
}
```

Replace `src/components/reveal.tsx` inteiro (sem desfoque, deslocamento menor):

```tsx
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Fades content in once when it scrolls into view. Reduced motion skips the transition (globals.css). */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
```

Run: `git grep -n "<Reveal" -- src | grep -v "src/components/home\|src/app/(pt)/fundadores"`
Expected: nenhum uso com `as=` fora de `div|li|section|article` (o tipo novo é mais estrito).

- [ ] **Step 2: Peças base**

Create `src/components/site/logo.tsx`:

```tsx
import { MaxMonogram } from '@/components/max-monogram';

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <MaxMonogram className="h-8 w-8" rounded={10} />
      <span className="font-brand text-[15px] font-bold tracking-tight text-bone">MX Studio Web</span>
    </span>
  );
}
```

Create `src/components/site/button-link.tsx`:

```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'dark';

const variants: Record<Variant, string> = {
  primary: 'bg-lime text-ink hover:bg-[#b8ff52]',
  outline: 'border border-white/20 text-bone hover:border-white/60',
  dark: 'bg-ink text-bone hover:bg-ink-2',
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-200',
    variants[variant],
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
```

Create `src/components/site/section-header.tsx`:

```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Numbered section opener: "02 — Modelos" on the left, the headline on the right. */
export function SectionHeader({
  index,
  label,
  title,
  lead,
  tone = 'dark',
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div className={cn('grid gap-6 lg:grid-cols-12', className)}>
      <p
        className={cn(
          'font-label text-xs uppercase tracking-[0.16em] lg:col-span-3 lg:pt-3',
          dark ? 'text-white/50' : 'text-ink/55',
        )}
      >
        <span className={dark ? 'text-lime' : 'text-ink'}>{index}</span> — {label}
      </p>
      <div className="lg:col-span-9">
        <h2 className="max-w-3xl text-balance font-brand text-[clamp(2rem,3.2vw+1rem,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em]">
          {title}
        </h2>
        {lead && (
          <p className={cn('mt-5 max-w-2xl text-lg leading-relaxed', dark ? 'text-white/65' : 'text-ink/70')}>{lead}</p>
        )}
      </div>
    </div>
  );
}
```

Create `src/components/site/browser-frame.tsx`:

```tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type Img = { src: string; width: number; height: number };

/** A real screenshot inside a plain browser chrome drawn in CSS. */
export function BrowserFrame({
  image,
  alt,
  url,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
}: {
  image: Img;
  alt: string;
  url: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]',
        className,
      )}
    >
      <div aria-hidden className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/5 px-3 py-1 font-label text-[11px] text-white/50">
          {url}
        </span>
      </div>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </figure>
  );
}
```

Create `src/components/site/phone-frame.tsx`:

```tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Img } from './browser-frame';

export function PhoneFrame({ image, alt, className }: { image: Img; alt: string; className?: string }) {
  return (
    <figure
      className={cn(
        'w-[168px] rounded-[1.75rem] border border-white/15 bg-ink p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] sm:w-[196px]',
        className,
      )}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes="196px"
        className="block h-auto w-full rounded-[1.4rem]"
      />
    </figure>
  );
}
```

Create `src/components/site/lang-switch.tsx`:

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { localeInfo, locales } from '@/i18n/config';
import { switchLocalePath } from '@/i18n/paths';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';

/** Plain links, not buttons: each language is its own crawlable URL. */
export function LangSwitch({ label }: { label: string }) {
  const pathname = usePathname();
  const { locale } = useI18n();

  return (
    <nav aria-label={label} className="flex items-center gap-1 font-label text-xs">
      {locales.map((l) => (
        <a
          key={l}
          href={switchLocalePath(pathname, l)}
          hrefLang={localeInfo[l].htmlLang}
          lang={localeInfo[l].htmlLang}
          aria-current={l === locale ? 'true' : undefined}
          className={cn(
            'rounded-full px-2.5 py-1.5 transition-colors',
            l === locale ? 'bg-white/10 text-bone' : 'text-white/50 hover:text-bone',
          )}
        >
          {localeInfo[l].short}
        </a>
      ))}
    </nav>
  );
}
```

Create `src/components/site/currency-switch.tsx`:

```tsx
'use client';

import { currencies, currencySymbol } from '@/i18n/config';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export function CurrencySwitch({ label }: { label: string }) {
  const { currency, setCurrency } = useI18n();
  return (
    <div className="flex items-center gap-3">
      <span id="currency-label" className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </span>
      <div role="radiogroup" aria-labelledby="currency-label" className="flex rounded-full border border-white/15 p-1">
        {currencies.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={currency === c}
            onClick={() => setCurrency(c)}
            className={cn(
              'rounded-full px-3.5 py-1.5 font-label text-xs transition-colors',
              currency === c ? 'bg-bone text-ink' : 'text-white/60 hover:text-bone',
            )}
          >
            {currencySymbol[c]}
          </button>
        ))}
      </div>
    </div>
  );
}
```

Create `src/components/site/price.tsx`:

```tsx
'use client';

import { useI18n } from '@/i18n/provider';

/** A BRL price shown in the visitor's currency; converted values are marked as approximate. */
export function Price({ brl, className }: { brl: number; className?: string }) {
  const { money, currency } = useI18n();
  const value = money(brl, { decimals: 0, round: true });
  return <span className={className}>{currency === 'BRL' ? value : `≈ ${value}`}</span>;
}
```

- [ ] **Step 3: Cabeçalho e rodapé**

Create `src/components/site/header.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/paths';
import { estudio } from '@/lib/estudio';
import { LangSwitch } from './lang-switch';
import { Logo } from './logo';

export function Header({ locale, t }: { locale: Locale; t: Messages['nav'] }) {
  const [open, setOpen] = useState(false);
  const home = localizedPath(locale, '/');
  const links = [
    { id: 'work', label: t.work },
    { id: 'process', label: t.process },
    { id: 'pricing', label: t.pricing },
    { id: 'about', label: t.about },
    { id: 'contact', label: t.contact },
  ];
  const cta = (
    <a
      href={estudio.diagnostico}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-[#b8ff52]"
    >
      {t.cta}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 font-body backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Link href={home} aria-label={t.home} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={t.menuLabel} className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm text-white/70">
            {links.map((l) => (
              <li key={l.id}>
                <Link href={`${home}#${l.id}`} className="transition-colors hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LangSwitch label={t.language} />
          {cta}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.close : t.menu}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 lg:hidden">
          <nav aria-label={t.menuLabel} className="container-site py-6">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`${home}#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-brand text-2xl font-semibold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <LangSwitch label={t.language} />
              {cta}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
```

Create `src/components/site/footer.tsx`:

```tsx
import Link from 'next/link';
import { localeInfo, locales, type Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/paths';
import { estudio, whatsappUrl } from '@/lib/estudio';
import { Logo } from './logo';

const heading = 'font-label text-[11px] uppercase tracking-[0.14em] text-white/45';
const link = 'text-white/70 transition-colors hover:text-bone';

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  const home = localizedPath(locale, '/');
  const sections = [
    ['work', t.nav.work],
    ['process', t.nav.process],
    ['pricing', t.nav.pricing],
    ['about', t.nav.about],
    ['contact', t.nav.contact],
  ] as const;

  return (
    <footer className="border-t border-white/10 font-body text-sm">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm leading-relaxed text-white/55">{t.footer.blurb}</p>
        </div>

        <div className="md:col-span-2">
          <h2 className={heading}>{t.footer.navTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {sections.map(([id, label]) => (
              <li key={id}>
                <Link href={`${home}#${id}`} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{t.footer.contactTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={whatsappUrl(t.whatsappMsg)} target="_blank" rel="noopener noreferrer" className={link}>
                WhatsApp {estudio.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${estudio.email}`} className={link}>
                {estudio.email}
              </a>
            </li>
            <li>
              <a href={estudio.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                Instagram {estudio.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className={heading}>{t.footer.languagesTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {locales.map((l) => (
              <li key={l}>
                <a href={localizedPath(l, '/')} hrefLang={localeInfo[l].htmlLang} lang={localeInfo[l].htmlLang} className={link}>
                  {localeInfo[l].name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} MX Studio Web. {t.footer.rights}
          </p>
          <p>{t.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
```

Replace `src/components/site/site-chrome.tsx` inteiro:

```tsx
import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { I18nProvider } from '@/i18n/provider';
import { getRates } from '@/i18n/rates';
import { Footer } from './footer';
import { Header } from './header';

/** Everything inside <body> that the Portuguese and the /en, /es root layouts share. */
export async function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const rates = await getRates();
  const t = messages[locale];
  return (
    <I18nProvider locale={locale} rates={rates}>
      <Header locale={locale} t={t.nav} />
      {children}
      <Footer locale={locale} t={t} />
    </I18nProvider>
  );
}
```

- [ ] **Step 4: Verificar**

Run: `npm run lint && npm test && npm run build && npm run test:out`
Expected: tudo PASS.

Prévia (`preview_start` com o nome `mx-studio-dev`): abrir `/` e `/en`, tirar print em largura desktop e em `resize_window` preset `mobile`. Conferir: cabeçalho fixo com logo, links e PT/EN/ES; menu do celular abre e fecha; rodapé com `contato@mxstudioweb.com.br`; clicar em EN leva a `/en`. `read_console_messages` com `onlyErrors: true` → vazio. Voltar com preset `desktop`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Sistema visual novo: tokens, cabeçalho, rodapé, moldura de navegador e seletor de moeda"
```

---

### Task 5: Imagens reais — prints, foto e Open Graph

**Files:**
- Create: `scripts/shots.mjs`, `scripts/portrait.mjs`, `scripts/og.mjs`, `scripts/source/max.jpg`, `src/lib/images.ts`, `tests/unit/images.test.ts`
- Output: `public/shots/{sulamita-desktop,sulamita-detail,sulamita-mobile,clinica-sereno,motta-advogados,moda-arte,restaurante-terra,costa-imoveis,rota-clara}.webp`, `public/sobre/max-costa.webp`, `public/og/og-{pt,en,es}.png`

**Interfaces:**
- Consumes: `showcase`, `ShowcaseSlug`; `Img` (browser-frame).
- Produces: `shots: { sulamita: { desktop: Img; detail: Img; mobile: Img }; demos: Record<ShowcaseSlug, Img> }`, `portrait: Img`, `ogImage(locale): string`.

- [ ] **Step 1: Teste que falha**

Create `tests/unit/images.test.ts`:

```ts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { showcase } from '@/lib/estudio';
import { portrait, shots } from '@/lib/images';

const file = (src: string) => join(process.cwd(), 'public', src);
const all = [shots.sulamita.desktop, shots.sulamita.detail, shots.sulamita.mobile, portrait, ...showcase.map((s) => shots.demos[s])];

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

  it('ship Open Graph images for the three languages', () => {
    for (const l of ['pt', 'en', 'es']) expect(existsSync(file(`/og/og-${l}.png`))).toBe(true);
  });
});
```

Run: `npx vitest run tests/unit/images.test.ts`
Expected: FAIL — `@/lib/images` não existe.

- [ ] **Step 2: Dados das imagens**

Create `src/lib/images.ts`:

```ts
import type { Img } from '@/components/site/browser-frame';
import type { Locale } from '@/i18n/config';
import type { ShowcaseSlug } from './estudio';

const desktop = (name: string): Img => ({ src: `/shots/${name}.webp`, width: 1440, height: 900 });

/** Screenshots of live pages, captured by scripts/shots.mjs. */
export const shots = {
  sulamita: {
    desktop: desktop('sulamita-desktop'),
    detail: desktop('sulamita-detail'),
    mobile: { src: '/shots/sulamita-mobile.webp', width: 780, height: 1688 } satisfies Img,
  },
  demos: {
    'clinica-sereno': desktop('clinica-sereno'),
    'motta-advogados': desktop('motta-advogados'),
    'moda-arte': desktop('moda-arte'),
    'restaurante-terra': desktop('restaurante-terra'),
    'costa-imoveis': desktop('costa-imoveis'),
    'rota-clara': desktop('rota-clara'),
  } satisfies Record<ShowcaseSlug, Img>,
};

/** Max's own photo, black and white (scripts/portrait.mjs). */
export const portrait: Img = { src: '/sobre/max-costa.webp', width: 640, height: 800 };

export const ogImage = (locale: Locale) => `/og/og-${locale}.png`;
```

- [ ] **Step 3: Instalar o playwright-core e copiar a foto original**

Run: `npm install -D playwright-core`

```bash
mkdir -p scripts/source
cp "C:/Users/maxca/AppData/Local/Temp/claude/D--Obsidian-Meu-c-rebro-Programa--o-site-meu-site/4621b04d-c785-4cc8-9e5a-1fb61cdcecd8/images/1.jpg" scripts/source/max.jpg
```

Expected: `scripts/source/max.jpg` com 1080×1089 px.

- [ ] **Step 4: Foto do Sobre**

Create `scripts/portrait.mjs`:

```js
// Builds the black-and-white portrait for the About section from Max's original photo.
// Usage: npm run portrait
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'scripts/source/max.jpg';
const OUT = 'public/sobre/max-costa.webp';
// Chest-up, 4:5, leaving out the glass on the left edge of the original (1080×1089).
const CROP = { left: 105, top: 0, width: 720, height: 900 };

// Darkens the edges so the busy mural behind recedes.
const vignette = Buffer.from(
  `<svg width="${CROP.width}" height="${CROP.height}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="v" cx="50%" cy="36%" r="72%">
      <stop offset="50%" stop-color="#fff"/><stop offset="100%" stop-color="#4a4a4a"/>
    </radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#v)"/>
  </svg>`,
);

await mkdir('public/sobre', { recursive: true });
await sharp(SRC)
  .extract(CROP)
  .grayscale()
  .linear(1.1, -12)
  .composite([{ input: vignette, blend: 'multiply' }])
  .resize(640, 800)
  .webp({ quality: 82 })
  .toFile(OUT);
console.log('ok', OUT);
```

Run: `npm run portrait`
Expected: `ok public/sobre/max-costa.webp`.

Abrir `public/sobre/max-costa.webp` com a ferramenta Read e conferir: rosto centralizado, cabeça inteira, sem o copo, P&B. Se o rosto estiver cortado ou fora do centro, ajustar `CROP.left` (±30 px) e rodar de novo.

- [ ] **Step 5: Prints reais**

Create `scripts/shots.mjs`:

```js
// Captures the real screenshots shown on the studio site (needs Microsoft Edge installed).
// Usage: npm run shots
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const OUT = 'public/shots';
const SULAMITA = 'https://www.sulamitaestetica.pt/';
// The demos as they are live today; the code is the same one this branch ships.
const DEMO_BASE = 'https://mxstudioweb.vercel.app/demo';
const demos = ['clinica-sereno', 'motta-advogados', 'moda-arte', 'restaurante-terra', 'costa-imoveis', 'rota-clara'];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });

async function shoot({ url, viewport, deviceScaleFactor = 1, isMobile = false, scrollY = 0, clip }) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor,
    isMobile,
    hasTouch: isMobile,
    locale: 'pt-BR',
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(1500);
  }
  let buffer;
  if (clip) {
    // The live demo sits inside the portfolio frame; keep only the client's site, at 16:10.
    const box = await page.locator(clip).first().boundingBox();
    buffer = await page.screenshot({
      clip: { x: box.x, y: box.y, width: box.width, height: Math.round((box.width * 900) / 1440) },
    });
  } else {
    buffer = await page.screenshot();
  }
  await context.close();
  return buffer;
}

const save = (buffer, name, width, height) =>
  sharp(buffer).resize(width, height, { fit: 'cover', position: 'top' }).webp({ quality: 80 }).toFile(`${OUT}/${name}.webp`);

const wide = { width: 1440, height: 900 };
await save(await shoot({ url: SULAMITA, viewport: wide }), 'sulamita-desktop', 1440, 900);
await save(await shoot({ url: SULAMITA, viewport: wide, scrollY: 900 }), 'sulamita-detail', 1440, 900);
await save(
  await shoot({ url: SULAMITA, viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true }),
  'sulamita-mobile',
  780,
  1688,
);
for (const slug of demos) {
  const shot = await shoot({ url: `${DEMO_BASE}/${slug}`, viewport: { width: 1440, height: 1100 }, clip: 'div.overflow-hidden.rounded-3xl' });
  await save(shot, slug, 1440, 900);
  console.log('ok', slug);
}
await browser.close();
```

Run: `npm run shots`
Expected: 9 arquivos `.webp` em `public/shots/`.

Abrir cada print com a ferramenta Read e conferir: nada de barra de cookies, menu do portfólio antigo ou animação pela metade. Se a barra de cookies da Sulamita aparecer, **não** clicar em aceitar: antes do `page.screenshot`, esconder com `await page.addStyleTag({ content: '<seletor da barra> { display: none !important }' })` (descobrir o seletor com `read_page` no navegador) e rodar de novo. Se algum print de demo vier com o cabeçalho do portfólio antigo, trocar o seletor `clip` pelo elemento que envolve só a demo e rodar de novo.

- [ ] **Step 6: Imagens Open Graph**

Create `scripts/og.mjs`:

```js
// Renders the 1200×630 share images (WhatsApp, Instagram, Google) with the brand fonts.
// Usage: npm run og   (needs Microsoft Edge and internet for Google Fonts)
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const logo = await readFile('public/brand/max-logo-dark.svg', 'utf8');
const copy = {
  pt: { title: 'Sites que trazem <b>clientes</b> para o seu negócio.', sub: 'Estúdio de sites sob medida · Rio de Janeiro' },
  en: { title: 'Websites that bring <b>customers</b> to your business.', sub: 'Custom website studio · Rio de Janeiro, Brazil' },
  es: { title: 'Sitios web que traen <b>clientes</b> a tu negocio.', sub: 'Estudio de sitios a medida · Río de Janeiro, Brasil' },
};

const html = ({ title, sub }) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;
    background:#0C0E0A;color:#FBFCF8;font-family:'Bricolage Grotesque',sans-serif;
    background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);
    background-size:72px 72px}
  .top{display:flex;align-items:center;gap:20px;font:500 22px 'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:rgba(251,252,248,.65)}
  .top svg{width:72px;height:72px}
  h1{font-size:78px;line-height:.98;letter-spacing:-.03em;max-width:1000px;font-weight:700}
  h1 b{color:#A4FE24;font-weight:700}
  .bottom{display:flex;justify-content:space-between;font:500 22px 'JetBrains Mono',monospace;color:rgba(251,252,248,.6)}
  .bottom span:last-child{color:#A4FE24}
</style></head><body>
<div class="top">${logo}<span>MX Studio Web</span></div>
<h1>${title}</h1>
<div class="bottom"><span>${sub}</span><span>mxstudioweb.com.br</span></div>
</body></html>`;

await mkdir('public/og', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [locale, c] of Object.entries(copy)) {
  await page.setContent(html(c), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/og-${locale}.png` });
  console.log('ok', locale);
}
await browser.close();
```

Run: `npm run og`
Expected: `public/og/og-pt.png`, `og-en.png`, `og-es.png`. Abrir um deles com Read e conferir fonte da marca, logo e texto sem cortes.

- [ ] **Step 7: Rodar testes**

Run: `npx vitest run tests/unit`
Expected: PASS (inclusive `images.test.ts`).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Prints reais, foto do Max em P&B e imagens de compartilhamento"
```

---

### Task 6: Home nova nos três idiomas

**Files:**
- Create: `src/components/home/{hero,client-case,showcase-card,showcase,process,pricing,about,faq,contact,contact-form,home-page}.tsx`
- Replace: `src/app/(pt)/page.tsx`, `src/app/(intl)/[locale]/page.tsx`
- Modify: `tests/out/site.test.ts`

**Interfaces:**
- Consumes: Tarefas 3–5 (`messages`, `estudio`, `services`, `showcase`, `lcpSeconds`, `demoBySlug`, `clientCases`, `shots`, `portrait`, peças de `components/site`, `Reveal`).
- Produces: `HomePage({ locale })`; `ShowcaseCard({ href, external?, image, alt, label, title, text, meta?, cta })` (usado também na Tarefa 7). Âncoras: `#case`, `#work`, `#process`, `#pricing`, `#about`, `#faq`, `#contact`.

- [ ] **Step 1: Testes do HTML que falham**

Acrescentar ao fim de `tests/out/site.test.ts`:

```ts
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
    const broken: string[] = [];
    for (const file of htmlFiles()) {
      const html = readFileSync(file, 'utf8');
      for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"/][^"]*|\/)"/g)) {
        if (!resolves(url)) broken.push(`${file.replace(OUT, '')} → ${url}`);
      }
    }
    expect(broken).toEqual([]);
  });
});
```

Run: `npm run build && npx vitest run tests/out`
Expected: FAIL nos testes de `home page` (a home ainda é provisória).

- [ ] **Step 2: Topo e cliente real**

Create `src/components/home/hero.tsx`:

```tsx
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { estudio, whatsappUrl } from '@/lib/estudio';
import { shots } from '@/lib/images';
import { BrowserFrame } from '@/components/site/browser-frame';
import { ButtonLink } from '@/components/site/button-link';
import { PhoneFrame } from '@/components/site/phone-frame';

export function Hero({ t, waMsg }: { t: Messages['hero']; waMsg: string }) {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]"
      />
      <div className="container-site relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-white/55">{t.eyebrow}</p>
          <h1 className="mt-6 text-balance font-brand text-[clamp(2.75rem,5vw+1rem,5.5rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            {t.titleA} <span className="text-lime">{t.titleAccent}</span> {t.titleB}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">{t.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={estudio.diagnostico} external>
              {t.primary}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={whatsappUrl(waMsg)} external variant="outline">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t.secondary}
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-white/45">{t.note}</p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative pb-10 sm:pb-0 sm:pl-10">
            <BrowserFrame image={shots.sulamita.desktop} alt={t.desktopAlt} url="sulamitaestetica.pt" priority />
            <PhoneFrame
              image={shots.sulamita.mobile}
              alt={t.mobileAlt}
              className="absolute -bottom-2 left-0 sm:-bottom-12 sm:-left-2"
            />
          </div>
          <p className="mt-6 text-right font-label text-[11px] uppercase tracking-[0.14em] text-white/45 sm:mt-16">
            {t.caseLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
```

Create `src/components/home/client-case.tsx`:

```tsx
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { clientCases } from '@/lib/estudio';
import { shots } from '@/lib/images';
import { BrowserFrame } from '@/components/site/browser-frame';
import { ButtonLink } from '@/components/site/button-link';
import { Reveal } from '@/components/reveal';

export function ClientCase({ t }: { t: Messages['case'] }) {
  const sulamita = clientCases[0];
  return (
    <section id="case" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="flex items-center gap-2 font-label text-xs uppercase tracking-[0.16em] text-white/55">
            <span className="text-lime">01</span> —
            <BadgeCheck className="h-4 w-4 text-lime" aria-hidden />
            {t.label}
          </p>
          <h2 className="mt-6 text-balance font-brand text-[clamp(2rem,2.6vw+1rem,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{t.text}</p>
          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {t.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-6 py-3.5 text-sm">
                <dt className="text-white/50">{f.label}</dt>
                <dd className="text-right font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={sulamita.url} external variant="outline" className="mt-8">
            {t.visit}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <BrowserFrame image={shots.sulamita.detail} alt={t.imageAlt} url="sulamitaestetica.pt" />
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Vitrine de modelos**

Create `src/components/home/showcase-card.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Img } from '@/components/site/browser-frame';

export function ShowcaseCard({
  href,
  external,
  image,
  alt,
  label,
  title,
  text,
  meta,
  cta,
}: {
  href: string;
  external?: boolean;
  image: Img;
  alt: string;
  label: string;
  title: string;
  text: string;
  meta?: string;
  cta: string;
}) {
  const body = (
    <>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2">
        <Image
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/45">{label}</p>
          <h3 className="mt-2 font-brand text-xl font-bold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-white/60">{text}</p>
          {meta && <p className="mt-3 font-label text-[11px] text-white/45">{meta}</p>}
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-semibold transition-colors group-hover:text-lime">
          {cta}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <Link href={href} className="group block">
      {body}
    </Link>
  );
}
```

Create `src/components/home/showcase.tsx`:

```tsx
import { ArrowUpRight } from 'lucide-react';
import { localeInfo, type Locale } from '@/i18n/config';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/paths';
import { demoBySlug, estudio, lcpSeconds, showcase } from '@/lib/estudio';
import { shots } from '@/lib/images';
import { ButtonLink } from '@/components/site/button-link';
import { SectionHeader } from '@/components/site/section-header';
import { Reveal } from '@/components/reveal';
import { ShowcaseCard } from './showcase-card';

export function Showcase({ locale, t }: { locale: Locale; t: Messages['work'] }) {
  const seconds = new Intl.NumberFormat(localeInfo[locale].intl, { maximumFractionDigits: 1 });

  return (
    <section id="work" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="02" label={t.label} title={t.title} lead={t.lead} />
        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {showcase.map((slug, i) => {
            const demo = demoBySlug[slug];
            return (
              <Reveal key={slug} delay={(i % 2) * 80}>
                <ShowcaseCard
                  href={localizedPath(locale, `/demo/${slug}`)}
                  image={shots.demos[slug]}
                  alt={fill(t.imageAlt, { name: demo.clientName })}
                  label={`${t.niches[demo.niche]} · ${t.badge}`}
                  title={demo.clientName}
                  text={t.cards[slug]}
                  meta={fill(t.lcp, { value: `${seconds.format(lcpSeconds[slug])} s` })}
                  cta={t.open}
                />
              </Reveal>
            );
          })}
        </div>
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-white/45">{t.note}</p>
          <ButtonLink href={estudio.diagnostico} external className="shrink-0">
            {t.cta}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Processo e preços**

Create `src/components/home/process.tsx`:

```tsx
import type { Messages } from '@/i18n/messages';
import { SectionHeader } from '@/components/site/section-header';

export function Process({ t }: { t: Messages['process'] }) {
  return (
    <section id="process" className="bg-paper py-24 text-ink sm:py-32">
      <div className="container-site">
        <SectionHeader tone="light" index="03" label={t.label} title={t.title} />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <li key={step.title} className="bg-paper p-7">
              <span className="font-label text-xs text-ink/50">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-10 font-brand text-2xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-1 font-label text-xs uppercase tracking-[0.12em] text-ink/55">{step.duration}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

Create `src/components/home/pricing.tsx`:

```tsx
import { ArrowUpRight, Check, CreditCard, Globe, QrCode } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { services, whatsappUrl } from '@/lib/estudio';
import { CurrencySwitch } from '@/components/site/currency-switch';
import { Price } from '@/components/site/price';
import { SectionHeader } from '@/components/site/section-header';

// Same order as pricing.payments.methods: PIX, card, Wise.
const methodIcons = [QrCode, CreditCard, Globe];

export function Pricing({ t }: { t: Messages['pricing'] }) {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="04" label={t.label} title={t.title} lead={t.lead} />

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4">
          <CurrencySwitch label={t.currency} />
          <p className="max-w-md text-xs leading-relaxed text-white/45">{t.approx}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ key, price }) => {
            const item = t.items[key];
            return (
              <article key={key} className="flex flex-col rounded-xl border border-white/10 bg-ink-2 p-7">
                <h3 className="font-brand text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-white/55">{item.text}</p>
                <p className="mt-8 font-label text-[11px] uppercase tracking-[0.14em] text-white/45">{t.from}</p>
                <Price brl={price} className="mt-1 block font-brand text-4xl font-bold tracking-tight" />
                <ul className="mt-7 space-y-2.5 text-sm text-white/75">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(fill(t.askMsg, { service: item.title }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold transition-colors hover:text-lime"
                >
                  {t.ask}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 rounded-xl border border-white/10 p-7 lg:grid-cols-12 lg:items-center">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50 lg:col-span-3">{t.payments.title}</p>
          <ul className="flex flex-wrap gap-3 lg:col-span-9">
            {t.payments.methods.map((m, i) => {
              const Icon = methodIcons[i];
              return (
                <li key={m} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm">
                  <Icon className="h-4 w-4 text-lime" aria-hidden />
                  {m}
                </li>
              );
            })}
          </ul>
          <p className="text-sm leading-relaxed text-white/60 lg:col-span-12">
            {t.payments.terms} {t.payments.abroad}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Sobre, perguntas e contato**

Create `src/components/home/about.tsx`:

```tsx
import Image from 'next/image';
import { Check } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { estudio } from '@/lib/estudio';
import { portrait } from '@/lib/images';
import { Reveal } from '@/components/reveal';

export function About({ t }: { t: Messages['about'] }) {
  return (
    <section id="about" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <figure>
            <Image
              src={portrait.src}
              alt={t.photoAlt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full rounded-xl border border-white/10"
            />
            <figcaption className="mt-4 flex justify-between gap-4 text-sm">
              <span className="font-brand font-semibold">{estudio.owner}</span>
              <span className="text-white/50">{t.role}</span>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-white/50">
            <span className="text-lime">05</span> — {t.label}
          </p>
          <h2 className="mt-6 font-brand text-[clamp(2rem,3.2vw+1rem,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em]">
            {t.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75">{t.p1}</p>
          <p className="mt-4 text-lg leading-relaxed text-white/75">{t.p2}</p>
          <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm text-white/80 sm:grid-cols-2">
            {t.points.map((p) => (
              <li key={p} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
```

Create `src/components/home/faq.tsx`:

```tsx
import { Plus } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { SectionHeader } from '@/components/site/section-header';

/** Native <details>: works without JavaScript and is read by search engines. */
export function Faq({ t }: { t: Messages['faq'] }) {
  return (
    <section id="faq" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="06" label={t.label} title={t.title} />
        <div className="mt-14 divide-y divide-white/10 border-y border-white/10 lg:ml-[25%]">
          {t.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary className="flex items-start justify-between gap-6 py-6 font-brand text-lg font-semibold">
                {item.q}
                <Plus className="faq-icon mt-1 h-5 w-5 shrink-0 text-white/50 transition-transform duration-300" aria-hidden />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-white/65">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `src/components/home/contact-form.tsx`:

```tsx
'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Check, Send } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { useI18n } from '@/i18n/provider';
import { whatsappUrl } from '@/lib/estudio';
import { cn } from '@/lib/utils';

const input =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-bone placeholder:text-white/35 transition-colors focus:border-lime/60 focus:bg-white/[0.06] focus:outline-none';
const chip = (active: boolean) =>
  cn(
    'rounded-full border px-4 py-2 text-sm transition-colors',
    active ? 'border-bone bg-bone text-ink' : 'border-white/15 text-white/70 hover:border-white/35 hover:text-bone',
  );

/** No backend: the lead goes to WhatsApp with the message already written. */
export function ContactForm({ t }: { t: Messages['contact']['form'] }) {
  const { money } = useI18n();
  const amount = (brl: number) => money(brl, { decimals: 0, round: true });
  const budgets = [
    fill(t.budgetUpTo, { amount: amount(5000) }),
    fill(t.budgetUpTo, { amount: amount(10000) }),
    fill(t.budgetUpTo, { amount: amount(20000) }),
    fill(t.budgetAbove, { amount: amount(20000) }),
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState(0);
  const [budget, setBudget] = useState(1);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found: Record<string, string> = {};
    if (!name.trim()) found.name = t.errorName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) found.email = t.errorEmail;
    if (message.trim().length < 12) found.message = t.errorMessage;
    setErrors(found);
    if (Object.keys(found).length) return;

    const url = whatsappUrl(
      [
        t.waIntro,
        '',
        `${t.name}: ${name.trim()}`,
        `${t.email}: ${email.trim()}`,
        `${t.waProject}: ${t.projects[project]}`,
        `${t.waBudget}: ${budgets[budget]}`,
        '',
        message.trim(),
      ].join('\n'),
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div className="rounded-xl border border-white/10 bg-ink-2 p-10 text-center" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lime text-ink">
          <Check className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-6 font-brand text-2xl font-bold">{t.sentTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-white/70">{fill(t.sentText, { name: name.trim().split(' ')[0] })}</p>
        <a
          href={sentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm text-lime underline-offset-4 hover:underline"
        >
          {t.sentRetry}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-xl border border-white/10 bg-ink-2 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" label={t.name} error={errors.name}>
          <input
            id="cf-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            autoComplete="name"
            className={input}
          />
        </Field>
        <Field id="cf-email" label={t.email} error={errors.email}>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            autoComplete="email"
            className={input}
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.project}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.projects.map((p, i) => (
            <button key={p} type="button" aria-pressed={project === i} onClick={() => setProject(i)} className={chip(project === i)}>
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.budget}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {budgets.map((b, i) => (
            <button key={b} type="button" aria-pressed={budget === i} onClick={() => setBudget(i)} className={chip(budget === i)}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <Field id="cf-message" label={t.message} error={errors.message}>
          <textarea
            id="cf-message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.messagePlaceholder}
            className={cn(input, 'resize-none')}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/45">{t.footnote}</p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-[#b8ff52]"
        >
          {t.send}
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-2 text-xs text-[#ff9b7a]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

Create `src/components/home/contact.tsx`:

```tsx
import { ArrowUpRight } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { estudio, whatsappUrl } from '@/lib/estudio';
import { ContactForm } from './contact-form';

export function Contact({ t, waMsg }: { t: Messages['contact']; waMsg: string }) {
  const channels = [
    { label: t.channels.whatsapp, value: estudio.whatsappDisplay, href: whatsappUrl(waMsg), external: true },
    { label: t.channels.email, value: estudio.email, href: `mailto:${estudio.email}`, external: false },
    { label: t.channels.instagram, value: estudio.instagramHandle, href: estudio.instagram, external: true },
    { label: t.channels.preview, value: t.channels.previewText, href: estudio.diagnostico, external: true },
  ];

  return (
    <section id="contact" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-white/50">
            <span className="text-lime">07</span> — {t.label}
          </p>
          <h2 className="mt-6 text-balance font-brand text-[clamp(2rem,3.2vw+1rem,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em]">
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{t.lead}</p>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span>
                    <span className="block font-label text-[11px] uppercase tracking-[0.14em] text-white/45">{c.label}</span>
                    <span className="mt-1 block break-all font-brand text-lg font-semibold transition-colors group-hover:text-lime">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-lime" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <ContactForm t={t.form} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Montar a home e as páginas**

Create `src/components/home/home-page.tsx` (a Tarefa 9 acrescenta o JSON-LD):

```tsx
import type { Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { About } from './about';
import { ClientCase } from './client-case';
import { Contact } from './contact';
import { Faq } from './faq';
import { Hero } from './hero';
import { Pricing } from './pricing';
import { Process } from './process';
import { Showcase } from './showcase';

export function HomePage({ locale }: { locale: Locale }) {
  const t = messages[locale];
  return (
    <main className="font-body">
      <Hero t={t.hero} waMsg={t.whatsappMsg} />
      <ClientCase t={t.case} />
      <Showcase locale={locale} t={t.work} />
      <Process t={t.process} />
      <Pricing t={t.pricing} />
      <About t={t.about} />
      <Faq t={t.faq} />
      <Contact t={t.contact} waMsg={t.whatsappMsg} />
    </main>
  );
}
```

Replace `src/app/(pt)/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { messages } from '@/i18n/messages';
import { HomePage } from '@/components/home/home-page';

export const metadata: Metadata = {
  title: messages.pt.meta.title,
  description: messages.pt.meta.description,
};

export default function Page() {
  return <HomePage locale="pt" />;
}
```

Replace `src/app/(intl)/[locale]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { isLocale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { HomePage } from '@/components/home/home-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: messages[locale].meta.title, description: messages[locale].meta.description };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={isLocale(locale) ? locale : 'en'} />;
}
```

- [ ] **Step 7: Verificar**

Run: `npm run lint && npm test && npm run build && npm run test:out`
Expected: tudo PASS.

Prévia (`preview_start` `mx-studio-dev`): abrir `/`, `/en`, `/es`. Em cada um:
- Print desktop de cada seção (rolar até `#case`, `#work`, `#process`, `#pricing`, `#about`, `#contact`).
- Trocar a moeda para US$ e recarregar: valor continua em dólar (lembrado); os preços mostram "≈".
- `resize_window` preset `mobile`, recarregar e rodar `javascript_tool`: `document.documentElement.scrollWidth <= window.innerWidth` → `true`.
- Formulário: enviar vazio mostra os 3 erros; preenchido abre o WhatsApp (verificar que `window.open` é chamado com `wa.me/5521993196171`).
- `read_console_messages` com `onlyErrors: true` → vazio.
Voltar com `resize_window` preset `desktop`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Home nova: cliente real, modelos, processo, preços com moeda e pagamento, sobre, perguntas e contato"
```

---

### Task 7: Página /fundadores no visual novo

**Files:**
- Create: `src/app/(pt)/fundadores/page.tsx`
- Modify: `tests/out/site.test.ts`

**Interfaces:**
- Consumes: `fundadores`, `clientCases`, `demoBySlug`, `estudio`, `whatsappUrl` (estudio); `shots`; `ShowcaseCard`, `ButtonLink`, `SectionHeader`, `Reveal`.

- [ ] **Step 1: Teste que falha**

Acrescentar a `tests/out/site.test.ts`:

```ts
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
```

Run: `npm run build && npx vitest run tests/out`
Expected: FAIL — `fundadores.html` não existe.

- [ ] **Step 2: Página**

Create `src/app/(pt)/fundadores/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { ArrowUpRight, BadgeCheck, Camera, Clock, MapPin, MessageCircle, Smartphone, Star, Video } from 'lucide-react';
import { clientCases, demoBySlug, estudio, fundadores as f, whatsappUrl } from '@/lib/estudio';
import { shots } from '@/lib/images';
import { ButtonLink } from '@/components/site/button-link';
import { SectionHeader } from '@/components/site/section-header';
import { ShowcaseCard } from '@/components/home/showcase-card';
import { Reveal } from '@/components/reveal';

// Campaign page for Reels and the Instagram bio: Portuguese only, out of search and of the main menu,
// so the launch price never sits next to the regular price table.
export const metadata: Metadata = {
  title: 'Clientes fundadores · MX Studio Web',
  description: `Site profissional para pequenos negócios do Rio por R$ ${f.preco}. ${f.vagas} vagas de lançamento.`,
  robots: { index: false, follow: false },
};

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);

const included = [
  { icon: Smartphone, title: 'Site de uma página', text: 'Bonito e rápido no celular, onde o seu cliente está.' },
  { icon: MessageCircle, title: 'Botão de WhatsApp', text: 'Em todo o site, com a mensagem já escrita.' },
  { icon: MapPin, title: 'Mapa e horários', text: 'Como chegar, telefone e horário de funcionamento.' },
  { icon: Star, title: 'Serviços ou cardápio', text: 'Com preços, do jeito que você atende.' },
  { icon: Camera, title: 'Suas fotos e logo', text: 'O seu negócio de verdade, não banco de imagem.' },
  { icon: Clock, title: `Pronto em até ${f.prazoDias} dias`, text: 'Contados a partir de quando você manda fotos e textos.' },
];

const exchange = [
  { icon: Video, title: 'Um depoimento em vídeo', text: 'Uns 30 segundos, gravado no celular, contando como foi.' },
  { icon: BadgeCheck, title: 'Autorização para o portfólio', text: 'O seu site aparece no meu portfólio como cliente real.' },
  { icon: Star, title: 'Uma avaliação no Google', text: 'Se você gostou do resultado.' },
];

const niches = ['Padaria', 'Salão', 'Barbearia', 'Oficina', 'Loja de bairro', 'Restaurante', 'Pet shop', 'Estética', 'Academia', 'Açaí e lanchonete'];

const requirements = [
  'O negócio já está funcionando, com endereço ou atendimento ativo.',
  'Você manda logo e fotos do espaço, dos produtos ou dos serviços.',
  'Você responde as mensagens do projeto em até 2 dias.',
];

const steps = [
  { title: 'Você chama no WhatsApp', text: 'Me conta qual é o negócio. Se tiver vaga, ela é sua.' },
  { title: 'Responde o diagnóstico', text: '5 minutos de perguntas rápidas e o envio de logo e fotos.' },
  { title: 'Eu monto e mando a prévia', text: 'Você vê o site funcionando antes de ir ao ar.' },
  { title: 'Ajustes e no ar', text: 'Uma rodada de ajustes e o site entra no ar com o seu domínio.' },
];

const faq = [
  {
    q: `Por que só ${brl(f.preco)}?`,
    a: 'Porque estou montando meu portfólio com negócios reais. Em troca do preço de lançamento, peço um depoimento, a autorização para mostrar o site e uma avaliação no Google. Quando as vagas acabarem, o preço volta ao normal.',
  },
  {
    q: 'O domínio (seunegocio.com.br) fica no meu nome?',
    a: `Fica. Você registra no registro.br com o seu CPF ou CNPJ e paga direto a eles, cerca de ${brl(f.dominioAno)} por ano. Eu te ajudo no passo a passo e cuido da configuração. O endereço é seu, sem depender de mim.`,
  },
  {
    q: 'Tem mensalidade?',
    a: `Não é obrigatória. A hospedagem não tem mensalidade. Se quiser que eu cuide das alterações depois (preço, foto, horário), existe um plano opcional de ${brl(f.cuidadoMes)} por mês.`,
  },
  {
    q: 'Quanto tempo leva?',
    a: `Até ${f.prazoDias} dias depois que você manda as fotos e as informações do negócio. Quanto antes chegar o material, antes fica pronto.`,
  },
  {
    q: 'Já tenho Instagram. Preciso de site?',
    a: 'O Instagram é ótimo para quem já te segue. O site é o endereço fixo para mandar no WhatsApp, colocar no Google Maps e na bio, com tudo num lugar só: serviços, preços, localização e o botão para chamar.',
  },
  {
    q: 'Como eu pago?',
    a: `${brl(f.preco)} no PIX ou em até ${f.parcelas}x no cartão. O pagamento é combinado depois que eu confirmar a sua vaga.`,
  },
];

const exampleDemos = ['restaurante-terra', 'moda-arte'] as const;

export default function FundadoresPage() {
  const whatsapp = whatsappUrl(f.whatsappMsg);
  const sulamita = clientCases[0];

  return (
    <main className="font-body">
      <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]"
        />
        <div className="container-site relative">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-white/55">Clientes fundadores · Rio de Janeiro</p>
          <h1 className="mt-6 max-w-4xl text-balance font-brand text-[clamp(2.5rem,5vw+1rem,5.25rem)] font-bold leading-[0.97] tracking-[-0.035em]">
            Um site profissional para o seu negócio por <span className="text-lime">{brl(f.preco)}</span>.
          </h1>
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
            <p className="max-w-2xl text-lg leading-relaxed text-white/70 lg:col-span-7">
              Estou abrindo {f.vagas} vagas de lançamento para pequenos negócios do Rio. Você ganha um site pronto para receber
              clientes pelo WhatsApp. Eu ganho um caso real no meu portfólio.
            </p>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <ButtonLink href={whatsapp} external>
                <MessageCircle className="h-4 w-4" aria-hidden />
                Quero minha vaga
              </ButtonLink>
              <ButtonLink href="#exemplos" variant="outline">
                Ver exemplos
              </ButtonLink>
            </div>
          </div>
          <dl className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <Stat value={brl(f.preco)} label={`no PIX ou em até ${f.parcelas}x no cartão`} />
            <Stat value={`${f.restantes} de ${f.vagas}`} label="vagas abertas" />
            <Stat value={`~${brl(f.dominioAno)}/ano`} label="domínio no seu nome, pago direto ao registro.br" />
          </dl>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 sm:py-28">
        <div className="container-site">
          <SectionHeader index="01" label="O que está incluso" title="Tudo o que um pequeno negócio precisa na internet." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((it) => (
              <li key={it.title} className="bg-ink p-7">
                <it.icon className="h-5 w-5 text-lime" aria-hidden />
                <h3 className="mt-6 font-brand text-lg font-bold">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{it.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/45">Hospedagem sem mensalidade. Uma rodada de ajustes depois da prévia.</p>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-label text-xs uppercase tracking-[0.16em] text-ink/55">
              <span className="text-ink">02</span> — O que eu peço em troca
            </p>
            <h2 className="mt-6 font-brand text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.02] tracking-[-0.025em]">
              Um preço de lançamento em troca de confiança.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              O valor é baixo porque o seu site vai mostrar a outros negócios como eu trabalho. Por isso, peço três coisas
              simples quando ele estiver no ar.
            </p>
          </div>
          <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-7">
            {exchange.map((it) => (
              <li key={it.title} className="flex gap-5 py-6">
                <it.icon className="mt-1 h-5 w-5 shrink-0" aria-hidden />
                <div>
                  <h3 className="font-brand text-lg font-bold">{it.title}</h3>
                  <p className="mt-1 text-ink/70">{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-label text-xs uppercase tracking-[0.16em] text-white/50">
              <span className="text-lime">03</span> — Para quem é
            </p>
            <h2 className="mt-6 font-brand text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.02] tracking-[-0.025em]">
              Negócios de bairro que atendem gente de verdade.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {niches.map((n) => (
                <li key={n} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80">
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-2 p-7 lg:col-span-6">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">Para garantir a vaga</p>
            <ul className="mt-5 space-y-3 text-white/80">
              {requirements.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="exemplos" className="border-t border-white/10 py-24 sm:py-28">
        <div className="container-site">
          <SectionHeader
            index="04"
            label="Exemplos"
            title="Um cliente real e modelos que você pode testar."
            lead="Toque para abrir. Os modelos funcionam de verdade: dá para montar um pedido, testar os botões, ver tudo no celular."
          />
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
            <Reveal className="md:col-span-2">
              <ShowcaseCard
                href={sulamita.url}
                external
                image={shots.sulamita.desktop}
                alt="Página inicial do site da Sulamita Nascimento"
                label="Cliente real · Estética · Portugal"
                title={sulamita.clientName}
                text="Site bilíngue, no ar desde setembro de 2026 em sulamitaestetica.pt."
                cta="Ver no ar"
              />
            </Reveal>
            {exampleDemos.map((slug, i) => (
              <Reveal key={slug} delay={i * 80}>
                <ShowcaseCard
                  href={`/demo/${slug}`}
                  image={shots.demos[slug]}
                  alt={`Página inicial do modelo ${demoBySlug[slug].clientName}`}
                  label="Modelo de demonstração"
                  title={demoBySlug[slug].clientName}
                  text={demoBySlug[slug].tagline}
                  cta="Abrir"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink sm:py-28">
        <div className="container-site">
          <SectionHeader tone="light" index="05" label="Como funciona" title="Do WhatsApp ao site no ar em 4 passos." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-paper p-7">
                <span className="font-label text-xs text-ink/50">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 font-brand text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-xl border border-ink/10 p-7">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-ink/55">Depois de pronto · opcional</p>
            <p className="mt-2 font-brand text-xl font-bold">Plano de cuidado por {brl(f.cuidadoMes)}/mês</p>
            <p className="mt-1 max-w-xl text-ink/70">
              Eu atualizo preços, fotos e horários quando você pedir pelo WhatsApp. Não é obrigatório: o site é seu.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-site">
          <SectionHeader index="06" label="Perguntas" title="O que perguntam antes de pegar a vaga." />
          <div className="mt-14 divide-y divide-white/10 border-y border-white/10 lg:ml-[25%]">
            {faq.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary className="flex items-start justify-between gap-6 py-6 font-brand text-lg font-semibold">
                  {item.q}
                  <span className="faq-icon mt-0.5 text-xl leading-none text-white/50 transition-transform duration-300" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-white/65">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 text-center sm:py-28">
        <div className="container-site">
          <h2 className="mx-auto max-w-3xl text-balance font-brand text-[clamp(2.25rem,4vw+1rem,4rem)] font-bold leading-[1] tracking-[-0.03em]">
            {f.restantes > 0 ? (
              <>
                Restam <span className="text-lime">{f.restantes} vagas</span>. Uma pode ser sua.
              </>
            ) : (
              'As vagas de fundador acabaram.'
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/60">Me chama no WhatsApp com o nome do seu negócio. Respondo em até 24 horas.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={whatsapp} external>
              <MessageCircle className="h-4 w-4" aria-hidden />
              Quero minha vaga
            </ButtonLink>
            <ButtonLink href={estudio.instagram} external variant="outline">
              {estudio.instagramHandle}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-brand text-3xl font-bold tracking-tight sm:text-4xl">{value}</dd>
      <dd className="mt-1 text-xs text-white/50">{label}</dd>
    </div>
  );
}
```

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build && npm run test:out`
Expected: PASS.

Prévia: abrir `/fundadores` em desktop e em `mobile`; `javascript_tool` → `document.documentElement.scrollWidth <= window.innerWidth` deve dar `true`; clicar EN no cabeçalho leva a `/en`. Prints de cada seção.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Página de clientes fundadores no visual novo"
```

---

### Task 8: Moldura das demos

**Files:**
- Replace: `src/components/demo-frame.tsx`

**Interfaces:**
- Consumes: `useI18n`, `localizedPath`.
- Produces: `DemoFrame({ children, siteName, bg? })` — mesma assinatura de hoje (as 10 demos continuam chamando igual).

- [ ] **Step 1: Reescrever**

Replace `src/components/demo-frame.tsx` inteiro:

```tsx
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/paths';
import { useI18n } from '@/i18n/provider';

const text: Record<Locale, { back: string; badge: string; disclaimer: string }> = {
  pt: {
    back: 'Voltar para a MX Studio Web',
    badge: 'Modelo de demonstração',
    disclaimer:
      'Modelo de site criado pela MX Studio Web para um negócio fictício. Nomes, fotos e dados são ilustrativos e nenhum pagamento é processado.',
  },
  en: {
    back: 'Back to MX Studio Web',
    badge: 'Demo website',
    disclaimer:
      'Website model built by MX Studio Web for a fictional business. Names, photos and data are illustrative and no payment is processed.',
  },
  es: {
    back: 'Volver a MX Studio Web',
    badge: 'Modelo de demostración',
    disclaimer:
      'Modelo de sitio creado por MX Studio Web para un negocio ficticio. Nombres, fotos y datos son ilustrativos y no se procesa ningún pago.',
  },
};

export function DemoFrame({ children, siteName, bg = '#0a0a0a' }: { children: ReactNode; siteName: string; bg?: string }) {
  const { locale } = useI18n();
  const t = text[locale];

  return (
    <div className="min-h-dvh w-full bg-ink pb-8 pt-20 font-body">
      <div className="mx-auto max-w-[1360px] px-3 sm:px-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <Link
            href={`${localizedPath(locale, '/')}#work`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/75 transition-colors hover:text-bone"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            {t.back}
          </Link>
          <p className="hidden font-label text-[11px] uppercase tracking-[0.14em] text-white/45 sm:block">
            {t.badge} · {siteName}
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10" style={{ background: bg }}>
          {children}
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] leading-relaxed text-white/45">{t.disclaimer}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar**

Run: `npm run build && npm run test:out`
Expected: PASS.

Prévia: abrir `/demo/moda-arte`, `/en/demo/restaurante-terra`, `/es/demo/clinica-sereno` e `/demo/lumi-odonto`. Conferir que cada demo funciona como antes (adicionar ao carrinho, abrir reserva, escolher horário), que os textos da demo mudam com o idioma, que o "voltar" leva a `/#work` (ou `/en#work`) e que o console não tem erros. Trocar a moeda na home para € e abrir a Moda & Arte: os preços da loja aparecem em euro.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Moldura das demos no visual novo, com voltar para a vitrine no idioma certo"
```

---

### Task 9: SEO — metadata, hreflang, sitemap, robots e JSON-LD

**Files:**
- Create: `src/lib/seo.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Modify: `src/demos/route.tsx`, `src/app/(pt)/page.tsx`, `src/app/(intl)/[locale]/page.tsx`, `src/components/home/home-page.tsx`, `tests/out/site.test.ts`

**Interfaces:**
- Consumes: `alternates`, `localizedPath`, `localeInfo`, `messages`, `fill`, `SITE_URL`, `estudio`, `showcase`, `isShowcased`, `demoBySlug`, `ogImage`.
- Produces: `pageMetadata({ locale, path, title, description, index?, translated? }): Metadata`, `homeMetadata(locale): Metadata`, `StudioJsonLd({ locale })`.

- [ ] **Step 1: Testes que falham**

Acrescentar a `tests/out/site.test.ts`:

```ts
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
```

Run: `npm run build && npx vitest run tests/out`
Expected: FAIL (sem hreflang, sem JSON-LD, sem sitemap/robots).

- [ ] **Step 2: Módulo de SEO**

Create `src/lib/seo.tsx`:

```tsx
import type { Metadata } from 'next';
import { localeInfo, type Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { alternates, localizedPath } from '@/i18n/paths';
import { estudio, SITE_URL } from './estudio';
import { ogImage } from './images';

/** Absolute URL without a trailing slash on the home page: https://mxstudioweb.com.br */
export const absoluteUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

export const absoluteAlternates = (path: string) =>
  Object.fromEntries(Object.entries(alternates(path)).map(([lang, p]) => [lang, absoluteUrl(p)]));

export function pageMetadata({
  locale,
  path,
  title,
  description,
  index = true,
  translated = true,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  index?: boolean;
  translated?: boolean;
}): Metadata {
  const url = absoluteUrl(localizedPath(locale, path));
  const image = { url: ogImage(locale), width: 1200, height: 630, alt: title };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, ...(translated ? { languages: absoluteAlternates(path) } : {}) },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: estudio.name,
      locale: localeInfo[locale].og,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const homeMetadata = (locale: Locale) =>
  pageMetadata({ locale, path: '/', title: messages[locale].meta.title, description: messages[locale].meta.description });

export function StudioJsonLd({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: estudio.name,
    url: absoluteUrl(localizedPath(locale, '/')),
    description: messages[locale].meta.description,
    email: estudio.email,
    telephone: estudio.phoneE164,
    image: `${SITE_URL}${ogImage(locale)}`,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    sameAs: [estudio.instagram],
    founder: { '@type': 'Person', name: estudio.owner },
    address: { '@type': 'PostalAddress', addressLocality: 'Rio de Janeiro', addressRegion: 'RJ', addressCountry: 'BR' },
    priceRange: 'R$ 3.500 – R$ 16.000',
    inLanguage: localeInfo[locale].htmlLang,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

- [ ] **Step 3: Usar nas páginas**

Replace `src/app/(pt)/page.tsx`:

```tsx
import { homeMetadata } from '@/lib/seo';
import { HomePage } from '@/components/home/home-page';

export const metadata = homeMetadata('pt');

export default function Page() {
  return <HomePage locale="pt" />;
}
```

Replace `src/app/(intl)/[locale]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { isLocale } from '@/i18n/config';
import { homeMetadata } from '@/lib/seo';
import { HomePage } from '@/components/home/home-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? homeMetadata(locale) : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={isLocale(locale) ? locale : 'en'} />;
}
```

Em `src/components/home/home-page.tsx`, acrescentar `import { StudioJsonLd } from '@/lib/seo';` e, como último filho do `<main>`, `<StudioJsonLd locale={locale} />`.

Replace `src/demos/route.tsx` inteiro:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { fill } from '@/i18n/format';
import { messages } from '@/i18n/messages';
import { demoBySlug, demos, isShowcased, type DemoSlug } from '@/lib/estudio';
import { pageMetadata } from '@/lib/seo';
import { demoComponents } from './registry';

export const demoParams = () => demos.map(({ slug }) => ({ slug }));

const isDemoSlug = (slug: string): slug is DemoSlug => slug in demoBySlug;

export function demoMetadata(locale: Locale, slug: string): Metadata {
  if (!isDemoSlug(slug)) return {};
  const { clientName } = demoBySlug[slug];
  const t = messages[locale].demo;
  return pageMetadata({
    locale,
    path: `/demo/${slug}`,
    title: `${clientName} · ${t.badge} · MX Studio Web`,
    description: fill(t.description, { name: clientName }),
    index: isShowcased(slug),
  });
}

export function DemoPage({ slug }: { slug: string }) {
  if (!isDemoSlug(slug)) notFound();
  const Demo = demoComponents[slug];
  return <Demo />;
}
```

- [ ] **Step 4: Sitemap e robots**

Create `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { localizedPath } from '@/i18n/paths';
import { showcase } from '@/lib/estudio';
import { absoluteAlternates, absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

/** Public, indexable pages only: the home and the six showcased demos, in the three languages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...showcase.map((slug) => `/demo/${slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.6,
      alternates: { languages: absoluteAlternates(path) },
    })),
  );
}
```

Create `src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/estudio';

export const dynamic = 'force-static';

// Everything stays crawlable so the noindex tags on the internal pages can be read.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml` };
}
```

- [ ] **Step 5: Verificar**

Run: `npm run lint && npm test && npm run build && npm run test:out`
Expected: tudo PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "SEO: hreflang, canônicos, imagens de compartilhamento, dados estruturados, sitemap e robots"
```

---

### Task 10: Configuração da Cloudflare e verificação completa

**Files:**
- Create: `wrangler.jsonc`, `public/_headers`
- Replace: `README.md`

- [ ] **Step 1: Wrangler e cabeçalhos**

Run: `npm install -D wrangler`

Create `wrangler.jsonc`:

```jsonc
{
  // Static site only: Cloudflare serves the files Next.js exports to out/.
  "name": "mxstudioweb",
  "compatibility_date": "2026-10-01",
  "assets": {
    "directory": "./out",
    "not_found_handling": "404-page"
  }
}
```

Create `public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

- [ ] **Step 2: README**

Replace `README.md`:

````markdown
# MX Studio Web

Site do estúdio em https://mxstudioweb.com.br — PT (`/`), EN (`/en`) e ES (`/es`), com 10 modelos de demonstração em `/demo/*`.

## Rodar local

```bash
npm install
npm run dev
```

## Antes de publicar

```bash
npm run check   # lint, testes, build estático e testes do HTML gerado
```

## Publicação

Cloudflare Workers (plano grátis) conectado a este repositório: cada push na `main` publica; outras branches geram link de prévia. Configuração em `wrangler.jsonc` (pasta `out/`).

A Vercel só redireciona os endereços antigos (`vercel.json`).

## Imagens

- `npm run shots` — prints reais das páginas no ar (precisa do Microsoft Edge)
- `npm run portrait` — foto do Sobre a partir de `scripts/source/max.jpg`
- `npm run og` — imagens de compartilhamento em `public/og/`

## Onde mudar o quê

- Textos: `src/i18n/messages/{pt,en,es}.ts`
- Preços, vitrine, contato, vagas de fundador: `src/lib/estudio.ts`
````

- [ ] **Step 3: Verificação completa**

Run: `npm run check`
Expected: lint, testes de unidade, build e testes do HTML todos verdes.

Run: `npx wrangler deploy --dry-run`
Expected: lista os assets de `out/` sem erro de configuração (não publica nada).

Run: `du -sh out && find out -type f | wc -l`
Expected: bem abaixo dos limites da Cloudflare (20.000 arquivos, 25 MiB por arquivo).

- [ ] **Step 4: Commit e push da branch**

```bash
git add -A
git commit -m "Configuração da Cloudflare, cabeçalhos de segurança e README"
git push -u origin repaginada-mxstudioweb-com-br
```

---

### Task 11: Colocar no ar na Cloudflare (com o Max)

Tarefa operacional, feita no navegador do app (`mcp__Claude_Browser__*`) com o login da Cloudflare do Max. Cada ação que cria regra permanente, concede permissão ou altera configuração de conta é **confirmada com o Max no chat antes** — inclusive o encaminhamento de e-mail, mesmo já tendo sido pedido.

- [ ] **Step 1: Conferir que o domínio está ativo na Cloudflare**

Run (PowerShell): `nslookup -type=NS mxstudioweb.com.br 1.1.1.1` e `(Invoke-RestMethod https://rdap.registro.br/domain/mxstudioweb.com.br) | Select-Object @{n='ns';e={$_.nameservers.ldhName}}, @{n='dnssec';e={$_.secureDNS.delegationSigned}}`
Expected: `dom.ns.cloudflare.com` e `rosalie.ns.cloudflare.com`; `dnssec` = `False`. Se ainda aparecer `auto.dns.br`, esperar (até 2 h) e repetir.

- [ ] **Step 2: Criar o Worker ligado ao GitHub**

No painel (Max logado): Workers & Pages → Create → Import a repository → GitHub. **Max autoriza** o app da Cloudflare na conta `transformabi` (só o repositório `mx-studio`). Configurar: nome do projeto `mxstudioweb` (igual ao `wrangler.jsonc`), branch de produção `main`, build command `npm run build`, deploy command `npx wrangler deploy`, comando de branches de prévia `npx wrangler versions upload`. Salvar.

Expected: build da branch `repaginada-mxstudioweb-com-br` aparece em Previews com uma URL `*.workers.dev`. (O build da `main` atual pode falhar por não ter `wrangler.jsonc` — esperado até o merge.)

- [ ] **Step 3: Revisar a prévia**

Abrir a URL de prévia: `/`, `/en`, `/es`, `/fundadores`, 2 demos e uma URL inexistente (deve mostrar o 404 com status 404 — `curl -sI <url>/nao-existe`). Rodar o PageSpeed Insights (celular) na URL de prévia da home: meta ≥ 90 em desempenho, acessibilidade, boas práticas e SEO; anotar os números. Mandar o link e os prints ao Max para aprovação antes do merge.

- [ ] **Step 4: Merge para a main (sem redirect da Vercel ainda)**

Com o OK do Max: `gh pr create` da branch para `main` (corpo terminando em `🤖 Generated with [Claude Code](https://claude.com/claude-code)`), fazer o merge. A Cloudflare publica a produção; a Vercel também reconstrói a `main` e passa a mostrar o site novo em `mxstudioweb.vercel.app` — inofensivo e temporário.

- [ ] **Step 5: Ligar o domínio**

Worker `mxstudioweb` → Settings → Domains & Routes → Add → Custom domain: `mxstudioweb.com.br`; repetir para `www.mxstudioweb.com.br`. Depois, em Rules → Redirect Rules, criar a partir do modelo "Redirect from WWW to root" (301, preservando caminho e query).

Run:
```bash
curl -sI https://mxstudioweb.com.br | head -1
curl -sI https://www.mxstudioweb.com.br/fundadores | grep -iE "^(HTTP|location)"
curl -sI https://mxstudioweb.com.br/fundadores/ | grep -iE "^(HTTP|location)"
curl -sI https://mxstudioweb.com.br/demo/moda-arte | head -1
curl -s https://mxstudioweb.com.br/robots.txt
```
Expected: `200`; `301` para `https://mxstudioweb.com.br/fundadores`; a versão com barra cai na página (200 ou 307/308 para sem barra); demo `200`; robots com o sitemap.

- [ ] **Step 6: E-mail contato@ → Gmail**

**Confirmar com o Max no chat** antes de criar a regra. Depois: domínio → Email → Email Routing → Get started. Criar endereço `contato` → ação "Send to an email" → destino `developermaxrj@gmail.com`. Aceitar que a Cloudflare adicione os registros MX e SPF. **Max abre o e-mail de verificação** no Gmail e confirma. Em DNS, adicionar TXT `_dmarc` = `v=DMARC1; p=none`.

Run: `nslookup -type=MX mxstudioweb.com.br 1.1.1.1` e `nslookup -type=TXT mxstudioweb.com.br 1.1.1.1`
Expected: MX `route1/2/3.mx.cloudflare.net`; TXT `v=spf1 include:_spf.mx.cloudflare.net ~all`.

Teste: pedir ao Max para mandar, de um e-mail que **não** seja o developermaxrj@gmail.com, uma mensagem para `contato@mxstudioweb.com.br` e confirmar que chegou no Gmail (o Gmail esconde mensagens que você manda para si mesmo pelo encaminhamento).

- [ ] **Step 7: Google Search Console**

Com o Max logado no Google: adicionar propriedade de domínio `mxstudioweb.com.br`, copiar o TXT de verificação, criar o registro na Cloudflare, verificar e enviar `https://mxstudioweb.com.br/sitemap.xml`.

---

### Task 12: Redirecionar a Vercel e fechar

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Redirect**

Só depois do Step 5 da Tarefa 11 verificado. Create `vercel.json`:

```json
{
  "redirects": [
    { "source": "/:path*", "destination": "https://mxstudioweb.com.br/:path*", "permanent": true }
  ]
}
```

```bash
git switch main && git pull
git switch -c redirect-vercel
git add vercel.json
git commit -m "Vercel passa a redirecionar para mxstudioweb.com.br"
git push -u origin redirect-vercel
gh pr create --title "Vercel redireciona para mxstudioweb.com.br" --body "Redireciona mxstudioweb.vercel.app e max-costa-estudio.vercel.app para o domínio novo.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
gh pr merge --merge
```

- [ ] **Step 2: Verificar os links antigos**

Run:
```bash
curl -sI https://mxstudioweb.vercel.app/fundadores | grep -iE "^(HTTP|location)"
curl -sI https://max-costa-estudio.vercel.app/demo/moda-arte | grep -iE "^(HTTP|location)"
curl -sI https://mx-studio-web.vercel.app/ | head -1
```
Expected: `308` para `https://mxstudioweb.com.br/fundadores`; `308` para `https://mxstudioweb.com.br/demo/moda-arte`; o diagnóstico continua `200` (não muda).

- [ ] **Step 3: Atualizar a nota do Obsidian e avisar o Max**

Em `D:\Obsidian\Meu cérebro\Programação\Perfil Freelancer Independente (Site + Marca Pessoal).md`, atualizar a tabela: Site `https://mxstudioweb.com.br`, Repositório `transformabi/mx-studio` (pasta local `D:\claude\demos`), Instagram `@mxstudioweb`, E-mail `contato@mxstudioweb.com.br` (encaminha para developermaxrj@gmail.com), Hospedagem Cloudflare (grátis). Lembrar o Max de: (1) trocar o link da bio do Instagram para `mxstudioweb.com.br` e `mxstudioweb.com.br/fundadores`; (2) apagar, quando quiser, o projeto `max-costa-estudio` da Vercel (depois de algumas semanas sem acesso).

---

### Task 13 (opcional): Responder como contato@ pelo Gmail

- [ ] **Step 1:** Max cria conta grátis na Brevo (brevo.com) com developermaxrj@gmail.com.
- [ ] **Step 2:** Na Brevo → Senders, Domains & Dedicated IPs → Domains → Add `mxstudioweb.com.br`. Criar na Cloudflare os registros que a Brevo mostrar (TXT `brevo-code`, DKIM). **Trocar** o SPF existente por um único: `v=spf1 include:_spf.mx.cloudflare.net include:spf.brevo.com ~all` (nunca dois registros SPF). Verificar na Brevo.
- [ ] **Step 3:** Na Brevo → SMTP & API → gerar chave SMTP. **O Max** cola a chave no Gmail (Configurações → Contas e importação → Enviar e-mail como → Adicionar: nome "MX Studio Web", e-mail `contato@mxstudioweb.com.br`, desmarcar "Tratar como alias"; SMTP `smtp-relay.brevo.com`, porta 587, TLS, usuário = login SMTP da Brevo, senha = chave). Confirmar pelo código que chega no próprio Gmail.
- [ ] **Step 4:** Teste: o Max responde um e-mail escolhendo "De: contato@mxstudioweb.com.br" e confere, no destinatário, "Mostrar original" → SPF, DKIM e DMARC = PASS.
