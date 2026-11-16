'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/paths';
import { campaignOpen, countdownToBlackFriday, saoPauloDate, type Countdown } from '@/lib/black-friday';

/**
 * Yellow-and-black Black Friday strip. The clock ticks every second until
 * 00:00 on 27 Nov 2026 (São Paulo). Prices are not part of this component.
 * The bar leaves the page after 30 Nov.
 */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

let cachedSecond = -1;
let cachedSnap = '';

function clockSnapshot() {
  const second = Math.floor(Date.now() / 1000);
  if (second === cachedSecond) return cachedSnap;
  cachedSecond = second;
  cachedSnap = campaignOpen() ? JSON.stringify(countdownToBlackFriday()) : 'off';
  return cachedSnap;
}

export function CampaignBar({ locale, t }: { locale: Locale; t: Messages['campaign'] }) {
  const snap = useSyncExternalStore(subscribe, clockSnapshot, () => '');
  if (snap === 'off') return null;

  const clock: Countdown | null = snap ? (JSON.parse(snap) as Countdown) : null;
  const units = [
    [clock?.days, t.countdown.days],
    [clock?.hours, t.countdown.hours],
    [clock?.minutes, t.countdown.minutes],
    [clock?.seconds, t.countdown.seconds],
  ] as const;

  return (
    <div data-bf-bar className="bg-[#FFE500] text-[#111]">
      <div className="container-site grid items-center gap-2 py-2.5 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-x-6 sm:py-2">
        <div className="flex items-center justify-between gap-3 sm:block">
          <p className="font-label text-xs font-bold uppercase tracking-[0.18em]">{t.banner}</p>
          <p className="text-[13px] font-semibold leading-tight sm:mt-0.5">{t.bar}</p>
          <Link
            href={`${localizedPath(locale, '/')}#planos`}
            className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-[#111] px-3.5 text-sm font-bold text-[#FFE500] sm:hidden"
          >
            {t.cta}
          </Link>
        </div>

        {clock?.done ? (
          <p className="font-label text-sm font-bold uppercase tracking-[0.14em] sm:justify-self-end">
            {saoPauloDate() === '2026-11-27' ? t.countdown.today : t.countdown.late}
          </p>
        ) : (
          <ol aria-label={t.countdown.live} className="flex justify-center gap-1.5 sm:justify-self-end">
            {units.map(([value, label]) => (
              <li
                key={label}
                className="grid min-w-[3.15rem] place-items-center rounded-md bg-[#111] px-1.5 py-1 text-[#FFE500]"
              >
                <span data-bf-part className="font-label text-lg font-bold tabular-nums leading-none">
                  {value == null ? '--' : String(value).padStart(2, '0')}
                </span>
                <span className="mt-1 font-label text-[10px] uppercase tracking-[0.12em] text-[#FFE500]/75">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        )}

        <Link
          href={`${localizedPath(locale, '/')}#planos`}
          className="hidden min-h-10 items-center rounded-full bg-[#111] px-3.5 text-sm font-bold text-[#FFE500] sm:inline-flex"
        >
          {t.cta}
        </Link>
      </div>
    </div>
  );
}
