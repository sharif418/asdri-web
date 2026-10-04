import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * The section-head device (docs/08 "Devices"): every home section is announced the way a
 * kitab announces a new section — a hairline rule, the heading in serif at the h2 step, and
 * the section's onward route right-aligned on the same line, like a running head with its
 * continuation reference. Two treatments:
 *   - rule + h2: for sections sitting on the plain page ground, where the section's own
 *     hairline is the boundary (band sections omit the rule — their band edge is the rule);
 *   - label: a caption-size sans heading for strips (the impact ledger) whose content is
 *     the point, not the heading.
 * The action is the section's "see all" route; it never repeats in the body below.
 */
export function SectionHead({
  heading,
  headingId,
  action = null,
  variant = 'h2',
  rule = false,
  className,
}: {
  heading: string
  headingId?: string
  action?: { href: string; label: string } | null
  variant?: 'h2' | 'label'
  rule?: boolean
  className?: string
}) {
  return (
    <div className={cn(rule && 'border-t border-border pt-4', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        {variant === 'label' ? (
          <h2
            id={headingId}
            className="font-sans text-caption font-medium text-ink-muted"
          >
            {heading}
          </h2>
        ) : (
          <h2 id={headingId} className="text-h2">
            {heading}
          </h2>
        )}
        {action && (
          <Link
            href={action.href}
            className="text-small font-medium text-primary underline-offset-4 hover:underline"
          >
            {action.label}
          </Link>
        )}
      </div>
    </div>
  )
}
