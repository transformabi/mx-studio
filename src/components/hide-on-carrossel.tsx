'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function HideOnCarrossel({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/carrossel')) return null;
  return <>{children}</>;
}
