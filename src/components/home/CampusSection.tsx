import NextImage from 'next/image'
import React from 'react'

import type { Home, Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export type CampusBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'campusLife' }
>

/**
 * Campus life (REQ-HOME-07) as a ruled two-column list — the client's document describes each
 * activity and marks photo slots; the optional images sit beside their item once photos arrive
 * (GAP-C6). Until then the list is typographic: serif activity names, quiet descriptions,
 * hairlines between real units.
 */
export function CampusSection({ block }: { block: CampusBlock }) {
  const items = block.items ?? []
  if (items.length === 0) return null

  return (
    <section className="border-y border-border bg-paper-2 py-16 md:py-20">
      <div className="container">
        <h2 className="text-h3">{block.heading}</h2>
        {block.intro && (
          <p className="mt-4 max-w-[60ch] text-body leading-relaxed text-ink-muted">
            {block.intro}
          </p>
        )}
        <ul className="mt-8 grid gap-x-10 gap-y-0 md:grid-cols-2">
          {items.map((item, i) => {
            const image =
              item.image && typeof item.image === 'object' ? (item.image as Media) : null
            return (
              <li
                key={item.id ?? i}
                className="grid gap-4 border-t border-border py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-8"
              >
                {image?.url && (
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-sm border border-border">
                    <NextImage
                      src={getMediaUrl(image.url, image.updatedAt)}
                      alt={image.alt || item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 256px"
                      className="object-cover"
                    />
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="font-serif text-h4 font-semibold">{item.title}</h3>
                  <p className="mt-2 max-w-[60ch] text-body leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
