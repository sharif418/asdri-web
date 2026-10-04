import type { SeedCourse } from './types'

// ─── 4. Arabic Language Teacher Training ────────────────────────────────────────────────
export const arabicTeacherTraining: SeedCourse = {
  slug: 'arabic-language-teacher-training',
  bn: {
    title: 'আরবি ভাষা শিক্ষক প্রশিক্ষণ প্রোগ্রাম',
    summary:
      'এই কোর্সটি মূলত সেসব আরবি ভাষাবিদ ও আলেমদের জন্য ডিজাইন করা হয়েছে, যারা ইংলিশ মিডিয়াম, মডার্ন ইসলামিক স্কুল বা মাদানি নেসাবে আরবি ভাষার শিক্ষক হিসেবে সফল ক্যারিয়ার গড়তে চান।',
    intro:
      'এই কোর্সটি মূলত সেসব আরবি ভাষাবিদ ও আলেমদের জন্য ডিজাইন করা হয়েছে, যারা ইংলিশ মিডিয়াম, মডার্ন ইসলামিক স্কুল বা মাদানি নেসাবে আরবি ভাষার শিক্ষক হিসেবে সফল ক্যারিয়ার গড়তে চান। কোর্সে আরবি ভাষার কোনো বেসিক শেখানো হবে না, বরং একজন আরবি জানা আলেমকে কীভাবে আধুনিক ও ইসলামিক শিক্ষাপ্রতিষ্ঠানের উপযোগী স্মার্ট শিক্ষক হিসেবে গড়ে তোলা যায়—তার ওপর ফোকাস করা হয়েছে। প্রথাগত মুখস্থনির্ভর পদ্ধতির পরিবর্তে আধুনিক ভাষাশিক্ষা পদ্ধতি (CLT), শিশু মনস্তত্ত্ব, লেসন প্ল্যানিং, ডিজিটাল প্রযুক্তির ব্যবহারে পারদর্শী হওয়ার কৌশল রপ্ত করানো হবে।',
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
    intro:
      'This course is designed for Arabic linguists and ulama who want to build a successful career as Arabic teachers in English-medium schools, modern Islamic schools or the Madani curriculum. No basic Arabic is taught here; the focus is on how an alem who knows Arabic can be developed into a smart teacher suited to modern Islamic institutions. Instead of the traditional rote method, participants are trained in modern language pedagogy (CLT), child psychology, lesson planning and the confident use of digital technology.',
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
}
