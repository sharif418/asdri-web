import React from 'react'

import type { Dictionary } from '@/i18n/getDictionary'

import { Badge } from '@/components/ui/badge'
import { noticeStatus } from '@/utilities/noticeStatus'

/**
 * A notice's status chip (REQ-NOT-03), from the computed status. `new` is the gold badge — the
 * single illumination on a notice list, so nothing else gold may sit beside it.
 */
export function NoticeStatusBadge({
  notice,
  dict,
}: {
  notice: {
    statusOverride?: string | null
    publishedAt?: string | null
    activeFrom?: string | null
    activeUntil?: string | null
  }
  dict: Dictionary['notices']
}) {
  const status = noticeStatus(notice)
  if (!status) return null
  if (status === 'new') return <Badge variant="new">{dict.statusNew}</Badge>
  if (status === 'active')
    return (
      <Badge variant="active" dot>
        {dict.statusActive}
      </Badge>
    )
  return <Badge variant="closed">{dict.statusClosed}</Badge>
}
