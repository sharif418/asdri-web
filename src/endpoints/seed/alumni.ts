import type { Payload, PayloadRequest } from 'payload'

import { mergeIds } from './index'

/**
 * Alumni batch statistics (REQ-ABT-04, GAP-C1), verbatim from the client document (Our Alumni):
 * PGDID batches 1–2, CCIS batch 1, Teachers Training batch 1. The programme names are kept as
 * free text exactly as written — PGDID does not map onto a course in the current catalogue.
 * The office must confirm the numbers against the home page's ২৯৩+ figure (GAP-C1).
 */
type SeedBatch = {
  bn: { programme: string; batchLabel: string }
  en: { programme: string; batchLabel: string }
  graduates: number
  order: number
}

const batches: SeedBatch[] = [
  {
    bn: {
      programme: 'পোস্ট গ্রাজুয়েট ডিপ্লোমা ইন ইসলামিক দাওয়াহ (PGDID)',
      batchLabel: '১ম ব্যাচ',
    },
    en: {
      programme: 'Post Graduate Diploma in Islamic Dawah (PGDID)',
      batchLabel: 'Batch 1',
    },
    graduates: 20,
    order: 10,
  },
  {
    bn: {
      programme: 'পোস্ট গ্রাজুয়েট ডিপ্লোমা ইন ইসলামিক দাওয়াহ (PGDID)',
      batchLabel: '২য় ব্যাচ',
    },
    en: {
      programme: 'Post Graduate Diploma in Islamic Dawah (PGDID)',
      batchLabel: 'Batch 2',
    },
    graduates: 29,
    order: 20,
  },
  {
    bn: {
      programme: 'সার্টিফিকেট কোর্স ইন ইসলামিক স্টাডিজ (CCIS)',
      batchLabel: '১ম ব্যাচ',
    },
    en: {
      programme: 'Certificate Course in Islamic Studies (CCIS)',
      batchLabel: 'Batch 1',
    },
    graduates: 29,
    order: 30,
  },
  {
    bn: {
      programme: 'আরবি ভাষা শিক্ষক প্রশিক্ষণ (Teachers Training)',
      batchLabel: '১ম ব্যাচ',
    },
    en: {
      programme: 'Arabic Language Teacher Training (Teachers Training)',
      batchLabel: 'Batch 1',
    },
    graduates: 26,
    order: 40,
  },
]

/** Upserts the batches by programme + batch label, Bangla pass first. Idempotent. */
export async function seedAlumni(payload: Payload, req: PayloadRequest) {
  for (const batch of batches) {
    const existing = await payload.find({
      collection: 'alumni-batches',
      locale: 'bn', // match the Bangla pass below, so localized where clauses see bn values
      req,
      limit: 1,
      pagination: false,
      draft: true,
      depth: 0,
      where: {
        and: [{ programme: { equals: batch.bn.programme } }, { batchLabel: { equals: batch.bn.batchLabel } }],
      },
    })

    const toData = (side: 'bn' | 'en') => ({
      programme: batch[side].programme,
      batchLabel: batch[side].batchLabel,
      graduates: batch.graduates,
      order: batch.order,
    })

    const saved = existing.docs[0]
      ? await payload.update({
          collection: 'alumni-batches',
          id: existing.docs[0].id,
          data: { ...toData('bn'), _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'alumni-batches',
          data: { ...toData('bn'), _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })

    await payload.update({
      collection: 'alumni-batches',
      id: saved.id,
      data: {
        ...(mergeIds(toData('en'), saved) as Record<string, unknown>),
        _status: 'published',
      } as never,
      locale: 'en',
      req,
      context: { disableRevalidate: true },
    })
  }
  payload.logger.info(`Seeded ${batches.length} alumni batches.`)
}
