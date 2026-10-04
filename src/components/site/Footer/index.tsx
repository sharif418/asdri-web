import { Facebook, Instagram, Linkedin, MessageCircle, Send, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Media } from '@/payload-types'

import { Brand } from '@/components/site/Brand'
import { LocaleSwitcher } from '@/components/site/LocaleSwitcher'
import { localizedHref } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { formatNumber } from '@/utilities/formatNumber'
import { getCachedGlobal } from '@/utilities/getGlobals'

const SOCIAL_ICONS = {
  facebook: Facebook,
  youtube: Youtube,
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Instagram,
  x: Twitter,
  linkedin: Linkedin,
} as const

/**
 * Site footer (REQ-GEN-04, REQ-GEN-12): the back of the book — the deepest ground in the
 * palette (ink-deep, a shade past the support band's primary-deep so the two dark bands that
 * end the page never merge), entered under its gold hairline, the footer's one illumination.
 * Left: wordmark, Foundation line, contact. Middle: editable link columns. Right: admission QR
 * when uploaded. Bottom: copyright with Bengali year, legal links, language and theme.
 */
export async function SiteFooter({ locale }: { locale: Locale }) {
  const [settings, nav, dict] = await Promise.all([
    getCachedGlobal('site-settings', 1, locale)(),
    getCachedGlobal('navigation', 0, locale)(),
    getDictionary(locale),
  ])
  const features = (settings.features ?? {}) as Record<string, boolean | null | undefined>
  const enabled = (feature?: string | null) => !feature || features[feature] !== false
  const href = (h: string) => (h.startsWith('/') ? localizedHref(locale, h) : h)

  const qr =
    settings.admissionQr && typeof settings.admissionQr === 'object'
      ? (settings.admissionQr as Media)
      : null
  const logo = settings.logo && typeof settings.logo === 'object' ? (settings.logo as Media) : null
  const year = formatNumber(new Date().getFullYear(), locale, { useGrouping: false })
  // A column whose every link is hidden by its module flag disappears rather than rendering
  // its heading above nothing (review item 4, same rule as the header's parent items).
  const columns = (nav.footerColumns ?? [])
    .map((col) => ({
      label: col.label,
      links: (col.links ?? []).filter((l) => enabled(l.feature)),
    }))
    .filter((col) => col.links.length > 0)

  return (
    <footer className="mt-auto border-t-2 border-accent bg-ink-deep text-band-foreground">
      <div className="container py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          {/* Identity + contact */}
          <div className="lg:col-span-4">
            <Brand
              name={settings.name}
              parentLine={settings.parentLine}
              href={localizedHref(locale, '/')}
              logoUrl={logo?.url ?? null}
              logoAlt={logo?.alt ?? null}
              tone="paper"
              parentLineClassName="whitespace-normal"
            />
            {settings.tagline && (
              <p className="mt-5 max-w-sm text-small leading-relaxed text-band-foreground/80">
                {settings.tagline}
              </p>
            )}

            <dl className="mt-8 space-y-4 text-small">
              {(settings.addresses ?? []).map((a, i) => (
                <div key={a.id ?? i}>
                  <dt className="text-caption text-band-foreground/60">{a.label}</dt>
                  <dd className="mt-0.5 whitespace-pre-line">
                    {a.mapUrl ? (
                      <a
                        href={a.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {a.text}
                      </a>
                    ) : (
                      a.text
                    )}
                  </dd>
                </div>
              ))}
              {(settings.phones ?? []).map((p, i) => (
                <div key={p.id ?? i}>
                  <dt className="text-caption text-band-foreground/60">{dict.common.phone}</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`tel:${p.number.replace(/[^+\d]/g, '')}`}
                      dir="ltr"
                      className="underline-offset-4 hover:underline"
                    >
                      {p.number}
                    </a>
                    {p.note && <span className="text-band-foreground/70"> ({p.note})</span>}
                  </dd>
                </div>
              ))}
              {settings.email && (
                <div>
                  <dt className="text-caption text-band-foreground/60">{dict.common.email}</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${settings.email}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {settings.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            {(settings.social?.length ?? 0) > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {settings.social!.map((s, i) => {
                  const Icon = SOCIAL_ICONS[s.platform as keyof typeof SOCIAL_ICONS] ?? Facebook
                  return (
                    <li key={s.id ?? i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.platform}
                        className="flex size-10 items-center justify-center rounded-sm border border-band-foreground/20 text-band-foreground/80 transition-colors hover:border-band-foreground/60 hover:text-band-foreground"
                      >
                        <Icon className="size-4" aria-hidden />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-6"
          >
            {columns.map((col, i) => (
              <div key={i}>
                <h2 className="font-sans text-caption font-semibold text-band-foreground/60">
                  {col.label}
                </h2>
                <ul className="mt-3 space-y-2.5 text-small">
                  {col.links.map((l, j) => (
                    <li key={l.id ?? j}>
                      <Link
                        href={href(l.href)}
                        target={l.newTab ? '_blank' : undefined}
                        rel={l.newTab ? 'noopener noreferrer' : undefined}
                        className="text-band-foreground/85 underline-offset-4 hover:text-band-foreground hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {qr?.url && (
              <div>
                <h2 className="font-sans text-caption font-semibold text-band-foreground/60">
                  {dict.footer.scanForAdmissions}
                </h2>
                {/* eslint-disable-next-line @next/next/no-img-element -- CMS upload, fixed box */}
                <img
                  src={qr.url}
                  alt={qr.alt || dict.footer.scanForAdmissions}
                  className="mt-3 size-28 rounded-sm bg-white p-1.5"
                />
              </div>
            )}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-col gap-4 border-t border-band-foreground/15 pt-6 text-caption text-band-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>{dict.footer.copyright(year, settings.name)}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {(nav.legal ?? [])
              .filter((l) => enabled(l.feature))
              .map((l, i) => (
                <Link key={l.id ?? i} href={href(l.href)} className="hover:text-band-foreground">
                  {l.label}
                </Link>
              ))}
            {(settings.otherWebsites ?? []).map((w, i) => (
              <a
                key={w.id ?? i}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-band-foreground"
              >
                {w.label}
              </a>
            ))}
            <LocaleSwitcher current={locale} label={dict.header.language} tone="paper" />
            {features.darkMode !== false && <ThemeSelector />}
          </div>
        </div>
      </div>
    </footer>
  )
}
