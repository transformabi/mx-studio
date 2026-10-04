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

/**
 * Spanish (es-ES) has no symbol for BRL and GBP and prints the ISO code ("3500 BRL"), unlike USD and EUR.
 * narrowSymbol gives "R$" and "£" there and changes nothing in pt-BR or en-US. It stays off for USD:
 * it would turn "US$" into a bare "$" in Spanish and Portuguese.
 */
const narrowSymbol: ReadonlySet<Currency> = new Set(['BRL', 'GBP']);

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
    currencyDisplay: narrowSymbol.has(currency) ? 'narrowSymbol' : 'symbol',
    notation: opts.compact ? 'compact' : 'standard',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Replaces {placeholders} in a message. */
export const fill = (message: string, vars: Record<string, string | number>) =>
  message.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
