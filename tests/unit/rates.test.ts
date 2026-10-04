import { afterEach, describe, expect, it, vi } from 'vitest';
import { fallbackRates, getRates } from '@/i18n/rates';

afterEach(() => vi.unstubAllGlobals());

describe('getRates', () => {
  it('falls back when the rates API is down, so the build never breaks', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    expect(await getRates()).toEqual(fallbackRates);
  });
  it('reads the fiat rates the site offers', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: { rates: { USD: '0.18', EUR: '0.16', GBP: '0.14', BTC: '0.000002' } } }),
      }),
    );
    expect(await getRates()).toEqual({ BRL: 1, USD: 0.18, EUR: 0.16, GBP: 0.14 });
  });
});
