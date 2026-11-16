'use client';

import { useSyncExternalStore } from 'react';
import type { Messages } from '@/i18n/messages';
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

export function CampaignBar({ t }: { t: Messages['campaign'] }) {
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
      <div className="container-site flex flex-col items-center gap-2 py-2.5 sm:flex-row sm:justify-between sm:gap-6 sm:py-2">
        <div className="text-center sm:text-left">
          <p className="font-label text-xs font-bold uppercase tracking-[0.18em]">{t.banner}</p>
          <p className="text-[13px] font-semibold leading-tight sm:mt-0.5">{t.bar}</p>
        </div>

        {clock?.done ? (
          <p className="font-label text-sm font-bold uppercase tracking-[0.14em]">
            {saoPauloDate() === '2026-11-27' ? t.countdown.today : t.countdown.late}
          </p>
        ) : (
          <ol aria-label={t.countdown.live} className="flex justify-center gap-1.5">
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
      </div>
    </div>
  );
}
