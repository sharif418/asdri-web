import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { revalidateNotices, revalidateNoticesDelete } from './hooks/revalidateNotice'

/**
 * The institute's notice board (REQ-NOT-01..06) — the thing that today lives only on Facebook.
 * Four categories; a status computed from the dates and overridable; PDF attachments; an
 * optional apply-online link; pinned items.
 *
 * Status (REQ-NOT-03), computed on read (src/utilities/noticeStatus.ts), never stored:
 *  - closed  — activeUntil is in the past, or the override says closed
 *  - new     — published within the last 7 days (or activeFrom still in the future)
 *  - active  — inside an application window that has already been open over a week
 *  - none    — an ordinary dated notice: no badge, just the date (the /design specimen's rule)
 */
export const Notices: CollectionConfig<'notices'> = {
  slug: 'notices',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'publishedAt', 'pinned'],
    group: 'Site content',
    useAsTitle: 'title',
    description:
      'The notice board. Statuses (নতুন / আবেদন চলছে / আবেদন শেষ) are computed from the dates and can be overridden per notice. The notices installed by the seed are SAMPLES written to show the board, filters and badges — replace them with the office’s real announcements.',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true, admin: { width: '70%' } },
        {
          name: 'category',
          type: 'select',
          required: true,
          admin: { width: '30%' },
          options: [
            { label: 'Admission', value: 'admission' },
            { label: 'Recruitment', value: 'recruitment' },
            { label: 'Academic', value: 'academic' },
            { label: 'General', value: 'general' },
          ],
        },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      localized: true,
      admin: { description: 'The notice itself. Keep it short; details belong in the attached PDF.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Shown on the board and the notice page.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'activeFrom',
          type: 'date',
          admin: { position: 'sidebar', width: '50%', date: { pickerAppearance: 'dayAndTime' }, description: 'Start of the application/active window, if any.' },
        },
        {
          name: 'activeUntil',
          type: 'date',
          admin: { position: 'sidebar', width: '50%', date: { pickerAppearance: 'dayAndTime' }, description: 'End of the window; after this the notice shows আবেদন শেষ.' },
        },
      ],
    },
    {
      name: 'statusOverride',
      type: 'select',
      admin: {
        position: 'sidebar',
        description:
          'Leave empty to let the site compute the status from the dates. Set only when the office needs to force a badge.',
      },
      options: [
        { label: 'নতুন / New', value: 'new' },
        { label: 'আবেদন চলছে / Active', value: 'active' },
        { label: 'আবেদন শেষ / Closed', value: 'closed' },
      ],
    },
    {
      name: 'attachments',
      type: 'array',
      labels: { singular: 'Attachment', plural: 'Attachments' },
      admin: {
        components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
        description: 'The notice PDF (or doc) readers download. One-click download on the notice page.',
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: { description: 'Optional download label, e.g. বিজ্ঞপ্তি (PDF)' },
        },
      ],
    },
    {
      name: 'applyLink',
      type: 'text',
      admin: {
        description:
          '“অনলাইন ফরম পূরণ করুন” target for admission and recruitment notices. Full URL for external forms (Google Forms etc.), or a site path.',
      },
    },
    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Pin to the top of the board.' },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateNotices],
    afterDelete: [revalidateNoticesDelete],
  },
  versions: {
    drafts: true,
    maxPerDoc: 30,
  },
}
