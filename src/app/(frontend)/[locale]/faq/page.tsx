import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { FaqAccordion } from '@/components/faqs/FaqAccordion'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale, localizedHref } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { isFeatureEnabled } from '@/utilities/featureFlag'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

import type { Category } from '@/payload-types'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

/**
 * Frequently asked questions (REQ-ADM-04): category tabs as plain filter links (the client's
 * document names ভর্তি সংক্রান্ত, কোর্স সংক্রান্ত, অনুদানের নিয়মাবলি) and the answers in
 * accordions. Everything travels in the URL, so the page works like the notice board: a server
 * page, no client state. Rows carry their category label while every category is shown.
 */
export const revalidate = 600

export default async function FaqPage({ params, searchParams }: Props) {
  const { locale: rawLocale } = await params
  const { category } = await searchParams
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [payload, settings, dict] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedGlobal('site-settings', 0, locale)(),
    getDictionary(locale),
  ])
  if (!isFeatureEnabled(settings, 'faq')) notFound()

  const tabs = await payload.find({
    collection: 'categories',
    locale,
    depth: 0,
    limit: 50,
    pagination: false,
    sort: 'order',
    where: { kind: { equals: 'faq' } },
  })
  const activeTab = category ? tabs.docs.find((tab) => tab.slug === category) : undefined

  const faqs = await payload.find({
    collection: 'faqs',
    locale,
    depth: 1,
    limit: 200,
    pagination: false,
    sort: 'order',
    where: activeTab ? { 'category.id': { equals: activeTab.id } } : {},
  })

  const basePath = localizedHref(locale, '/faq')
  const items = faqs.docs.flatMap((faq) => {
    const tab = typeof faq.category === 'object' ? (faq.category as Category) : null
    return [
      {
        faq,
        categoryLabel: !activeTab && tab ? tab.title : undefined,
      },
    ]
  })

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.faq.title}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      <nav aria-label={dict.faq.title}>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <li>
            <Link
              href={basePath}
              aria-current={!activeTab ? 'page' : undefined}
              className={cn(
                'text-small underline-offset-4 hover:text-primary hover:underline',
                !activeTab ? 'font-medium text-primary underline' : 'text-ink-muted',
              )}
            >
              {dict.faq.allLabel}
            </Link>
          </li>
          {tabs.docs.map((tab) => {
            const active = activeTab?.id === tab.id
            return (
              <li key={tab.id}>
                <Link
                  href={`${basePath}?category=${tab.slug}`}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'text-small underline-offset-4 hover:text-primary hover:underline',
                    active ? 'font-medium text-primary underline' : 'text-ink-muted',
                  )}
                >
                  {tab.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-8 max-w-[68ch]">
        {items.length === 0 ? (
          <EmptyState
            title={dict.faq.emptyTitle}
            description={dict.faq.emptyBody}
            action={
              <StaffAddAction href="/admin/collections/faqs/create" label={dict.faq.addFaq} />
            }
          />
        ) : (
          <FaqAccordion items={items} />
        )}
      </div>
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.faq.title }
}
