import Link from 'next/link';
import {
  ArrowUpRight,
  BadgeCheck,
  Circle,
  Code2,
  Compass,
  Handshake,
  MessageCircle,
  PenTool,
  Rocket,
} from 'lucide-react';

import { Reveal } from '@/components/reveal';
import { WorkCard } from '@/components/work-card';
import { EstudioBtn } from '@/components/btn';
import { Marquee } from '@/components/marquee';
import { demos, estudio, whatsappUrl } from '@/lib/estudio';
import { ContactForm } from '@/components/contact-form';

const process = [
  {
    step: '01',
    title: 'Discovery',
    duration: '3–5 dias',
    text: 'Sessão de imersão. Entendo o negócio, o público e o que já funciona. Saio com um brief e uma proposta de arquitetura.',
    icon: <Compass className="h-5 w-5" />,
  },
  {
    step: '02',
    title: 'Design',
    duration: '1–2 semanas',
    text: 'Wireframes rápidos, direção de arte e telas de alta fidelidade. Você aprova antes de qualquer código.',
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    step: '03',
    title: 'Desenvolvimento',
    duration: '2–4 semanas',
    text: 'Implementação em Next.js + Tailwind. Você acompanha em ambiente de staging desde o dia 1.',
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    step: '04',
    title: 'Lançamento',
    duration: '2–3 dias',
    text: 'Deploy em domínio próprio, analytics + SEO técnico, passagem de bastão com documentação.',
    icon: <Rocket className="h-5 w-5" />,
  },
];

const services = [
  {
    title: 'Site institucional',
    from: 'a partir de R$ 4.900',
    bullets: ['4–8 páginas', 'CMS opcional', 'Design system próprio', 'SEO técnico'],
  },
  {
    title: 'E-commerce',
    from: 'a partir de R$ 9.900',
    bullets: ['Catálogo + carrinho', 'Checkout PIX + cartão', 'Área do cliente', 'Painel do lojista'],
  },
  {
    title: 'Landing de conversão',
    from: 'a partir de R$ 3.500',
    bullets: ['Copywriting-first', 'A/B ready', 'Analytics + pixels', 'Deploy em 10 dias'],
  },
  {
    title: 'Sistema web sob medida',
    from: 'a partir de R$ 16.000',
    bullets: ['Login + auth', 'Painel + roles', 'Integrações', 'Escopo customizado'],
  },
];

const faq = [
  {
    q: 'Por que R$ 4.900 e não R$ 1.500 como muito freelancer cobra?',
    a: 'Porque não é o mesmo produto. R$ 1.500 geralmente é template do Elementor sem estratégia, que trava no celular e você não consegue editar depois. Aqui é código próprio em Next.js, design pensado pro seu negócio, integrações reais, performance verde no Core Web Vitals e o código no seu GitHub no fim.',
  },
  {
    q: 'Em quanto tempo o site fica pronto?',
    a: 'De 3 a 7 semanas dependendo do escopo. O cronograma vai fechado na proposta, com marcos e datas.',
  },
  {
    q: 'Você trabalha com contrato e pagamento parcelado?',
    a: 'Sim. Contrato de prestação de serviço com escopo e prazo. Pagamento em 3 parcelas: 40% no início, 30% na aprovação do design, 30% na entrega. PIX, boleto ou transferência.',
  },
  {
    q: 'Depois de entregue, como fica a manutenção?',
    a: 'Você recebe o site pronto na Vercel, com documentação. Se quiser, contrata cuidado contínuo mensal com evoluções priorizadas e suporte prioritário.',
  },
  {
    q: 'Você usa template pronto?',
    a: 'Não. Código do zero em Next.js + Tailwind. Nada de Elementor ou tema WordPress. O código é seu — sem lock-in.',
  },
  {
    q: 'Atende fora do Rio de Janeiro?',
    a: 'Sim, todo o Brasil e no exterior. Reuniões em Meet, WhatsApp pra o dia a dia, ambiente de staging pra acompanhar em tempo real.',
  },
];

const marqueeItems = [
  'E-commerce',
  '★',
  'Restaurantes',
  '★',
  'Clínicas',
  '★',
  'Advocacia',
  '★',
  'Imobiliárias',
  '★',
  'Infoprodutos',
  '★',
];

const serifStyle = { fontFamily: 'var(--font-instrument-serif)' } as const;

export default function EstudioHome() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(198,255,59,0.14),transparent),radial-gradient(ellipse_50%_40%_at_100%_10%,rgba(255,138,92,0.10),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:40px_40px]"
        />

        <div className="container-wide relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c6ff3b] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c6ff3b]" />
              </span>
              Disponível pra 2 projetos em outubro
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.75rem,7vw+0.5rem,7rem)] font-semibold leading-[0.95] tracking-tight text-white">
              Sites que fazem seu negócio parecer{' '}
              <span style={serifStyle} className="italic font-normal text-white/90">
                sério
              </span>
              <br />
              — e que{' '}
              <span className="text-[#c6ff3b]">vendem</span>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              Somos a <span className="text-white">MX Studio</span>. Fazemos sites,
              e-commerces e produtos digitais sob medida em Next.js. Do brief
              ao pós-lançamento, um humano só. Sem template. Sem
              intermediário. Sem surpresa.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <EstudioBtn href={whatsappUrl()} external>
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </EstudioBtn>
              <EstudioBtn href="#trabalhos" variant="secondary">
                Ver os trabalhos
                <ArrowUpRight className="h-4 w-4" />
              </EstudioBtn>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
              <HeroStat kpi="6" label="demos pra você testar" />
              <HeroStat kpi="100%" label="código no seu GitHub" />
              <HeroStat kpi="3–7" label="semanas por projeto" />
              <HeroStat kpi="24h" label="pra responder" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative border-y border-white/10 bg-white/[0.02] py-8">
        <Marquee speed={35}>
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className={
                item === '★'
                  ? 'text-[#c6ff3b] text-2xl'
                  : 'font-display text-3xl font-semibold text-white/80 sm:text-4xl'
              }
              style={item !== '★' ? serifStyle : undefined}
            >
              {item === '★' ? item : <em>{item}</em>}
            </span>
          ))}
        </Marquee>
      </section>

      {/* TRABALHOS */}
      <section id="trabalhos" className="container-wide py-24 sm:py-32">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                <Circle className="h-2 w-2 fill-[#c6ff3b] text-[#c6ff3b]" />
                Trabalhos
              </div>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-semibold leading-[1.05] text-white">
                Cada card abre uma{' '}
                <span style={serifStyle} className="italic font-normal">
                  demo funcional
                </span>{' '}
                do site.
              </h2>
              <p className="mt-4 max-w-xl text-base text-white/60">
                Clique, teste os botões, adicione ao carrinho, faça uma reserva.
                Se funciona aqui, funciona no seu.
              </p>
              <p className="mt-4 max-w-xl text-sm text-white/40">
                LCP e peso medidos em produção, sem cache, em 4G com CPU 4× mais
                lenta — pior caso de 3 medições. Não precisa acreditar: jogue a URL
                de qualquer demo no PageSpeed Insights do Google e confira.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              06 nichos · demos completos
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {demos.map((demo, i) => (
            <Reveal key={demo.slug} delay={(i % 2) * 80}>
              <WorkCard demo={demo} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="border-t border-white/10 bg-white/[0.02] py-24 sm:py-32">
        <div className="container-wide">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              <Circle className="h-2 w-2 fill-[#c6ff3b] text-[#c6ff3b]" />
              Processo
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-semibold leading-[1.05] text-white">
              Um jeito{' '}
              <span style={serifStyle} className="italic font-normal">
                sem surpresa
              </span>{' '}
              de fazer o seu site.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 60}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-white/25">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white">
                      {p.icon}
                    </span>
                    <span className="font-mono text-xs text-white/40">{p.step}</span>
                  </div>
                  <div className="mt-6 font-display text-lg font-semibold text-white">
                    {p.title}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#c6ff3b]">
                    {p.duration}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="container-wide py-24 sm:py-32">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
            <Circle className="h-2 w-2 fill-[#c6ff3b] text-[#c6ff3b]" />
            Serviços
          </div>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-semibold leading-[1.05] text-white">
            O que costumo fazer,{' '}
            <span style={serifStyle} className="italic font-normal">
              com prazo e preço claros
            </span>
            .
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 60}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-display text-2xl font-semibold text-white">
                      {s.title}
                    </div>
                    <div className="mt-2 text-sm text-[#c6ff3b]">{s.from}</div>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <ul className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm text-white/70">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#c6ff3b]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="border-t border-white/10 bg-white/[0.02] py-24 sm:py-32">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              <Circle className="h-2 w-2 fill-[#c6ff3b] text-[#c6ff3b]" />
              Sobre
            </div>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-semibold leading-[1.05] text-white">
              Um{' '}
              <span style={serifStyle} className="italic font-normal">
                humano só
              </span>{' '}
              do brief à entrega.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              A MX Studio nasceu no Rio de Janeiro, entre agências, produto e
              consultoria, até virar um estúdio independente. O que aprendemos:
              cliente não quer site — quer que o site resolva.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Trabalhamos em equipe enxuta e fazemos poucos projetos por vez
              porque acreditamos que cuidar de perto é o que separa um site
              que só existe de um site que vende.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <EstudioBtn href="#contato">
                Vamos conversar
                <ArrowUpRight className="h-4 w-4" />
              </EstudioBtn>
              <EstudioBtn href="#trabalhos" variant="secondary">
                Ver os trabalhos
              </EstudioBtn>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
                  Stack
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>Next.js 14</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                  <li>Sanity / MDX</li>
                  <li>Vercel</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
                  Também trabalho com
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>Stripe / PagarMe</li>
                  <li>Google Maps</li>
                  <li>Supabase</li>
                  <li>Resend / Postmark</li>
                  <li>Cal.com / Calendly</li>
                  <li>Analytics 4 + Pixel</li>
                </ul>
              </div>
              <div className="col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
                  Como trabalho
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/80 sm:grid-cols-3">
                  <li className="flex items-center gap-2"><Handshake className="h-4 w-4 text-[#c6ff3b]" /> Contrato + escopo</li>
                  <li className="flex items-center gap-2"><Handshake className="h-4 w-4 text-[#c6ff3b]" /> Pagamento parcelado</li>
                  <li className="flex items-center gap-2"><Handshake className="h-4 w-4 text-[#c6ff3b]" /> Staging desde o dia 1</li>
                  <li className="flex items-center gap-2"><Handshake className="h-4 w-4 text-[#c6ff3b]" /> Código no seu GitHub</li>
                  <li className="flex items-center gap-2"><Handshake className="h-4 w-4 text-[#c6ff3b]" /> 30 dias de garantia</li>
                  <li className="flex items-center gap-2"><Handshake className="h-4 w-4 text-[#c6ff3b]" /> Sem lock-in</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-wide py-24 sm:py-32">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
            <Circle className="h-2 w-2 fill-[#c6ff3b] text-[#c6ff3b]" />
            FAQ
          </div>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-semibold leading-[1.05] text-white">
            O que as pessoas{' '}
            <span style={serifStyle} className="italic font-normal">
              costumam perguntar
            </span>
            .
          </h2>
        </Reveal>

        <div className="mt-14 mx-auto max-w-3xl divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.02]">
          {faq.map((f, i) => (
            <details
              key={f.q}
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="font-display text-base font-semibold text-white sm:text-lg">
                  {f.q}
                </span>
                <span className="mt-1 inline-grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative overflow-hidden border-t border-white/10 bg-white/[0.02] py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(198,255,59,0.14),transparent)]"
        />
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              <Circle className="h-2 w-2 fill-[#c6ff3b] text-[#c6ff3b]" />
              Contato
            </div>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-semibold leading-[1.05] text-white">
              Bora tirar o seu site{' '}
              <span style={serifStyle} className="italic font-normal">
                do papel
              </span>
              ?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              Me manda um resumo do projeto. Se fizer sentido, marco uma call
              de 30 min pra entender melhor e devolver uma proposta em até 3 dias.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white transition-colors hover:border-white/25"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">WhatsApp</div>
                  <div className="font-medium">{estudio.whatsappDisplay}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-white/50" />
              </a>
              <a
                href={`mailto:${estudio.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white transition-colors hover:border-white/25"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
                  @
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">E-mail</div>
                  <div className="font-medium">{estudio.email}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-white/50" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function HeroStat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-semibold text-white sm:text-4xl">{kpi}</div>
      <div className="mt-1 text-xs text-white/50">{label}</div>
    </div>
  );
}
