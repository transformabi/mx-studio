import { CURRENCY_STORAGE_KEY, isCurrency, type Currency } from './config';

// The visitor's currency is a per-browser convenience. Storage can be missing or throw
// (private windows, blocked site data), so the choice also lives in memory for the session.
let memory: Currency | null = null;
const listeners = new Set<() => void>();

export function readSavedCurrency(): Currency | null {
  try {
    const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (isCurrency(saved)) return saved;
  } catch {
    // fall through to the in-memory value
  }
  return memory;
}

export function saveCurrency(currency: Currency) {
  memory = currency;
  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  } catch {
    // the in-memory value still applies for this session
  }
  listeners.forEach((notify) => notify());
}

export function subscribeCurrency(notify: () => void) {
  listeners.add(notify);
  window.addEventListener('storage', notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener('storage', notify);
  };
}
