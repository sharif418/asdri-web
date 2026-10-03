import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/getDictionary'

import { formatNumber } from '@/utilities/formatNumber'

/**
 * The quiet month archive (REQ-NOT-06): month-year links with counts, one line per month,
 * hairline-ruled. Following a month link filters the board to that month.
 */
export function NoticeArchive({
  months,
  locale,
  dict,
  basePath,
  activeMonth,
}: {
  months: { key: string; year: number; month: number; count: number }[]
  locale: Locale
  dict: Dictionary['notices']
  basePath: string
  activeMonth?: string
}) {
  if (months.length === 0) return null

  const monthName = (year: number, month: number) => {
    const tag = locale === 'bn' ? 'bn-BD-u-nu-beng' : 'en-GB'
    return new Intl.DateTimeFormat(tag, { month: 'long', year: 'numeric' })
      .format(new Date(Date.UTC(year, month - 1, 1)))
      .replace(/\u200e/g, '')
  }

  return (
    <section className="rule mt-16 pt-8" aria-labelledby="notice-archive">
      <h2 id="notice-archive" className="text-h3">
        {dict.archiveHeading}
      </h2>
      <ul className="mt-5 divide-y divide-border border-y border-border">
        {months.map((m) => {
          const active = activeMonth === m.key
          const href = `${basePath}?month=${m.key}`
          return (
            <li key={m.key} className="flex items-baseline justify-between gap-4 py-3">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? 'text-body font-medium text-primary underline underline-offset-4'
                    : 'text-body text-foreground underline-offset-4 hover:text-primary hover:underline'
                }
              >
                {monthName(m.year, m.month)}
              </Link>
              <span className="text-caption text-ink-muted">
                {dict.archiveCount(formatNumber(m.count, locale))}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
