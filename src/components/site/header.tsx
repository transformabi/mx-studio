'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/paths';
import { estudio } from '@/lib/estudio';
import { LangSwitch } from './lang-switch';
import { Logo } from './logo';

export function Header({ locale, t }: { locale: Locale; t: Messages['nav'] }) {
  const [open, setOpen] = useState(false);
  const home = localizedPath(locale, '/');
  const links = [
    { id: 'work', label: t.work },
    { id: 'process', label: t.process },
    { id: 'pricing', label: t.pricing },
    { id: 'about', label: t.about },
    { id: 'contact', label: t.contact },
  ];
  const cta = (
    <a
      href={estudio.diagnostico}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-[#b8ff52]"
    >
      {t.cta}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 font-body backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Link href={home} aria-label={t.home} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={t.menuLabel} className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm text-white/70">
            {links.map((l) => (
              <li key={l.id}>
                <Link href={`${home}#${l.id}`} className="transition-colors hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LangSwitch label={t.language} />
          {cta}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.close : t.menu}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 lg:hidden">
          <nav aria-label={t.menuLabel} className="container-site py-6">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`${home}#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-brand text-2xl font-semibold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <LangSwitch label={t.language} />
              {cta}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
