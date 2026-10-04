import { describe, expect, it } from 'vitest';
import { messages } from '@/i18n/messages';

/** Same keys and same array lengths, so no language silently misses a line. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]).sort());
  }
  return typeof value;
}

describe('messages', () => {
  it('have the same structure in the three languages', () => {
    expect(shape(messages.en)).toEqual(shape(messages.pt));
    expect(shape(messages.es)).toEqual(shape(messages.pt));
  });

  it.each(['pt', 'en', 'es'] as const)('%s lists PIX, card and Wise and never Bitcoin', (locale) => {
    const all = JSON.stringify(messages[locale]);
    expect(all).not.toMatch(/bitcoin|btc/i);
    const methods = messages[locale].pricing.payments.methods.join(' ');
    expect(methods).toMatch(/PIX/);
    expect(methods).toMatch(/Wise/);
    expect(methods).toMatch(/cart|card|tarjeta/i);
  });

  it.each(['pt', 'en', 'es'] as const)('%s home description fits in a search result', (locale) => {
    const { description } = messages[locale].meta;
    expect([...description].length).toBeLessThanOrEqual(160);
    expect(description).toMatch(/Rio de Janeiro|Río de Janeiro/);
    expect(description).toMatch(/WhatsApp/);
  });

  it.each(['pt', 'en', 'es'] as const)('%s FAQ timeline matches the process steps', (locale) => {
    const all = JSON.stringify(messages[locale].faq);
    // Discovery + design + development + launch add up to roughly 4 to 7 weeks.
    expect(all).toMatch(/4 (a|to) 7 (semanas|weeks)/);
    expect(all).not.toMatch(/3 (a|to) 7/);
    expect(messages[locale].process.lead).toMatch(/10/);
  });

  it.each(['pt', 'en', 'es'] as const)('%s makes no claim about agencies or years of experience', (locale) => {
    const all = JSON.stringify(messages[locale]);
    expect(all).not.toMatch(/ag[eê]ncia|agency|anos de experi|years of experience|años de experiencia/i);
  });
});
