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
      <Header locale={locale} t={t.nav} campaign={t.campaign} />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var END=Date.parse("2026-11-27T00:00:00-03:00");var HIDE=Date.parse("2026-12-01T03:00:00Z");function pad(n){return String(n).padStart(2,"0")}function tick(){var bar=document.querySelector("[data-bf-bar]");if(!bar)return;if(Date.now()>=HIDE){bar.remove();return}var s=Math.floor(Math.max(0,END-Date.now())/1000);var parts=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];var nodes=bar.querySelectorAll("[data-bf-part]");for(var i=0;i<nodes.length;i++)nodes[i].textContent=pad(parts[i])}tick();setInterval(tick,1000)})();`,
        }}
      />
      {children}
      <Footer locale={locale} t={t} />
    </I18nProvider>
  );
}
