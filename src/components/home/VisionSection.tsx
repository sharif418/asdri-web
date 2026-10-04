import React from 'react'

import type { Home } from '@/payload-types'

import { SectionHead } from '@/components/site/SectionHead'

type VisionBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'vision' }
>

/**
 * The vision (REQ-HOME-03) as the institute's charter: the heading set small as the label on
 * its rule, and the client's own statement — their words, not ours — raised to the statement
 * scale, the page's second typographic moment after the hero. The pillars follow as three
 * ruled columns (not numbered: they are dimensions, not a sequence). The Bangla pillar texts
 * are seeded drafts for the office to confirm (review item 10 of batch A).
 */
export function VisionSection({ block }: { block: VisionBlock }) {
  const pillars = block.pillars ?? []

  return (
    <section className="container py-20 md:py-28" aria-label={block.heading}>
      <SectionHead heading={block.heading} variant="label" rule />
      <p className="mt-8 max-w-[54ch] font-serif text-statement text-foreground md:mt-10">
        {block.statement}
      </p>
      {pillars.length > 0 && (
        <ul className="mt-12 grid gap-y-8 md:mt-16 md:grid-cols-3 md:gap-x-10 md:gap-y-0 md:border-t md:border-border md:pt-10">
          {pillars.map((pillar, i) => (
            <li
              key={pillar.id ?? i}
              className="border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:first:border-l-0 md:first:pl-0"
            >
              <h3 className="font-serif text-h4 font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-ink-muted">{pillar.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
