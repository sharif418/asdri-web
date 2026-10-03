import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Person } from '@/payload-types'

/**
 * People pages are ISR (revalidate 600); publishing a person refreshes the directory, the
 * leadership page and the person's profile in both locales at once (docs/02 route inventory).
 */
const personPaths = (slug: string) => [
  `/academics/faculty`,
  `/en/academics/faculty`,
  `/about/leadership`,
  `/en/about/leadership`,
  `/academics/faculty/${slug}`,
  `/en/academics/faculty/${slug}`,
]

export const revalidatePeople: CollectionAfterChangeHook<Person> = ({
  doc,
  previousDoc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc._status === 'published') {
    for (const path of personPaths(doc.slug)) revalidatePath(path)
  }
  if (
    !context.disableRevalidate &&
    previousDoc?._status === 'published' &&
    previousDoc?.slug !== doc.slug
  ) {
    for (const path of personPaths(previousDoc.slug)) revalidatePath(path)
  }
  return doc
}

export const revalidatePeopleDelete: CollectionAfterDeleteHook<Person> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    for (const path of personPaths(doc.slug)) revalidatePath(path)
  }
  return doc
}
