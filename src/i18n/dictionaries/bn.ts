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
  people: {
    leadershipTitle: 'নেতৃত্ব ও প্রশাসন',
    facultyTitle: 'শিক্ষক ও গবেষকবৃন্দ',
    teamLabels: {
      core: 'শিক্ষক প্যানেল',
      arabic: 'আরবি টিম',
      tajweed: 'তাজবিদ টিম',
      tarbiyah: 'তারবিয়াহ',
      english: 'ইংরেজি',
      bangla: 'বাংলা',
      computer: 'কম্পিউটার',
      math: 'ম্যাথ',
      science: 'বেসিক সাইন্স',
      other: 'অন্যান্য',
    },
    teamEmptyTitle: 'এই দলের শিক্ষকদের তালিকা এখনো প্রকাশ হয়নি',
    teamEmptyBody: 'তথ্য শীঘ্রই যুক্ত হবে।',
    directoryEmptyTitle: 'এই পাতায় এখনো কোনো শিক্ষকের তথ্য প্রকাশ হয়নি',
    directoryEmptyBody:
      'শিক্ষকমণ্ডলীর তালিকা প্রকাশ হলে এখানে নাম, পদবি ও পড়ানো বিষয়সহ দল অনুযায়ী দেখা যাবে।',
    leadershipEmptyTitle: 'নেতৃত্বের তালিকা এখনো প্রকাশ হয়নি',
    leadershipEmptyBody: 'চেয়ারম্যান, ইনচার্জ ও সমন্বয়কদের নাম শীঘ্রই এখানে যুক্ত হবে।',
    addTeacher: 'শিক্ষক যোগ করুন',
    subjectsTaught: 'শেখানো বিষয়সমূহ',
    bioPending: 'জীবনী শীঘ্রই যুক্ত হবে।',
    designationLabel: 'পদবি',
    teamLabel: 'দল',
    roleLabel: 'ভূমিকা',
    roleLabels: {
      leadership: 'নেতৃত্ব',
      faculty: 'শিক্ষক',
      staff: 'স্টাফ',
      author: 'লেখক',
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
