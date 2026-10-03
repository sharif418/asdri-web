import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, isLocale } from '@/i18n/config'

/**
 * Locale routing (REQ-GEN-01). Pages live under app/(frontend)/[locale]. Bangla is the default
 * and must not show a prefix, so "/courses" is rewritten internally to "/bn/courses" while the
 * address bar keeps "/courses". "/en/courses" passes through. A literal "/bn/..." URL redirects to
 * the prefix-less form so there is exactly one canonical URL per page.
 *
 * Payload admin and API, Next internals, route handlers under /next and static files are left
 * alone. Next 16 names this file proxy.ts (formerly middleware.ts).
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, first] = pathname.split('/')

  if (first === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/bn(?=\/|$)/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  if (isLocale(first)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    // Everything except: Payload admin + API, Next internals, our route handlers, sitemaps, files.
    '/((?!admin|api|_next|next|.*-sitemap\\.xml|sitemap\\.xml|robots\\.txt|favicon\\.ico|favicon\\.svg|.*\\..*).*)',
  ],
}
