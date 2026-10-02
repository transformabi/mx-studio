import { cn } from '@/lib/utils';

/**
 * MX Studio Web monogram — a solid M with a lime growth arrow that dips
 * over the letter and rises to an arrowhead pointing up-right.
 * Same drawing as the @mxstudioweb profile mark (391×360 source grid).
 *
 * Variants:
 * - filled: light background, ink M, lime arrow
 * - inverted: ink background, light M, lime arrow (default)
 * - mark: just the arrow, no letter (used at very small sizes / favicon)
 */
export function MaxMonogram({
  variant = 'inverted',
  className,
  rounded = 36,
}: {
  variant?: 'filled' | 'inverted' | 'mark';
  className?: string;
  rounded?: number;
}) {
  const ink = '#0C0E0A';
  const light = '#FBFCF8';
  const lime = '#A4FE24';

  const bg = variant === 'filled' ? light : variant === 'inverted' ? ink : 'transparent';
  const letter = variant === 'filled' ? ink : light;

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('block', className)}
      aria-label="MX Studio Web"
    >
      <rect width="200" height="200" rx={rounded} fill={bg} />
      <g transform="translate(25 31) scale(0.385)">
        {variant !== 'mark' && (
          <path
            fill={letter}
            d="M37 125 L175 250 L345 78 L345 352 L300 352 L300 180 L175 302 L82 216 L82 352 L37 352 Z"
          />
        )}
        <g fill="none" stroke={lime} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 75 L175 212 L360 27" />
          <path d="M314 19 L368 19 L368 73" />
        </g>
      </g>
    </svg>
  );
}
