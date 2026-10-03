import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { Locale } from '@/i18n/config'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(
  slug: T,
  depth = 0,
  locale?: Locale,
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
    fallbackLocale: 'bn',
  })

  return global
}

/**
 * Returns an unstable_cache function keyed by slug + locale and tagged `global_<slug>` so the
 * globals' afterChange hooks can revalidate every locale at once.
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0, locale?: Locale) =>
  unstable_cache(async () => getGlobal<T>(slug, depth, locale), [slug, locale ?? 'all'], {
    tags: [`global_${slug}`],
  })
