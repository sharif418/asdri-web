import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Notice } from '@/payload-types'

/**
 * Notice pages are ISR; publishing a notice refreshes the board, the archive counts and the
 * notice page in both locales. The home page reads the latest notices through its own cache.
 */
const noticePaths = (slug: string) => [
  `/notices`,
  `/en/notices`,
  `/notices/${slug}`,
  `/en/notices/${slug}`,
]

export const revalidateNotices: CollectionAfterChangeHook<Notice> = ({
  doc,
  previousDoc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc._status === 'published') {
    for (const path of noticePaths(doc.slug)) revalidatePath(path)
  }
  if (
    !context.disableRevalidate &&
    previousDoc?._status === 'published' &&
    previousDoc?.slug !== doc.slug
  ) {
    for (const path of noticePaths(previousDoc.slug)) revalidatePath(path)
  }
  return doc
}

export const revalidateNoticesDelete: CollectionAfterDeleteHook<Notice> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    for (const path of noticePaths(doc.slug)) revalidatePath(path)
  }
  return doc
}
