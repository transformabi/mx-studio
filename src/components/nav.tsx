'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Messages } from '@/i18n/messages';
import { MaxMonogram } from './max-monogram';
import { PreferencesMenu } from './preferences-menu';

export function EstudioNav({ t, prefs }: { t: Messages['nav']; prefs: Messages['prefs'] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: t.home },
    { href: '/#trabalhos', label: t.work },
    { href: '/#processo', label: t.process },
    { href: '/#sobre', label: t.about },
  ];

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
  const isCarrossel = pathname?.startsWith('/carrossel');

  if (isCarrossel) return null;

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
            ? 'bg-black/85 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]'
            : 'bg-black/30',
        )}
      >
        <Link
          href="/"
          aria-label={t.homeAria}
          className="flex items-center gap-2.5 pl-1 pr-3"
        >
          <MaxMonogram variant="inverted" rounded={20} className="h-8 w-8 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold text-white">MX Studio</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
              {t.studio}
            </span>
          </span>
        </Link>

        {!isDemo && (
          <nav aria-label={t.mainNav} className="hidden lg:flex lg:items-center lg:gap-1">
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

        <div className="flex items-center gap-2">
          <PreferencesMenu t={prefs} />
          {isDemo && (
            <Link
              href="/"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white lg:inline-flex"
            >
              {t.backShort}
            </Link>
          )}
          <Link
            href="/#contato"
            className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            {t.startProject}
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            className="lg:hidden rounded-full border border-white/15 bg-white/5 p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            aria-controls="estudio-mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="estudio-mobile-nav"
        className={cn(
          'lg:hidden fixed inset-x-0 top-[76px] z-40 origin-top transition-all duration-300',
          open ? 'opacity-100 scale-y-100' : 'pointer-events-none opacity-0 scale-y-95',
        )}
      >
        <div className="container-wide">
          <div className="rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
            <nav aria-label={t.mobileNav} className="flex flex-col">
              {(isDemo ? [{ href: '/', label: t.backLong }] : links).map((l) => (
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
                {t.startProject}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
