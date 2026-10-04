'use client';

import { currencies, currencySymbol } from '@/i18n/config';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export function CurrencySwitch({ label }: { label: string }) {
  const { currency, setCurrency } = useI18n();
  return (
    <div className="flex items-center gap-3">
      <span id="currency-label" className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </span>
      <div role="radiogroup" aria-labelledby="currency-label" className="flex rounded-full border border-white/15 p-1">
        {currencies.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={currency === c}
            onClick={() => setCurrency(c)}
            className={cn(
              'rounded-full px-3.5 py-1.5 font-label text-xs transition-colors',
              currency === c ? 'bg-bone text-ink' : 'text-white/60 hover:text-bone',
            )}
          >
            {currencySymbol[c]}
          </button>
        ))}
      </div>
    </div>
  );
}
