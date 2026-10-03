import type { Payload, PayloadRequest } from 'payload'

import { mergeIds } from './index'

/**
 * The seven programmes (REQ-ACA-01..09), seeded verbatim from
 * docs/source/02-website-content-and-features-bn.extracted.txt. Bangla text is copied exactly,
 * including the document's punctuation ("বিষয় : বিবেচনা"). English is a plain, factual draft
 * the office can edit (marked EN draft in the PR); English one-liners for the summaries come
 * from the client's English home document where they exist.
 *
 * GAP-C3: codes follow one scheme. The document printed "CCAIS 101" for the certificate course
 * and "PGD-DIS 101" for the first diploma course; the seed normalises these to CCIS 101… and
 * PGD-DIS 1101…, keeping every other code as printed.
 *
 * GAP-C2: the document's heading totals are stored in sourceTotal* fields for the office. Where
 * they disagree with the rows (PYS sem 2: printed 19 credits, rows sum 17; PYS semester marks:
 * printed 600, rows sum 500; Diploma Y1S1: printed 25 credits, rows sum 24; Y2S1: printed 700
 * marks, rows sum 600), the site shows the computed values.
 *
 * GAP-C4: Islamic Research Methodology has no content in the document; it is seeded with status
 * "draft" and no invented matter.
 */

type Row = {
  code?: string
  title: string
  modules?: string[]
  credits?: number
  hours?: number
  marks?: number
}

type SeedCourse = {
  slug: string
  bn: {
    title: string
    summary?: string
    intro?: string
    objectives?: string[]
    formatDuration?: string
    formatBullets?: string[]
    eligibility?: string[]
    specialisationsLead?: string
    semesters?: {
      title?: string
      subtitle?: string
      durationLabel?: string
      note?: string
      sourceTotalCredits?: number
      sourceTotalMarks?: number
      sourceTotalHours?: number
      rows: Row[]
    }[]
    sdpNote?: string
    topicsLabel?: string
    topics?: string[]
    outcomesIntro?: string
    outcomes?: { heading: string; body: string }[]
  }
  en: {
    title: string
    summary?: string
    intro?: string
    objectives?: string[]
    formatDuration?: string
    formatBullets?: string[]
    eligibility?: string[]
    specialisationsLead?: string
    semesters?: {
      title?: string
      subtitle?: string
      durationLabel?: string
      note?: string
      sourceTotalCredits?: number
      sourceTotalMarks?: number
      sourceTotalHours?: number
      rows: Row[]
    }[]
    sdpNote?: string
    topicsLabel?: string
    topics?: string[]
    outcomesIntro?: string
    outcomes?: { heading: string; body: string }[]
  }
  arabicTitle?: string
  shortTitle?: string
  type: 'long' | 'short'
  status: 'active' | 'draft'
  residential?: 'residential' | 'nonResidential' | 'both'
  gender?: 'male' | 'female' | 'all'
  specialisations?: { name: string; arabicName?: string }[]
  sdpRows?: { title: string; objective: string; activities: string; hours: number; outcome: string }[]
  featured?: boolean
  order: number
}

export const coursesSeed: SeedCourse[] = [
  // ─── 1. Preparatory Year for Specialization (PYS) ────────────────────────────────────────
  {
    slug: 'preparatory-year-for-specialization',
    bn: {
      title: 'Preparatory Year for Specialization (PYS)',
      summary: 'এটি তরুণ ও মেধাবী আলেমদের জন্য গবেষণানির্ভর উচ্চশিক্ষা প্রোগ্রাম।',
      intro: 'এটি তরুণ ও মেধাবী আলেমদের জন্য গবেষণানির্ভর উচ্চশিক্ষা প্রোগ্রাম। যোগ্য আলেমদের আধুনিক জ্ঞান-বিজ্ঞানে দক্ষ করে আন্তর্জাতিক মানের দাঈ ও গবেষক হিসেবে গড়ে তোলার লক্ষ্যে এই কোর্সটি চালু করা হয়েছে। বিশেষভাবে এই কোর্সটি কওমি মাদরাসা পড়ুয়া মেধাবী আলেমদের জন্য ডিজাইন করা হয়েছে, যাতে তারা সমসাময়িক চ্যালেঞ্জ মোকাবেলা করে ইসলামের দাওয়াহ দিতে পারেন।',
      formatDuration: '৩ বছর',
      formatBullets: [
        'Preparatory Year for Specialization (PYS) ১ বছর মেয়াদী কোর্স। এটি সবার জন্য বাধ্যতামূলক এবং তাখাসসুসের প্রস্তুতিমূলক বর্ষ হিসেবে বিবেচিত হবে।',
        'দ্বিতীয় ও প্রস্তুতিমূলক বর্ষ শেষে ফলাফল ও আগ্রহের ভিত্তিতে চূড়ান্তভাবে বিভাগ নির্বাচন করা হবে।',
        'নির্বাচিত বিভাগে ২ বছর মেয়াদী উচ্চশিক্ষা কোর্স করা যাবে।',
      ],
      specialisationsLead: 'পাঁচটি তাখাচ্ছুছ বিভাগ যথাক্রমে:',
      semesters: [
        {
          title: '১ম সেমিস্টার',
          subtitle: 'মূল কোর্সসমূহ (Core Courses)',
          note: '(এই কোর্সগুলো এই শিক্ষাক্রমের প্রধান একাডেমিক ভিত্তি। এগুলো নির্দিষ্ট একাডেমিক ক্রেডিট বহন করে, যা মোট ক্রেডিট ও সিজিপিএ (CGPA) অর্জনে ভূমিকা রাখে এবং প্রোগ্রামটি সফলভাবে সম্পন্ন করার জন্য সম্পন্ন করা বাধ্যতামূলক।)',
          sourceTotalCredits: 17,
          sourceTotalMarks: 600,
          rows: [
            { code: 'PYS 1101', title: 'Islam and Da‘wah', modules: ['Introduction to Islam', 'Introduction to Da‘wah'], credits: 3, marks: 100 },
            { code: 'PYS 1102', title: 'Introduction to Islamic Sciences', modules: ['Ulumul Quran', 'Ulumul Hadith', 'Usulul Fiqh'], credits: 3, marks: 100 },
            { code: 'PYS 1103', title: 'Islamic History and Civilization', modules: ['Islam in South Asia', 'Intellectual History of Islamic Civilization'], credits: 3, marks: 100 },
            { code: 'PYS 1104', title: 'Media and Society', modules: ['Media and Journalism in Global Political Context', 'World Civilizations and Cultures', 'Foundation of Politics & International Relations', 'Legal Systems & General Jurisprudence'], credits: 4, marks: 100 },
            { code: 'PYS 1105', title: 'Critical Reading', modules: ['Critical Reading'], credits: 4, marks: 100 },
          ],
        },
        {
          title: '২য় সেমিস্টার',
          sourceTotalCredits: 19,
          sourceTotalMarks: 600,
          rows: [
            { code: 'PYS 1201', title: 'Human and Social Systems', modules: ['Psychology', 'Sociology', 'Economics & Islamic Finance', 'Islamic Governance (Siyasah Shar‘iyyah)'], credits: 4, marks: 100 },
            { code: 'PYS 1202', title: 'Philosophy and Religion', modules: ['Introduction to Philosophy', 'Modern Ideologies & Intellectual Trends', 'Foundation of Comparative Religion'], credits: 3, marks: 100 },
            { code: 'PYS 1203', title: 'Basic Science', modules: ['Physics', 'Chemistry', 'Biology', 'Astronomy', 'Environmental Science', 'Meteorology', 'Electricity', 'ICT'], credits: 4, marks: 100 },
            { code: 'PYS 1204', title: 'Research Methodology', modules: ['Research Methodology'], credits: 4, marks: 100 },
            { code: 'PYS 1205', title: 'Viva', credits: 2, marks: 100 },
          ],
        },
        {
          title: 'সম্পূরক কোর্সসমূহ (নন-ক্রেডিট বাধ্যতামূলক)',
          note: '(এই সম্পূরক কোর্সগুলো শিক্ষার্থীদের ভাষাগত, ডিজিটাল, গাণিতিক ও একাডেমিক দক্ষতা উন্নয়নের জন্য প্রণীত। কোর্সগুলো সম্পন্ন করা বাধ্যতামূলক এবং প্রাতিষ্ঠানিকভাবে মূল্যায়ন করা হলেও এর ফলাফল চূড়ান্ত ক্রেডিট বা সিজিপিএ (CGPA)-তে যুক্ত হয় না।)',
          sourceTotalHours: 500,
          sourceTotalMarks: 500,
          rows: [
            { code: 'PYS 1001', title: 'English Language', modules: ['English Language'], hours: 200, marks: 200 },
            { code: 'PYS 1002', title: 'Basic Computer', modules: ['MS Office'], hours: 100, marks: 100 },
            { code: 'PYS 1003', title: 'Basic Mathematics', modules: ['Basic Mathematics'], hours: 100, marks: 100 },
            { code: 'PYS 1004', title: 'Bangla Language', modules: ['Bangla Language'], hours: 100, marks: 100 },
          ],
        },
      ],
      sdpNote: '(এসডিপি (Student Development Program)-এর কার্যক্রমগুলো শিক্ষার্থীদের নৈতিকতা, নেতৃত্ব, যোগাযোগ দক্ষতা ও সামাজিক দায়িত্ববোধ বিকাশের জন্য বাধ্যতামূলক। তবে এসব কার্যক্রমের জন্য কোনো একাডেমিক ক্রেডিট বা সিজিপিএ (CGPA)-তে কোনো প্রভাব নেই।)',
    },
    en: {
      title: 'Preparatory Year for Specialization (PYS)',
      summary: '3-Year residential flagship program for talented young Ulama focusing on higher dawah & modern challenges.',
      intro: 'A research-based programme of higher education for young, gifted ulama. It was launched to make qualified ulama adept in modern arts and sciences, shaping them into dawah workers and researchers of international standing. The course is designed specifically for gifted graduates of qawmi madrasas, so that they can answer contemporary challenges and carry the dawah of Islam.',
      formatDuration: '3 years',
      formatBullets: [
        'Preparatory Year for Specialization (PYS) is a one-year course. It is compulsory for everyone and counts as the preparatory year for specialisation.',
        'At the end of the second, preparatory year, the department is chosen finally on the basis of results and inclination.',
        'A two-year higher-education course can then be taken in the chosen department.',
      ],
      specialisationsLead: 'The five specialisation (takhasus) departments, in order:',
      semesters: [
        {
          title: 'Semester 1',
          subtitle: 'Core Courses',
          note: '(These courses are the programme’s main academic foundation. They carry defined academic credits, count towards the total credits and the CGPA, and must be completed to finish the programme.)',
          sourceTotalCredits: 17,
          sourceTotalMarks: 600,
          rows: [
            { code: 'PYS 1101', title: 'Islam and Da‘wah', modules: ['Introduction to Islam', 'Introduction to Da‘wah'], credits: 3, marks: 100 },
            { code: 'PYS 1102', title: 'Introduction to Islamic Sciences', modules: ['Ulumul Quran', 'Ulumul Hadith', 'Usulul Fiqh'], credits: 3, marks: 100 },
            { code: 'PYS 1103', title: 'Islamic History and Civilization', modules: ['Islam in South Asia', 'Intellectual History of Islamic Civilization'], credits: 3, marks: 100 },
            { code: 'PYS 1104', title: 'Media and Society', modules: ['Media and Journalism in Global Political Context', 'World Civilizations and Cultures', 'Foundation of Politics & International Relations', 'Legal Systems & General Jurisprudence'], credits: 4, marks: 100 },
            { code: 'PYS 1105', title: 'Critical Reading', modules: ['Critical Reading'], credits: 4, marks: 100 },
          ],
        },
        {
          title: 'Semester 2',
          sourceTotalCredits: 19,
          sourceTotalMarks: 600,
          rows: [
            { code: 'PYS 1201', title: 'Human and Social Systems', modules: ['Psychology', 'Sociology', 'Economics & Islamic Finance', 'Islamic Governance (Siyasah Shar‘iyyah)'], credits: 4, marks: 100 },
            { code: 'PYS 1202', title: 'Philosophy and Religion', modules: ['Introduction to Philosophy', 'Modern Ideologies & Intellectual Trends', 'Foundation of Comparative Religion'], credits: 3, marks: 100 },
            { code: 'PYS 1203', title: 'Basic Science', modules: ['Physics', 'Chemistry', 'Biology', 'Astronomy', 'Environmental Science', 'Meteorology', 'Electricity', 'ICT'], credits: 4, marks: 100 },
            { code: 'PYS 1204', title: 'Research Methodology', modules: ['Research Methodology'], credits: 4, marks: 100 },
            { code: 'PYS 1205', title: 'Viva', credits: 2, marks: 100 },
          ],
        },
        {
          title: 'Supplementary courses (non-credit, compulsory)',
          note: '(These supplementary courses develop students’ linguistic, digital, mathematical and academic skills. Completing them is compulsory and the institute assesses them, but their results do not count towards the final credits or the CGPA.)',
          sourceTotalHours: 500,
          sourceTotalMarks: 500,
          rows: [
            { code: 'PYS 1001', title: 'English Language', modules: ['English Language'], hours: 200, marks: 200 },
            { code: 'PYS 1002', title: 'Basic Computer', modules: ['MS Office'], hours: 100, marks: 100 },
            { code: 'PYS 1003', title: 'Basic Mathematics', modules: ['Basic Mathematics'], hours: 100, marks: 100 },
            { code: 'PYS 1004', title: 'Bangla Language', modules: ['Bangla Language'], hours: 100, marks: 100 },
          ],
        },
      ],
      sdpNote: '(The Student Development Program activities are compulsory for developing students’ character, leadership, communication skills and sense of social responsibility. They carry no academic credits and have no effect on the CGPA.)',
    },
    arabicTitle: 'السنة التمهيدية للتخصص',
    shortTitle: 'PYS',
    type: 'long',
    status: 'active',
    residential: 'residential',
    gender: 'male',
    specialisations: [
      { name: 'Dawah and Comparative Religion', arabicName: 'الدعوة و مقارنة الأديان' },
      { name: 'Quranic Sciences and Tafsir', arabicName: 'علوم القرآن والتفسير' },
      { name: 'Fiqh and Ifta', arabicName: 'الفقه والإفتاء' },
      { name: 'Islamic Economics', arabicName: 'الاقتصاد الإسلامي' },
      { name: 'History of Islam', arabicName: 'التاريخ الإسلامي' },
    ],
    sdpRows: [
      { title: 'Tarbiyah Sessions', objective: 'Character building & spiritual growth', activities: 'Weekly talk, reflection', hours: 30, outcome: 'Moral development' },
      { title: 'Short Courses', objective: 'Skill enhancement', activities: 'Workshops, assignments', hours: 40, outcome: 'Practical skills' },
      { title: 'Seminars & Workshops', objective: 'Exposure to experts', activities: 'Guest lecture, discussion', hours: 10, outcome: 'Knowledge expansion' },
      { title: 'Co-Curricular Activities', objective: 'Leadership & teamwork', activities: 'Group work, events', hours: 50, outcome: 'Soft skills' },
      { title: 'Mandatory Reading', objective: 'Reading habit development', activities: 'Book reading, review', hours: 20, outcome: 'Critical thinking' },
      { title: 'Community Service', objective: 'Social responsibility', activities: 'Field work, volunteering', hours: 30, outcome: 'Civic engagement' },
    ],
    featured: true,
    order: 10,
  },

  // ─── 2. Certificate Course in Islamic Studies (CCIS) ─────────────────────────────────────
  {
    slug: 'certificate-course-in-islamic-studies',
    bn: {
      title: 'সার্টিফিকেট কোর্স ইন ইসলামিক স্টাডিজ',
      summary: '৬ মাস মেয়াদী এই বেসিক কোর্সে বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিধারী শিক্ষার্থীদের শেখানো হচ্ছে—আরবি ভাষা (সহজ কথোপকথন ও আয়াত অনুধাবন), তাজভীদসহ বিশুদ্ধ কুরআন তিলাওয়াত, বেসিক ইসলাম (আকীদা, ইবাদত ও মাসআলা-মাসায়েল) এবং দাওয়াহ, তারবিয়াহ ও সমকালীন জ্ঞান।',
      intro: '৬ মাস মেয়াদী এই বেসিক কোর্সে বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিধারী শিক্ষার্থীদের শেখানো হচ্ছে—আরবি ভাষা (সহজ কথোপকথন ও আয়াত অনুধাবন), তাজভীদসহ বিশুদ্ধ কুরআন তিলাওয়াত, বেসিক ইসলাম (আকীদা, ইবাদত ও মাসআলা-মাসায়েল) এবং দাওয়াহ, তারবিয়াহ ও সমকালীন জ্ঞান।',
      objectives: [
        'জেনারেল ধারায় শিক্ষিত মেধাবী তরুণদের কুরআন-সুন্নাহর ফরযে আইন ইলম, তাজভীদভিত্তিক বিশুদ্ধ তিলাওয়াত, প্রাথমিক আরবি ভাষা এবং রাসূলুল্লাহ (সা.)-এর সীরাতের জ্ঞানে সমৃদ্ধ করা।',
        'শিক্ষার্থীদের মাঝে সুন্নাহর বাস্তবায়ন, চারিত্রিক তারবিয়াহ এবং দাওয়াহর প্রায়োগিক দক্ষতা তৈরি করা।',
        'শিক্ষার্থীদের আত্মোন্নয়ন সাধন ও দক্ষ দাঈ হিসেবে গড়ে তোলার লক্ষ্যে পরবর্তী উচ্চতর দুই বছর মেয়াদী কোর্সের উপযোগী করে তোলা।',
      ],
      formatDuration: '০৬ মাস',
      eligibility: [
        'স্বীকৃত কলেজ-বিশ্ববিদ্যালয় থেকে ন্যূনতম স্নাতক সম্পন্ন করা।',
        'সিজিপিএ ২.৫ এর উপরে থাকা।',
        'ব্যস্ততামুক্ত হয়ে পূর্ণকালীন পড়াশোনার সক্ষমতা থাকা।',
        'ভর্তি পরীক্ষায় (লিখিত ও মৌখিক) উত্তীর্ণ হওয়া।',
      ],
      semesters: [
        {
          sourceTotalCredits: 16,
          sourceTotalMarks: 400,
          rows: [
            { code: 'CCIS 101', title: 'Quran Recitation & Tajweed', credits: 4, marks: 100 },
            { code: 'CCIS 102', title: 'Arabic Language', credits: 4, marks: 100 },
            { code: 'CCIS 103', title: 'Introduction to Islam', credits: 2, marks: 50 },
            { code: 'CCIS 104', title: 'Essential Fiqh & Daily Sunnah', credits: 2, marks: 50 },
            { code: 'CCIS 105', title: 'Sirah & Islamic History', credits: 2, marks: 50 },
            { title: 'Viva', credits: 2, marks: 50 },
          ],
        },
      ],
    },
    en: {
      title: 'Certificate Course in Islamic Studies',
      summary: '6-Month foundational course in Tajweed, basic Arabic, Fiqh, and Sirah for university graduates.',
      intro: 'This six-month foundation course teaches university graduates Arabic (simple conversation and understanding the verses), correct Quran recitation with tajweed, basic Islam (aqidah, worship and everyday rulings), and dawah, tarbiyah and contemporary knowledge.',
      objectives: [
        'To enrich gifted young men of the general stream with personally obligatory knowledge of the Quran and Sunnah, tajweed-based recitation, elementary Arabic, and the Sirah of the Messenger of Allah (peace be upon him).',
        'To build in students the practice of the Sunnah, character formation (tarbiyah) and the practical skills of dawah.',
        'To prepare students, through self-development, for the higher two-year course that trains capable da‘is.',
      ],
      formatDuration: '6 months',
      eligibility: [
        'A bachelor’s degree or above from a recognised college or university.',
        'A CGPA of 2.5 or above.',
        'The ability to study full time, free of other commitments.',
        'Passing the admission test (written and oral).',
      ],
      semesters: [
        {
          sourceTotalCredits: 16,
          sourceTotalMarks: 400,
          rows: [
            { code: 'CCIS 101', title: 'Quran Recitation & Tajweed', credits: 4, marks: 100 },
            { code: 'CCIS 102', title: 'Arabic Language', credits: 4, marks: 100 },
            { code: 'CCIS 103', title: 'Introduction to Islam', credits: 2, marks: 50 },
            { code: 'CCIS 104', title: 'Essential Fiqh & Daily Sunnah', credits: 2, marks: 50 },
            { code: 'CCIS 105', title: 'Sirah & Islamic History', credits: 2, marks: 50 },
            { title: 'Viva', credits: 2, marks: 50 },
          ],
        },
      ],
    },
    shortTitle: 'CCIS',
    type: 'long',
    status: 'active',
    residential: 'both',
    gender: 'male',
    featured: true,
    order: 20,
  },

  // ─── 3. Diploma in Dawah & Islamic Studies ───────────────────────────────────────────────
  {
    slug: 'diploma-in-dawah-and-islamic-studies',
    bn: {
      title: 'ডিপ্লোমা ইন দাওয়াহ অ্যান্ড ইসলামিক স্টাডিজ',
      summary: 'যারা পূর্বে বর্ণিত ০৬ মাসের প্রাথমিক সার্টিফিকেট কোর্সটি সফলতার সাথে সম্পন্ন করে উত্তীর্ণ হয়েছেন, তাঁদের জন্য এই উচ্চতর ডিপ্লোমা কোর্সটি সাজানো হয়েছে।',
      intro: 'যারা পূর্বে বর্ণিত ০৬ মাসের প্রাথমিক সার্টিফিকেট কোর্সটি সফলতার সাথে সম্পন্ন করে উত্তীর্ণ হয়েছেন, তাঁদের জন্য এই উচ্চতর ডিপ্লোমা কোর্সটি সাজানো হয়েছে। দ্বীনের দাঈ হিসেবে পথচলার নিমিত্তে ইসলামের বুনিয়াদি ও মাধ্যমিক স্তরের গভীর জ্ঞান অর্জনে আগ্রহী শিক্ষার্থীদের আরবি ভাষা ও শাস্ত্রীয় জ্ঞানের (নাহু, সরফ, ফিকহ ও হাদীস) একটি মজবুত ভিত্তি তৈরি করে দিতে এই কোর্সে উচ্চতর পাঠদান করা হয়।',
      objectives: [
        'শিক্ষার্থীদের আরবি ভাষা ও শাস্ত্রীয় জ্ঞানের একটি মজবুত ভিত্তি তৈরি করে দেওয়া, যেন তাঁরা সরাসরি মূল উৎস থেকে কুরআন ও হাদীসের মর্ম অনুধাবনের অনুশীলন করতে পারেন।',
        'সমকালীন প্রেক্ষাপট ও দাওয়াহর আধুনিক কলাকৌশল শিক্ষার মাধ্যমে তাদের দক্ষ দাঈ ও আদর্শ মানুষ হিসেবে গড়ে তোলা।',
        'সমাজ সংস্কারে বুদ্ধিবৃত্তিক ও কার্যকর ভূমিকা পালনের যোগ্যতা তৈরি করা।',
      ],
      formatDuration: '০২ বছর (৪টি সেমিস্টার)',
      eligibility: ['৬ মাস মেয়াদী সার্টিফিকেট কোর্সে সফলভাবে উত্তীর্ণ শিক্ষার্থী।'],
      semesters: [
        {
          title: '১ম বছর (১ম সেমিস্টার)',
          durationLabel: 'সময়কাল: ৬ মাস',
          sourceTotalCredits: 25,
          sourceTotalMarks: 800,
          rows: [
            { code: 'PGD-DIS 1101', title: 'Beautifying Quran Recitation & Tajweed (II)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1102', title: 'Quran Translation (5 Parts)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1103', title: 'Hadith Studies (I)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1104', title: 'Fiqh Studies', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1105', title: 'Arabic Language & Literature', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1106', title: 'Arabic Grammar', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1107', title: 'Introduction to Da‘wah', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1108', title: 'Islamic Intellectual History', credits: 3, marks: 100 },
          ],
        },
        {
          title: '১ম বছর (২য় সেমিস্টার)',
          durationLabel: 'সময়কাল: ৬ মাস',
          sourceTotalCredits: 23,
          sourceTotalMarks: 750,
          rows: [
            { code: 'PGD-DIS 1201', title: 'Quran Translation (7 Parts)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1202', title: 'Hadith Studies (II)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1203', title: 'Fiqhul Ibadat', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1204', title: 'Advanced Arabic Language & Literature', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1205', title: 'Advanced Arabic Grammar', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1206', title: 'Contemporary Da‘wah', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1207', title: 'Dawah in South Asia', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1208', title: 'Viva', credits: 2, marks: 50 },
          ],
        },
        {
          title: '২য় বছর (১ম সেমিস্টার)',
          durationLabel: 'সময়কাল: ৬ মাস',
          sourceTotalCredits: 22,
          sourceTotalMarks: 700,
          rows: [
            { code: 'PGD-DIS 2101', title: 'Study of al-Quran & Short Tafsir (8 Parts)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2102', title: 'Advanced Hadith Studies (I)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2103', title: 'Fiqhul Muamalat & Usulul Fiqh (I)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2104', title: 'Arabic literature & Ilmul Balagah (I)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2105', title: 'Comparative Religion', credits: 3, marks: 100 },
            { code: 'PGD-DIS 2106', title: 'Contemporary Ideologies', credits: 3, marks: 100 },
          ],
        },
        {
          title: '২য় বছর (২য় সেমিস্টার)',
          durationLabel: 'সময়কাল: ৬ মাস',
          sourceTotalCredits: 24,
          sourceTotalMarks: 650,
          rows: [
            { code: 'PGD-DIS 2201', title: 'Study of al-Quran & Short Tafsir (10 Parts)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2202', title: 'Advanced Hadith Studies (II)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2203', title: 'Fiqhul Muamalat & Usulul Fiqh (II)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2204', title: 'Advanced Arabic literature', credits: 3, marks: 100 },
            { code: 'PGD-DIS 2205', title: 'Islamic Sciences', credits: 3, marks: 100 },
            { code: 'PGD-DIS 2206', title: 'Dissertation', credits: 4, marks: 100 },
            { title: 'Viva', credits: 2, marks: 50 },
          ],
        },
      ],
      outcomesIntro: 'এই দীর্ঘমেয়াদী ও নিবিড় কোর্সটি সফলভাবে সম্পন্ন করার পর শিক্ষার্থীদের সামনে উচ্চতর ইসলামী জ্ঞান অর্জন ও বহুমুখী গবেষণার এক বিস্তৃত ক্ষেত্র উন্মোচিত হবে। অর্জিত ইলমী ভিত্তিকে কাজে লাগিয়ে শিক্ষার্থীরা নিম্নোক্ত পথগুলোতে অগ্রসর হতে পারবেন:',
      outcomes: [
        {
          heading: 'উচ্চশিক্ষা ও আন্তর্জাতিক ডিগ্রি অর্জন',
          body: 'কোর্সের অর্জিত গভীর জ্ঞানকে পাথেয় করে শিক্ষার্থীরা দেশ-বিদেশের বিভিন্ন বিশ্ববিদ্যালয় ও উচ্চতর শিক্ষা প্রতিষ্ঠান থেকে ইসলামিক স্টাডিজ ও সংশ্লিষ্ট বিষয়ে উচ্চতর ডিগ্রি অর্জন করতে পারবেন।',
        },
        {
          heading: 'প্রথাগত ধারায় আলেম হওয়ার সুযোগ',
          body: 'যেসকল শিক্ষার্থী প্রাতিষ্ঠানিক ও ঐতিহ্যগত ধারায় পূর্ণাঙ্গ আলেম হতে আন্তরিকভাবে ইচ্ছুক, তাঁরা দেশের স্বনামধন্য মাদরাসাসমূহের ‘শরহে বেকায়া’ জামাতে সরাসরি ভর্তি হয়ে ইলমে দ্বীনের উচ্চতর পাঠ গ্রহণ করতে পারবেন।',
        },
        {
          heading: 'কর্মক্ষেত্রে প্রবেশ ও দাওয়াহ কার্যক্রম',
          body: 'এই কোর্সটি সফলভাবে সম্পন্ন করার মাধ্যমে শিক্ষার্থীরা অর্জিত জ্ঞান ও দক্ষতা অনুযায়ী স্ব-স্ব কর্মক্ষেত্রে পেশাদারিত্বের সাথে প্রবেশ করতে সক্ষম হবেন। এর পাশাপাশি, দক্ষ দাঈ হিসেবে বৃহত্তর পরিসরে দাওয়াহ কার্যক্রম পরিচালনার যোগ্যতা অর্জন করবেন। একই সাথে, নিজ নিজ কর্মক্ষেত্রে সততা, নৈতিকতা ও নিষ্ঠার সাথে দায়িত্ব পালনের মাধ্যমে সমাজে একটি ইতিবাচক ও টেকসই পরিবর্তন আনয়নে তারা কার্যকর ভূমিকা রাখবেন।',
        },
      ],
    },
    en: {
      title: 'Diploma in Dawah & Islamic Studies',
      summary: '2-Year (4 Semesters) advanced diploma for CCIS graduates covering deep classical and modern dawah tools.',
      intro: 'This higher diploma is arranged for those who have successfully completed the six-month certificate course described above. It teaches at an advanced level, giving students eager for deep foundational and intermediate knowledge of Islam a firm base in the Arabic language and the classical sciences (nahw, sarf, fiqh and hadith) for their journey as da‘is of the deen.',
      objectives: [
        'To give students a firm foundation in Arabic and the classical sciences, so that they can practise understanding the Quran and hadith directly from their sources.',
        'To shape them into capable da‘is and exemplary people, through the contemporary context and the modern methods of dawah.',
        'To build the competence to play an intellectual and effective role in reforming society.',
      ],
      formatDuration: '2 years (4 semesters)',
      eligibility: ['Students who have successfully passed the six-month certificate course.'],
      semesters: [
        {
          title: 'Year 1 (Semester 1)',
          durationLabel: 'Duration: 6 months',
          sourceTotalCredits: 25,
          sourceTotalMarks: 800,
          rows: [
            { code: 'PGD-DIS 1101', title: 'Beautifying Quran Recitation & Tajweed (II)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1102', title: 'Quran Translation (5 Parts)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1103', title: 'Hadith Studies (I)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1104', title: 'Fiqh Studies', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1105', title: 'Arabic Language & Literature', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1106', title: 'Arabic Grammar', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1107', title: 'Introduction to Da‘wah', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1108', title: 'Islamic Intellectual History', credits: 3, marks: 100 },
          ],
        },
        {
          title: 'Year 1 (Semester 2)',
          durationLabel: 'Duration: 6 months',
          sourceTotalCredits: 23,
          sourceTotalMarks: 750,
          rows: [
            { code: 'PGD-DIS 1201', title: 'Quran Translation (7 Parts)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1202', title: 'Hadith Studies (II)', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1203', title: 'Fiqhul Ibadat', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1204', title: 'Advanced Arabic Language & Literature', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1205', title: 'Advanced Arabic Grammar', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1206', title: 'Contemporary Da‘wah', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1207', title: 'Dawah in South Asia', credits: 3, marks: 100 },
            { code: 'PGD-DIS 1208', title: 'Viva', credits: 2, marks: 50 },
          ],
        },
        {
          title: 'Year 2 (Semester 1)',
          durationLabel: 'Duration: 6 months',
          sourceTotalCredits: 22,
          sourceTotalMarks: 700,
          rows: [
            { code: 'PGD-DIS 2101', title: 'Study of al-Quran & Short Tafsir (8 Parts)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2102', title: 'Advanced Hadith Studies (I)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2103', title: 'Fiqhul Muamalat & Usulul Fiqh (I)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2104', title: 'Arabic literature & Ilmul Balagah (I)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2105', title: 'Comparative Religion', credits: 3, marks: 100 },
            { code: 'PGD-DIS 2106', title: 'Contemporary Ideologies', credits: 3, marks: 100 },
          ],
        },
        {
          title: 'Year 2 (Semester 2)',
          durationLabel: 'Duration: 6 months',
          sourceTotalCredits: 24,
          sourceTotalMarks: 650,
          rows: [
            { code: 'PGD-DIS 2201', title: 'Study of al-Quran & Short Tafsir (10 Parts)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2202', title: 'Advanced Hadith Studies (II)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2203', title: 'Fiqhul Muamalat & Usulul Fiqh (II)', credits: 4, marks: 100 },
            { code: 'PGD-DIS 2204', title: 'Advanced Arabic literature', credits: 3, marks: 100 },
            { code: 'PGD-DIS 2205', title: 'Islamic Sciences', credits: 3, marks: 100 },
            { code: 'PGD-DIS 2206', title: 'Dissertation', credits: 4, marks: 100 },
            { title: 'Viva', credits: 2, marks: 50 },
          ],
        },
      ],
      outcomesIntro: 'After completing this long and intensive course, a broad field of higher Islamic knowledge and wide-ranging research opens before the students. Building on the scholarly foundation they have gained, students can proceed along the following paths:',
      outcomes: [
        {
          heading: 'Higher education and international degrees',
          body: 'Taking the deep knowledge gained in the course as their provision, students can earn higher degrees in Islamic Studies and related subjects from universities and higher education institutions at home and abroad.',
        },
        {
          heading: 'The opportunity to become an alem in the traditional stream',
          body: 'Students who sincerely wish to become fully qualified ulama through the institutional, traditional route can enrol directly in the ‘Sharh-e-Bekaya class of the country’s renowned madrasas and pursue advanced study of the sciences of the deen.',
        },
        {
          heading: 'Entering the workplace and dawah work',
          body: 'Having completed the course, students can enter their professions with professionalism, according to the knowledge and skills gained. Alongside this, they will be qualified to conduct dawah activities on a wider scale as capable da‘is. And by fulfilling their duties in their own fields with honesty, integrity and dedication, they will play an effective role in bringing positive, lasting change to society.',
        },
      ],
    },
    shortTitle: 'PGD-DIS',
    type: 'long',
    status: 'active',
    residential: 'both',
    featured: true,
    order: 30,
  },

  // ─── 4. Arabic Language Teacher Training ────────────────────────────────────────────────
  {
    slug: 'arabic-language-teacher-training',
    bn: {
      title: 'আরবি ভাষা শিক্ষক প্রশিক্ষণ প্রোগ্রাম',
      summary: 'এই কোর্সটি মূলত সেসব আরবি ভাষাবিদ ও আলেমদের জন্য ডিজাইন করা হয়েছে, যারা ইংলিশ মিডিয়াম, মডার্ন ইসলামিক স্কুল বা মাদানি নেসাবে আরবি ভাষার শিক্ষক হিসেবে সফল ক্যারিয়ার গড়তে চান।',
      intro: 'এই কোর্সটি মূলত সেসব আরবি ভাষাবিদ ও আলেমদের জন্য ডিজাইন করা হয়েছে, যারা ইংলিশ মিডিয়াম, মডার্ন ইসলামিক স্কুল বা মাদানি নেসাবে আরবি ভাষার শিক্ষক হিসেবে সফল ক্যারিয়ার গড়তে চান। কোর্সে আরবি ভাষার কোনো বেসিক শেখানো হবে না, বরং একজন আরবি জানা আলেমকে কীভাবে আধুনিক ও ইসলামিক শিক্ষাপ্রতিষ্ঠানের উপযোগী স্মার্ট শিক্ষক হিসেবে গড়ে তোলা যায়—তার ওপর ফোকাস করা হয়েছে। প্রথাগত মুখস্থনির্ভর পদ্ধতির পরিবর্তে আধুনিক ভাষাশিক্ষা পদ্ধতি (CLT), শিশু মনস্তত্ত্ব, লেসন প্ল্যানিং, ডিজিটাল প্রযুক্তির ব্যবহারে পারদর্শী হওয়ার কৌশল রপ্ত করানো হবে।',
      objectives: [
        'আধুনিক ও কার্যকর পাঠদান পদ্ধতিতে শিক্ষকদের দক্ষতা বৃদ্ধি করা।',
        'যোগাযোগ দক্ষতা, শিশু মনস্তত্ত্ব এবং ক্লাসরুম ম্যানেজমেন্টের জ্ঞান প্রদানের মাধ্যমে পেশাগত মানোন্নয়ন ঘটানো।',
        'প্রযুক্তিগত প্রশিক্ষণের মাধ্যমে শিক্ষকদের আত্মবিশ্বাসী করে তোলা এবং শিক্ষাকে আরও শিক্ষার্থীবান্ধব করা।',
      ],
      formatDuration: '১৫ দিন',
      eligibility: [
        'কওমি থেকে তাকমিল, আলিয়া থেকে ফাযিল ও আরবি বিশ্ববিদ্যালয় থেকে স্নাতকে (জায়্যিদ জিদ্দান (A) বা তদূর্ধ্ব নম্বর পেয়ে উত্তীর্ণ)',
      ],
      topicsLabel: 'কোর্স কারিকুলাম',
      topics: [
        'প্রফেশনালিজম অ্যান্ড পার্সোনাল ডেভেলপমেন্ট',
        'অনারবদের জন্য আরবি ভাষা শিক্ষক প্রশিক্ষণ কারিকুলাম',
        'আর্লি চাইল্ডহুড বা প্রারম্ভিক শিশুশিক্ষার কৌশল',
        'ল্যাঙ্গুয়েজ পেডাগজি',
        'মাইক্রো-টিচিং',
        'ক্লাসরুম ডেমনস্ট্রেশন',
        'ক্যারিয়ার গাইডেন্স',
        'এডুকেশনাল টেকনোলজি',
      ],
    },
    en: {
      title: 'Arabic Language Teacher Training',
      summary: '15-Day intensive pedagogy and modern CLT-method training for Arabic scholars.',
      intro: 'This course is designed for Arabic linguists and ulama who want to build a successful career as Arabic teachers in English-medium schools, modern Islamic schools or the Madani curriculum. No basic Arabic is taught here; the focus is on how an alem who knows Arabic can be developed into a smart teacher suited to modern Islamic institutions. Instead of the traditional rote method, participants are trained in modern language pedagogy (CLT), child psychology, lesson planning and the confident use of digital technology.',
      objectives: [
        'To develop teachers’ skills in modern, effective teaching methods.',
        'To raise professional standards through training in communication skills, child psychology and classroom management.',
        'To build teachers’ confidence through technological training and make learning more student-friendly.',
      ],
      formatDuration: '15 days',
      eligibility: [
        'Takmil from a qawmi madrasa, Fazil from the Alia stream, or a bachelor’s degree from an Arabic university (passed with jayyid jiddan (A) or above).',
      ],
      topicsLabel: 'Curriculum',
      topics: [
        'Professionalism and personal development',
        'Curriculum for teaching Arabic to non-Arabs',
        'Early childhood and initial education methods',
        'Language pedagogy',
        'Micro-teaching',
        'Classroom demonstration',
        'Career guidance',
        'Educational technology',
      ],
    },
    arabicTitle: 'برنامج تدريب المعلمين على اللغة العربية',
    type: 'short',
    status: 'active',
    residential: 'both',
    gender: 'male',
    featured: true,
    order: 40,
  },

  // ─── 5. Ramadan Dawah Training ──────────────────────────────────────────────────────────
  {
    slug: 'ramadan-dawah-training',
    bn: {
      title: 'রমাদান উপলক্ষে দাওয়াহ প্রশিক্ষণ',
      summary: 'এই বাস্তবতা বিবেচনায় নিয়ে উক্ত সংকট উত্তরণ এবং মুসলিম উম্মাহর বিবেক জাগ্রত করার লক্ষ্যে যুগের চ্যালেঞ্জ মোকাবিলায় সক্ষম, জ্ঞানসমৃদ্ধ ও দক্ষ দাঈ গড়ে তোলার উদ্দেশ্যে এই প্রশিক্ষণ কর্মসূচির আয়োজন করা হয়।',
      intro: 'বাংলাদেশে দাওয়াহ অঙ্গনে কর্মরত অনেকের মধ্যে প্রায়োগিক দক্ষতার ঘাটতি পরিলক্ষিত হয়, যা কখনও কখনও সামগ্রিকভাবে আলেম সমাজের জন্য বিব্রতকর পরিস্থিতির সৃষ্টি করে। এই বাস্তবতা বিবেচনায় নিয়ে উক্ত সংকট উত্তরণ এবং মুসলিম উম্মাহর বিবেক জাগ্রত করার লক্ষ্যে যুগের চ্যালেঞ্জ মোকাবিলায় সক্ষম, জ্ঞানসমৃদ্ধ ও দক্ষ দাঈ গড়ে তোলার উদ্দেশ্যে এই প্রশিক্ষণ কর্মসূচির আয়োজন করা হয়।',
      objectives: [
        'দাওয়াহর জ্ঞান অর্জনে আগ্রহী সর্বসাধারণের জন্য একটি নির্ভরযোগ্য প্ল্যাটফর্ম তৈরি।',
        'কর্মজীবনের পাশাপাশি প্রত্যেক মুসলিমকে নিজ অঙ্গনে ইসলামের একজন কার্যকর দাঈ হিসেবে গড়ে তোলা।',
        'প্রায়োগিক ও যুগোপযোগী প্রশিক্ষণের মাধ্যমে দাওয়াহর দক্ষতা বৃদ্ধি করে সমসাময়িক চ্যালেঞ্জ মোকাবেলায় সক্ষম করা।',
      ],
      formatDuration: '২০ দিন',
      eligibility: [
        'কওমি থেকে তাকমীল, আলিয়া থেকে ফাযিল-কামিল এবং বিশ্ববিদ্যালয় থেকে অনার্স-মাস্টার্সে অন্তত ৭০% নম্বর পেয়ে উত্তীর্ণ',
      ],
      topicsLabel: 'প্রশিক্ষণের বিষয়সমূহ',
      topics: [
        'কনফ্লিক্ট ম্যানেজমেন্ট',
        'ইমোশনাল ইন্টেলিজেন্স',
        'ধর্মত্যাগ ও পশ্চিমা সংস্কৃতির বিভ্রম',
        'টাইম ম্যানেজমেন্ট',
        'ম্যানারস এন্ড এটিকেট',
        'পাবলিক স্পিকিং',
        'ইফেক্টিভ কমিউনিকেশন',
        'লিডারশিপ, দাওয়াহ ও মনস্তত্ত্ব',
        'দ্বীন প্রচারে মিডিয়া ও মাঠ : কিছু বিবেচনা',
        'প্রাচ্যবিদদের ইসলাম চর্চা ও পশ্চিমা আগ্রাসন',
        'অর্থনীতি, পুঁজিবাদ ও ইসলাম',
        'নবীদের দাওয়াতি পদ্ধতি',
        'দাঈর ব্যক্তিত্ব ও গুণাবলি',
        'সাইন্টিজম : ইসলাম ও বিজ্ঞানের সংঘাত/বিজ্ঞান ও বিজ্ঞানবাদ',
        'বাংলাদেশ ও ইসলাম : আত্মপরিচয়ের সন্ধানে',
        'সেকুলারিজম',
        'মুসলিম উম্মাহর পতনে বিশ্বের কী ক্ষতি হলো',
        'ইসলামে নারীর অধিকার ও নারীবাদী ফেতনা',
        'প্যারেন্টিং',
        'অমুসলিমদের মাঝে দাওয়াহ : পথ-পদ্ধতি',
        'কাদিয়ানি মতবাদ ও খতমে নবুওয়াত',
        'সংশয়বাদ ও নাস্তিক্যবাদ : মোকাবেলা এবং উত্তরণের উপায়',
        'LGBTQ ও জেন্ডার ফিতনা : ভয়াবহতা ও জরুরী নিবেদন',
        'ইসলামি ইতিহাসের ভৌগোলিক পরিচিতি',
        'দাওয়াহ ও মার্কেটিং',
      ],
    },
    en: {
      title: 'Ramadan Dawah Training',
      summary: '20-Day practical skill program covering contemporary issues, public speaking, and intellectual challenges.',
      intro: 'A lack of practical skill is often seen among those working in dawah in Bangladesh, which sometimes creates embarrassing situations for the alem community as a whole. With this reality in view, this training programme is organised with the aim of raising capable, knowledgeable and skilled da‘is who can face the challenges of the age and awaken the conscience of the Muslim ummah.',
      objectives: [
        'To build a reliable platform for everyone eager to learn dawah.',
        'To shape every Muslim, alongside their working life, into an effective da‘i in their own circle.',
        'To make them able to face contemporary challenges by sharpening dawah skills through practical, up-to-date training.',
      ],
      formatDuration: '20 days',
      eligibility: [
        'Takmil from a qawmi madrasa, Fazil-Kamil from the Alia stream, or an honours or master’s degree passed with at least 70% marks.',
      ],
      topicsLabel: 'Topics covered',
      topics: [
        'Conflict management',
        'Emotional intelligence',
        'Apostasy and the illusions of Western culture',
        'Time management',
        'Manners and etiquette',
        'Public speaking',
        'Effective communication',
        'Leadership, dawah and psychology',
        'Media and the field in spreading the deen: some considerations',
        'Orientalist studies of Islam and Western aggression',
        'Economics, capitalism and Islam',
        'The dawah methods of the prophets',
        'The character and qualities of a da‘i',
        'Scientism: the clash of Islam and science / science and scientism',
        'Bangladesh and Islam: in search of identity',
        'Secularism',
        'What the world lost when the Muslim ummah declined',
        'Women’s rights in Islam and the feminist fitnah',
        'Parenting',
        'Dawah among non-Muslims: ways and methods',
        'The Qadiyani creed and the finality of prophethood',
        'Scepticism and atheism: confronting and overcoming them',
        'LGBTQ and gender fitnah: its gravity and an urgent appeal',
        'A geographic introduction to Islamic history',
        'Dawah and marketing',
      ],
    },
    type: 'short',
    status: 'active',
    residential: 'both',
    gender: 'male',
    featured: true,
    order: 50,
  },

  // ─── 6. Azan Training Program ───────────────────────────────────────────────────────────
  {
    slug: 'azan-training-program',
    bn: {
      title: 'আযান প্রশিক্ষণ প্রোগ্রাম',
      summary: 'এই প্রশিক্ষণটি সাজানো হয়েছে একজন মুয়াযযিনকে আদর্শ ও দক্ষ হিসেবে গড়ে তোলার জন্য।',
      intro: 'এই প্রশিক্ষণটি সাজানো হয়েছে একজন মুয়াযযিনকে আদর্শ ও দক্ষ হিসেবে গড়ে তোলার জন্য। এখানে কেবল আযানের সুর-ই নয়, বরং শব্দের বিশুদ্ধ উচ্চারণ (মাখরাজ), সংশ্লিষ্ট মাসআলা-মাসায়েল এবং একজন মুয়াযযিনের ব্যক্তিগত আমল ও উন্নত ব্যক্তিত্ব গঠনের ওপর বিশেষ গুরুত্বারোপ করা হয়। কণ্ঠের যত্ন ও আধুনিক প্রযুক্তি ব্যবহারের পাশাপাশি এই প্রোগ্রামটি মুয়াযযিনদের সামাজিক নেতৃত্বের গুণাবলি অর্জনেও সহায়তা করে।',
      objectives: [
        'সুমধুর সুর ও বিশুদ্ধ উচ্চারণের মাধ্যমে বাংলাদেশে আযানের একটি মানসম্মত ধারা তৈরি করা।',
        'আযানের ধ্বনির মাধ্যমে মানুষের অন্তরে ইসলামের প্রতি গভীর অনুরাগ সৃষ্টি এবং ঘরে ঘরে দ্বীনের দাওয়াত পৌঁছে দেওয়া।',
        'মুয়াজ্জিনকে কেবল মসজিদের খাদেমের গণ্ডিতে না রেখে, সমাজের একজন আদর্শ ‘দাঈ’ (আহ্বানকারী) ও পথপ্রদর্শক হিসেবে গড়ে তোলা।',
      ],
      formatDuration: '১৫ দিন',
      eligibility: [
        'হাফেজ/আলেম অথবা নাহবেমীর/দাখিল কিংবা তদূর্ধ্ব পর্যায়ের শিক্ষার্থী হতে হবে।',
        'মুয়াযযিন হিসেবে কর্মরত অথবা এই পেশায় আগ্রহী হতে হবে।',
        'অবশ্যই কণ্ঠে সুর এবং তা রপ্ত করার যোগ্যতা থাকতে হবে।',
      ],
      topicsLabel: 'প্রশিক্ষণ কারিকুলাম',
      topics: [
        'আযান ও ইক্বামাতের প্রতিটি শব্দের নিখুঁত এবং বিশুদ্ধ উচ্চারণ নিশ্চিতকরণ।',
        'আযান ও ইক্বামাত সংশ্লিষ্ট মাসআলা-মাসায়েল।',
        'পবিত্র মক্কা ও মদিনার ঐতিহ্যবাহী সুরসহ বিশ্ববিখ্যাত ৫টি সুরের ওপর নিবিড় অনুশীলন।',
        'কণ্ঠের বিশেষ যত্ন, দীর্ঘ শ্বাস নিয়ন্ত্রণ এবং কণ্ঠের স্কেল ঠিক রাখার ব্যায়াম।',
        'দাঈর বৈশিষ্ট্য ও গুনাবলি।',
        'তারবিয়াহ ও পার্সোনালিটি ডেভেলপমেন্ট।',
        'কমিউনিকেশন ও নেগোসিয়েশন স্কিল।',
        'সাউন্ড সিস্টেম ম্যানেজমেন্ট।',
        'টাইম ম্যানেজমেন্ট।',
      ],
    },
    en: {
      title: 'Azan Training Program',
      summary: '15-Day course focusing on proper pronunciation (Makhraj), vocal technique, and Muazzin tarbiyah.',
      intro: 'This training is arranged to shape a muezzin who is exemplary and skilled. It lays particular stress not only on the melody of the azan but on the correct pronunciation of its words (makhraj), the related rulings, and the muezzin’s personal practice and character. Alongside voice care and the use of modern technology, the programme also helps muezzins acquire the qualities of social leadership.',
      objectives: [
        'To set a standard of azan in Bangladesh through sweet melody and correct pronunciation.',
        'To create deep love for Islam in people’s hearts through the sound of the azan, and carry the call of the deen to every home.',
        'To build the muezzin not merely within the bounds of a mosque servant, but as an exemplary ‘da‘i’ (caller) and guide in society.',
      ],
      formatDuration: '15 days',
      eligibility: [
        'A hafiz or alem, or a student of the Nohbemi/Dakhil level or above.',
        'Currently working as a muezzin, or interested in the profession.',
        'Must have melody in the voice and the ability to master it.',
      ],
      topicsLabel: 'Curriculum',
      topics: [
        'Ensuring the perfect and correct pronunciation of every word of the azan and iqamah.',
        'The rulings related to the azan and iqamah.',
        'Intensive practice of five world-famous melodies, including the historic melodies of the holy cities of Makkah and Madinah.',
        'Special voice care, long-breath control and exercises to keep the vocal scale steady.',
        'The character and qualities of a da‘i.',
        'Tarbiyah and personality development.',
        'Communication and negotiation skills.',
        'Sound system management.',
        'Time management.',
      ],
    },
    type: 'short',
    status: 'active',
    residential: 'both',
    gender: 'male',
    featured: true,
    order: 60,
  },

  // ─── 7. Islamic Research Methodology (GAP-C4: no content yet) ───────────────────────────
  {
    slug: 'islamic-research-methodology',
    bn: {
      title: 'ইসলামিক রিসার্চ মেথডোলজি',
    },
    en: {
      title: 'Islamic Research Methodology',
    },
    type: 'long',
    status: 'draft',
    order: 70,
  },
]

/**
 * Upserts every course by slug, Bangla pass first (creating shared array row ids), then the
 * English pass reusing those ids by position. Idempotent.
 */
export async function seedCourses(payload: Payload, req: PayloadRequest) {
  for (const course of coursesSeed) {
    const existing = await payload.find({
      collection: 'courses',
      req,
      limit: 1,
      pagination: false,
      draft: true,
      depth: 0,
      where: { slug: { equals: course.slug } },
    })

    const bnData = toData(course, 'bn')
    const saved = existing.docs[0]
      ? await payload.update({
          collection: 'courses',
          id: existing.docs[0].id,
          data: { ...bnData, _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'courses',
          data: { ...bnData, _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })

    await payload.update({
      collection: 'courses',
      id: saved.id,
      data: {
        ...(mergeIds(toData(course, 'en'), saved) as Record<string, unknown>),
        _status: 'published',
      } as never,
      locale: 'en',
      req,
      context: { disableRevalidate: true },
    })
  }
  payload.logger.info(`Seeded ${coursesSeed.length} courses.`)
}

function toData(course: SeedCourse, locale: 'bn' | 'en') {
  const side = course[locale]
  return {
    title: side.title,
    slug: course.slug,
    shortTitle: course.shortTitle ?? '',
    arabicTitle: course.arabicTitle ?? '',
    type: course.type,
    listingStatus: course.status,
    order: course.order,
    featured: course.featured ?? false,
    summary: side.summary ?? '',
    intro: side.intro ?? '',
    objectives: (side.objectives ?? []).map((value) => ({ value })),
    format: {
      durationLabel: side.formatDuration ?? '',
      residential: course.residential ?? 'both',
      gender: course.gender ?? null,
      bullets: (side.formatBullets ?? []).map((value) => ({ value })),
    },
    eligibility: (side.eligibility ?? []).map((value) => ({ value })),
    specialisations: {
      lead: side.specialisationsLead ?? '',
      items: (course.specialisations ?? []).map((s) => ({ name: s.name, arabicName: s.arabicName ?? '' })),
    },
    semesters: (side.semesters ?? []).map((sem) => ({
      title: sem.title ?? '',
      subtitle: sem.subtitle ?? '',
      durationLabel: sem.durationLabel ?? '',
      note: sem.note ?? '',
      sourceTotalCredits: sem.sourceTotalCredits ?? null,
      sourceTotalMarks: sem.sourceTotalMarks ?? null,
      sourceTotalHours: sem.sourceTotalHours ?? null,
      rows: sem.rows.map((row) => ({
        code: row.code ?? '',
        title: row.title,
        modules: (row.modules ?? []).map((value) => ({ value })),
        credits: row.credits ?? null,
        hours: row.hours ?? null,
        marks: row.marks ?? null,
      })),
    })),
    sdp: {
      note: side.sdpNote ?? '',
      rows: (course.sdpRows ?? []).map((r) => ({
        title: r.title,
        objective: r.objective,
        activities: r.activities,
        hours: r.hours,
        outcome: r.outcome,
      })),
    },
    topics: {
      label: side.topicsLabel ?? '',
      items: (side.topics ?? []).map((value) => ({ value })),
    },
    outcomes: {
      intro: side.outcomesIntro ?? '',
      items: (side.outcomes ?? []).map((o) => ({ heading: o.heading, body: o.body })),
    },
  }
}
