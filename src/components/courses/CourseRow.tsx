import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Course } from '@/payload-types'

import { localizedHref } from '@/i18n/config'

/**
 * A course as a ruled row in the index (REQ-ACA-01): the title in the serif face with its Arabic
 * name, the one-sentence summary in plain text, and the duration in the catalog position. A
 * course announced without content yet (GAP-C4) shows the marked placeholder instead of facts.
 */
export function CourseRow({
  course,
  locale,
  pendingLabel,
}: {
  course: Course
  locale: Locale
  pendingLabel: string
}) {
  const pending = course.listingStatus === 'draft'

  return (
    <li className="grid gap-1 py-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_auto] md:items-baseline md:gap-x-8">
      <div className="min-w-0">
        <Link
          href={localizedHref(locale, `/academics/courses/${course.slug}`)}
          className="font-serif text-h4 font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          {course.title}
        </Link>
        {course.arabicTitle && (
          <p lang="ar" className="mt-0.5 text-small text-ink-muted">
            {course.arabicTitle}
          </p>
        )}
      </div>
      <p className="text-small text-ink-muted md:pt-1">
        {pending ? pendingLabel : course.summary}
      </p>
      <p className="text-small text-ink-muted md:pt-1 md:text-right md:whitespace-nowrap">
        {pending ? null : course.format?.durationLabel}
      </p>
    </li>
  )
}
