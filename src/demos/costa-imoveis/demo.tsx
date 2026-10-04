'use client';

import { useMemo, useState } from 'react';
import { Bath, BedDouble, ChevronLeft, ChevronRight, Heart, Home as HomeIcon, MapPin, Maximize, MessageCircle, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, imoveisProperties, imoveisGallery } from '@/lib/demo-images';
import { useI18n } from '@/i18n/provider';
import { content } from './content';

type PropertyType = 'Apartamento' | 'Cobertura' | 'Casa' | 'Loft';
type PropertyId = keyof typeof imoveisProperties;
type Property = {
  id: PropertyId;
  neighborhood: string;
  type: PropertyType;
  price: number;
  rooms: number;
  baths: number;
  area: number;
  photo: string;
  isNew?: boolean;
  isExclusive?: boolean;
};

const properties: Property[] = [
  { id: 'i1', neighborhood: 'Ipanema', type: 'Cobertura', price: 5900000, rooms: 4, baths: 4, area: 320, photo: imoveisProperties.i1, isExclusive: true },
  { id: 'i2', neighborhood: 'Copacabana', type: 'Apartamento', price: 1890000, rooms: 3, baths: 2, area: 118, photo: imoveisProperties.i2 },
  { id: 'i3', neighborhood: 'Botafogo', type: 'Loft', price: 990000, rooms: 1, baths: 1, area: 68, photo: imoveisProperties.i3, isNew: true },
  { id: 'i4', neighborhood: 'Barra da Tijuca', type: 'Casa', price: 3200000, rooms: 4, baths: 5, area: 380, photo: imoveisProperties.i4 },
  { id: 'i5', neighborhood: 'Leblon', type: 'Apartamento', price: 4200000, rooms: 3, baths: 3, area: 145, photo: imoveisProperties.i5, isExclusive: true },
  { id: 'i6', neighborhood: 'Botafogo', type: 'Cobertura', price: 2790000, rooms: 3, baths: 3, area: 180, photo: imoveisProperties.i6 },
  { id: 'i7', neighborhood: 'Copacabana', type: 'Apartamento', price: 690000, rooms: 1, baths: 1, area: 42, photo: imoveisProperties.i7, isNew: true },
  { id: 'i8', neighborhood: 'Laranjeiras', type: 'Casa', price: 1750000, rooms: 3, baths: 2, area: 210, photo: imoveisProperties.i8 },
  { id: 'i9', neighborhood: 'Ipanema', type: 'Apartamento', price: 2450000, rooms: 2, baths: 2, area: 96, photo: imoveisProperties.i9 },
  { id: 'i10', neighborhood: 'Botafogo', type: 'Loft', price: 850000, rooms: 1, baths: 1, area: 55, photo: imoveisProperties.i10 },
];

function ArchSilhouette({ type, color = 'currentColor' }: { type: PropertyType; color?: string }) {
  const common = { stroke: color, strokeWidth: 1.2, fill: 'none', strokeLinejoin: 'round' as const };
  switch (type) {
    case 'Cobertura':
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full opacity-25" aria-hidden>
          <path {...common} d="M20 130 L20 60 L180 60 L180 130 Z" />
          <path {...common} d="M20 60 L100 30 L180 60" />
          <rect {...common} x="40" y="80" width="24" height="30" />
          <rect {...common} x="72" y="80" width="24" height="30" />
          <rect {...common} x="104" y="80" width="24" height="30" />
          <rect {...common} x="136" y="80" width="24" height="30" />
          <path {...common} d="M60 20 L60 30" />
          <circle {...common} cx="140" cy="18" r="4" />
        </svg>
      );
    case 'Casa':
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full opacity-25" aria-hidden>
          <path {...common} d="M100 20 L20 80 L20 130 L180 130 L180 80 Z" />
          <rect {...common} x="80" y="90" width="40" height="40" />
          <rect {...common} x="40" y="90" width="20" height="20" />
          <rect {...common} x="140" y="90" width="20" height="20" />
        </svg>
      );
    case 'Loft':
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full opacity-25" aria-hidden>
          <rect {...common} x="20" y="30" width="160" height="100" />
          <path {...common} d="M20 80 L180 80" />
          <path {...common} d="M50 30 L50 80" />
          <path {...common} d="M100 30 L100 130" />
          <path {...common} d="M150 30 L150 80" />
          <rect {...common} x="60" y="95" width="30" height="35" />
        </svg>
      );
    case 'Apartamento':
    default:
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full opacity-25" aria-hidden>
          <rect {...common} x="30" y="20" width="140" height="110" />
          <path {...common} d="M100 20 L100 130" />
          <path {...common} d="M30 55 L170 55" />
          <path {...common} d="M30 90 L170 90" />
          <rect {...common} x="45" y="65" width="18" height="18" />
          <rect {...common} x="75" y="65" width="18" height="18" />
          <rect {...common} x="107" y="65" width="18" height="18" />
          <rect {...common} x="137" y="65" width="18" height="18" />
        </svg>
      );
  }
}

const neighborhoods = ['Todos', 'Ipanema', 'Leblon', 'Copacabana', 'Botafogo', 'Laranjeiras', 'Barra da Tijuca'] as const;
const types = ['Todos', 'Apartamento', 'Cobertura', 'Casa', 'Loft'] as const;

const priceRanges = [
  { min: 0, max: Infinity },
  { min: 0, max: 1_000_000 },
  { min: 1_000_000, max: 2_000_000 },
  { min: 2_000_000, max: 4_000_000 },
  { min: 4_000_000, max: Infinity },
];

// Hero (LCP): 1920px original plus a 768px variant for phones.
const heroSrc = heros['costa-imoveis'];
const heroSrcSmall = '/heros/costa-imoveis-768.webp';
// Rendered width: full section width below lg (frame + section gutters), 5/12 columns from lg, capped at 441px.
const heroSizes =
  '(min-width: 1202px) 441px, (min-width: 1024px) calc(41.67vw - 60px), (min-width: 640px) calc(100vw - 98px), calc(100vw - 58px)';

export default function CostaImoveisDemo() {
  const { locale, money } = useI18n();
  const c = content[locale];
  const nameOf = (p: Property) => c.properties[p.id];
  const price = (v: number) => money(v, { decimals: 0 });
  const compact = (v: number) => money(v, { compact: true });
  const rangeLabel = (i: number) => {
    const r = priceRanges[i];
    if (i === 0) return c.anyPrice;
    if (r.min === 0) return c.upTo(compact(r.max));
    if (r.max === Infinity) return c.above(compact(r.min));
    return `${compact(r.min)}–${compact(r.max)}`;
  };

  const [q, setQ] = useState('');
  const [nb, setNb] = useState<(typeof neighborhoods)[number]>('Todos');
  const [tp, setTp] = useState<(typeof types)[number]>('Todos');
  const [priceIdx, setPriceIdx] = useState(0);
  const [rooms, setRooms] = useState<number | null>(null);
  const [sort, setSort] = useState<'novos' | 'menor' | 'maior'>('novos');
  const [wish, setWish] = useState<Record<string, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [detail, setDetail] = useState<Property | null>(null);
  const [gIdx, setGIdx] = useState(0);

  const filtered = useMemo(() => {
    const r = priceRanges[priceIdx];
    const query = q.toLowerCase();
    return properties
      .filter((p) => {
        const qOk = !q || c.properties[p.id].toLowerCase().includes(query) || p.neighborhood.toLowerCase().includes(query);
        const nOk = nb === 'Todos' || p.neighborhood === nb;
        const tOk = tp === 'Todos' || p.type === tp;
        const pOk = p.price >= r.min && p.price <= r.max;
        const roomsOk = rooms === null || p.rooms >= rooms;
        return qOk && nOk && tOk && pOk && roomsOk;
      })
      .sort((a, b) => {
        if (sort === 'menor') return a.price - b.price;
        if (sort === 'maior') return b.price - a.price;
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      });
  }, [q, nb, tp, priceIdx, rooms, sort, c]);

  const clearAll = () => {
    setQ('');
    setNb('Todos');
    setTp('Todos');
    setPriceIdx(0);
    setRooms(null);
    setSort('novos');
  };

  const activeCount =
    (q ? 1 : 0) + (nb !== 'Todos' ? 1 : 0) + (tp !== 'Todos' ? 1 : 0) + (priceIdx !== 0 ? 1 : 0) + (rooms !== null ? 1 : 0);

  return (
    <DemoFrame siteName="Costa Imóveis" bg="#fafaf9">
      {/* Every top-level block sets text-neutral-900 so nothing (the search field included) inherits the studio's near-white text. */}
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 text-neutral-900 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-neutral-900 text-[#c6ff3b]">
              <HomeIcon className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="font-display text-base font-semibold text-neutral-900">Costa</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">{c.tagline}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="hidden rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 sm:inline-flex">
              {c.imBroker}
            </a>
            <a
              href="#buscar"
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
            >
              {c.search}
            </a>
          </div>
        </div>
      </header>

      {/* Hero (scheme-light: the studio sets color-scheme dark, which would darken the native select popups) */}
      <section className="border-b border-neutral-200 bg-white text-neutral-900 scheme-light">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                Ipanema · Leblon · Botafogo · Barra
              </div>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] text-neutral-900 sm:text-5xl lg:text-6xl">
                {c.heroTitleA}{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                  {c.heroTitleEm}
                </em>
                {c.heroTitleB}
              </h1>
              <p className="mt-5 max-w-xl text-base text-neutral-600 sm:text-lg">{c.heroLead}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-neutral-100">
                <img
                  src={heroSrc}
                  srcSet={`${heroSrcSmall} 768w, ${heroSrc} 1920w`}
                  sizes={heroSizes}
                  alt={c.heroAlt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div id="buscar" className="mt-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-2 sm:p-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3">
                <Search className="h-4 w-4 text-neutral-500" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={c.searchPlaceholder}
                  className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-hidden"
                />
                {q && (
                  <button onClick={() => setQ('')} aria-label={c.clear} className="text-neutral-500 hover:text-neutral-700">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-900 sm:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {c.filters} {activeCount > 0 && <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] text-white">{activeCount}</span>}
              </button>
            </div>

            <div className={'mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 ' + (showFilters ? '' : 'hidden sm:grid')}>
              <select
                value={nb}
                onChange={(e) => setNb(e.target.value as (typeof neighborhoods)[number])}
                aria-label={c.neighborhoodLabel}
                className="rounded-2xl border-0 bg-white px-4 py-3 text-sm font-medium text-neutral-900 focus:outline-hidden"
              >
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>{n === 'Todos' ? c.allNeighborhoods : n}</option>
                ))}
              </select>
              <select
                value={tp}
                onChange={(e) => setTp(e.target.value as (typeof types)[number])}
                aria-label={c.typeLabel}
                className="rounded-2xl border-0 bg-white px-4 py-3 text-sm font-medium text-neutral-900 focus:outline-hidden"
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t === 'Todos' ? c.allTypes : c.types[t]}</option>
                ))}
              </select>
              <select
                value={priceIdx}
                onChange={(e) => setPriceIdx(Number(e.target.value))}
                aria-label={c.priceLabel}
                className="rounded-2xl border-0 bg-white px-4 py-3 text-sm font-medium text-neutral-900 focus:outline-hidden"
              >
                {priceRanges.map((_, i) => (
                  <option key={i} value={i}>{rangeLabel(i)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results header */}
      <section className="border-b border-neutral-200 bg-white text-neutral-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-neutral-900">{c.count(filtered.length)}</div>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-xs text-neutral-500 underline hover:text-neutral-900">
                {c.clearFilters}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1">
              {(['novos', 'menor', 'maior'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors ' +
                    (sort === s ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:text-neutral-900')
                  }
                >
                  {c.sort[s]}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-4 sm:px-6">
          {([null, 1, 2, 3, 4] as (number | null)[]).map((n) => (
            <button
              key={String(n)}
              onClick={() => setRooms(n)}
              className={
                'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ' +
                (rooms === n ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400')
              }
            >
              {n === null ? c.anyRooms : c.roomsPlus(n)}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-neutral-900 sm:px-6">
        {/* Keeps the outline H1 > H2 > H3 (card titles) without a visible heading. */}
        <h2 className="sr-only">{c.listingsHeading}</h2>
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-16 text-center">
            <div className="text-neutral-500">{c.empty}</div>
            <button
              onClick={clearAll}
              className="mt-4 rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white"
            >
              {c.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow duration-500 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)]">
                <button
                  onClick={() => {
                    setDetail(p);
                    setGIdx(0);
                  }}
                  className="relative block aspect-4/3 w-full overflow-hidden bg-neutral-100"
                >
                  {/* Named by its content, so the visible neighborhood and badge are part of the accessible name. */}
                  <span className="sr-only">{c.see(nameOf(p))}</span>
                  <img
                    src={p.photo}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />
                  <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    {p.neighborhood}
                  </span>
                  {p.isExclusive && (
                    <span className="absolute left-3 top-3 rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c6ff3b]">
                      {c.exclusive}
                    </span>
                  )}
                  {p.isNew && !p.isExclusive && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#c6ff3b] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-900">
                      {c.isNew}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setWish((w) => ({ ...w, [p.id]: !w[p.id] }))}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white/90 backdrop-blur-sm transition-colors hover:bg-white"
                  aria-label={wish[p.id] ? c.removeWish : c.addWish}
                >
                  <Heart className={'h-4 w-4 ' + (wish[p.id] ? 'fill-red-500 text-red-500' : 'text-neutral-600')} />
                </button>

                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{p.neighborhood}</span>
                    <span>·</span>
                    <span>{c.types[p.type]}</span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold text-neutral-900">
                    {nameOf(p)}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 border-y border-neutral-100 py-3 text-xs text-neutral-700">
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="h-3.5 w-3.5" /> {p.rooms}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" /> {p.baths}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Maximize className="h-3.5 w-3.5" /> {p.area} m²
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-display text-xl font-semibold text-neutral-900">
                      {price(p.price)}
                    </div>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center gap-1 rounded-full bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#0e7064] hover:bg-[#25D366]/20"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> {c.talk}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Trust strip */}
      <section className="bg-white py-8 text-neutral-900">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6">
          {c.trust.map((item) => (
            <TrustItem key={item.label} kpi={item.kpi} label={item.label} />
          ))}
        </div>
      </section>

      {/* Property detail modal */}
      {detail && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4 text-neutral-900"
          role="dialog"
          aria-modal="true"
          aria-labelledby="costa-detail-title"
        >
          <button className="absolute inset-0 bg-black/70" onClick={() => setDetail(null)} aria-label={c.close} />
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => setDetail(null)}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-neutral-700"
              aria-label={c.close}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Gallery placeholder */}
            <div className="relative aspect-video overflow-hidden bg-neutral-100">
              <img
                key={gIdx}
                src={imoveisGallery[gIdx]}
                alt={c.photoAlt(gIdx + 1, nameOf(detail))}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                {c.photoCounter(gIdx + 1, imoveisGallery.length)}
              </div>
              <button
                onClick={() => setGIdx((i) => (i > 0 ? i - 1 : imoveisGallery.length - 1))}
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-neutral-700"
                aria-label={c.prevPhoto}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setGIdx((i) => (i < imoveisGallery.length - 1 ? i + 1 : 0))}
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-neutral-700"
                aria-label={c.nextPhoto}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin className="h-3.5 w-3.5" /> {detail.neighborhood} · {c.types[detail.type]}
                  </div>
                  <h3 id="costa-detail-title" className="mt-2 font-display text-2xl font-semibold text-neutral-900">
                    {nameOf(detail)}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> {c.curated}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-semibold text-neutral-900">
                    {price(detail.price)}
                  </div>
                  <div className="text-xs text-neutral-500">{c.feesNote}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Feature icon={<BedDouble className="h-4 w-4" />} label={c.rooms(detail.rooms)} />
                <Feature icon={<Bath className="h-4 w-4" />} label={c.baths(detail.baths)} />
                <Feature icon={<Maximize className="h-4 w-4" />} label={`${detail.area} m²`} />
              </div>

              <p className="mt-6 text-sm leading-relaxed text-neutral-600">{c.description}</p>

              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#178540] px-5 py-3 text-sm font-semibold text-white"
                >
                  <MessageCircle className="h-4 w-4" /> {c.talkToAgent}
                </a>
                <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900">
                  {c.scheduleVisit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500" suppressHydrationWarning>
        © {new Date().getFullYear()} Costa Imóveis · {c.demoBy}
      </footer>
    </DemoFrame>
  );
}

function TrustItem({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">{kpi}</div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-900">
      <div className="text-neutral-500">{icon}</div>
      <div className="mt-2 font-medium">{label}</div>
    </div>
  );
}
