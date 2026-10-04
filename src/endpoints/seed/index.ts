import type { Payload, PayloadRequest } from 'payload'

import { navigationSeed } from './navigation'
import { seedCourses } from './courses'
import { peopleSeed, seedPeople } from './people'
import { siteSettingsSeed } from './site-settings'
import { impactStatsSeed } from './impact-stats'
import { seedNotices } from './notices'

/**
 * Starter content for the institute (ADR-0002): site settings, navigation and impact figures in
 * both locales, taken verbatim from docs/source. Idempotent: running it again overwrites the three
 * globals with the same values. It never touches collections, so editors' content is safe.
 *
 * Localised sub-fields inside non-localised arrays need the same row ids in every locale, so the
 * Bangla pass writes first and the English pass reuses the generated ids by position.
 */
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding ASDRI site globals…')

  await seedGlobal(payload, req, 'site-settings', siteSettingsSeed.bn, siteSettingsSeed.en)
  await seedGlobal(payload, req, 'navigation', navigationSeed.bn, navigationSeed.en)
  await seedGlobal(payload, req, 'impact-stats', impactStatsSeed.bn, impactStatsSeed.en)
  await seedPeople(payload, req, peopleSeed)
  await seedCourses(payload, req)
  await seedNotices(payload, req)

  payload.logger.info(
    'Seeded site-settings, navigation, impact-stats, people, courses and sample notices (bn + en).',
  )
}

type Row = Record<string, unknown>

async function seedGlobal(
  payload: Payload,
  req: PayloadRequest,
  slug: 'site-settings' | 'navigation' | 'impact-stats',
  bn: Row,
  en: Row,
) {
  await payload.updateGlobal({
    slug,
    data: bn as never,
    locale: 'bn',
    req,
    context: { disableRevalidate: true },
  })
  const saved = (await payload.findGlobal({ slug, locale: 'bn', depth: 0, req })) as unknown as Row
  await payload.updateGlobal({
    slug,
    data: mergeIds(en, saved) as never,
    locale: 'en',
    req,
    context: { disableRevalidate: true },
  })
}

/** Copy array row ids from `source` into `target` by position, recursively. */
export function mergeIds(target: unknown, source: unknown): unknown {
  if (Array.isArray(target) && Array.isArray(source)) {
    return target.map((row, i) => mergeIds(row, source[i]))
  }
  if (isObject(target) && isObject(source)) {
    const out: Row = { ...target }
    if (typeof source.id === 'string' && out.id === undefined) out.id = source.id
    for (const key of Object.keys(out)) {
      if (key in source) out[key] = mergeIds(out[key], source[key])
    }
    return out
  }
  return target
}

function isObject(value: unknown): value is Row {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
