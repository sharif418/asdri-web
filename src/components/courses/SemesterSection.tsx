import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Course } from '@/payload-types'

import { CurriculumTable, type CurriculumTableLabels } from './CurriculumTable'

/**
 * One curriculum section as printed in the client's document: a semester (or the supplementary
 * table) with its title, sub-label, duration, explanatory note, and the ruled kitab table.
 * Hairlines separate real units; totals come from the rows (GAP-C2).
 */
export function SemesterSection({
  semester,
  labels,
  locale,
}: {
  semester: NonNullable<Course['semesters']>[number]
  labels: CurriculumTableLabels
  locale: Locale
}) {
  const rows = (semester.rows ?? []).map((row) => ({
    id: row.id,
    code: row.code ?? null,
    title: row.title,
    modules: (row.modules ?? []).map((m) => m.value).filter((v): v is string => Boolean(v)),
    credits: row.credits ?? null,
    hours: row.hours ?? null,
    marks: row.marks ?? null,
  }))

  return (
    <section className="rule pt-8 first:border-t-0 first:pt-0">
      {semester.title && <h3 className="text-h3">{semester.title}</h3>}
      {(semester.subtitle || semester.durationLabel) && (
        <p className={semester.title ? 'mt-1 text-caption text-ink-muted' : 'text-caption text-ink-muted'}>
          {[semester.subtitle, semester.durationLabel].filter(Boolean).join(', ')}
        </p>
      )}
      {semester.note && (
        <p className="mt-4 max-w-[68ch] text-small text-ink-muted">{semester.note}</p>
      )}
      <div className="mt-6">
        <CurriculumTable rows={rows} labels={labels} locale={locale} />
      </div>
    </section>
  )
}
