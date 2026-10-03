import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

/**
 * Institute-wide settings (REQ-GEN-02, REQ-GEN-04, REQ-GEN-06, REQ-CON-01..03). Everything a
 * staff member might change about the chrome lives here, including the module feature flags
 * (ADR-0002). Labels are localised; identifiers (phone numbers, URLs) are not.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: { read: () => true },
  admin: { group: 'Site' },
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        // Skipped by the seed script (no Next request context) via context.disableRevalidate.
        if (!context.disableRevalidate) revalidateTag('global_site-settings', 'max')
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
              admin: { description: 'Full institute name as shown in the header and footer.' },
            },
            {
              name: 'shortName',
              type: 'text',
              localized: true,
              admin: { description: 'Short form for tight spaces (mobile header, browser tab).' },
            },
            { name: 'tagline', type: 'textarea', localized: true },
            {
              name: 'parentLine',
              type: 'text',
              localized: true,
              admin: {
                description:
                  'The Foundation relationship line, e.g. “আস-সুন্নাহ ফাউন্ডেশনের একটি শিক্ষাপ্রতিষ্ঠান”.',
              },
            },
            { name: 'parentUrl', type: 'text', defaultValue: 'https://assunnahfoundation.org/' },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional. Until a logo exists the site uses a typographic wordmark.',
              },
            },
            {
              name: 'prospectus',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Prospectus PDF for the hero button. Button is hidden while empty.',
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'phones',
              type: 'array',
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                  admin: { description: 'International format, e.g. +880 1805-437910' },
                },
                {
                  name: 'note',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. সকাল ৯টা থেকে বিকাল ৫টা' },
                },
              ],
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
            },
            { name: 'email', type: 'email' },
            {
              name: 'addresses',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true, localized: true },
                { name: 'text', type: 'textarea', required: true, localized: true },
                {
                  name: 'mapUrl',
                  type: 'text',
                  admin: { description: 'Google Maps link or embed URL' },
                },
              ],
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
            },
            {
              name: 'social',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    'facebook',
                    'youtube',
                    'whatsapp',
                    'telegram',
                    'instagram',
                    'x',
                    'linkedin',
                  ],
                },
                { name: 'url', type: 'text', required: true },
              ],
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
            },
            {
              name: 'admissionQr',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'QR code image shown in the footer for admission updates (REQ-CON-03).',
              },
            },
            {
              name: 'otherWebsites',
              type: 'array',
              label: 'Other websites',
              fields: [
                { name: 'label', type: 'text', required: true, localized: true },
                { name: 'url', type: 'text', required: true },
              ],
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
            },
          ],
        },
        {
          label: 'Modules',
          description:
            'Turn whole sections of the site on or off. Hidden modules disappear from navigation, sitemap and search.',
          fields: [
            {
              name: 'features',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'admissions', type: 'checkbox', defaultValue: true },
                    { name: 'donations', type: 'checkbox', defaultValue: true },
                    { name: 'zakatCalculator', type: 'checkbox', defaultValue: true },
                    { name: 'blog', type: 'checkbox', defaultValue: true },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'notices', type: 'checkbox', defaultValue: true },
                    { name: 'gallery', type: 'checkbox', defaultValue: true },
                    { name: 'downloads', type: 'checkbox', defaultValue: true },
                    { name: 'faq', type: 'checkbox', defaultValue: true },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'fatwa', type: 'checkbox', defaultValue: false },
                    { name: 'clarifications', type: 'checkbox', defaultValue: false },
                    { name: 'library', type: 'checkbox', defaultValue: false },
                    { name: 'books', type: 'checkbox', defaultValue: false },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'researchProjects', type: 'checkbox', defaultValue: false },
                    { name: 'videos', type: 'checkbox', defaultValue: false },
                    { name: 'news', type: 'checkbox', defaultValue: false },
                    { name: 'events', type: 'checkbox', defaultValue: false },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'comments', type: 'checkbox', defaultValue: false },
                    { name: 'sponsorship', type: 'checkbox', defaultValue: false },
                    { name: 'donorPortal', type: 'checkbox', defaultValue: false },
                    { name: 'recurring', type: 'checkbox', defaultValue: false },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'international', type: 'checkbox', defaultValue: false },
                    { name: 'campaigns', type: 'checkbox', defaultValue: false },
                    { name: 'studentPortal', type: 'checkbox', defaultValue: false },
                    { name: 'alumniPortal', type: 'checkbox', defaultValue: false },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'facebookFeed', type: 'checkbox', defaultValue: false },
                    { name: 'search', type: 'checkbox', defaultValue: true },
                    {
                      name: 'accounts',
                      type: 'checkbox',
                      defaultValue: true,
                      admin: { description: 'Login / Create account links in the header' },
                    },
                    {
                      name: 'darkMode',
                      type: 'checkbox',
                      defaultValue: true,
                      admin: { description: 'Theme switch in the footer' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'defaultDescription', type: 'textarea', localized: true },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}

export type FeatureKey =
  | 'admissions'
  | 'donations'
  | 'zakatCalculator'
  | 'blog'
  | 'notices'
  | 'gallery'
  | 'downloads'
  | 'faq'
  | 'fatwa'
  | 'clarifications'
  | 'library'
  | 'books'
  | 'researchProjects'
  | 'videos'
  | 'news'
  | 'events'
  | 'comments'
  | 'sponsorship'
  | 'donorPortal'
  | 'recurring'
  | 'international'
  | 'campaigns'
  | 'studentPortal'
  | 'alumniPortal'
  | 'facebookFeed'
  | 'search'
  | 'accounts'
  | 'darkMode'
