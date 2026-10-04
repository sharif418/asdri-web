import type { SeedCourse } from './types'

// ─── 3. Diploma in Dawah & Islamic Studies ───────────────────────────────────────────────
export const diplomaCourse: SeedCourse = {
  slug: 'diploma-in-dawah-and-islamic-studies',
  bn: {
    title: 'ডিপ্লোমা ইন দাওয়াহ অ্যান্ড ইসলামিক স্টাডিজ',
    summary:
      'যারা পূর্বে বর্ণিত ০৬ মাসের প্রাথমিক সার্টিফিকেট কোর্সটি সফলতার সাথে সম্পন্ন করে উত্তীর্ণ হয়েছেন, তাঁদের জন্য এই উচ্চতর ডিপ্লোমা কোর্সটি সাজানো হয়েছে।',
    intro:
      'যারা পূর্বে বর্ণিত ০৬ মাসের প্রাথমিক সার্টিফিকেট কোর্সটি সফলতার সাথে সম্পন্ন করে উত্তীর্ণ হয়েছেন, তাঁদের জন্য এই উচ্চতর ডিপ্লোমা কোর্সটি সাজানো হয়েছে। দ্বীনের দাঈ হিসেবে পথচলার নিমিত্তে ইসলামের বুনিয়াদি ও মাধ্যমিক স্তরের গভীর জ্ঞান অর্জনে আগ্রহী শিক্ষার্থীদের আরবি ভাষা ও শাস্ত্রীয় জ্ঞানের (নাহু, সরফ, ফিকহ ও হাদীস) একটি মজবুত ভিত্তি তৈরি করে দিতে এই কোর্সে উচ্চতর পাঠদান করা হয়।',
    objectives: [
      'শিক্ষার্থীদের আরবি ভাষা ও শাস্ত্রীয় জ্ঞানের একটি মজবুত ভিত্তি তৈরি করে দেওয়া, যেন তাঁরা সরাসরি মূল উৎস থেকে কুরআন ও হাদীসের মর্ম অনুধাবনের অনুশীলন করতে পারেন।',
      'সমকালীন প্রেক্ষাপট ও দাওয়াহর আধুনিক কলাকৌশল শিক্ষার মাধ্যমে তাদের দক্ষ দাঈ ও আদর্শ মানুষ হিসেবে গড়ে তোলা।',
      'সমাজ সংস্কারে বুদ্ধিবৃত্তিক ও কার্যকর ভূমিকা পালনের যোগ্যতা তৈরি করা।',
    ],
    formatDuration: '২ বছর (৪টি সেমিস্টার)',
    eligibility: ['৬ মাস মেয়াদী সার্টিফিকেট কোর্সে সফলভাবে উত্তীর্ণ শিক্ষার্থী।'],
    semesters: [
      {
        title: '১ম বছর (১ম সেমিস্টার)',
        durationLabel: 'সময়কাল: ৬ মাস',
        sourceTotalCredits: 25,
        sourceTotalMarks: 800,
        rows: [
          {
            code: 'PGD-DIS 1101',
            title: 'Beautifying Quran Recitation & Tajweed (II)',
            credits: 3,
            marks: 100,
          },
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
          {
            code: 'PGD-DIS 1204',
            title: 'Advanced Arabic Language & Literature',
            credits: 3,
            marks: 100,
          },
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
          {
            code: 'PGD-DIS 2101',
            title: 'Study of al-Quran & Short Tafsir (8 Parts)',
            credits: 4,
            marks: 100,
          },
          { code: 'PGD-DIS 2102', title: 'Advanced Hadith Studies (I)', credits: 4, marks: 100 },
          {
            code: 'PGD-DIS 2103',
            title: 'Fiqhul Muamalat & Usulul Fiqh (I)',
            credits: 4,
            marks: 100,
          },
          {
            code: 'PGD-DIS 2104',
            title: 'Arabic literature & Ilmul Balagah (I)',
            credits: 4,
            marks: 100,
          },
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
          {
            code: 'PGD-DIS 2201',
            title: 'Study of al-Quran & Short Tafsir (10 Parts)',
            credits: 4,
            marks: 100,
          },
          { code: 'PGD-DIS 2202', title: 'Advanced Hadith Studies (II)', credits: 4, marks: 100 },
          {
            code: 'PGD-DIS 2203',
            title: 'Fiqhul Muamalat & Usulul Fiqh (II)',
            credits: 4,
            marks: 100,
          },
          { code: 'PGD-DIS 2204', title: 'Advanced Arabic literature', credits: 3, marks: 100 },
          { code: 'PGD-DIS 2205', title: 'Islamic Sciences', credits: 3, marks: 100 },
          { code: 'PGD-DIS 2206', title: 'Dissertation', credits: 4, marks: 100 },
          { title: 'Viva', credits: 2, marks: 50 },
        ],
      },
    ],
    outcomesIntro:
      'এই দীর্ঘমেয়াদী ও নিবিড় কোর্সটি সফলভাবে সম্পন্ন করার পর শিক্ষার্থীদের সামনে উচ্চতর ইসলামী জ্ঞান অর্জন ও বহুমুখী গবেষণার এক বিস্তৃত ক্ষেত্র উন্মোচিত হবে। অর্জিত ইলমী ভিত্তিকে কাজে লাগিয়ে শিক্ষার্থীরা নিম্নোক্ত পথগুলোতে অগ্রসর হতে পারবেন:',
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
    summary:
      '2-Year (4 Semesters) advanced diploma for CCIS graduates covering deep classical and modern dawah tools.',
    intro:
      'This higher diploma is arranged for those who have successfully completed the six-month certificate course described above. It teaches at an advanced level, giving students eager for deep foundational and intermediate knowledge of Islam a firm base in the Arabic language and the classical sciences (nahw, sarf, fiqh and hadith) for their journey as da‘is of the deen.',
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
          {
            code: 'PGD-DIS 1101',
            title: 'Beautifying Quran Recitation & Tajweed (II)',
            credits: 3,
            marks: 100,
          },
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
          {
            code: 'PGD-DIS 1204',
            title: 'Advanced Arabic Language & Literature',
            credits: 3,
            marks: 100,
          },
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
          {
            code: 'PGD-DIS 2101',
            title: 'Study of al-Quran & Short Tafsir (8 Parts)',
            credits: 4,
            marks: 100,
          },
          { code: 'PGD-DIS 2102', title: 'Advanced Hadith Studies (I)', credits: 4, marks: 100 },
          {
            code: 'PGD-DIS 2103',
            title: 'Fiqhul Muamalat & Usulul Fiqh (I)',
            credits: 4,
            marks: 100,
          },
          {
            code: 'PGD-DIS 2104',
            title: 'Arabic literature & Ilmul Balagah (I)',
            credits: 4,
            marks: 100,
          },
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
          {
            code: 'PGD-DIS 2201',
            title: 'Study of al-Quran & Short Tafsir (10 Parts)',
            credits: 4,
            marks: 100,
          },
          { code: 'PGD-DIS 2202', title: 'Advanced Hadith Studies (II)', credits: 4, marks: 100 },
          {
            code: 'PGD-DIS 2203',
            title: 'Fiqhul Muamalat & Usulul Fiqh (II)',
            credits: 4,
            marks: 100,
          },
          { code: 'PGD-DIS 2204', title: 'Advanced Arabic literature', credits: 3, marks: 100 },
          { code: 'PGD-DIS 2205', title: 'Islamic Sciences', credits: 3, marks: 100 },
          { code: 'PGD-DIS 2206', title: 'Dissertation', credits: 4, marks: 100 },
          { title: 'Viva', credits: 2, marks: 50 },
        ],
      },
    ],
    outcomesIntro:
      'After completing this long and intensive course, a broad field of higher Islamic knowledge and wide-ranging research opens before the students. Building on the scholarly foundation they have gained, students can proceed along the following paths:',
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
}
