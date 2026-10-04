import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { localeInfo } from '@/i18n/config';
import { SITE_URL } from '@/lib/estudio';
import { fontVariables } from '@/lib/fonts';
import { RevealNoScript } from '@/components/reveal-noscript';
import { SiteChrome } from '@/components/site/site-chrome';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={localeInfo.pt.htmlLang} className={fontVariables}>
      <head>
        <RevealNoScript />
      </head>
      <body>
        <SiteChrome locale="pt">{children}</SiteChrome>
      </body>
    </html>
  );
}
