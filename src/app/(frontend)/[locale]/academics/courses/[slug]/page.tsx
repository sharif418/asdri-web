import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { CourseDetail } from '@/components/courses/CourseDetail'
import type { Locale } from '@/i18n/config'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type Props = { params: Promise<{ locale: string; slug: string }> }

/**
 * A programme's page (REQ-ACA-02..09). The route fetches the published course for the locale and
 * hands it to the matn/hashiya detail component.
 */
export default async function CoursePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [course, dict] = await Promise.all([queryCourseBySlug(slug, locale), getDictionary(locale)])
  if (!course) notFound()

  return (
    <main className="container pt-12 pb-0 md:pt-20">
      <CourseDetail course={course} locale={locale} dict={dict} />
    </main>
  )
}

const queryCourseBySlug = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'courses',
    locale,
    depth: 1,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return {}
  const course = await queryCourseBySlug(slug, rawLocale)
  if (!course) return {}
  return {
    title: course.title,
    description: course.summary ?? undefined,
  }
}
