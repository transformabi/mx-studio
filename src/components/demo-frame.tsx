'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { useI18n } from '@/i18n/provider';

const text: Record<Locale, { back: string; live: string; disclaimer: string }> = {
  pt: {
    back: 'Voltar ao portfólio',
    live: 'Demo funcional',
    disclaimer:
      'Esta é uma demo interativa criada por MX Studio. Todos os dados são fictícios e o checkout não processa pagamentos.',
  },
  en: {
    back: 'Back to portfolio',
    live: 'Working demo',
    disclaimer:
      "This is an interactive demo built by MX Studio. All data is fictional and the checkout doesn't process payments.",
  },
  es: {
    back: 'Volver al portafolio',
    live: 'Demo funcional',
    disclaimer:
      'Esta es una demo interactiva creada por MX Studio. Todos los datos son ficticios y el checkout no procesa pagos.',
  },
};

export function DemoFrame({
  children,
  siteName,
  bg = '#0a0a0a',
}: {
  children: ReactNode;
  siteName: string;
  bg?: string;
}) {
  const t = text[useI18n().locale];

  return (
    <div className="min-h-dvh w-full pt-20 pb-6" style={{ background: '#050505' }}>
      <div className="mx-auto max-w-[1360px] px-3 sm:px-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.back}
          </Link>
          <div className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/40 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c6ff3b] animate-pulse" />
            {t.live} · {siteName}
          </div>
        </div>

        <div
          className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
          style={{ background: bg }}
        >
          {children}
        </div>

        <div className="mt-4 text-center text-[11px] text-white/40">{t.disclaimer}</div>
      </div>
    </div>
  );
}
