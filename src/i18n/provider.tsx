'use client';

import { createContext, useContext, useMemo, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  COOKIE_MAX_AGE,
  CURRENCY_COOKIE,
  LOCALE_COOKIE,
  localeInfo,
  type Currency,
  type Locale,
} from './config';
import { formatMoney, type MoneyOptions, type Rates } from './format';

type I18nValue = {
  locale: Locale;
  currency: Currency;
  /** BCP 47 tag for Intl / toLocaleDateString. */
  intl: string;
  money: (brl: number, opts?: MoneyOptions) => string;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: Currency) => void;
  pending: boolean;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  currency,
  rates,
  children,
}: {
  locale: Locale;
  currency: Currency;
  rates: Rates;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const value = useMemo<I18nValue>(() => {
    // The server reads the cookie, so a refresh re-renders everything in the new language.
    const save = (name: string, v: string) => {
      document.cookie = `${name}=${v}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
      startTransition(() => router.refresh());
    };
    return {
      locale,
      currency,
      intl: localeInfo[locale].intl,
      money: (brl, opts) => formatMoney(brl, locale, currency, rates, opts),
      setLocale: (l) => save(LOCALE_COOKIE, l),
      setCurrency: (c) => save(CURRENCY_COOKIE, c),
      pending,
    };
  }, [locale, currency, rates, pending, router]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
