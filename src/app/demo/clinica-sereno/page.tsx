'use client';

import { useMemo, useState } from 'react';
import { CalendarCheck, Check, ChevronLeft, ChevronRight, Leaf, MapPin, Phone, ShieldCheck, Stethoscope, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, clinicaProfessionals } from '@/lib/demo-images';
import { useI18n } from '@/i18n/provider';
import { content } from './content';

type ProfId = 'p1' | 'p2' | 'p3';
type Modality = 'presencial' | 'online';

const profIds: ProfId[] = ['p1', 'p2', 'p3'];
const badgeIcons = [ShieldCheck, MapPin, Phone];

function nextDays(count = 21) {
  const days: Date[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    if (d.getDay() === 0) continue;
    days.push(d);
  }
  return days;
}

const slotsByProf: Record<string, string[]> = {
  p1: ['09:00', '10:00', '14:00', '15:00', '16:00', '17:00'],
  p2: ['08:00', '09:00', '11:00', '15:00', '16:00'],
  p3: ['09:30', '10:30', '11:30', '14:00', '15:00', '16:30'],
};

const bookedFake = new Set(['p1_1_10:00', 'p2_2_09:00', 'p3_0_10:30']);

export default function ClinicaSerenoDemo() {
  const { locale, intl } = useI18n();
  const c = content[locale];
  const profile = (id: ProfId) => ({ id, ...c.professionals[id], photo: clinicaProfessionals[id] });
  const weekday = (d: Date) => d.toLocaleDateString(intl, { weekday: 'short' }).replace('.', '');

  const [profId, setProfId] = useState<ProfId>('p1');
  const days = useMemo(() => nextDays(21), []);
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [modality, setModality] = useState<Modality>('presencial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstTime, setFirstTime] = useState<boolean | null>(null);
  const [lgpd, setLgpd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState<null | { name: string; date: Date; time: string; profId: ProfId; modality: Modality }>(null);
  const [visibleFrom, setVisibleFrom] = useState(0);

  const prof = profile(profId);
  const slots = slotsByProf[profId];
  const currentDay = days[dayIdx];

  const visibleDays = days.slice(visibleFrom, visibleFrom + 6);

  const submit = () => {
    const e: Record<string, string> = {};
    if (!time) e.time = c.errors.time;
    if (!name.trim()) e.name = c.errors.name;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = c.errors.email;
    if (!phone.match(/\d{8,}/)) e.phone = c.errors.phone;
    if (firstTime === null) e.firstTime = c.errors.firstTime;
    if (!lgpd) e.lgpd = c.errors.lgpd;
    setErrors(e);
    if (Object.keys(e).length) return;
    setConfirming(true);
  };

  const finalize = () => {
    setDone({ name, date: currentDay, time: time!, profId, modality });
    setConfirming(false);
  };

  const doneProf = done ? profile(done.profId) : null;

  return (
    <DemoFrame siteName="Clínica Sereno" bg="#f5f7f6">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0a3d40] text-white">
              <Leaf className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="font-display text-base font-semibold text-neutral-900">Sereno</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">{c.clinic}</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#profissionais" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              {c.navPros}
            </a>
            <a href="#agenda" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              {c.navAgenda}
            </a>
            <a href="#clinica" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              {c.navClinic}
            </a>
          </nav>
          <a
            href="#agenda"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0f5e62] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {c.book}
            <CalendarCheck className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#0f5e62]">
            <Stethoscope className="h-3 w-3" />
            {c.heroEyebrow}
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-neutral-900 sm:text-5xl lg:text-6xl">
            {c.heroTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#0a3d40]">
              {c.heroTitleEm}
            </em>
            {c.heroTitleB}
          </h1>
          <p className="mt-6 max-w-lg text-base text-neutral-600 sm:text-lg">{c.heroLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#agenda"
              className="rounded-full bg-[#0f5e62] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {c.bookVisit}
            </a>
            <a
              href="#profissionais"
              className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              {c.meetPros}
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-6 text-sm">
            {c.badges.map((b, i) => {
              const Icon = badgeIcons[i];
              return (
                <div key={b.title} className="flex items-start gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-[#0f5e62]" />
                  <div>
                    <div className="font-semibold text-neutral-900">{b.title}</div>
                    <div className="text-xs text-neutral-500">{b.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <img
              src={heros['clinica-sereno']}
              alt={c.heroAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  src={clinicaProfessionals.p1}
                  alt={c.professionals.p1.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-neutral-900">{c.professionals.p1.name}</div>
                  <div className="text-xs text-neutral-500">{c.nextAvailable}</div>
                </div>
                <a href="#agenda" className="rounded-full bg-[#0f5e62] px-3 py-1.5 text-xs font-semibold text-white">
                  {c.bookShort}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profissionais */}
      <section id="profissionais" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#0f5e62]">{c.prosEyebrow}</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
            {c.prosTitle}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {profIds.map(profile).map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setProfId(p.id);
                  setTime(null);
                  document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={
                  'group text-left rounded-3xl border p-5 transition-all ' +
                  (profId === p.id
                    ? 'border-[#0f5e62] bg-[#e6efee] shadow-md'
                    : 'border-neutral-200 bg-white hover:border-[#0f5e62]/30 hover:-translate-y-1')
                }
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.photo}
                    alt={p.name}
                    loading="lazy"
                    className="h-14 w-14 rounded-2xl object-cover"
                  />
                  <div>
                    <div className="font-display text-base font-semibold text-neutral-900">{p.name}</div>
                    <div className="text-xs text-neutral-500">{p.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{p.bio}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-700">
                  {p.approach}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="bg-[#f0f4f3] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#0f5e62]">{c.agendaEyebrow}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
                {c.agendaTitle}
              </h2>
              <p className="mt-4 text-neutral-600">{c.agendaLead}</p>

              {done ? null : (
                <div className="mt-6 rounded-3xl border border-[#0f5e62]/20 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={prof.photo}
                      alt={prof.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="text-xs text-neutral-500">{c.youChose}</div>
                      <div className="text-base font-semibold text-neutral-900">{prof.name}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-3 text-sm text-neutral-600">
                {c.assurances.map((item) => (
                  <div key={item} className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0f5e62]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              {done && doneProf ? (
                <div className="rounded-3xl border border-[#0f5e62]/20 bg-white p-8 shadow-md">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#0f5e62] text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-center font-display text-2xl font-semibold text-neutral-900">
                    {c.doneTitle}
                  </h3>
                  <p className="mt-2 text-center text-neutral-600">{c.doneText}</p>
                  <div className="mt-6 rounded-2xl bg-[#f0f4f3] p-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={doneProf.photo}
                        alt={doneProf.name}
                        className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-neutral-900">{doneProf.name}</div>
                        <div className="text-sm text-neutral-600">
                          {done.date.toLocaleDateString(intl, { weekday: 'long', day: '2-digit', month: 'long' })} · {done.time}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {c.modality}: {c.modalities[done.modality].label}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setDone(null);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setTime(null);
                      setFirstTime(null);
                      setLgpd(false);
                    }}
                    className="mt-6 w-full rounded-full border border-neutral-300 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    {c.bookAnother}
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-8">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {c.stepDay}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setVisibleFrom((v) => Math.max(0, v - 6))}
                        disabled={visibleFrom === 0}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300 text-neutral-700 disabled:opacity-30"
                        aria-label={c.prev}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <div className="flex flex-1 gap-2 overflow-x-auto">
                        {visibleDays.map((d, i) => {
                          const idx = visibleFrom + i;
                          const selected = idx === dayIdx;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                setDayIdx(idx);
                                setTime(null);
                              }}
                              className={
                                'flex min-w-[64px] flex-col items-center rounded-2xl border px-3 py-2 text-center transition-colors ' +
                                (selected
                                  ? 'border-[#0f5e62] bg-[#0f5e62] text-white'
                                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400')
                              }
                            >
                              <span className="text-[10px] uppercase tracking-[0.12em]">
                                {weekday(d)}
                              </span>
                              <span className="mt-1 font-display text-lg font-semibold">
                                {d.getDate()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setVisibleFrom((v) => Math.min(days.length - 6, v + 6))}
                        disabled={visibleFrom + 6 >= days.length}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300 text-neutral-700 disabled:opacity-30"
                        aria-label={c.next}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {c.stepTime}
                      </div>
                      {errors.time && <div className="text-xs text-red-600">{errors.time}</div>}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {slots.map((t) => {
                        const booked = bookedFake.has(`${profId}_${dayIdx}_${t}`);
                        const selected = time === t;
                        return (
                          <button
                            key={t}
                            onClick={() => !booked && setTime(t)}
                            disabled={booked}
                            className={
                              'rounded-full border px-3.5 py-1.5 text-sm transition-colors ' +
                              (booked
                                ? 'cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300 line-through'
                                : selected
                                ? 'border-[#0f5e62] bg-[#0f5e62] text-white'
                                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400')
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {c.stepModality}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {(['presencial', 'online'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setModality(m)}
                          className={
                            'rounded-2xl border p-3 text-left transition-colors ' +
                            (modality === m
                              ? 'border-[#0f5e62] bg-[#e6efee]'
                              : 'border-neutral-200 bg-white hover:border-neutral-400')
                          }
                        >
                          <div className="text-sm font-semibold text-neutral-900">{c.modalities[m].label}</div>
                          <div className="text-xs text-neutral-500">{c.modalities[m].desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cname" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {c.fullName}
                      </label>
                      <input
                        id="cname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={c.namePlaceholder}
                        className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-[#0f5e62] focus:outline-hidden"
                      />
                      {errors.name && <div className="mt-1 text-xs text-red-600">{errors.name}</div>}
                    </div>
                    <div>
                      <label htmlFor="cemail" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {c.email}
                      </label>
                      <input
                        id="cemail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={c.emailPlaceholder}
                        className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-[#0f5e62] focus:outline-hidden"
                      />
                      {errors.email && <div className="mt-1 text-xs text-red-600">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="cphone" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      WhatsApp
                    </label>
                    <input
                      id="cphone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(21) 99999-9999"
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-[#0f5e62] focus:outline-hidden"
                    />
                    {errors.phone && <div className="mt-1 text-xs text-red-600">{errors.phone}</div>}
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {c.firstTimeQ}
                    </div>
                    <div className="mt-3 flex gap-2">
                      {[
                        { v: true, l: c.firstYes },
                        { v: false, l: c.firstNo },
                      ].map((o) => (
                        <button
                          key={String(o.v)}
                          onClick={() => setFirstTime(o.v)}
                          className={
                            'rounded-full border px-4 py-2 text-sm transition-colors ' +
                            (firstTime === o.v
                              ? 'border-[#0f5e62] bg-[#e6efee] text-neutral-900'
                              : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400')
                          }
                        >
                          {o.l}
                        </button>
                      ))}
                    </div>
                    {errors.firstTime && <div className="mt-2 text-xs text-red-600">{errors.firstTime}</div>}
                  </div>

                  <label className="mt-6 flex items-start gap-3 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={lgpd}
                      onChange={(e) => setLgpd(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-[#0f5e62]"
                    />
                    <span>
                      {c.consentA}{' '}
                      <a href="#" className="text-[#0f5e62] underline">{c.privacyPolicy}</a>{' '}
                      {c.consentB}
                    </span>
                  </label>
                  {errors.lgpd && <div className="mt-1 text-xs text-red-600">{errors.lgpd}</div>}

                  <button
                    onClick={submit}
                    className="mt-6 w-full rounded-full bg-[#0f5e62] py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    {c.submit}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {confirming && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60" onClick={() => setConfirming(false)} aria-label={c.close} />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <div className="font-display text-lg font-semibold">{c.reviewTitle}</div>
              <button
                onClick={() => setConfirming(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
                aria-label={c.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-6">
              <div className="flex items-center gap-4 rounded-2xl bg-[#f0f4f3] p-4">
                <img
                  src={prof.photo}
                  alt={prof.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <div className="font-semibold text-neutral-900">{prof.name}</div>
                  <div className="text-xs text-neutral-500">{prof.role}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">{c.date}</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">
                    {currentDay.toLocaleDateString(intl, { day: '2-digit', month: 'short' })}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">{c.time}</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">{time}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">{c.modality}</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">{c.modalities[modality].label}</div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 rounded-full border border-neutral-300 py-3 text-sm font-semibold text-neutral-900"
                >
                  {c.change}
                </button>
                <button
                  onClick={finalize}
                  className="flex-1 rounded-full bg-[#0f5e62] py-3 text-sm font-semibold text-white"
                >
                  {c.confirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clínica */}
      <section id="clinica" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#0f5e62]">{c.clinicEyebrow}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
                {c.clinicTitle}
              </h2>
              <p className="mt-4 max-w-lg text-neutral-600">{c.clinicLead}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {c.features.map((f) => (
                  <div key={f.l} className="rounded-2xl border border-neutral-200 bg-[#f5f7f6] p-5">
                    <div className="font-display text-base font-semibold text-[#0a3d40]">{f.l}</div>
                    <div className="mt-1 text-xs text-neutral-500">{f.s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-[#f0f4f3] p-6 text-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{c.whereEyebrow}</div>
              <div className="mt-2 text-neutral-900">Rua Voluntários da Pátria, 42</div>
              <div className="text-neutral-600">Botafogo · Rio de Janeiro</div>
              <div className="mt-4 flex flex-col gap-1 text-neutral-600">
                {c.hours.map((h) => (
                  <div key={h}>{h}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        © 2025 Clínica Sereno · {c.demoBy}
      </footer>
    </DemoFrame>
  );
}
