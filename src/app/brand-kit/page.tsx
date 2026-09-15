import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { MaxMonogram } from '@/components/max-monogram';
import { estudio, whatsappUrl } from '@/lib/estudio';

export const metadata: Metadata = {
  title: 'Brand kit · MX Studio',
  description: 'Foto de perfil, banners, bio e link do portfólio pra usar em LinkedIn, Instagram e plataformas de freelance.',
};

const platforms = [
  { name: 'Foto de perfil', ratio: 'square', w: 400, h: 400, hint: 'LinkedIn 400×400 · Instagram 320×320 · Workana 200×200', variant: 'inverted' as const, rounded: 200 },
  { name: 'Foto de perfil (círculo)', ratio: 'square', w: 400, h: 400, hint: 'usar como avatar', variant: 'mark' as const, rounded: 200 },
  { name: 'Marca principal', ratio: 'square', w: 400, h: 400, hint: 'export em PNG @2x pra assinatura de e-mail', variant: 'inverted' as const, rounded: 60 },
  { name: 'Marca clara', ratio: 'square', w: 400, h: 400, hint: 'sobre fundos escuros ou fotos', variant: 'filled' as const, rounded: 60 },
];

const banners = [
  { name: 'LinkedIn cover', w: 1584, h: 396, ratio: '4:1', hint: 'Perfil / hero' },
  { name: 'Instagram post', w: 1080, h: 1080, ratio: '1:1', hint: 'Grid feed' },
  { name: 'Twitter/X header', w: 1500, h: 500, ratio: '3:1', hint: 'Perfil' },
  { name: 'Workana / 99Freelas', w: 1600, h: 400, ratio: '4:1', hint: 'Capa do perfil' },
];

const bios = [
  {
    tag: 'Curta · 150 caracteres',
    where: 'Instagram · Twitter · perfis compactos',
    text: 'Fazemos sites e produtos digitais em Next.js. Do brief ao pós-lançamento, um humano só. Vem ver → maxcosta.studio',
  },
  {
    tag: 'Média · 300 caracteres',
    where: 'Workana · 99Freelas · Fiverr · Upwork',
    text: 'Somos a MX Studio — estúdio digital no Rio. Fazemos sites, e-commerces e produtos digitais sob medida em Next.js/React. 8+ anos de mercado, do brief ao pós-lançamento sem intermediário. Portfólio: maxcosta.studio · Respondemos em até 24h.',
  },
  {
    tag: 'Longa · para o "sobre" do LinkedIn',
    where: 'LinkedIn · sobre no site · deck',
    text: `Somos a MX Studio, estúdio digital de dev + design no Rio de Janeiro. Fazemos sites, e-commerces e produtos digitais sob medida em Next.js — do brief ao pós-lançamento, um humano só.

Passamos por agências, produto e consultoria antes de virar um estúdio independente. O que aprendemos: cliente não quer site — quer que o site resolva.

Ramos que costumamos atender: moda autoral, gastronomia, saúde, jurídico, imobiliária, infoprodutos.

• Contrato + escopo fechado
• Pagamento parcelado
• Staging desde o dia 1
• Código no seu GitHub, sem lock-in
• 30 dias de garantia

Portfólio com 9 demos funcionais: maxcosta.studio
Fale com a gente: (21) 99319-6171 (WhatsApp)`,
  },
];

const files = [
  { file: '/brand/max-logo-dark.svg', label: 'Logo escuro · SVG' },
  { file: '/brand/max-logo-light.svg', label: 'Logo claro · SVG' },
  { file: '/brand/max-mark.svg', label: 'Só a marca (mark) · SVG' },
];

export default function BrandKitPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar ao portfólio
      </Link>

      <header className="mt-12">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
          Brand kit
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-6xl">
          Materiais pra{' '}
          <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#c6ff3b]">
            criar seus perfis
          </em>
          .
        </h1>
        <p className="mt-6 max-w-2xl text-white/70">
          Foto de perfil, banners nas dimensões corretas de cada plataforma, bio pronta e link do portfólio.
          Feito pra copiar, adaptar e postar em LinkedIn, Instagram, Workana, 99Freelas, Fiverr, Upwork.
        </p>
      </header>

      {/* SECTION: LOGO PREVIEWS */}
      <section className="mt-16">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
          01 · Logo & foto de perfil
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {platforms.map((p) => (
            <div key={p.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="grid aspect-square place-items-center rounded-2xl bg-[#080808]">
                <MaxMonogram variant={p.variant} rounded={p.rounded} className="h-4/5 w-4/5" />
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-white">{p.name}</div>
                <div className="mt-1 text-[11px] text-white/50">{p.hint}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {files.map((f) => (
            <a
              key={f.file}
              href={f.file}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.08]"
            >
              <Download className="h-3.5 w-3.5" />
              {f.label}
            </a>
          ))}
          <a
            href="https://www.iloveimg.com/svg-to-png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#c6ff3b] px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Converter pra PNG (site externo) →
          </a>
        </div>
      </section>

      {/* SECTION: BANNERS */}
      <section className="mt-20">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
          02 · Banners por plataforma
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/60">
          Cada card mostra o banner nas dimensões oficiais. Screenshot o card e cole no Figma/Canva pra ajustar
          antes de subir, ou baixa como PNG.
        </p>

        <div className="mt-8 space-y-6">
          {banners.map((b) => (
            <div key={b.name} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
                <div>
                  <div className="text-sm font-semibold text-white">{b.name}</div>
                  <div className="mt-0.5 text-[11px] text-white/50">
                    {b.w}×{b.h}px · {b.ratio} · {b.hint}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                  <Download className="h-3 w-3" />
                  Screenshot / print
                </span>
              </div>

              <BannerPreview name={b.name} w={b.w} h={b.h} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: BIO */}
      <section className="mt-20">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
          03 · Bio (copiar & colar)
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {bios.map((b) => (
            <div key={b.tag} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div
                    style={{ fontFamily: 'var(--font-instrument-serif)' }}
                    className="text-2xl italic text-[#c6ff3b]"
                  >
                    {b.tag}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/50">
                    {b.where}
                  </div>
                </div>
                <div className="text-xs text-white/40">
                  {b.text.length} caracteres
                </div>
              </div>
              <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/80">
                {b.text}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: PORTFOLIO LINK */}
      <section className="mt-20">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
          04 · Link do portfólio
        </h2>

        <div className="mt-6 rounded-3xl border border-[#c6ff3b]/30 bg-[#c6ff3b]/[0.04] p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <div
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
                className="text-3xl italic text-white"
              >
                maxcosta.studio
              </div>
              <p className="mt-3 text-sm text-white/70">
                Assim que o deploy estiver no ar (passo a passo abaixo), esse será o link a colocar em todas as bios.
              </p>
              <p className="mt-4 text-xs text-white/50">
                Enquanto isso, use o subdomínio da Vercel: <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px]">max-costa-estudio.vercel.app/estudio</code>
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c6ff3b]">
                Contato de bio
              </div>
              <div className="mt-3 space-y-1.5 text-white">
                <div>{estudio.email}</div>
                <div>{estudio.whatsappDisplay}</div>
                <div className="text-white/60">{estudio.location}</div>
              </div>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-black"
              >
                Testar link WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-20 border-t border-white/10 pt-8 text-xs text-white/40">
        Brand kit gerado para uso interno da MX Studio. Todos os assets em{' '}
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">/public/brand/</code>.
      </footer>
    </div>
  );
}

function BannerPreview({ name, w, h }: { name: string; w: number; h: number }) {
  const aspectStyle = { aspectRatio: `${w} / ${h}` } as const;
  const isSquare = w === h;

  return (
    <div className="relative overflow-hidden bg-[#080808]" style={aspectStyle}>
      {/* backdrop gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(198,255,59,0.14),transparent),radial-gradient(ellipse_50%_60%_at_100%_100%,rgba(255,138,92,0.10),transparent)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 40px)',
        }}
      />

      {/* content */}
      <div className={`absolute inset-0 flex ${isSquare ? 'flex-col items-center justify-center text-center' : 'items-center'} p-[6%]`}>
        {!isSquare && (
          <MaxMonogram variant="inverted" rounded={20} className="mr-6 h-24 w-24 shrink-0 sm:h-32 sm:w-32" />
        )}
        {isSquare && (
          <MaxMonogram variant="inverted" rounded={40} className="mb-8 h-40 w-40" />
        )}
        <div className={isSquare ? '' : 'min-w-0 flex-1'}>
          <div className="text-[8px] uppercase tracking-[0.2em] text-white/60 sm:text-[10px]">
            Estúdio digital freelance · Rio de Janeiro
          </div>
          <div
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
            className="mt-2 text-4xl italic leading-[1.02] text-white sm:text-5xl md:text-6xl"
          >
            Sites que <span className="text-[#c6ff3b]">vendem</span>.
          </div>
          {!isSquare && (
            <div className="mt-3 text-xs text-white/60 sm:text-sm">
              Next.js · Design system próprio · Do brief ao pós-lançamento
            </div>
          )}
        </div>
      </div>

      {/* corner label */}
      <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-mono text-white/60 backdrop-blur">
        {w}×{h}
      </div>
    </div>
  );
}
