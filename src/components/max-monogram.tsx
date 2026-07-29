import { cn } from '@/lib/utils';

/**
 * Max Costa monogram — an M with a Transforma-BI-style growth arrow
 * that dips (falls) and then rises with an arrowhead pointing up-right,
 * crossing over the letter M.
 *
 * Variants:
 * - filled: cream background, dark M, lime arrow
 * - inverted: dark background, cream M, lime arrow (default)
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
  const dark = '#0a0a0a';
  const cream = '#f5f0e6';
  const lime = '#a5e635';
  const limeDark = '#84d82c';

  const bg = variant === 'filled' ? cream : variant === 'inverted' ? dark : 'transparent';
  const ink = variant === 'filled' ? dark : cream;
  const arrow = variant === 'filled' ? limeDark : lime;

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('block', className)}
      aria-label="Max Costa"
    >
      {/* Background */}
      <rect width="200" height="200" rx={rounded} fill={bg} />

      {variant !== 'mark' && (
        <path
          fill={ink}
          d="M 45 155 L 45 65 L 65 65 L 100 118 L 135 65 L 155 65 L 155 155 L 137 155 L 137 92 L 108 138 L 92 138 L 63 92 L 63 155 Z"
        />
      )}

      {/* Subtle glow behind the arrowhead for lift */}
      <circle cx="175" cy="25" r="26" fill={arrow} opacity="0.14" />

      {/* Chart-line: starts upper-left, DIPS into the M, RISES to top-right */}
      <path
        d="M 22 55 L 92 108 L 175 25"
        stroke={arrow}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Arrowhead V: horizontal + vertical legs meeting at the tip */}
      <path
        d="M 148 25 L 175 25 L 175 52"
        stroke={arrow}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
