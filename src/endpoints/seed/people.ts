import type { Payload, PayloadRequest } from 'payload'

import { mergeIds } from './index'

/**
 * The people behind the institute (REQ-ABT-02, REQ-ACA-10), seeded verbatim from
 * docs/source/02-website-content-and-features-bn.extracted.txt (Faculty, Researchers &
 * Leadership). Bangla names, designations and subjects are copied exactly; English names are
 * transliterations the office can edit (GAP-C5). No photos, biographies or private contact
 * details exist yet, so those stay empty and the pages fall back to monograms.
 *
 * Source notes, flagged for the office:
 * - The teacher panel lists "Introduction to Philosophy" twice for Ustadh Arif Billah; the seed
 *   keeps it once.
 * - "আল-আমীন" appears in both the English list and the Tajweed team; seeded as one person in
 *   both teams (the document's two spellings differ by one matra).
 * - The mathematics and basic-science teams are listed in the document without names; their
 *   groups stay empty and show a designed empty state.
 */

export type SeedPerson = {
  slug: string
  bn: {
    name: string
    designation?: string
    subjects?: string[]
  }
  en: {
    name: string
    designation?: string
    subjects?: string[]
  }
  roles: ('leadership' | 'faculty' | 'staff' | 'author')[]
  teams?: ('core' | 'arabic' | 'tajweed' | 'tarbiyah' | 'english' | 'bangla' | 'computer' | 'math' | 'science')[]
  featuredOnHome?: boolean
  order: number
}

export const peopleSeed: SeedPerson[] = [
  // Leadership (নেতৃত্ব ও প্রশাসন) — designations are the leadership titles; those who also
  // teach sit in the teacher panel with their subjects.
  {
    slug: 'shaykh-ahmadullah',
    bn: { name: 'শায়খ আহমাদুল্লাহ', designation: 'চেয়ারম্যান', subjects: ['দাঈর ব্যক্তিত্ব ও গুণাবলি'] },
    en: { name: 'Shaykh Ahmadullah', designation: 'Chairman', subjects: ['Attributes of a Da’i'] },
    roles: ['leadership', 'faculty'],
    teams: ['core'],
    featuredOnHome: true,
    order: 10,
  },
  {
    slug: 'khaled-muhammad-saifullah',
    bn: {
      name: 'খালেদ মুহাম্মাদ সাইফুল্লাহ',
      designation: 'ইনচার্জ',
      subjects: ['Intellectual History of Islamic Civilization (Part 1)'],
    },
    en: {
      name: 'Khaled Muhammad Saifullah',
      designation: 'In-Charge',
      subjects: ['Intellectual History of Islamic Civilization (Part 1)'],
    },
    roles: ['leadership', 'faculty'],
    teams: ['core'],
    featuredOnHome: true,
    order: 20,
  },
  {
    slug: 'abir-muhsin',
    bn: { name: 'আবির মুহসিন', designation: 'অ্যাসিস্ট্যান্ট ইনচার্জ' },
    en: { name: 'Abir Muhsin', designation: 'Assistant In-Charge' },
    roles: ['leadership'],
    order: 30,
  },
  {
    slug: 'shoaib-mahmud',
    bn: { name: 'শোয়াইব মাহমুদ', designation: 'অ্যাসিস্ট্যান্ট ইনচার্জ' },
    en: { name: 'Shoaib Mahmud', designation: 'Assistant In-Charge' },
    roles: ['leadership'],
    order: 40,
  },
  {
    slug: 'salahuddin-tareq',
    bn: {
      name: 'সালাহুদ্দীন তারেক',
      designation: 'একাডেমিক কো-অর্ডিনেটর',
      subjects: ['Intellectual History of Islamic Civilization (Part 2)', 'Textual Skills (Part 1)'],
    },
    en: {
      name: 'Salahuddin Tareq',
      designation: 'Academic Coordinator',
      subjects: ['Intellectual History of Islamic Civilization (Part 2)', 'Textual Skills (Part 1)'],
    },
    roles: ['leadership', 'faculty'],
    teams: ['core'],
    order: 50,
  },

  // Teacher panel (TEACHER'S PANEL) — subjects exactly as listed.
  {
    slug: 'dr-mostafa-manjur',
    bn: {
      name: 'ড. মোস্তাফা মনজুর',
      designation: 'উস্তাজ',
      subjects: ['Research Methodology & Methods', 'Islamic Research Methodology', 'তারবিয়াহ'],
    },
    en: {
      name: 'Dr. Mostafa Manjur',
      designation: 'Ustadh',
      subjects: ['Research Methodology & Methods', 'Islamic Research Methodology', 'Tarbiyah'],
    },
    roles: ['faculty'],
    teams: ['core'],
    featuredOnHome: true,
    order: 100,
  },
  {
    slug: 'mawlana-liaquat-ali',
    bn: { name: 'মাওলানা লিয়াকত আলী', designation: 'উস্তাজ', subjects: ['Introduction to Islam', 'তারবিয়াহ'] },
    en: {
      name: 'Mawlana Liaquat Ali',
      designation: 'Ustadh',
      subjects: ['Introduction to Islam', 'Tarbiyah'],
    },
    roles: ['faculty'],
    teams: ['core'],
    featuredOnHome: true,
    order: 110,
  },
  {
    slug: 'ustadh-arif-billah',
    bn: {
      name: 'উস্তায আরিফ বিল্লাহ',
      designation: 'উস্তাজ',
      subjects: [
        'Introduction to Da‘wah',
        'Media and Journalism in Global Political Context',
        'World Civilizations and Cultures',
        'Introduction to Philosophy',
        'Sociology',
      ],
    },
    en: {
      name: 'Ustadh Arif Billah',
      designation: 'Ustadh',
      subjects: [
        'Introduction to Da‘wah',
        'Media and Journalism in Global Political Context',
        'World Civilizations and Cultures',
        'Introduction to Philosophy',
        'Sociology',
      ],
    },
    roles: ['faculty'],
    teams: ['core'],
    featuredOnHome: true,
    order: 120,
  },
  {
    slug: 'ustadh-alauddin-rafiq',
    bn: {
      name: 'উস্তায আলাউদ্দীন রফিক',
      subjects: [
        'Foundation of Politics & International Relations',
        'Modern Ideologies & Intellectual Trends (Part 1)',
      ],
    },
    en: {
      name: 'Ustadh Alauddin Rafiq',
      subjects: [
        'Foundation of Politics & International Relations',
        'Modern Ideologies & Intellectual Trends (Part 1)',
      ],
    },
    roles: ['faculty'],
    teams: ['core'],
    order: 130,
  },
  {
    slug: 'dr-zubayer-ehsanul-haque',
    bn: { name: 'ড. যুবায়ের এহসানুল হক', subjects: ['Islam in South Asia'] },
    en: { name: 'Dr. Zubayer Ehsanul Haque', subjects: ['Islam in South Asia'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 140,
  },
  {
    slug: 'mawlana-zubayer-rashid',
    bn: { name: 'মাওলানা যুবায়ের রশীদ', subjects: ['Legal Systems & General Jurisprudence'] },
    en: { name: 'Mawlana Zubayer Rashid', subjects: ['Legal Systems & General Jurisprudence'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 150,
  },
  {
    slug: 'mawlana-lokman-hasan',
    bn: { name: 'মাওলানা লোকমান হাসান', subjects: ['উসুলল ফিকহ', 'Economics & Islamic Finance'] },
    en: { name: 'Mawlana Lokman Hasan', subjects: ['Usul al-Fiqh', 'Economics & Islamic Finance'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 160,
  },
  {
    slug: 'mawlana-habibur-rahman-azhari',
    bn: { name: 'মাওলানা হাসিবুর রহমান আজহারী', subjects: ['উসুলুত তাফসীর'] },
    en: { name: 'Mawlana Habibur Rahman Azhari', subjects: ['Usul al-Tafsir'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 170,
  },
  {
    slug: 'mawlana-abu-rafaan-siraj',
    bn: { name: 'মাওলানা আবু রাফআন সিরাজ', subjects: ['উলুমুল হাদীস'] },
    en: { name: 'Mawlana Abu Raf’an Siraj', subjects: ['Ulum al-Hadith'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 180,
  },
  {
    slug: 'hafizur-rahman',
    bn: { name: 'হাফিজুর রহমান', subjects: ['Introduction to Psychology'] },
    en: { name: 'Hafizur Rahman', subjects: ['Introduction to Psychology'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 190,
  },
  {
    slug: 'ustadh-shoaib-mumin',
    bn: { name: 'উস্তায শোয়াইব মুমিন', subjects: ['Islamic Governance (Siyasah Shar‘iyyah)'] },
    en: { name: 'Ustadh Shoaib Mumin', subjects: ['Islamic Governance (Siyasah Shar‘iyyah)'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 200,
  },
  {
    slug: 'mushfiqur-rahman-minar',
    bn: { name: 'মুশফিকুর রহমান মিনার', subjects: ['Foundation of Comparative Religion'] },
    en: { name: 'Mushfiqur Rahman Minar', subjects: ['Foundation of Comparative Religion'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 210,
  },
  {
    slug: 'ustadh-zakariya',
    bn: { name: 'উস্তায যাকারিয়া', subjects: ['Textual Skills (Part 2)'] },
    en: { name: 'Ustadh Zakariya', subjects: ['Textual Skills (Part 2)'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 220,
  },
  {
    slug: 'ustadh-junaid-al-asjad',
    bn: { name: 'উস্তায জুনায়েদ আল আসজাদ', subjects: ['Modern Ideologies & Intellectual Trends (Part 2)'] },
    en: { name: 'Ustadh Junaid Al Asjad', subjects: ['Modern Ideologies & Intellectual Trends (Part 2)'] },
    roles: ['faculty'],
    teams: ['core'],
    order: 230,
  },

  // Arabic team (আরবী টিম)
  {
    slug: 'ustadh-saad-hasan',
    bn: { name: 'উস্তায সাআদ হাসান', designation: 'কো-অর্ডিনেটর ও আরবি শিক্ষক' },
    en: { name: 'Ustadh Sa’ad Hasan', designation: 'Coordinator and Arabic teacher' },
    roles: ['faculty'],
    teams: ['arabic'],
    order: 500,
  },
  {
    slug: 'ustadh-hammad-nadvi',
    bn: { name: 'উস্তায হাম্মাদ নদভী', designation: 'আরবি শিক্ষক' },
    en: { name: 'Ustadh Hammad Nadvi', designation: 'Arabic teacher' },
    roles: ['faculty'],
    teams: ['arabic'],
    order: 510,
  },
  {
    slug: 'ustadh-lokman-hakim',
    bn: { name: 'উস্তাজ লোকমান হাকিম', designation: 'আরবি শিক্ষক' },
    en: { name: 'Ustadh Lokman Hakim', designation: 'Arabic teacher' },
    roles: ['faculty'],
    teams: ['arabic'],
    order: 520,
  },
  {
    slug: 'ustadh-mizan-muhsin',
    bn: { name: 'উস্তায মিজান মুহসিন', designation: 'আরবি শিক্ষক' },
    en: { name: 'Ustadh Mizan Muhsin', designation: 'Arabic teacher' },
    roles: ['faculty'],
    teams: ['arabic'],
    order: 530,
  },

  // Tajweed team (তাজবিদ টিম)
  {
    slug: 'ustadh-mahmudul-hasan',
    bn: { name: 'উস্তায মাহমুদুল হাসান', designation: 'প্রধান তাজবিদ শিক্ষক' },
    en: { name: 'Ustadh Mahmudul Hasan', designation: 'Head Tajweed teacher' },
    roles: ['faculty'],
    teams: ['tajweed'],
    order: 600,
  },
  {
    slug: 'ustadh-muhammad-sad',
    bn: { name: 'উস্তায মুহাম্মদ সা’দ', designation: 'তাজবিদ শিক্ষক' },
    en: { name: 'Ustadh Muhammad Sa’d', designation: 'Tajweed teacher' },
    roles: ['faculty'],
    teams: ['tajweed'],
    order: 610,
  },
  {
    slug: 'al-amin',
    bn: { name: 'উস্তায আল-আমিন', designation: 'তাজবিদ শিক্ষক' },
    en: { name: 'Ustadh Al-Amin', designation: 'Tajweed teacher' },
    roles: ['faculty'],
    teams: ['tajweed', 'english'],
    order: 620,
  },

  // Tarbiyah teacher
  {
    slug: 'ustadh-fariduddin-madani',
    bn: { name: 'উস্তায মাও. ফরিদুদ্দীন মাদানী', designation: 'তারবিয়াহ টিচার' },
    en: { name: 'Ustadh Mawlana Fariduddin Madani', designation: 'Tarbiyah teacher' },
    roles: ['faculty'],
    teams: ['tarbiyah'],
    order: 700,
  },

  // Language and computer teams (ইংরেজি, বাংলা, কম্পিউটার) — names only in the source document.
  {
    slug: 'naimur-rahman',
    bn: { name: 'নাইমুর রহমান' },
    en: { name: 'Naimur Rahman' },
    roles: ['faculty'],
    teams: ['english'],
    order: 800,
  },
  {
    slug: 'ubaydullah',
    bn: { name: 'উবায়দুল্লাহ' },
    en: { name: 'Ubaydullah' },
    roles: ['faculty'],
    teams: ['english'],
    order: 810,
  },
  {
    slug: 'sabbir-jadid',
    bn: { name: 'সাব্বির জাদিদ' },
    en: { name: 'Sabbir Jadid' },
    roles: ['faculty'],
    teams: ['bangla'],
    order: 900,
  },
  {
    slug: 'abul-kasem-adil',
    bn: { name: 'আবুল কাসেম আদিল' },
    en: { name: 'Abul Kasem Adil' },
    roles: ['faculty'],
    teams: ['bangla'],
    order: 910,
  },
  {
    slug: 'atik',
    bn: { name: 'আতীক' },
    en: { name: 'Atik' },
    roles: ['faculty'],
    teams: ['computer'],
    order: 1000,
  },
  {
    slug: 'jisan',
    bn: { name: 'জিসান' },
    en: { name: 'Jisan' },
    roles: ['faculty'],
    teams: ['computer'],
    order: 1010,
  },

  // The mathematics (ম্যাথ: টিম) and basic-science (বেসিক সাইন্স: টিম) teams are listed in the
  // source document without names; no people are seeded for them.
]

/**
 * Upserts every person by slug: the Bangla pass writes (creating the shared array row ids), the
 * English pass reuses those ids by position, exactly like the globals. Idempotent.
 */
export async function seedPeople(payload: Payload, req: PayloadRequest, people: SeedPerson[]) {
  for (const person of people) {
    const existing = await payload.find({
      collection: 'people',
      req,
      limit: 1,
      pagination: false,
      draft: true,
      depth: 0,
      where: { slug: { equals: person.slug } },
    })

    const bnData = toData(person, 'bn')
    const saved = existing.docs[0]
      ? await payload.update({
          collection: 'people',
          id: existing.docs[0].id,
          data: { ...bnData, _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'people',
          data: { ...bnData, _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })

    await payload.update({
      collection: 'people',
      id: saved.id,
      // Reuse the Bangla pass's array row ids so localised subject rows are shared, not duplicated.
      data: {
        ...(mergeIds(toData(person, 'en'), saved) as Record<string, unknown>),
        _status: 'published',
      } as never,
      locale: 'en',
      req,
      context: { disableRevalidate: true },
    })
  }
  payload.logger.info(`Seeded ${people.length} people.`)
}

function toData(person: SeedPerson, locale: 'bn' | 'en') {
  const side = person[locale]
  return {
    name: side.name,
    slug: person.slug,
    designation: side.designation ?? '',
    subjects: (side.subjects ?? []).map((subject) => ({ subject })),
    roles: person.roles,
    teams: person.teams ?? [],
    featuredOnHome: person.featuredOnHome ?? false,
    order: person.order,
  }
}
