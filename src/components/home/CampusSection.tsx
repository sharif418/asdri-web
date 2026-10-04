import NextImage from 'next/image'
import React from 'react'

import type { Home, Media } from '@/payload-types'

import { SectionHead } from '@/components/site/SectionHead'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'

export type CampusBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'campusLife' }
>

/**
 * Campus life (REQ-HOME-07) as a glossary: the activity as the headword in the margin column,
 * its description as the gloss beside it — the kitab's own page shape, applied to the client's
 * own list of regular activities. The client's document marks photo slots; the optional images
 * sit above their item's text once photos arrive (GAP-C6). Until then the list is typographic.
 */
export function CampusSection({ block }: { block: CampusBlock }) {
  const items = block.items ?? []
  if (items.length === 0) return null

  return (
    <section className="border-y border-border bg-paper-2 py-16 md:py-24" aria-label={block.heading}>
      <div className="container">
        <SectionHead heading={block.heading} />
        {block.intro && (
          <p className="mt-6 max-w-[62ch] text-body leading-relaxed text-ink-muted">
            {block.intro}
          </p>
        )}
        <ul className="mt-10 grid gap-x-12 gap-y-0 md:mt-12 md:grid-cols-2">
          {items.map((item, i) => {
            const image =
              item.image && typeof item.image === 'object' ? (item.image as Media) : null
            const hasImage = Boolean(image?.url)
            return (
              <li
                key={item.id ?? i}
                className={cn(
                  'grid gap-4 border-t border-border py-8',
                  !hasImage && 'md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-6',
                )}
              >
                {image?.url && (
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-sm border border-border">
                    <NextImage
                      src={getMediaUrl(image.url, image.updatedAt)}
                      alt={image.alt || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover"
                    />
                  </span>
                )}
                {/* Headword in the margin column, gloss beside it: two grid children, so the
                    text never collapses into the 11rem headword column. With an image the
                    image takes the margin and the text stacks beside it. */}
                {hasImage ? (
                  <div className="min-w-0">
                    <h3 className="font-serif text-h4 font-semibold md:pt-1">{item.title}</h3>
                    <p className="mt-2 text-small leading-relaxed text-ink-muted">{item.body}</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-serif text-h4 font-semibold md:pt-1">{item.title}</h3>
                    <p className="min-w-0 text-small leading-relaxed text-ink-muted md:pt-1.5">
                      {item.body}
                    </p>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
