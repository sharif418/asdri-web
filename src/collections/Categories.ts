import type { CollectionConfig } from 'payload'

import { revalidatePath } from 'next/cache'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

/**
 * Shared category taxonomy (docs/03): blog, fatwa, publication, download, FAQ and video
 * categories all live here, separated by `kind`. The FAQ page (REQ-ADM-04) reads the ones with
 * kind "faq" as its tabs — the office can add a tab without a code change.
 */
export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'kind', 'slug'],
    group: 'Site content',
    useAsTitle: 'title',
    description:
      'Shared category lists, separated by kind. FAQ categories become the tabs on the FAQ page (REQ-ADM-04); blog and other kinds are used by their modules later.',
  },
  defaultPopulate: {
    title: true,
    kind: true,
  },
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate && doc.kind === 'faq') {
          revalidatePath('/faq', 'page')
          revalidatePath('/en/faq', 'page')
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'blog',
      admin: {
        position: 'sidebar',
        description: 'Which module this category belongs to. FAQ categories are the FAQ page tabs.',
      },
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Fatwa', value: 'fatwa' },
        { label: 'Publication', value: 'publication' },
        { label: 'Download', value: 'download' },
        { label: 'FAQ', value: 'faq' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Sort order within the kind (smaller first).' },
    },
  ],
}
