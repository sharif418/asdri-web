import fs from 'fs'
import path from 'path'
import type { Payload, PayloadRequest } from 'payload'

import { mergeIds } from './index'

/**
 * Site settings starter content. Bangla copied verbatim from
 * docs/source/02-website-content-and-features-bn.extracted.txt (হোম পেজ, যোগাযোগ ও অবস্থান);
 * English from docs/source/01-navbar-and-home-contents.extracted.txt (Hero, Footer).
 * Email and social links are not in the source documents (GAP-C7); editors add them in admin.
 * The Facebook admission QR is the client's own image (docs/source/facebook-admission-qr.png);
 * map links are a sensible Google Maps search default the office can replace.
 *
 * The blog flag ships off: the blog module is the next batch and no /blog route exists yet —
 * the flag is what keeps the menu entry honest until then (REQ-GEN-06).
 */
const features = {
  admissions: true,
  donations: true,
  zakatCalculator: true,
  blog: false,
  notices: true,
  gallery: true,
  downloads: true,
  faq: true,
  fatwa: false,
  clarifications: false,
  library: false,
  books: false,
  researchProjects: false,
  videos: false,
  news: false,
  events: false,
  comments: false,
  sponsorship: false,
  donorPortal: false,
  recurring: false,
  international: false,
  campaigns: false,
  studentPortal: false,
  alumniPortal: false,
  facebookFeed: false,
  search: true,
  accounts: true,
  darkMode: true,
}

const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=As-Sunnah+Dawah+%26+Research+Institute%2C+Satarkul+Pukurpar%2C+Badda%2C+Dhaka-1212'

const siteSettingsSeed = {
  bn: {
    name: 'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট',
    shortName: 'দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট',
    tagline:
      'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট একটি দাওয়াহ, শিক্ষা ও গবেষণাভিত্তিক প্রতিষ্ঠান। এই ইনস্টিটিউট কুরআন-সুন্নাহভিত্তিক দাওয়াহ, গবেষণা ও প্রশিক্ষণ কার্যক্রম পরিচালনা করে, যার মূল লক্ষ্য হলো ইসলামের বিশুদ্ধ আকীদা এবং সঠিক জ্ঞান প্রচার ও প্রসার করা।',
    parentLine: 'আস-সুন্নাহ ফাউন্ডেশনের একটি শিক্ষাপ্রতিষ্ঠান',
    parentUrl: 'https://assunnahfoundation.org/',
    phones: [{ number: '+880 1805-437910', note: 'সকাল ৯টা থেকে বিকাল ৫টা' }],
    addresses: [
      {
        label: 'ঠিকানা',
        text: 'হোল্ডিং ৯৯, সাঁতারকুল পুকুরপাড়, কাজিবাড়ী, বাড্ডা, ঢাকা-১২১২।',
        mapUrl: MAP_URL,
      },
      {
        label: 'আবাসিক ক্যাম্পাস',
        text: 'হোল্ডিং ৯৯, সাঁতারকুল পুকুরপাড়, কাজিবাড়ী, বাড্ডা, ঢাকা-১২১২।',
        mapUrl: MAP_URL,
      },
    ],
    admissionNote:
      'সাধারণত সোশ্যাল মিডিয়া প্ল্যাটফর্মের মাধ্যমে ভর্তি বিজ্ঞপ্তি প্রকাশ করা হয়। ভর্তি সংক্রান্ত আপডেটের জন্য আমাদের ফেসবুক পেজ ভিজিট করুন বা কিউআর (QR) কোডটি স্ক্যান করুন।',
    otherWebsites: [{ label: 'আস-সুন্নাহ ফাউন্ডেশন', url: 'https://assunnahfoundation.org/' }],
    features,
    defaultDescription:
      'কুরআন-সুন্নাহভিত্তিক দাওয়াহ, গবেষণা ও প্রশিক্ষণ কার্যক্রম পরিচালনাকারী শিক্ষাপ্রতিষ্ঠান। আস-সুন্নাহ ফাউন্ডেশনের একটি শিক্ষাপ্রতিষ্ঠান।',
  },
  en: {
    name: 'As-Sunnah Dawah & Research Institute',
    shortName: 'ASDRI',
    tagline:
      'A dawah, education, and research-based institute dedicated to propagating authentic Islamic knowledge based on the Quran and Sunnah.',
    parentLine: 'An Educational Institution of As-Sunnah Foundation',
    parentUrl: 'https://assunnahfoundation.org/',
    phones: [{ number: '+880 1805-437910', note: '9 AM to 5 PM' }],
    addresses: [
      {
        label: 'Address',
        text: 'Holding 99, Satarkul Pukurpar, Kazibari, Badda, Dhaka-1212',
        mapUrl: MAP_URL,
      },
      {
        label: 'Residential campus',
        text: 'Holding 99, Satarkul Pukurpar, Kazibari, Badda, Dhaka-1212',
        mapUrl: MAP_URL,
      },
    ],
    admissionNote:
      'Admission notices are usually announced on social media. Visit our Facebook page for admission updates, or scan the QR code.',
    otherWebsites: [{ label: 'As-Sunnah Foundation', url: 'https://assunnahfoundation.org/' }],
    features,
    defaultDescription:
      'An institute of As-Sunnah Foundation running dawah, research and training programmes grounded in the Quran and Sunnah.',
  },
}

/**
 * Seeds site settings in both locales, uploading the client's Facebook admission QR first
 * (find-or-create by filename) so the footer and contact page can show it. Idempotent.
 */
export async function seedSiteSettings(payload: Payload, req: PayloadRequest) {
  let qrMediaId: string | number | null = null
  const existingQr = await payload.find({
    collection: 'media',
    req,
    limit: 1,
    pagination: false,
    where: { filename: { equals: 'facebook-admission-qr.png' } },
  })
  if (existingQr.docs[0]) {
    qrMediaId = existingQr.docs[0].id
  } else {
    const qrPath = path.join(process.cwd(), 'docs', 'source', 'facebook-admission-qr.png')
    if (fs.existsSync(qrPath)) {
      const data = fs.readFileSync(qrPath)
      const media = await payload.create({
        collection: 'media',
        req,
        data: { alt: 'ভর্তি সংক্রান্ত আপডেটের ফেসবুক পেজের কিউআর কোড' },
        file: { data, mimetype: 'image/png', name: 'facebook-admission-qr.png', size: data.length },
      })
      qrMediaId = media.id
      await payload.update({
        collection: 'media',
        id: media.id,
        data: { alt: 'QR code of the Facebook page for admission updates' },
        locale: 'en',
        req,
        context: { disableRevalidate: true },
      })
    }
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: { ...siteSettingsSeed.bn, ...(qrMediaId ? { admissionQr: qrMediaId } : {}) } as never,
    locale: 'bn',
    req,
    context: { disableRevalidate: true },
  })
  const saved = (await payload.findGlobal({
    slug: 'site-settings',
    locale: 'bn',
    depth: 0,
    req,
  })) as unknown as Record<string, unknown>
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      ...(mergeIds(siteSettingsSeed.en, saved) as Record<string, unknown>),
      ...(qrMediaId ? { admissionQr: qrMediaId } : {}),
    } as never,
    locale: 'en',
    req,
    context: { disableRevalidate: true },
  })
  payload.logger.info('Seeded site settings (with admission QR, maps and admission note).')
}
