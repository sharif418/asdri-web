'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { type Locale, localeNames, localizedHref, locales, stripLocale } from '@/i18n/config'
import { cn } from '@/utilities/ui'

/**
 * Language switch (REQ-GEN-01): two plain links, current one marked. Keeps the visitor on the
 * same page in the other language. Rendered as a <nav> with a label for screen readers.
 */
export function LocaleSwitcher({
  current,
  label,
  className,
  tone = 'ink',
}: {
  current: Locale
  label: string
  className?: string
  tone?: 'ink' | 'paper'
}) {
  const pathname = usePathname() || '/'
  const { path } = stripLocale(pathname)

  return (
    <nav aria-label={label} className={cn('flex items-center gap-1 text-caption', className)}>
      {locales.map((locale, i) => {
        const active = locale === current
        return (
          <React.Fragment key={locale}>
            {i > 0 && (
              <span
                aria-hidden
                className={tone === 'paper' ? 'text-band-foreground/40' : 'text-border'}
              >
                |
              </span>
            )}
            <Link
              href={localizedHref(locale, path)}
              hrefLang={locale}
              lang={locale}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'rounded-sm px-1.5 py-1 transition-colors',
                active
                  ? tone === 'paper'
                    ? 'font-semibold text-band-foreground'
                    : 'font-semibold text-primary'
                  : tone === 'paper'
                    ? 'text-band-foreground/75 hover:text-band-foreground'
                    : 'text-ink-muted hover:text-foreground',
              )}
            >
              {localeNames[locale]}
            </Link>
          </React.Fragment>
        )
      })}
    </nav>
  )
}
