import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Media } from '@/payload-types'

import { localizedHref } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { HeaderClient, type NavItem } from './HeaderClient'

/**
 * Site header (REQ-GEN-02, REQ-GEN-03). Server component: reads site-settings and navigation for
 * the locale, drops items whose module is switched off, localises internal hrefs, and hands plain
 * data to the client shell that owns the dropdowns and the mobile drawer.
 */
export async function SiteHeader({ locale }: { locale: Locale }) {
  const [settings, nav, dict] = await Promise.all([
    getCachedGlobal('site-settings', 1, locale)(),
    getCachedGlobal('navigation', 0, locale)(),
    getDictionary(locale),
  ])

  const features = (settings.features ?? {}) as Record<string, boolean | null | undefined>
  const enabled = (feature?: string | null) => !feature || features[feature] !== false
  const href = (h: string) => (h.startsWith('/') ? localizedHref(locale, h) : h)

  const items: NavItem[] = (nav.primary ?? [])
    .filter((item) => enabled(item.feature))
    .map((item) => ({
      label: item.label,
      href: href(item.href),
      newTab: Boolean(item.newTab),
      children: (item.children ?? [])
        .filter((child) => enabled(child.feature))
        .map((child) => ({
          label: child.label,
          href: href(child.href),
          newTab: Boolean(child.newTab),
          description: child.description ?? undefined,
        })),
    }))

  const utility: NavItem[] = (nav.utility ?? [])
    .filter((item) => enabled(item.feature))
    .map((item) => ({ label: item.label, href: href(item.href), newTab: Boolean(item.newTab) }))

  const logo = settings.logo && typeof settings.logo === 'object' ? (settings.logo as Media) : null
  const phone = settings.phones?.[0]

  return (
    <HeaderClient
      locale={locale}
      brand={{
        name: settings.name,
        shortName: settings.shortName ?? settings.name,
        parentLine: settings.parentLine ?? null,
        href: localizedHref(locale, '/'),
        logoUrl: logo?.url ?? null,
        logoAlt: logo?.alt ?? null,
      }}
      items={items}
      utility={utility}
      cta={
        features.donations !== false && nav.cta?.label && nav.cta?.href
          ? { label: nav.cta.label, href: href(nav.cta.href) }
          : null
      }
      contact={{
        phone: phone?.number ?? null,
        phoneNote: phone?.note ?? null,
        email: settings.email ?? null,
      }}
      showAccounts={features.accounts !== false}
      dict={dict.header}
      skipLabel={dict.skipToContent}
    />
  )
}
