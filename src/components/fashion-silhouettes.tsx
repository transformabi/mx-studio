import type { ReactNode } from 'react';

type Kind = 'dress' | 'blouse' | 'pants' | 'bag' | 'necklace' | 'hat' | 'belt';

type Props = { className?: string; color?: string };

const stroke = 'currentColor';

/**
 * Minimal line-drawn silhouettes of fashion items.
 * Editorial style — thin strokes, generous negative space.
 */
export function FashionSilhouette({ kind, className, color = 'currentColor' }: Props & { kind: Kind }) {
  const sw = 1.3;
  const common = {
    stroke: color,
    strokeWidth: sw,
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (kind) {
    case 'dress':
      return (
        <svg viewBox="0 0 100 140" className={className} aria-hidden>
          <path {...common} d="M35 20 L45 15 L55 15 L65 20 L60 40 L72 46 L82 130 L18 130 L28 46 L40 40 Z" />
          <path {...common} d="M42 15 Q50 22 58 15" />
        </svg>
      );
    case 'blouse':
      return (
        <svg viewBox="0 0 100 140" className={className} aria-hidden>
          <path {...common} d="M30 22 L44 15 Q50 22 56 15 L70 22 L82 45 L72 50 L70 80 L30 80 L28 50 L18 45 Z" />
          <path {...common} d="M50 22 L50 40" />
        </svg>
      );
    case 'pants':
      return (
        <svg viewBox="0 0 100 140" className={className} aria-hidden>
          <path {...common} d="M28 20 L72 20 L75 130 L58 130 L52 65 L48 65 L42 130 L25 130 Z" />
          <path {...common} d="M28 20 L72 20" />
          <path {...common} d="M50 20 L50 65" />
        </svg>
      );
    case 'bag':
      return (
        <svg viewBox="0 0 100 140" className={className} aria-hidden>
          <path {...common} d="M30 15 Q30 5 40 5 L60 5 Q70 5 70 15 L70 30" />
          <path {...common} d="M18 30 L82 30 L78 125 L22 125 Z" />
          <circle {...common} cx="50" cy="62" r="6" />
        </svg>
      );
    case 'necklace':
      return (
        <svg viewBox="0 0 100 140" className={className} aria-hidden>
          <path {...common} d="M20 30 Q50 90 80 30" />
          <path {...common} d="M50 78 L50 92" />
          <circle {...common} cx="50" cy="100" r="8" />
        </svg>
      );
    case 'hat':
      return (
        <svg viewBox="0 0 100 140" className={className} aria-hidden>
          <path {...common} d="M32 45 Q32 20 50 20 Q68 20 68 45" />
          <path {...common} d="M15 55 Q50 45 85 55" />
          <path {...common} d="M32 45 L68 45" />
        </svg>
      );
    case 'belt':
      return (
        <svg viewBox="0 0 100 140" className={className} aria-hidden>
          <path {...common} d="M15 65 L85 65 L85 82 L15 82 Z" />
          <rect {...common} x="42" y="60" width="16" height="27" rx="2" />
          <circle {...common} cx="50" cy="73" r="2" />
        </svg>
      );
  }
}

export function ProductCard({
  color,
  category,
  kind,
  name,
  overlay,
  children,
}: {
  color: string;
  category: string;
  kind: Kind;
  name: string;
  overlay?: ReactNode;
  children?: ReactNode;
}) {
  // Compute a slightly-darker text color for readability on the color background
  const textColor = readableTextOn(color);
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden"
      style={{ background: color, color: textColor }}
    >
      <div className="flex items-start justify-between p-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">
          {category}
        </span>
        {overlay}
      </div>
      <div className="grid flex-1 place-items-center px-6">
        <FashionSilhouette
          kind={kind}
          className="h-2/3 w-2/3 opacity-30"
          color={textColor}
        />
      </div>
      <div className="p-5 pb-6">
        <div
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
          className="text-2xl italic leading-none"
        >
          {name}
        </div>
        {children}
      </div>
    </div>
  );
}

function readableTextOn(bgHex: string): string {
  // Very small luminance check to pick between very-dark and very-light text
  const m = bgHex.replace('#', '').match(/^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  if (!m) return '#111';
  const [r, g, b] = [1, 2, 3].map((i) => parseInt(m[i], 16) / 255);
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return l > 0.55 ? '#1a1a1a' : '#f5f0e6';
}

export const kindForCategory: Record<string, Kind> = {
  Vestidos: 'dress',
  Blusas: 'blouse',
  Calças: 'pants',
  Acessórios: 'bag', // fallback; per-product overrides possible
};
