import Link from 'next/link'
import React from 'react'

import type { Dictionary } from '@/i18n/getDictionary'

import { cn } from '@/utilities/ui'

/**
 * Plain filter links over the board (REQ-NOT-02) and a keyword search — no tabs chrome, no
 * client state: category and query travel in the URL so the board stays a server page. The
 * search is a plain GET form, so it works without scripting.
 */
export function NoticeFilters({
  dict,
  activeCategory,
  query,
  basePath,
}: {
  dict: Dictionary['notices']
  activeCategory?: string
  query?: string
  basePath: string
}) {
  const categories = ['admission', 'recruitment', 'academic', 'general'] as const
  const linkFor = (category?: string) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (query) params.set('q', query)
    const qs = params.toString()
    return qs ? `${basePath}?${qs}` : basePath
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <nav aria-label={dict.boardTitle}>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {[undefined, ...categories].map((category) => {
            const active = (activeCategory ?? '') === (category ?? '')
            const label = category ? dict.categoryLabels[category] : dict.allCategories
            return (
              <li key={category ?? 'all'}>
                <Link
                  href={linkFor(category)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'text-small underline-offset-4 hover:text-primary hover:underline',
                    active ? 'font-medium text-primary underline' : 'text-ink-muted',
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <form role="search" action={basePath} method="get" className="flex items-start gap-2">
        {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
        <label className="sr-only" htmlFor="notice-search">
          {dict.searchLabel}
        </label>
        <input
          id="notice-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder={dict.searchPlaceholder}
          className="h-11 w-full min-w-0 rounded-md border border-border bg-card px-3.5 text-small text-foreground placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:w-64"
        />
      </form>
    </div>
  )
}
