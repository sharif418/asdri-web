'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

/**
 * The staff action inside a designed empty state (ADR-0002): hidden from visitors, revealed for
 * logged-in staff by asking Payload who is calling. Runs only where an empty state renders, so
 * it adds nothing to normal pages, and it works under ISR where a server-side user check would
 * be baked into the cached page.
 */
export function StaffAddAction({ href, label }: { href: string; label: string }) {
  const [isStaff, setIsStaff] = useState(false)

  useEffect(() => {
    let active = true
    fetch('/api/users/me', { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { user?: unknown } | null) => {
        if (active) setIsStaff(Boolean(data?.user))
      })
      .catch(() => {
        if (active) setIsStaff(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (!isStaff) return null

  return (
    <Button asChild variant="secondary">
      <a href={href}>{label}</a>
    </Button>
  )
}
