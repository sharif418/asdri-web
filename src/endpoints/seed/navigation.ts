/**
 * Navigation starter content from docs/02-information-architecture.md and the client's navbar
 * document. Hrefs are site paths; the header localises them. `feature` ties an item to a module
 * flag so switching a module off removes its menu entries.
 */
type Link = {
  label: string
  href: string
  feature?: string
  newTab?: boolean
  description?: string
}
type Group = Link & { children?: Link[] }

const primaryBn: Group[] = [
  { label: 'হোম', href: '/' },
  {
    label: 'আমাদের সম্পর্কে',
    href: '/about',
    children: [
      {
        label: 'লক্ষ্য ও উদ্দেশ্য',
        href: '/about',
        description: 'ইনস্টিটিউটের ভিশন ও ১৩টি উদ্দেশ্য',
      },
      {
        label: 'নেতৃত্ব ও প্রশাসন',
        href: '/about/leadership',
        description: 'চেয়ারম্যান, ইনচার্জ ও একাডেমিক টিম',
      },
      {
        label: 'ক্যাম্পাস ও সুবিধা',
        href: '/about/campus',
        description: 'আবাসন, লাইব্রেরি, ল্যাব ও পরিবেশ',
      },
      {
        label: 'অ্যালামনাই অ্যাসোসিয়েশন',
        href: '/about/alumni',
        description: 'প্রাক্তন শিক্ষার্থী ও ব্যাচ পরিসংখ্যান',
      },
    ],
  },
  {
    label: 'একাডেমিকস',
    href: '/academics/courses',
    children: [
      {
        label: 'কোর্সসমূহ',
        href: '/academics/courses',
        description: 'PYS, CCIS, ডিপ্লোমা ও স্বল্পমেয়াদী প্রশিক্ষণ',
      },
      {
        label: 'শিক্ষক ও গবেষকবৃন্দ',
        href: '/academics/faculty',
        description: 'উস্তাযগণ, আরবি ও তাজবিদ টিম',
      },
      {
        label: 'শিক্ষার্থী উন্নয়ন কার্যক্রম',
        href: '/academics/student-development',
        description: 'তারবিয়াহ, সেমিনার, ফিল্ডওয়ার্ক',
      },
      {
        label: 'ডাউনলোড সেন্টার',
        href: '/downloads',
        feature: 'downloads',
        description: 'সিলেবাস, ফর্ম ও দাওয়াহ মেটেরিয়াল',
      },
    ],
  },
  {
    label: 'ভর্তি',
    href: '/admissions',
    feature: 'admissions',
    children: [
      {
        label: 'ভর্তি প্রক্রিয়া',
        href: '/admissions',
        description: 'আবেদন থেকে চূড়ান্ত ভর্তি: ৫টি ধাপ',
      },
      {
        label: 'স্কলারশিপ ও আর্থিক সহায়তা',
        href: '/admissions/scholarships',
        description: 'যাকাত ফান্ডে ১০০% স্কলারশিপ',
      },
      {
        label: 'ভর্তি বিজ্ঞপ্তি',
        href: '/notices?category=admission',
        feature: 'notices',
        description: 'চলমান ও আসন্ন ভর্তির ঘোষণা',
      },
      {
        label: 'সচরাচর জিজ্ঞাসা',
        href: '/faq',
        feature: 'faq',
        description: 'ভর্তি, কোর্স ও অনুদান বিষয়ে প্রশ্নোত্তর',
      },
    ],
  },
  {
    label: 'গবেষণা ও প্রকাশনা',
    href: '/research/library',
    children: [
      {
        label: 'লাইব্রেরি ও জার্নাল',
        href: '/research/library',
        feature: 'library',
        description: 'গবেষণাপত্র, সাময়িকী ও বুলেটিন',
      },
      {
        label: 'গবেষণা প্রকল্প ও ফেলোশিপ',
        href: '/research/projects',
        feature: 'researchProjects',
        description: 'চলমান প্রকল্প ও কল ফর পেপার্স',
      },
      {
        label: 'শিক্ষকদের প্রকাশনা ও বই',
        href: '/research/books',
        feature: 'books',
        description: 'ইনস্টিটিউটের শিক্ষকদের লেখা বই',
      },
      {
        label: 'সংশয় নিরসন ও বুদ্ধিবৃত্তিক জবাব',
        href: '/research/clarifications',
        feature: 'clarifications',
        description: 'নাস্তিক্যবাদ, সেকুলারিজম ও অন্যান্য বিষয়ে জবাব',
      },
      {
        label: 'ফতোয়া ও অনলাইন জিজ্ঞাসা',
        href: '/fatwa',
        feature: 'fatwa',
        description: 'প্রশ্ন পাঠান, ফতোয়া ব্যাংকে খুঁজুন',
      },
    ],
  },
  {
    label: 'মিডিয়া ও রিসোর্স',
    href: '/blog',
    children: [
      { label: 'ব্লগ', href: '/blog', feature: 'blog', description: 'গবেষণা নিবন্ধ ও বিশ্লেষণ' },
      {
        label: 'ভিডিও ও পডকাস্ট',
        href: '/media/videos',
        feature: 'videos',
        description: 'সংক্ষিপ্ত সংশয় নিরসন, লেকচার, সেমিনার',
      },
      {
        label: 'সংবাদ ও ইভেন্ট',
        href: '/news',
        feature: 'news',
        description: 'ইনস্টিটিউটের খবর ও আসন্ন আয়োজন',
      },
      {
        label: 'ফটো গ্যালারি',
        href: '/gallery',
        feature: 'gallery',
        description: 'ক্যাম্পাস, ক্লাসরুম ও ফিল্ডওয়ার্ক',
      },
      {
        label: 'দাওয়াহ মেটেরিয়াল',
        href: '/downloads?category=dawah-material',
        feature: 'downloads',
        description: 'প্রিন্টযোগ্য পোস্টার ও বুকলেট',
      },
    ],
  },
  {
    label: 'নোটিশ',
    href: '/notices',
    feature: 'notices',
    children: [
      { label: 'ভর্তি বিজ্ঞপ্তি', href: '/notices?category=admission' },
      { label: 'নিয়োগ বিজ্ঞপ্তি', href: '/notices?category=recruitment' },
      { label: 'একাডেমিক নোটিশ', href: '/notices?category=academic' },
      { label: 'সাধারণ বিজ্ঞপ্তি', href: '/notices?category=general' },
    ],
  },
  {
    label: 'যোগাযোগ',
    href: '/contact',
    children: [
      { label: 'যোগাযোগ ও অবস্থান', href: '/contact' },
      { label: 'অন্যান্য ওয়েবসাইট', href: '/contact/other-websites' },
    ],
  },
]

const primaryEn: Group[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      {
        label: 'Vision & Objectives',
        href: '/about',
        description: 'The institute’s vision and 13 objectives',
      },
      {
        label: 'Leadership & Administration',
        href: '/about/leadership',
        description: 'Chairman, in-charge and academic team',
      },
      {
        label: 'Campus & Facilities',
        href: '/about/campus',
        description: 'Residence, library, lab and environment',
      },
      {
        label: 'Alumni Association',
        href: '/about/alumni',
        description: 'Graduates and batch statistics',
      },
    ],
  },
  {
    label: 'Academics',
    href: '/academics/courses',
    children: [
      {
        label: 'Courses',
        href: '/academics/courses',
        description: 'PYS, CCIS, Diploma and short programmes',
      },
      {
        label: 'Faculty & Teachers',
        href: '/academics/faculty',
        description: 'Teachers, Arabic and Tajweed teams',
      },
      {
        label: 'Student Development Programs',
        href: '/academics/student-development',
        description: 'Tarbiyah, seminars, fieldwork',
      },
      {
        label: 'Download Center',
        href: '/downloads',
        feature: 'downloads',
        description: 'Syllabi, forms and dawah materials',
      },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    feature: 'admissions',
    children: [
      {
        label: 'Admission Process',
        href: '/admissions',
        description: 'Five steps from application to admission',
      },
      {
        label: 'Scholarships & Financial Aid',
        href: '/admissions/scholarships',
        description: '100% scholarships from the Zakat Fund',
      },
      {
        label: 'Admission Notices',
        href: '/notices?category=admission',
        feature: 'notices',
        description: 'Open and upcoming intakes',
      },
      {
        label: 'FAQs',
        href: '/faq',
        feature: 'faq',
        description: 'Admissions, courses and donations',
      },
    ],
  },
  {
    label: 'Research & Publications',
    href: '/research/library',
    children: [
      {
        label: 'Library & Journals',
        href: '/research/library',
        feature: 'library',
        description: 'Papers, periodicals and bulletins',
      },
      {
        label: 'Research Projects & Fellowships',
        href: '/research/projects',
        feature: 'researchProjects',
        description: 'Ongoing projects and calls for papers',
      },
      {
        label: 'Faculty Publications & Books',
        href: '/research/books',
        feature: 'books',
        description: 'Books by the institute’s teachers',
      },
      {
        label: 'Intellectual Clarifications',
        href: '/research/clarifications',
        feature: 'clarifications',
        description: 'Responses on atheism, secularism and more',
      },
      {
        label: 'Fatwa & Online Queries',
        href: '/fatwa',
        feature: 'fatwa',
        description: 'Ask a question, search the fatwa bank',
      },
    ],
  },
  {
    label: 'Media & Resources',
    href: '/blog',
    children: [
      {
        label: 'Blog',
        href: '/blog',
        feature: 'blog',
        description: 'Research articles and insights',
      },
      {
        label: 'Videos & Podcasts',
        href: '/media/videos',
        feature: 'videos',
        description: 'Short responses, lectures, seminars',
      },
      {
        label: 'News & Events',
        href: '/news',
        feature: 'news',
        description: 'Institute news and upcoming events',
      },
      {
        label: 'Photo Gallery',
        href: '/gallery',
        feature: 'gallery',
        description: 'Campus, classrooms and fieldwork',
      },
      {
        label: 'Dawah Materials',
        href: '/downloads?category=dawah-material',
        feature: 'downloads',
        description: 'Printable posters and booklets',
      },
    ],
  },
  {
    label: 'Notices',
    href: '/notices',
    feature: 'notices',
    children: [
      { label: 'Admission Notices', href: '/notices?category=admission' },
      { label: 'Recruitment Notices', href: '/notices?category=recruitment' },
      { label: 'Academic Notices', href: '/notices?category=academic' },
      { label: 'General Announcements', href: '/notices?category=general' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Contact & Location', href: '/contact' },
      { label: 'Other Websites', href: '/contact/other-websites' },
    ],
  },
]

const footerBn = [
  {
    label: 'দ্রুত লিংক',
    links: [
      { label: 'কোর্সসমূহ', href: '/academics/courses' },
      { label: 'ভর্তি প্রক্রিয়া', href: '/admissions', feature: 'admissions' },
      { label: 'নোটিশ বোর্ড', href: '/notices', feature: 'notices' },
      { label: 'ডাউনলোড সেন্টার', href: '/downloads', feature: 'downloads' },
      { label: 'সচরাচর জিজ্ঞাসা', href: '/faq', feature: 'faq' },
    ],
  },
  {
    label: 'সহযোগিতা করুন',
    links: [
      { label: 'যাকাত ফান্ড', href: '/donate?fund=zakat', feature: 'donations' },
      { label: 'একজন শিক্ষার্থীর দায়িত্ব নিন', href: '/donate/sponsor', feature: 'sponsorship' },
      { label: 'সাধারণ অনুদান', href: '/donate?fund=general', feature: 'donations' },
      { label: 'স্কলারশিপ ফান্ড', href: '/donate?fund=scholarship', feature: 'donations' },
      { label: 'যাকাত ক্যালকুলেটর', href: '/zakat-calculator', feature: 'zakatCalculator' },
    ],
  },
  {
    label: 'অ্যাকাউন্ট',
    links: [
      { label: 'লগইন', href: '/login', feature: 'accounts' },
      { label: 'আমার আবেদন', href: '/account/applications', feature: 'admissions' },
      { label: 'ডোনার পোর্টাল', href: '/account/donations', feature: 'donorPortal' },
      { label: 'অ্যালামনাই পোর্টাল', href: '/account', feature: 'alumniPortal' },
    ],
  },
]

const footerEn = [
  {
    label: 'Quick links',
    links: [
      { label: 'Courses', href: '/academics/courses' },
      { label: 'Admission process', href: '/admissions', feature: 'admissions' },
      { label: 'Notice board', href: '/notices', feature: 'notices' },
      { label: 'Download Center', href: '/downloads', feature: 'downloads' },
      { label: 'FAQ', href: '/faq', feature: 'faq' },
    ],
  },
  {
    label: 'Support us',
    links: [
      { label: 'Zakat Fund', href: '/donate?fund=zakat', feature: 'donations' },
      { label: 'Sponsor a student', href: '/donate/sponsor', feature: 'sponsorship' },
      { label: 'General donation', href: '/donate?fund=general', feature: 'donations' },
      { label: 'Scholarship Fund', href: '/donate?fund=scholarship', feature: 'donations' },
      { label: 'Zakat calculator', href: '/zakat-calculator', feature: 'zakatCalculator' },
    ],
  },
  {
    label: 'Account',
    links: [
      { label: 'Log in', href: '/login', feature: 'accounts' },
      { label: 'My applications', href: '/account/applications', feature: 'admissions' },
      { label: 'Donor portal', href: '/account/donations', feature: 'donorPortal' },
      { label: 'Alumni portal', href: '/account', feature: 'alumniPortal' },
    ],
  },
]

export const navigationSeed = {
  bn: {
    primary: primaryBn,
    cta: { label: 'দান করুন', href: '/donate' },
    utility: [{ label: 'অ্যাকাউন্ট খুলুন', href: '/register', feature: 'accounts' }],
    footerColumns: footerBn,
    legal: [],
  },
  en: {
    primary: primaryEn,
    cta: { label: 'Donate', href: '/donate' },
    utility: [{ label: 'Create account', href: '/register', feature: 'accounts' }],
    footerColumns: footerEn,
    legal: [],
  },
}
