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
