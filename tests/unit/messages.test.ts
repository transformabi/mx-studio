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

  it.each(['pt', 'en', 'es'] as const)('%s lists the Stripe methods (card, Pix, boleto) plus Wise by arrangement, never Bitcoin', (locale) => {
    const all = JSON.stringify(messages[locale]);
    expect(all).not.toMatch(/bitcoin|btc/i);
    const methods = messages[locale].pricing.payments.methods.join(' ');
    expect(methods).toMatch(/Pix/);
    expect(methods).toMatch(/Boleto/i);
    expect(methods).toMatch(/cart|card|tarjeta/i);
    // Wise is off-site, arranged directly, and listed last; Brazilian Stripe accounts have no card instalments.
    const list = messages[locale].pricing.payments.methods;
    expect(list[list.length - 1]).toMatch(/Wise/);
    expect(list.slice(0, -1).join(' ')).not.toMatch(/Wise/);
    expect(messages[locale].pricing.payments.note).toMatch(/Wise.*(WhatsApp|e-mail|email)/);
    expect(methods).not.toMatch(/parcel|instal|cuotas/i);
    // The plans replaced the old budget ranges in the contact form.
    expect(Object.keys(messages[locale].contact.form)).not.toContain('budget');
  });

  it.each(['pt', 'en', 'es'] as const)('%s home description fits in a search result', (locale) => {
    const { description } = messages[locale].meta;
    expect([...description].length).toBeLessThanOrEqual(160);
    expect(description).toMatch(/Rio de Janeiro|Río de Janeiro/);
    expect(description).toMatch(/WhatsApp/);
  });

  it.each(['pt', 'en', 'es'] as const)('%s FAQ timeline matches the process steps', (locale) => {
    const all = JSON.stringify(messages[locale].faq);
    // The plans go live in 14 days: discovery + design + development + launch fit inside that.
    expect(all).toMatch(/14 (dias|days|días)/);
    expect(all).not.toMatch(/4 (a|to) 7|10 (dias|days|días)|semanas|weeks/);
    expect(messages[locale].process.lead).toMatch(/14/);
    const maxDays = messages[locale].process.steps
      .map((s) => Number(s.duration.match(/(\d+)\D*$/)?.[1]))
      .reduce((a, b) => a + b, 0);
    expect(maxDays).toBeLessThanOrEqual(14);
  });

  it.each(['pt', 'en', 'es'] as const)('%s makes no claim about agencies or years of experience', (locale) => {
    const all = JSON.stringify(messages[locale]);
    expect(all).not.toMatch(/ag[eê]ncia|agency|anos de experi|years of experience|años de experiencia/i);
  });
});
