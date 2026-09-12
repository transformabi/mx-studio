'use client';

import { useMemo, useState } from 'react';
import { CalendarCheck, Check, ChevronLeft, ChevronRight, Leaf, MapPin, Phone, ShieldCheck, Stethoscope, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, clinicaProfessionals } from '@/lib/demo-images';

type ProfId = keyof typeof clinicaProfessionals;
type Professional = {
  id: ProfId;
  name: string;
  role: string;
  bio: string;
  approach: string;
  photo: string;
};

const professionals: Professional[] = [
  {
    id: 'p1',
    name: 'Dra. Camila Rezende',
    role: 'Psicóloga · CRP 05/12345',
    bio: 'Abordagem cognitivo-comportamental, foco em ansiedade e transições de vida.',
    approach: 'TCC',
    photo: clinicaProfessionals.p1,
  },
  {
    id: 'p2',
    name: 'Dr. André Vasconcelos',
    role: 'Psicólogo · CRP 05/67890',
    bio: 'Psicanálise. Adultos e casais. Atende desde 2012.',
    approach: 'Psicanálise',
    photo: clinicaProfessionals.p2,
  },
  {
    id: 'p3',
    name: 'Nutri. Beatriz Alves',
    role: 'Nutricionista · CRN 04/54321',
    bio: 'Nutrição comportamental. Sem dieta restritiva, com foco em relação com a comida.',
    approach: 'Nutrição comportamental',
    photo: clinicaProfessionals.p3,
  },
];

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

const dayLabel = (d: Date) =>
  d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');

export default function ClinicaSerenoDemo() {
  const [profId, setProfId] = useState<string>('p1');
  const days = useMemo(() => nextDays(21), []);
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [modality, setModality] = useState<'presencial' | 'online'>('presencial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstTime, setFirstTime] = useState<boolean | null>(null);
  const [lgpd, setLgpd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState<null | { name: string; date: string; time: string; prof: Professional; modality: string }>(null);
  const [visibleFrom, setVisibleFrom] = useState(0);

  const prof = professionals.find((p) => p.id === profId)!;
  const slots = slotsByProf[profId];
  const currentDay = days[dayIdx];

  const visibleDays = days.slice(visibleFrom, visibleFrom + 6);

  const submit = () => {
    const e: Record<string, string> = {};
    if (!time) e.time = 'Escolha um horário.';
    if (!name.trim()) e.name = 'Nome é obrigatório.';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'E-mail inválido.';
    if (!phone.match(/\d{8,}/)) e.phone = 'Telefone incompleto.';
    if (firstTime === null) e.firstTime = 'Selecione uma opção.';
    if (!lgpd) e.lgpd = 'É necessário concordar para prosseguir.';
    setErrors(e);
    if (Object.keys(e).length) return;
    setConfirming(true);
  };

  const finalize = () => {
    setDone({
      name,
      date: currentDay.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }),
      time: time!,
      prof,
      modality,
    });
    setConfirming(false);
  };

  return (
    <DemoFrame siteName="Clínica Sereno" bg="#f5f7f6">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0a3d40] text-white">
              <Leaf className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="font-display text-base font-semibold text-neutral-900">Sereno</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">Clínica</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#profissionais" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              Profissionais
            </a>
            <a href="#agenda" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              Agenda
            </a>
            <a href="#clinica" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              A clínica
            </a>
          </nav>
          <a
            href="#agenda"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0f5e62] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Agendar
            <CalendarCheck className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#0f5e62]">
            <Stethoscope className="h-3 w-3" />
            Psicologia · Nutrição · Rio de Janeiro
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-neutral-900 sm:text-5xl lg:text-6xl">
            Cuidado{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#0a3d40]">
              sereno
            </em>
            , no seu ritmo.
          </h1>
          <p className="mt-6 max-w-lg text-base text-neutral-600 sm:text-lg">
            Consultório multiprofissional em Botafogo. Atendimento presencial ou
            online, com agenda transparente e valorização do vínculo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#agenda"
              className="rounded-full bg-[#0f5e62] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Marcar consulta
            </a>
            <a
              href="#profissionais"
              className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              Conhecer os profissionais
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-6 text-sm">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#0f5e62]" />
              <div>
                <div className="font-semibold text-neutral-900">LGPD</div>
                <div className="text-xs text-neutral-500">by design</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#0f5e62]" />
              <div>
                <div className="font-semibold text-neutral-900">Botafogo</div>
                <div className="text-xs text-neutral-500">& online</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[#0f5e62]" />
              <div>
                <div className="font-semibold text-neutral-900">Sem plano</div>
                <div className="text-xs text-neutral-500">reembolso emitido</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <img
              src={heros['clinica-sereno']}
              alt="Espaço da Clínica Sereno"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  src={clinicaProfessionals.p1}
                  alt="Dra. Camila Rezende"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-neutral-900">Dra. Camila Rezende</div>
                  <div className="text-xs text-neutral-500">próxima disponibilidade: hoje 14h</div>
                </div>
                <a href="#agenda" className="rounded-full bg-[#0f5e62] px-3 py-1.5 text-xs font-semibold text-white">
                  Marcar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profissionais */}
      <section id="profissionais" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#0f5e62]">Profissionais</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Escolha com quem quer se cuidar.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {professionals.map((p) => (
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
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#0f5e62]">Agenda</div>
              <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
                Sua consulta em 3 passos.
              </h2>
              <p className="mt-4 text-neutral-600">
                Escolha profissional, data e horário. A confirmação chega no
                seu WhatsApp em minutos.
              </p>

              {done ? null : (
                <div className="mt-6 rounded-3xl border border-[#0f5e62]/20 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={prof.photo}
                      alt={prof.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="text-xs text-neutral-500">Você escolheu</div>
                      <div className="text-base font-semibold text-neutral-900">{prof.name}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-3 text-sm text-neutral-600">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0f5e62]" />
                  Seus dados são criptografados. Nunca compartilhamos com terceiros.
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0f5e62]" />
                  Lembrete automático 24h antes da consulta.
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0f5e62]" />
                  Cancelamento gratuito até 12h antes.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {done ? (
                <div className="rounded-3xl border border-[#0f5e62]/20 bg-white p-8 shadow-md">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#0f5e62] text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-center font-display text-2xl font-semibold text-neutral-900">
                    Consulta agendada!
                  </h3>
                  <p className="mt-2 text-center text-neutral-600">
                    Enviamos a confirmação para o WhatsApp. Este é um demo — nada foi realmente agendado.
                  </p>
                  <div className="mt-6 rounded-2xl bg-[#f0f4f3] p-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={done.prof.photo}
                        alt={done.prof.name}
                        className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-neutral-900">{done.prof.name}</div>
                        <div className="text-sm text-neutral-600">
                          {done.date} · {done.time}
                        </div>
                        <div className="text-xs text-neutral-500">
                          Modalidade: {done.modality}
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
                    Marcar outra consulta
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      1 · Dia
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setVisibleFrom((v) => Math.max(0, v - 6))}
                        disabled={visibleFrom === 0}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300 text-neutral-700 disabled:opacity-30"
                        aria-label="Anteriores"
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
                                {dayLabel(d)}
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
                        aria-label="Próximos"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        2 · Horário disponível
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
                      3 · Modalidade
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
                          <div className="text-sm font-semibold capitalize text-neutral-900">{m}</div>
                          <div className="text-xs text-neutral-500">
                            {m === 'presencial' ? 'Consultório em Botafogo' : 'Link Google Meet'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cname" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        Nome completo
                      </label>
                      <input
                        id="cname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                        className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-[#0f5e62] focus:outline-none"
                      />
                      {errors.name && <div className="mt-1 text-xs text-red-600">{errors.name}</div>}
                    </div>
                    <div>
                      <label htmlFor="cemail" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        E-mail
                      </label>
                      <input
                        id="cemail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@dominio.com"
                        className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-[#0f5e62] focus:outline-none"
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
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-[#0f5e62] focus:outline-none"
                    />
                    {errors.phone && <div className="mt-1 text-xs text-red-600">{errors.phone}</div>}
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      Primeira consulta na Sereno?
                    </div>
                    <div className="mt-3 flex gap-2">
                      {[
                        { v: true, l: 'Sim, primeira vez' },
                        { v: false, l: 'Não, já sou paciente' },
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
                      Concordo com o tratamento dos meus dados de acordo com a{' '}
                      <a href="#" className="text-[#0f5e62] underline">Política de Privacidade</a>{' '}
                      e a LGPD.
                    </span>
                  </label>
                  {errors.lgpd && <div className="mt-1 text-xs text-red-600">{errors.lgpd}</div>}

                  <button
                    onClick={submit}
                    className="mt-6 w-full rounded-full bg-[#0f5e62] py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Agendar consulta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {confirming && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60" onClick={() => setConfirming(false)} aria-label="Fechar" />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <div className="font-display text-lg font-semibold">Confere sua consulta</div>
              <button
                onClick={() => setConfirming(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
                aria-label="Fechar"
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
                  <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">Data</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">
                    {currentDay.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">Horário</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">{time}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">Modalidade</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900 capitalize">{modality}</div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 rounded-full border border-neutral-300 py-3 text-sm font-semibold text-neutral-900"
                >
                  Alterar
                </button>
                <button
                  onClick={finalize}
                  className="flex-1 rounded-full bg-[#0f5e62] py-3 text-sm font-semibold text-white"
                >
                  Confirmar
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
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#0f5e62]">A clínica</div>
              <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
                Um espaço para respirar fundo.
              </h2>
              <p className="mt-4 max-w-lg text-neutral-600">
                Casarão restaurado em Botafogo, 4 consultórios acústicos, sala de
                espera silenciosa, chá e água à disposição.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { l: '4 consultórios', s: 'acústicos' },
                  { l: 'Sala silenciosa', s: 'com jardim' },
                  { l: 'Chá & água', s: 'à disposição' },
                  { l: 'Wi-Fi + café', s: 'antes da sessão' },
                ].map((f) => (
                  <div key={f.l} className="rounded-2xl border border-neutral-200 bg-[#f5f7f6] p-5">
                    <div className="font-display text-base font-semibold text-[#0a3d40]">{f.l}</div>
                    <div className="mt-1 text-xs text-neutral-500">{f.s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-[#f0f4f3] p-6 text-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Onde estamos</div>
              <div className="mt-2 text-neutral-900">Rua Voluntários da Pátria, 42</div>
              <div className="text-neutral-600">Botafogo · Rio de Janeiro</div>
              <div className="mt-4 flex flex-col gap-1 text-neutral-600">
                <div>Seg–Sex · 8h às 20h</div>
                <div>Sáb · 8h às 13h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        © 2025 Clínica Sereno · Demo por MX Studio
      </footer>
    </DemoFrame>
  );
}
