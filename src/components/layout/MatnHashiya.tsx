import { cn } from '@/utilities/ui'
import * as React from 'react'

/**
 * The site's reading layout (docs/08-design-plan.md): a main text column (matn) and a margin
 * column (hashiya) that carries structural information: codes, credits, dates, authors, related
 * items. On desktop the margin sits to the right and stays in view; on mobile it folds above
 * the text as a compact block so the structure is read first.
 */
export function MatnHashiya({
  children,
  margin,
  className,
}: {
  children: React.ReactNode
  margin?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('grid gap-y-8 lg:grid-cols-12 lg:gap-x-10', className)}>
      {margin && (
        <aside className="order-first lg:order-none lg:col-span-3 lg:col-start-10">
          <div className="rule pt-4 lg:sticky lg:top-24">{margin}</div>
        </aside>
      )}
      <div className="lg:col-span-8 lg:row-start-1">{children}</div>
    </div>
  )
}

/** A labelled fact in the margin: "ক্রেডিট — ১৭". Label and value, sans, small. */
export function MarginFact({
  label,
  children,
  className,
}: {
  label: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('py-2.5 text-small', className)}>
      <dt className="text-caption text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-foreground">{children}</dd>
    </div>
  )
}

/** Wraps MarginFact rows in a definition list with hairlines between rows. */
export function MarginFacts({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <dl className={cn('divide-y divide-border', className)}>{children}</dl>
}
