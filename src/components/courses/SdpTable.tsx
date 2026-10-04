import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Course } from '@/payload-types'

import { formatNumber } from '@/utilities/formatNumber'

/**
 * The student development programmes table (REQ-ACA-11): programme, objective, activities,
 * hours, outcome — ruled rows on desktop, stacked blocks on a phone. Non-credit: hours, not
 * marks. Shown on the PYS course page and the Student Development page.
 */
export type SdpLabels = {
  program: string
  objective: string
  activities: string
  hours: string
  outcome: string
}

export function SdpTable({
  rows,
  labels,
  locale,
}: {
  rows: NonNullable<Course['sdp']>['rows']
  labels: SdpLabels
  locale: Locale
}) {
  if (!rows || rows.length === 0) return null

  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-small">
          <thead>
            <tr className="rule-ink border-b text-left text-caption text-ink-muted">
              <th scope="col" className="py-2 pr-4 font-medium">
                {labels.program}
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                {labels.objective}
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                {labels.activities}
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">
                {labels.hours}
              </th>
              <th scope="col" className="py-2 font-medium">
                {labels.outcome}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.id} className="align-top">
                <td className="py-3 pr-4 font-serif text-body">{r.title}</td>
                <td className="py-3 pr-4 text-ink-muted">{r.objective}</td>
                <td className="py-3 pr-4 text-ink-muted">{r.activities}</td>
                <td className="py-3 pr-4 text-right">
                  {typeof r.hours === 'number' ? formatNumber(r.hours, locale) : ''}
                </td>
                <td className="py-3 text-ink-muted">{r.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-border border-t md:hidden">
        {rows.map((r) => (
          <li key={r.id} className="py-4">
            <p className="font-serif text-body">{r.title}</p>
            {r.objective && <p className="mt-1 text-caption text-ink-muted">{r.objective}</p>}
            {r.activities && <p className="mt-0.5 text-caption text-ink-muted">{r.activities}</p>}
            <p className="mt-2 text-caption">
              {typeof r.hours === 'number' && `${labels.hours} ${formatNumber(r.hours, locale)}`}
              {r.outcome ? `, ${r.outcome}` : ''}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
