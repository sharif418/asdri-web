'use client'

import React from 'react'

import type { Locale } from '@/i18n/config'
import { formatNumber } from '@/utilities/formatNumber'

/**
 * A figure that counts up once when it enters the view (docs/05 §4 sanctions exactly this
 * motion, once, for counters). Runs on requestAnimationFrame with an ease-out curve, respects
 * prefers-reduced-motion by showing the final value immediately, and renders the exact final
 * value on the server so there is no hydration mismatch. Screen readers get the final value as
 * the accessible label; the running digits are decoration.
 */
export function CountUp({
  value,
  locale,
  className,
}: {
  value: number
  locale: Locale
  className?: string
}) {
  const [display, setDisplay] = React.useState(() => formatNumber(value, locale))
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        io.disconnect()
        const duration = 1100
        const start = performance.now()
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(formatNumber(Math.round(value * eased), locale))
          if (t < 1) requestAnimationFrame(step)
          else setDisplay(formatNumber(value, locale))
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, locale])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden>
        {display}
      </span>
      <span className="sr-only">{formatNumber(value, locale)}</span>
    </span>
  )
}
