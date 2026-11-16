import { describe, expect, it } from 'vitest';
import { campaignOpen, countdownToBlackFriday, daysUntilBlackFriday, saoPauloDate } from '@/lib/black-friday';

const at = (iso: string) => new Date(iso);

describe('black friday campaign', () => {
  it('uses the São Paulo calendar, not UTC', () => {
    // 01:30 UTC on 1 Dec is still 30 Nov in Rio (UTC−3).
    expect(saoPauloDate(at('2026-12-01T01:30:00Z'))).toBe('2026-11-30');
    expect(campaignOpen(at('2026-12-01T01:30:00Z'))).toBe(true);
    expect(campaignOpen(at('2026-12-01T03:00:00Z'))).toBe(false);
  });

  it('counts days until 27 November and closes after 30 November', () => {
    expect(daysUntilBlackFriday(at('2026-11-16T15:00:00Z'))).toBe(11);
    expect(daysUntilBlackFriday(at('2026-11-27T15:00:00Z'))).toBe(0);
    expect(daysUntilBlackFriday(at('2026-11-28T15:00:00Z'))).toBe(-1);
    expect(campaignOpen(at('2026-11-16T15:00:00Z'))).toBe(true);
    expect(campaignOpen(at('2026-11-30T15:00:00Z'))).toBe(true);
  });

  it('ticks down to midnight at the start of 27 November in São Paulo', () => {
    expect(countdownToBlackFriday(Date.parse('2026-11-16T08:00:00-03:00'))).toEqual({
      days: 10,
      hours: 16,
      minutes: 0,
      seconds: 0,
      done: false,
    });
    expect(countdownToBlackFriday(Date.parse('2026-11-26T23:59:59-03:00'))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      done: false,
    });
    expect(countdownToBlackFriday(Date.parse('2026-11-27T00:00:00-03:00')).done).toBe(true);
  });
});
