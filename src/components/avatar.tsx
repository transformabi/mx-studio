import { cn } from '@/lib/utils';

/** Deterministic pastel palette (5 options, cycled by hash). */
const palettes = [
  ['#dcd7c8', '#a39684'], // sand / clay
  ['#c6dad9', '#4d7c7a'], // eucalyptus / forest
  ['#e6d3b7', '#a67c52'], // terra
  ['#d9d0e6', '#6b5a8a'], // lavender
  ['#e8ded0', '#7a6b5a'], // ivory / mocha
] as const;

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Editorial avatar: gradient background from name hash, initials in serif italic.
 * Deterministic, zero external deps, always on-brand.
 */
export function EditorialAvatar({
  name,
  className,
  serif = true,
}: {
  name: string;
  className?: string;
  serif?: boolean;
}) {
  const p = palettes[hash(name) % palettes.length];
  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        'relative grid place-items-center overflow-hidden rounded-full',
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${p[0]}, ${p[1]})`,
      }}
    >
      <span
        className="text-[0.42em] font-semibold uppercase tracking-wider text-white/95"
        style={
          serif
            ? { fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', letterSpacing: '0' }
            : undefined
        }
      >
        {initials(name)}
      </span>
    </div>
  );
}

/** Larger portrait card version — for hero use */
export function EditorialPortrait({
  name,
  className,
  serif = true,
}: {
  name: string;
  className?: string;
  serif?: boolean;
}) {
  const p = palettes[hash(name) % palettes.length];
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        background: `linear-gradient(160deg, ${p[0]} 0%, ${p[1]} 100%)`,
      }}
      aria-label={name}
      role="img"
    >
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-black/20 blur-3xl" />
      <div className="relative grid h-full place-items-center">
        <span
          className="text-[8vw] font-semibold text-white/95 sm:text-[5vw] lg:text-[3.6rem]"
          style={
            serif
              ? { fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic' }
              : undefined
          }
        >
          {initials(name)}
        </span>
      </div>
    </div>
  );
}
