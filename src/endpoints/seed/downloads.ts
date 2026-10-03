import type { Payload, PayloadRequest } from 'payload'

import { mergeIds } from './index'
import { samplePdf } from './samplePdf'

/**
 * SAMPLE download-centre files (REQ-ACA-12) — one per main category (syllabus, form, dawah
 * material) so the rows, filters, course reference and the download action are visible before
 * the office uploads real files. Titles carry a (নমুনা) marker and the admin description says
 * the same; each file is a real, generated one-page PDF.
 */
type SeedDownload = {
  slugTitle: { bn: string; en: string }
  category: 'syllabus' | 'form' | 'dawah-material' | 'prospectus' | 'other'
  courseSlug?: string
  printable?: boolean
  order: number
  description: { bn: string; en: string }
  file: { name: string; title: string; note: string; alt: { bn: string; en: string } }
}

const downloads: SeedDownload[] = [
  {
    slugTitle: {
      bn: 'PYS কোর্সের সিলেবাস (নমুনা)',
      en: 'PYS course syllabus (sample)',
    },
    category: 'syllabus',
    courseSlug: 'preparatory-year-for-specialization',
    order: 10,
    description: {
      bn: 'Preparatory Year for Specialization (PYS) প্রোগ্রামের পাঠ্যসূচি — মূল কোর্স, সম্পূরক কোর্স ও শিক্ষার্থী উন্নয়ন কার্যক্রম।',
      en: 'The curriculum of the Preparatory Year for Specialization (PYS): core courses, supplementary courses and student development programmes.',
    },
    file: {
      name: 'sample-pys-syllabus.pdf',
      title: 'PYS Syllabus (sample)',
      note: 'Sample syllabus file (to be replaced by the office)',
      alt: { bn: 'PYS কোর্সের নমুনা সিলেবাস', en: 'Sample PYS syllabus' },
    },
  },
  {
    slugTitle: {
      bn: 'ভর্তি আবেদন ফর্ম (নমুনা)',
      en: 'Admission application form (sample)',
    },
    category: 'form',
    order: 20,
    description: {
      bn: 'অফলাইনে জমা দেওয়ার জন্য প্রার্থীর ব্যক্তিগত তথ্য ও শিক্ষাগত যোগ্যতার আবেদন ফর্ম।',
      en: 'The application form with personal and educational details, for offline submission.',
    },
    file: {
      name: 'sample-admission-form.pdf',
      title: 'Admission Form (sample)',
      note: 'Sample admission form (to be replaced by the office)',
      alt: { bn: 'নমুনা ভর্তি আবেদন ফর্ম', en: 'Sample admission form' },
    },
  },
  {
    slugTitle: {
      bn: 'দাওয়াহ লিফলেট (নমুনা)',
      en: 'Dawah leaflet (sample)',
    },
    category: 'dawah-material',
    printable: true,
    order: 30,
    description: {
      bn: 'প্রিন্ট করে বিতরণের উপযোগী দাওয়াহমূলক লিফলেট — দাওয়াহকর্মীরা ফ্রি ডাউনলোড করে ব্যবহার করতে পারবেন।',
      en: 'A print-ready dawah leaflet — dawah workers may download it for free and print it for distribution.',
    },
    file: {
      name: 'sample-dawah-leaflet.pdf',
      title: 'Dawah Leaflet (sample)',
      note: 'Sample dawah leaflet (to be replaced by the office)',
      alt: { bn: 'নমুনা দাওয়াহ লিফলেট', en: 'Sample dawah leaflet' },
    },
  },
]

/**
 * Upserts the sample downloads (matching on the fixed media filenames), linking the syllabus
 * to its course. Bangla pass first, English reusing row ids. Idempotent.
 */
export async function seedDownloads(payload: Payload, req: PayloadRequest) {
  let pysCourseId: string | number | null = null
  const pysCourse = await payload.find({
    collection: 'courses',
    req,
    limit: 1,
    pagination: false,
    draft: false,
    depth: 0,
    where: { slug: { equals: 'preparatory-year-for-specialization' } },
  })
  pysCourseId = pysCourse.docs[0]?.id ?? null

  for (const download of downloads) {
    const existingMedia = await payload.find({
      collection: 'media',
      req,
      limit: 1,
      pagination: false,
      where: { filename: { equals: download.file.name } },
    })
    let mediaId = existingMedia.docs[0]?.id as string | number | undefined
    if (!mediaId) {
      const buffer = samplePdf(download.file.title, download.file.note)
      const media = await payload.create({
        collection: 'media',
        req,
        data: { alt: download.file.alt.bn },
        file: {
          data: buffer,
          mimetype: 'application/pdf',
          name: download.file.name,
          size: buffer.length,
        },
      })
      mediaId = media.id
      await payload.update({
        collection: 'media',
        id: mediaId,
        data: { alt: download.file.alt.en },
        locale: 'en',
        req,
        context: { disableRevalidate: true },
      })
    }

    const existing = await payload.find({
      collection: 'downloads',
      locale: 'bn', // match the Bangla pass below, so localized where clauses see bn values
      req,
      limit: 1,
      pagination: false,
      draft: true,
      depth: 0,
      where: { title: { equals: download.slugTitle.bn } },
    })

    const toData = (side: 'bn' | 'en') => ({
      title: download.slugTitle[side],
      description: download.description[side],
      category: download.category,
      file: mediaId as number,
      course: download.courseSlug ? (pysCourseId as number) : null,
      printable: download.printable ?? false,
      order: download.order,
    })

    const saved = existing.docs[0]
      ? await payload.update({
          collection: 'downloads',
          id: existing.docs[0].id,
          data: { ...toData('bn'), _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'downloads',
          data: { ...toData('bn'), _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })

    await payload.update({
      collection: 'downloads',
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
  payload.logger.info(`Seeded ${downloads.length} sample downloads.`)
}
