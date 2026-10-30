import { describe, expect, it } from 'vitest';
import {
  clientCases,
  demos,
  diagnosticoUrl,
  estudio,
  lcpSeconds,
  planoCheckoutUrl,
  planos,
  planoSchedule,
  planoStageDay,
  showcase,
  SITE_URL,
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

describe('plan checkout links', () => {
  it('has its own Stripe links per plan and language, with the checkout language set', () => {
    const all: string[] = [];
    for (const plan of planos) {
      const urls = plan.checkout;
      expect(Object.keys(urls).sort()).toEqual(['en', 'es', 'pt']);
      for (const url of Object.values(urls)) expect(url).toMatch(/^https:\/\/buy\.stripe\.com\/[A-Za-z0-9]+$/);
      all.push(...Object.values(urls));
      expect(plan).not.toHaveProperty('pixCheckout');
    }
    expect(new Set(all).size).toBe(9);
    const urls = { pt: 'https://buy.stripe.com/p', en: 'https://buy.stripe.com/e', es: 'https://buy.stripe.com/s' };
    expect(planoCheckoutUrl(urls, 'pt')).toBe('https://buy.stripe.com/p?locale=pt-BR');
    expect(planoCheckoutUrl(urls, 'en')).toBe('https://buy.stripe.com/e?locale=en');
    expect(planoCheckoutUrl(urls, 'es')).toBe('https://buy.stripe.com/s?locale=es');
  });
});

describe('setup payment schedule (Terms v1.1, section 4)', () => {
  it('splits each plan setup into stages that add up to 100%', () => {
    for (const plan of planos) {
      const stages = planoSchedule[plan.id];
      expect(Object.values(stages).reduce((a, b) => a + (b ?? 0), 0)).toBe(100);
      expect(stages.approval).toBeGreaterThan(0);
      expect(stages.delivery).toBeGreaterThan(0);
    }
    expect(planoSchedule.launch).toEqual({ approval: 50, delivery: 50 });
    expect(planoSchedule.business).toEqual({ approval: 50, delivery: 50 });
    expect(planoSchedule.growth).toEqual({ approval: 40, layout: 30, delivery: 30 });
    expect(planoStageDay).toEqual({ approval: 0, layout: 7, delivery: 14 });
  });
});
