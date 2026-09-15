'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Demo, DemoGroup } from '@/lib/estudio';
import { WorkCard } from './work-card';

type Filter = 'all' | DemoGroup;

type Item = {
  demo: Demo;
  text: Pick<Demo, 'vertical' | 'tagline' | 'metrics'>;
  openLabel: string;
};

export function WorkGrid({
  items,
  filters,
  numberLabel,
  cursorLabel,
}: {
  items: Item[];
  filters: Record<Filter, string>;
  numberLabel: string;
  cursorLabel: string;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const keys = Object.keys(filters) as Filter[];
  const visible = items.filter((it) => filter === 'all' || it.demo.group === filter);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {keys.map((key) => {
          const active = filter === key;
          const count = key === 'all' ? items.length : items.filter((it) => it.demo.group === key).length;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className={cn(
                'relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300',
                active ? 'border-transparent text-black' : 'border-white/15 text-white/70 hover:border-white/30 hover:text-white',
              )}
            >
              {active && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 rounded-full bg-[#c6ff3b]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {filters[key]}
                <span className={cn('ml-1.5 font-mono text-[11px]', active ? 'text-black/60' : 'text-white/40')}>
                  {String(count).padStart(2, '0')}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((it) => (
            <motion.div
              key={it.demo.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <WorkCard
                demo={it.demo}
                text={it.text}
                number={`${numberLabel} ${String(items.indexOf(it) + 1).padStart(2, '0')}`}
                openLabel={it.openLabel}
                cursorLabel={cursorLabel}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
