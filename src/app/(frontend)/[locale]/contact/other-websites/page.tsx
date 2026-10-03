import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/** The hostname shown as the row's quiet second line, e.g. assunnahfoundation.org */
const hostOf = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/**
 * Other Websites (REQ-CON-02): the Foundation and its sister sites, from the settings global —
 * a quiet ruled list of external links. GAP-B4 keeps the list to what the office confirms; the
 * seed starts it with the Foundation's own site.
 */
export const revalidate = 600

export default async function OtherWebsitesPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [settings, dict] = await Promise.all([
    getCachedGlobal('site-settings', 0, locale)(),
    getDictionary(locale),
  ])
  const sites = (settings.otherWebsites ?? []).filter((site) => site.label && site.url)

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.contact.otherWebsitesTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
        <p className="mt-6 max-w-[68ch] text-body text-ink-muted">
          {dict.contact.otherWebsitesIntro}
        </p>
      </header>

      {sites.length > 0 ? (
        <ul className="max-w-[68ch] divide-y divide-border border-y border-border">
          {sites.map((site, i) => (
            <li key={site.id ?? i} className="py-4">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-body text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {site.label}
                <span className="sr-only"> {dict.contact.opensInNewTab}</span>
              </a>
              <p className="mt-0.5 text-caption text-ink-muted" dir="ltr">
                {hostOf(site.url)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="max-w-[68ch]">
          <EmptyState
            title={dict.contact.otherWebsitesEmptyTitle}
            description={dict.contact.otherWebsitesEmptyBody}
            action={
              <StaffAddAction
                href="/admin/globals/site-settings"
                label={dict.contact.otherWebsitesTitle}
              />
            }
          />
        </div>
      )}
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.contact.otherWebsitesTitle }
}
