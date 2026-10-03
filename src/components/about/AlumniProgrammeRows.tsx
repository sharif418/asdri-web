import React from 'react'

import type { Locale } from '@/i18n/config'
import type { AlumniBatch } from '@/payload-types'

import { formatNumber } from '@/utilities/formatNumber'

/**
 * One programme's batches (REQ-ABT-04): batch rows as a small ledger — the document's own batch
 * label on the left, the graduate count on the right, an ink rule above the computed total
 * (GAP-C1: totals are computed from the rows, never typed in, so the office can confirm them).
 */
export function AlumniProgrammeRows({
  programme,
  batches,
  locale,
  totalLabel,
  graduatesCount,
}: {
  programme: string
  batches: AlumniBatch[]
  locale: Locale
  totalLabel: string
  graduatesCount: (n: string) => string
}) {
  const total = batches.reduce((sum, b) => sum + (b.graduates ?? 0), 0)
  return (
    <div className="mt-10">
      <h3 className="font-serif text-h4 font-semibold">{programme}</h3>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {batches.map((batch) => (
          <li key={batch.id} className="flex flex-wrap gap-x-6 gap-y-1 py-3">
            <span className="min-w-0 flex-1 text-body">
              {batch.batchLabel}
              {batch.note && <span className="text-ink-muted"> {batch.note}</span>}
            </span>
            <span className="text-body text-ink-muted">
              {graduatesCount(formatNumber(batch.graduates ?? 0, locale))}
            </span>
          </li>
        ))}
        <li className="rule-ink flex flex-wrap gap-x-6 gap-y-1 border-t py-3 font-medium">
          <span className="min-w-0 flex-1">{totalLabel}</span>
          <span>{graduatesCount(formatNumber(total, locale))}</span>
        </li>
      </ul>
    </div>
  )
}
