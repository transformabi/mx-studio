import type { Messages } from '@/i18n/messages';
import { Plans } from './plans';

/** The pricing section: only the small-business plans (setup + monthly), with the payment methods. */
export function Pricing({ t }: { t: Messages['pricing'] }) {
  return <Plans t={t.plans} payments={t.payments} schedule={t.schedule} />;
}
