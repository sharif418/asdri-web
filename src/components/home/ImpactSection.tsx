import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Home, ImpactStat } from '@/payload-types'

type Stat = NonNullable<ImpactStat['stats']>[number]

import { formatCounter, formatNumber } from '@/utilities/formatNumber'

type ImpactBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'impactStats' }
>

/**
 * The impact figures (REQ-HOME-02) as a ruled row (docs/08: no counter bar in the hero) —
 * ordinary-sized numbers with full labels, hairlines between. The figures come from the
 * impact-stats global so the office edits them in one place. GAP-C1: values await confirmation.
 */
export function ImpactSection({
  block,
  stats,
  locale,
}: {
  block: ImpactBlock
  stats: Stat[]
  locale: Locale
}) {
  if (!stats || stats.length === 0) return null

  return (
    <section className="container pb-20" aria-label={block.heading}>
      <h2 className="text-h3">{block.heading}</h2>
      <dl className="mt-6 grid grid-cols-2 gap-x-8 border-y border-border md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat: Stat, i: number) => (
          <div
            key={stat.id ?? i}
            className="py-6 lg:border-l lg:border-border lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
          >
            <dd className="font-sans text-h3 font-medium text-foreground">
              {stat.suffix
                ? formatCounter(stat.value, locale, stat.suffix)
                : formatNumber(stat.value, locale)}
            </dd>
            <dt className="mt-1 text-caption text-ink-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
