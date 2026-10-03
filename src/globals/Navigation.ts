import type { Field, GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

/**
 * Header and footer navigation (REQ-GEN-03, REQ-GEN-04). Editors change labels and order here;
 * the structure follows docs/02-information-architecture.md. A link is either a path on this site
 * ("/academics/courses") or an external URL. `feature` ties an item to a module flag in
 * site-settings so hidden modules drop out of the menus automatically (ADR-0002).
 */
const FEATURE_OPTIONS = [
  'admissions',
  'donations',
  'zakatCalculator',
  'blog',
  'notices',
  'gallery',
  'downloads',
  'faq',
  'fatwa',
  'clarifications',
  'library',
  'books',
  'researchProjects',
  'videos',
  'news',
  'events',
  'sponsorship',
  'donorPortal',
  'studentPortal',
  'alumniPortal',
  'search',
  'accounts',
].map((v) => ({ label: v, value: v }))

const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true, localized: true },
  {
    type: 'row',
    fields: [
      {
        name: 'href',
        type: 'text',
        required: true,
        admin: { width: '60%', description: 'Path ("/academics/courses") or full URL' },
      },
      { name: 'newTab', type: 'checkbox', admin: { width: '20%' } },
      {
        name: 'feature',
        type: 'select',
        options: FEATURE_OPTIONS,
        admin: { width: '20%', description: 'Hide when this module is off' },
      },
    ],
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: { read: () => true },
  admin: { group: 'Site' },
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        // Skipped by the seed script (no Next request context) via context.disableRevalidate.
        if (!context.disableRevalidate) revalidateTag('global_navigation', 'max')
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            {
              name: 'primary',
              label: 'Main menu',
              type: 'array',
              maxRows: 9,
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
              fields: [
                ...linkFields,
                {
                  name: 'children',
                  label: 'Dropdown items',
                  type: 'array',
                  admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
                  fields: [
                    ...linkFields,
                    {
                      name: 'description',
                      type: 'text',
                      localized: true,
                      admin: { description: 'One short line under the label in the dropdown' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'cta',
              label: 'Primary action',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'দান করুন' },
                { name: 'href', type: 'text', defaultValue: '/donate' },
              ],
            },
            {
              name: 'utility',
              label: 'Utility bar links',
              type: 'array',
              maxRows: 4,
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
              fields: linkFields,
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerColumns',
              type: 'array',
              maxRows: 4,
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: { description: 'Column heading' },
                },
                {
                  name: 'links',
                  type: 'array',
                  admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
                  fields: linkFields,
                },
              ],
            },
            {
              name: 'legal',
              label: 'Bottom row links',
              type: 'array',
              maxRows: 4,
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
              fields: linkFields,
            },
          ],
        },
      ],
    },
  ],
}
