'use client';

import { useI18n } from '@/i18n/provider';

/** A BRL price shown in the visitor's currency; converted values are marked as approximate. */
export function Price({ brl, className }: { brl: number; className?: string }) {
  const { money, currency } = useI18n();
  const value = money(brl, { decimals: 0, round: true });
  return <span className={className}>{currency === 'BRL' ? value : `≈ ${value}`}</span>;
}
