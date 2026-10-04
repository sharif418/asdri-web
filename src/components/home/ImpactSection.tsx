import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Home, ImpactStat } from '@/payload-types'

import { SectionHead } from '@/components/site/SectionHead'
import { CountUp } from './CountUp'

type Stat = NonNullable<ImpactStat['stats']>[number]

type ImpactBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'impactStats' }
>

/**
 * The impact figures (REQ-HOME-02) as a ruled ledger strip under the hero — the front matter of
 * a report, not a dashboard: a full-bleed border-y band, the office's own heading set small as
 * the strip's label, and the figures in serif with full labels, hairlines between. The numbers
 * count up once on view. Figures come from the impact-stats global (GAP-C1: office confirms).
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
    <section className="border-y border-border" aria-label={block.heading}>
      <div className="container py-10 md:py-12">
        <SectionHead heading={block.heading} variant="label" />
        <dl className="mt-6 grid grid-cols-2 gap-x-8 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat: Stat, i: number) => (
            <div
              key={stat.id ?? i}
              className="border-border py-5 max-md:odd:border-r max-md:[&:nth-child(n+3)]:border-t md:py-6 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <dd className="font-serif text-h2 font-semibold text-foreground">
                <CountUp value={stat.value} locale={locale} />
                {stat.suffix && <span className="text-h3">{stat.suffix}</span>}
              </dd>
              <dt className="mt-1.5 text-caption leading-snug text-ink-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
