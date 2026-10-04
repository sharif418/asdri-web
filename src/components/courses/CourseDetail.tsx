import Link from 'next/link'
import React from 'react'

import { SemesterSection } from './SemesterSection'
import { SdpTable } from './SdpTable'
import { MarginFact, MarginFacts, MatnHashiya } from '@/components/layout/MatnHashiya'
import { RuledList } from '@/components/site/RuledList'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import type { Course } from '@/payload-types'
import { localizedHref } from '@/i18n/config'

/**
 * A course page in the matn/hashiya layout (REQ-ACA-02): the title and Arabic name head the
 * matn, the facts sit in the margin, and the document's sections follow in order — introduction,
 * objectives, format, eligibility, specialisations, the ruled curriculum tables, the student
 * development table, the trainings' topics and the Diploma's "what comes after". A course
 * published without content (GAP-C4) shows a marked placeholder instead of invented matter.
 */
export function CourseDetail({
  course,
  locale,
  dict,
}: {
  course: Course
  locale: Locale
  dict: Dictionary
}) {
  const t = dict.courses
  const isTraining = course.type === 'short'
  const pending = course.listingStatus === 'draft'

  const objectives = (course.objectives ?? []).map((o) => o.value).filter(Boolean)
  const eligibility = (course.eligibility ?? []).map((e) => e.value).filter(Boolean)
  const formatBullets = (course.format?.bullets ?? []).map((b) => b.value).filter(Boolean)
  const specialisations = course.specialisations?.items ?? []
  const topics = (course.topics?.items ?? []).map((i) => i.value).filter(Boolean)
  const outcomeItems = course.outcomes?.items ?? []

  const residential = course.format?.residential
  const gender = course.format?.gender

  return (
    <div className="pb-24">
      <MatnHashiya
        margin={
          <>
            <MarginFacts>
              {course.format?.durationLabel && (
                <MarginFact label={t.durationLabel}>{course.format.durationLabel}</MarginFact>
              )}
              {residential && (
                <MarginFact label={t.formatLabel}>
                  {t.residentialLabels[residential as keyof typeof t.residentialLabels] ??
                    t.residentialLabels.both}
                </MarginFact>
              )}
              {gender && (
                <MarginFact label={t.studentsLabel}>
                  {t.genderLabels[gender as keyof typeof t.genderLabels] ?? t.genderLabels.all}
                </MarginFact>
              )}
              {course.shortTitle && (
                <MarginFact label={t.codeLabel}>{course.shortTitle}</MarginFact>
              )}
            </MarginFacts>
            {!pending && (
              <Button asChild className="mt-6 w-full">
                <Link href={localizedHref(locale, '/admissions')}>{t.applyCta}</Link>
              </Button>
            )}
          </>
        }
      >
        <header>
          <h1 className="text-h1">{course.title}</h1>
          {course.arabicTitle && (
            <p lang="ar" className="mt-2 font-serif text-h4 font-normal text-ink-muted">
              {course.arabicTitle}
            </p>
          )}
          <span className="illumination mt-6" aria-hidden />
        </header>

        {pending ? (
          <div className="mt-8">
            <p className="font-serif text-h4 text-ink-muted">{t.pendingNote}</p>
            <p className="reading mt-4 text-ink-muted">{t.pendingBody}</p>
          </div>
        ) : (
          <>
            {course.intro && (
              <section className="mt-10">
                <h2 className="text-h3">
                  {isTraining ? t.trainingIntroHeading : t.introHeading}
                </h2>
                <p className="reading mt-4 whitespace-pre-line">{course.intro}</p>
              </section>
            )}

            {objectives.length > 0 && (
              <section className="mt-12">
                <h2 className="text-h3">{t.objectivesHeading}</h2>
                <RuledList items={objectives} serif className="mt-5" />
              </section>
            )}

            {formatBullets.length > 0 && (
              <section className="mt-12">
                <h2 className="text-h3">{t.formatHeading}</h2>
                <RuledList items={formatBullets} className="mt-5" />
              </section>
            )}

            {specialisations.length > 0 && (
              <section className="mt-12">
                <h2 className="text-h3">{t.specialisationsHeading}</h2>
                {course.specialisations?.lead && (
                  <p className="mt-3 text-small text-ink-muted">
                    {course.specialisations.lead}
                  </p>
                )}
                <ul className="mt-5 divide-y divide-border border-y border-border">
                  {specialisations.map((s) => (
                    <li key={s.id} className="flex flex-wrap items-baseline gap-x-3 py-3">
                      <span className="font-serif text-body">{s.name}</span>
                      {s.arabicName && (
                        <span lang="ar" className="text-body text-ink-muted">
                          {s.arabicName}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {eligibility.length > 0 && (
              <section className="mt-12">
                <h2 className="text-h3">
                  {isTraining ? t.applyEligibilityHeading : t.eligibilityHeading}
                </h2>
                <RuledList items={eligibility} serif className="mt-5" />
              </section>
            )}

            {(course.semesters ?? []).length > 0 && (
              <section className="mt-12">
                <h2 className="text-h3">{t.curriculumHeading}</h2>
                <div className="mt-6 space-y-8">
                  {(course.semesters ?? []).map((semester) => (
                    <SemesterSection
                      key={semester.id}
                      semester={semester}
                      labels={t.table}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            )}

            {(course.sdp?.rows ?? []).length > 0 && (
              <section className="mt-12">
                <h2 className="text-h3">{t.sdpHeading}</h2>
                {course.sdp?.note && (
                  <p className="mt-4 max-w-[68ch] text-small text-ink-muted">{course.sdp.note}</p>
                )}
                <div className="mt-6">
                  <SdpTable rows={course.sdp?.rows ?? []} labels={t.sdpTable} locale={locale} />
                </div>
              </section>
            )}

            {topics.length > 0 && (
              <section className="mt-12">
                <h2 className="text-h3">{course.topics?.label}</h2>
                <RuledList items={topics} serif className="mt-5" />
              </section>
            )}

            {outcomeItems.length > 0 && (
              <section className="mt-12">
                <h2 className="text-h3">{t.outcomesHeading}</h2>
                {course.outcomes?.intro && (
                  <p className="reading mt-4">{course.outcomes.intro}</p>
                )}
                <div className="mt-6 space-y-8">
                  {outcomeItems.map((item) => (
                    <article key={item.id} className="rule pt-6 first:border-t-0 first:pt-0">
                      <h3 className="font-serif text-h4 font-semibold">{item.heading}</h3>
                      <p className="reading mt-3">{item.body}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </MatnHashiya>
    </div>
  )
}
