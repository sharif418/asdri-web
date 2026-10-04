import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { MarginFact, MarginFacts, MatnHashiya } from '@/components/layout/MatnHashiya'
import { NoticeStatusBadge } from '@/components/notices/NoticeStatusBadge'
import { Button } from '@/components/ui/button'
import type { Media } from '@/payload-types'
import { isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { formatDate } from '@/utilities/formatNumber'
import RichText from '@/components/RichText'

type Props = { params: Promise<{ locale: string; slug: string }> }

/**
 * A notice's page (REQ-NOT-04, 05) in the matn/hashiya layout: the announcement in the reading
 * column, the structure in the margin — published date, category, status, the attachments as
 * one-click downloads and the "fill the online form" action for admission and recruitment
 * notices. Works complete with no attachment and no body.
 */
export default async function NoticeDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [notice, dict] = await Promise.all([queryNoticeBySlug(slug, locale), getDictionary(locale)])
  if (!notice) notFound()

  const attachments = (notice.attachments ?? [])
    .map((a) => ({ ...a, file: typeof a.file === 'object' ? (a.file as Media) : null }))
    .filter((a) => a.file?.url)
  const applyHref = notice.applyLink?.trim() || null
  const applyIsInternal = applyHref ? applyHref.startsWith('/') : false

  return (
    <main className="container pt-12 pb-24 md:pt-20">
      <MatnHashiya
        margin={
          <>
            <MarginFacts>
              {notice.publishedAt && (
                <MarginFact label={dict.notices.publishedLabel}>
                  {formatDate(notice.publishedAt, locale)}
                </MarginFact>
              )}
              <MarginFact label={dict.notices.categoryLabel}>
                {dict.notices.categoryLabels[notice.category]}
              </MarginFact>
              <MarginFact label={dict.notices.statusLabel}>
                <NoticeStatusBadge
                  notice={notice}
                  labels={{
                    new: dict.notices.statusNew,
                    active: dict.notices.statusActive,
                    closed: dict.notices.statusClosed,
                  }}
                />
              </MarginFact>
            </MarginFacts>

            {attachments.length > 0 && (
              <div className="mt-6">
                <h2 className="text-caption text-ink-muted">{dict.notices.attachmentsLabel}</h2>
                <ul className="mt-2 space-y-2">
                  {attachments.map((attachment) => (
                    <li key={attachment.id}>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <a
                          href={attachment.file!.url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {attachment.label || attachment.file!.filename || 'PDF'}
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {applyHref && (
              <Button asChild className="mt-6 w-full">
                <a
                  href={applyHref}
                  {...(applyIsInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {dict.notices.applyOnline}
                </a>
              </Button>
            )}
          </>
        }
      >
        <article>
          <h1 className="text-h1">{notice.title}</h1>
          <span className="illumination mt-6" aria-hidden />

          {notice.body ? (
            <div className="reading mt-8 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:mt-[1em] [&_ol]:pl-6 [&_p]:leading-[1.8] [&_ul]:list-disc [&_ul]:mt-[1em] [&_ul]:pl-6">
              <RichText data={notice.body} enableProse={false} enableGutter={false} />
            </div>
          ) : (
            <p className="reading mt-8 text-ink-muted">{dict.notices.bodyPending}</p>
          )}
        </article>
      </MatnHashiya>
    </main>
  )
}

const queryNoticeBySlug = cache(async (slug: string, locale: (typeof locales)[number]) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'notices',
    locale,
    depth: 1,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return {}
  const notice = await queryNoticeBySlug(slug, rawLocale)
  if (!notice) return {}
  return { title: notice.title }
}
