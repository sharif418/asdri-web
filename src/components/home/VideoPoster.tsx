'use client'

import { Play } from 'lucide-react'
import React, { useState } from 'react'

import type { Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

/**
 * The hero's optional intro video (REQ-HOME-01): a quiet poster frame that swaps to the
 * embedded player on click — no autoplay, no third-party script until the visitor asks for it.
 */
export function VideoPoster({
  videoUrl,
  poster,
  label,
}: {
  videoUrl: string
  poster?: Media | number | null
  label: string
}) {
  const [playing, setPlaying] = useState(false)

  const embedId = youtubeId(videoUrl)
  if (!embedId) return null

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    )
  }

  const posterUrl =
    poster && typeof poster === 'object' && poster.url ? getMediaUrl(poster.url, poster.updatedAt) : null
  const posterImage = posterUrl ?? `https://i.ytimg.com/vi/${embedId}/hqdefault.jpg`

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-md border border-border bg-primary-deep"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube poster, fixed box */}
      <img
        src={posterImage}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-90"
        loading="lazy"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-background/90 text-primary-deep">
          <Play className="size-6 translate-x-0.5" aria-hidden />
        </span>
      </span>
      <span className="sr-only">{label}</span>
    </button>
  )
}

function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  )
  return match ? (match[1] as string) : null
}
