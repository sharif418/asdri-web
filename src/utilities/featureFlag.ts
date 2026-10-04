import type { SiteSetting } from '@/payload-types'

import type { FeatureKey } from '@/globals/SiteSettings'

/**
 * Module visibility (REQ-GEN-06): hidden modules disappear from navigation, sitemap and their
 * own pages — a direct visit to a switched-off module's route is a 404, not a broken page.
 */
export function isFeatureEnabled(settings: SiteSetting, key: FeatureKey): boolean {
  return (settings.features?.[key] ?? true) !== false
}
