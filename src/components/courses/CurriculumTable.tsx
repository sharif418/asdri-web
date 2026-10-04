import React from 'react'

import type { Locale } from '@/i18n/config'

import { formatNumber } from '@/utilities/formatNumber'

/**
 * The ruled kitab table (docs/05 §5, docs/08): the curriculum as a manuscript table on desktop —
 * hairlines, code in the margin position, serif course titles, numbers right-aligned — and as
 * stacked rows on a phone. One component for every curriculum table on the site (course pages,
 * the student development page, the /design specimen). Columns appear only where the rows carry
 * them (credits for credit courses, hours for the non-credit supplementary table).
 *
 * GAP-C2: totals are computed from these rows, never typed in.
 */
export type CurriculumRowData = {
  id?: string | null
  code?: string | null
  title: string
  modules: string[]
  credits?: number | null
  hours?: number | null
  marks?: number | null
}

export type CurriculumTableLabels = {
  code: string
  course: string
  modules: string
  credits: string
  hours: string
  marks: string
  total: string
}

export function CurriculumTable({
  rows,
  labels,
  locale,
}: {
  rows: CurriculumRowData[]
  labels: CurriculumTableLabels
  locale: Locale
}) {
  const showCode = rows.some((r) => r.code)
  const showModules = rows.some((r) => (r.modules?.length ?? 0) > 0)
  const showCredits = rows.some((r) => typeof r.credits === 'number')
  const showHours = rows.some((r) => typeof r.hours === 'number')
  const showMarks = rows.some((r) => typeof r.marks === 'number')

  const totalCredits = rows.reduce((sum, r) => sum + (r.credits ?? 0), 0)
  const totalHours = rows.reduce((sum, r) => sum + (r.hours ?? 0), 0)
  const totalMarks = rows.reduce((sum, r) => sum + (r.marks ?? 0), 0)

  const totals: string[] = []
  if (showCredits) totals.push(`${labels.credits} ${formatNumber(totalCredits, locale)}`)
  if (showHours) totals.push(`${labels.hours} ${formatNumber(totalHours, locale)}`)
  if (showMarks) totals.push(`${labels.marks} ${formatNumber(totalMarks, locale)}`)

  return (
    <>
      {/* Desktop: the ruled kitab table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-small">
          <thead>
            <tr className="rule-ink border-b text-left text-caption text-ink-muted">
              {showCode && (
                <th scope="col" className="py-2 pr-4 font-medium">
                  {labels.code}
                </th>
              )}
              <th scope="col" className="py-2 pr-4 font-medium">
                {labels.course}
              </th>
              {showModules && (
                <th scope="col" className="py-2 pr-4 font-medium">
                  {labels.modules}
                </th>
              )}
              {showCredits && (
                <th scope="col" className="py-2 pr-4 text-right font-medium">
                  {labels.credits}
                </th>
              )}
              {showHours && (
                <th scope="col" className="py-2 pr-4 text-right font-medium">
                  {labels.hours}
                </th>
              )}
              {showMarks && (
                <th scope="col" className="py-2 text-right font-medium">
                  {labels.marks}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={r.id ?? i} className="align-top">
                {showCode && (
                  <td className="py-3 pr-4 whitespace-nowrap text-ink-muted">{r.code}</td>
                )}
                <td className="py-3 pr-4 font-serif text-body">{r.title}</td>
                {showModules && (
                  <td className="py-3 pr-4 text-ink-muted">{r.modules.join(', ')}</td>
                )}
                {showCredits && (
                  <td className="py-3 pr-4 text-right">
                    {typeof r.credits === 'number' ? formatNumber(r.credits, locale) : ''}
                  </td>
                )}
                {showHours && (
                  <td className="py-3 pr-4 text-right">
                    {typeof r.hours === 'number' ? formatNumber(r.hours, locale) : ''}
                  </td>
                )}
                {showMarks && (
                  <td className="py-3 text-right">
                    {typeof r.marks === 'number' ? formatNumber(r.marks, locale) : ''}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="rule-ink border-t font-medium">
              <td className="py-3 pr-4" colSpan={1 + (showModules ? 1 : 0) + (showCode ? 1 : 0)}>
                {labels.total}
              </td>
              {showCredits && <td className="py-3 pr-4 text-right">{formatNumber(totalCredits, locale)}</td>}
              {showHours && <td className="py-3 pr-4 text-right">{formatNumber(totalHours, locale)}</td>}
              {showMarks && <td className="py-3 text-right">{formatNumber(totalMarks, locale)}</td>}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Phone: each row becomes a stacked block, the code in the margin position */}
      <ul className="divide-y divide-border border-t md:hidden">
        {rows.map((r, i) => (
          <li key={r.id ?? i} className={showCode ? 'grid grid-cols-[5.5rem_1fr] gap-x-3 py-4' : 'py-4'}>
            {showCode ? (
              <span className="text-caption text-ink-muted">{r.code}</span>
            ) : null}
            <div>
              <p className="font-serif text-body">{r.title}</p>
              {r.modules.length > 0 && (
                <p className="mt-1 text-caption text-ink-muted">{r.modules.join(', ')}</p>
              )}
              <p className="mt-2 text-caption">
                {[
                  typeof r.credits === 'number' && `${labels.credits} ${formatNumber(r.credits, locale)}`,
                  typeof r.hours === 'number' && `${labels.hours} ${formatNumber(r.hours, locale)}`,
                  typeof r.marks === 'number' && `${labels.marks} ${formatNumber(r.marks, locale)}`,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </div>
          </li>
        ))}
        <li className="flex flex-wrap gap-x-3 border-t border-foreground py-3 text-small font-medium">
          <span>{labels.total}</span>
          <span>{totals.join(', ')}</span>
        </li>
      </ul>
    </>
  )
}
