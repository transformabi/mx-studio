/** Inclusive last day of the November 2026 campaign, in America/Sao_Paulo. */
export const BLACK_FRIDAY_END = '2026-11-30';
/** Friday, 27 November 2026. */
export const BLACK_FRIDAY_DAY = '2026-11-27';
/** Midnight at the start of 27 Nov 2026 in São Paulo (UTC−3, no daylight saving). */
export const BLACK_FRIDAY_AT = Date.parse('2026-11-27T00:00:00-03:00');

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

/** Calendar date in São Paulo as YYYY-MM-DD. */
export function saoPauloDate(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function campaignOpen(now = new Date()): boolean {
  return saoPauloDate(now) <= BLACK_FRIDAY_END;
}

/** Whole days from today (São Paulo) until Black Friday. Negative after that Friday. */
export function daysUntilBlackFriday(now = new Date()): number {
  const today = Date.parse(`${saoPauloDate(now)}T00:00:00Z`);
  const friday = Date.parse(`${BLACK_FRIDAY_DAY}T00:00:00Z`);
  return Math.round((friday - today) / 86_400_000);
}

/** Live clock until 00:00 on 27 Nov 2026, São Paulo. */
export function countdownToBlackFriday(now = Date.now()): Countdown {
  const ms = BLACK_FRIDAY_AT - now;
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}
