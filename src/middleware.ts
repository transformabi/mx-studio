import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE_MAX_AGE, LOCALE_COOKIE, isLocale } from '@/i18n/config';

// Shareable links such as /?lang=en: save the language and redirect to the clean URL.
export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang');
  if (!isLocale(lang)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.searchParams.delete('lang');
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, lang, { path: '/', maxAge: COOKIE_MAX_AGE, sameSite: 'lax' });
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
