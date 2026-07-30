import Link from 'next/link';
import { slides } from '@/lib/carrossel';

export default function CarrosselIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
        Carrossel Instagram
      </div>
      <h1
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
        className="mt-4 text-5xl font-semibold text-white sm:text-6xl"
      >
        10 slides prontos pra <span className="text-[#c6ff3b]">screenshot</span>.
      </h1>

      <div className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">
        Cada slide abaixo renderiza em exatamente <strong className="text-white">1080×1350px</strong> (formato 4:5 do
        Instagram carrossel). Clica em um slide, tira screenshot em resolução máxima e sobe pra o Instagram.
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/70">
        <div className="mb-3 font-semibold text-white">Como capturar</div>
        <ol className="list-inside list-decimal space-y-1.5">
          <li>Abre o slide (clica no thumbnail abaixo)</li>
          <li>Abre DevTools do Chrome (F12) → clica no ícone de dispositivo (mobile toolbar)</li>
          <li>Define viewport <strong>1080×1350</strong></li>
          <li>Clica no menu (⋮) do DevTools → <strong>Capture full-size screenshot</strong></li>
          <li>PNG baixa automático em 1080×1350</li>
        </ol>
        <div className="mt-4 text-xs text-white/50">
          Alternativa: extensão <a href="https://gofullpage.com" target="_blank" rel="noopener noreferrer" className="text-[#c6ff3b] underline">GoFullPage</a> — 1 clique captura a página inteira.
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {slides.map((s) => (
          <Link
            key={s.n}
            href={`/carrossel/${s.n}`}
            className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-[#c6ff3b]/40 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
                {String(s.n).padStart(2, '0')}
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/70">
                {s.kind}
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-instrument-serif)' }} className="text-2xl italic leading-[1.05] text-white">
              {s.caseName || s.hook || s.title?.split('\n')[0] || 'Slide'}
            </div>
            <div className="text-xs text-white/50">
              {s.caseMetric || s.body?.split('\n')[0] || ''}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
