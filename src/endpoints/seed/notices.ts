import type { Payload, PayloadRequest } from 'payload'

import { mergeIds } from './index'

/**
 * SAMPLE notices (REQ-NOT-01..06) so the board, the category filters, the computed status
 * badges, pinning and the month archive are visible before the office enters real
 * announcements. The Bangla below is written for the sample only — it is marked as samples in
 * the collection's admin description and should be replaced by the office's real notices.
 *
 * The samples cover every category and every computed status:
 *  - admission, published today, window open for a month → নতুন (new)
 *  - recruitment, published 12 days ago, window still open → আবেদন চলছে (active)
 *  - academic exam routine, no window, published 5 days ago → নতুন (new)
 *  - admission, window past → আবেদন শেষ (closed)
 *  - general announcement, no window, published 3 weeks ago → no badge (a plain dated notice)
 *  - academic holiday notice, pinned, no window → pinned, no badge
 */

type SeedNotice = {
  slug: string
  bn: { title: string; body?: string[] }
  en: { title: string; body?: string[] }
  category: 'admission' | 'recruitment' | 'academic' | 'general'
  daysAgo: number
  activeFromDaysAgo?: number
  activeUntilInDays?: number
  pinned?: boolean
  withAttachment?: boolean
  applyLink?: string
}

export const noticesSeed: SeedNotice[] = [
  {
    slug: 'ccis-3rd-batch-admission',
    bn: {
      title: 'সার্টিফিকেট কোর্স ইন ইসলামিক স্টাডিজ (CCIS): ৩য় ব্যাচে ভর্তি বিজ্ঞপ্তি',
      body: [
        'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউটের ৬ মাস মেয়াদী সার্টিফিকেট কোর্স ইন ইসলামিক স্টাডিজ-এর ৩য় ব্যাচে ভর্তির আবেদন গ্রহণ শুরু হয়েছে।',
        'যোগ্যতা: স্বীকৃত বিশ্ববিদ্যালয় থেকে ন্যূনতম স্নাতক এবং সিজিপিএ ২.৫ এর উপরে। আবেদনের নিয়মাবলি ও তারিখ সংযুক্ত বিজ্ঞপ্তিতে দেওয়া হয়েছে।',
        'নমুনা বিজ্ঞপ্তি — প্রকৃত বিজ্ঞপ্তি প্রকাশ হলে এটি প্রতিস্থাপিত হবে।',
      ],
    },
    en: {
      title: 'Certificate Course in Islamic Studies (CCIS): admission open for the 3rd batch',
      body: [
        'Applications are open for the 3rd batch of the six-month Certificate Course in Islamic Studies at As-Sunnah Dawah & Research Institute.',
        'Eligibility: at least a bachelor’s degree from a recognised university with a CGPA of 2.5 or above. The rules and dates are in the attached notice.',
        'Sample notice — to be replaced when the office publishes the real announcement.',
      ],
    },
    category: 'admission',
    daysAgo: 2,
    activeFromDaysAgo: 2,
    activeUntilInDays: 25,
    withAttachment: true,
    applyLink: 'https://forms.gle/example-ccis-3rd-batch',
  },
  {
    slug: 'arabic-teacher-training-2nd-batch',
    bn: {
      title: 'আরবি ভাষা শিক্ষক প্রশিক্ষণ প্রোগ্রাম: ২য় ব্যাচে আবেদন চলছে',
      body: [
        '১৫ দিন মেয়াদী আরবি ভাষা শিক্ষক প্রশিক্ষণ প্রোগ্রামের ২য় ব্যাচে আগ্রহী আলেম ও আরবি ভাষাবিদদের আবেদন গ্রহণ চলছে।',
        'নমুনা বিজ্ঞপ্তি — প্রকৃত বিজ্ঞপ্তি প্রকাশ হলে এটি প্রতিস্থাপিত হবে।',
      ],
    },
    en: {
      title: 'Arabic Language Teacher Training: applications open for the 2nd batch',
      body: [
        'Applications are being accepted for the 2nd batch of the 15-day Arabic Language Teacher Training programme.',
        'Sample notice — to be replaced when the office publishes the real announcement.',
      ],
    },
    category: 'admission',
    daysAgo: 12,
    activeFromDaysAgo: 12,
    activeUntilInDays: 18,
  },
  {
    slug: 'recruitment-research-assistant',
    bn: {
      title: 'গবেষণা সহকারী নিয়োগ বিজ্ঞপ্তি (নমুনা)',
      body: [
        'ইনস্টিটিউটের গবেষণা বিভাগে একজন গবেষণা সহকারী নিয়োগের জন্য আবেদন আহ্বান করা হচ্ছে। আবেদনের শেষ তারিখ সংযুক্ত বিজ্ঞপ্তিতে উল্লেখ রয়েছে।',
        'নমুনা বিজ্ঞপ্তি — প্রকৃত বিজ্ঞপ্তি প্রকাশ হলে এটি প্রতিস্থাপিত হবে।',
      ],
    },
    en: {
      title: 'Recruitment notice: research assistant (sample)',
      body: [
        'Applications are invited for a research assistant in the institute’s research department. The deadline is stated in the attached notice.',
        'Sample notice — to be replaced when the office publishes the real announcement.',
      ],
    },
    category: 'recruitment',
    daysAgo: 1,
    activeFromDaysAgo: 1,
    activeUntilInDays: 20,
    withAttachment: true,
  },
  {
    slug: 'pys-semester-exam-routine',
    bn: {
      title: 'PYS ১ম সেমিস্টার পরীক্ষার রুটিন (নমুনা)',
      body: [
        'Preparatory Year for Specialization (PYS) প্রোগ্রামের ১ম সেমিস্টার পরীক্ষার সময়সূচি প্রকাশিত হয়েছে। শিক্ষার্থীদের নিয়ম মেনে পরীক্ষায় অংশগ্রহণ করতে বলা হচ্ছে।',
        'নমুনা বিজ্ঞপ্তি — প্রকৃত রুটিন প্রকাশ হলে এটি প্রতিস্থাপিত হবে।',
      ],
    },
    en: {
      title: 'PYS Semester 1 examination routine (sample)',
      body: [
        'The schedule for the Semester 1 examinations of the Preparatory Year for Specialization (PYS) has been published. Students are asked to sit the examinations according to the rules.',
        'Sample notice — to be replaced when the real routine is published.',
      ],
    },
    category: 'academic',
    daysAgo: 4,
  },
  {
    slug: 'library-new-arrival-books',
    bn: {
      title: 'লাইব্রেরিতে নতুন কিতাব সংযোজন (নমুনা)',
      body: [
        'গত মাসে ইনস্টিটিউট লাইব্রেরিতে আকীদা, ফিকহ ও সমকালীন দাওয়াহ বিষয়ে বেশ কিছু নতুন কিতাব সংযোজন করা হয়েছে। শিক্ষার্থীরা লাইব্রেরি কার্ড দেখিয়ে সংগ্রহ থেকে বই নিতে পারবেন।',
        'নমুনা বিজ্ঞপ্তি।',
      ],
    },
    en: {
      title: 'New books added to the library (sample)',
      body: [
        'A number of new books on aqidah, fiqh and contemporary dawah have been added to the institute library over the past month. Students may borrow from the collection with their library card.',
        'Sample notice.',
      ],
    },
    category: 'general',
    daysAgo: 21,
  },
  {
    slug: 'holiday-notice-ashura',
    bn: {
      title: 'ঈদে মিলাদুন্নবী উপলক্ষে ছুটির বিজ্ঞপ্তি (নমুনা)',
      body: [
        'ঈদে মিলাদুন্নবী (সা.) উপলক্ষে ইনস্টিটিউটের ক্লাস ও প্রশাসনিক কার্যক্রম এক দিনের জন্য বন্ধ থাকবে।',
        'নমুনা বিজ্ঞপ্তি।',
      ],
    },
    en: {
      title: 'Holiday notice for Eid-e-Miladunnabi (sample)',
      body: [
        'Classes and the office will remain closed for one day on the occasion of Eid-e-Miladunnabi (pbuh).',
        'Sample notice.',
      ],
    },
    category: 'academic',
    daysAgo: 6,
    pinned: true,
  },
  {
    slug: 'azan-training-4th-batch-closed',
    bn: {
      title: 'আযান প্রশিক্ষণ প্রোগ্রাম: ৪র্থ ব্যাচে আবেদন গ্রহণ শেষ (নমুনা)',
      body: [
        'আযান প্রশিক্ষণ প্রোগ্রামের ৪র্থ ব্যাচে আবেদন গ্রহণের সময় শেষ হয়েছে। নির্বাচিত শিক্ষার্থীদের তালিকা অনুমোদনের পর প্রকাশ করা হবে।',
        'নমুনা বিজ্ঞপ্তি — প্রকৃত বিজ্ঞপ্তি প্রকাশ হলে এটি প্রতিস্থাপিত হবে।',
      ],
    },
    en: {
      title: 'Azan Training Program: applications closed for the 4th batch (sample)',
      body: [
        'The application window for the 4th batch of the Azan Training Program has closed. The list of selected students will be published after approval.',
        'Sample notice — to be replaced when the office publishes the real announcement.',
      ],
    },
    category: 'admission',
    daysAgo: 40,
    activeFromDaysAgo: 40,
    activeUntilInDays: -10,
  },
]

/** Lexical rich text from plain paragraphs (the seed's bodies are plain prose). */
function lexical(paragraphs: string[]) {
  if (paragraphs.length === 0) return null
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        children: [{ text, type: 'text', version: 1 }],
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/** A small valid one-page PDF so the attachment UI has something real to download. */
function samplePdf(title: string): Buffer {
  const lines = [
    'ASDRI - As-Sunnah Dawah & Research Institute',
    'Sample notice attachment (to be replaced by the office)',
    '',
    title,
    '',
    'This placeholder PDF was generated by the seed to demonstrate the',
    'attachment download on the notice board.',
  ]
  const text = lines.map((line, i) => `BT /F1 ${i === 3 ? 13 : 10} Tf 56 ${742 - i * 22} Td (${line.replace(/[()\\]/g, '')}) Tj ET`).join('\n')
  const content = `${text}\n0 0 0 RG 56 700 m 539 700 l S`
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]
  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []
  objects.forEach((obj, i) => {
    offsets.push(pdf.length)
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`
  })
  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`
  return Buffer.from(pdf, 'latin1')
}

let sampleMediaId: string | number | null = null

function daysAgoDate(days: number) {
  const d = new Date()
  d.setHours(10, 0, 0, 0)
  d.setDate(d.getDate() - days)
  return d
}

function inDaysDate(days: number) {
  const d = new Date()
  d.setHours(23, 59, 0, 0)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * Upserts the sample notices by slug, Bangla pass first, then English reusing row ids.
 * Idempotent; the sample PDF media is created once per run (Payload's media creates are cheap;
 * re-running replaces the file on the same document via the fixed filename check below).
 */
export async function seedNotices(payload: Payload, req: PayloadRequest) {
  if (sampleMediaId === null) {
    const existingMedia = await payload.find({
      collection: 'media',
      req,
      limit: 1,
      pagination: false,
      where: { filename: { equals: 'sample-notice.pdf' } },
    })
    if (existingMedia.docs[0]) {
      sampleMediaId = existingMedia.docs[0].id
    } else {
      const buffer = samplePdf('Sample notice attachment')
      const media = await payload.create({
        collection: 'media',
        req,
        data: { alt: 'নমুনা বিজ্ঞপ্তি সংযুক্তি' },
        file: {
          data: buffer,
          mimetype: 'application/pdf',
          name: 'sample-notice.pdf',
          size: buffer.length,
        },
      })
      sampleMediaId = media.id
    }
  }

  for (const notice of noticesSeed) {
    const existing = await payload.find({
      collection: 'notices',
      req,
      limit: 1,
      pagination: false,
      draft: true,
      depth: 0,
      where: { slug: { equals: notice.slug } },
    })

    const bnData = toData(notice, 'bn')
    const saved = existing.docs[0]
      ? await payload.update({
          collection: 'notices',
          id: existing.docs[0].id,
          data: { ...bnData, _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'notices',
          data: { ...bnData, _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })

    await payload.update({
      collection: 'notices',
      id: saved.id,
      data: {
        ...(mergeIds(toData(notice, 'en'), saved) as Record<string, unknown>),
        _status: 'published',
      } as never,
      locale: 'en',
      req,
      context: { disableRevalidate: true },
    })
  }
  payload.logger.info(`Seeded ${noticesSeed.length} sample notices.`)
}

function toData(notice: SeedNotice, locale: 'bn' | 'en') {
  const side = notice[locale]
  return {
    title: side.title,
    slug: notice.slug,
    category: notice.category,
    body: lexical(side.body ?? []),
    publishedAt: daysAgoDate(notice.daysAgo).toISOString(),
    activeFrom: notice.activeFromDaysAgo !== undefined ? daysAgoDate(notice.activeFromDaysAgo).toISOString() : null,
    activeUntil: notice.activeUntilInDays !== undefined ? inDaysDate(notice.activeUntilInDays).toISOString() : null,
    statusOverride: null,
    attachments: notice.withAttachment
      ? [{ file: sampleMediaId as unknown as number, label: locale === 'bn' ? 'বিজ্ঞপ্তি (PDF)' : 'Notice (PDF)' }]
      : [],
    applyLink: notice.applyLink ?? '',
    pinned: notice.pinned ?? false,
  }
}
