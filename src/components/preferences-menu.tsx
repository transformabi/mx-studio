'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { currencies, currencySymbol, localeInfo, locales } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import { useI18n } from '@/i18n/provider';

export function PreferencesMenu({ t }: { t: Messages['prefs'] }) {
  const { locale, currency, setLocale, setCurrency, pending } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.label}
        aria-expanded={open}
        aria-controls="estudio-prefs"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white',
          pending && 'animate-pulse',
        )}
      >
        <Globe className="h-3.5 w-3.5" aria-hidden />
        <span>{localeInfo[locale].short}</span>
        <span className="h-3 w-px bg-white/20" aria-hidden />
        <span>{currencySymbol[currency]}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 text-white/50 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id="estudio-prefs"
          className="absolute right-0 top-[calc(100%+12px)] z-50 w-64 rounded-2xl border border-white/10 bg-black/95 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        >
          <Group label={t.language}>
            {locales.map((l) => (
              <Option
                key={l}
                selected={l === locale}
                aside={localeInfo[l].short}
                lang={localeInfo[l].htmlLang}
                onSelect={() => {
                  setOpen(false);
                  if (l !== locale) setLocale(l);
                }}
              >
                {localeInfo[l].name}
              </Option>
            ))}
          </Group>

          <div className="mx-2 my-2 h-px bg-white/10" />

          <Group label={t.currency}>
            {currencies.map((c) => (
              <Option
                key={c}
                selected={c === currency}
                aside={currencySymbol[c]}
                onSelect={() => {
                  setOpen(false);
                  if (c !== currency) setCurrency(c);
                }}
              >
                {t.currencies[c]}
              </Option>
            ))}
          </Group>

          <p className="px-3 pb-1 pt-2 text-[10px] leading-relaxed text-white/40">{t.ratesNote}</p>
        </div>
      )}
    </div>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label}>
      <div className="px-3 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
        {label}
      </div>
      {children}
    </div>
  );
}

function Option({
  selected,
  aside,
  lang,
  onSelect,
  children,
}: {
  selected: boolean;
  aside: string;
  lang?: string;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      lang={lang}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors',
        selected ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white',
      )}
    >
      <span className="w-7 font-mono text-[11px] text-white/45">{aside}</span>
      <span className="flex-1">{children}</span>
      {selected && <Check className="h-4 w-4 text-[#c6ff3b]" aria-hidden />}
    </button>
  );
}
