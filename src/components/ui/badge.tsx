import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

/**
 * Status and category chips. Notice statuses (REQ-NOT-03) map to `new` / `active` / `closed`.
 * `new` uses gold: on a notice list it is the screen's single illumination, so no other gold
 * element should appear beside it. Sentence case text; badges never wrap.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-px font-sans text-caption font-medium [&_svg]:size-3.5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        neutral: 'border-border bg-paper-2 text-ink-muted',
        primary: 'border-primary/25 bg-primary-soft text-primary-deep dark:text-primary',
        outline: 'border-border bg-transparent text-foreground',
        new: 'border-accent/50 bg-accent-soft text-accent-foreground',
        active: 'border-success/30 bg-success-soft text-success',
        closed: 'border-border bg-transparent text-ink-muted',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
)

export interface BadgeProps
  extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
  /** Small dot before the label, for live statuses. */
  dot?: boolean
}

export function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

export { badgeVariants }
