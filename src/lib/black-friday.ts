/** Inclusive last day of the November 2026 campaign, in America/Sao_Paulo. */
export const BLACK_FRIDAY_END = '2026-11-30';
/** Friday, 27 November 2026. */
export const BLACK_FRIDAY_DAY = '2026-11-27';

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
