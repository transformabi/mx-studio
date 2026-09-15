'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CalendarCheck, Check, Clock, ScanLine, ShieldCheck, Sparkles } from 'lucide-react';
import { EditorialPortrait } from '@/components/avatar';
import { DemoArt } from '@/components/demo-art';
import { DemoFrame } from '@/components/demo-frame';
import { lumiOdonto } from '@/lib/demo-images';
import { useI18n } from '@/i18n/provider';
import { content } from './content';

type Period = 'morning' | 'afternoon' | 'evening';

/** Simplified shade-guide colors, darkest to lightest. */
const shades = [
  { name: 'A3.5', color: '#d6bb86' },
  { name: 'A3', color: '#dfc898' },
  { name: 'A2', color: '#e8d6ae' },
  { name: 'A1', color: '#efe3c5' },
  { name: 'B1', color: '#f4edd9' },
  { name: 'BL2', color: '#f8f5ea' },
  { name: 'BL1', color: '#fdfcf6' },
];

const teamMeta = [
  { photo: lumiOdonto.team.d1, cro: 'CRO-RJ 45.210' },
  { photo: lumiOdonto.team.d2, cro: 'CRO-RJ 51.874' },
  { photo: lumiOdonto.team.d3, cro: 'CRO-RJ 48.332' },
];

const badgeIcons = [ScanLine, Clock, ShieldCheck];

function mixHex(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const channel = (shift: number) => {
    const from = (pa >> shift) & 255;
    const to = (pb >> shift) & 255;
    return Math.round(from + (to - from) * t);
  };
  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

function shadeColor(level: number) {
  const pos = (level / 100) * (shades.length - 1);
  const i = Math.min(shades.length - 2, Math.floor(pos));
  return mixHex(shades[i].color, shades[i + 1].color, pos - i);
}

function nextDays(count = 6) {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(new Date(d));
  }
  return days;
}

export default function LumiOdontoDemo() {
  const { locale, intl } = useI18n();
  const c = content[locale];

  const [level, setLevel] = useState(55);
  const [tab, setTab] = useState(0);
  const days = useMemo(() => nextDays(6), []);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [treatment, setTreatment] = useState<number | null>(null);
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [period, setPeriod] = useState<Period | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shadeIdx = Math.round((level / 100) * (shades.length - 1));
  const treatmentLabel = (i: number | null) => (i === null ? '' : i === c.treatments.length ? c.notSure : c.treatments[i].name);

  const advance = () => {
    const e: Record<string, string> = {};
    if (step === 1 && treatment === null) e.treatment = c.errors.treatment;
    if (step === 2 && (dayIdx === null || !period)) e.slot = c.errors.slot;
    if (step === 3) {
      if (!name.trim()) e.name = c.errors.name;
      if (!phone.match(/\d{8,}/)) e.phone = c.errors.phone;
    }
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => (s + 1) as typeof step);
  };

  const reset = () => {
    setStep(1);
    setTreatment(null);
    setDayIdx(null);
    setPeriod(null);
    setName('');
    setPhone('');
  };

  const bookTreatment = (i: number) => {
    setTreatment(i);
    setStep(1);
    document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
  };

  const current = c.treatments[tab];

  return (
    <DemoFrame siteName="Lumi Odontologia" bg="#f6f9fb">
      <div className="text-[#0b2239]">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-sky-900/10 bg-[#f6f9fb]/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0b2239] text-[#7dd3fc]">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="leading-none">
                <div className="font-display text-base font-semibold">lumi</div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#0b2239]/50">{c.tagline}</div>
              </div>
            </div>
            <nav className="hidden items-center gap-1 sm:flex">
              {[
                { href: '#simulador', label: c.navSimulator },
                { href: '#tratamentos', label: c.navTreatments },
                { href: '#equipe', label: c.navTeam },
              ].map((l) => (
                <a key={l.href} href={l.href} className="rounded-full px-3 py-1.5 text-sm text-[#0b2239]/70 hover:bg-sky-100 hover:text-[#0b2239]">
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href="#agendar"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0b2239] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <CalendarCheck className="h-4 w-4" />
              <span className="hidden sm:inline">{c.book}</span>
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.45),transparent_65%)]" />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#0b2239]/60">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {c.heroEyebrow}
              </div>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                {c.heroTitleA}{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-sky-500">
                  {c.heroTitleEm}
                </em>
                .
              </h1>
              <p className="mt-6 max-w-lg text-lg text-[#0b2239]/65">{c.heroLead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#agendar" className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(14,165,233,0.7)] transition-transform hover:-translate-y-0.5">
                  {c.book}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#simulador" className="rounded-full border border-sky-900/15 bg-white px-5 py-3 text-sm font-semibold transition-colors hover:bg-sky-50">
                  {c.trySimulator}
                </a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-sky-900/10 pt-6 text-sm">
                {c.heroBadges.map((b, i) => {
                  const Icon = badgeIcons[i];
                  return (
                    <div key={b.title} className="flex items-start gap-2">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                      <div>
                        <div className="font-semibold">{b.title}</div>
                        <div className="text-xs text-[#0b2239]/50">{b.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-sky-100 sm:aspect-[4/3] lg:aspect-[4/5]">
                  <DemoArt slug="lumi-odonto" />
                  <img src={lumiOdonto.clinic} alt={c.heroAlt} data-fallback="hide" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2239]/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-3xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur sm:left-auto sm:right-[-1rem] sm:w-72">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-100 text-sky-600">
                    <ScanLine className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{c.floatingTitle}</div>
                    <div className="text-xs text-[#0b2239]/55">{c.floatingDesc}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simulador */}
        <section id="simulador" className="bg-[#0b2239] py-20 text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300">{c.simEyebrow}</div>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
                {c.simTitleA}{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-sky-300">
                  {c.simTitleEm}
                </em>
                .
              </h2>
              <p className="mt-4 text-white/65">{c.simLead}</p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <Swatch label={c.simBefore} name={shades[0].name} color={shades[0].color} />
                <Swatch label={c.simAfter} name={shades[shadeIdx].name} color={shadeColor(level)} highlight />
              </div>
              <p className="mt-6 text-xs text-white/45">{c.simNote}</p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 sm:p-10">
                <Smile color={shadeColor(level)} />
                <div className="mt-8">
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="lumi-level" className="font-medium text-white/80">{c.simSlider}</label>
                    <span className="rounded-full bg-sky-400/15 px-3 py-1 font-mono text-xs text-sky-200">
                      {c.simShade} {shades[shadeIdx].name} · {c.simLighter(shadeIdx)}
                    </span>
                  </div>
                  <input
                    id="lumi-level"
                    type="range"
                    min={0}
                    max={100}
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-sky-400"
                    style={{ background: `linear-gradient(90deg, ${shades[0].color}, ${shades[shades.length - 1].color})` }}
                  />
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-white/40">
                    {shades.map((s) => (
                      <span key={s.name}>{s.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tratamentos */}
        <section id="tratamentos" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-600">{c.treatmentsEyebrow}</div>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">{c.treatmentsTitle}</h2>

            <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist">
              {c.treatments.map((tr, i) => (
                <button
                  key={tr.id}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={
                    'shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ' +
                    (tab === i ? 'bg-[#0b2239] text-white shadow-lg' : 'bg-white text-[#0b2239]/70 hover:text-[#0b2239]')
                  }
                >
                  {tr.name}
                </button>
              ))}
            </div>

            <div key={current.id} role="tabpanel" className="mt-6 grid animate-[page-enter_0.5s_ease_both] grid-cols-1 gap-6 rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(11,34,57,0.5)] sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="font-mono text-xs text-sky-600">{String(tab + 1).padStart(2, '0')} / {String(c.treatments.length).padStart(2, '0')}</div>
                <h3 className="mt-2 font-display text-3xl font-semibold">{current.name}</h3>
                <p className="mt-3 text-[#0b2239]/65">{current.lead}</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm">
                  <Clock className="h-4 w-4 text-sky-500" />
                  <span className="text-[#0b2239]/60">{c.durationLabel}:</span>
                  <span className="font-semibold">{current.duration}</span>
                </div>
              </div>
              <div className="lg:col-span-6">
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 rounded-2xl border border-sky-900/10 p-4 text-sm">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-500 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => bookTreatment(tab)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:gap-2.5 transition-all"
                >
                  {c.wantThis} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section id="equipe" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-600">{c.teamEyebrow}</div>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{c.teamTitle}</h2>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {c.team.map((m, i) => (
                <article key={m.name} className="group overflow-hidden rounded-[2rem] bg-[#f6f9fb]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <EditorialPortrait name={m.name} className="absolute inset-0" />
                    <img
                      src={teamMeta[i].photo}
                      alt={m.name}
                      data-fallback="hide"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold backdrop-blur">
                      {m.specialty}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="font-display text-lg font-semibold">{m.name}</div>
                    <div className="text-sm text-[#0b2239]/60">{m.role}</div>
                    <div className="mt-2 font-mono text-[11px] text-[#0b2239]/40">{teamMeta[i].cro}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Agendamento */}
        <section id="agendar" className="py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-600">{c.bookingEyebrow}</div>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{c.bookingTitle}</h2>
              <p className="mt-4 text-[#0b2239]/65">{c.bookingLead}</p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(11,34,57,0.5)] sm:p-8">
                {step < 4 && (
                  <>
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0b2239]/50">
                      {c.stepOf(step)}
                    </div>
                    <div className="mt-3 flex gap-2">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className={'h-1 flex-1 rounded-full transition-colors ' + (step >= n ? 'bg-sky-500' : 'bg-sky-100')} />
                      ))}
                    </div>
                  </>
                )}

                {step === 1 && (
                  <div className="mt-6">
                    <div className="font-display text-xl font-semibold">{c.step1}</div>
                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {[...c.treatments.map((tr) => tr.name), c.notSure].map((label, i) => (
                        <button
                          key={label}
                          onClick={() => setTreatment(i)}
                          className={
                            'rounded-2xl border p-4 text-left text-sm font-medium transition-colors ' +
                            (treatment === i ? 'border-sky-500 bg-sky-50' : 'border-sky-900/10 hover:border-sky-300')
                          }
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {errors.treatment && <div className="mt-3 text-xs text-red-600">{errors.treatment}</div>}
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-6">
                    <div className="font-display text-xl font-semibold">{c.step2}</div>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {days.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => setDayIdx(i)}
                          className={
                            'flex flex-col items-center rounded-2xl border py-3 transition-colors ' +
                            (dayIdx === i ? 'border-sky-500 bg-sky-500 text-white' : 'border-sky-900/10 hover:border-sky-300')
                          }
                        >
                          <span className="text-[10px] uppercase tracking-[0.12em] opacity-70">
                            {d.toLocaleDateString(intl, { weekday: 'short' }).replace('.', '')}
                          </span>
                          <span className="font-display text-xl font-semibold">{d.getDate()}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {(['morning', 'afternoon', 'evening'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPeriod(p)}
                          className={
                            'rounded-full border py-2.5 text-sm font-medium transition-colors ' +
                            (period === p ? 'border-[#0b2239] bg-[#0b2239] text-white' : 'border-sky-900/10 hover:border-sky-300')
                          }
                        >
                          {c.periods[p]}
                        </button>
                      ))}
                    </div>
                    {errors.slot && <div className="mt-3 text-xs text-red-600">{errors.slot}</div>}
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-6">
                    <div className="font-display text-xl font-semibold">{c.step3}</div>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label={c.name} error={errors.name}>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={c.namePlaceholder} className="w-full rounded-xl border border-sky-900/15 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none" />
                      </Field>
                      <Field label="WhatsApp" error={errors.phone}>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(21) 99999-9999" className="w-full rounded-xl border border-sky-900/15 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none" />
                      </Field>
                    </div>
                  </div>
                )}

                {step < 4 && (
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setStep((s) => (s > 1 ? ((s - 1) as typeof step) : s))}
                      disabled={step === 1}
                      className="text-sm font-medium text-[#0b2239]/50 disabled:opacity-30"
                    >
                      {c.back}
                    </button>
                    <button onClick={advance} className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white">
                      {step === 3 ? c.confirm : c.next}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {step === 4 && (
                  <div className="py-6 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sky-500 text-white">
                      <Check className="h-8 w-8" />
                    </div>
                    <div className="mt-6 font-display text-2xl font-semibold">{c.doneTitle(name.split(' ')[0])}</div>
                    <p className="mt-2 text-sm text-[#0b2239]/60">{c.doneText}</p>
                    <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-sky-50 p-4 text-left text-sm">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-[#0b2239]/50">{c.summaryTreatment}</div>
                        <div className="mt-1 font-semibold">{treatmentLabel(treatment)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-[#0b2239]/50">{c.summaryWhen}</div>
                        <div className="mt-1 font-semibold">
                          {dayIdx !== null && days[dayIdx].toLocaleDateString(intl, { weekday: 'short', day: '2-digit', month: 'short' })}
                          {period && ` · ${c.periods[period]}`}
                        </div>
                      </div>
                    </div>
                    <button onClick={reset} className="mt-6 rounded-full border border-sky-900/15 px-5 py-2.5 text-sm font-semibold">
                      {c.newBooking}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-sky-900/10 bg-white py-8 text-center text-xs text-[#0b2239]/50">
          <div>{c.compliance}</div>
          <div className="mt-1">© 2026 Lumi Odontologia · {c.demoBy}</div>
        </footer>
      </div>
    </DemoFrame>
  );
}

function Swatch({ label, name, color, highlight }: { label: string; name: string; color: string; highlight?: boolean }) {
  return (
    <div className={'rounded-2xl border p-3 ' + (highlight ? 'border-sky-300/40 bg-sky-400/10' : 'border-white/10 bg-white/[0.03]')}>
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/50">{label}</div>
      <div className="mt-2 flex items-center gap-3">
        <span className="h-10 w-10 rounded-xl border border-white/20 transition-colors" style={{ background: color }} />
        <span className="font-mono text-sm">{name}</span>
      </div>
    </div>
  );
}

function Smile({ color }: { color: string }) {
  const offsets = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];
  const mouth = 'M72 108 Q200 40 328 108 Q200 196 72 108Z';
  return (
    <svg viewBox="0 0 400 220" className="h-auto w-full" aria-hidden>
      <defs>
        <clipPath id="lumi-mouth">
          <path d={mouth} />
        </clipPath>
      </defs>
      <path d="M36 108 Q120 28 200 58 Q280 28 364 108 Q200 252 36 108Z" fill="#d98b8f" />
      <path d={mouth} fill="#4a1622" />
      <g clipPath="url(#lumi-mouth)">
        <rect x="60" y="40" width="280" height="42" fill="#e79aa3" />
        {offsets.map((o, i) => {
          const x = 200 + o * 34 - 16;
          const top = 70 + Math.abs(o) * 4;
          return (
            <g key={`u${i}`}>
              <rect x={x} y={top} width="32" height={114 - top} rx="9" fill={color} style={{ transition: 'fill 0.2s' }} />
              <rect x={x + 5} y={top + 7} width="6" height={(114 - top) * 0.55} rx="3" fill="#fff" opacity="0.35" />
            </g>
          );
        })}
        {offsets.map((o, i) => {
          const x = 200 + o * 28 - 13;
          const bottom = 148 - Math.abs(o) * 4;
          return <rect key={`l${i}`} x={x} y="119" width="26" height={bottom - 119} rx="8" fill={color} opacity="0.9" style={{ transition: 'fill 0.2s' }} />;
        })}
      </g>
      <path d="M72 108 Q200 40 328 108" fill="none" stroke="#b86a70" strokeWidth="3" />
    </svg>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0b2239]/50">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
