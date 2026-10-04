import { defaultLocale, isLocale, type Locale } from './config';

/** Pages that only exist in Portuguese; switching language from them lands on that language's home. */
const ptOnly = ['/fundadores'];

const normalize = (path: string) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
};

/** '/en/demo/x' → { locale: 'en', path: '/demo/x' }; unprefixed paths are Portuguese. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = normalize(pathname || '/').split('/');
  if (first !== defaultLocale && isLocale(first)) {
    return { locale: first, path: normalize(`/${rest.join('/')}`) };
  }
  return { locale: defaultLocale, path: normalize(pathname || '/') };
}

/** Public URL of `path` in `locale`: ('en', '/') → '/en', ('es', '/demo/x') → '/es/demo/x'. */
export function localizedPath(locale: Locale, path = '/'): string {
  const clean = normalize(path);
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Where the language switcher sends a visitor who is on `pathname`. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { path } = splitLocale(pathname);
  const exists = target === defaultLocale || !ptOnly.includes(path);
  return localizedPath(target, exists ? path : '/');
}

/** hreflang map for a page that exists in every language. */
export function alternates(path: string): Record<string, string> {
  return {
    'pt-BR': localizedPath('pt', path),
    en: localizedPath('en', path),
    es: localizedPath('es', path),
    'x-default': localizedPath('pt', path),
  };
}
