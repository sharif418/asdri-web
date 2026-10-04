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
 * the Foundation's site. The heading sits small as the band's label and the office's own line —
 * where the Zakat goes — is raised to the statement scale, so the sentence a donor came to read
 * is the sentence the band says loudest. The button is an outline-on-dark treatment — measured
 * 17.6:1 text and border against the band in rest and hover (review items 2–3; `secondary`'s
 * dark text fails on its hover state over the band, and the green `default` shape blends into
 * the band at 1.15:1). The hero hairline remains the home page's single gold on light ground;
 * this band's weight is carried by the green itself.
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
    <section className="bg-primary-deep py-16 text-band-foreground md:py-24">
      <div className="container">
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-8">
            <h2 className="font-sans text-caption font-medium text-band-foreground/70">
              {block.heading}
            </h2>
            {block.body && (
              <p className="mt-5 max-w-[34ch] font-serif text-statement text-band-foreground">
                {block.body}
              </p>
            )}
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-band-foreground/50 text-band-foreground hover:border-band-foreground hover:bg-primary-foreground/10 hover:text-band-foreground"
            >
              <Link href={localizedHref(locale, '/donate')}>{block.ctaLabel || dict.header.donate}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
