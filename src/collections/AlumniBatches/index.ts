import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidatePath } from 'next/cache'

/**
 * Alumni batch statistics (REQ-ABT-04, GAP-C1): the office keeps one row per batch — the client
 * document lists four (PGDID batches 1–2, CCIS batch 1, Teachers Training batch 1). The
 * programme names are free text, verbatim from the document, because PGDID does not map cleanly
 * onto a course in the current catalogue; the totals stay editable while the office confirms
 * them against the home page's 293+ figure.
 */
export const AlumniBatches: CollectionConfig<'alumni-batches'> = {
  slug: 'alumni-batches',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['programme', 'batchLabel', 'graduates', 'order'],
    group: 'Site content',
    useAsTitle: 'programme',
    description:
      'Batch statistics for the alumni page. GAP-C1: the document’s batches sum to 104 while the home figure says 293+ — the office must confirm the totals; each row is editable until then.',
  },
  defaultPopulate: {
    programme: true,
    batchLabel: true,
  },
  fields: [
    {
      name: 'programme',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Programme name as the client document writes it, e.g. পোস্ট গ্রাজুয়েট ডিপ্লোমা ইন ইসলামিক দাওয়াহ (PGDID).',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'batchLabel',
          type: 'text',
          localized: true,
          required: true,
          admin: { width: '50%', description: 'e.g. ১ম ব্যাচ (the document’s own label).' },
        },
        {
          name: 'graduates',
          type: 'number',
          required: true,
          min: 0,
          admin: { width: '25%', description: 'Number of graduates in the batch.' },
        },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '25%' } },
      ],
    },
    {
      name: 'note',
      type: 'text',
      localized: true,
      admin: { description: 'Optional line under the batch (year, remark).' },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate && doc._status !== 'draft') {
          revalidatePath('/about/alumni', 'page')
          revalidatePath('/en/about/alumni', 'page')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidatePath('/about/alumni', 'page')
          revalidatePath('/en/about/alumni', 'page')
        }
      },
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
