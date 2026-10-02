import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrossel Instagram · MX Studio Web',
  robots: { index: false, follow: false },
};

export default function CarrosselLayout({ children }: { children: React.ReactNode }) {
  // Standalone layout — no site nav/footer. Each slide is 1080×1350.
  return <div className="min-h-dvh bg-neutral-950 text-white">{children}</div>;
}
