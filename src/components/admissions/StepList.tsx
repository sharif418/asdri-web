import React from 'react'

import type { Locale } from '@/i18n/config'

import { formatNumber } from '@/utilities/formatNumber'

type Step = { id?: string | null; title?: string | null; body?: string | null }

/**
 * The five admission steps (REQ-ADM-01) — a real sequence, so the page numbers it, in Bengali
 * numerals in the Bangla locale (docs/05 §3a: numbers belong on sequences). The numeral sits in
 * its own narrow column the way a margin note does; the title and body read beside it.
 */
export function StepList({ steps, locale }: { steps: Step[]; locale: Locale }) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {steps.map((step, i) => (
        <li
          key={step.id ?? i}
          className="grid gap-1.5 py-6 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-x-5"
        >
          <span aria-hidden className="text-body text-ink-muted">
            {formatNumber(i + 1, locale)}
          </span>
          <div className="min-w-0">
            <h3 className="font-serif text-h4 font-semibold">{step.title}</h3>
            {step.body && (
              <p className="mt-2 max-w-[68ch] text-body leading-relaxed text-ink-muted">
                {step.body}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
