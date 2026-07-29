'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import type { Demo } from '@/lib/estudio';
import { heros } from '@/lib/demo-images';

const num: Record<Demo['slug'], string> = {
  'moda-arte': '01',
  'restaurante-terra': '02',
  'clinica-sereno': '03',
  'motta-advogados': '04',
  'costa-imoveis': '05',
  'rota-clara': '06',
};

export function WorkCard({ demo }: { demo: Demo }) {
  const wrap = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={wrap}
      href={`/demo/${demo.slug}`}
      onMouseMove={handleMove}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05]"
      aria-label={`Abrir demo ${demo.clientName}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--mx,50%) var(--my,50%), ${demo.accent}22, transparent 40%)`,
        }}
      />
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900">
        <img
          src={heros[demo.slug]}
          alt={`${demo.clientName} — ${demo.vertical}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25"
        />
        <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: demo.accent }} />
          {demo.vertical}
        </div>
        <div className="pointer-events-none absolute right-5 top-5 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur">
          Nº {num[demo.slug]}
        </div>
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
            className="text-3xl italic leading-none text-white"
          >
            {demo.clientName.split(' ')[0].toLowerCase()}
          </div>
          <div className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-mono text-white/70 backdrop-blur">
            {demo.year}
          </div>
        </div>
      </div>

      <div className="relative flex items-start justify-between gap-4 px-3 pt-5 pb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: demo.accent }}
            />
            {demo.vertical} · {demo.year}
          </div>
          <h3 className="mt-2.5 font-display text-xl font-semibold text-white">
            {demo.clientName}
          </h3>
          <p className="mt-1 text-sm text-white/60">{demo.tagline}</p>
        </div>
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 transition-all duration-500 group-hover:rotate-45"
          style={{ borderColor: `${demo.accent}55` }}
        >
          <ArrowUpRight className="h-4 w-4" style={{ color: demo.accent }} aria-hidden />
        </div>
      </div>

      <div className="relative mt-2 grid grid-cols-3 gap-3 border-t border-white/10 px-3 pt-4 pb-2">
        {demo.metrics.map((m) => (
          <div key={m.label + m.value}>
            <div className="font-display text-base font-semibold" style={{ color: demo.accent }}>
              {m.label}
            </div>
            <div className="mt-0.5 truncate text-[11px] text-white/50">{m.value}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}
