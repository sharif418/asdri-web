'use client'

import React, { useState } from 'react'

import type { Notice } from '@/payload-types'

import { NoticeStatusBadge } from '@/components/notices/NoticeStatusBadge'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { localizedHref } from '@/i18n/config'
import { formatDate } from '@/utilities/formatNumber'
import type { Locale } from '@/i18n/config'

type Tab = 'all' | 'admission' | 'academic' | 'recruitment'

const TABS: Tab[] = ['all', 'admission', 'academic', 'recruitment']

/**
 * The home's latest-notices tabs (REQ-HOME-06): plain category tabs — no tab chrome, no client
 * fetching. All lists arrive as props; selecting a tab swaps the visible list. Keyboard use
 * follows the tabs pattern (arrow keys move between tabs), and the active tab is announced.
 */
export function NoticeTabs({
  notices,
  locale,
  dict,
  boardHref,
  boardLabel,
}: {
  notices: Record<Tab, Notice[]>
  locale: Locale
  dict: {
    boardTitle: string
    allCategories: string
    categoryLabels: { admission: string; recruitment: string; academic: string; general: string }
    statusNew: string
    statusActive: string
    statusClosed: string
    emptyBody: string
  }
  boardHref: string
  boardLabel: string
}) {
  const [tab, setTab] = useState<Tab>('all')
  const list = notices[tab] ?? []

  return (
    <div>
      <div role="tablist" aria-label={dict.boardTitle} className="flex flex-wrap gap-x-5 gap-y-2">
        {TABS.map((key) => {
          const selected = tab === key
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`home-notice-tab-${key}`}
              aria-selected={selected}
              aria-controls="home-notice-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(key)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault()
                  const next =
                    TABS[(TABS.indexOf(tab) + (event.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]
                  setTab(next)
                  document.getElementById(`home-notice-tab-${next}`)?.focus()
                }
              }}
              className={
                selected
                  ? 'text-small font-medium text-primary underline underline-offset-4'
                  : 'text-small text-ink-muted underline-offset-4 hover:text-primary hover:underline'
              }
            >
              {key === 'all' ? dict.allCategories : dict.categoryLabels[key]}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id="home-notice-panel"
        aria-labelledby={`home-notice-tab-${tab}`}
        tabIndex={-1}
      >
        {list.length === 0 ? (
          <p className="mt-5 py-6 text-small text-ink-muted">{dict.emptyBody}</p>
        ) : (
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {list.map((notice) => (
              <li
                key={notice.id}
                className="grid gap-2 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-6"
              >
                <time
                  dateTime={notice.publishedAt ?? undefined}
                  className="text-caption text-ink-muted sm:pt-1"
                >
                  {notice.publishedAt ? formatDate(notice.publishedAt, locale) : ''}
                </time>
                <Link
                  href={localizedHref(locale, `/notices/${notice.slug}`)}
                  className="font-serif text-body text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {notice.title}
                </Link>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <Badge variant="primary">{dict.categoryLabels[notice.category]}</Badge>
                  <NoticeStatusBadge
                  notice={notice}
                  labels={{
                    new: dict.statusNew,
                    active: dict.statusActive,
                    closed: dict.statusClosed,
                  }}
                />
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <Link
            href={boardHref}
            className="text-small font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
          >
            {boardLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
