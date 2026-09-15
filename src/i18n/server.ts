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

export function getLocale(): Locale {
  const saved = cookies().get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;
  return fromAcceptLanguage(headers().get('accept-language'));
}

export function getCurrency(locale: Locale): Currency {
  const saved = cookies().get(CURRENCY_COOKIE)?.value;
  return isCurrency(saved) ? saved : defaultCurrency[locale];
}

export async function getI18n() {
  const locale = getLocale();
  const currency = getCurrency(locale);
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
