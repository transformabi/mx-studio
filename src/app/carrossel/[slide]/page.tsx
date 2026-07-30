import { notFound } from 'next/navigation';
import { slides, slideBySlug, type Slide } from '@/lib/carrossel';
import { MaxMonogram } from '@/components/max-monogram';

export function generateStaticParams() {
  return slides.map((s) => ({ slide: String(s.n) }));
}

export default function CarrosselSlide({ params }: { params: { slide: string } }) {
  const s = slideBySlug[params.slide];
  if (!s) return notFound();

  return (
    <div className="grid min-h-dvh place-items-center bg-black p-6">
      <div
        className="relative overflow-hidden bg-neutral-950 text-white shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]"
        style={{ width: '1080px', height: '1350px' }}
      >
        {/* Corner mark — same on every slide */}
        <div className="pointer-events-none absolute right-8 top-8 z-20">
          <MaxMonogram variant="inverted" rounded={16} className="h-14 w-14" />
        </div>
        <div className="pointer-events-none absolute left-8 top-8 z-20 font-mono text-[13px] uppercase tracking-[0.24em] text-white/40">
          {String(s.n).padStart(2, '0')} · 10
        </div>

        {s.kind === 'cover' && <CoverSlide s={s} />}
        {s.kind === 'setup' && <SetupSlide s={s} />}
        {s.kind === 'case' && <CaseSlide s={s} />}
        {s.kind === 'why' && <WhySlide s={s} />}
        {s.kind === 'cta' && <CTASlide s={s} />}
      </div>
    </div>
  );
}

/* ---------------- SLIDE COMPONENTS ---------------- */

const serif = { fontFamily: 'var(--font-instrument-serif)' } as const;
const display = { fontFamily: 'var(--font-space-grotesk)' } as const;

const caseThumbnails = [
  { src: '/heros/moda-arte.png', accent: '#c6ff3b' },
  { src: '/heros/restaurante-terra.png', accent: '#ff8a5c' },
  { src: '/heros/clinica-sereno.png', accent: '#3be0b3' },
  { src: '/heros/motta-advogados.png', accent: '#a78bfa' },
  { src: '/heros/costa-imoveis.png', accent: '#c6ff3b' },
  { src: '/heros/rota-clara.png', accent: '#22d3ee' },
];

function CoverSlide({ s }: { s: Slide }) {
  return (
    <div className="absolute inset-0 flex flex-col p-16">
      {/* Text hook — center */}
      <div className="flex flex-1 flex-col justify-center">
        <div style={display} className="text-[132px] font-bold leading-[0.9] text-white">
          {s.hook}
        </div>
        <div style={serif} className="mt-3 text-[128px] italic leading-[0.95] text-[#c6ff3b]">
          {s.hookAccent}
        </div>
        <div style={display} className="mt-3 text-[76px] font-bold leading-[0.95] text-white/90">
          {s.hookAccent2}
        </div>
        <div style={display} className="mt-8 text-[72px] font-bold leading-[0.95] text-white">
          {s.hookTail}
        </div>
      </div>

      {/* Grid dos 6 sites embaixo */}
      <div className="grid grid-cols-3 gap-4">
        {caseThumbnails.map((c) => (
          <div key={c.src} className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-800">
            <img src={c.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            <div className="pointer-events-none absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: c.accent }} />
          </div>
        ))}
      </div>

      {/* Swipe hint */}
      <div className="mt-8 flex items-center gap-3 text-[16px] uppercase tracking-[0.32em] text-white/50">
        {s.body}
      </div>
    </div>
  );
}

function SetupSlide({ s }: { s: Slide }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center p-24">
      <div style={serif} className="text-[112px] italic leading-[1.02] text-white/90">
        {s.title}
      </div>
      <div style={display} className="mt-16 whitespace-pre-line text-[70px] font-bold leading-[1.05] text-white">
        {s.body?.split('\n').map((line, i) => (
          <div key={i}>
            {i === 0 && line.includes('perde') ? (
              <>
                E aí perde <span className="text-[#c6ff3b]">cliente todo dia</span>
              </>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseSlide({ s }: { s: Slide }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Top: category */}
      <div className="flex flex-col px-16 pt-32 pb-6">
        <div className="text-[18px] uppercase tracking-[0.28em] text-white/50">{s.caseCategory}</div>
        <div style={serif} className="mt-2 text-[72px] italic leading-[1.02] text-white">
          {s.caseName}
        </div>
      </div>

      {/* Middle: metric huge */}
      <div className="flex items-center gap-10 px-16 py-4">
        <div
          style={display}
          className="text-[220px] font-bold leading-[0.9] tracking-tight"
        >
          <span style={{ color: s.caseAccent }}>{s.caseMetric}</span>
        </div>
        <div style={display} className="text-[42px] font-medium leading-[1.05] text-white/80">
          {s.caseMetricLabel}
        </div>
      </div>

      {/* Bottom: browser mockup with hero image */}
      <div className="flex-1 px-16 pt-4 pb-12">
        <div className="h-full overflow-hidden rounded-3xl border border-white/15 bg-neutral-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
          {/* Browser bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-950/80 px-6 py-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-white/25" />
              <span className="h-3 w-3 rounded-full bg-white/25" />
              <span className="h-3 w-3 rounded-full bg-white/25" />
            </div>
            <div className="ml-6 flex-1">
              <div className="mx-auto max-w-sm rounded-md border border-white/10 bg-white/[0.06] px-3 py-1.5 text-center font-mono text-[13px] text-white/50">
                {s.caseName?.toLowerCase().replace(/[^a-z]/g, '') || 'site'}.com.br
              </div>
            </div>
          </div>
          <div className="relative h-[calc(100%-56px)] overflow-hidden">
            <img
              src={s.caseImage}
              alt={s.caseName}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Tagline overlay */}
      <div style={serif} className="absolute bottom-40 left-16 right-16 z-10 whitespace-pre-line text-[36px] italic leading-[1.15] text-white/80" hidden>
        {s.caseTagline}
      </div>
    </div>
  );
}

function WhySlide({ s }: { s: Slide }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center p-20">
      <div style={serif} className="text-[110px] italic leading-[1.02] text-white">
        {s.title?.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div style={display} className="mt-14 text-[46px] font-medium leading-[1.15] text-white/70">
        {s.body}
      </div>

      {/* Table comparison */}
      <div className="mt-20 space-y-4">
        <ComparisonRow left="Template genérico" right="R$ 2k" muted />
        <ComparisonRow left="Site com estratégia" right="R$ 10k+" muted />
        <ComparisonRow left="Site que vende de verdade" right="o meu" accent />
      </div>
    </div>
  );
}

function ComparisonRow({
  left,
  right,
  accent,
  muted,
}: {
  left: string;
  right: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
      <div
        style={display}
        className={
          'text-[42px] font-medium ' + (accent ? 'text-white' : 'text-white/60')
        }
      >
        {left}
      </div>
      <div
        style={accent ? serif : display}
        className={
          'text-[52px] ' +
          (accent
            ? 'italic text-[#c6ff3b]'
            : muted
            ? 'font-mono text-white/40'
            : 'font-bold text-white')
        }
      >
        {right}
      </div>
    </div>
  );
}

function CTASlide({ s }: { s: Slide }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-14 p-20 text-center">
      <MaxMonogram variant="inverted" rounded={48} className="h-52 w-52" />

      <div style={display} className="whitespace-pre-line text-[80px] font-bold leading-[1.02] text-white">
        {s.hook}
      </div>

      <div className="mt-4 flex flex-col items-center gap-3">
        <div style={serif} className="text-[100px] italic leading-none text-[#c6ff3b]">
          {s.body}
        </div>
        <div className="text-[22px] uppercase tracking-[0.28em] text-white/50">
          Link na bio · WhatsApp (21) 97685-2478
        </div>
      </div>

      <div className="mt-8 rounded-full border border-[#ff8a5c]/40 bg-[#ff8a5c]/10 px-8 py-4 text-[26px] font-semibold text-[#ff8a5c]">
        {s.hookTail}
      </div>
    </div>
  );
}
