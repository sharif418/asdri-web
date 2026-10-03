import React from 'react'

import type { Home } from '@/payload-types'

type VisionBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'vision' }
>

/**
 * The vision statement and its three pillars (REQ-HOME-03). The statement is the client's own
 * text in the reading column; the pillars — which the client's document gives in English only —
 * render as a ruled list when present. Not numbered: the pillars are not a sequence.
 */
export function VisionSection({ block }: { block: VisionBlock }) {
  const pillars = block.pillars ?? []

  return (
    <section className="container pb-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
        <h2 className="text-h3 lg:col-span-3">{block.heading}</h2>
        <div className="lg:col-span-9">
          <p className="reading">{block.statement}</p>
          {pillars.length > 0 && (
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {pillars.map((pillar, i) => (
                <li key={pillar.id ?? i} className="py-4">
                  <h3 className="font-serif text-h4 font-semibold">{pillar.title}</h3>
                  <p className="mt-1 max-w-[68ch] text-body text-ink-muted">{pillar.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
