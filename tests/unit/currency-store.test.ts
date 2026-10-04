import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('currency store', () => {
  it('remembers the choice in localStorage', async () => {
    const data = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, v),
    });
    const store = await import('@/i18n/currency-store');
    store.saveCurrency('EUR');
    expect(store.readSavedCurrency()).toBe('EUR');
  });

  it('still switches for the session when storage is blocked', async () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    });
    const store = await import('@/i18n/currency-store');
    expect(store.readSavedCurrency()).toBeNull();
    store.saveCurrency('USD');
    expect(store.readSavedCurrency()).toBe('USD');
  });

  it('ignores values that are not offered currencies', async () => {
    vi.stubGlobal('localStorage', { getItem: () => 'BTC', setItem: () => {} });
    const store = await import('@/i18n/currency-store');
    expect(store.readSavedCurrency()).toBeNull();
  });
});
