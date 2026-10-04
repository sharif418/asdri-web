import { FileText, Pin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Notice } from '@/payload-types'

import { NoticeStatusBadge } from './NoticeStatusBadge'
import { Badge } from '@/components/ui/badge'
import { localizedHref } from '@/i18n/config'
import { formatDate } from '@/utilities/formatNumber'

/**
 * A notice as a ruled row on the board (REQ-NOT-02): date, serif title, category and status
 * badges — scannable in a list of fifty. Pinned notices carry a small pin mark and sort first.
 */
export function NoticeRow({
  notice,
  locale,
  dict,
  labels,
}: {
  notice: Notice
  locale: Locale
  dict: { pinnedLabel: string; categoryLabels: Record<string, string> }
  labels: { new: string; active: string; closed: string }
}) {
  const hasAttachment = (notice.attachments ?? []).length > 0

  return (
    <li className="grid gap-2 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-6">
      <time
        dateTime={notice.publishedAt ?? undefined}
        className="text-caption text-ink-muted sm:pt-1"
      >
        {notice.publishedAt ? formatDate(notice.publishedAt, locale) : ''}
      </time>
      <div className="min-w-0">
        <Link
          href={localizedHref(locale, `/notices/${notice.slug}`)}
          className="font-serif text-body text-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          {notice.pinned && (
            <span className="mr-1 inline-flex translate-y-px items-center text-ink-muted">
              <Pin className="size-3.5" aria-hidden />
              <span className="sr-only">{dict.pinnedLabel}</span>
            </span>
          )}
          {notice.title}
        </Link>
        {hasAttachment && (
          <p className="mt-0.5 flex items-center gap-1 text-caption text-ink-muted">
            <FileText className="size-3.5" aria-hidden />
            PDF
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Badge variant="primary">{dict.categoryLabels[notice.category] ?? notice.category}</Badge>
        <NoticeStatusBadge notice={notice} labels={labels} />
      </div>
    </li>
  )
}
