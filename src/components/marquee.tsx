'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Marquee({
  children,
  speed = 40,
  reverse = false,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className="marquee-mask relative overflow-hidden">
      <div
        className={cn('marquee-track flex whitespace-nowrap will-change-transform', reverse && 'is-reverse')}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-16 pr-16">{children}</div>
        <div className="flex shrink-0 items-center gap-16 pr-16" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
