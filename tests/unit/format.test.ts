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
