'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/paths';
import { useI18n } from '@/i18n/provider';
import { ImgFallback } from './img-fallback';

const text: Record<Locale, { back: string; badge: string; disclaimer: string }> = {
  pt: {
    back: 'Voltar para a MX Studio Web',
    badge: 'Modelo de demonstração',
    disclaimer:
      'Modelo de site criado pela MX Studio Web para um negócio fictício. Nomes, fotos e dados são ilustrativos e nenhum pagamento é processado.',
  },
  en: {
    back: 'Back to MX Studio Web',
    badge: 'Demo website',
    disclaimer:
      'Website model built by MX Studio Web for a fictional business. Names, photos and data are illustrative and no payment is processed.',
  },
  es: {
    back: 'Volver a MX Studio Web',
    badge: 'Modelo de demostración',
    disclaimer:
      'Modelo de sitio creado por MX Studio Web para un negocio ficticio. Nombres, fotos y datos son ilustrativos y no se procesa ningún pago.',
  },
};

export function DemoFrame({ children, siteName, bg = '#0a0a0a' }: { children: ReactNode; siteName: string; bg?: string }) {
  const { locale } = useI18n();
  const t = text[locale];

  return (
    <div className="min-h-dvh w-full bg-ink pb-8 pt-20 font-body">
      <ImgFallback />
      <div className="mx-auto max-w-[1360px] px-3 sm:px-6">
        {/* The badge stays on phones too: it is what tells a visitor the business is fictional. */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Link
            href={`${localizedPath(locale, '/')}#work`}
            className="inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/75 transition-colors hover:text-bone"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">{t.back}</span>
          </Link>
          <p className="min-w-0 max-w-full truncate font-label text-[11px] uppercase tracking-[0.14em] text-white/45">
            {t.badge}
            <span className="hidden sm:inline"> · {siteName}</span>
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10" style={{ background: bg }}>
          {children}
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] leading-relaxed text-white/45">{t.disclaimer}</p>
      </div>
    </div>
  );
}
