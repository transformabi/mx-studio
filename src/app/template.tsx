'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Re-mounts on every navigation, so the CSS curtain replays per page — and runs before hydration.
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/carrossel')) return <>{children}</>;

  return (
    <>
      <div aria-hidden className="page-curtain page-curtain--lime" />
      <div aria-hidden className="page-curtain page-curtain--ink" />
      <div className="page-enter">{children}</div>
    </>
  );
}
