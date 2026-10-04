import type { SeedCourse } from './types'

// ─── 2. Certificate Course in Islamic Studies (CCIS) ─────────────────────────────────────
export const certificateCourse: SeedCourse = {
  slug: 'certificate-course-in-islamic-studies',
  bn: {
    title: 'সার্টিফিকেট কোর্স ইন ইসলামিক স্টাডিজ',
    summary:
      '৬ মাস মেয়াদী এই বেসিক কোর্সে বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিধারী শিক্ষার্থীদের শেখানো হচ্ছে—আরবি ভাষা (সহজ কথোপকথন ও আয়াত অনুধাবন), তাজভীদসহ বিশুদ্ধ কুরআন তিলাওয়াত, বেসিক ইসলাম (আকীদা, ইবাদত ও মাসআলা-মাসায়েল) এবং দাওয়াহ, তারবিয়াহ ও সমকালীন জ্ঞান।',
    intro:
      '৬ মাস মেয়াদী এই বেসিক কোর্সে বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিধারী শিক্ষার্থীদের শেখানো হচ্ছে—আরবি ভাষা (সহজ কথোপকথন ও আয়াত অনুধাবন), তাজভীদসহ বিশুদ্ধ কুরআন তিলাওয়াত, বেসিক ইসলাম (আকীদা, ইবাদত ও মাসআলা-মাসায়েল) এবং দাওয়াহ, তারবিয়াহ ও সমকালীন জ্ঞান।',
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
    summary:
      '6-Month foundational course in Tajweed, basic Arabic, Fiqh, and Sirah for university graduates.',
    intro:
      'This six-month foundation course teaches university graduates Arabic (simple conversation and understanding the verses), correct Quran recitation with tajweed, basic Islam (aqidah, worship and everyday rulings), and dawah, tarbiyah and contemporary knowledge.',
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
}
