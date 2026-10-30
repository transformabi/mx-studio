import { describe, expect, it } from 'vitest';
import {
  clientCases,
  demos,
  diagnosticoUrl,
  estudio,
  lcpSeconds,
  planoCheckoutUrl,
  planos,
  showcase,
  SITE_URL,
  vagasRestantes,
} from '@/lib/estudio';

describe('studio data', () => {
  it('uses the new domain and e-mail', () => {
    expect(SITE_URL).toBe('https://mxstudioweb.com.br');
    expect(estudio.email).toBe('contato@mxstudioweb.com.br');
  });

  it('shows Sulamita as the only real client', () => {
    expect(clientCases.map((c) => c.clientName)).toEqual(['Sulamita Nascimento']);
  });

  it('showcases only the six demos with real photography', () => {
    expect([...showcase].sort()).toEqual(
      ['clinica-sereno', 'costa-imoveis', 'moda-arte', 'motta-advogados', 'restaurante-terra', 'rota-clara'].sort(),
    );
    for (const slug of showcase) {
      expect(demos.some((d) => d.slug === slug)).toBe(true);
      expect(lcpSeconds[slug]).toBeGreaterThan(0);
      // Rounded (up) to 0.1 s, as the cards show one decimal.
      expect(lcpSeconds[slug] * 10).toBeCloseTo(Math.round(lcpSeconds[slug] * 10), 9);
    }
  });
});

describe('diagnosis link', () => {
  it('stays on this domain and opens the plans in the same tab', () => {
    expect(diagnosticoUrl('pt')).toBe('/#planos');
    expect(diagnosticoUrl('en')).toBe('/en#planos');
    expect(diagnosticoUrl('es')).toBe('/es#planos');
    for (const locale of ['pt', 'en', 'es'] as const) {
      expect(diagnosticoUrl(locale)).not.toMatch(/vercel/i);
    }
  });
});

describe('founder slots wording', () => {
  const text = (n: number) => {
    const v = vagasRestantes(n);
    return `${v.verb} ${v.count}. ${v.tail}`;
  };

  it('agrees in number with the slots left', () => {
    // At 0 the page shows the sold-out headline instead; the helper still never says "0 vaga".
    expect(vagasRestantes(0)).toMatchObject({ verb: 'Restam', count: '0 vagas' });
    expect(text(1)).toBe('Resta 1 vaga. Ela pode ser sua.');
    expect(text(2)).toBe('Restam 2 vagas. Uma pode ser sua.');
  });
});

describe('plan checkout links', () => {
  it('points every plan at a live Stripe Payment Link with the page locale', () => {
    for (const plan of planos) expect(plan.checkout).toMatch(/^https:\/\/buy\.stripe\.com\/[A-Za-z0-9]+$/);
    expect(new Set(planos.map((p) => p.checkout)).size).toBe(3);
    expect(planoCheckoutUrl('https://buy.stripe.com/x', 'pt')).toBe('https://buy.stripe.com/x?locale=pt-BR');
    expect(planoCheckoutUrl('https://buy.stripe.com/x', 'en')).toBe('https://buy.stripe.com/x?locale=en');
    expect(planoCheckoutUrl('https://buy.stripe.com/x', 'es')).toBe('https://buy.stripe.com/x?locale=es');
  });
});
