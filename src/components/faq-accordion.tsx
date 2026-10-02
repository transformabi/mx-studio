'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/2">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="group">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 p-6 text-left"
            >
              <span
                className={cn(
                  'font-brand text-base font-semibold transition-colors duration-300 sm:text-lg',
                  isOpen ? 'text-lime' : 'text-white group-hover:text-white/80',
                )}
              >
                {f.q}
              </span>
              <span
                className={cn(
                  'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500',
                  isOpen ? 'rotate-45 border-lime bg-lime text-black' : 'border-white/15 text-white/60',
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div
              aria-hidden={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-white/70 sm:text-base">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
