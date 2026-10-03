import { cn } from '@/utilities/ui'
import * as React from 'react'

/**
 * Designed empty state (ADR-0002). Every list page renders this instead of a blank area when
 * the admin has not published anything yet. Plain words that say what will appear here and, for
 * staff, how to add it. No illustration, no mood copy: a ruled block with a heading and a line.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div role="status" className={cn('rule border-b border-border py-10 text-left', className)}>
      <h3 className="text-h4">{title}</h3>
      {description && <p className="mt-2 max-w-prose text-small text-ink-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
