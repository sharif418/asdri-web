import React from 'react'

import { CampusSection } from './CampusSection'
import { HeroSection } from './HeroSection'
import { ImpactSection } from './ImpactSection'
import { NoticesSection } from './NoticesSection'
import { PeopleSection } from './PeopleSection'
import { ProgrammesSection } from './ProgrammesSection'
import { SupportSection } from './SupportSection'
import { VisionSection } from './VisionSection'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Course, Home, Person } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Renders the home global's sections in order (docs/02). Sections whose modules do not exist
 * yet — refutations, media hub, fatwa (REQ-HOME-05, 08, 11) — render nothing while they are
 * off, no matter what their config holds; nothing is faked.
 */
export async function HomeSections({
  home,
  locale,
  dict,
}: {
  home: Home
  locale: Locale
  dict: Dictionary
}) {
  const sections = home.sections ?? []
  if (sections.length === 0) return null

  // Shared data for the sections that need it
  const payload = await getPayload({ config: configPromise })
  const [settings, stats, featuredCourses, featuredPeople] = await Promise.all([
    getCachedGlobal('site-settings', 1, locale)(),
    getCachedGlobal('impact-stats', 0, locale)(),
    payload.find({
      collection: 'courses',
      locale,
      depth: 0,
      limit: 6,
      pagination: false,
      sort: 'order',
      where: { and: [{ featured: { equals: true } }, { listingStatus: { equals: 'active' } }] },
    }),
    payload.find({
      collection: 'people',
      locale,
      depth: 1,
      limit: 6,
      pagination: false,
      sort: 'order',
      where: { featuredOnHome: { equals: true } },
    }),
  ])

  const features = settings.features ?? {}
  const prospectus =
    settings.prospectus && typeof settings.prospectus === 'object' ? settings.prospectus : null
  const prospectusUrl =
    prospectus && typeof prospectus === 'object' && 'url' in prospectus
      ? ((prospectus as { url?: string }).url ?? null)
      : null

  return (
    <>
      {sections.map((section, i) => {
        if (!section.enabled) return null

        switch (section.blockType) {
          case 'hero':
            return (
              <HeroSection
                key={section.id ?? i}
                block={section}
                locale={locale}
                dict={dict}
                prospectusUrl={prospectusUrl}
              />
            )
          case 'impactStats':
            return (
              <ImpactSection
                key={section.id ?? i}
                block={section}
                stats={(stats.stats ?? []) as never}
                locale={locale}
              />
            )
          case 'vision':
            return <VisionSection key={section.id ?? i} block={section} />
          case 'programmes':
            return (
              <ProgrammesSection
                key={section.id ?? i}
                block={section}
                courses={featuredCourses.docs as Course[]}
                locale={locale}
                dict={dict}
              />
            )
          case 'notices':
            return (
              <NoticesSection
                key={section.id ?? i}
                block={section}
                locale={locale}
                dict={dict}
              />
            )
          case 'campusLife':
            return <CampusSection key={section.id ?? i} block={section} />
          case 'people':
            return (
              <PeopleSection
                key={section.id ?? i}
                block={section}
                people={featuredPeople.docs as Person[]}
                locale={locale}
              />
            )
          case 'support':
            return (
              <SupportSection
                key={section.id ?? i}
                block={section}
                locale={locale}
                dict={dict}
                donationsEnabled={features.donations !== false}
              />
            )
          // Pending modules: configured, switchable, and silent until their modules exist.
          case 'refutations':
          case 'mediaHub':
          case 'fatwa':
          default:
            return null
        }
      })}
    </>
  )
}
