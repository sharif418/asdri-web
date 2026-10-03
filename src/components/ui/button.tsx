'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

/**
 * Buttons (docs/08-design-plan.md). Sans-serif interface type, 44px default height for touch,
 * small radius. `illuminated` is the gold variant and is the one gold element on a screen that
 * uses it (typically the Donate action); never place two on one view.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans text-small font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-deep',
        secondary: 'bg-primary-soft text-primary-deep hover:bg-primary/15 dark:text-primary',
        outline:
          'border border-foreground/25 bg-transparent text-foreground hover:border-foreground/60 hover:bg-paper-2',
        ghost: 'text-foreground hover:bg-paper-2',
        link: 'h-auto px-0 text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary',
        illuminated: 'bg-accent text-foreground hover:brightness-95 dark:text-background',
        destructive: 'bg-error text-destructive-foreground hover:brightness-90',
      },
      size: {
        clear: '',
        default: 'h-11 px-5',
        sm: 'h-9 px-3.5 text-caption',
        lg: 'h-12 px-7 text-body',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
