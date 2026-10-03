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
 * the Foundation's site, one line about where the money goes, and the one illuminated button
 * leading to the donation page. No fund grid, no calculator here yet — those belong to the
 * donation module with its own screens.
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
            <h2 className="font-serif text-h3 font-semibold">{block.heading}</h2>
            {block.body && (
              <p className="mt-3 max-w-[68ch] text-small leading-relaxed text-primary-foreground/85">
                {block.body}
              </p>
            )}
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Button asChild variant="illuminated" size="lg">
              <Link href={localizedHref(locale, '/donate')}>{block.ctaLabel || dict.header.donate}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
