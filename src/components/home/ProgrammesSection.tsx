import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Course, Home } from '@/payload-types'

import { SectionHead } from '@/components/site/SectionHead'
import { Button } from '@/components/ui/button'
import { localizedHref } from '@/i18n/config'

type ProgrammesBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'programmes' }
>

/**
 * The featured programmes (REQ-HOME-04) as an index with a flagship, not a card grid: the
 * institute's principal long programme leads — set large under a heavy ink rule, with its facts
 * in the margin the way a course page carries them (matn and hasiya) — and the remaining
 * programmes follow as ruled index rows, a table of contents for what the institute offers.
 * Which course leads is the office's choice: the first active long-term course in the course
 * order (the `order` field), falling back to the first featured course when there is no
 * long-term one.
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

  const flagship = courses.find((course) => course.type === 'long') ?? courses[0]
  const rest = courses.filter((course) => course.id !== flagship.id)
  const flagshipHref = localizedHref(locale, `/academics/courses/${flagship.slug}`)
  const facts = [
    flagship.format?.durationLabel && { term: dict.courses.durationLabel, detail: flagship.format.durationLabel },
    flagship.format?.residential && {
      term: dict.courses.formatLabel,
      detail: dict.courses.residentialLabels[flagship.format.residential],
    },
    flagship.format?.gender && {
      term: dict.courses.studentsLabel,
      detail: dict.courses.genderLabels[flagship.format.gender],
    },
  ].filter(Boolean) as { term: string; detail: string }[]

  return (
    <section
      className="border-y border-border bg-paper-2 py-16 md:py-24"
      aria-label={block.heading}
    >
      <div className="container">
        <SectionHead
          heading={block.heading}
          action={{ href: localizedHref(locale, '/academics/courses'), label: dict.home.seeAllCourses }}
        />

        <div className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-12 lg:gap-x-10">
          {/* The flagship programme: the matn, under a heavy ink rule like a kitab's section opening. */}
          <article className="border-t-2 border-foreground pt-6 md:pt-8 lg:col-span-7">
            <p className="font-sans text-caption text-ink-muted">{dict.home.flagshipProgramme}</p>
            <h3 className="mt-3 text-h2">
              <Link
                href={flagshipHref}
                className="text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {flagship.title}
              </Link>
            </h3>
            {flagship.summary && (
              <p className="mt-4 max-w-[60ch] text-body leading-relaxed text-ink-muted">
                {flagship.summary}
              </p>
            )}
            <div className="mt-7">
              <Button asChild variant="outline">
                <Link href={flagshipHref}>{dict.common.readMore}</Link>
              </Button>
            </div>
          </article>

          {/* The flagship's facts: the hashiya. */}
          {facts.length > 0 && (
            <dl className="grid grid-cols-1 gap-0 divide-y divide-border border-y border-border self-start font-sans text-small sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:col-span-5 lg:mt-1 lg:grid-cols-1 lg:divide-x-0 lg:divide-y lg:border-t-0 lg:border-l lg:pl-8">
              {facts.map((fact) => (
                <div key={fact.term} className="py-3 sm:px-4 sm:first:pl-0 lg:px-0">
                  <dt className="text-caption text-ink-muted">{fact.term}</dt>
                  <dd className="mt-0.5 font-medium text-foreground">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* The rest of the offer: a ruled index, two columns on wider screens. */}
        {rest.length > 0 && (
          <ul className="mt-12 grid gap-x-10 md:mt-16 md:grid-cols-2">
            {rest.map((course) => (
              <li key={course.id} className="border-t border-border py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-serif text-h4 font-semibold">
                    <Link
                      href={localizedHref(locale, `/academics/courses/${course.slug}`)}
                      className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {course.title}
                    </Link>
                  </h4>
                  {course.format?.durationLabel && (
                    <span className="shrink-0 font-sans text-caption text-ink-muted">
                      {course.format.durationLabel}
                    </span>
                  )}
                </div>
                {course.summary && (
                  <p className="mt-2 max-w-[60ch] text-small leading-relaxed text-ink-muted">
                    {course.summary}
                  </p>
                )}
                <Link
                  href={localizedHref(locale, `/academics/courses/${course.slug}`)}
                  className="mt-3 inline-block text-small font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
                >
                  {dict.common.readMore}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
