import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Home } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { localizedHref } from '@/i18n/config'

type SupportBlock = Extract<NonNullable<Home['sections']>[number], { blockType: 'support' }>

/**
 * The single calm support band (REQ-HOME-10, phase 1 scope): the dark-green band shared with
 * the Foundation's site, one line about where the money goes, and the button leading to the
 * donation page. No fund grid, no calculator here yet — those belong to the donation module
 * with its own screens. The hero hairline is the home page's single gold (docs/05 §3b); the
 * button here is an outline-on-dark treatment — measured 17.6:1 text and border against the
 * band in rest and hover (review items 2–3; `secondary`'s dark text fails on its hover state
 * over the band, and the green `default` shape blends into the band at 1.15:1).
 */
export function SupportSection({
  block,
  locale,
  dict,
  donationsEnabled,
}: {
  block: SupportBlock
  locale: Locale
  dict: Dictionary
  donationsEnabled: boolean
}) {
  // The band leads somewhere only when the donation module is on; otherwise render nothing
  // rather than a dead-end button (ADR-0002).
  if (!donationsEnabled) return null

  return (
    <section className="bg-primary-deep py-14 text-primary-foreground md:py-16">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="font-serif text-h3 font-semibold text-primary-foreground">
              {block.heading}
            </h2>
            {block.body && (
              <p className="mt-3 max-w-[68ch] text-small leading-relaxed text-primary-foreground/85">
                {block.body}
              </p>
            )}
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/50 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href={localizedHref(locale, '/donate')}>{block.ctaLabel || dict.header.donate}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
