import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

/**
 * "At a glance" counters (REQ-HOME-02). Values are plain numbers; the UI formats them with
 * Bengali digits in Bangla and adds the suffix. GAP-C1: the office must confirm these figures,
 * so the admin description says so.
 */
export const ImpactStats: GlobalConfig = {
  slug: 'impact-stats',
  label: 'Impact stats',
  access: { read: () => true },
  admin: {
    group: 'Site',
    description:
      'Figures shown on the home page. Please confirm with the office: the alumni total (293) does not match the batch totals (104) in the source document.',
  },
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        // Skipped by the seed script (no Next request context) via context.disableRevalidate.
        if (!context.disableRevalidate) revalidateTag('global_impact-stats', 'max')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      maxRows: 8,
      admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'number', required: true, min: 0, admin: { width: '50%' } },
            {
              name: 'suffix',
              type: 'text',
              admin: {
                width: '50%',
                description: '"+" for “and more”; leave empty for an exact count',
              },
            },
          ],
        },
      ],
    },
  ],
}
