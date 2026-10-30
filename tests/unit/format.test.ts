import { describe, expect, it } from 'vitest';
import { currencies } from '@/i18n/config';
import { convertedValue, fill, formatConverted, formatMoney, formatSplit, type Rates } from '@/i18n/format';

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

  it('shows symbols, not ISO codes, for reais and pounds in Spanish', () => {
    expect(plain(formatMoney(3500, 'es', 'BRL', rates, { decimals: 0 }))).toBe('3500 R$');
    expect(plain(formatMoney(3400, 'es', 'GBP', rates, { decimals: 0, round: true }))).toBe('510 £');
    expect(plain(formatMoney(4900, 'es', 'GBP', rates, { compact: true }))).not.toMatch(/GBP/);
  });

  it('keeps US$ in Spanish and Portuguese, where a bare $ would be ambiguous', () => {
    expect(plain(formatMoney(4900, 'es', 'USD', rates, { decimals: 0, round: true }))).toBe('980 US$');
    expect(plain(formatMoney(4900, 'pt', 'USD', rates, { decimals: 0, round: true }))).toBe('US$ 980');
  });

  it('leaves Portuguese and English symbols as they were', () => {
    expect(plain(formatMoney(4900, 'pt', 'GBP', rates, { decimals: 0, round: true }))).toBe('£ 740');
    expect(plain(formatMoney(4900, 'pt', 'EUR', rates, { decimals: 0, round: true }))).toBe('€ 830');
    expect(formatMoney(3500, 'en', 'BRL', rates, { decimals: 0 })).toBe('R$3,500');
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

describe('formatConverted', () => {
  const opts = { decimals: 0, round: true } as const;
  it('keeps a euro price exact when shown in euros', () => {
    expect(plain(formatConverted(150, 'EUR', 'pt', 'EUR', rates, opts))).toBe('€ 150');
    expect(formatConverted(25, 'EUR', 'en', 'EUR', rates, opts)).toBe('€25');
    expect(plain(formatConverted(35, 'EUR', 'pt', 'EUR', rates, opts))).toBe('€ 35');
    expect(plain(formatConverted(650, 'EUR', 'es', 'EUR', rates, opts))).toBe('650 €');
  });
  it('converts a euro price through the BRL-based rates and rounds it', () => {
    expect(plain(formatConverted(150, 'EUR', 'pt', 'BRL', rates, opts))).toBe('R$ 880');
    expect(formatConverted(20, 'EUR', 'en', 'USD', rates, opts)).toBe('$24');
    expect(formatConverted(150, 'EUR', 'en', 'GBP', rates, opts)).toBe('£130');
  });
});

describe('formatSplit', () => {
  const opts = { decimals: 0, round: true } as const;
  const num = (s: string) => Number(s.replace(/[^\d]/g, ''));
  it('keeps exact euro parts when shown in euros', () => {
    expect(formatSplit(650, [40, 30, 30], 'EUR', 'en', 'EUR', rates, opts)).toEqual(['€260', '€195', '€195']);
    expect(formatSplit(150, [50, 50], 'EUR', 'en', 'EUR', rates, opts)).toEqual(['€75', '€75']);
  });
  it('makes converted parts add up to the converted total shown on the plan', () => {
    for (const [amount, percents] of [[150, [50, 50]], [350, [50, 50]], [650, [40, 30, 30]]] as const) {
      for (const currency of ['BRL', 'USD', 'GBP'] as const) {
        const parts = formatSplit(amount, [...percents], 'EUR', 'en', currency, rates, opts).map(num);
        expect(parts.reduce((a, b) => a + b, 0)).toBe(convertedValue(amount, 'EUR', currency, rates, opts));
      }
    }
  });
});

describe('formatSplit in reais', () => {
  it('matches the Stripe stage amounts for the BRL plan totals', () => {
    const r: Rates = { BRL: 1, USD: 0.2, EUR: 1 / 6.03, GBP: 0.15 };
    const opts = { decimals: 0, round: true } as const;
    const n = (s: string) => Number(s.replace(/[^\d]/g, ''));
    expect(formatSplit(650, [40, 30, 30], 'EUR', 'pt', 'BRL', r, opts).map(n)).toEqual([1568, 1176, 1176]);
    expect(formatSplit(350, [50, 50], 'EUR', 'pt', 'BRL', r, opts).map(n)).toEqual([1055, 1055]);
    expect(formatSplit(150, [50, 50], 'EUR', 'pt', 'BRL', r, opts).map(n)).toEqual([450, 450]);
  });
});
