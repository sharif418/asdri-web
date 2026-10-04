import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload, type Where } from 'payload'
import React from 'react'

import { NoticeArchive } from '@/components/notices/NoticeArchive'
import { NoticeFilters } from '@/components/notices/NoticeFilters'
import { NoticeRow } from '@/components/notices/NoticeRow'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { localizedHref, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; q?: string; month?: string }>
}

const CATEGORIES = ['admission', 'recruitment', 'academic', 'general'] as const
type Category = (typeof CATEGORIES)[number]

/**
 * The notice board (REQ-NOT-01, 02, 06): the institute's announcements — today scattered over
 * Facebook — as ruled rows with date, serif title, category and computed status badges. Plain
 * filter links, a keyword search and a quiet month archive; everything travels in the URL.
 */
export const revalidate = 600

export default async function NoticeBoardPage({ params, searchParams }: Props) {
  const { locale: rawLocale } = await params
  const { category, q, month } = await searchParams
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [payload, dict] = await Promise.all([getPayload({ config: configPromise }), getDictionary(locale)])
  const basePath = localizedHref(locale, '/notices')

  const activeCategory = CATEGORIES.includes(category as Category) ? (category as Category) : undefined
  const search = q?.trim() || undefined

  const where: Where = {}
  if (activeCategory) where.category = { equals: activeCategory }
  if (search) where.title = { contains: search }
  if (month && /^\d{4}-\d{2}$/.test(month)) {
    const start = new Date(`${month}-01T00:00:00Z`)
    const end = new Date(start)
    end.setUTCMonth(end.getUTCMonth() + 1)
    where.publishedAt = { greater_than_equal: start.toISOString(), less_than: end.toISOString() }
  }

  const [notices, allForArchive] = await Promise.all([
    payload.find({
      collection: 'notices',
      locale,
      depth: 0,
      limit: 200,
      pagination: false,
      sort: ['-pinned', '-publishedAt'],
      where,
    }),
    payload.find({
      collection: 'notices',
      locale,
      depth: 0,
      limit: 500,
      pagination: false,
      select: { publishedAt: true, pinned: true },
      sort: '-publishedAt',
    }),
  ])

  const monthCounts = new Map<string, { year: number; month: number; count: number }>()
  for (const notice of allForArchive.docs) {
    if (!notice.publishedAt) continue
    const date = new Date(notice.publishedAt)
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
    const entry = monthCounts.get(key) ?? { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, count: 0 }
    entry.count += 1
    monthCounts.set(key, entry)
  }
  const months = [...monthCounts.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([key, value]) => ({ key, ...value }))

  const isSearching = Boolean(search)

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.notices.boardTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      <NoticeFilters
        dict={dict.notices}
        activeCategory={activeCategory}
        query={search}
        basePath={basePath}
      />

      <div className="mt-8">
        {notices.docs.length === 0 ? (
          isSearching ? (
            <EmptyState
              title={dict.notices.emptySearchTitle}
              description={dict.notices.emptySearchBody}
            />
          ) : activeCategory ? (
            <EmptyState
              title={dict.notices.emptyTitle}
              description={dict.notices.emptyBody}
              action={
                <StaffAddAction
                  href={`/admin/collections/notices/create?category=${activeCategory}`}
                  label={dict.notices.addNotice}
                />
              }
            />
          ) : (
            <EmptyState
              title={dict.notices.emptyTitle}
              description={dict.notices.emptyBody}
              action={
                <StaffAddAction
                  href="/admin/collections/notices/create"
                  label={dict.notices.addNotice}
                />
              }
            />
          )
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {notices.docs.map((notice) => (
              <NoticeRow
                  key={notice.id}
                  notice={notice}
                  locale={locale}
                  dict={{
                    pinnedLabel: dict.notices.pinnedLabel,
                    categoryLabels: dict.notices.categoryLabels,
                  }}
                  labels={{
                    new: dict.notices.statusNew,
                    active: dict.notices.statusActive,
                    closed: dict.notices.statusClosed,
                  }}
                />
            ))}
          </ul>
        )}
      </div>

      <NoticeArchive
        months={months}
        locale={locale}
        dict={dict.notices}
        basePath={basePath}
        activeMonth={month}
      />
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.notices.boardTitle }
}
