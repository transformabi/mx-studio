'use client';

import type { ReactNode } from 'react';

export function Marquee({
  children,
  speed = 40,
}: {
  children: ReactNode;
  speed?: number;
}) {
  return (
    <div className="marquee-mask relative overflow-hidden">
      <div
        className="marquee-track flex whitespace-nowrap will-change-transform"
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
