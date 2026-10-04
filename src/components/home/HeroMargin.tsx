import Link from 'next/link'
import React from 'react'

import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import type { Notice } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { localizedHref } from '@/i18n/config'
import { formatDate } from '@/utilities/formatNumber'
import { noticeStatus } from '@/utilities/noticeStatus'

/**
 * The hero's margin note (hashiya), set as a slip: a small bordered panel on the card surface,
 * the way a notice is pinned into the margin of a noticeboard. With an open admission notice it
 * carries the title, the facts (status, deadline, published) and the apply action; without one
 * it is the office's own admission note over the three standing admission pages. The facts stay
 * plain text — the gold "new" badge would be a second illumination beside the hero hairline.
 */
export function HeroMargin({
  notice,
  admissionNote,
  locale,
  dict,
}: {
  notice: Notice | null
  admissionNote: string | null
  locale: Locale
  dict: Dictionary
}) {
  if (notice) {
    const status = noticeStatus(notice)
    const statusLabel =
      status === 'new'
        ? dict.notices.statusNew
        : status === 'active'
          ? dict.notices.statusActive
          : status === 'closed'
            ? dict.notices.statusClosed
            : null
    const noticeHref = localizedHref(locale, `/notices/${notice.slug}`)
    const applyHref = status !== 'closed' ? notice.applyLink?.trim() || null : null
    const applyIsExternal = applyHref ? /^https?:\/\//.test(applyHref) : false

    return (
      <div className="rounded-sm border border-border bg-card p-5 md:p-6">
        <p className="font-sans text-caption text-ink-muted">{dict.home.admissionSlipTitle}</p>
        <h2 className="mt-2 font-serif text-h4 font-semibold leading-snug">
          <Link
            href={noticeHref}
            className="text-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {notice.title}
          </Link>
        </h2>
        <dl className="mt-4 divide-y divide-border border-y border-border font-sans text-small">
          {statusLabel && <Fact term={dict.notices.statusLabel} detail={statusLabel} />}
          {notice.activeUntil && (
            <Fact term={dict.home.deadline} detail={formatDate(notice.activeUntil, locale)} />
          )}
          {notice.publishedAt && (
            <Fact term={dict.notices.publishedLabel} detail={formatDate(notice.publishedAt, locale)} />
          )}
        </dl>
        {applyHref && (
          <Button asChild className="mt-5 w-full">
            {applyIsExternal ? (
              <a href={applyHref} target="_blank" rel="noopener noreferrer">
                {dict.notices.applyOnline}
              </a>
            ) : (
              <Link href={localizedHref(locale, applyHref)}>{dict.notices.applyOnline}</Link>
            )}
          </Button>
        )}
        <p className="mt-3 text-center">
          <Button asChild variant="link" className="text-small">
            <Link href={noticeHref}>{dict.home.readNotice}</Link>
          </Button>
        </p>
      </div>
    )
  }

  const links = [
    { href: '/admissions', label: dict.admissions.processTitle },
    { href: '/admissions/scholarships', label: dict.admissions.scholarshipsTitle },
    { href: '/notices?category=admission', label: dict.home.allAdmissionNotices },
  ]

  return (
    <div className="rounded-sm border border-border bg-card p-5 md:p-6">
      <p className="font-sans text-caption text-ink-muted">{dict.home.marginLabel}</p>
      {admissionNote && (
        <p className="mt-2 font-sans text-small leading-relaxed text-ink-muted">{admissionNote}</p>
      )}
      <ul className="mt-4 divide-y divide-border border-y border-border font-sans">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={localizedHref(locale, link.href)}
              className="block py-3 text-small font-medium text-foreground underline-offset-4 hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Fact({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid grid-cols-[minmax(7rem,2fr)_3fr] gap-x-4 py-2.5">
      <dt className="text-ink-muted">{term}</dt>
      <dd className="text-foreground">{detail}</dd>
    </div>
  )
}
