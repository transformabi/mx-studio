'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Clock, Flame, MapPin, Phone, Utensils, Users, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, restauranteDishes } from '@/lib/demo-images';

type Category = 'Couvert' | 'Entradas' | 'Principais' | 'Sobremesas' | 'Bebidas';

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  tags?: ('Vegano' | 'Vegetariano' | 'Sem glúten' | 'Chef')[];
};

const dishes: Dish[] = [
  { id: 'c1', name: 'Pães do dia', description: 'Fermentação natural, manteiga de fogo e sal de flor.', price: 28, category: 'Couvert' },
  { id: 'c2', name: 'Azeitonas assadas', description: 'Azeitonas curadas em casa, ervas do quintal.', price: 22, category: 'Couvert', tags: ['Vegano'] },
  { id: 'e1', name: 'Carpaccio de tomate defumado', description: 'Tomate assado à brasa, ricota fresca, azeite verde.', price: 62, category: 'Entradas', tags: ['Vegetariano', 'Chef'] },
  { id: 'e2', name: 'Tartar de carne', description: 'Contrafilé cortado à faca, gema curada, pão de fermentação.', price: 78, category: 'Entradas' },
  { id: 'e3', name: 'Alcachofra de fogo', description: 'Alcachofra cozida no fogo, aioli defumado.', price: 68, category: 'Entradas', tags: ['Vegetariano'] },
  { id: 'p1', name: 'Bife de fogo alto', description: 'Ancho maturado 45 dias, brasa direta, farofa de tutano.', price: 168, category: 'Principais', tags: ['Chef'] },
  { id: 'p2', name: 'Peixe do dia à brasa', description: 'Peixe fresco do dia, molho de manteiga queimada.', price: 148, category: 'Principais' },
  { id: 'p3', name: 'Cordeiro de barro', description: 'Cordeiro assado 8h em forno de barro, purê de abóbora queimada.', price: 178, category: 'Principais' },
  { id: 'p4', name: 'Risoto de cogumelos silvestres', description: 'Arroz carnaroli, cogumelos assados, queijo curado.', price: 128, category: 'Principais', tags: ['Vegetariano'] },
  { id: 's1', name: 'Sorvete de leite queimado', description: 'Nossa receita clássica com caramelo de fogo.', price: 42, category: 'Sobremesas' },
  { id: 's2', name: 'Torta de banana caramelizada', description: 'Massa folhada, banana no forno, chantilly baunilha.', price: 46, category: 'Sobremesas' },
  { id: 'b1', name: 'Vinho da casa · taça', description: 'Tempranillo espanhol, seleção do sommelier.', price: 38, category: 'Bebidas' },
  { id: 'b2', name: 'Coquetel Terra', description: 'Cachaça envelhecida, mel de flor de laranjeira, alecrim.', price: 42, category: 'Bebidas', tags: ['Chef'] },
  { id: 'b3', name: 'Água mineral', description: 'Com ou sem gás, servida em taça.', price: 12, category: 'Bebidas' },
];

const dishPhotoByCategory: Record<Category, string> = {
  Couvert: restauranteDishes.couvert,
  Entradas: restauranteDishes.entrada,
  Principais: restauranteDishes.principal,
  Sobremesas: restauranteDishes.sobremesa,
  Bebidas: restauranteDishes.bebida,
};

const categories: Category[] = ['Couvert', 'Entradas', 'Principais', 'Sobremesas', 'Bebidas'];

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

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

const dayLabel = (d: Date) =>
  d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).replace('.', '');

const isoKey = (d: Date) => d.toISOString().split('T')[0];

export default function RestauranteTerraDemo() {
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
  const [reserved, setReserved] = useState<null | { name: string; date: string; time: string; people: number }>(null);
  const [visibleFrom, setVisibleFrom] = useState(0);

  const filteredDishes = useMemo(() => dishes.filter((d) => d.category === category), [category]);

  const selectedDate = days[dateIdx];
  const dateKey = isoKey(selectedDate);
  const period: 'Almoço' | 'Jantar' =
    selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5 ? 'Jantar' : 'Almoço';
  const times = period === 'Almoço' ? [...timesLunch, ...timesDinner] : timesDinner;

  const submit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Diga seu nome pra reservar.';
    if (!phone.match(/\d{8,}/)) e.phone = 'Telefone com DDD.';
    if (!time) e.time = 'Escolha um horário disponível.';
    setErrors(e);
    if (Object.keys(e).length) return;
    setConfirming(true);
  };

  const finalize = () => {
    setReserved({
      name,
      date: selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }),
      time: time!,
      people,
    });
    setConfirming(false);
  };

  const visibleDays = days.slice(visibleFrom, visibleFrom + 7);

  return (
    <DemoFrame siteName="Terra Casa de Fogo" bg="#1c1917">
      {/* Store header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1c1917]/85 text-[#f5e9d5] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#d97706] text-white">
              <Flame className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="font-display text-base font-semibold">Terra</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#f5e9d5]/60">Casa de fogo</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#menu" className="rounded-full px-3 py-1.5 text-sm text-[#f5e9d5]/80 hover:bg-white/5 hover:text-[#f5e9d5]">
              Menu
            </a>
            <a href="#reserva" className="rounded-full px-3 py-1.5 text-sm text-[#f5e9d5]/80 hover:bg-white/5 hover:text-[#f5e9d5]">
              Reserva
            </a>
            <a href="#visita" className="rounded-full px-3 py-1.5 text-sm text-[#f5e9d5]/80 hover:bg-white/5 hover:text-[#f5e9d5]">
              Visita
            </a>
          </nav>
          <a
            href="#reserva"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#d97706] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Reservar
            <Utensils className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heros['restaurante-terra']}
            alt="Terra Casa de Fogo — brasa"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/40 via-[#1c1917]/60 to-[#1c1917]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(217,119,6,0.35),transparent)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-[#f5e9d5] sm:px-6 sm:py-32">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#f5e9d5]/70">
            <Flame className="h-3 w-3 text-[#d97706]" />
            Casa de fogo · Botafogo, Rio de Janeiro
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Ingredientes,{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal text-[#f5e9d5]">
              fogo
            </em>{' '}
            e tempo.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-[#f5e9d5]/80">
            Alta gastronomia em torno da brasa. Menu autoral do chef Rafael
            Menezes, mudando com o que a estação oferece.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#reserva"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#d97706] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Reservar mesa
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#f5e9d5]/30 px-5 py-3 text-sm font-semibold text-[#f5e9d5] transition-colors hover:bg-white/5"
            >
              Ver o menu
            </a>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-[#f5e9d5]/15 pt-8 sm:grid-cols-4">
            <div>
              <div className="font-display text-3xl font-semibold">Ter–Dom</div>
              <div className="mt-1 text-xs text-[#f5e9d5]/60">Almoço e jantar</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold">4.9 ★</div>
              <div className="mt-1 text-xs text-[#f5e9d5]/60">Google Business</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold">42 lug.</div>
              <div className="mt-1 text-xs text-[#f5e9d5]/60">Salão + varanda</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold">Sim</div>
              <div className="mt-1 text-xs text-[#f5e9d5]/60">Aceitamos eventos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="border-t border-white/10 bg-[#28221c] py-16 text-[#f5e9d5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d97706]">Menu</div>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                O que a{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                  brasa
                </em>{' '}
                oferece hoje.
              </h2>
            </div>
            <div className="text-xs text-[#f5e9d5]/60">
              Menu atualizado semanalmente pelo chef
            </div>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto border-b border-white/10 pb-3" role="tablist" aria-label="Categorias do menu">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={
                  'shrink-0 border-b-2 px-4 pb-3 text-sm font-medium transition-colors ' +
                  (category === c
                    ? 'border-[#d97706] text-[#f5e9d5]'
                    : 'border-transparent text-[#f5e9d5]/50 hover:text-[#f5e9d5]')
                }
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="mt-8 divide-y divide-white/10" role="tabpanel">
            {filteredDishes.map((d) => (
              <li key={d.id} className="flex items-start gap-6 py-5">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-white/5">
                  <img
                    src={dishPhotoByCategory[d.category]}
                    alt={d.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-[#f5e9d5]">{d.name}</h3>
                    {d.tags?.includes('Chef') && (
                      <span className="rounded-full bg-[#d97706]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#d97706]">
                        Do chef
                      </span>
                    )}
                    {d.tags?.includes('Vegano') && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                        Vegano
                      </span>
                    )}
                    {d.tags?.includes('Vegetariano') && !d.tags?.includes('Vegano') && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                        Vegetariano
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-[#f5e9d5]/70">{d.description}</p>
                </div>
                <div className="shrink-0 text-right font-mono text-sm text-[#f5e9d5]">{brl(d.price)}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reserva */}
      <section id="reserva" className="border-t border-white/10 bg-[#1c1917] py-16 text-[#f5e9d5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d97706]">Reserva</div>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                Sua mesa,{' '}
                <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
                  do jeito
                </em>{' '}
                que você quiser.
              </h2>
              <p className="mt-4 text-[#f5e9d5]/70">
                Reservamos até 20 pessoas. Grupos maiores: nos escreva pelo
                WhatsApp. Cancelamento gratuito até 4 horas antes.
              </p>

              <div className="mt-8 space-y-3 text-sm text-[#f5e9d5]/70">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#d97706]" /> Rua Voluntários da Pátria, 42 · Botafogo
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#d97706]" /> (21) 3232-9090
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[#d97706]" /> Ter a Sex: 19h–23h · Sáb e Dom: 12h–15h e 19h–23h
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {reserved ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#d97706] text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-center">
                    Mesa reservada!
                  </h3>
                  <p className="mt-2 text-center text-[#f5e9d5]/70">
                    Obrigado, {reserved.name.split(' ')[0]}. Sua mesa está confirmada.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-white/[0.03] p-4 text-center">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">Data</div>
                      <div className="mt-1 text-sm font-semibold">{reserved.date}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">Horário</div>
                      <div className="mt-1 text-sm font-semibold">{reserved.time}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">Pessoas</div>
                      <div className="mt-1 text-sm font-semibold">{reserved.people}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-xs text-[#f5e9d5]/50">
                    Vamos confirmar por WhatsApp em até 10 min. Este é um demo, nenhuma mesa foi realmente reservada.
                  </p>
                  <button
                    onClick={() => setReserved(null)}
                    className="mt-6 w-full rounded-full border border-white/15 py-3 text-sm font-semibold text-[#f5e9d5] hover:bg-white/5"
                  >
                    Nova reserva
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/50">
                      1 · Data
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setVisibleFrom((v) => Math.max(0, v - 7))}
                        disabled={visibleFrom === 0}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-[#f5e9d5] disabled:opacity-30"
                        aria-label="Semana anterior"
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
                                  ? 'border-[#d97706] bg-[#d97706] text-white'
                                  : 'border-white/15 bg-white/[0.02] text-[#f5e9d5]/80 hover:border-white/30')
                              }
                            >
                              <span className="text-[10px] uppercase tracking-[0.12em]">
                                {dayLabel(d).split(' ')[0]}
                              </span>
                              <span className="mt-1 font-display text-lg font-semibold">
                                {d.getDate()}
                              </span>
                              <span className="text-[10px]">
                                {d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setVisibleFrom((v) => Math.min(days.length - 7, v + 7))}
                        disabled={visibleFrom + 7 >= days.length}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-[#f5e9d5] disabled:opacity-30"
                        aria-label="Próxima semana"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/50">
                        2 · Horário · {period}
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
                                ? 'cursor-not-allowed border-white/5 bg-white/[0.02] text-[#f5e9d5]/25 line-through'
                                : selected
                                ? 'border-[#d97706] bg-[#d97706] text-white'
                                : 'border-white/15 bg-white/[0.02] text-[#f5e9d5]/80 hover:border-white/30')
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/50">
                      3 · Pessoas
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setPeople((p) => Math.max(1, p - 1))}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#f5e9d5]"
                        aria-label="Menos"
                      >
                        −
                      </button>
                      <div className="w-24 text-center">
                        <div className="font-display text-2xl font-semibold">{people}</div>
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[#f5e9d5]/50">
                          {people === 1 ? 'pessoa' : 'pessoas'}
                        </div>
                      </div>
                      <button
                        onClick={() => setPeople((p) => Math.min(20, p + 1))}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#f5e9d5]"
                        aria-label="Mais"
                      >
                        +
                      </button>
                      <div className="ml-4 text-xs text-[#f5e9d5]/50">
                        <Users className="mr-1 inline h-3.5 w-3.5" /> Máx. 20. Grupo maior? Chame no WhatsApp.
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="rname" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/50">
                        Nome
                      </label>
                      <input
                        id="rname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-[#f5e9d5] placeholder:text-[#f5e9d5]/40 focus:border-[#d97706] focus:outline-none"
                      />
                      {errors.name && <div className="mt-1 text-xs text-red-400">{errors.name}</div>}
                    </div>
                    <div>
                      <label htmlFor="rphone" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/50">
                        WhatsApp
                      </label>
                      <input
                        id="rphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(21) 99999-9999"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-[#f5e9d5] placeholder:text-[#f5e9d5]/40 focus:border-[#d97706] focus:outline-none"
                      />
                      {errors.phone && <div className="mt-1 text-xs text-red-400">{errors.phone}</div>}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="rnote" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/50">
                      Observação (opcional)
                    </label>
                    <textarea
                      id="rnote"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Alergias, aniversário, mesa da varanda…"
                      rows={2}
                      className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-[#f5e9d5] placeholder:text-[#f5e9d5]/40 focus:border-[#d97706] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={submit}
                    className="mt-6 w-full rounded-full bg-[#d97706] py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Confirmar reserva
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONFIRM MODAL */}
      {confirming && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/70" onClick={() => setConfirming(false)} aria-label="Fechar" />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#1c1917] text-[#f5e9d5] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="font-display text-lg font-semibold">Confere sua reserva</div>
              <button
                onClick={() => setConfirming(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#f5e9d5]/60 hover:bg-white/5"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-3 gap-4 rounded-2xl bg-white/[0.03] p-4 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">Data</div>
                  <div className="mt-1 text-sm font-semibold">
                    {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">Horário</div>
                  <div className="mt-1 text-sm font-semibold">{time}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5e9d5]/60">Pessoas</div>
                  <div className="mt-1 text-sm font-semibold">{people}</div>
                </div>
              </div>
              <div className="mt-4 space-y-1.5 text-sm text-[#f5e9d5]/70">
                <div><span className="text-[#f5e9d5]/50">Nome: </span>{name}</div>
                <div><span className="text-[#f5e9d5]/50">WhatsApp: </span>{phone}</div>
                {note && <div><span className="text-[#f5e9d5]/50">Obs: </span>{note}</div>}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 rounded-full border border-white/15 py-3 text-sm font-semibold text-[#f5e9d5]"
                >
                  Alterar
                </button>
                <button
                  onClick={finalize}
                  className="flex-1 rounded-full bg-[#d97706] py-3 text-sm font-semibold text-white"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filosofia */}
      <section className="border-t border-white/10 bg-[#1c1917] py-16 text-[#f5e9d5]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d97706]">Filosofia</div>
          <h2 style={{ fontFamily: 'var(--font-instrument-serif)' }} className="mt-4 text-4xl italic leading-[1.05] sm:text-6xl">
            "cozinhamos com o que a<br/>estação nos entrega,<br/>e com fogo."
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
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d97706]">Visite</div>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                A casa fica em Botafogo, num casarão de 1928.
              </h2>
              <p className="mt-4 max-w-lg text-[#f5e9d5]/70">
                Salão principal, varanda coberta e mesa do chef pra 8 pessoas. Estacionamento com valet.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { l: 'Salão', s: '32 lugares' },
                  { l: 'Varanda', s: '10 lugares' },
                  { l: 'Mesa do chef', s: '8 lugares' },
                  { l: 'Valet', s: 'incluso' },
                ].map((f) => (
                  <div key={f.l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div style={{ fontFamily: 'var(--font-instrument-serif)' }} className="text-2xl italic text-[#f5e9d5]">
                      {f.l}
                    </div>
                    <div className="mt-1 text-xs text-[#f5e9d5]/60">{f.s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white/[0.03] p-6 text-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5e9d5]/50">Endereço</div>
              <div className="mt-2 text-[#f5e9d5]">Rua Voluntários da Pátria, 42</div>
              <div className="text-[#f5e9d5]/70">Botafogo · Rio de Janeiro</div>
              <div className="mt-4 flex flex-col gap-1 text-[#f5e9d5]/70">
                <div><span className="text-[#d97706]">Ter–Sex</span> · 19h às 23h</div>
                <div><span className="text-[#d97706]">Sáb e Dom</span> · 12h–15h e 19h–23h</div>
                <div className="text-[#f5e9d5]/50">Segunda: fechados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#1c1917] py-8 text-center text-xs text-[#f5e9d5]/50">
        © 2025 Terra Casa de Fogo · Demo por Max Costa · Estúdio
      </footer>
    </DemoFrame>
  );
}
