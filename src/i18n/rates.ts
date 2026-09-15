import type { Rates } from './format';

// Used when the rates API is unreachable (BRL → currency, Sep/2026).
const fallbackRates: Rates = { BRL: 1, USD: 0.1947, EUR: 0.1686, GBP: 0.1442, BTC: 0.00000247 };

export async function getRates(): Promise<Rates> {
  try {
    const res = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=BRL', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return fallbackRates;

    const { data } = (await res.json()) as { data: { rates: Record<string, string> } };
    const rates: Rates = { ...fallbackRates };
    for (const code of ['USD', 'EUR', 'GBP', 'BTC'] as const) {
      const value = Number(data.rates[code]);
      if (!Number.isFinite(value) || value <= 0) return fallbackRates;
      rates[code] = value;
    }
    return rates;
  } catch {
    return fallbackRates;
  }
}
