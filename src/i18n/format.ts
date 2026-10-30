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

/** Most prices in the codebase are written in BRL and converted at display time. */
export function formatMoney(
  brl: number,
  locale: Locale,
  currency: Currency,
  rates: Rates,
  opts: MoneyOptions = {},
) {
  return formatConverted(brl, 'BRL', locale, currency, rates, opts);
}

/**
 * A price written in `from` (e.g. the EUR small-business plans), shown in the visitor's currency.
 * Rates are BRL-based, so the amount goes through BRL. Shown in its own currency it stays exact.
 */
export function formatConverted(
  amount: number,
  from: Currency,
  locale: Locale,
  currency: Currency,
  rates: Rates,
  opts: MoneyOptions = {},
) {
  return formatValue(convertedValue(amount, from, currency, rates, opts), locale, currency, opts);
}

/** The converted number behind formatConverted, with the same rounding. */
export function convertedValue(amount: number, from: Currency, currency: Currency, rates: Rates, opts: MoneyOptions = {}) {
  let value = currency === from ? amount : (amount / rates[from]) * rates[currency];
  if (opts.round && currency !== from && value >= 100) value = Math.round(value / 10) * 10;
  else if (opts.round && currency !== from && opts.decimals === 0) value = Math.round(value);
  return value;
}

function formatValue(value: number, locale: Locale, currency: Currency, opts: MoneyOptions) {
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

/**
 * Splits `amount` by `percents` and shows each part in the visitor's currency. The parts are cut from the
 * converted total shown on the plan (rounded to whole units, not tens), and the last one takes the
 * difference, so they always add up to that total. In BRL this gives the exact Stripe stage amounts.
 */
export function formatSplit(
  amount: number,
  percents: number[],
  from: Currency,
  locale: Locale,
  currency: Currency,
  rates: Rates,
  opts: MoneyOptions = {},
) {
  const total = convertedValue(amount, from, currency, rates, opts);
  let used = 0;
  return percents.map((pct, i) => {
    const value = i === percents.length - 1 ? total - used : Math.round((total * pct) / 100);
    used += value;
    return formatValue(value, locale, currency, opts);
  });
}

/** Replaces {placeholders} in a message. */
export const fill = (message: string, vars: Record<string, string | number>) =>
  message.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
