/**
 * A notice's displayed status (REQ-NOT-03), computed from the dates on every read — never stored,
 * so it can never go stale. The office can override it per notice.
 *
 *  - closed: the window's end has passed, or the override says so
 *  - new:    published within the last 7 days, or the window has not opened yet
 *  - active: inside a window that has been open longer than that
 *  - null:   an ordinary dated notice (the specimen's rule: not everything needs a badge)
 */
export type NoticeStatus = 'new' | 'active' | 'closed' | null

const NEW_DAYS = 7
const DAY_MS = 24 * 60 * 60 * 1000

export function noticeStatus(notice: {
  statusOverride?: string | null
  publishedAt?: string | null
  activeFrom?: string | null
  activeUntil?: string | null
}): NoticeStatus {
  if (notice.statusOverride === 'new' || notice.statusOverride === 'active' || notice.statusOverride === 'closed') {
    return notice.statusOverride
  }

  const now = Date.now()
  const until = notice.activeUntil ? new Date(notice.activeUntil).getTime() : null
  const from = notice.activeFrom ? new Date(notice.activeFrom).getTime() : null
  const published = notice.publishedAt ? new Date(notice.publishedAt).getTime() : null

  if (until !== null && until < now) return 'closed'
  if (published !== null && now - published <= NEW_DAYS * DAY_MS) return 'new'
  if (from !== null && from > now) return 'new'
  if (from !== null || until !== null) return 'active'
  return null
}
