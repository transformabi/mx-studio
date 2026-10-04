import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { MaxMonogram } from '@/components/max-monogram';
import { fontVariables } from '@/lib/fonts';

// No `robots` here: Next already renders <meta name="robots" content="noindex"> on the 404 page,
// and a second robots tag would only duplicate it.
export const metadata: Metadata = {
  title: 'Página não encontrada · MX Studio Web',
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>
        <main className="grid min-h-dvh place-items-center px-5 font-body">
          <div className="max-w-md text-center">
            <MaxMonogram className="mx-auto h-14 w-14" rounded={14} />
            <p className="mt-8 font-label text-xs uppercase tracking-[0.16em] text-white/50">Erro 404</p>
            <h1 className="mt-3 font-brand text-4xl font-bold tracking-tight">Página não encontrada</h1>
            <p className="mt-4 text-white/65">
              O endereço pode ter mudado. <span lang="en">Page not found.</span>{' '}
              <span lang="es">Página no encontrada.</span>
            </p>
            <nav className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              <Link className="rounded-full bg-lime px-5 py-2.5 font-semibold text-ink" href="/">
                Ir para o início
              </Link>
              <Link className="rounded-full border border-white/20 px-5 py-2.5" href="/en" hrefLang="en">
                English
              </Link>
              <Link className="rounded-full border border-white/20 px-5 py-2.5" href="/es" hrefLang="es">
                Español
              </Link>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
