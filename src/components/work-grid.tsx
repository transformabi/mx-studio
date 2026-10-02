'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { niches, type Demo, type DemoNiche } from '@/lib/estudio';
import { WorkCard } from './work-card';

type Filter = 'all' | DemoNiche;

type Item = {
  demo: Demo;
  text: Pick<Demo, 'vertical' | 'tagline' | 'metrics'>;
  openLabel: string;
};

/** Demos grouped by business niche, each niche a block of site models; the chips narrow it to one niche. */
export function WorkGrid({
  items,
  t,
  numberLabel,
  previewHref,
}: {
  items: Item[];
  t: Messages['work'];
  numberLabel: string;
  previewHref: string;
}) {
  const [filter, setFilter] = useState<Filter>('all');

  const byNiche = (n: DemoNiche) => items.filter((it) => it.demo.niche === n);
  const groups = niches.filter((n) => byNiche(n).length > 0);
  // Numbered in display order, so the Nº on each card follows the niche blocks.
  const ordered = groups.flatMap(byNiche);
  const shown = filter === 'all' ? groups : [filter];

  const chips: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: t.all, count: items.length },
    ...groups.map((n) => ({ key: n, label: t.niches[n].label, count: byNiche(n).length })),
  ];

  return (
    <>
      {/* One swipeable row on phones; wraps from sm up. */}
      <div className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        {chips.map(({ key, label, count }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className={cn(
                'relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300',
                active ? 'border-transparent text-black' : 'border-white/15 text-white/70 hover:border-white/30 hover:text-white',
              )}
            >
              {active && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 rounded-full bg-lime"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {label}
                <span className={cn('ml-1.5 font-label text-[11px]', active ? 'text-black/60' : 'text-white/40')}>
                  {String(count).padStart(2, '0')}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 space-y-16">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((niche) => {
            const group = byNiche(niche);
            return (
              <motion.section
                key={niche}
                layout
                aria-labelledby={`nicho-${niche}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 id={`nicho-${niche}`} className="font-brand text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {t.niches[niche].label}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">{t.niches[niche].blurb}</p>
                  </div>
                  <span className="font-label text-[11px] uppercase tracking-[0.16em] text-white/40">
                    {group.length === 1 ? t.modelOne : fill(t.modelMany, { n: String(group.length) })}
                  </span>
                </header>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {group.map((it) => (
                    <WorkCard
                      key={it.demo.slug}
                      demo={it.demo}
                      text={it.text}
                      number={`${numberLabel} ${String(ordered.indexOf(it) + 1).padStart(2, '0')}`}
                      openLabel={it.openLabel}
                    />
                  ))}
                  {/* Fills the empty half of an odd row on wide screens. */}
                  {group.length % 2 === 1 && <PreviewCard t={t} href={previewHref} className="hidden md:flex" />}
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}

function PreviewCard({ t, href, className }: { t: Messages['work']; href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex-col justify-between rounded-3xl border border-dashed border-white/15 bg-white/2 p-8 transition-colors duration-300 hover:border-lime/50',
        className,
      )}
    >
      <div>
        <span className="font-label text-[11px] uppercase tracking-[0.16em] text-lime">{t.fillerEyebrow}</span>
        <p className="mt-4 max-w-xs font-brand text-2xl font-extrabold leading-tight tracking-tight text-white">
          {t.fillerTitle}
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">{t.fillerText}</p>
      </div>
      <span className="mt-8 inline-flex items-center gap-1.5 self-start rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
        <ClipboardCheck className="h-4 w-4" />
        {t.fillerCta}
      </span>
    </a>
  );
}
