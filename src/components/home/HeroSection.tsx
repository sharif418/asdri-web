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

type HeroBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'hero' }
>

/**
 * The hero (REQ-HOME-01, docs/08 "Hero") laid out as the first page of a kitab: the matn on the
 * left carries the institute's name set large in serif (the client's own choice of headline),
 * the one gold hairline, the statement of purpose and two actions; the hashiya on the right
 * carries what the margin always carried — the live note: the open admission notice, or the
 * standing admission pages, and the intro video once there is one. No counter bar here.
 */
export function HeroSection({
  block,
  locale,
  dict,
  prospectusUrl,
  admissionNotice,
  admissionNote,
}: {
  block: HeroBlock
  locale: Locale
  dict: Dictionary
  prospectusUrl: string | null
  admissionNotice: Notice | null
  admissionNote: string | null
}) {
  const poster =
    block.posterImage && typeof block.posterImage === 'object'
      ? (block.posterImage as Media)
      : null

  return (
    <section className="container pt-14 pb-16 md:pt-24 md:pb-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-8">
          <h1 className="text-display max-w-[20ch]">{block.heading}</h1>
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
        </div>

        <aside
          className="border-t border-border pt-8 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-2 lg:pl-8"
          aria-label={dict.home.marginLabel}
        >
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
