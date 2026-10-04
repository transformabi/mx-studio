import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { fontVariables } from '@/lib/fonts';

// Internal tools for making Instagram posts: never indexed, no site header or footer.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
