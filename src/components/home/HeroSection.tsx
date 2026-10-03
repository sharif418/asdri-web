import Link from 'next/link'
import React from 'react'

import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import type { Media } from '@/payload-types'
import { Home } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { VideoPoster } from './VideoPoster'
import { localizedHref } from '@/i18n/config'

type HeroBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'hero' }
>

/**
 * The hero (REQ-HOME-01, docs/08 "Hero"): the headline is the hero and nothing competes with
 * it — the institute's name set large in serif, the one-line statement of purpose beneath, a
 * single gold hairline as the illumination, two actions, and optionally the intro video as a
 * poster that plays on click. No counter bar here; the impact figures come further down.
 */
export function HeroSection({
  block,
  locale,
  dict,
  prospectusUrl,
}: {
  block: HeroBlock
  locale: Locale
  dict: Dictionary
  prospectusUrl: string | null
}) {
  const poster =
    block.posterImage && typeof block.posterImage === 'object'
      ? (block.posterImage as Media)
      : null

  return (
    <section className="container pt-16 pb-14 md:pt-28 md:pb-20">
      <h1 className="text-display max-w-4xl">{block.heading}</h1>
      <span className="illumination mt-7" aria-hidden />
      {block.tagline && <p className="reading mt-7">{block.tagline}</p>}
      <div className="mt-9 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={localizedHref(locale, '/academics/courses')}>
            {dict.home.exploreCourses}
          </Link>
        </Button>
        {prospectusUrl && (
          <Button asChild size="lg" variant="outline">
            <a href={prospectusUrl} target="_blank" rel="noopener noreferrer">
              {dict.home.prospectus}
            </a>
          </Button>
        )}
      </div>
      {block.videoUrl && (
        <div className="mt-12 max-w-2xl">
          <VideoPoster
            videoUrl={block.videoUrl}
            poster={poster}
            label={dict.home.introVideo}
          />
        </div>
      )}
    </section>
  )
}
