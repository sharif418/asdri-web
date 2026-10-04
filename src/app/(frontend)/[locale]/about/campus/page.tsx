import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { CampusSection } from '@/components/home/CampusSection'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/**
 * Campus & Facilities (REQ-ABT-03): the four facilities from the client's document as titled
 * ruled rows, then campus life as the same band the home page shows — one source (Home ▸
 * Campus life), two pages. Works complete when a facility body is short or the campus life
 * section is switched off.
 */
export const revalidate = 600

export default async function CampusPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [about, home, dict] = await Promise.all([
    getCachedGlobal('about-content', 0, locale)(),
    getCachedGlobal('home', 1, locale)(),
    getDictionary(locale),
  ])

  const facilities = (about.facilities ?? []).filter((f) => f.title || f.body)
  const campusBlock = (home.sections ?? []).find(
    (section): section is CampusSectionBlock => section.blockType === 'campusLife' && section.enabled !== false,
  )

  return (
    <main className="pb-24">
      <div className="container">
        <header className="pt-12 pb-10 md:pt-20 md:pb-12">
          <h1 className="text-h1">{dict.about.campusTitle}</h1>
          <span className="illumination mt-6" aria-hidden />
        </header>

        {facilities.length > 0 ? (
          <ul className="divide-y divide-border border-y border-border">
            {facilities.map((facility, i) => (
              <li key={facility.id ?? i} className="py-6">
                <h2 className="font-serif text-h4 font-semibold">{facility.title}</h2>
                {facility.body && (
                  <p className="mt-2 max-w-[68ch] text-body leading-relaxed text-ink-muted">
                    {facility.body}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-[68ch]">
            <EmptyState
              title={dict.about.facilitiesEmptyTitle}
              description={dict.about.facilitiesEmptyBody}
              action={
                <StaffAddAction href="/admin/globals/about-content" label={dict.about.campusTitle} />
              }
            />
          </div>
        )}
      </div>

      {campusBlock && <CampusSection block={campusBlock} />}
    </main>
  )
}

type CampusSectionBlock = Parameters<typeof CampusSection>[0]['block']

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.about.campusTitle }
}
