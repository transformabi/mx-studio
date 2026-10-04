'use client';

import { Fragment, useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Clock, Flame, MapPin, Phone, Utensils, Users, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, restauranteDishes } from '@/lib/demo-images';
import { useI18n } from '@/i18n/provider';
import { content } from './content';

type Category = 'Couvert' | 'Entradas' | 'Principais' | 'Sobremesas' | 'Bebidas';
type DishId = keyof (typeof content)['pt']['dishes'];

type Dish = {
  id: DishId;
  price: number;
  category: Category;
  tags?: ('Vegano' | 'Vegetariano' | 'Sem glúten' | 'Chef')[];
};

const dishes: Dish[] = [
  { id: 'c1', price: 28, category: 'Couvert' },
  { id: 'c2', price: 22, category: 'Couvert', tags: ['Vegano'] },
  { id: 'e1', price: 62, category: 'Entradas', tags: ['Vegetariano', 'Chef'] },
  { id: 'e2', price: 78, category: 'Entradas' },
  { id: 'e3', price: 68, category: 'Entradas', tags: ['Vegetariano'] },
  { id: 'p1', price: 168, category: 'Principais', tags: ['Chef'] },
  { id: 'p2', price: 148, category: 'Principais' },
  { id: 'p3', price: 178, category: 'Principais' },
  { id: 'p4', price: 128, category: 'Principais', tags: ['Vegetariano'] },
  { id: 's1', price: 42, category: 'Sobremesas' },
  { id: 's2', price: 46, category: 'Sobremesas' },
  { id: 'b1', price: 38, category: 'Bebidas' },
  { id: 'b2', price: 42, category: 'Bebidas', tags: ['Chef'] },
  { id: 'b3', price: 12, category: 'Bebidas' },
];

// One photo per category, each showing one specific dish, so it is shown once per tab and captioned with that dish.
const categoryPhoto: Record<Category, { src: string; dish: DishId }> = {
  Couvert: { src: restauranteDishes.couvert, dish: 'c1' },
  Entradas: { src: restauranteDishes.entrada, dish: 'e1' },
  Principais: { src: restauranteDishes.principal, dish: 'p1' },
  Sobremesas: { src: restauranteDishes.sobremesa, dish: 's1' },
  Bebidas: { src: restauranteDishes.bebida, dish: 'b1' },
};

// Hero (LCP). It covers a ~730-800px-tall box, so it renders ~1300-1420 CSS px wide at every viewport and a
// downscaled copy would look soft. Phones get a full-resolution 768x1080 centre crop instead: the exact region
// they show (box aspect stays below 768/1080 under 500px), at about half the bytes.
const heroSrc = heros['restaurante-terra'];
const heroSrcPhone = '/heros/restaurante-terra-768.webp';

const tabId = (cat: Category) => `terra-tab-${cat}`;
const menuPanelId = 'terra-menu-panel';

const categories: Category[] = ['Couvert', 'Entradas', 'Principais', 'Sobremesas', 'Bebidas'];

function nextDays(count = 14) {
  const days: Date[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

const timesLunch = ['12:00', '12:30', '13:00', '13:30', '14:00'];
const timesDinner = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

const bookedSlots = new Set(['2025-01-01_20:00', '2025-01-01_20:30']);
const isBooked = (dateKey: string, time: string) => bookedSlots.has(`${dateKey}_${time}`);

const isoKey = (d: Date) => d.toISOString().split('T')[0];

export default function RestauranteTerraDemo() {
  const { locale, intl, money } = useI18n();
  const c = content[locale];
  const shortDate = (d: Date, opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString(intl, opts).replace('.', '');

  const [category, setCategory] = useState<Category>('Principais');
  const days = useMemo(() => nextDays(14), []);
  const [dateIdx, setDateIdx] = useState(1);
  const [time, setTime] = useState<string | null>(null);
  const [people, setPeople] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirming, setConfirming] = useState(false);
  const [reserved, setReserved] = useState<null | { name: string; date: Date; time: string; people: number }>(null);
  const [visibleFrom, setVisibleFrom] = useState(0);

  const filteredDishes = useMemo(() => dishes.filter((d) => d.category === category), [category]);

  const selectedDate = days[dateIdx];
  const dateKey = isoKey(selectedDate);
  const period: 'lunch' | 'dinner' =
    selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5 ? 'dinner' : 'lunch';
  const times = period === 'lunch' ? [...timesLunch, ...timesDinner] : timesDinner;

  const submit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = c.errors.name;
    if (!phone.match(/\d{8,}/)) e.phone = c.errors.phone;
    if (!time) e.time = c.errors.time;
    setErrors(e);
    if (Object.keys(e).length) return;
    setConfirming(true);
  };

  const finalize = () => {
    setReserved({ name, date: selectedDate, time: time!, people });
    setConfirming(false);
  };

  const visibleDays = days.slice(visibleFrom, visibleFrom + 7);

  return (
    <DemoFrame siteName="Terra Casa de Fogo" bg="#1c1917">
      {/* Store header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1c1917]/85 text-[#f5e9d5] backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#d97706] text-white">
              <Flame className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="font-display text-base font-semibold">Terra</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#f5e9d5]/60">{c.tagline}</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#menu" className="rounded-full px-3 py-1.5 text-sm text-[#f5e9d5]/80 hover:bg-white/5 hover:text-[#f5e9d5]">
              {c.navMenu}
            </a>
            <a href="#reserva" className="rounded-full px-3 py-1.5 text-sm text-[#f5e9d5]/80 hover:bg-white/5 hover:text-[#f5e9d5]">
              {c.navBooking}
            </a>
            <a href="#visita" className="rounded-full px-3 py-1.5 text-sm text-[#f5e9d5]/80 hover:bg-white/5 hover:text-[#f5e9d5]">
              {c.navVisit}
            </a>
          </nav>
          <a
            href="#reserva"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#b45309] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {c.book}
            <Utensils className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source media="(max-width: 499px)" srcSet={heroSrcPhone} type="image/webp" />
            <img
              src={heroSrc}
              alt={c.heroAlt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />
          </picture>
          <div className="absolute inset-0 bg-linear-to-b from-[#1c1917]/40 via-[#1c1917]/60 to-[#1c1917]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(217,119,6,0.35),transparent)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-[#f5e9d5] sm:px-6 sm:py-32">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#f5e9d5]/70">
            <Flame className="h-3 w-3 text-[#d97706]" />
            {c.heroEyebrow}
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            {c.heroTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#f5e9d5]">
              {c.heroTitleEm}
            </em>{' '}
            {c.heroTitleB}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-[#f5e9d5]/80">{c.heroLead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#reserva"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#b45309] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {c.bookTable}
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#f5e9d5]/30 px-5 py-3 text-sm font-semibold text-[#f5e9d5] transition-colors hover:bg-white/5"
            >
              {c.seeMenu}
            </a>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-[#f5e9d5]/15 pt-8 sm:grid-cols-4">
            {c.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold">{s.kpi}</div>
                <div className="mt-1 text-xs text-[#f5e9d5]/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="border-t border-white/10 bg-[#28221c] py-16 text-[#f5e9d5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d97706]">{c.menuEyebrow}</div>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                {c.menuTitleA}{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                  {c.menuTitleEm}
                </em>{' '}
                {c.menuTitleB}
              </h2>
            </div>
            <div className="text-xs text-[#f5e9d5]/60">{c.menuNote}</div>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto border-b border-white/10 pb-3" role="tablist" aria-label={c.menuTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                id={tabId(cat)}
                role="tab"
                aria-selected={category === cat}
                aria-controls={menuPanelId}
                onClick={() => setCategory(cat)}
                className={
                  'shrink-0 border-b-2 px-4 pb-3 text-sm font-medium transition-colors ' +
                  (category === cat
                    ? 'border-[#d97706] text-[#f5e9d5]'
                    : 'border-transparent text-[#f5e9d5]/60 hover:text-[#f5e9d5]')
                }
              >
                {c.categories[cat]}
              </button>
            ))}
          </div>

          <div
            id={menuPanelId}
            role="tabpanel"
            aria-labelledby={tabId(category)}
            className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10"
          >
            <figure className="lg:col-span-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-white/5 sm:aspect-21/9 lg:aspect-4/3">
                <img
                  src={categoryPhoto[category].src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-[#f5e9d5]/60">
                {c.pictured} {c.dishes[categoryPhoto[category].dish].name}
              </figcaption>
            </figure>

            <ul className="divide-y divide-white/10 lg:col-span-8">
              {filteredDishes.map((d) => (
                <li key={d.id} className="flex items-start justify-between gap-4 py-5 first:pt-0 sm:gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="font-display text-lg font-semibold text-[#f5e9d5]">{c.dishes[d.id].name}</h3>
                      {d.tags?.includes('Chef') && (
                        <span className="whitespace-nowrap rounded-full bg-[#d97706]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#f59e0b]">
                          {c.tags.chef}
                        </span>
                      )}
                      {d.tags?.includes('Vegano') && (
                        <span className="whitespace-nowrap rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                          {c.tags.vegan}
                        </span>
                      )}
                      {d.tags?.includes('Vegetariano') && !d.tags?.includes('Vegano') && (
                        <span className="whitespace-nowrap rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                          {c.tags.vegetarian}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-[#f5e9d5]/70">{c.dishes[d.id].description}</p>
                  </div>
                  <div className="shrink-0 whitespace-nowrap pt-1 text-right font-mono text-sm text-[#f5e9d5]">
                    {money(d.price)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reserva */}
      <section id="reserva" className="border-t border-white/10 bg-[#1c1917] py-16 text-[#f5e9d5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d97706]">{c.bookingEyebrow}</div>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                {c.bookingTitleA}{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                  {c.bookingTitleEm}
                </em>{' '}
                {c.bookingTitleB}
              </h2>
              <p className="mt-4 text-[#f5e9d5]/70">{c.bookingLead}</p>

              <div className="mt-8 space-y-3 text-sm text-[#f5e9d5]/70">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#d97706]" /> Rua Voluntários da Pátria, 42 · Botafogo
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#d97706]" /> (21) 3232-9090
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[#d97706]" /> {c.hours}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {reserved ? (
                <div className="rounded-3xl border border-white/10 bg-white/3 p-8">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#d97706] text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-center">
                    {c.reservedTitle}
                  </h3>
                  <p className="mt-2 text-center text-[#f5e9d5]/70">
                    {c.reservedText(reserved.name.split(' ')[0])}
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-white/3 p-4 text-center">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">{c.date}</div>
                      <div className="mt-1 text-sm font-semibold">
                        {reserved.date.toLocaleDateString(intl, { weekday: 'long', day: '2-digit', month: 'long' })}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">{c.time}</div>
                      <div className="mt-1 text-sm font-semibold">{reserved.time}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">{c.people}</div>
                      <div className="mt-1 text-sm font-semibold">{reserved.people}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-xs text-[#f5e9d5]/60">{c.reservedNote}</p>
                  <button
                    onClick={() => setReserved(null)}
                    className="mt-6 w-full rounded-full border border-white/15 py-3 text-sm font-semibold text-[#f5e9d5] hover:bg-white/5"
                  >
                    {c.newBooking}
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/60">
                      {c.stepDate}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setVisibleFrom((v) => Math.max(0, v - 7))}
                        disabled={visibleFrom === 0}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-[#f5e9d5] disabled:opacity-30"
                        aria-label={c.prevWeek}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <div className="flex flex-1 gap-2 overflow-x-auto">
                        {visibleDays.map((d, i) => {
                          const idx = visibleFrom + i;
                          const selected = idx === dateIdx;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                setDateIdx(idx);
                                setTime(null);
                              }}
                              className={
                                'flex min-w-[76px] flex-col items-center rounded-2xl border px-3 py-2 text-center transition-colors ' +
                                (selected
                                  ? 'border-[#b45309] bg-[#b45309] text-white'
                                  : 'border-white/15 bg-white/2 text-[#f5e9d5]/80 hover:border-white/30')
                              }
                            >
                              <span className="text-[10px] uppercase tracking-[0.12em]">
                                {shortDate(d, { weekday: 'short' })}
                              </span>
                              <span className="mt-1 font-display text-lg font-semibold">
                                {d.getDate()}
                              </span>
                              <span className="text-[10px]">
                                {shortDate(d, { month: 'short' })}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setVisibleFrom((v) => Math.min(days.length - 7, v + 7))}
                        disabled={visibleFrom + 7 >= days.length}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-[#f5e9d5] disabled:opacity-30"
                        aria-label={c.nextWeek}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/60">
                        {c.stepTime(c.periods[period])}
                      </div>
                      {errors.time && <div className="text-xs text-red-400">{errors.time}</div>}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {times.map((t) => {
                        const booked = isBooked(dateKey, t);
                        const selected = time === t;
                        return (
                          <button
                            key={t}
                            onClick={() => !booked && setTime(t)}
                            disabled={booked}
                            className={
                              'rounded-full border px-3 py-1.5 text-sm transition-colors ' +
                              (booked
                                ? 'cursor-not-allowed border-white/5 bg-white/2 text-[#f5e9d5]/25 line-through'
                                : selected
                                ? 'border-[#b45309] bg-[#b45309] text-white'
                                : 'border-white/15 bg-white/2 text-[#f5e9d5]/80 hover:border-white/30')
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/60">
                      {c.stepPeople}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setPeople((p) => Math.max(1, p - 1))}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#f5e9d5]"
                        aria-label={c.fewer}
                      >
                        −
                      </button>
                      <div className="w-24 text-center">
                        <div className="font-display text-2xl font-semibold">{people}</div>
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[#f5e9d5]/60">
                          {c.person(people)}
                        </div>
                      </div>
                      <button
                        onClick={() => setPeople((p) => Math.min(20, p + 1))}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#f5e9d5]"
                        aria-label={c.more}
                      >
                        +
                      </button>
                      <div className="ml-4 text-xs text-[#f5e9d5]/60">
                        <Users className="mr-1 inline h-3.5 w-3.5" /> {c.maxPeople}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="rname" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/60">
                        {c.name}
                      </label>
                      <input
                        id="rname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={c.namePlaceholder}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-[#f5e9d5] placeholder:text-[#f5e9d5]/55 focus:border-[#d97706] focus:outline-hidden"
                      />
                      {errors.name && <div className="mt-1 text-xs text-red-400">{errors.name}</div>}
                    </div>
                    <div>
                      <label htmlFor="rphone" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/60">
                        WhatsApp
                      </label>
                      <input
                        id="rphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(21) 99999-9999"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-[#f5e9d5] placeholder:text-[#f5e9d5]/55 focus:border-[#d97706] focus:outline-hidden"
                      />
                      {errors.phone && <div className="mt-1 text-xs text-red-400">{errors.phone}</div>}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="rnote" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/60">
                      {c.note}
                    </label>
                    <textarea
                      id="rnote"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={c.notePlaceholder}
                      rows={2}
                      className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-white/4 px-4 py-3 text-sm text-[#f5e9d5] placeholder:text-[#f5e9d5]/55 focus:border-[#d97706] focus:outline-hidden"
                    />
                  </div>

                  <button
                    onClick={submit}
                    className="mt-6 w-full rounded-full bg-[#b45309] py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    {c.confirmBooking}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONFIRM MODAL */}
      {confirming && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terra-review-title"
        >
          <button className="absolute inset-0 bg-black/70" onClick={() => setConfirming(false)} aria-label={c.close} />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#1c1917] text-[#f5e9d5] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div id="terra-review-title" className="font-display text-lg font-semibold">
                {c.reviewTitle}
              </div>
              <button
                onClick={() => setConfirming(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#f5e9d5]/60 hover:bg-white/5"
                aria-label={c.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-3 gap-4 rounded-2xl bg-white/3 p-4 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">{c.date}</div>
                  <div className="mt-1 text-sm font-semibold">
                    {selectedDate.toLocaleDateString(intl, { day: '2-digit', month: 'short' })}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">{c.time}</div>
                  <div className="mt-1 text-sm font-semibold">{time}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">{c.people}</div>
                  <div className="mt-1 text-sm font-semibold">{people}</div>
                </div>
              </div>
              <div className="mt-4 space-y-1.5 text-sm text-[#f5e9d5]/70">
                <div><span className="text-[#f5e9d5]/50">{c.nameLabel}</span>{name}</div>
                <div><span className="text-[#f5e9d5]/50">WhatsApp: </span>{phone}</div>
                {note && <div><span className="text-[#f5e9d5]/50">{c.noteLabel}</span>{note}</div>}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 rounded-full border border-white/15 py-3 text-sm font-semibold text-[#f5e9d5]"
                >
                  {c.change}
                </button>
                <button
                  onClick={finalize}
                  className="flex-1 rounded-full bg-[#b45309] py-3 text-sm font-semibold text-white"
                >
                  {c.confirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filosofia */}
      <section className="border-t border-white/10 bg-[#1c1917] py-16 text-[#f5e9d5]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d97706]">{c.philosophy}</div>
          {/* Phones flow the quote as one balanced paragraph; the hand-set line breaks start at sm. */}
          <h2 style={{ fontFamily: 'var(--font-instrument-serif)' }} className="mt-4 text-balance text-4xl italic leading-[1.05] sm:text-6xl">
            {c.quote.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="sm:block">{line}</span>
              </Fragment>
            ))}
          </h2>
          <div className="mt-8 inline-flex items-center gap-3 text-sm text-[#f5e9d5]/70">
            <div className="h-px w-8 bg-[#f5e9d5]/30" />
            Chef Rafael Menezes
            <div className="h-px w-8 bg-[#f5e9d5]/30" />
          </div>
        </div>
      </section>

      {/* Visita */}
      <section id="visita" className="border-t border-white/10 bg-[#28221c] py-16 text-[#f5e9d5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d97706]">{c.visitEyebrow}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{c.visitTitle}</h2>
              <p className="mt-4 max-w-lg text-[#f5e9d5]/70">{c.visitLead}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {c.spaces.map((f) => (
                  <div key={f.l} className="rounded-2xl border border-white/10 bg-white/3 p-4">
                    <div style={{ fontFamily: 'var(--font-instrument-serif)' }} className="text-2xl italic text-[#f5e9d5]">
                      {f.l}
                    </div>
                    <div className="mt-1 text-xs text-[#f5e9d5]/60">{f.s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white/3 p-6 text-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/60">{c.address}</div>
              <div className="mt-2 text-[#f5e9d5]">Rua Voluntários da Pátria, 42</div>
              <div className="text-[#f5e9d5]/70">Botafogo · Rio de Janeiro</div>
              <div className="mt-4 flex flex-col gap-1 text-[#f5e9d5]/70">
                {c.schedule.map((s) => (
                  <div key={s.days}><span className="text-[#d97706]">{s.days}</span> · {s.hours}</div>
                ))}
                <div className="text-[#f5e9d5]/60">{c.closed}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="border-t border-white/10 bg-[#1c1917] py-8 text-center text-xs text-[#f5e9d5]/50"
        suppressHydrationWarning
      >
        © {new Date().getFullYear()} Terra Casa de Fogo · {c.demoBy}
      </footer>
    </DemoFrame>
  );
}
