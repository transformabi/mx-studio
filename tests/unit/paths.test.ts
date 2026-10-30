import { describe, expect, it } from 'vitest';
import { alternates, localizedPath, splitLocale, switchLocalePath } from '@/i18n/paths';

describe('splitLocale', () => {
  it('treats unprefixed paths as Portuguese', () => {
    expect(splitLocale('/')).toEqual({ locale: 'pt', path: '/' });
    expect(splitLocale('/demo/moda-arte')).toEqual({ locale: 'pt', path: '/demo/moda-arte' });
  });
  it('reads the /en and /es prefixes', () => {
    expect(splitLocale('/en')).toEqual({ locale: 'en', path: '/' });
    expect(splitLocale('/es/demo/rota-clara')).toEqual({ locale: 'es', path: '/demo/rota-clara' });
    expect(splitLocale('/en/')).toEqual({ locale: 'en', path: '/' });
  });
});

describe('localizedPath', () => {
  it('keeps Portuguese at the root and prefixes the others', () => {
    expect(localizedPath('pt', '/')).toBe('/');
    expect(localizedPath('en', '/')).toBe('/en');
    expect(localizedPath('es', '/demo/moda-arte')).toBe('/es/demo/moda-arte');
    expect(localizedPath('en', 'demo/x/')).toBe('/en/demo/x');
  });
});

describe('switchLocalePath', () => {
  it('keeps the visitor on the same page in the other language', () => {
    expect(switchLocalePath('/demo/moda-arte', 'en')).toBe('/en/demo/moda-arte');
    expect(switchLocalePath('/en/demo/moda-arte', 'pt')).toBe('/demo/moda-arte');
    expect(switchLocalePath('/es', 'en')).toBe('/en');
  });
  it('sends Portuguese-only pages to the home page of the other language', () => {
    expect(switchLocalePath('/fundadores', 'en')).toBe('/en');
    expect(switchLocalePath('/fundadores', 'pt')).toBe('/fundadores');
  });
});

describe('translated slugs', () => {
  it('maps the terms page to each language slug and back', () => {
    expect(localizedPath('pt', '/termos')).toBe('/termos');
    expect(localizedPath('en', '/termos')).toBe('/en/terms');
    expect(localizedPath('es', '/termos')).toBe('/es/terminos');
    expect(splitLocale('/en/terms')).toEqual({ locale: 'en', path: '/termos' });
    expect(splitLocale('/es/terminos/')).toEqual({ locale: 'es', path: '/termos' });
    expect(switchLocalePath('/en/terms', 'es')).toBe('/es/terminos');
    expect(switchLocalePath('/es/terminos', 'pt')).toBe('/termos');
    expect(alternates('/termos')).toEqual({
      'pt-BR': '/termos',
      en: '/en/terms',
      es: '/es/terminos',
      'x-default': '/termos',
    });
  });
});

describe('alternates', () => {
  it('lists every language plus x-default', () => {
    expect(alternates('/demo/x')).toEqual({
      'pt-BR': '/demo/x',
      en: '/en/demo/x',
      es: '/es/demo/x',
      'x-default': '/demo/x',
    });
  });
});
