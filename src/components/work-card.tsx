'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import type { DemoNiche } from '@/lib/estudio';
import { cn } from '@/lib/utils';
import { VerifiedBadge } from './brand-icons';
import { DemoArt } from './demo-art';

/** One card in the portfolio grid: a working demo, or a live client site (kind 'case'). */
export type WorkItem = {
  kind: 'demo' | 'case';
  key: string;
  niche: DemoNiche;
  href: string;
  name: string;
  accent: string;
  year: string;
  text: { vertical: string; tagline: string; metrics: { label: string; value: string }[] };
  openLabel: string;
  image: string;
  /** Demo slug with art-directed stand-in underneath the photo. */
  artSlug?: string;
  /** Stock-photo keyword used when the photo is missing and there is no art. */
  keyword?: string;
  /** Shown instead of the card number, e.g. "Cliente real". */
  badge?: string;
};

export function WorkCard({ item, number }: { item: WorkItem; number: string }) {
  const wrap = useRef<HTMLAnchorElement>(null);
  const external = item.kind === 'case';

  const handleMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    el.style.setProperty('--rx', `${(e.clientX - r.left) / r.width - 0.5}`);
    el.style.setProperty('--ry', `${(e.clientY - r.top) / r.height - 0.5}`);
  };

  const handleLeave = () => {
    wrap.current?.style.setProperty('--rx', '0');
    wrap.current?.style.setProperty('--ry', '0');
  };

  const shared = {
    ref: wrap,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: {
      transform: 'perspective(1200px) rotateX(calc(var(--ry, 0) * -5deg)) rotateY(calc(var(--rx, 0) * 7deg))',
    },
    className:
      'group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-3 transition-[transform,border-color,background-color] duration-300 ease-out hover:border-white/25 hover:bg-white/5',
    'aria-label': item.openLabel,
  };

  const body = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--mx,50%) var(--my,50%), ${item.accent}22, transparent 40%)`,
        }}
      />
      <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-neutral-900">
        {item.artSlug && <DemoArt slug={item.artSlug} />}
        <img
          src={item.image}
          alt={`${item.name} — ${item.text.vertical}`}
          data-keyword={item.keyword}
          data-fallback={item.artSlug ? 'hide' : undefined}
          loading="lazy"
          style={{
            transform: 'translate3d(calc(var(--rx, 0) * -18px), calc(var(--ry, 0) * -18px), 0) scale(1.1)',
          }}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out',
            // Screenshots of live sites keep their header in frame.
            external && 'object-top',
          )}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/25"
        />
        <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.accent }} />
          {item.text.vertical}
        </div>
        {item.badge ? (
          <div className="pointer-events-none absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-black/60 py-1 pl-1.5 pr-3 text-xs font-semibold text-white backdrop-blur-sm">
            <VerifiedBadge className="h-4 w-4" />
            {item.badge}
          </div>
        ) : (
          <div className="pointer-events-none absolute right-5 top-5 rounded-full bg-black/40 px-2.5 py-1 font-label text-[10px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
            {number}
          </div>
        )}
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div className="font-brand text-4xl font-extrabold leading-none tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-1">
            {item.name.split(' ')[0].toLowerCase()}
          </div>
          <div className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-label text-white/70 backdrop-blur-sm">
            {item.year}
          </div>
        </div>
      </div>

      <div className="relative flex items-start justify-between gap-4 px-3 pt-5 pb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: item.accent }} />
            {item.text.vertical} · {item.year}
          </div>
          <h4 className="mt-2.5 font-brand text-xl font-semibold text-white">{item.name}</h4>
          <p className="mt-1 text-sm text-white/60">{item.text.tagline}</p>
        </div>
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white"
          style={{ borderColor: `${item.accent}55` }}
        >
          <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-black!" style={{ color: item.accent }} aria-hidden />
        </div>
      </div>

      <div className="relative mt-2 grid grid-cols-3 gap-3 border-t border-white/10 px-3 pt-4 pb-2">
        {item.text.metrics.map((m) => (
          <div key={m.label + m.value}>
            <div className="font-brand text-base font-semibold" style={{ color: item.accent }}>
              {m.label}
            </div>
            <div className="mt-0.5 truncate text-[11px] text-white/50">{m.value}</div>
          </div>
        ))}
      </div>
    </>
  );

  return external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" {...shared}>
      {body}
    </a>
  ) : (
    <Link href={item.href} {...shared}>
      {body}
    </Link>
  );
}
