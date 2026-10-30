import type { Locale } from '@/i18n/config';
import { termsEn } from './en';
import { termsEs } from './es';
import { termsPt } from './pt';
import type { Terms } from './types';

export const terms: Record<Locale, Terms> = { pt: termsPt, en: termsEn, es: termsEs };
export { TERMS_DATE, TERMS_VERSION } from './types';
export type { Terms, TermsBlock, TermsSection } from './types';
