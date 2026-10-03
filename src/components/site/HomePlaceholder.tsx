import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'

import { Button } from '@/components/ui/button'
import { localizedHref } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { formatCounter, formatNumber } from '@/utilities/formatNumber'

/**
 * Interim home (docs/08 "Hero"): the institute's name set large, the tagline as reading text,
 * one gold hairline, two actions, then the impact figures as a ruled row with full labels.
 * Replaced by editable home blocks in assignment 6; everything here already comes from Payload.
 */
export async function HomePlaceholder({
  locale,
  name,
  tagline,
  prospectusUrl,
  stats,
}: {
  locale: Locale
  name: string
  tagline: string | null
  prospectusUrl: string | null
  stats: { label: string; value: number; suffix: string }[]
}) {
  const dict = await getDictionary(locale)

  return (
    <main>
      <section className="container pt-16 pb-14 md:pt-28 md:pb-20">
        <h1 className="text-display max-w-4xl">{name}</h1>
        <span className="illumination mt-7" aria-hidden />
        {tagline && <p className="reading mt-7">{tagline}</p>}
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
      </section>

      {stats.length > 0 && (
        <section
          className="container pb-20"
          aria-label={locale === 'bn' ? 'এক নজরে' : 'At a glance'}
        >
          <dl className="grid grid-cols-2 gap-x-8 border-y border-border md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="py-6 lg:border-l lg:border-border lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <dd className="font-sans text-h3 font-medium text-foreground">
                  {s.suffix
                    ? formatCounter(s.value, locale, s.suffix)
                    : formatNumber(s.value, locale)}
                </dd>
                <dt className="mt-1 text-caption text-ink-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}
    </main>
  )
}
