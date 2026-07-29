'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MaxMonogram } from './max-monogram';

const links = [
  { href: '/', label: 'Início', match: '/' as const },
  { href: '/#trabalhos', label: 'Trabalhos', match: '#trabalhos' as const },
  { href: '/#processo', label: 'Processo', match: '#processo' as const },
  { href: '/#sobre', label: 'Sobre', match: '#sobre' as const },
];

export function EstudioNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isDemo = pathname?.startsWith('/demo/');

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div
        className={cn(
          'container-wide flex items-center justify-between rounded-full border border-white/10 px-4 py-2 backdrop-blur-xl transition-all duration-500',
          scrolled
            ? 'bg-black/70 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]'
            : 'bg-black/30',
        )}
      >
        <Link
          href="/"
          aria-label="Max Costa · Estúdio"
          className="flex items-center gap-2.5 pl-1 pr-3"
        >
          <MaxMonogram variant="inverted" rounded={20} className="h-8 w-8 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold text-white">Max Costa</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
              Estúdio
            </span>
          </span>
        </Link>

        {!isDemo && (
          <nav aria-label="Principal" className="hidden md:flex md:items-center md:gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:flex md:items-center md:gap-2">
          {isDemo && (
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              ← Portfólio
            </Link>
          )}
          <Link
            href="/#contato"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Iniciar projeto
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-full border border-white/15 bg-white/5 p-2 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="estudio-mobile-nav"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="estudio-mobile-nav"
        className={cn(
          'md:hidden fixed inset-x-0 top-[76px] z-40 origin-top transition-all duration-300',
          open ? 'opacity-100 scale-y-100' : 'pointer-events-none opacity-0 scale-y-95',
        )}
      >
        <div className="container-wide">
          <div className="rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
            <nav aria-label="Móvel" className="flex flex-col">
              {(isDemo
                ? [{ href: '/', label: '← Voltar ao portfólio' }]
                : links
              ).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-4 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#contato"
                className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
              >
                Iniciar projeto
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
