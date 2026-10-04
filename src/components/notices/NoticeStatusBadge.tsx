import React from 'react'

import { Badge } from '@/components/ui/badge'
import { noticeStatus } from '@/utilities/noticeStatus'

/**
 * A notice's status chip (REQ-NOT-03), from the computed status. `new` is the gold badge — the
 * single illumination on a notice list, so nothing else gold may sit beside it. Plain string
 * labels so the component can render inside client components too.
 */
export function NoticeStatusBadge({
  notice,
  labels,
}: {
  notice: {
    statusOverride?: string | null
    publishedAt?: string | null
    activeFrom?: string | null
    activeUntil?: string | null
  }
  labels: { new: string; active: string; closed: string }
}) {
  const status = noticeStatus(notice)
  if (!status) return null
  if (status === 'new') return <Badge variant="new">{labels.new}</Badge>
  if (status === 'active')
    return (
      <Badge variant="active" dot>
        {labels.active}
      </Badge>
    )
  return <Badge variant="closed">{labels.closed}</Badge>
}
