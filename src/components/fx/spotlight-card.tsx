'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Card with a pointer-following glow and a lit border. */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - r.left}px`);
    el.style.setProperty('--sy', `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={cn('group relative overflow-hidden', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), rgba(148,228,33,0.12), transparent 45%)',
        }}
      />
      <div aria-hidden className="spotlight-border pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
