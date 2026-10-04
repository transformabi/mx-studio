'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { ArrowRight, Brush, CalendarDays, Check, Clock, Eye, Hand, MapPin, Plus, Scissors, Star, X } from 'lucide-react';
import { EditorialAvatar } from '@/components/avatar';
import { DemoArt } from '@/components/demo-art';
import { DemoFrame } from '@/components/demo-frame';
import { CountUp } from '@/components/fx/count-up';
import { localeInfo } from '@/i18n/config';
import { useI18n } from '@/i18n/provider';
import { mareSalao } from '@/lib/demo-images';
import { content } from './content';

type Cat = 'cabelo' | 'unhas' | 'make' | 'sobrancelhas';
type ServiceId =
  | 'corte'
  | 'escova'
  | 'coloracao'
  | 'mechas'
  | 'hidratacao'
  | 'manicure'
  | 'pedicure'
  | 'gel'
  | 'social'
  | 'noiva'
  | 'design'
  | 'henna';
type ProId = 'camila' | 'bianca' | 'juliana' | 'rafaela';

const catIcons = { cabelo: Scissors, unhas: Hand, make: Brush, sobrancelhas: Eye };

/** Prices in BRL. */
const services: { id: ServiceId; cat: Cat; price: number; minutes: number }[] = [
  { id: 'corte', cat: 'cabelo', price: 120, minutes: 60 },
  { id: 'escova', cat: 'cabelo', price: 80, minutes: 45 },
  { id: 'coloracao', cat: 'cabelo', price: 220, minutes: 120 },
  { id: 'mechas', cat: 'cabelo', price: 450, minutes: 180 },
  { id: 'hidratacao', cat: 'cabelo', price: 140, minutes: 45 },
  { id: 'manicure', cat: 'unhas', price: 45, minutes: 40 },
  { id: 'pedicure', cat: 'unhas', price: 55, minutes: 50 },
  { id: 'gel', cat: 'unhas', price: 180, minutes: 90 },
  { id: 'social', cat: 'make', price: 220, minutes: 60 },
  { id: 'noiva', cat: 'make', price: 890, minutes: 120 },
  { id: 'design', cat: 'sobrancelhas', price: 60, minutes: 30 },
  { id: 'henna', cat: 'sobrancelhas', price: 80, minutes: 40 },
];

const pros: { id: ProId; name: string; cats: Cat[] }[] = [
  { id: 'camila', name: 'Camila Rocha', cats: ['cabelo'] },
  { id: 'bianca', name: 'Bianca Alves', cats: ['unhas'] },
  { id: 'juliana', name: 'Juliana Prado', cats: ['make', 'sobrancelhas'] },
  { id: 'rafaela', name: 'Rafaela Lima', cats: ['cabelo', 'sobrancelhas'] },
];

const OPEN = 9 * 60;
const CLOSE = 20 * 60;
const slots = Array.from({ length: (CLOSE - OPEN) / 30 }, (_, i) => OPEN + i * 30);
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

/** Deterministic "already booked" pattern, so the agenda looks lived-in without randomness. */
const isBusy = (day: number, slot: number, pro: string) => (day * 7 + slot * 3 + pro.length) % 5 < 2;

type Day = { key: string; weekday: string; date: number; closed: boolean };

const noopSubscribe = () => () => {};

export default function MareSalaoDemo() {
  const { locale, money } = useI18n();
  const c = content[locale];

  const [cat, setCat] = useState<Cat>('cabelo');
  const [picked, setPicked] = useState<ServiceId[]>([]);
  const [pro, setPro] = useState<'any' | ProId>('any');
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  // Dates depend on the visitor's clock: none on the server, the next 8 days once in the browser.
  const today = useSyncExternalStore(noopSubscribe, () => new Date().toDateString(), () => null);
  const days = useMemo<Day[]>(() => {
    if (!today) return [];
    const fmt = new Intl.DateTimeFormat(localeInfo[locale].intl, { weekday: 'short' });
    const start = new Date(today);
    return Array.from({ length: 8 }, (_, i) => {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i + 1);
      return { key: d.toDateString(), weekday: fmt.format(d).replace('.', ''), date: d.getDate(), closed: d.getDay() < 2 };
    });
  }, [today, locale]);

  const chosen = services.filter((s) => picked.includes(s.id));
  const total = chosen.reduce((sum, s) => sum + s.price, 0);
  const minutes = chosen.reduce((sum, s) => sum + s.minutes, 0);
  const neededCats = [...new Set(chosen.map((s) => s.cat))];
  const eligible = pros.filter((p) => neededCats.every((k) => p.cats.includes(k)));
  const activePro = pro !== 'any' && eligible.some((p) => p.id === pro) ? pro : 'any';
  const fits = (start: number) => start + Math.max(minutes, 30) <= CLOSE;

  const toggle = (id: ServiceId) => {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    setTime(null);
  };

  const bookWith = (id: ProId) => {
    setPro(id);
    document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submit = () => {
    const e: Record<string, string> = {};
    if (!picked.length) e.services = c.errors.services;
    if (dayIdx === null || time === null) e.time = c.errors.time;
    if (!name.trim()) e.name = c.errors.name;
    if (phone.replace(/\D/g, '').length < 8) e.phone = c.errors.phone;
    setErrors(e);
    if (Object.keys(e).length === 0) setDone(true);
  };

  const reset = () => {
    setDone(false);
    setPicked([]);
    setDayIdx(null);
    setTime(null);
    setName('');
    setPhone('');
  };

  const day = dayIdx === null ? null : days[dayIdx];
  const proName = activePro === 'any' ? c.anyPro : pros.find((p) => p.id === activePro)!.name;

  return (
    <DemoFrame siteName="Maré Salão" bg="#f7f2ec">
      <div className="text-[#1c2422]">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[#1c2422]/10 bg-[#f7f2ec]/85 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1f5b55] text-[#f3d3c6]">
                <Scissors className="h-4 w-4" />
              </span>
              <div className="leading-none">
                <div style={{ fontFamily: 'var(--font-instrument-serif)' }} className="text-xl italic">
                  Maré
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#1c2422]/50">{c.tagline}</div>
              </div>
            </div>
            <nav className="hidden items-center gap-1 sm:flex">
              {[
                { href: '#servicos', label: c.navServices },
                { href: '#equipe', label: c.navTeam },
                { href: '#agendar', label: c.navBook },
              ].map((l) => (
                <a key={l.href} href={l.href} className="rounded-full px-3 py-1.5 text-sm text-[#1c2422]/70 hover:bg-[#f3d3c6]/60 hover:text-[#1c2422]">
                  {l.label}
                </a>
              ))}
            </nav>
            <a href="#agendar" className="rounded-full bg-[#1f5b55] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
              {c.book}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute -right-32 -top-20 h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(243,211,198,0.9),transparent_65%)]" />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#1f5b55]">{c.heroEyebrow}</div>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
                {c.heroTitleA}{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#1f5b55]">
                  {c.heroTitleEm}
                </em>
                .
              </h1>
              <p className="mt-6 max-w-lg text-lg text-[#1c2422]/65">{c.heroLead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#servicos" className="inline-flex items-center gap-1.5 rounded-full bg-[#1f5b55] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(31,91,85,0.7)] transition-transform hover:-translate-y-0.5">
                  <CalendarDays className="h-4 w-4" />
                  {c.book}
                </a>
                <a href="#servicos" className="rounded-full border border-[#1c2422]/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white">
                  {c.seeServices}
                </a>
              </div>
              <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[#1c2422]/10 pt-6">
                {c.heroStats.map((s) => (
                  <div key={s.label}>
                    <CountUp value={s.kpi} className="block font-display text-3xl font-semibold" />
                    <div className="mt-1 text-xs text-[#1c2422]/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] rounded-tl-[9rem] bg-[#f3d3c6]">
                  <DemoArt slug="mare-salao" />
                  {mareSalao.space && (
                    <img src={mareSalao.space} alt={c.heroAlt} data-fallback="hide" className="absolute inset-0 h-full w-full object-cover" />
                  )}
                </div>
                <div className="absolute -left-4 bottom-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-lg">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-[#1c2422]/50">Google</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#1f5b55]">{c.servicesEyebrow}</div>
                <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
                  {c.servicesTitleA}{' '}
                  <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                    {c.servicesTitleEm}
                  </em>
                  .
                </h2>
                <p className="mt-3 text-[#1c2422]/60">{c.servicesLead}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(c.cats) as Cat[]).map((k) => {
                  const Icon = catIcons[k];
                  return (
                    <button
                      key={k}
                      onClick={() => setCat(k)}
                      aria-pressed={cat === k}
                      className={
                        'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                        (cat === k ? 'border-[#1c2422] bg-[#1c2422] text-white' : 'border-[#1c2422]/15 hover:border-[#1c2422]/40')
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {c.cats[k]}
                    </button>
                  );
                })}
              </div>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
              {services
                .filter((s) => s.cat === cat)
                .map((s) => {
                  const on = picked.includes(s.id);
                  return (
                    <li
                      key={s.id}
                      className={
                        'flex items-center gap-4 rounded-3xl border p-5 transition-colors ' +
                        (on ? 'border-[#1f5b55] bg-[#1f5b55]/5' : 'border-[#1c2422]/10 bg-[#f7f2ec]/60')
                      }
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-lg font-semibold">{c.services[s.id].name}</div>
                        <div className="mt-0.5 text-sm text-[#1c2422]/55">{c.services[s.id].desc}</div>
                        <div className="mt-2 flex items-center gap-3 text-xs text-[#1c2422]/50">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {c.minutes(s.minutes)}
                          </span>
                          <span className="font-semibold text-[#1f5b55]">{money(s.price, { decimals: 0 })}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggle(s.id)}
                        aria-pressed={on}
                        className={
                          'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ' +
                          (on ? 'bg-[#1f5b55] text-white' : 'border border-[#1c2422]/15 hover:border-[#1f5b55] hover:text-[#1f5b55]')
                        }
                      >
                        {on ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {on ? c.added : c.add}
                      </button>
                    </li>
                  );
                })}
            </ul>

            {chosen.length > 0 && (
              <div className="sticky bottom-4 z-20 mt-8 flex flex-wrap items-center justify-between gap-3 rounded-full bg-[#1c2422] py-2 pl-6 pr-2 text-white shadow-[0_20px_40px_-20px_rgba(28,36,34,0.8)]">
                <span className="text-sm">
                  {c.bar(chosen.length)} · <span className="font-semibold">{money(total, { decimals: 0 })}</span>
                  <span className="text-white/50"> · {c.minutes(minutes)}</span>
                </span>
                <a href="#agendar" className="inline-flex items-center gap-1.5 rounded-full bg-[#f3d3c6] px-4 py-2 text-sm font-semibold text-[#1c2422]">
                  {c.navBook} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Equipe */}
        <section id="equipe" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#1f5b55]">{c.teamEyebrow}</div>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {c.teamTitleA}{' '}
              <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#1f5b55]">
                {c.teamTitleEm}
              </em>
              .
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pros.map((p) => (
                <article key={p.id} className="flex flex-col rounded-4xl bg-white p-6">
                  <EditorialAvatar name={p.name} className="h-16 w-16 text-5xl" />
                  <div className="mt-5 font-display text-xl font-semibold">{p.name}</div>
                  <div className="mt-1 text-sm text-[#1c2422]/55">{c.roles[p.id]}</div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.cats.map((k) => (
                      <span key={k} className="rounded-full bg-[#f3d3c6]/60 px-2.5 py-1 text-[11px] font-medium">
                        {c.cats[k]}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => bookWith(p.id)} className="mt-6 inline-flex items-center gap-1 self-start text-sm font-semibold text-[#1f5b55] transition-all hover:gap-2">
                    {c.navBook} <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Agendamento */}
        <section id="agendar" className="bg-[#1f5b55] py-20 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f3d3c6]">{c.bookEyebrow}</div>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">{c.bookTitle}</h2>

            {done ? (
              <div className="mt-10 max-w-xl rounded-4xl bg-white p-8 text-center text-[#1c2422] sm:p-10">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#1f5b55] text-white">
                  <Check className="h-8 w-8" />
                </div>
                <div className="mt-6 font-display text-2xl font-semibold">{c.doneTitle(name.trim().split(' ')[0])}</div>
                <div className="mt-4 rounded-2xl bg-[#f7f2ec] p-4 text-left text-sm">
                  <div className="font-semibold">{chosen.map((s) => c.services[s.id].name).join(' + ')}</div>
                  <div className="mt-1 text-[#1c2422]/60">
                    {proName} · {day?.weekday} {day?.date} · {time !== null && hhmm(time)} · {money(total, { decimals: 0 })}
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#1c2422]/60">{c.doneText}</p>
                <button onClick={reset} className="mt-6 rounded-full border border-[#1c2422]/15 px-5 py-2.5 text-sm font-semibold">
                  {c.newBooking}
                </button>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-7">
                  {/* 1 · Serviços */}
                  <Step label={c.step(1)} title={c.pickedTitle}>
                    {chosen.length ? (
                      <ul className="space-y-2">
                        {chosen.map((s) => (
                          <li key={s.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                            <span>
                              <span className="font-semibold">{c.services[s.id].name}</span>
                              <span className="text-white/60"> · {c.minutes(s.minutes)}</span>
                            </span>
                            <span className="flex items-center gap-3">
                              {money(s.price, { decimals: 0 })}
                              <button onClick={() => toggle(s.id)} aria-label={c.remove} className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white">
                                <X className="h-4 w-4" />
                              </button>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <a href="#servicos" className="block rounded-2xl border border-dashed border-white/30 px-4 py-4 text-sm text-white/70 hover:border-white/60">
                        {c.pickedEmpty}
                      </a>
                    )}
                    {errors.services && <p className="mt-2 text-xs text-[#f3d3c6]">{errors.services}</p>}
                  </Step>

                  {/* 2 · Profissional */}
                  <Step label={c.step(2)} title={c.proTitle}>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {(['any', ...pros.map((p) => p.id)] as const).map((id) => {
                        const ok = id === 'any' || eligible.some((p) => p.id === id);
                        const label = id === 'any' ? c.anyPro : pros.find((p) => p.id === id)!.name;
                        return (
                          <button
                            key={id}
                            disabled={!ok}
                            onClick={() => {
                              setPro(id);
                              setTime(null);
                            }}
                            aria-pressed={activePro === id}
                            className={
                              'flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ' +
                              (activePro === id ? 'border-[#f3d3c6] bg-[#f3d3c6] text-[#1c2422]' : 'border-white/20 hover:border-white/50')
                            }
                          >
                            {id === 'any' ? (
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
                                <Star className="h-4 w-4" />
                              </span>
                            ) : (
                              <EditorialAvatar name={label} className="h-8 w-8 text-2xl" />
                            )}
                            <span>
                              <span className="block font-semibold">{label}</span>
                              <span className={'block text-xs ' + (activePro === id ? 'text-[#1c2422]/60' : 'text-white/55')}>
                                {id === 'any' ? c.anyProNote : c.roles[id]}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {chosen.length > 0 && eligible.length === 0 && <p className="mt-3 text-xs text-white/70">{c.noSinglePro}</p>}
                  </Step>

                  {/* 3 · Dia e horário */}
                  <Step label={c.step(3)} title={`${c.dayTitle} · ${c.timeTitle}`}>
                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {days.map((d, i) => (
                        <button
                          key={d.key}
                          disabled={d.closed}
                          onClick={() => {
                            setDayIdx(i);
                            setTime(null);
                          }}
                          aria-pressed={dayIdx === i}
                          className={
                            'flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ' +
                            (dayIdx === i ? 'border-[#f3d3c6] bg-[#f3d3c6] text-[#1c2422]' : 'border-white/20 hover:border-white/50')
                          }
                        >
                          <span className="text-[11px] uppercase tracking-wider opacity-70">{d.weekday}</span>
                          <span className="font-display text-xl font-semibold">{d.date}</span>
                          {d.closed && <span className="text-[9px] uppercase">{c.closed}</span>}
                        </button>
                      ))}
                    </div>
                    {dayIdx === null ? (
                      <p className="mt-4 text-sm text-white/60">{c.pickDayFirst}</p>
                    ) : (
                      <>
                        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
                          {slots.map((m, si) => {
                            const taken = isBusy(dayIdx, si, activePro) || !fits(m);
                            return (
                              <button
                                key={m}
                                disabled={taken}
                                onClick={() => setTime(m)}
                                aria-pressed={time === m}
                                className={
                                  'rounded-xl border py-2 text-sm tabular-nums transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:bg-white/5 disabled:text-white/25 disabled:line-through ' +
                                  (time === m ? 'border-[#f3d3c6] bg-[#f3d3c6] font-semibold text-[#1c2422]' : 'border-white/20 hover:border-white/50')
                                }
                              >
                                {hhmm(m)}
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-3 text-xs text-white/50">{c.timeHint}</p>
                      </>
                    )}
                    {errors.time && <p className="mt-2 text-xs text-[#f3d3c6]">{errors.time}</p>}
                  </Step>
                </div>

                {/* Resumo + dados */}
                <div className="lg:col-span-5">
                  <div className="rounded-4xl bg-white p-6 text-[#1c2422] sm:p-8 lg:sticky lg:top-24">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c2422]/50">{c.step(4)}</div>
                    <div className="mt-1 font-display text-2xl font-semibold">{c.contactTitle}</div>
                    <div className="mt-5 space-y-3">
                      <label className="block">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c2422]/50">{c.name}</span>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={c.namePlaceholder} className="mt-2 w-full rounded-xl border border-[#1c2422]/15 px-4 py-3 text-sm focus:border-[#1f5b55] focus:outline-hidden" />
                        {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c2422]/50">WhatsApp</span>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="(21) 99999-9999" className="mt-2 w-full rounded-xl border border-[#1c2422]/15 px-4 py-3 text-sm focus:border-[#1f5b55] focus:outline-hidden" />
                        {errors.phone && <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>}
                      </label>
                    </div>

                    <dl className="mt-6 space-y-2 rounded-2xl bg-[#f7f2ec] p-4 text-sm">
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#1c2422]/55">{c.proTitle}</dt>
                        <dd className="text-right font-medium">{proName}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#1c2422]/55">{c.dayTitle}</dt>
                        <dd className="text-right font-medium">{day ? `${day.weekday} ${day.date}${time !== null ? ` · ${hhmm(time)}` : ''}` : '—'}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#1c2422]/55">{c.duration}</dt>
                        <dd className="text-right font-medium">{minutes ? c.minutes(minutes) : '—'}</dd>
                      </div>
                      <div className="flex items-end justify-between gap-3 border-t border-[#1c2422]/10 pt-3">
                        <dt className="font-semibold">{c.total}</dt>
                        <dd key={total} className="animate-[page-enter_0.4s_ease_both] font-display text-2xl font-semibold text-[#1f5b55]">
                          {money(total, { decimals: 0 })}
                        </dd>
                      </div>
                    </dl>

                    <button onClick={submit} className="mt-6 w-full rounded-full bg-[#1f5b55] py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                      {c.confirm}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-[#1c2422]/10 bg-[#f7f2ec] py-8 text-center text-xs text-[#1c2422]/50">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {c.infoAddress}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {c.infoHours}
            </span>
          </div>
          <div className="mt-2">{c.note}</div>
          <div className="mt-1">© 2026 Maré Salão · {c.demoBy}</div>
        </footer>
      </div>
    </DemoFrame>
  );
}

function Step({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-4xl border border-white/15 bg-white/5 p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f3d3c6]">{label}</div>
      <div className="mt-1 font-display text-xl font-semibold">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
