/**
 * Site settings starter content. Bangla copied verbatim from
 * docs/source/02-website-content-and-features-bn.extracted.txt (হোম পেজ, যোগাযোগ ও অবস্থান);
 * English from docs/source/01-navbar-and-home-contents.extracted.txt (Hero, Footer).
 * Email and social links are not in the source documents (GAP-C7); editors add them in admin.
 */
const features = {
  admissions: true,
  donations: true,
  zakatCalculator: true,
  blog: true,
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

export const siteSettingsSeed = {
  bn: {
    name: 'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট',
    shortName: 'দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট',
    tagline:
      'আস-সুন্নাহ দাওযাহ অ্যান্ড রিসার্চ ইনস্টিটিউট একটি দাওয়াহ, শিক্ষা ও গবেষণাভিত্তিক প্রতিষ্ঠান। এই ইনস্টিটিউট কুরআন-সুন্নাহভিত্তিক দাওয়াহ, গবেষণা ও প্রশিক্ষণ কার্যক্রম পরিচালনা করে, যার মূল লক্ষ্য হলো ইসলামের বিশুদ্ধ আকীদা এবং সঠিক জ্ঞান প্রচার ও প্রসার করা।',
    parentLine: 'আস-সুন্নাহ ফাউন্ডেশনের একটি শিক্ষাপ্রতিষ্ঠান',
    parentUrl: 'https://assunnahfoundation.org/',
    phones: [{ number: '+880 1805-437910', note: 'সকাল ৯টা থেকে বিকাল ৫টা' }],
    addresses: [
      { label: 'ঠিকানা', text: 'হোল্ডিং ৯৯, সাঁতারকুল পুকুরপাড়, কাজিবাড়ী, বাড্ডা, ঢাকা-১২১২।' },
      {
        label: 'আবাসিক ক্যাম্পাস',
        text: 'হোল্ডিং ৯৯, সাঁতারকুল পুকুরপাড়, কাজিবাড়ী, বাড্ডা, ঢাকা-১২১২।',
      },
    ],
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
      { label: 'Address', text: 'Holding 99, Satarkul Pukurpar, Kazibari, Badda, Dhaka-1212' },
      {
        label: 'Residential campus',
        text: 'Holding 99, Satarkul Pukurpar, Kazibari, Badda, Dhaka-1212',
      },
    ],
    otherWebsites: [{ label: 'As-Sunnah Foundation', url: 'https://assunnahfoundation.org/' }],
    features,
    defaultDescription:
      'An institute of As-Sunnah Foundation running dawah, research and training programmes grounded in the Quran and Sunnah.',
  },
}
