import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { I18nProvider } from '@/i18n/provider';
import { getRates } from '@/i18n/rates';
import { Footer } from './footer';
import { Header } from './header';

/** Everything inside <body> that the Portuguese and the /en, /es root layouts share. */
export async function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const rates = await getRates();
  const t = messages[locale];
  return (
    <I18nProvider locale={locale} rates={rates}>
      <Header locale={locale} t={t.nav} />
      {children}
      <Footer locale={locale} t={t} />
    </I18nProvider>
  );
}
