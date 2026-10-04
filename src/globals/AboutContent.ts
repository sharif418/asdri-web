import type { GlobalConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * The About pages' editable content (REQ-ABT-01, 03, 04): the vision statement and the thirteen
 * objectives (verbatim from the client's document), the campus facilities, and the alumni intro.
 * The campus life activities shown on the campus page live in Home ▸ Campus life (one source,
 * two pages); batch statistics live in the alumni-batches collection.
 */
export const AboutContent: GlobalConfig = {
  slug: 'about-content',
  label: 'About pages',
  access: { read: () => true },
  admin: {
    group: 'Site',
    description:
      'লক্ষ্য ও উদ্দেশ্য and ক্যাম্পাস ও সুবিধা. The thirteen objectives are the client’s own words; they are a list, not a sequence, and render unnumbered.',
  },
  hooks: {
    afterChange: [
      ({ req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidateTag('global_about-content', 'max')
          for (const path of [
            '/about',
            '/en/about',
            '/about/campus',
            '/en/about/campus',
            '/about/alumni',
            '/en/about/alumni',
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
          label: 'Vision & objectives',
          fields: [
            {
              name: 'visionStatement',
              type: 'textarea',
              localized: true,
              admin: { description: 'মূল লক্ষ্য (Vision) — the statement shown on /about.' },
            },
            {
              name: 'objectives',
              type: 'array',
              labels: { singular: 'Objective', plural: 'Objectives' },
              admin: {
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
                description: 'The thirteen objectives from the client document, in order, verbatim.',
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
        {
          label: 'Campus & facilities',
          fields: [
            {
              name: 'facilities',
              type: 'array',
              labels: { singular: 'Facility', plural: 'Facilities' },
              admin: {
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
                description:
                  'Residence, library & lab, amali tracker, spiritual environment — titled rows on /about/campus.',
              },
              fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'body', type: 'textarea', localized: true, required: true },
              ],
            },
          ],
        },
        {
          label: 'Alumni',
          fields: [
            {
              name: 'alumniIntro',
              type: 'textarea',
              localized: true,
              admin: {
                description:
                  'The intro paragraph on /about/alumni, verbatim from the client document. Batch numbers come from the Alumni batches collection.',
              },
            },
          ],
        },
      ],
    },
  ],
}
