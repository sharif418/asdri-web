import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidatePath } from 'next/cache'

/**
 * The download centre (REQ-ACA-12): syllabi and curriculum PDFs, admission and administrative
 * forms, and the dawah materials — printable posters, pamphlets and booklets the dawah workers
 * download for free. Categorised and searchable on /downloads; the Dawah materials menu entry
 * links here with ?category=dawah-material.
 */
export const Downloads: CollectionConfig<'downloads'> = {
  slug: 'downloads',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'course', 'updatedAt'],
    group: 'Site content',
    useAsTitle: 'title',
    description:
      'Downloadable files: syllabi, forms and dawah materials. The seed installs three clearly marked SAMPLES so the rows, filters and download action are visible — replace them with real files.',
  },
  defaultPopulate: {
    title: true,
    category: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true, admin: { width: '60%' } },
        {
          name: 'category',
          type: 'select',
          required: true,
          admin: { width: '40%' },
          options: [
            { label: 'Syllabus & curriculum', value: 'syllabus' },
            { label: 'Admission & admin form', value: 'form' },
            { label: 'Dawah material', value: 'dawah-material' },
            { label: 'Prospectus', value: 'prospectus' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'One line under the title on the row (what the file is for).' },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { position: 'sidebar', description: 'PDF or document. Prefer PDF for printables.' },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      admin: {
        position: 'sidebar',
        description: 'Optional: the course this syllabus or form belongs to.',
      },
    },
    {
      name: 'printable',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Print-ready (dawah posters, pamphlets). Shows the print note on the row.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Sort order within the category (smaller first).' },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate && doc._status !== 'draft') {
          revalidatePath('/downloads', 'page')
          revalidatePath('/en/downloads', 'page')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidatePath('/downloads', 'page')
          revalidatePath('/en/downloads', 'page')
        }
      },
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
