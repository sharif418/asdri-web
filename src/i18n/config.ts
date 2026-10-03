/**
 * Locale routing (REQ-GEN-01). Bangla is the default and has no URL prefix; English lives under
 * /en. `src/proxy.ts` rewrites prefix-less URLs to the internal /bn segment so every page lives
 * under app/(frontend)/[locale] without the default locale showing in the address bar.
 */
export const locales = ['bn', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'bn'

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

/** Public href for a path in a locale: bn → "/courses", en → "/en/courses". */
export function localizedHref(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/** Strip a locale prefix from a public pathname: "/en/courses" → "/courses". */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split('/')
  if (isLocale(first) && first !== defaultLocale) {
    const path = `/${rest.join('/')}`
    return { locale: first, path: path === '/' ? '/' : path.replace(/\/$/, '') }
  }
  return { locale: defaultLocale, path: pathname === '' ? '/' : pathname }
}

/** BCP-47 tags for <html lang> and Intl. */
export const htmlLang: Record<Locale, string> = { bn: 'bn-BD', en: 'en' }

export const localeNames: Record<Locale, string> = { bn: 'বাংলা', en: 'English' }
