import type { Metadata } from 'next';
import { messages } from '@/i18n/messages';
import { HomePage } from '@/components/home/home-page';

export const metadata: Metadata = {
  title: messages.pt.meta.title,
  description: messages.pt.meta.description,
};

export default function Page() {
  return <HomePage locale="pt" />;
}
