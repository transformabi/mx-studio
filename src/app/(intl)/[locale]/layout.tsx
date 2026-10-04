import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../../globals.css';
import { defaultLocale, isLocale, localeInfo, prefixedLocales } from '@/i18n/config';
import { SITE_URL } from '@/lib/estudio';
import { fontVariables } from '@/lib/fonts';
import { SiteChrome } from '@/components/site/site-chrome';

export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  return (
    <html lang={localeInfo[locale].htmlLang} className={fontVariables}>
      <body>
        <SiteChrome locale={locale}>{children}</SiteChrome>
      </body>
    </html>
  );
}
