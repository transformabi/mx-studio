'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Messages } from '@/i18n/messages';
import { campaignOpen } from '@/lib/black-friday';

/** Home block for November 2026. Does not mention or change plan prices. */
export function November({ t }: { t: Messages['campaign'] }) {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!campaignOpen()) setOn(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!on) return null;

  return (
    <section aria-labelledby="novembro-titulo" className="border-t border-white/10">
      <div className="container-site py-16 sm:py-20">
        <div className="overflow-hidden rounded-3xl border border-lime/25 bg-ink-2">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12">
            <div className="lg:col-span-7">
              <p className="font-label text-[11px] uppercase tracking-[0.16em] text-lime">{t.kicker}</p>
              <h2
                id="novembro-titulo"
                className="mt-4 text-balance font-brand text-4xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-5xl"
              >
                {t.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{t.lead}</p>
            </div>
            <ul className="space-y-3 lg:col-span-5">
              {t.points.map((point) => (
                <li key={point} className="flex gap-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-bone first:border-t-0 first:pt-0">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4 sm:px-10 lg:px-12">
            <p className="text-sm text-white/55">{t.note}</p>
            <Link
              href="#planos"
              className="cta-call inline-flex min-h-10 items-center rounded-full px-4 py-2 text-sm font-semibold text-ink"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
