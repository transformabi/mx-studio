import { cookies, headers } from 'next/headers';
import {
  CURRENCY_COOKIE,
  LOCALE_COOKIE,
  defaultCurrency,
  defaultLocale,
  isCurrency,
  isLocale,
  type Currency,
  type Locale,
} from './config';
import { formatMoney, type MoneyOptions } from './format';
import { messages } from './messages';
import { getRates } from './rates';

export async function getLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;
  return fromAcceptLanguage((await headers()).get('accept-language'));
}

export async function getCurrency(locale: Locale): Promise<Currency> {
  const saved = (await cookies()).get(CURRENCY_COOKIE)?.value;
  return isCurrency(saved) ? saved : defaultCurrency[locale];
}

export async function getI18n() {
  const locale = await getLocale();
  const currency = await getCurrency(locale);
  const rates = await getRates();
  return {
    locale,
    currency,
    rates,
    t: messages[locale],
    money: (brl: number, opts?: MoneyOptions) => formatMoney(brl, locale, currency, rates, opts),
  };
}

function fromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const match = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((entry) => isLocale(entry.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}
