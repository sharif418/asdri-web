import Link from 'next/link'
import React from 'react'

import type { Dictionary } from '@/i18n/getDictionary'

import { cn } from '@/utilities/ui'

/**
 * Plain filter links over the download centre (REQ-ACA-12) and a keyword search — the same
 * pattern as the notice board: category and query travel in the URL, the search is a plain GET
 * form, and the page stays a server page.
 */
export function DownloadFilters({
  dict,
  activeCategory,
  query,
  basePath,
}: {
  dict: Dictionary['downloads']
  activeCategory?: string
  query?: string
  basePath: string
}) {
  const categories = ['syllabus', 'form', 'dawah-material', 'prospectus', 'other'] as const
  const linkFor = (category?: string) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (query) params.set('q', query)
    const qs = params.toString()
    return qs ? `${basePath}?${qs}` : basePath
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <nav aria-label={dict.title}>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {[undefined, ...categories].map((category) => {
            const active = (activeCategory ?? '') === (category ?? '')
            const label = category ? dict.categoryLabels[category] : dict.allLabel
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
        <label className="sr-only" htmlFor="download-search">
          {dict.searchLabel}
        </label>
        <input
          id="download-search"
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
