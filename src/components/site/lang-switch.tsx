'use client';

import { usePathname } from 'next/navigation';
import { localeInfo, locales } from '@/i18n/config';
import { switchLocalePath } from '@/i18n/paths';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';

/** Plain links, not buttons: each language is its own crawlable URL. */
export function LangSwitch({ label }: { label: string }) {
  const pathname = usePathname();
  const { locale } = useI18n();

  return (
    <nav aria-label={label} className="flex items-center font-label text-xs">
      {locales.map((l) => (
        // The link is a 40px tap target; the visible pill inside it keeps its original size.
        <a
          key={l}
          href={switchLocalePath(pathname, l)}
          hrefLang={localeInfo[l].htmlLang}
          lang={localeInfo[l].htmlLang}
          aria-current={l === locale ? 'true' : undefined}
          className={cn(
            'inline-flex min-h-10 min-w-10 items-center justify-center rounded-full transition-colors',
            l === locale ? 'text-bone' : 'text-white/50 hover:text-bone',
          )}
        >
          <span className={cn('rounded-full px-2.5 py-1.5', l === locale && 'bg-white/10')}>{localeInfo[l].short}</span>
        </a>
      ))}
    </nav>
  );
}
