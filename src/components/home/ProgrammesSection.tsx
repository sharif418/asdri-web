import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Course, Home } from '@/payload-types'

import { localizedHref } from '@/i18n/config'

type ProgrammesBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'programmes' }
>

/**
 * The six featured programmes (REQ-HOME-04) — the one place on the site where cards belong: a
 * true set of equal items, one-pixel border, no shadow. Duration, one-sentence summary and a
 * plain "details" link; the link says what happens.
 */
export function ProgrammesSection({
  block,
  courses,
  locale,
  dict,
}: {
  block: ProgrammesBlock
  courses: Course[]
  locale: Locale
  dict: Dictionary
}) {
  if (courses.length === 0) return null

  return (
    <section className="border-y border-border bg-paper-2 py-16 md:py-20" aria-label={block.heading}>
      <div className="container">
        <h2 className="text-h3">{block.heading}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {courses.map((course) => (
            <li
              key={course.id}
              className="flex flex-col rounded-sm border border-border bg-card p-5 md:p-6"
            >
              <h3 className="font-serif text-h4 font-semibold">
                <Link
                  href={localizedHref(locale, `/academics/courses/${course.slug}`)}
                  className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {course.title}
                </Link>
              </h3>
              {course.format?.durationLabel && (
                <p className="mt-1 text-caption text-ink-muted">{course.format.durationLabel}</p>
              )}
              {course.summary && (
                <p className="mt-3 flex-1 text-small text-ink-muted">{course.summary}</p>
              )}
              <div className="mt-5">
                <Link
                  href={localizedHref(locale, `/academics/courses/${course.slug}`)}
                  className="text-small font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
                >
                  {dict.common.readMore}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
