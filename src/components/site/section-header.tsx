import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Numbered section opener: "02 — Modelos" on the left, the headline on the right. */
export function SectionHeader({
  index,
  label,
  title,
  lead,
  tone = 'dark',
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div className={cn('grid gap-6 lg:grid-cols-12', className)}>
      <p
        className={cn(
          'font-label text-xs uppercase tracking-[0.16em] lg:col-span-3 lg:pt-3',
          dark ? 'text-white/50' : 'text-ink/65',
        )}
      >
        <span className={dark ? 'text-lime' : 'text-ink'}>{index}</span> — {label}
      </p>
      <div className="lg:col-span-9">
        <h2 className="max-w-3xl text-balance font-brand text-[clamp(2rem,3.2vw+1rem,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em]">
          {title}
        </h2>
        {lead && (
          <p className={cn('mt-5 max-w-2xl text-lg leading-relaxed', dark ? 'text-white/65' : 'text-ink/70')}>{lead}</p>
        )}
      </div>
    </div>
  );
}
