import type { Locale } from '../config';
import { pt, type Messages } from './pt';
import { en } from './en';
import { es } from './es';

export type { Messages };

export const messages: Record<Locale, Messages> = { pt, en, es };
