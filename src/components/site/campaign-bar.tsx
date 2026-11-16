'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/config';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/paths';
import { campaignOpen, daysUntilBlackFriday } from '@/lib/black-friday';

/**
 * November 2026 strip. Prices are not part of this component.
 * Rendered in the static HTML, then removed on the client after 30 Nov so a
 * build from mid-November does not keep the bar into December.
 */
export function CampaignBar({ locale, t }: { locale: Locale; t: Messages['campaign'] }) {
  const [on, setOn] = useState(true);
  const [status, setStatus] = useState(t.countdown.until);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!campaignOpen()) {
        setOn(false);
        return;
      }
      const days = daysUntilBlackFriday();
      if (days > 1) setStatus(fill(t.countdown.many, { n: days }));
      else if (days === 1) setStatus(t.countdown.one);
      else if (days === 0) setStatus(t.countdown.today);
      else setStatus(t.countdown.late);
    }, 0);
    return () => window.clearTimeout(id);
  }, [t]);

  if (!on) return null;

  return (
    <div className="border-b border-lime/30 bg-[#10140c]">
      <div className="container-site flex flex-wrap items-center justify-between gap-x-5 gap-y-1 py-2">
        <p className="font-label text-[11px] uppercase tracking-[0.16em] text-lime">
          {t.kicker}
          <span className="mt-1 block normal-case tracking-normal text-white/55 sm:mt-0 sm:ml-3 sm:inline">
            {status}
          </span>
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-bone">
          <span>{t.bar}</span>
          <Link
            href={`${localizedPath(locale, '/')}#planos`}
            className="inline-flex min-h-10 items-center font-semibold text-lime underline-offset-4 hover:underline"
          >
            {t.cta}
          </Link>
        </p>
      </div>
    </div>
  );
}
