import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { AlumniProgrammeRows } from '@/components/about/AlumniProgrammeRows'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/**
 * The Alumni Association page (REQ-ABT-04): the client's intro paragraph and the batch
 * statistics, grouped by programme exactly as the document lists them (PGDID 1–2, CCIS 1,
 * Teachers Training 1). Per-programme totals are computed from the rows; the overall figure
 * stays on the home page until the office confirms it (GAP-C1).
 */

export default async function AlumniPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [payload, about, dict] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedGlobal('about-content', 0, locale)(),
    getDictionary(locale),
  ])

  const batches = await payload.find({
    collection: 'alumni-batches',
    locale,
    depth: 0,
    limit: 200,
    pagination: false,
    sort: 'order',
  })

  // Group in document order: programmes appear in the order their first batch is sorted.
  const groups = new Map<string, { order: number; batches: typeof batches.docs }>()
  for (const batch of batches.docs) {
    const key = batch.programme ?? ''
    const group = groups.get(key)
    if (group) {
      group.batches.push(batch)
    } else {
      groups.set(key, { order: groups.size, batches: [batch] })
    }
  }

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.about.alumniTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      {about.alumniIntro && <p className="reading">{about.alumniIntro}</p>}

      <section className={about.alumniIntro ? 'mt-14' : undefined}>
        <h2 className="text-h3">{dict.about.alumniStatsHeading}</h2>
        {batches.docs.length > 0 ? (
          <div className="max-w-[68ch]">
            {[...groups.entries()].map(([programme, group]) => (
              <AlumniProgrammeRows
                key={programme}
                programme={programme}
                batches={group.batches}
                locale={locale}
                totalLabel={dict.courses.table.total}
                graduatesCount={dict.about.graduatesCount}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 max-w-[68ch]">
            <EmptyState
              title={dict.about.alumniEmptyTitle}
              description={dict.about.alumniEmptyBody}
              action={
                <StaffAddAction
                  href="/admin/collections/alumni-batches/create"
                  label={dict.about.alumniTitle}
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
  return { title: dict.about.alumniTitle }
}
