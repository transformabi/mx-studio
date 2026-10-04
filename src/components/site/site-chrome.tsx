import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import { I18nProvider } from '@/i18n/provider';
import { getRates } from '@/i18n/rates';

/** Everything inside <body> that the Portuguese and the /en, /es root layouts share. */
export async function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const rates = await getRates();
  return (
    <I18nProvider locale={locale} rates={rates}>
      {children}
    </I18nProvider>
  );
}
