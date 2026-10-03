import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { CourseRow } from '@/components/courses/CourseRow'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import type { Course } from '@/payload-types'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type Props = { params: Promise<{ locale: string }> }

/**
 * Courses index (REQ-ACA-01): the seven programmes as ruled rows, grouped into long programmes
 * and short trainings — not cards. Draft-status programmes stay listed with the marked
 * placeholder (GAP-C4).
 */
export const revalidate = 600

export default async function CoursesIndexPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [payload, dict] = await Promise.all([getPayload({ config: configPromise }), getDictionary(locale)])

  const courses = await payload.find({
    collection: 'courses',
    locale,
    depth: 0,
    limit: 50,
    pagination: false,
    sort: 'order',
  })

  const long = courses.docs.filter((c) => c.type === 'long')
  const short = courses.docs.filter((c) => c.type === 'short')
  const hasAny = courses.docs.length > 0

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.courses.indexTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      {!hasAny ? (
        <EmptyState
          title={dict.courses.emptyTitle}
          description={dict.courses.emptyBody}
          action={
            <StaffAddAction
              href="/admin/collections/courses/create"
              label={dict.courses.addCourse}
            />
          }
        />
      ) : (
        <div className="space-y-14">
          {[
            { heading: dict.courses.longHeading, list: long },
            { heading: dict.courses.shortHeading, list: short },
          ].map(
            (group) =>
              group.list.length > 0 && (
                <section key={group.heading} aria-labelledby={group.heading.replace(/\s+/g, '-')}>
                  <h2
                    id={group.heading.replace(/\s+/g, '-')}
                    className="text-h3"
                  >
                    {group.heading}
                  </h2>
                  <ul className="mt-4 divide-y divide-border border-y border-border">
                    {group.list.map((course: Course) => (
                      <CourseRow
                        key={course.id}
                        course={course}
                        locale={locale}
                        pendingLabel={dict.courses.pendingNote}
                      />
                    ))}
                  </ul>
                </section>
              ),
          )}
        </div>
      )}
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.courses.indexTitle }
}
