import Link from 'next/link'
import React from 'react'

import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import type { Media, Notice } from '@/payload-types'
import { Home } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { HeroMargin } from './HeroMargin'
import { VideoPoster } from './VideoPoster'
import { localizedHref } from '@/i18n/config'
import { cn } from '@/utilities/ui'

type HeroBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'hero' }
>

/**
 * The hero (REQ-HOME-01, docs/08 "Hero") laid out as the frontispiece of a kitab: the matn on
 * the left carries the institute's name set large in serif (the client's own choice of
 * headline), the one gold hairline, the statement of purpose and two actions. Above the name,
 * on the phone only, stands the Foundation line with the brand-green mark — the one
 * credibility cue a first-time visitor must not miss; from md up the masthead carries it, so
 * it is not repeated here. The hashiya on the right is the live note (HeroMargin): the open
 * admission notice as a slip, or the standing admission pages. No counter bar, no pattern.
 */
export function HeroSection({
  block,
  locale,
  dict,
  prospectusUrl,
  admissionNotice,
  admissionNote,
  parentLine,
}: {
  block: HeroBlock
  locale: Locale
  dict: Dictionary
  prospectusUrl: string | null
  admissionNotice: Notice | null
  admissionNote: string | null
  parentLine: string | null
}) {
  const poster =
    block.posterImage && typeof block.posterImage === 'object'
      ? (block.posterImage as Media)
      : null

  return (
    <section className="container pt-10 pb-16 md:pt-16 md:pb-20 lg:pb-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-8">
          {parentLine && (
            <p className="mb-4 flex items-center gap-2 font-sans text-caption text-ink-muted md:hidden">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand-green" />
              {parentLine}
            </p>
          )}
          <h1 className="text-display max-w-[20ch]">{block.heading}</h1>
          <span className={cn('illumination', 'mt-6 md:mt-7')} aria-hidden />
          {block.tagline && <p className="reading mt-6 md:mt-7">{block.tagline}</p>}
          <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
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
        </div>

        <aside className="lg:col-span-4" aria-label={dict.home.marginLabel}>
          {block.videoUrl && (
            <div className="mb-8">
              <VideoPoster videoUrl={block.videoUrl} poster={poster} label={dict.home.introVideo} />
            </div>
          )}
          <HeroMargin
            notice={admissionNotice}
            admissionNote={admissionNote}
            locale={locale}
            dict={dict}
          />
        </aside>
      </div>
    </section>
  )
}
