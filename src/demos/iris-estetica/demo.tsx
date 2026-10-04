'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Check, Clock, Droplets, Flower2, RotateCcw, Smile, Snowflake, Sparkles, Star, Waves, Zap } from 'lucide-react';
import { ArtTile, DemoArt } from '@/components/demo-art';
import { DemoFrame } from '@/components/demo-frame';
import { CountUp } from '@/components/fx/count-up';
import { irisEstetica } from '@/lib/demo-images';

const procedureIcons = {
  bioestimulador: Sparkles,
  toxina: Smile,
  laser: Zap,
  peeling: Droplets,
  criolipolise: Snowflake,
  drenagem: Waves,
};
import { useI18n } from '@/i18n/provider';
import { content } from './content';

type ProcedureId = keyof typeof irisEstetica.procedures;
type Area = 'rosto' | 'corpo' | 'pele';
type Period = 'morning' | 'afternoon' | 'evening';

/** Prices in BRL. */
const procedures: { id: ProcedureId; area: Area; price: number; minutes: number }[] = [
  { id: 'bioestimulador', area: 'rosto', price: 1890, minutes: 50 },
  { id: 'toxina', area: 'rosto', price: 1290, minutes: 30 },
  { id: 'laser', area: 'pele', price: 690, minutes: 40 },
  { id: 'peeling', area: 'pele', price: 390, minutes: 45 },
  { id: 'criolipolise', area: 'corpo', price: 890, minutes: 60 },
  { id: 'drenagem', area: 'corpo', price: 220, minutes: 60 },
];

const sessionTiers = [
  { sessions: 1, discount: 0 },
  { sessions: 4, discount: 10 },
  { sessions: 6, discount: 15 },
  { sessions: 8, discount: 20 },
  { sessions: 10, discount: 25 },
];

const recommendations: Record<string, ProcedureId[]> = {
  rejuvenescer: ['toxina', 'bioestimulador', 'laser'],
  firmeza: ['bioestimulador', 'criolipolise'],
  manchas: ['laser', 'peeling'],
  medidas: ['criolipolise', 'drenagem'],
};

export default function IrisEsteticaDemo() {
  const { locale, money } = useI18n();
  const c = content[locale];

  const [area, setArea] = useState<'all' | Area>('all');
  const [answers, setAnswers] = useState<string[]>([]);
  const [pkgProcedure, setPkgProcedure] = useState<ProcedureId>('bioestimulador');
  const [tierIdx, setTierIdx] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [period, setPeriod] = useState<Period>('afternoon');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const visible = procedures.filter((p) => area === 'all' || p.area === area);
  const quizDone = answers.length === c.quiz.length;

  const suggested = useMemo(() => {
    if (!quizDone) return [];
    const ids = recommendations[answers[0]] ?? [];
    const byArea = ids.filter((id) => {
      const p = procedures.find((x) => x.id === id)!;
      if (answers[1] === 'rosto') return p.area !== 'corpo';
      if (answers[1] === 'corpo') return p.area === 'corpo';
      return true;
    });
    return (byArea.length ? byArea : ids).slice(0, 2);
  }, [answers, quizDone]);

  const pkg = procedures.find((p) => p.id === pkgProcedure)!;
  const tier = sessionTiers[tierIdx];
  const perSession = pkg.price * (1 - tier.discount / 100);
  const total = perSession * tier.sessions;
  const savings = pkg.price * tier.sessions - total;

  const choosePackage = (id: ProcedureId) => {
    setPkgProcedure(id);
    document.getElementById('pacotes')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = c.errors.name;
    if (!phone.match(/\d{8,}/)) e.phone = c.errors.phone;
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  return (
    <DemoFrame siteName="Íris Estética Avançada" bg="#faf6f3">
      <div className="text-[#2a1b22]">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[#2a1b22]/10 bg-[#faf6f3]/85 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#a8566a]/40 text-[#a8566a]">
                <Flower2 className="h-4 w-4" />
              </span>
              <div className="leading-none">
                <div style={{ fontFamily: 'var(--font-instrument-serif)' }} className="text-xl italic">Íris</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#2a1b22]/50">{c.tagline}</div>
              </div>
            </div>
            <nav className="hidden items-center gap-1 sm:flex">
              {[
                { href: '#protocolos', label: c.navProtocols },
                { href: '#avaliacao', label: c.navQuiz },
                { href: '#pacotes', label: c.navPackages },
              ].map((l) => (
                <a key={l.href} href={l.href} className="rounded-full px-3 py-1.5 text-sm text-[#2a1b22]/70 hover:bg-[#f1e3e6] hover:text-[#2a1b22]">
                  {l.label}
                </a>
              ))}
            </nav>
            <a href="#reservar" className="rounded-full bg-[#2a1b22] px-4 py-2 text-sm font-semibold text-[#faf6f3] transition-transform hover:-translate-y-0.5">
              {c.book}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute -left-40 top-10 h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(240,171,252,0.35),transparent_65%)]" />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#a8566a]">{c.heroEyebrow}</div>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
                {c.heroTitleA}{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#a8566a]">
                  {c.heroTitleEm}
                </em>{' '}
                {c.heroTitleB}
              </h1>
              <p className="mt-6 max-w-lg text-lg text-[#2a1b22]/65">{c.heroLead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#avaliacao" className="inline-flex items-center gap-1.5 rounded-full bg-[#a8566a] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(168,86,106,0.8)] transition-transform hover:-translate-y-0.5">
                  <Sparkles className="h-4 w-4" />
                  {c.startQuiz}
                </a>
                <a href="#protocolos" className="rounded-full border border-[#2a1b22]/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white">
                  {c.seeProtocols}
                </a>
              </div>
              <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[#2a1b22]/10 pt-6">
                {c.heroStats.map((s) => (
                  <div key={s.label}>
                    <CountUp value={s.kpi} className="block font-display text-3xl font-semibold" />
                    <div className="mt-1 text-xs text-[#2a1b22]/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="relative aspect-3/4 overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-[#f1e3e6]">
                  <DemoArt slug="iris-estetica" />
                  {irisEstetica.space && (
                    <img src={irisEstetica.space} alt={c.heroAlt} data-fallback="hide" className="absolute inset-0 h-full w-full object-cover" />
                  )}
                </div>
                <div className="absolute -left-4 bottom-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-lg">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-[#2a1b22]/50">Google</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Protocolos */}
        <section id="protocolos" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#a8566a]">{c.protocolsEyebrow}</div>
                <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
                  {c.protocolsTitleA}{' '}
                  <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                    {c.protocolsTitleEm}
                  </em>
                  .
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['all', 'rosto', 'corpo', 'pele'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setArea(a)}
                    aria-pressed={area === a}
                    className={
                      'rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                      (area === a ? 'border-[#2a1b22] bg-[#2a1b22] text-white' : 'border-[#2a1b22]/15 hover:border-[#2a1b22]/40')
                    }
                  >
                    {c.areas[a]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => {
                const photo = irisEstetica.procedures[p.id];
                return (
                  <article key={p.id} className="group overflow-hidden rounded-4xl bg-[#faf6f3] transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgba(42,27,34,0.45)]">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <ArtTile
                        icon={procedureIcons[p.id]}
                        from="#fdf2f5"
                        to={p.area === 'corpo' ? '#d9a3b3' : p.area === 'pele' ? '#e8c4a8' : '#e7b6c4'}
                        iconClassName="text-white/80"
                      />
                      {photo && (
                        <img
                          src={photo}
                          alt={c.procedures[p.id].name}
                          data-fallback="hide"
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm">
                        {c.areas[p.area]}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold">{c.procedures[p.id].name}</h3>
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs text-[#2a1b22]/50">
                          <Clock className="h-3.5 w-3.5" />
                          {c.minutes(p.minutes)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#2a1b22]/60">{c.procedures[p.id].desc}</p>
                      <div className="mt-5 flex items-end justify-between border-t border-[#2a1b22]/10 pt-4">
                        <div>
                          <div className="text-[11px] text-[#2a1b22]/50">{c.from}</div>
                          <div className="font-display text-xl font-semibold text-[#a8566a]">{money(p.price, { decimals: 0 })}</div>
                        </div>
                        <button onClick={() => choosePackage(p.id)} className="inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2">
                          {c.buildPackage} <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section id="avaliacao" className="bg-[#2a1b22] py-20 text-[#faf6f3]">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f0abfc]">{c.quizEyebrow}</div>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">{c.quizTitle}</h2>

            <div className="mt-10 rounded-4xl border border-white/10 bg-white/4 p-6 text-left sm:p-10">
              {!quizDone ? (
                <div key={answers.length} className="animate-[page-enter_0.5s_ease_both]">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    <span>{c.quizStep(answers.length + 1)}</span>
                    {answers.length > 0 && (
                      <button onClick={() => setAnswers((a) => a.slice(0, -1))} className="normal-case tracking-normal text-white/60 hover:text-white">
                        ←
                      </button>
                    )}
                  </div>
                  <div className="mt-3 h-1 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#f0abfc] transition-all duration-500" style={{ width: `${(answers.length / c.quiz.length) * 100}%` }} />
                  </div>
                  <div className="mt-8 font-display text-2xl font-semibold">{c.quiz[answers.length].q}</div>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {c.quiz[answers.length].options.map((o) => (
                      <button
                        key={o.v}
                        onClick={() => setAnswers((a) => [...a, o.v])}
                        className="group flex items-center justify-between rounded-2xl border border-white/15 p-4 text-left text-sm font-medium transition-colors hover:border-[#f0abfc] hover:bg-[#f0abfc]/10"
                      >
                        {o.l}
                        <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="animate-[page-enter_0.5s_ease_both]">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f0abfc]">{c.quizResultEyebrow}</div>
                  <p className="mt-2 text-white/70">{c.quizResultLead}</p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {suggested.map((id) => (
                      <div key={id} className="rounded-2xl border border-[#f0abfc]/30 bg-[#f0abfc]/10 p-4">
                        <div className="flex items-center gap-2 font-display text-lg font-semibold">
                          <Check className="h-4 w-4 text-[#f0abfc]" />
                          {c.procedures[id].name}
                        </div>
                        <p className="mt-1 text-sm text-white/60">{c.procedures[id].desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-white/60">{answers[2] === 'nunca' ? c.quizFirstTime : c.quizExperienced}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#reservar" className="inline-flex items-center gap-1.5 rounded-full bg-[#f0abfc] px-5 py-3 text-sm font-semibold text-[#2a1b22]">
                      {c.quizBook} <ArrowRight className="h-4 w-4" />
                    </a>
                    <button onClick={() => setAnswers([])} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">
                      <RotateCcw className="h-4 w-4" /> {c.quizRestart}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pacotes */}
        <section id="pacotes" className="py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#a8566a]">{c.packagesEyebrow}</div>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
                {c.packagesTitleA}{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#a8566a]">
                  {c.packagesTitleEm}
                </em>
                .
              </h2>
              <p className="mt-4 text-[#2a1b22]/65">{c.packagesLead}</p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-4xl bg-white p-6 shadow-[0_30px_60px_-40px_rgba(42,27,34,0.45)] sm:p-8">
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2a1b22]/50" htmlFor="iris-procedure">
                  {c.procedureLabel}
                </label>
                <select
                  id="iris-procedure"
                  value={pkgProcedure}
                  onChange={(e) => setPkgProcedure(e.target.value as ProcedureId)}
                  className="mt-2 w-full rounded-2xl border border-[#2a1b22]/15 bg-[#faf6f3] px-4 py-3 text-sm font-medium focus:border-[#a8566a] focus:outline-hidden"
                >
                  {procedures.map((p) => (
                    <option key={p.id} value={p.id}>
                      {c.procedures[p.id].name} · {money(p.price, { decimals: 0 })}
                    </option>
                  ))}
                </select>

                <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2a1b22]/50">{c.sessionsLabel}</div>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {sessionTiers.map((t, i) => (
                    <button
                      key={t.sessions}
                      onClick={() => setTierIdx(i)}
                      className={
                        'rounded-2xl border py-3 text-center transition-colors ' +
                        (tierIdx === i ? 'border-[#a8566a] bg-[#a8566a] text-white' : 'border-[#2a1b22]/10 hover:border-[#a8566a]/50')
                      }
                    >
                      <div className="font-display text-xl font-semibold">{t.sessions}</div>
                      <div className={'text-[10px] ' + (tierIdx === i ? 'text-white/80' : 'text-[#2a1b22]/50')}>
                        {t.discount ? c.off(t.discount) : '—'}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-[#faf6f3] p-5">
                  <div>
                    <div className="text-xs text-[#2a1b22]/50">{c.perSession}</div>
                    <div className="mt-1 font-display text-2xl font-semibold">{money(perSession)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#2a1b22]/50">{c.total}</div>
                    <div key={total} className="mt-1 animate-[page-enter_0.4s_ease_both] font-display text-3xl font-semibold text-[#a8566a]">
                      {money(total)}
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#2a1b22]/10 pt-3 text-xs">
                    <span className="font-semibold text-emerald-700">{savings > 0 ? c.savings(money(savings)) : c.single}</span>
                    <span className="text-[#2a1b22]/50">{c.installments(money(total / 10))}</span>
                  </div>
                </div>

                <a href="#reservar" className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#2a1b22] py-3.5 text-sm font-semibold text-white">
                  {c.bookPackage} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Reserva */}
        <section id="reservar" className="bg-[#f1e3e6] py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <div className="rounded-4xl bg-white p-6 sm:p-10">
              {sent ? (
                <div className="py-6 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#a8566a] text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="mt-6 font-display text-2xl font-semibold">{c.doneTitle(name.split(' ')[0])}</div>
                  <p className="mt-2 text-sm text-[#2a1b22]/60">{c.doneText}</p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName('');
                      setPhone('');
                    }}
                    className="mt-6 rounded-full border border-[#2a1b22]/15 px-5 py-2.5 text-sm font-semibold"
                  >
                    {c.newRequest}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-3xl font-semibold">{c.bookingTitle}</h2>
                  <p className="mt-2 text-sm text-[#2a1b22]/60">{c.bookingLead}</p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2a1b22]/50">{c.name}</span>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder={c.namePlaceholder} className="mt-2 w-full rounded-xl border border-[#2a1b22]/15 px-4 py-3 text-sm focus:border-[#a8566a] focus:outline-hidden" />
                      {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2a1b22]/50">WhatsApp</span>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(21) 99999-9999" className="mt-2 w-full rounded-xl border border-[#2a1b22]/15 px-4 py-3 text-sm focus:border-[#a8566a] focus:outline-hidden" />
                      {errors.phone && <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>}
                    </label>
                  </div>
                  <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2a1b22]/50">{c.periodLabel}</div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(['morning', 'afternoon', 'evening'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={'rounded-full border py-2.5 text-sm font-medium transition-colors ' + (period === p ? 'border-[#a8566a] bg-[#a8566a] text-white' : 'border-[#2a1b22]/15')}
                      >
                        {c.periods[p]}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl bg-[#faf6f3] px-4 py-3 text-sm">
                    <span className="text-[#2a1b22]/50">{c.interest}: </span>
                    <span className="font-semibold">
                      {c.procedures[pkgProcedure].name} · {tier.sessions}×
                    </span>
                  </div>
                  <button onClick={submit} className="mt-6 w-full rounded-full bg-[#a8566a] py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                    {c.send}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <footer className="border-t border-[#2a1b22]/10 bg-[#faf6f3] py-8 text-center text-xs text-[#2a1b22]/50">
          <div>{c.note}</div>
          <div className="mt-1">© 2026 Íris Estética Avançada · {c.demoBy}</div>
        </footer>
      </div>
    </DemoFrame>
  );
}
