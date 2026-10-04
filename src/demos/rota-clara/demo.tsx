'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Clock, Lock, PlayCircle, ShieldCheck, Sparkles, Star, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, rotaClara } from '@/lib/demo-images';
import { useI18n } from '@/i18n/provider';
import { content } from './content';

const heroSrc = heros['rota-clara'];
const heroSrcSmall = '/heros/rota-clara-768.webp';
// Rendered width: the full demo card (frame gutters 12px/24px plus 1px borders), capped at 1310px.
// The hero is a soft gradient dimmed to 40% under an overlay, so the 768w file holds up on phones
// even though object-cover enlarges it in the tall mobile box.
const heroSizes = '(min-width: 1360px) 1310px, (min-width: 640px) calc(100vw - 50px), calc(100vw - 26px)';

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);
targetDate.setHours(23, 59, 59, 0);

type PlanId = 'solo' | 'plus' | 'pro';

const plans: { id: PlanId; price: number; installment: number; installments: number; highlight: boolean }[] = [
  { id: 'solo', price: 897, installment: 89.7, installments: 12, highlight: false },
  { id: 'plus', price: 1497, installment: 149.7, installments: 12, highlight: true },
  { id: 'pro', price: 4997, installment: 499.7, installments: 12, highlight: false },
];

const testimonials = [
  { name: 'Renata Mendes', photo: rotaClara.testimonials.t1 },
  { name: 'Bruno Lima', photo: rotaClara.testimonials.t2 },
  { name: 'Priscila Souza', photo: rotaClara.testimonials.t3 },
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
  const { locale, money } = useI18n();
  const c = content[locale];

  const { d, h, m, s } = useCountdown(targetDate);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('plus');
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
  const planName = c.plans[plan.id].name;
  const finalPrice = payment === 'pix' ? plan.price * 0.95 : plan.price;

  const openCheckout = () => setCheckoutStep(1);

  const step1Next = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = c.errors.name;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = c.errors.email;
    if (!payment) e.payment = c.errors.payment;
    setErrors(e);
    if (Object.keys(e).length === 0) setCheckoutStep(2);
  };

  const step2Next = () => {
    if (payment === 'card') {
      const e: Record<string, string> = {};
      if (card.number.replace(/\s/g, '').length < 12) e.number = c.errors.number;
      if (!card.name.trim()) e.name = c.errors.cardName;
      if (!card.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = c.errors.expiry;
      if (!card.cvv.match(/^\d{3,4}$/)) e.cvv = c.errors.cvv;
      setErrors(e);
      if (Object.keys(e).length) return;
    }
    setCheckoutStep(3);
  };

  return (
    <DemoFrame siteName="Método Rota Clara" bg="#0f172a">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f172a]/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#22d3ee] text-[#0f172a]">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-none text-white">
              <div className="font-display text-base font-semibold">Rota Clara</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-white/50">{c.method}</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#programa" className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">
              {c.navProgram}
            </a>
            <a href="#depoimentos" className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">
              {c.navStudents}
            </a>
            <a href="#planos" className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">
              {c.navPlans}
            </a>
            <a href="#faq" className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">
              {c.navFaq}
            </a>
          </nav>
          <a
            href="#planos"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#22d3ee] px-4 py-2 text-sm font-semibold text-[#0f172a] transition-transform hover:-translate-y-0.5"
          >
            {c.start}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSrc}
            srcSet={`${heroSrcSmall} 768w, ${heroSrc} 1920w`}
            sizes={heroSizes}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0f172a]/60 via-[#0f172a]/75 to-[#0f172a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_10%,rgba(34,211,238,0.35),transparent)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center text-white sm:px-6 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/4 px-3 py-1 text-xs font-medium text-white/85">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22d3ee] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22d3ee]" />
            </span>
            {c.seats(seatsLeft)}
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            {c.heroTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#22d3ee]">
              {c.heroTitleEm}
            </em>
            <br />
            {c.heroTitleB}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">{c.heroLead}</p>

          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 p-3">
              <Clock className="h-4 w-4 text-[#22d3ee]" />
              <div className="text-xs uppercase tracking-[0.14em] text-white/60">{c.offerEnds}</div>
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
                {c.seePlans}
                <ArrowRight className="h-4 w-4" />
              </a>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5">
                <PlayCircle className="h-4 w-4" />
                {c.freeClass}
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
              <span className="ml-1">{c.rating}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programa */}
      <section id="programa" className="border-t border-white/10 bg-[#0f172a] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">{c.programEyebrow}</div>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold sm:text-4xl">
            {c.programTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              {c.programTitleEm}
            </em>
            .
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
            {c.modules.map((mod, i) => (
              <div key={mod.title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/2 p-4 transition-colors hover:border-white/25">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/6 font-display text-sm font-bold text-[#22d3ee]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-base font-semibold text-white">{mod.title}</div>
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
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">{c.studentsEyebrow}</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">{c.studentsTitle}</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={t.name} className="rounded-3xl border border-white/10 bg-white/3 p-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/80">&quot;{c.testimonials[i].text}&quot;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{c.testimonials[i].role}</div>
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
            <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-white/3">
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
              {c.teacherEyebrow}
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
              {c.teacherTitleA}{' '}
              <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                {c.teacherTitleEm}
              </em>{' '}
              {c.teacherTitleB}
            </h2>
            <p className="mt-6 text-lg text-white/70">{c.teacherBio}</p>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {c.teacherStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-white">{stat.kpi}</div>
                  <div className="mt-1 text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="border-t border-white/10 bg-[#0f172a] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">{c.plansEyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
              {c.plansTitleA}{' '}
              <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                {c.plansTitleEm}
              </em>
              .
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">{c.plansLead}</p>
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
                    : 'border-white/10 bg-white/2 hover:border-white/30')
                }
              >
                {p.highlight && (
                  <div className="mb-4 inline-flex rounded-full bg-[#22d3ee] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0f172a]">
                    {c.mostChosen}
                  </div>
                )}
                <div className="font-display text-xl font-semibold text-white">{c.plans[p.id].name}</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[11px] text-white/60">{c.installmentsOf(p.installments)}</span>
                  <span className="font-display text-3xl font-semibold text-white">
                    {money(p.installment)}
                  </span>
                </div>
                <div className="mt-1 text-xs text-white/50">{c.pixPrice(money(p.price))}</div>
                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm">
                  {c.plans[p.id].features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-white/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22d3ee]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={'mt-6 rounded-full py-3 text-center text-sm font-semibold ' + (p.id === selectedPlan ? 'bg-[#22d3ee] text-[#0f172a]' : 'border border-white/15 text-white')}>
                  {p.id === selectedPlan ? c.chosen : c.choose}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={openCheckout}
              className="inline-flex items-center gap-2 rounded-full bg-[#22d3ee] px-8 py-4 text-base font-semibold text-[#0f172a] transition-transform hover:-translate-y-0.5"
            >
              {c.goCheckout(planName)}
              <ArrowRight className="h-5 w-5" />
            </button>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/50">
              <ShieldCheck className="h-3.5 w-3.5" />
              {c.secure}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 bg-[#0b1223] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#22d3ee]">{c.faqEyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{c.faqTitle}</h2>
          </div>
          <div className="mt-10 space-y-3">
            {c.faq.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-white/10 bg-white/2">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display text-base font-semibold text-white">{f.q}</span>
                  <ChevronDown className={'h-5 w-5 shrink-0 text-white/50 transition-transform ' + (openFaq === i ? 'rotate-180' : '')} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-white/10 p-5 text-sm leading-relaxed text-white/70">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout modal */}
      {checkoutStep > 0 && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/80" onClick={() => setCheckoutStep(0)} aria-label={c.close} />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0f172a] text-white shadow-2xl">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {c.secureCheckout}
                </div>
                <button
                  onClick={() => setCheckoutStep(0)}
                  className="grid h-9 w-9 place-items-center rounded-full text-white/60 hover:bg-white/5"
                  aria-label={c.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={'h-1 flex-1 rounded-full ' + (checkoutStep >= n ? 'bg-[#22d3ee]' : 'bg-white/10')} />
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-white/5 p-3">
                <div className="text-xs text-white/50">{c.buying}</div>
                <div className="font-display text-base font-semibold">{planName} · Rota Clara</div>
              </div>
            </div>

            {checkoutStep === 1 && (
              <div className="px-6 py-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {c.step1}
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={c.fullName}
                      className="w-full rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#22d3ee] focus:outline-hidden"
                    />
                    {errors.name && <div className="mt-1 text-xs text-red-400">{errors.name}</div>}
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={c.emailPlaceholder}
                      className="w-full rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#22d3ee] focus:outline-hidden"
                    />
                    {errors.email && <div className="mt-1 text-xs text-red-400">{errors.email}</div>}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    {c.payment}
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
                        <div className="text-sm font-semibold">{p === 'pix' ? c.pix : c.card}</div>
                        <div className="text-[11px] text-white/60">
                          {p === 'pix' ? c.pixDesc : c.cardDesc(plan.installments)}
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
                  {c.continue}
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="px-6 py-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {payment === 'pix' ? c.step2Pix : c.step2Card}
                </div>
                {payment === 'card' ? (
                  <div className="mt-4 space-y-3">
                    <input
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      placeholder={c.cardNumber}
                      className="w-full rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#22d3ee] focus:outline-hidden"
                    />
                    {errors.number && <div className="text-xs text-red-400">{errors.number}</div>}
                    <input
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      placeholder={c.cardName}
                      className="w-full rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#22d3ee] focus:outline-hidden"
                    />
                    {errors.name && <div className="text-xs text-red-400">{errors.name}</div>}
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                        placeholder={c.expiry}
                        className="w-full rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#22d3ee] focus:outline-hidden"
                      />
                      <input
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                        placeholder="CVV"
                        className="w-full rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#22d3ee] focus:outline-hidden"
                      />
                    </div>
                    {(errors.expiry || errors.cvv) && (
                      <div className="text-xs text-red-400">{errors.expiry || errors.cvv}</div>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm">
                    <p>{c.pixInfo}</p>
                  </div>
                )}
                <div className="mt-6 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm">
                  <div>
                    <div className="text-white/50 text-xs">{c.total}</div>
                    <div className="font-display text-lg font-semibold">{money(finalPrice)}</div>
                  </div>
                  {payment === 'pix' && (
                    <div className="text-xs font-medium text-[#22d3ee]">
                      {c.youSave(money(plan.price - finalPrice))}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="flex-1 rounded-full border border-white/15 py-3 text-sm font-semibold text-white"
                  >
                    {c.back}
                  </button>
                  <button
                    onClick={step2Next}
                    className="flex-1 rounded-full bg-[#22d3ee] py-3 text-sm font-semibold text-[#0f172a]"
                  >
                    {c.finish}
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
                  {c.welcome(name.split(' ')[0])}
                </div>
                <p className="mt-3 text-sm text-white/70">{c.accessSent(email)}</p>
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
                  {c.backToPage}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* The static export bakes in the build year; it updates on the next deploy. */}
      <footer className="border-t border-white/10 bg-[#0f172a] py-8 text-center text-xs text-white/50" suppressHydrationWarning>
        © {new Date().getFullYear()} Rota Clara · Larissa Nogueira · {c.demoBy}
      </footer>
    </DemoFrame>
  );
}

function Digit({ v, u }: { v: number; u: string }) {
  return (
    // A live clock: the server and the first client render land on different seconds.
    <span className="tabular-nums" suppressHydrationWarning>
      {String(v).padStart(2, '0')}
      <span className="ml-0.5 text-[10px] text-white/50">{u}</span>
    </span>
  );
}
