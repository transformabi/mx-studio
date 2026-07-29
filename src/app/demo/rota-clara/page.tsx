'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Clock, Lock, PlayCircle, ShieldCheck, Sparkles, Star, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, rotaClara } from '@/lib/demo-images';

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);
targetDate.setHours(23, 59, 59, 0);

const plans = [
  {
    id: 'solo',
    name: 'Solo',
    price: 897,
    installment: 89.7,
    installments: 12,
    highlight: false,
    features: [
      'Acesso ao curso principal (8 módulos)',
      '12 meses de acesso',
      'Certificado ao final',
      'Comunidade no Telegram',
    ],
  },
  {
    id: 'plus',
    name: 'Método completo',
    price: 1497,
    installment: 149.7,
    installments: 12,
    highlight: true,
    features: [
      'Tudo do Solo',
      '4 encontros ao vivo com a Larissa',
      'Vitalício + atualizações',
      'Grupo VIP com feedback',
      'Bônus: kit de planilhas',
    ],
  },
  {
    id: 'pro',
    name: 'Mentoria 1:1',
    price: 4997,
    installment: 499.7,
    installments: 12,
    highlight: false,
    features: [
      'Tudo do completo',
      '3 mentorias 1:1 com a Larissa',
      'Revisão do seu projeto',
      'WhatsApp direto por 90 dias',
    ],
  },
];

const modules = [
  { n: '01', title: 'Mentalidade e ponto de partida', duration: '58min · 6 aulas' },
  { n: '02', title: 'Diagnóstico da rota atual', duration: '1h12 · 8 aulas' },
  { n: '03', title: 'Escolha e priorização', duration: '48min · 5 aulas' },
  { n: '04', title: 'Ferramentas do método', duration: '2h30 · 12 aulas' },
  { n: '05', title: 'Execução em ciclos curtos', duration: '1h48 · 9 aulas' },
  { n: '06', title: 'Rotina e sustentação', duration: '52min · 6 aulas' },
  { n: '07', title: 'Curvas, imprevistos e recomeços', duration: '1h05 · 7 aulas' },
  { n: '08', title: 'A próxima rota', duration: '38min · 4 aulas' },
];

const faq = [
  {
    q: 'Pra quem é o Método Rota Clara?',
    a: 'Pra quem está numa transição de vida ou carreira e quer sair da paralisia analítica. Serve pra quem quer trocar de área, começar um negócio, retomar estudos ou reorganizar o dia a dia.',
  },
  {
    q: 'Vou precisar de conhecimento prévio?',
    a: 'Não. O método é feito pra ser prático desde o primeiro módulo. Você começa aplicando na primeira aula.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Garantia incondicional de 15 dias. Se não fizer sentido, devolvo 100% do valor. Sem enrolação.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'À vista no PIX (5% OFF) ou parcelado em até 12× sem juros no cartão. O acesso libera na hora.',
  },
  {
    q: 'Quanto tempo por semana preciso dedicar?',
    a: 'De 2 a 4 horas. As aulas ficam em blocos de 8 a 20 minutos, fáceis de encaixar entre compromissos.',
  },
];

const testimonials = [
  { name: 'Renata Mendes', role: 'Trocou de área aos 38', text: 'Consegui sair de uma carreira que não me servia mais sem me sentir irresponsável. O método deu clareza pra decisões que eu adiava há anos.', photo: rotaClara.testimonials.t1 },
  { name: 'Bruno Lima', role: 'Empreendedor', text: 'Já tinha feito outros cursos, mas esse é o mais prático. As ferramentas do módulo 4 mudaram como eu tomo decisões.', photo: rotaClara.testimonials.t2 },
  { name: 'Priscila Souza', role: 'Voltou aos estudos', text: 'A parte de mentalidade me deu coragem pra recomeçar. Estou fazendo minha primeira pós agora, aos 42.', photo: rotaClara.testimonials.t3 },
];

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

export default function RotaClaraDemo() {
  const { d, h, m, s } = useCountdown(targetDate);
  const [selectedPlan, setSelectedPlan] = useState(plans[1].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [payment, setPayment] = useState<'pix' | 'card' | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<0 | 1 | 2 | 3>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [seatsLeft, setSeatsLeft] = useState(23);

  useEffect(() => {
    const t = setInterval(() => {
      setSeatsLeft((v) => (v > 8 ? v - Math.random() > 0.7 ? v - 1 : v : v));
    }, 12000);
    return () => clearInterval(t);
  }, []);

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const finalPrice = payment === 'pix' ? plan.price * 0.95 : plan.price;

  const openCheckout = () => setCheckoutStep(1);

  const step1Next = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Nome obrigatório.';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'E-mail inválido.';
    if (!payment) e.payment = 'Escolha a forma de pagamento.';
    setErrors(e);
    if (Object.keys(e).length === 0) setCheckoutStep(2);
  };

  const step2Next = () => {
    if (payment === 'card') {
      const e: Record<string, string> = {};
      if (card.number.replace(/\s/g, '').length < 12) e.number = 'Cartão inválido.';
      if (!card.name.trim()) e.name = 'Nome no cartão obrigatório.';
      if (!card.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Formato MM/AA.';
      if (!card.cvv.match(/^\d{3,4}$/)) e.cvv = 'CVV inválido.';
      setErrors(e);
      if (Object.keys(e).length) return;
    }
    setCheckoutStep(3);
  };

  const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <DemoFrame siteName="Método Rota Clara" bg="#0f172a">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f172a]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#22d3ee] text-[#0f172a]">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-none text-white">
              <div className="font-display text-base font-semibold">Rota Clara</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-white/50">Método Larissa Nogueira</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#programa" className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">
              Programa
            </a>
            <a href="#depoimentos" className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">
              Alunos
            </a>
            <a href="#planos" className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">
              Planos
            </a>
            <a href="#faq" className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">
              FAQ
            </a>
          </nav>
          <a
            href="#planos"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#22d3ee] px-4 py-2 text-sm font-semibold text-[#0f172a] transition-transform hover:-translate-y-0.5"
          >
            Quero começar
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heros['rota-clara']}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a]/75 to-[#0f172a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_10%,rgba(34,211,238,0.35),transparent)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center text-white sm:px-6 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22d3ee] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22d3ee]" />
            </span>
            Nova turma · restam {seatsLeft} vagas
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            Do{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#22d3ee]">
              nevoeiro
            </em>
            <br />
            para uma rota clara.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Um método de 8 semanas pra você sair da paralisia analítica e tomar
            decisões de carreira e vida com clareza — mesmo em momento de virada.
          </p>

          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <Clock className="h-4 w-4 text-[#22d3ee]" />
              <div className="text-xs uppercase tracking-[0.14em] text-white/60">
                Oferta termina em
              </div>
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-white">
                <Digit v={d} u="d" />
                <span>:</span>
                <Digit v={h} u="h" />
                <span>:</span>
                <Digit v={m} u="m" />
                <span>:</span>
                <Digit v={s} u="s" />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#planos"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#22d3ee] px-6 py-3 text-sm font-semibold text-[#0f172a] transition-transform hover:-translate-y-0.5"
              >
                Ver os planos
                <ArrowRight className="h-4 w-4" />
              </a>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5">
                <PlayCircle className="h-4 w-4" />
                Assistir aula grátis
              </button>
            </div>
          </div>

          <div className="mx-auto mt-14 flex max-w-2xl items-center justify-center gap-3 border-t border-white/10 pt-6 text-xs text-white/60">
            <div className="flex -space-x-2">
              {rotaClara.students.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-[#0f172a] object-cover"
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1">4.9 · 1.482 alunos formados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programa */}
      <section id="programa" className="border-t border-white/10 bg-[#0f172a] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">O programa</div>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold sm:text-4xl">
            8 módulos, 8 semanas,{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              uma virada
            </em>
            .
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
            {modules.map((mod) => (
              <div key={mod.n} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] font-display text-sm font-bold text-[#22d3ee]">
                  {mod.n}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-base font-semibold text-white">
                    {mod.title}
                  </div>
                  <div className="mt-0.5 text-xs text-white/50">{mod.duration}</div>
                </div>
                <Lock className="h-4 w-4 text-white/30" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="border-t border-white/10 bg-[#0b1223] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">Alunos</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Gente igual você que virou de rota.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/80">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre a Larissa */}
      <section className="border-t border-white/10 bg-[#0b1223] py-16 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white/[0.03]">
              <img
                src={rotaClara.creator}
                alt="Larissa Nogueira"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">
              Quem ensina
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
              Larissa Nogueira,{' '}
              <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                mentora
              </em>{' '}
              de virada de carreira.
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Psicóloga, coach ICF e mentora há mais de 12 anos. Mais de 1.400
              pessoas passaram pelo método Rota Clara — profissionais de todas
              as áreas que precisavam sair do lugar-comum e recomeçar com
              clareza.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <div className="font-display text-2xl font-semibold text-white">12+ anos</div>
                <div className="mt-1 text-xs text-white/50">de mentoria</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-white">1.482</div>
                <div className="mt-1 text-xs text-white/50">alunos formados</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-white">ICF</div>
                <div className="mt-1 text-xs text-white/50">certificação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="border-t border-white/10 bg-[#0f172a] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">Investimento</div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
              Escolha o seu{' '}
              <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                nível
              </em>
              .
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Todos os planos incluem 15 dias de garantia incondicional.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                className={
                  'group text-left rounded-3xl border p-6 transition-all ' +
                  (p.id === selectedPlan
                    ? 'border-[#22d3ee] bg-[#22d3ee]/5 shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/30')
                }
              >
                {p.highlight && (
                  <div className="mb-4 inline-flex rounded-full bg-[#22d3ee] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0f172a]">
                    Mais escolhido
                  </div>
                )}
                <div className="font-display text-xl font-semibold text-white">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[11px] text-white/60">12× de</span>
                  <span className="font-display text-3xl font-semibold text-white">
                    {brl(p.installment).replace(',00', '')}
                  </span>
                </div>
                <div className="mt-1 text-xs text-white/50">
                  ou {brl(p.price)} à vista no PIX (−5%)
                </div>
                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-white/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22d3ee]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={'mt-6 rounded-full py-3 text-center text-sm font-semibold ' + (p.id === selectedPlan ? 'bg-[#22d3ee] text-[#0f172a]' : 'border border-white/15 text-white')}>
                  {p.id === selectedPlan ? '✓ Escolhido' : 'Escolher plano'}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={openCheckout}
              className="inline-flex items-center gap-2 rounded-full bg-[#22d3ee] px-8 py-4 text-base font-semibold text-[#0f172a] transition-transform hover:-translate-y-0.5"
            >
              Ir pro checkout · {plan.name}
              <ArrowRight className="h-5 w-5" />
            </button>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/50">
              <ShieldCheck className="h-3.5 w-3.5" />
              Ambiente seguro · SSL 256 bits · Garantia de 15 dias
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 bg-[#0b1223] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">FAQ</div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Dúvidas frequentes
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {faq.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display text-base font-semibold text-white">
                    {f.q}
                  </span>
                  <ChevronDown className={'h-5 w-5 shrink-0 text-white/50 transition-transform ' + (openFaq === i ? 'rotate-180' : '')} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-white/10 p-5 text-sm leading-relaxed text-white/70">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout modal */}
      {checkoutStep > 0 && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/80" onClick={() => setCheckoutStep(0)} aria-label="Fechar" />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0f172a] text-white shadow-2xl">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  Checkout seguro
                </div>
                <button
                  onClick={() => setCheckoutStep(0)}
                  className="grid h-9 w-9 place-items-center rounded-full text-white/60 hover:bg-white/5"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={'h-1 flex-1 rounded-full ' + (checkoutStep >= n ? 'bg-[#22d3ee]' : 'bg-white/10')} />
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-white/[0.05] p-3">
                <div className="text-xs text-white/50">Você está comprando</div>
                <div className="font-display text-base font-semibold">{plan.name} · Rota Clara</div>
              </div>
            </div>

            {checkoutStep === 1 && (
              <div className="px-6 py-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  1 · Seus dados
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nome completo"
                      className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none"
                    />
                    {errors.name && <div className="mt-1 text-xs text-red-400">{errors.name}</div>}
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@dominio.com"
                      className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none"
                    />
                    {errors.email && <div className="mt-1 text-xs text-red-400">{errors.email}</div>}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    Pagamento
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(['pix', 'card'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPayment(p)}
                        className={
                          'rounded-2xl border p-3 text-left transition-colors ' +
                          (payment === p ? 'border-[#22d3ee] bg-[#22d3ee]/10' : 'border-white/15 hover:border-white/30')
                        }
                      >
                        <div className="text-sm font-semibold">{p === 'pix' ? 'PIX' : 'Cartão'}</div>
                        <div className="text-[11px] text-white/60">
                          {p === 'pix' ? '5% OFF · aprovação em segundos' : `${plan.installments}× sem juros`}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.payment && <div className="mt-2 text-xs text-red-400">{errors.payment}</div>}
                </div>
                <button
                  onClick={step1Next}
                  className="mt-6 w-full rounded-full bg-[#22d3ee] py-3 text-sm font-semibold text-[#0f172a]"
                >
                  Continuar
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="px-6 py-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  2 · {payment === 'pix' ? 'Confirmação' : 'Cartão'}
                </div>
                {payment === 'card' ? (
                  <div className="mt-4 space-y-3">
                    <input
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      placeholder="Número do cartão"
                      className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none"
                    />
                    {errors.number && <div className="text-xs text-red-400">{errors.number}</div>}
                    <input
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      placeholder="Nome como está no cartão"
                      className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none"
                    />
                    {errors.name && <div className="text-xs text-red-400">{errors.name}</div>}
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                        placeholder="MM/AA"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none"
                      />
                      <input
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                        placeholder="CVV"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none"
                      />
                    </div>
                    {(errors.expiry || errors.cvv) && (
                      <div className="text-xs text-red-400">
                        {errors.expiry || errors.cvv}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl bg-white/[0.05] p-4 text-sm">
                    <p>
                      Ao confirmar, geramos o QR Code PIX pra pagamento. O
                      acesso libera automaticamente após a confirmação bancária
                      (poucos segundos).
                    </p>
                  </div>
                )}
                <div className="mt-6 flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-3 text-sm">
                  <div>
                    <div className="text-white/50 text-xs">Total</div>
                    <div className="font-display text-lg font-semibold">{brl(finalPrice)}</div>
                  </div>
                  {payment === 'pix' && (
                    <div className="text-xs font-medium text-[#22d3ee]">
                      Você economiza {brl(plan.price - finalPrice)}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="flex-1 rounded-full border border-white/15 py-3 text-sm font-semibold text-white"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={step2Next}
                    className="flex-1 rounded-full bg-[#22d3ee] py-3 text-sm font-semibold text-[#0f172a]"
                  >
                    Finalizar
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#22d3ee] text-[#0f172a]">
                  <Check className="h-8 w-8" />
                </div>
                <div className="mt-6 font-display text-2xl font-semibold">
                  Bem-vindo à Rota Clara, {name.split(' ')[0]}!
                </div>
                <p className="mt-3 text-sm text-white/70">
                  Seu acesso foi liberado no e-mail {email}. Este é um demo — nenhum pagamento processado.
                </p>
                <button
                  onClick={() => {
                    setCheckoutStep(0);
                    setName('');
                    setEmail('');
                    setPayment(null);
                    setCard({ number: '', name: '', expiry: '', cvv: '' });
                  }}
                  className="mt-8 rounded-full bg-[#22d3ee] px-6 py-3 text-sm font-semibold text-[#0f172a]"
                >
                  Voltar à página
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 bg-[#0f172a] py-8 text-center text-xs text-white/50">
        © 2025 Rota Clara · Larissa Nogueira · Demo por Max Costa · Estúdio
      </footer>
    </DemoFrame>
  );
}

function Digit({ v, u }: { v: number; u: string }) {
  return (
    <span className="tabular-nums">
      {String(v).padStart(2, '0')}
      <span className="ml-0.5 text-[10px] text-white/50">{u}</span>
    </span>
  );
}
