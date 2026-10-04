import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Course } from '@/payload-types'

/**
 * Course pages are ISR; publishing a course refreshes the index and the course page in both
 * locales. The home page (module D) reads featured courses on its own revalidation cycle.
 */
const coursePaths = (slug: string) => [
  `/academics/courses`,
  `/en/academics/courses`,
  `/academics/courses/${slug}`,
  `/en/academics/courses/${slug}`,
]

export const revalidateCourses: CollectionAfterChangeHook<Course> = ({
  doc,
  previousDoc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc._status === 'published') {
    for (const path of coursePaths(doc.slug)) revalidatePath(path)
  }
  if (
    !context.disableRevalidate &&
    previousDoc?._status === 'published' &&
    previousDoc?.slug !== doc.slug
  ) {
    for (const path of coursePaths(previousDoc.slug)) revalidatePath(path)
  }
  return doc
}

export const revalidateCoursesDelete: CollectionAfterDeleteHook<Course> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    for (const path of coursePaths(doc.slug)) revalidatePath(path)
  }
  return doc
}
