import type { GlobalConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * The Admissions pages' editable content (REQ-ADM-01, 02): the five admission steps — a real
 * sequence, so the page numbers them — and the scholarship text, both verbatim from the
 * client's document.
 */
export const AdmissionsContent: GlobalConfig = {
  slug: 'admissions-content',
  label: 'Admissions pages',
  access: { read: () => true },
  admin: {
    group: 'Site',
    description:
      'ভর্তি প্রক্রিয়া and স্কলারশিপ ও আর্থিক সহায়তা. The five steps are a sequence; the page renders Bengali numerals automatically.',
  },
  hooks: {
    afterChange: [
      ({ req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidateTag('global_admissions-content', 'max')
          for (const path of [
            '/admissions',
            '/en/admissions',
            '/admissions/scholarships',
            '/en/admissions/scholarships',
          ]) {
            revalidatePath(path)
          }
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Admission process',
          fields: [
            {
              name: 'processIntro',
              type: 'textarea',
              localized: true,
              admin: { description: 'The line above the five steps.' },
            },
            {
              name: 'steps',
              type: 'array',
              labels: { singular: 'Step', plural: 'Steps' },
              maxRows: 8,
              admin: {
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
                description:
                  'Online application, screening, written test, viva, final admission — in order. Note: the seeded step 3 carries one correction of the source document — "জেনারলেদের" (as printed) → "জেনারেলেদের" (standard spelling); revert it here if the office prefers the document’s own form.',
              },
              fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'body', type: 'textarea', localized: true, required: true },
              ],
            },
          ],
        },
        {
          label: 'Scholarships',
          fields: [
            {
              name: 'scholarshipParagraphs',
              type: 'array',
              labels: { singular: 'Paragraph', plural: 'Paragraphs' },
              admin: {
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
                description: 'The scholarship & financial aid text, verbatim.',
              },
              fields: [
                {
                  name: 'value',
                  type: 'textarea',
                  localized: true,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
