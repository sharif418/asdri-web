import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { SdpTable } from '@/components/courses/SdpTable'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type Props = { params: Promise<{ locale: string }> }

/** The course whose development programmes the page shows (the client document puts the SDP table under PYS). */
const SDP_COURSE_SLUG = 'preparatory-year-for-specialization'

/**
 * Student Development Programs (REQ-ACA-11): the SDP table the client's document places under
 * PYS — Tarbiyah sessions, short courses, seminars, co-curricular activities, mandatory
 * reading, community service — reusing the same ruled table the course page shows. The note
 * explains the programmes are compulsory but carry no credits; totals are computed, never typed.
 */

export default async function StudentDevelopmentPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [payload, dict] = await Promise.all([
    getPayload({ config: configPromise }),
    getDictionary(locale),
  ])

  const course = await payload.find({
    collection: 'courses',
    locale,
    depth: 0,
    limit: 1,
    pagination: false,
    draft: false,
    where: { slug: { equals: SDP_COURSE_SLUG } },
  })
  const sdp = course.docs[0]?.sdp ?? null
  const rows = sdp?.rows ?? []

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.studentDevelopment.title}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      {sdp?.note && <p className="reading">{sdp.note}</p>}

      <section className={sdp?.note ? 'mt-14' : undefined}>
        {rows.length > 0 ? (
          <SdpTable rows={rows} labels={dict.courses.sdpTable} locale={locale} />
        ) : (
          <div className="max-w-[68ch]">
            <EmptyState
              title={dict.studentDevelopment.emptyTitle}
              description={dict.studentDevelopment.emptyBody}
              action={
                course.docs[0] ? (
                  <StaffAddAction
                    href={`/admin/collections/courses/${course.docs[0].id}`}
                    label={dict.studentDevelopment.title}
                  />
                ) : undefined
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
  return { title: dict.studentDevelopment.title }
}
