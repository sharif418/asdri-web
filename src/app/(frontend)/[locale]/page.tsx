import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import type { Media } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { HomePlaceholder } from '@/components/site/HomePlaceholder'
import { isLocale } from '@/i18n/config'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/**
 * Home. Until the home blocks exist (assignment 6), the page renders an institutional placeholder
 * from site-settings and impact-stats. If an editor publishes a Pages document with slug "home",
 * that takes over.
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    locale,
    where: { slug: { equals: 'home' } },
  })
  const page = result.docs[0]

  if (page) {
    return (
      <article className="pt-16 pb-24">
        {draft && <LivePreviewListener />}
        <RenderHero {...page.hero} />
        <RenderBlocks blocks={page.layout} />
      </article>
    )
  }

  const [settings, stats] = await Promise.all([
    getCachedGlobal('site-settings', 1, locale)(),
    getCachedGlobal('impact-stats', 0, locale)(),
  ])
  const prospectus = settings.prospectus && typeof settings.prospectus === 'object' ? (settings.prospectus as Media) : null

  return (
    <HomePlaceholder
      locale={locale}
      name={settings.name}
      tagline={settings.tagline ?? null}
      prospectusUrl={prospectus?.url ?? null}
      stats={(stats.stats ?? []).map((s) => ({ label: s.label, value: s.value, suffix: s.suffix ?? '' }))}
    />
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    locale,
    where: { slug: { equals: 'home' } },
  })
  const page = result.docs[0]
  if (page) return generateMeta({ doc: page })
  const settings = await getCachedGlobal('site-settings', 0, locale)()
  return { title: settings.name, description: settings.defaultDescription ?? settings.tagline ?? undefined }
}
