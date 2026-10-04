import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidatePath } from 'next/cache'

/**
 * Frequently asked questions (REQ-ADM-04): the office writes questions and answers; the page
 * groups them by category (the categories collection, kind "faq") behind plain tab links and
 * opens each answer in an accordion. The client document names the tabs — ভর্তি সংক্রান্ত,
 * কোর্স সংক্রান্ত, অনুদানের নিয়মাবলি — but no questions yet, so the seed installs only the
 * categories and clearly marked samples.
 */
export const Faqs: CollectionConfig<'faqs'> = {
  slug: 'faqs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['question', 'category', 'order'],
    group: 'Site content',
    useAsTitle: 'question',
    description:
      'Frequently asked questions, grouped by category on the FAQ page. Questions seeded by the installer are SAMPLES to show the accordion — replace them with the office’s real questions.',
  },
  defaultPopulate: {
    question: true,
    category: true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      localized: true,
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      filterOptions: () => ({ kind: { equals: 'faq' } }),
      admin: { position: 'sidebar' },
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
          revalidatePath('/faq', 'page')
          revalidatePath('/en/faq', 'page')
        }
        return doc
      },
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
