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
