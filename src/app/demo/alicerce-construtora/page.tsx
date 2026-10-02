'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, Check, Hammer, HardHat, Home, MapPin, Ruler } from 'lucide-react';
import { ArtTile, DemoArt } from '@/components/demo-art';
import { DemoFrame } from '@/components/demo-frame';
import { CountUp } from '@/components/fx/count-up';
import { alicerceProjects, heros } from '@/lib/demo-images';

const categoryIcons = { residencial: Home, comercial: Building2, reforma: Hammer };
import { useI18n } from '@/i18n/provider';
import { content } from './content';

type ProjectType = 'casa' | 'reforma' | 'ampliacao' | 'comercial';
type Standard = 'economico' | 'medio' | 'alto';
type Category = 'residencial' | 'comercial' | 'reforma';

/** Reference cost per m² in BRL. */
const costPerM2: Record<ProjectType, number> = { casa: 3400, reforma: 1800, ampliacao: 2600, comercial: 3000 };
const standardFactor: Record<Standard, number> = { economico: 0.8, medio: 1, alto: 1.5 };

const projects: { id: keyof typeof alicerceProjects; category: Category; location: string; area: number; year: string }[] = [
  { id: 'o1', category: 'residencial', location: 'Itanhangá, RJ', area: 420, year: '2025' },
  { id: 'o2', category: 'comercial', location: 'Centro, RJ', area: 1850, year: '2024' },
  { id: 'o3', category: 'reforma', location: 'Cosme Velho, RJ', area: 260, year: '2025' },
  { id: 'o4', category: 'residencial', location: 'Jardim Botânico, RJ', area: 310, year: '2024' },
  { id: 'o5', category: 'comercial', location: 'Ipanema, RJ', area: 180, year: '2025' },
  { id: 'o6', category: 'reforma', location: 'Niterói, RJ', area: 150, year: '2026' },
];

export default function AlicerceDemo() {
  const { locale, money } = useI18n();
  const c = content[locale];

  const [type, setType] = useState<ProjectType>('casa');
  const [area, setArea] = useState(180);
  const [standard, setStandard] = useState<Standard>('medio');
  const [category, setCategory] = useState<'all' | Category>('all');
  const [stage, setStage] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const perM2 = costPerM2[type] * standardFactor[standard];
  const estimate = perM2 * area;
  const months = Math.max(1, Math.round((area / (type === 'reforma' ? 60 : 35)) * (standard === 'alto' ? 1.3 : 1)));
  const visibleProjects = projects.filter((p) => category === 'all' || p.category === category);

  const submit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = c.errors.name;
    if (!phone.match(/\d{8,}/)) e.phone = c.errors.phone;
    if (!city.trim()) e.city = c.errors.city;
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  return (
    <DemoFrame siteName="Alicerce Engenharia" bg="#0f0f0e">
      <div className="text-[#f4efe6]">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f0f0e]/85 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center bg-[#f5a524] text-[#0f0f0e]">
                <HardHat className="h-4 w-4" />
              </span>
              <div className="leading-none">
                <div className="font-display text-base font-bold uppercase tracking-[0.08em]">Alicerce</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">{c.tagline}</div>
              </div>
            </div>
            <nav className="hidden items-center gap-1 sm:flex">
              {[
                { href: '#orcamento', label: c.navEstimate },
                { href: '#obras', label: c.navProjects },
                { href: '#etapas', label: c.navStages },
              ].map((l) => (
                <a key={l.href} href={l.href} className="px-3 py-1.5 text-sm text-white/65 hover:text-[#f5a524]">
                  {l.label}
                </a>
              ))}
            </nav>
            <a href="#visita" className="inline-flex items-center gap-1.5 bg-[#f5a524] px-4 py-2 text-sm font-bold text-[#0f0f0e] transition-transform hover:-translate-y-0.5">
              {c.cta}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <DemoArt slug="alicerce-construtora" />
          <img src={heros['alicerce-construtora']} alt={c.heroAlt} data-fallback="hide" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0f0f0e] via-[#0f0f0e]/85 to-[#0f0f0e]/30" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(#f4efe6_1px,transparent_1px),linear-gradient(90deg,#f4efe6_1px,transparent_1px)] bg-size-[64px_64px]"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="inline-flex items-center gap-2 border border-[#f5a524]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5a524]">
              {c.heroEyebrow}
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl">
              {c.heroTitleA}{' '}
              <span className="text-[#f5a524]">{c.heroTitleEm}</span> {c.heroTitleB}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/65">{c.heroLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#orcamento" className="inline-flex items-center gap-2 bg-[#f5a524] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-[#0f0f0e] transition-transform hover:-translate-y-0.5">
                {c.simulate} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#obras" className="border border-white/25 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.06em] transition-colors hover:border-[#f5a524] hover:text-[#f5a524]">
                {c.seeProjects}
              </a>
            </div>
            <div className="mt-16 grid grid-cols-2 border-t border-white/15 sm:grid-cols-4">
              {c.stats.map((s, i) => (
                <div key={s.label} className={'py-6 ' + (i > 0 ? 'sm:border-l sm:border-white/15 sm:pl-6' : '')}>
                  <CountUp value={s.kpi} className="block font-display text-4xl font-bold text-[#f5a524] sm:text-5xl" />
                  <div className="mt-1 text-xs uppercase tracking-[0.12em] text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Orçamento */}
        <section id="orcamento" className="border-t border-white/10 bg-[#161615] py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5a524]">{c.estimateEyebrow}</div>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                {c.estimateTitleA} <span className="text-[#f5a524]">{c.estimateTitleEm}</span>?
              </h2>
              <p className="mt-4 text-white/60">{c.estimateLead}</p>

              <div className="mt-8 border border-[#f5a524]/40 bg-[#f5a524]/6 p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{c.resultLabel}</div>
                <div key={Math.round(estimate)} className="mt-2 flex animate-[page-enter_0.4s_ease_both] flex-wrap items-baseline gap-x-2 font-display text-2xl font-bold text-[#f5a524] xl:text-3xl">
                  <span>{money(estimate * 0.9, { decimals: 0, round: true })}</span>
                  <span className="text-base font-medium text-white/40">{c.rangeSeparator}</span>
                  <span>{money(estimate * 1.12, { decimals: 0, round: true })}</span>
                </div>
                <div className="mt-1 text-sm text-white/50">{c.perM2(money(perM2, { decimals: 0 }))}</div>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                  <span className="text-white/50">{c.durationLabel}</span>
                  <span className="font-bold">{c.months(months)}</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-white/40">{c.estimateNote}</p>
            </div>

            <div className="space-y-8 lg:col-span-7">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{c.typeLabel}</div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(Object.keys(costPerM2) as ProjectType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={
                        'border px-3 py-4 text-sm font-bold transition-colors ' +
                        (type === t ? 'border-[#f5a524] bg-[#f5a524] text-[#0f0f0e]' : 'border-white/15 hover:border-white/40')
                      }
                    >
                      {c.types[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="alicerce-area" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {c.areaLabel}
                  </label>
                  <span className="inline-flex items-center gap-1.5 font-display text-2xl font-bold">
                    <Ruler className="h-4 w-4 text-[#f5a524]" />
                    {area} m²
                  </span>
                </div>
                <input
                  id="alicerce-area"
                  type="range"
                  min={30}
                  max={600}
                  step={10}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none bg-white/10 accent-[#f5a524]"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-white/35">
                  <span>30 m²</span>
                  <span>600 m²</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{c.standardLabel}</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(Object.keys(standardFactor) as Standard[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStandard(s)}
                      className={
                        'border px-3 py-3 text-sm font-bold transition-colors ' +
                        (standard === s ? 'border-[#f4efe6] bg-[#f4efe6] text-[#0f0f0e]' : 'border-white/15 hover:border-white/40')
                      }
                    >
                      {c.standards[s]}
                    </button>
                  ))}
                </div>
              </div>

              <a href="#visita" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.06em] text-[#f5a524] transition-all hover:gap-3">
                {c.requestVisit} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Obras */}
        <section id="obras" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5a524]">{c.projectsEyebrow}</div>
                <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">{c.projectsTitle}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['all', 'residencial', 'comercial', 'reforma'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    aria-pressed={category === cat}
                    className={
                      'border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ' +
                      (category === cat ? 'border-[#f5a524] text-[#f5a524]' : 'border-white/15 text-white/60 hover:text-white')
                    }
                  >
                    {c.categories[cat]}
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleProjects.map((p) => (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group relative aspect-4/5 overflow-hidden bg-[#1c1c1a]"
                  >
                    <ArtTile icon={categoryIcons[p.category]} from="#2c2720" to="#121210" iconClassName="text-[#f5a524]/30" />
                    <img
                      src={alicerceProjects[p.id]}
                      alt={c.projects[p.id]}
                      data-fallback="hide"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0e] via-[#0f0f0e]/30 to-transparent" />
                    <span className="absolute left-4 top-4 bg-[#f5a524] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f0f0e]">
                      {c.categories[p.category]}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-xl font-bold uppercase leading-tight">{c.projects[p.id]}</h3>
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-white/60">
                        <MapPin className="h-3.5 w-3.5" /> {p.location}
                      </div>
                      <div className="mt-3 grid grid-cols-2 border-t border-white/15 pt-3 text-xs text-white/70 transition-all duration-500 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <span>{p.area.toLocaleString(locale === 'en' ? 'en-US' : 'pt-BR')} m²</span>
                        <span className="text-right">{c.delivered(p.year)}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Etapas */}
        <section id="etapas" className="border-t border-white/10 bg-[#161615] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5a524]">{c.stagesEyebrow}</div>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
              {c.stagesTitleA} <span className="text-[#f5a524]">{c.stagesTitleEm}</span>.
            </h2>

            <div className="mt-10 h-1 bg-white/10">
              <div className="h-full bg-[#f5a524] transition-all duration-700" style={{ width: `${((stage + 1) / c.stages.length) * 100}%` }} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <ol className="space-y-2 lg:col-span-5">
                {c.stages.map((s, i) => (
                  <li key={s.title}>
                    <button
                      onClick={() => setStage(i)}
                      className={
                        'flex w-full items-center gap-4 border px-4 py-4 text-left transition-colors ' +
                        (stage === i ? 'border-[#f5a524] bg-[#f5a524]/10' : 'border-white/10 hover:border-white/30')
                      }
                    >
                      <span className={'grid h-9 w-9 shrink-0 place-items-center font-mono text-sm font-bold ' + (i <= stage ? 'bg-[#f5a524] text-[#0f0f0e]' : 'bg-white/5 text-white/50')}>
                        {i < stage ? <Check className="h-4 w-4" /> : String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 font-display font-bold uppercase">{s.title}</span>
                      <span className="hidden text-xs text-white/40 sm:inline">{s.duration}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35 }}
                    className="h-full border border-white/10 bg-[#0f0f0e] p-6 sm:p-10"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                      {c.stageOf(stage + 1, c.stages.length)} · {c.stages[stage].duration}
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-bold uppercase">{c.stages[stage].title}</h3>
                    <p className="mt-4 text-white/65">{c.stages[stage].desc}</p>
                    <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5a524]">{c.deliverablesLabel}</div>
                    <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {c.stages[stage].deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 border border-white/10 p-3 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f5a524]" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Visita técnica */}
        <section id="visita" className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="border border-white/10 bg-[#161615] p-6 sm:p-10">
              {sent ? (
                <div className="py-6 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center bg-[#f5a524] text-[#0f0f0e]">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="mt-6 font-display text-2xl font-bold uppercase">{c.doneTitle(name.split(' ')[0])}</div>
                  <p className="mt-2 text-sm text-white/60">{c.doneText}</p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName('');
                      setPhone('');
                      setCity('');
                    }}
                    className="mt-6 border border-white/20 px-5 py-2.5 text-sm font-bold uppercase"
                  >
                    {c.newRequest}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-3xl font-bold uppercase">{c.contactTitle}</h2>
                  <p className="mt-2 text-white/60">{c.contactLead}</p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Input label={c.name} value={name} onChange={setName} placeholder={c.namePlaceholder} error={errors.name} />
                    <Input label="WhatsApp" value={phone} onChange={setPhone} placeholder="(21) 99999-9999" error={errors.phone} />
                    <Input label={c.city} value={city} onChange={setCity} placeholder={c.cityPlaceholder} error={errors.city} />
                  </div>
                  <div className="mt-4 border border-dashed border-white/15 px-4 py-3 text-sm text-white/60">
                    {c.summary(c.types[type], area)} · {c.standards[standard]}
                  </div>
                  <button onClick={submit} className="mt-6 w-full bg-[#f5a524] py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#0f0f0e] transition-transform hover:-translate-y-0.5">
                    {c.send}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-center text-xs text-white/40">
          <div>{c.footerNote}</div>
          <div className="mt-1">© 2026 Alicerce Engenharia · {c.demoBy}</div>
        </footer>
      </div>
    </DemoFrame>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm placeholder:text-white/30 focus:border-[#f5a524] focus:outline-hidden"
      />
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
