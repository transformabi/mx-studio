import { Flower2, HardHat, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ArtSlug = 'lumi-odonto' | 'iris-estetica' | 'alicerce-construtora';

export const hasDemoArt = (slug: string): slug is ArtSlug =>
  slug === 'lumi-odonto' || slug === 'iris-estetica' || slug === 'alicerce-construtora';

/**
 * Art-directed stand-in rendered underneath photos that haven't been produced yet.
 * The <img> on top uses data-fallback="hide", so a missing file reveals this instead of a random stock photo.
 */
export function DemoArt({ slug, className }: { slug: string; className?: string }) {
  if (!hasDemoArt(slug)) return null;
  const base = cn('pointer-events-none absolute inset-0 overflow-hidden', className);

  if (slug === 'lumi-odonto') {
    return (
      <div aria-hidden className={base} style={{ background: 'linear-gradient(140deg, #f0f9ff 0%, #bae6fd 45%, #38bdf8 100%)' }}>
        <div className="absolute -right-[15%] -top-[20%] h-[80%] w-[80%] rounded-full bg-white/50 blur-3xl" />
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_1px_1px,#0b2239_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_top,black,transparent)]" />
        <svg
          viewBox="0 0 200 200"
          className="absolute left-1/2 top-1/2 h-[58%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_20px_40px_rgba(11,34,57,0.25)]"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M100 48C86 38 60 34 48 52C38 68 42 90 50 108C56 122 58 146 64 160C68 170 80 170 82 158L88 126C90 118 110 118 112 126L118 158C120 170 132 170 136 160C142 146 144 122 150 108C158 90 162 68 152 52C140 34 114 38 100 48Z" />
          <path d="M160 26L164 36L174 40L164 44L160 54L156 44L146 40L156 36Z" fill="#ffffff" />
          <path d="M34 150L36 155L41 157L36 159L34 164L32 159L27 157L32 155Z" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  if (slug === 'iris-estetica') {
    return (
      <div aria-hidden className={base} style={{ background: 'linear-gradient(165deg, #fdf2f5 0%, #f0c6d3 50%, #a8566a 100%)' }}>
        <div className="absolute -left-[20%] top-[10%] h-[70%] w-[70%] rounded-full bg-[#f0abfc]/40 blur-3xl" />
        <svg
          viewBox="0 0 200 260"
          preserveAspectRatio="xMidYMax meet"
          className="absolute inset-x-0 bottom-0 mx-auto h-[88%]"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.6"
          strokeWidth="1.5"
        >
          {[0, 1, 2, 3].map((i) => {
            const inset = 20 + i * 18;
            const y = 100 + i * 18;
            return <path key={i} d={`M${inset} 260 V${y} A${100 - inset} ${100 - inset} 0 0 1 ${200 - inset} ${y} V260`} />;
          })}
        </svg>
        <Flower2 className="absolute left-1/2 top-[50%] h-[22%] w-[22%] -translate-x-1/2 text-white/90" strokeWidth={1.2} />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={base}
      style={{ background: 'radial-gradient(120% 90% at 80% 10%, #3a2a0c 0%, #141413 55%, #0f0f0e 100%)' }}
    >
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(#f5a524_1px,transparent_1px),linear-gradient(90deg,#f5a524_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(circle_at_60%_40%,black,transparent_75%)]" />
      <svg
        viewBox="0 0 240 200"
        className="absolute bottom-[8%] right-[8%] h-[70%]"
        fill="none"
        stroke="#f5a524"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M20 180H220" />
        <path d="M40 180V90L100 60V180" />
        <path d="M100 180V40L170 20V180" />
        <path d="M170 180V100L210 90V180" />
        {[60, 80, 100, 120, 140, 160].map((y) => (
          <path key={y} d={`M112 ${y}H158`} strokeOpacity="0.5" />
        ))}
        {[110, 130, 150].map((y) => (
          <path key={y} d={`M52 ${y}H88`} strokeOpacity="0.5" />
        ))}
      </svg>
      <HardHat className="absolute left-[10%] top-[14%] h-10 w-10 text-[#f5a524]" strokeWidth={1.5} />
    </div>
  );
}

/** Gradient tile with an oversized icon, for photo slots in cards. */
export function ArtTile({
  icon: Icon,
  from,
  to,
  iconClassName,
}: {
  icon: LucideIcon;
  from: string;
  to: string;
  iconClassName?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
      <Icon className={cn('absolute -bottom-[12%] -right-[6%] h-[70%] w-[70%]', iconClassName)} strokeWidth={1} />
    </div>
  );
}
