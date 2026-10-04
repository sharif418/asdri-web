import React from 'react'

import type { Media, Person } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { nameMonogram } from '@/utilities/nameMonogram'

import NextImage from 'next/image'

/**
 * A person's mark, set as a seal: their photo when there is one, otherwise a small square
 * panel with the initial grapheme of their own name in the serif face and a hairline border —
 * the shape of a seal (mohr) rather than an avatar disc (GAP-C5: no faculty photos yet, so the
 * monogram is the default view and must look intentional, not like a missing image).
 */
export function PersonMonogram({
  person,
  size = 'md',
  className,
}: {
  person: Pick<Person, 'name' | 'photo'>
  size?: 'md' | 'lg'
  className?: string
}) {
  const box = size === 'lg' ? 'size-14' : 'size-12'
  const text = size === 'lg' ? 'text-h4' : 'text-body'
  const photo =
    person.photo && typeof person.photo === 'object' ? (person.photo as Media) : null

  if (photo?.url) {
    return (
      <span
        className={cn(
          'relative block shrink-0 overflow-hidden rounded-sm border border-border',
          box,
          className,
        )}
      >
        <NextImage
          src={getMediaUrl(photo.url, photo.updatedAt)}
          alt={photo.alt || person.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className={cn(
        'flex items-center justify-center rounded-sm border border-border bg-card font-serif font-semibold text-ink-muted select-none',
        box,
        text,
        className,
      )}
    >
      {nameMonogram(person.name)}
    </span>
  )
}
