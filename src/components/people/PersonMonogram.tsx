import React from 'react'

import type { Media, Person } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { nameMonogram } from '@/utilities/nameMonogram'

import NextImage from 'next/image'

/**
 * A person's mark: their photo when there is one, otherwise the monogram — a bordered disc with
 * the initial grapheme of their own name in the serif face (GAP-C5: no faculty photos yet, so the
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
  const box = size === 'lg' ? 'size-16' : 'size-12'
  const text = size === 'lg' ? 'text-h3' : 'text-body'
  const photo =
    person.photo && typeof person.photo === 'object' ? (person.photo as Media) : null

  if (photo?.url) {
    return (
      <span
        className={cn(
          'relative block shrink-0 overflow-hidden rounded-full border border-border',
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
        'flex items-center justify-center rounded-full border border-border bg-card font-serif font-semibold text-ink-muted select-none',
        box,
        text,
        className,
      )}
    >
      {nameMonogram(person.name)}
    </span>
  )
}
