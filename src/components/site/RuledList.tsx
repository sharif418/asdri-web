import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * A ruled list of plain text lines (docs/08: "Lists are ruled rows") — objectives, eligibility,
 * format notes, training topics. Serif for reading matter, sans for the trainings' interface-ish
 * lines; the caller picks. Hairlines between items, no markers: these are not sequences.
 */
export function RuledList({
  items,
  serif = false,
  className,
}: {
  items: string[]
  serif?: boolean
  className?: string
}) {
  if (items.length === 0) return null
  return (
    <ul className={cn('divide-y divide-border border-y border-border', className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            'py-3 text-body',
            serif ? 'font-serif text-reading leading-relaxed' : 'text-body',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
