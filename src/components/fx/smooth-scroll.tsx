'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export function SmoothScroll() {
  const pathname = usePathname();
  const skip = pathname?.startsWith('/carrossel');

  useEffect(() => {
    if (skip || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -96 },
      // Let modals and drawers scroll natively.
      prevent: (node) => !!node.closest('[role="dialog"], [data-lenis-prevent]'),
    });
    return () => lenis.destroy();
  }, [skip]);

  return null;
}
