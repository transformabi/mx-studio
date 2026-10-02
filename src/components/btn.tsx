'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'lime' | 'secondary' | 'ghost';

const base =
  'group relative inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-transform duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<Variant, string> = {
  primary:
    'bg-white text-black px-5 py-3 hover:-translate-y-0.5 focus-visible:outline-white',
  lime:
    'bg-lime text-ink px-5 py-3 hover:-translate-y-0.5 focus-visible:outline-lime',
  secondary:
    'border border-white/15 bg-white/5 text-white px-5 py-3 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 focus-visible:outline-white',
  ghost:
    'text-white/70 px-4 py-2 hover:text-white',
};

export function EstudioBtn({
  href,
  onClick,
  children,
  variant = 'primary',
  className,
  external,
  type = 'button',
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  type?: 'button' | 'submit';
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${(x / r.width) * 10}px, ${(y / r.height) * 10}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const cls = cn(base, variants[variant], className);
  const shared = {
    className: cls,
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  if (href && external) {
    return (
      <a
        ref={ref as any}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...shared}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link ref={ref as any} href={href} {...shared}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref as any} type={type} onClick={onClick} {...shared}>
      {children}
    </button>
  );
}
