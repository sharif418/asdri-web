/**
 * Interface strings, Bangla (default). Content (course titles, notices…) lives in Payload and is
 * localised there; this file holds only the chrome: navigation labels that are not editable,
 * buttons, states. Keep keys flat and named by purpose, not by screen position.
 */
const bn = {
  skipToContent: 'মূল বিষয়বস্তুতে যান',
  header: {
    menu: 'মেনু',
    openMenu: 'মেনু খুলুন',
    closeMenu: 'মেনু বন্ধ করুন',
    login: 'লগইন',
    register: 'অ্যাকাউন্ট খুলুন',
    donate: 'দান করুন',
    language: 'ভাষা',
    contact: 'যোগাযোগ',
    home: 'হোম',
  },
  footer: {
    parentLine: 'আস-সুন্নাহ ফাউন্ডেশনের একটি শিক্ষাপ্রতিষ্ঠান',
    contactHeading: 'যোগাযোগ',
    officeHours: 'অফিস সময়',
    scanForAdmissions: 'ভর্তি সংক্রান্ত আপডেটের জন্য স্ক্যান করুন',
    copyright: (year: string, name: string) => `© ${year} ${name}। সর্বস্বত্ব সংরক্ষিত।`,
    theme: 'থিম',
  },
  home: {
    exploreCourses: 'কোর্স দেখুন',
    prospectus: 'প্রসপেক্টাস (PDF)',
    comingSoon: 'এই পাতাটি তৈরি হচ্ছে',
    comingSoonBody:
      'ইনস্টিটিউটের ওয়েবসাইটের এই অংশটি শিগগিরই প্রকাশ হবে। এখন কোর্স ও যোগাযোগের তথ্য নিচে পাওয়া যাবে।',
  },
  courses: {
    indexTitle: 'কোর্সসমূহ',
    longHeading: 'দীর্ঘমেয়াদী কোর্সসমূহ',
    shortHeading: 'স্বল্পমেয়াদী প্রশিক্ষণ',
    emptyTitle: 'এই পাতায় এখনো কোনো কোর্স প্রকাশ হয়নি',
    emptyBody: 'কোর্সের তালিকা প্রকাশ হলে এখানে মেয়াদ, যোগ্যতা ও পাঠ্যসূচিসহ দেখা যাবে।',
    addCourse: 'কোর্স যোগ করুন',
    pendingNote: 'বিবরণ শীঘ্রই',
    pendingBody: 'এই কোর্সের বিস্তারিত বিবরণ এখনো প্রকাশ হয়নি। প্রকাশ হলে এই পাতায় যুক্ত হবে।',
    introHeading: 'কোর্স পরিচিতি',
    trainingIntroHeading: 'প্রশিক্ষণ পরিচিতি',
    objectivesHeading: 'লক্ষ্য-উদ্দেশ্য',
    formatHeading: 'কোর্সের ধরন',
    eligibilityHeading: 'ভর্তির যোগ্যতা',
    applyEligibilityHeading: 'আবেদন যোগ্যতা',
    specialisationsHeading: 'তাখাসসুস বিভাগ',
    curriculumHeading: 'কোর্স কারিকুলাম',
    sdpHeading: 'শিক্ষার্থী উন্নয়ন কার্যক্রম (Student Development Programs)',
    outcomesHeading: 'কোর্স সম্পন্নকারীদের পরবর্তী শিক্ষাক্রম ও কর্মপরিকল্পনা',
    durationLabel: 'মেয়াদ',
    formatLabel: 'ধরন',
    studentsLabel: 'শিক্ষার্থী',
    codeLabel: 'কোর্স কোড',
    applyCta: 'আবেদন করুন',
    residentialLabels: {
      residential: 'আবাসিক',
      nonResidential: 'অনাবাসিক',
      both: 'আবাসিক ও অনাবাসিক',
    },
    genderLabels: {
      male: 'শুধুমাত্র পুরুষদের জন্য',
      female: 'শুধুমাত্র মেয়েদের জন্য',
      all: 'সকল শিক্ষার্থীর জন্য উন্মুক্ত',
    },
    table: {
      code: 'কোড',
      course: 'কোর্স',
      modules: 'মডিউল',
      credits: 'ক্রেডিট',
      hours: 'ঘণ্টা',
      marks: 'নম্বর',
      total: 'মোট',
    },
    sdpTable: {
      program: 'কার্যক্রম',
      objective: 'উদ্দেশ্য',
      activities: 'মূল কার্যাবলী',
      hours: 'ঘণ্টা',
      outcome: 'ফলাফল',
    },
  },
  common: {
    readMore: 'বিস্তারিত',
    back: 'ফিরে যান',
    phone: 'ফোন',
    email: 'ইমেইল',
    address: 'ঠিকানা',
    notFoundTitle: 'পাতাটি পাওয়া যায়নি',
    notFoundBody: 'ঠিকানাটি ভুল হতে পারে, অথবা পাতাটি সরানো হয়েছে।',
    goHome: 'হোম পাতায় যান',
  },
}

export type Dictionary = typeof bn
export default bn
