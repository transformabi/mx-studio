/** A block is a paragraph (string) or a bulleted list (string[]). */
export type TermsBlock = string | string[];

export type TermsSection = { id: string; title: string; body: TermsBlock[] };

export type Terms = {
  /** Page heading and <title>. */
  title: string;
  description: string;
  versionLabel: string;
  intro: string[];
  tocTitle: string;
  sections: TermsSection[];
  contact: { title: string; text: string; whatsapp: string; email: string };
};

export const TERMS_VERSION = 'v1.1';
/** ISO date the current version took effect. */
export const TERMS_DATE = '2026-10-30';
