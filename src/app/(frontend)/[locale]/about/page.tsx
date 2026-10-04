import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { RuledList } from '@/components/site/RuledList'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/**
 * Vision & Objectives (REQ-ABT-01): the vision statement and the thirteen objectives, verbatim
 * from the client's document. The objectives are a list, not a sequence, so they render as an
 * unnumbered ruled list in the reading measure — a column of a kitab page, not a card stack.
 */

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [about, dict] = await Promise.all([
    getCachedGlobal('about-content', 0, locale)(),
    getDictionary(locale),
  ])

  const objectives = (about.objectives ?? [])
    .map((o) => o.value)
    .filter((v): v is string => Boolean(v))

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.about.objectivesTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      {about.visionStatement && (
        <section className="max-w-[68ch]">
          <h2 className="text-h3">{dict.about.visionHeading}</h2>
          <p className="reading mt-6">{about.visionStatement}</p>
        </section>
      )}

      <section className="mt-14">
        <h2 className="text-h3">{dict.about.objectivesHeading}</h2>
        {objectives.length > 0 ? (
          <RuledList items={objectives} serif className="mt-6 max-w-[68ch]" />
        ) : (
          <div className="mt-6 max-w-[68ch]">
            <EmptyState
              title={dict.about.objectivesEmptyTitle}
              description={dict.about.objectivesEmptyBody}
              action={
                <StaffAddAction
                  href="/admin/globals/about-content"
                  label={dict.about.objectivesHeading}
                />
              }
            />
          </div>
        )}
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.about.objectivesTitle }
}
