export const locales = ['pt', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';
/** Served under a prefix (/en, /es); Portuguese lives at the root. */
export const prefixedLocales = ['en', 'es'] as const satisfies readonly Locale[];

/** Currencies the studio is paid in (PIX/card in BRL, Wise for the rest). */
export const currencies = ['BRL', 'USD', 'EUR', 'GBP'] as const;
export type Currency = (typeof currencies)[number];

export const CURRENCY_STORAGE_KEY = 'mx-currency';

export const localeInfo: Record<
  Locale,
  { name: string; short: string; htmlLang: string; intl: string; og: string }
> = {
  pt: { name: 'Português', short: 'PT', htmlLang: 'pt-BR', intl: 'pt-BR', og: 'pt_BR' },
  en: { name: 'English', short: 'EN', htmlLang: 'en', intl: 'en-US', og: 'en_US' },
  es: { name: 'Español', short: 'ES', htmlLang: 'es', intl: 'es-ES', og: 'es_ES' },
};

export const currencySymbol: Record<Currency, string> = {
  BRL: 'R$',
  USD: 'US$',
  EUR: '€',
  GBP: '£',
};

/** Currency shown until the visitor picks one. */
export const defaultCurrency: Record<Locale, Currency> = { pt: 'BRL', en: 'USD', es: 'USD' };

export const isLocale = (v: unknown): v is Locale =>
  typeof v === 'string' && (locales as readonly string[]).includes(v);

export const isCurrency = (v: unknown): v is Currency =>
  typeof v === 'string' && (currencies as readonly string[]).includes(v);
