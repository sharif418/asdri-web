import { FileText, Printer } from 'lucide-react'
import React from 'react'

import type { Course, Download, Media } from '@/payload-types'
import type { Dictionary } from '@/i18n/getDictionary'

/**
 * A downloadable file as a ruled row (REQ-ACA-12): the title is the download itself — one
 * click, `download` attribute, no interstitial page — with the description under it and the
 * file facts as a quiet caption line. The category badge sits on the right like the notice
 * board's. Dawah materials marked printable carry the print note (free to download and print).
 */
export function DownloadRow({
  download,
  dict,
}: {
  download: Download
  dict: Dictionary['downloads']
}) {
  const file = typeof download.file === 'object' ? (download.file as Media) : null
  const course =
    download.course && typeof download.course === 'object' ? (download.course as Course) : null

  const kind =
    file?.mimeType === 'application/pdf'
      ? 'PDF'
      : (file?.filename?.split('.').pop()?.toUpperCase() ?? '')

  return (
    <li className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-6">
      <div className="min-w-0">
        {file?.url ? (
          <a
            href={file.url}
            download={file.filename ?? true}
            className="font-serif text-body text-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {download.title}
          </a>
        ) : (
          <span className="font-serif text-body text-foreground">{download.title}</span>
        )}
        {download.description && (
          <p className="mt-1 max-w-[60ch] text-small text-ink-muted">{download.description}</p>
        )}
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-muted">
          {kind && (
            <span className="flex items-center gap-1">
              <FileText className="size-3.5" aria-hidden />
              {kind}
            </span>
          )}
          {course && <span>{course.shortTitle || course.title}</span>}
          {download.printable && (
            <span className="flex items-center gap-1">
              <Printer className="size-3.5" aria-hidden />
              {dict.printableLabel}
            </span>
          )}
        </p>
      </div>
      <div className="sm:justify-self-end">
        <span className="text-caption text-ink-muted">
          {dict.categoryLabels[download.category] ?? download.category}
        </span>
      </div>
    </li>
  )
}
