import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Typographic wordmark. The institute has no logo file yet (GAP-B4), so the name itself is the
 * mark: serif, two lines on narrow screens, with the Foundation relationship line beneath. When
 * a logo is uploaded in site-settings it is shown beside the name, not instead of it.
 */
export function Brand({
  name,
  parentLine,
  href,
  logoUrl,
  logoAlt,
  compact = false,
  tone = 'ink',
  className,
  parentLineClassName,
}: {
  name: string
  parentLine?: string | null
  href: string
  logoUrl?: string | null
  logoAlt?: string | null
  compact?: boolean
  tone?: 'ink' | 'paper'
  className?: string
  /** Extra classes for the Foundation line, e.g. to hide it on narrow screens. */
  parentLineClassName?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4',
        tone === 'paper' ? 'text-band-foreground' : 'text-foreground',
        className,
      )}
    >
      {logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- CMS upload with unknown dimensions; sized by CSS
        <img
          src={logoUrl}
          alt={logoAlt ?? ''}
          className={cn('shrink-0', compact ? 'h-8' : 'h-10')}
        />
      )}
      <span className="flex flex-col">
        <span
          className={cn(
            'font-serif font-semibold leading-tight',
            compact ? 'whitespace-nowrap text-[1.05rem]' : 'text-[1.15rem] md:text-[1.35rem] lg:text-[1.5rem]',
          )}
        >
          {name}
        </span>
        {parentLine && !compact && (
          <span
            className={cn(
              'mt-1 inline-flex items-center gap-1.5 whitespace-nowrap text-caption',
              tone === 'paper' ? 'text-band-foreground/75' : 'text-ink-muted',
              parentLineClassName,
            )}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-brand-green" />
            {parentLine}
          </span>
        )}
      </span>
    </Link>
  )
}
