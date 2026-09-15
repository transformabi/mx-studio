'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const INTERACTIVE = 'a, button, [role="button"], select, label, summary, [data-cursor]';

/** Dot + trailing ring. Grows over interactive elements and shows `data-cursor` labels. */
export function CustomCursor() {
  const pathname = usePathname();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    setEnabled(
      matchMedia('(pointer: fine)').matches &&
        !matchMedia('(prefers-reduced-motion: reduce)').matches &&
        !pathname?.startsWith('/carrossel'),
    );
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE);
      setHover(!!target);
      setLabel(target?.getAttribute('data-cursor') ?? '');
    };
    const onLeave = () => setVisible(false);
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[80] transition-opacity duration-300',
          label ? 'mix-blend-normal' : 'mix-blend-difference',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className={cn('cursor-ring', hover && 'is-hover', label && 'has-label')}>
          {label && <span>{label}</span>}
        </div>
      </div>
      <div
        ref={dot}
        aria-hidden
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[81] transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className={cn('cursor-dot', (hover || label) && 'is-hover')} />
      </div>
    </>
  );
}
