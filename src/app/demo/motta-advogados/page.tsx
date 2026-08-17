'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Check, Gavel, Scale, ShieldCheck, Users, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, mottaPartners } from '@/lib/demo-images';

type Area = {
  id: string;
  name: string;
  short: string;
  bio: string;
  bullets: string[];
  cases: string;
  icon: JSX.Element;
};

const areas: Area[] = [
  {
    id: 'empresarial',
    name: 'Direito empresarial',
    short: 'Constituição, contratos, disputas.',
    bio: 'Cuidamos da vida jurídica de empresas do porte de PMEs a grupos econômicos. Do contrato societário à disputa comercial complexa.',
    bullets: [
      'Constituição societária e reestruturação',
      'Contratos comerciais e M&A',
      'Recuperação judicial e falências',
      'Compliance e governança',
    ],
    cases: 'Atuação desde 2011',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: 'tributario',
    name: 'Tributário',
    short: 'Planejamento e contencioso fiscal.',
    bio: 'Reduzimos a carga tributária dentro da lei e defendemos autuações administrativas e judiciais em todas as instâncias.',
    bullets: [
      'Planejamento tributário',
      'Contencioso administrativo (CARF)',
      'Ações declaratórias e repetição',
      'Consultoria em ICMS, ISS, PIS/COFINS',
    ],
    cases: 'Contencioso administrativo e judicial',
    icon: <Scale className="h-5 w-5" />,
  },
  {
    id: 'trabalhista',
    name: 'Trabalhista',
    short: 'Defesa empresarial e assessoria.',
    bio: 'Assessoria preventiva e defesa em reclamações trabalhistas, com foco na redução de passivos e no compliance da folha.',
    bullets: [
      'Consultoria preventiva',
      'Defesa em reclamações',
      'Acordos individuais e coletivos',
      'Auditoria de folha e riscos',
    ],
    cases: 'Defesa empresarial e prevenção',
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: 'civel',
    name: 'Cível',
    short: 'Contratos, responsabilidade, imóveis.',
    bio: 'Atuação em disputas cíveis complexas: contratos, responsabilidade civil, imobiliário, sucessões e família de alta renda.',
    bullets: [
      'Contratos e responsabilidade civil',
      'Imobiliário e locações',
      'Família e sucessões',
      'Recuperação de crédito',
    ],
    cases: '17 anos de atuação',
    icon: <Gavel className="h-5 w-5" />,
  },
];

const urgencyOptions = [
  { v: 'baixa', l: 'Consultiva · sem prazo', desc: 'Quero entender melhor uma situação.' },
  { v: 'media', l: 'Preventiva · sem crise', desc: 'Estou me organizando pra algo.' },
  { v: 'alta', l: 'Urgente · há prazo', desc: 'Já recebi uma notificação, citação ou ação.' },
];

export default function MottaDemo() {
  const [drawerArea, setDrawerArea] = useState<Area | null>(null);
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [areaSel, setAreaSel] = useState<Area | null>(null);
  const [urgency, setUrgency] = useState<string | null>(null);
  const [detail, setDetail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nextStep = () => {
    const e: Record<string, string> = {};
    if (step === 1 && !areaSel) e.area = 'Escolha uma área.';
    if (step === 2 && !urgency) e.urgency = 'Escolha uma opção.';
    if (step === 3 && detail.trim().length < 20) e.detail = 'Descreva com um pouco mais de detalhe.';
    if (step === 4) {
      if (!name.trim()) e.name = 'Nome é obrigatório.';
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'E-mail inválido.';
      if (!phone.match(/\d{8,}/)) e.phone = 'Telefone incompleto.';
    }
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (step === 4) setStep(0);
      else setStep((s) => (s + 1) as typeof step);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const finalSubmit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Nome é obrigatório.';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'E-mail inválido.';
    if (!phone.match(/\d{8,}/)) e.phone = 'Telefone incompleto.';
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setStep(0);
    setAreaSel(null);
    setUrgency(null);
    setDetail('');
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
  };

  return (
    <DemoFrame siteName="Motta Advogados" bg="#f8f7f4">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-[#f8f7f4]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1e1b4b] text-white">
              <Scale className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="font-display text-base font-semibold text-[#1e1b4b]">Motta</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">Advogados</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#areas" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              Áreas
            </a>
            <a href="#socios" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              Sócios
            </a>
            <a href="#casos" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              Casos
            </a>
          </nav>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1e1b4b] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Iniciar consulta
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a78bfa]">
            Desde 2008 · Rio de Janeiro
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] text-[#1e1b4b] sm:text-5xl lg:text-6xl">
            Um escritório para quando{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              a causa importa
            </em>
            .
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
            Atuamos em direito empresarial, tributário, trabalhista e cível para
            empresas e pessoas físicas de alta renda que exigem excelência
            técnica e presença próxima.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1e1b4b] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Iniciar consulta
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#areas"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-[#1e1b4b] transition-colors hover:bg-neutral-50"
            >
              Ver áreas de atuação
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-4">
            <Stat kpi="17+" label="anos de banca" />
            <Stat kpi="6" label="advogados no time" />
            <Stat kpi="24h" label="para primeiro retorno" />
            <Stat kpi="4" label="áreas de atuação" />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl bg-[#dcd7c8]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={heros['motta-advogados']}
                alt="Biblioteca Motta Advogados"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />
            </div>
            <blockquote className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur">
              <p style={{ fontFamily: 'var(--font-instrument-serif)' }} className="text-lg italic leading-snug text-[#1e1b4b]">
                "A gente não vende resultado. A gente compromete presença
                técnica no seu problema."
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-neutral-200 pt-4">
                <img
                  src={mottaPartners.p1}
                  alt="Dr. Henrique Motta"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#1e1b4b]">Dr. Henrique Motta</div>
                  <div className="text-neutral-600">Sócio-fundador · OAB/RJ 138.472</div>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Áreas */}
      <section id="areas" className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a78bfa]">
            Áreas de atuação
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-[#1e1b4b] sm:text-4xl">
            Quatro áreas.{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              Uma banca.
            </em>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {areas.map((a) => (
              <button
                key={a.id}
                onClick={() => setDrawerArea(a)}
                className="group flex items-start gap-5 rounded-3xl border border-neutral-200 bg-white p-6 text-left transition-all hover:border-[#1e1b4b] hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#1e1b4b]/20 bg-[#1e1b4b]/5 text-[#1e1b4b] transition-colors group-hover:bg-[#1e1b4b] group-hover:text-white">
                  {a.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-lg font-semibold text-[#1e1b4b]">
                    {a.name}
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">{a.short}</p>
                  <div className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[#a78bfa]">
                    {a.cases}
                  </div>
                </div>
                <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-[#1e1b4b]" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sócios */}
      <section id="socios" className="bg-[#f8f7f4] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a78bfa]">Quem cuida</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-[#1e1b4b] sm:text-4xl">
            Os sócios que{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              olham o seu caso
            </em>{' '}
            no olho.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { name: 'Dr. Henrique Motta', role: 'Sócio-fundador', area: 'Direito empresarial · Tributário', oab: 'OAB/RJ 138.472', photo: mottaPartners.p1 },
              { name: 'Dra. Fernanda Ferreira', role: 'Sócia', area: 'Trabalhista · Cível', oab: 'OAB/RJ 142.900', photo: mottaPartners.p2 },
              { name: 'Dr. Rodrigo Barreto', role: 'Sócio', area: 'Tributário · Contencioso', oab: 'OAB/RJ 156.203', photo: mottaPartners.p3 },
            ].map((s) => (
              <div key={s.name} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={s.photo}
                    alt={s.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="font-display text-lg font-semibold text-[#1e1b4b]">{s.name}</div>
                  <div className="text-xs text-neutral-500">{s.role}</div>
                  <div className="mt-4 border-t border-neutral-200 pt-4 text-sm text-neutral-700">
                    {s.area}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">{s.oab}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos */}
      <section id="casos" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a78bfa]">Casos-tipo</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-[#1e1b4b] sm:text-4xl">
            Situações reais em que atuamos.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { area: 'Tributário', title: 'Repetição de indébito ICMS-ST', scope: 'Levantamento de créditos e ação de repetição' },
              { area: 'Empresarial', title: 'Reestruturação societária', scope: 'Planejamento societário e redação do acordo' },
              { area: 'Trabalhista', title: 'Rescisão de alto valor', scope: 'Negociação e formalização do acordo' },
              { area: 'Cível', title: 'Ação de despejo comercial', scope: 'Ação de despejo e acompanhamento processual' },
              { area: 'Tributário', title: 'Defesa CARF ISS', scope: 'Defesa administrativa perante o CARF' },
              { area: 'Empresarial', title: 'M&A de médio porte', scope: 'Due diligence e assessoria na negociação' },
            ].map((c) => (
              <div key={c.title} className="group rounded-2xl border border-neutral-200 bg-[#f8f7f4] p-5 transition-colors hover:border-[#1e1b4b]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a78bfa]">
                  {c.area}
                </div>
                <div className="mt-2 font-display text-base font-semibold text-[#1e1b4b]">
                  {c.title}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-neutral-200 pt-4 text-sm text-neutral-700">
                  <Check className="h-4 w-4 text-[#a78bfa]" />
                  {c.scope}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-[#f8f7f4]/50 p-5 text-xs text-neutral-600">
            <ShieldCheck className="mr-2 inline h-4 w-4 text-[#1e1b4b]" />
            Em conformidade com o Provimento 205/2021 do CFOAB: esta seção descreve
            o tipo de atuação, sem divulgação de resultados, valores ou honorários.
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#1e1b4b] py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-5xl">
            Precisa de{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              orientação jurídica
            </em>
            ?
          </h2>
          <p className="max-w-2xl text-white/70">
            Consulta inicial confidencial. Respondemos em até 24 horas úteis
            com uma triagem gratuita e um orçamento se for o caso.
          </p>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#a78bfa] px-6 py-3 text-sm font-semibold text-[#1e1b4b] transition-transform hover:-translate-y-0.5"
          >
            Iniciar consulta triada
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* AREA DRAWER */}
      {drawerArea && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <button className="flex-1 bg-black/60" onClick={() => setDrawerArea(null)} aria-label="Fechar" />
          <aside className="flex w-full max-w-lg flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1e1b4b] text-white">
                  {drawerArea.icon}
                </span>
                <div>
                  <div className="font-display text-lg font-semibold text-[#1e1b4b]">
                    {drawerArea.name}
                  </div>
                  <div className="text-xs text-neutral-500">{drawerArea.cases}</div>
                </div>
              </div>
              <button
                onClick={() => setDrawerArea(null)}
                className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-sm leading-relaxed text-neutral-700">{drawerArea.bio}</p>
              <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                O que fazemos
              </div>
              <ul className="mt-4 space-y-3">
                {drawerArea.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-neutral-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1e1b4b]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-neutral-200 p-4">
              <button
                onClick={() => {
                  setAreaSel(drawerArea);
                  setDrawerArea(null);
                  setStep(2);
                }}
                className="w-full rounded-full bg-[#1e1b4b] py-3 text-sm font-semibold text-white"
              >
                Consultar sobre {drawerArea.name.toLowerCase()}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* TRIAGEM MULTI-STEP MODAL */}
      {step > 0 && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/70" onClick={() => setStep(0)} aria-label="Fechar" />
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-neutral-200 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Triagem · passo {Math.min(step, 4)} de 4
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className={'h-1 flex-1 rounded-full ' + (step >= n ? 'bg-[#1e1b4b]' : 'bg-neutral-200')} />
                ))}
              </div>
            </div>

            <div className="px-6 py-6">
              {!submitted && step === 1 && (
                <div>
                  <div className="font-display text-xl font-semibold text-[#1e1b4b]">
                    Sobre qual área é a sua dúvida?
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">Escolha a que melhor descreve seu caso.</p>
                  <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {areas.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setAreaSel(a)}
                        className={
                          'flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ' +
                          (areaSel?.id === a.id
                            ? 'border-[#1e1b4b] bg-[#1e1b4b]/5'
                            : 'border-neutral-200 hover:border-neutral-400')
                        }
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1e1b4b]/10 text-[#1e1b4b]">
                          {a.icon}
                        </span>
                        <span className="text-sm font-medium text-[#1e1b4b]">{a.name}</span>
                      </button>
                    ))}
                  </div>
                  {errors.area && <div className="mt-3 text-xs text-red-600">{errors.area}</div>}
                </div>
              )}

              {!submitted && step === 2 && (
                <div>
                  <div className="font-display text-xl font-semibold text-[#1e1b4b]">
                    Qual a urgência do seu caso?
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">Isso nos ajuda a priorizar a resposta.</p>
                  <div className="mt-6 space-y-2">
                    {urgencyOptions.map((o) => (
                      <button
                        key={o.v}
                        onClick={() => setUrgency(o.v)}
                        className={
                          'block w-full rounded-2xl border p-4 text-left transition-colors ' +
                          (urgency === o.v ? 'border-[#1e1b4b] bg-[#1e1b4b]/5' : 'border-neutral-200 hover:border-neutral-400')
                        }
                      >
                        <div className="font-medium text-[#1e1b4b]">{o.l}</div>
                        <div className="text-xs text-neutral-500">{o.desc}</div>
                      </button>
                    ))}
                  </div>
                  {errors.urgency && <div className="mt-3 text-xs text-red-600">{errors.urgency}</div>}
                </div>
              )}

              {!submitted && step === 3 && (
                <div>
                  <div className="font-display text-xl font-semibold text-[#1e1b4b]">
                    Conte brevemente sobre a situação.
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">Sem detalhes sensíveis por enquanto — tudo será refinado na consulta.</p>
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    rows={6}
                    placeholder="Ex.: recebi uma notificação de auto de infração ISS, valor aproximado R$ 340 mil, prazo pra defesa em 30 dias…"
                    className="mt-6 w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-[#1e1b4b] focus:outline-none"
                  />
                  <div className="mt-2 text-xs text-neutral-500">
                    Mínimo 20 caracteres. {detail.length}/500.
                  </div>
                  {errors.detail && <div className="mt-1 text-xs text-red-600">{errors.detail}</div>}
                </div>
              )}

              {!submitted && step === 4 && (
                <div>
                  <div className="font-display text-xl font-semibold text-[#1e1b4b]">
                    Como te encontramos?
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-3">
                    <Input label="Nome" value={name} onChange={setName} error={errors.name} placeholder="Seu nome completo" />
                    <Input label="Empresa (opcional)" value={company} onChange={setCompany} placeholder="Se for pela empresa" />
                    <Input label="E-mail" value={email} onChange={setEmail} error={errors.email} placeholder="voce@dominio.com" type="email" />
                    <Input label="WhatsApp" value={phone} onChange={setPhone} error={errors.phone} placeholder="(21) 99999-9999" />
                  </div>
                </div>
              )}

              {submitted && (
                <div className="py-6 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#1e1b4b] text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="mt-6 font-display text-2xl font-semibold text-[#1e1b4b]">
                    Recebido, {name.split(' ')[0]}.
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    Um dos sócios vai avaliar seu caso e responder em até 24h úteis pelo canal escolhido. Este é apenas um demo.
                  </p>
                  <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-left text-sm">
                    <div><span className="text-neutral-500">Área: </span>{areaSel?.name}</div>
                    <div className="mt-1"><span className="text-neutral-500">Urgência: </span>{urgencyOptions.find((u) => u.v === urgency)?.l}</div>
                  </div>
                  <button
                    onClick={reset}
                    className="mt-6 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-[#1e1b4b]"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>

            {!submitted && (
              <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4">
                <button
                  onClick={() => setStep((s) => (s > 1 ? ((s - 1) as typeof s) : s))}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1 text-sm text-neutral-500 disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
                <button
                  onClick={() => (step === 4 ? finalSubmit() : nextStep())}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1e1b4b] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {step === 4 ? 'Enviar triagem' : 'Continuar'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        © 2025 Motta Advogados · Demo por Max Costa · Estúdio
      </footer>
    </DemoFrame>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-[#1e1b4b] sm:text-3xl">{kpi}</div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-[#1e1b4b] focus:outline-none"
      />
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
  );
}
