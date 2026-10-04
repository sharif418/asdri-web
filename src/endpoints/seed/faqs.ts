import type { Payload, PayloadRequest } from 'payload'

import { mergeIds } from './index'

/**
 * FAQ categories (REQ-ADM-04) — the client document names the tabs: ভর্তি সংক্রান্ত, কোর্স
 * সংক্রান্ত, অনুদানের নিয়মাবলি — and three SAMPLE questions built from the document's own
 * content so the accordion is visible before the office writes the real questions. Sample
 * answers end with a নমুনা marker; the collection's admin description says the same.
 */
type SeedCategory = { slug: string; order: number; bn: string; en: string }
type SeedFaq = {
  slug: string
  categorySlug: string
  order: number
  bn: { question: string; answer: string[] }
  en: { question: string; answer: string[] }
}

const categories: SeedCategory[] = [
  { slug: 'faq-admissions', order: 10, bn: 'ভর্তি সংক্রান্ত FAQ', en: 'Admissions FAQ' },
  { slug: 'faq-courses', order: 20, bn: 'কোর্স সংক্রান্ত FAQ', en: 'Courses FAQ' },
  { slug: 'faq-donation-rules', order: 30, bn: 'অনুদানের নিয়মাবলি', en: 'Donation rules' },
]

const faqs: SeedFaq[] = [
  {
    slug: 'where-are-admission-notices-published',
    categorySlug: 'faq-admissions',
    order: 10,
    bn: {
      question: 'ভর্তির খবর কোথায় পাওয়া যাবে?',
      answer: [
        'সাধারণত সোশ্যাল মিডিয়া প্ল্যাটফর্মের মাধ্যমে ভর্তি বিজ্ঞপ্তি প্রকাশ করা হয়। ভর্তি সংক্রান্ত আপডেটের জন্য আমাদের ফেসবুক পেজ ভিজিট করুন বা কিউআর (QR) কোডটি স্ক্যান করুন।',
        'নমুনা প্রশ্ন — প্রকৃত প্রশ্নোত্তর প্রকাশ হলে এটি প্রতিস্থাপিত হবে।',
      ],
    },
    en: {
      question: 'Where are admission notices published?',
      answer: [
        'Admission notices are usually announced on social media. Visit our Facebook page for admission updates, or scan the QR code.',
        'Sample question — to be replaced when the office publishes the real questions.',
      ],
    },
  },
  {
    slug: 'how-long-are-the-courses',
    categorySlug: 'faq-courses',
    order: 10,
    bn: {
      question: 'কোর্সগুলোর মেয়াদ কত?',
      answer: [
        'Preparatory Year for Specialization (PYS) প্রোগ্রামের মেয়াদ ৩ বছর, সার্টিফিকেট কোর্স ইন ইসলামিক স্টাডিজ (CCIS) ৬ মাস, ডিপ্লোমা ইন দাওয়াহ অ্যান্ড ইসলামিক স্টাডিজ ২ বছর (৪টি সেমিস্টার)। আরবি ভাষা শিক্ষক প্রশিক্ষণ ও আযান প্রশিক্ষণ ১৫ দিনের এবং রমাদান দাওয়াহ প্রশিক্ষণ ২০ দিনের।',
        'নমুনা প্রশ্ন — প্রকৃত প্রশ্নোত্তর প্রকাশ হলে এটি প্রতিস্থাপিত হবে।',
      ],
    },
    en: {
      question: 'How long are the courses?',
      answer: [
        'The Preparatory Year for Specialization (PYS) runs for 3 years, the Certificate Course in Islamic Studies (CCIS) for 6 months, and the Diploma in Dawah & Islamic Studies for 2 years (4 semesters). The Arabic Language Teacher Training and the Azan Training run for 15 days each, and the Ramadan Dawah Training for 20 days.',
        'Sample question — to be replaced when the office publishes the real questions.',
      ],
    },
  },
  {
    slug: 'which-fund-runs-the-scholarship',
    categorySlug: 'faq-donation-rules',
    order: 10,
    bn: {
      question: 'স্কলারশিপ কোন ফান্ড থেকে পরিচালিত হয়?',
      answer: [
        'এই স্কলারশিপ কার্যক্রমটি আস-সুন্নাহ ফাউন্ডেশনের ‘যাকাত ফান্ড’ থেকে পরিচালিত হয়। তাই আবেদনকারীকে অবশ্যই শরীয়াহ অনুযায়ী যাকাত গ্রহণের উপযুক্ত হতে হবে এবং এর সপক্ষে যথাযথ প্রমাণাদি পেশ করতে হবে।',
        'নমুনা প্রশ্ন — প্রকৃত প্রশ্নোত্তর প্রকাশ হলে এটি প্রতিস্থাপিত হবে।',
      ],
    },
    en: {
      question: 'Which fund runs the scholarship?',
      answer: [
        'The scholarship programme is run from As-Sunnah Foundation’s “Zakat Fund”. An applicant must therefore be eligible to receive zakat according to the Shariah and must present proper evidence in support of this.',
        'Sample question — to be replaced when the office publishes the real questions.',
      ],
    },
  },
]

/** Lexical rich text from plain paragraphs. */
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

/**
 * Upserts the FAQ categories by slug (kind "faq"), then the sample questions by slug. Bangla
 * pass first, English reusing row ids. Idempotent.
 */
export async function seedFaqs(payload: Payload, req: PayloadRequest) {
  const categoryIds: Record<string, string | number> = {}
  for (const category of categories) {
    const existing = await payload.find({
      collection: 'categories',
      req,
      limit: 1,
      pagination: false,
      depth: 0,
      where: { slug: { equals: category.slug } },
    })
    const saved = existing.docs[0]
      ? await payload.update({
          collection: 'categories',
          id: existing.docs[0].id,
          data: { title: category.bn, slug: category.slug, kind: 'faq', order: category.order },
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'categories',
          data: { title: category.bn, slug: category.slug, kind: 'faq', order: category.order },
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
    categoryIds[category.slug] = saved.id
    await payload.update({
      collection: 'categories',
      id: saved.id,
      data: { title: category.en, kind: 'faq', order: category.order },
      locale: 'en',
      req,
      context: { disableRevalidate: true },
    })
  }

  for (const faq of faqs) {
    const existing = await payload.find({
      collection: 'faqs',
      locale: 'bn', // match the Bangla pass below, so localized where clauses see bn values
      req,
      limit: 1,
      pagination: false,
      draft: true,
      depth: 0,
      where: { question: { equals: faq.bn.question } },
    })

    const toData = (side: SeedFaq['bn'] | SeedFaq['en']) => ({
      question: side.question,
      answer: lexical(side.answer),
      category: categoryIds[faq.categorySlug] as number,
      order: faq.order,
    })

    const saved = existing.docs[0]
      ? await payload.update({
          collection: 'faqs',
          id: existing.docs[0].id,
          data: { ...toData(faq.bn), _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'faqs',
          data: { ...toData(faq.bn), _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })

    await payload.update({
      collection: 'faqs',
      id: saved.id,
      data: {
        ...(mergeIds(toData(faq.en), saved) as Record<string, unknown>),
        _status: 'published',
      } as never,
      locale: 'en',
      req,
      context: { disableRevalidate: true },
    })
  }
  payload.logger.info(`Seeded ${categories.length} FAQ categories and ${faqs.length} sample questions.`)
}
