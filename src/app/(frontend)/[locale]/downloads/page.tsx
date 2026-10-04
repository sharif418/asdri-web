import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload, type Where } from 'payload'
import React from 'react'

import { DownloadFilters } from '@/components/downloads/DownloadFilters'
import { DownloadRow } from '@/components/downloads/DownloadRow'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale, localizedHref } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { isFeatureEnabled } from '@/utilities/featureFlag'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; q?: string }>
}

const CATEGORIES = ['syllabus', 'form', 'dawah-material', 'prospectus', 'other'] as const
type Category = (typeof CATEGORIES)[number]

/**
 * The download centre (REQ-ACA-12): syllabi and curriculum PDFs, admission and administrative
 * forms, and the dawah materials the menu points at (?category=dawah-material). Ruled rows,
 * plain category filters and a keyword search, all URL-driven like the notice board.
 */

export default async function DownloadsPage({ params, searchParams }: Props) {
  const { locale: rawLocale } = await params
  const { category, q } = await searchParams
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [payload, settings, dict] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedGlobal('site-settings', 0, locale)(),
    getDictionary(locale),
  ])
  if (!isFeatureEnabled(settings, 'downloads')) notFound()

  const activeCategory = CATEGORIES.includes(category as Category)
    ? (category as Category)
    : undefined
  const search = q?.trim() || undefined

  const where: Where = {}
  if (activeCategory) where.category = { equals: activeCategory }
  if (search) where.title = { contains: search }

  const downloads = await payload.find({
    collection: 'downloads',
    locale,
    depth: 1,
    limit: 200,
    pagination: false,
    draft: false,
    sort: ['order', '-updatedAt'],
    where,
  })

  const isSearching = Boolean(search)
  const addHref = activeCategory
    ? `/admin/collections/downloads/create?category=${activeCategory}`
    : '/admin/collections/downloads/create'

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.downloads.title}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      <DownloadFilters
        dict={dict.downloads}
        activeCategory={activeCategory}
        query={search}
        basePath={localizedHref(locale, '/downloads')}
      />

      <div className="mt-8">
        {downloads.docs.length === 0 ? (
          isSearching ? (
            <EmptyState
              title={dict.downloads.emptySearchTitle}
              description={dict.downloads.emptySearchBody}
            />
          ) : (
            <EmptyState
              title={dict.downloads.emptyTitle}
              description={dict.downloads.emptyBody}
              action={<StaffAddAction href={addHref} label={dict.downloads.addDownload} />}
            />
          )
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {downloads.docs.map((download) => (
              <DownloadRow key={download.id} download={download} dict={dict.downloads} />
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.downloads.title }
}
