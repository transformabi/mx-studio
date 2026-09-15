'use client';

import { useMemo, useState } from 'react';
import { Check, Heart, Instagram, Minus, Plus, Search, ShoppingBag, Sparkles, Star, Trash2, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, modaArteProducts } from '@/lib/demo-images';
import { useI18n } from '@/i18n/provider';
import { content } from './content';

type Category = 'Todos' | 'Vestidos' | 'Blusas' | 'Calças' | 'Acessórios';
type ProductId = keyof typeof modaArteProducts;
type Product = {
  id: ProductId;
  category: Exclude<Category, 'Todos'>;
  price: number;
  isNew?: boolean;
};

const products: Product[] = [
  { id: 'v1', category: 'Vestidos', price: 489, isNew: true },
  { id: 'v2', category: 'Vestidos', price: 649 },
  { id: 'v3', category: 'Vestidos', price: 419 },
  { id: 'b1', category: 'Blusas', price: 289, isNew: true },
  { id: 'b2', category: 'Blusas', price: 249 },
  { id: 'b3', category: 'Blusas', price: 329 },
  { id: 'c1', category: 'Calças', price: 449 },
  { id: 'c2', category: 'Calças', price: 519, isNew: true },
  { id: 'a1', category: 'Acessórios', price: 359 },
  { id: 'a2', category: 'Acessórios', price: 189 },
  { id: 'a3', category: 'Acessórios', price: 219 },
  { id: 'a4', category: 'Acessórios', price: 179 },
];

const categories: Category[] = ['Todos', 'Vestidos', 'Blusas', 'Calças', 'Acessórios'];

const trustIcons = ['🚚', '↩︎', '💳', '✿'];

type CartItem = { product: Product; qty: number };

export default function ModaArteDemo() {
  const { locale, money } = useI18n();
  const c = content[locale];
  const price = (v: number) => money(v);
  const roundPrice = (v: number) => money(v, { decimals: 0, round: true });
  const nameOf = (p: Product) => c.products[p.id];

  const [category, setCategory] = useState<Category>('Todos');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<0 | 1 | 2 | 3>(0);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState<null | { code: string; discount: number }>(null);
  const [wish, setWish] = useState<Record<string, boolean>>({});
  const [detail, setDetail] = useState<Product | null>(null);
  const [address, setAddress] = useState({ cep: '', street: '', city: '', payment: 'pix' as 'pix' | 'card' });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catOk = category === 'Todos' || p.category === category;
      const q = search.trim().toLowerCase();
      const sOk = !q || c.products[p.id].toLowerCase().includes(q);
      return catOk && sOk;
    });
  }, [category, search, c]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const remove = (id: string) => setCart((prev) => prev.filter((item) => item.product.id !== id));

  const subtotal = cart.reduce((s, item) => s + item.product.price * item.qty, 0);
  const discount = couponApplied ? subtotal * couponApplied.discount : 0;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 29.9;
  const total = subtotal - discount + shipping;
  const itemsCount = cart.reduce((s, item) => s + item.qty, 0);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === 'MAX10') {
      setCouponApplied({ code, discount: 0.1 });
    } else {
      setCouponApplied({ code: '__invalid__', discount: 0 });
    }
  };

  const goCheckout = () => {
    setCheckoutStep(1);
  };

  const closeCheckout = () => {
    setCheckoutStep(0);
  };

  const finishCheckout = () => {
    setCheckoutStep(3);
    setTimeout(() => {
      setCart([]);
      setCouponApplied(null);
    }, 200);
  };

  return (
    <DemoFrame siteName="Moda & Arte" bg="#faf6f0">
      {/* Store header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-[#faf6f0]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-neutral-900 text-[#c6ff3b] font-display text-sm font-black">
              M
            </span>
            <div className="leading-none">
              <div className="font-display text-base font-semibold text-neutral-900">Moda & Arte</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">{c.collection}</div>
            </div>
          </div>
          <div className="hidden flex-1 items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 sm:flex sm:max-w-md">
            <Search className="h-4 w-4 text-neutral-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={c.searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              aria-label={c.searchAria}
            />
            {search && (
              <button onClick={() => setSearch('')} aria-label={c.clear} className="text-neutral-400 hover:text-neutral-700">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            aria-label={c.openCart(itemsCount)}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">{c.cart}</span>
            {itemsCount > 0 && (
              <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#c6ff3b] px-1 text-[11px] font-bold text-neutral-900">
                {itemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
            <Sparkles className="h-3 w-3" />
            {c.collection}
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-neutral-900 sm:text-5xl lg:text-6xl">
            {c.heroTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              {c.heroTitleEm}
            </em>
            .
          </h1>
          <p className="mt-6 max-w-lg text-base text-neutral-600 sm:text-lg">{c.heroLead(roundPrice)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {c.seeCollection}
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100">
              <Instagram className="h-4 w-4" /> @modaearte
            </button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <img
              src={heros['moda-arte']}
              alt={c.heroAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/10" />
            <div className="absolute right-5 top-5 rounded-full bg-neutral-900/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c6ff3b] backdrop-blur">
              {c.newCollection}
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-[10px] uppercase tracking-[0.16em] opacity-70">{c.editorial}</div>
              <div
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
                className="mt-1 text-4xl italic leading-none"
              >
                {c.editorialLine}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="grid" className="border-y border-neutral-200 bg-white/50">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-4 py-4 sm:px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={
                'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                (category === cat
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500')
              }
              aria-pressed={category === cat}
            >
              {c.categories[cat]}
            </button>
          ))}
          <div className="ml-auto hidden text-xs text-neutral-500 sm:block">
            {c.pieces(filtered.length)}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white/50 p-16 text-center">
            <div className="text-neutral-400">{c.empty}</div>
            <button
              onClick={() => {
                setCategory('Todos');
                setSearch('');
              }}
              className="mt-4 text-sm font-semibold text-neutral-900 underline"
            >
              {c.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow duration-500 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
              >
                <button
                  onClick={() => setWish((w) => ({ ...w, [p.id]: !w[p.id] }))}
                  className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white/90 backdrop-blur transition-colors hover:bg-white"
                  aria-label={wish[p.id] ? c.removeWish : c.addWish}
                >
                  <Heart
                    className={
                      'h-4 w-4 transition-colors ' +
                      (wish[p.id] ? 'fill-red-500 text-red-500' : 'text-neutral-600')
                    }
                  />
                </button>
                {p.isNew && (
                  <div className="absolute left-3 top-3 z-10 rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {c.isNew}
                  </div>
                )}
                <button
                  onClick={() => setDetail(p)}
                  className="block aspect-[3/4] w-full text-left"
                  aria-label={c.seeDetails(nameOf(p))}
                >
                  <div className="relative h-full w-full overflow-hidden bg-neutral-100">
                    <img
                      src={modaArteProducts[p.id]}
                      alt={nameOf(p)}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </button>
                <div className="p-4">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">{c.categories[p.category]}</div>
                  <div className="mt-1 font-display text-base font-semibold text-neutral-900">
                    {nameOf(p)}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-900">
                      <span className="text-sm text-neutral-500">{c.installments3}</span>
                      <span className="font-semibold">{price(p.price / 3)}</span>
                    </div>
                    <div className="text-sm font-semibold text-neutral-900">{price(p.price)}</div>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="mt-4 w-full rounded-full bg-neutral-900 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    {c.add}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Trust strip */}
      <section className="bg-white/60 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6">
          {c.trust(roundPrice).map((item, i) => (
            <Trust key={item.title} icon={trustIcons[i]} title={item.title} desc={item.desc} />
          ))}
        </div>
      </section>

      {/* Store footer */}
      <footer className="border-t border-neutral-200 bg-[#f0e5d0]/60 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <div className="font-display text-lg font-semibold text-neutral-900">Moda & Arte</div>
              <p className="mt-2 text-sm text-neutral-600">{c.footerAbout}</p>
            </div>
            <div className="text-sm text-neutral-700">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{c.shop}</div>
              <div className="mt-3 space-y-1.5">
                {c.shopLinks.map((link) => (
                  <div key={link}>{link}</div>
                ))}
              </div>
            </div>
            <div className="text-sm text-neutral-700">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{c.contact}</div>
              <div className="mt-3 space-y-1.5">
                <div>ola@modaearte.com.br</div>
                <div>(21) 99999-9999</div>
                <div>Rua Voluntários da Pátria, 42 · Botafogo</div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-xs text-neutral-500">
            © 2025 Moda & Arte · {c.demoBy}
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={c.cart}>
          <button
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
            aria-label={c.closeCart}
          />
          <aside className="flex w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <div>
                <div className="font-display text-lg font-semibold text-neutral-900">{c.yourCart}</div>
                <div className="text-xs text-neutral-500">{c.pieces(itemsCount)}</div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                aria-label={c.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="grid place-items-center px-6 py-16 text-center">
                  <ShoppingBag className="h-10 w-10 text-neutral-300" />
                  <div className="mt-4 font-display text-lg font-semibold text-neutral-900">
                    {c.emptyCart}
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">{c.emptyCartText}</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-6 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    {c.keepShopping}
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-200">
                  {cart.map((item) => (
                    <li key={item.product.id} className="flex items-start gap-4 px-6 py-4">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        <img
                          src={modaArteProducts[item.product.id]}
                          alt={nameOf(item.product)}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-sm font-semibold text-neutral-900">
                          {nameOf(item.product)}
                        </div>
                        <div className="text-xs text-neutral-500">{c.categories[item.product.category]}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => changeQty(item.product.id, -1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                            aria-label={c.decrease(nameOf(item.product))}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[24px] text-center text-sm font-medium text-neutral-900" aria-live="polite">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => changeQty(item.product.id, 1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                            aria-label={c.increase(nameOf(item.product))}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => remove(item.product.id)}
                            className="ml-auto text-xs text-neutral-500 hover:text-red-600"
                            aria-label={c.remove(nameOf(item.product))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right text-sm font-semibold text-neutral-900">
                        {price(item.product.price * item.qty)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-5">
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder={c.couponPlaceholder}
                    className="flex-1 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
                    aria-label={c.couponAria}
                  />
                  <button
                    onClick={applyCoupon}
                    className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {c.apply}
                  </button>
                </div>
                {couponApplied?.code === 'MAX10' && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700">
                    <Check className="h-3.5 w-3.5" /> {c.couponApplied}
                  </div>
                )}
                {couponApplied?.code === '__invalid__' && (
                  <div className="mt-2 text-xs text-red-600">{c.couponInvalid}</div>
                )}
                <div className="mt-4 space-y-1.5 text-sm">
                  <Row label={c.subtotal} value={price(subtotal)} />
                  {couponApplied?.code === 'MAX10' && (
                    <Row label={c.discount} value={`− ${price(discount)}`} accent />
                  )}
                  <Row label={c.shipping} value={shipping === 0 ? c.free : price(shipping)} />
                  <div className="mt-2 flex items-center justify-between border-t border-neutral-300 pt-2 text-base font-semibold text-neutral-900">
                    <span>{c.total}</span>
                    <span>{price(total)}</span>
                  </div>
                </div>
                <button
                  onClick={goCheckout}
                  className="mt-4 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  {c.goCheckout}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/70" onClick={() => setDetail(null)} aria-label={c.closeDetails} />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => setDetail(null)}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-neutral-700"
              aria-label={c.close}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={modaArteProducts[detail.id]}
                  alt={nameOf(detail)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">{c.categories[detail.category]}</div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-neutral-900">{nameOf(detail)}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{c.reviews}</span>
                </div>
                <div className="mt-6 text-2xl font-semibold text-neutral-900">{price(detail.price)}</div>
                <div className="text-xs text-neutral-500">{c.installments6(price(detail.price / 6))}</div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{c.productDescription}</p>
                <div className="mt-6 flex items-center gap-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">{c.size}</div>
                  {c.sizes.map((s) => (
                    <button key={s} className="rounded-lg border border-neutral-300 px-3 py-1 text-sm hover:border-neutral-900">
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    addToCart(detail);
                    setDetail(null);
                  }}
                  className="mt-6 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  {c.addToCart}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutStep > 0 && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/70" onClick={closeCheckout} aria-label={c.closeCheckout} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-neutral-200 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-semibold text-neutral-900">{c.checkout}</div>
                <button
                  onClick={closeCheckout}
                  className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
                  aria-label={c.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={
                      'h-1 flex-1 rounded-full transition-colors ' +
                      (checkoutStep >= n ? 'bg-neutral-900' : 'bg-neutral-200')
                    }
                  />
                ))}
              </div>
            </div>

            {checkoutStep === 1 && (
              <div className="px-6 py-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  {c.stepDelivery}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <input
                    value={address.cep}
                    onChange={(e) => setAddress({ ...address, cep: e.target.value })}
                    placeholder={c.zip}
                    className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
                  />
                  <input
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder={c.street}
                    className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
                  />
                  <input
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder={c.city}
                    className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setCheckoutStep(2)}
                  disabled={!address.cep || !address.street || !address.city}
                  className="mt-6 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {c.continue}
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="px-6 py-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  {c.stepPayment}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(['pix', 'card'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setAddress({ ...address, payment: p })}
                      className={
                        'rounded-2xl border p-4 text-left transition-colors ' +
                        (address.payment === p
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-300 hover:border-neutral-500')
                      }
                    >
                      <div className="text-sm font-semibold text-neutral-900">
                        {p === 'pix' ? c.pix : c.card}
                      </div>
                      <div className="mt-1 text-xs text-neutral-500">
                        {p === 'pix' ? c.pixDesc : c.cardDesc}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-sm">
                  <Row label={c.subtotal} value={price(subtotal)} />
                  {couponApplied?.code === 'MAX10' && (
                    <Row label={c.discount} value={`− ${price(discount)}`} />
                  )}
                  <Row label={c.shipping} value={shipping === 0 ? c.free : price(shipping)} />
                  <div className="mt-2 flex items-center justify-between border-t border-neutral-300 pt-2 font-semibold text-neutral-900">
                    <span>{c.total}</span>
                    <span>
                      {price(address.payment === 'pix' ? total * 0.95 : total)}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="flex-1 rounded-full border border-neutral-300 py-3 text-sm font-semibold text-neutral-900"
                  >
                    {c.back}
                  </button>
                  <button
                    onClick={finishCheckout}
                    className="flex-1 rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white"
                  >
                    {c.finish}
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#c6ff3b] text-neutral-900">
                  <Check className="h-8 w-8" />
                </div>
                <div className="mt-6 font-display text-2xl font-semibold text-neutral-900">
                  {c.orderDone}
                </div>
                <p className="mt-3 text-sm text-neutral-600">{c.orderDoneText}</p>
                <button
                  onClick={() => {
                    setCheckoutStep(0);
                    setCartOpen(false);
                  }}
                  className="mt-8 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white"
                >
                  {c.keepShopping}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DemoFrame>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-600">{label}</span>
      <span className={accent ? 'font-medium text-emerald-700' : 'text-neutral-900'}>{value}</span>
    </div>
  );
}

function Trust({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-neutral-900">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-neutral-900">{title}</div>
        <div className="text-xs text-neutral-500">{desc}</div>
      </div>
    </div>
  );
}
