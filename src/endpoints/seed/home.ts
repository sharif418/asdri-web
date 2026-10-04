/**
 * The home page's starter content (REQ-HOME-01..12), seeded from the client's own words:
 * Bangla from docs/source/02-website-content-and-features-bn.extracted.txt (হোম পেজ, মূল লক্ষ্য,
 * Campus Life, Scholarship, এক নজরে), English from docs/source/01-navbar-and-home-contents
 * (Hero, Impact, Vision, Featured Programs, Announcements, Leadership, Support Us).
 *
 * Composed headings flagged for the office (the documents give them only in English):
 *  - notices heading "সাম্প্রতিক বিজ্ঞপ্তি" (the document's section is simply বিজ্ঞপ্তি)
 *  - people heading "নেতৃত্ব ও শিক্ষকমণ্ডলী"
 * Bangla headings the client's mixed-language document printed in English are seeded in
 * Bangla on the bn side ("মূল লক্ষ্য", "ক্যাম্পাস জীবন"); the client's own English forms stay in
 * the en locale (review item 9 — the office can change either in the home global).
 * The Bangla pillar drafts below are translated from the client's English pillars and are
 * marked as drafts in the PR — the office reviews and replaces them (review item 10). The
 * intro video and campus photos do not exist yet (GAP-C6); the hero stays typographic and
 * the campus list carries no images until they arrive.
 */
export const homeSeed = {
  bn: {
    sections: [
      {
        blockType: 'hero',
        enabled: true,
        heading: 'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট',
        tagline:
          'আস-সুন্নাহ দাওযাহ অ্যান্ড রিসার্চ ইনস্টিটিউট একটি দাওয়াহ, শিক্ষা ও গবেষণাভিত্তিক প্রতিষ্ঠান। এই ইনস্টিটিউট কুরআন-সুন্নাহভিত্তিক দাওয়াহ, গবেষণা ও প্রশিক্ষণ কার্যক্রম পরিচালনা করে, যার মূল লক্ষ্য হলো ইসলামের বিশুদ্ধ আকীদা এবং সঠিক জ্ঞান প্রচার ও প্রসার করা।',
      },
      {
        blockType: 'impactStats',
        enabled: true,
        heading: 'এক নজরে আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট',
      },
      {
        blockType: 'vision',
        enabled: true,
        heading: 'মূল লক্ষ্য',
        statement:
          'সমকালীন চিন্তাগত বিভ্রান্তি ও সামাজিক ফিতনাসমূহের মোকাবিলায় চিন্তাশীল, জ্ঞানসমৃদ্ধ ও কার্যকর দাওয়াহকর্মী ও গবেষক তৈরি করা। পাশাপাশি ইসলামের বিরুদ্ধে উত্থাপিত বিভিন্ন প্রশ্ন, আপত্তি ও অভিযোগের গবেষণালব্ধ ও যুক্তিনির্ভর জবাব প্রদান করে বুদ্ধিবৃত্তিক দাওয়াহকে শক্তিশালী করতে কাজ করে যাওয়া।',
        // BN draft from the client's English pillars (review item 10) — the office confirms or
        // replaces these three; the EN versions are the client's own words.
        pillars: [
          {
            title: 'কুরআন-সুন্নাহভিত্তিক বুদ্ধিবৃত্তিক দাওয়াহ',
            body: 'ওহী ও শুদ্ধ ইলমের ওপর প্রতিষ্ঠিত দাওয়াহ, যা চিন্তার জগতে পৌঁছে দেওয়া হয়।',
          },
          {
            title: 'ঐতিহ্যবাহী ইসলামি জ্ঞান ও আধুনিক শাস্ত্রের সেতুবন্ধন',
            body: 'মনোবিজ্ঞান, দর্শন, মিডিয়াসহ অন্যান্য আধুনিক শাস্ত্র ক্লাসিক্যাল পাঠ্যক্রমের পাশাপাশি পড়ানো হয়।',
          },
          {
            title: 'চরিত্র গঠন, তারবিয়াহ, নেতৃত্ব ও জনসংযোগ',
            body: 'তারবিয়াহ, নেতৃত্ব এবং সমাজের সাথে প্রকাশ্যে কাজ করার সাহস।',
          },
        ],
      },
      {
        blockType: 'programmes',
        enabled: true,
        heading: 'চলমান কোর্সসমূহ',
      },
      {
        blockType: 'refutations',
        enabled: false,
        heading: 'সংশয় নিরসন ও বুদ্ধিবৃত্তিক জবাব',
        description: '',
      },
      {
        blockType: 'notices',
        enabled: true,
        heading: 'সাম্প্রতিক বিজ্ঞপ্তি',
        limit: 4,
      },
      {
        blockType: 'campusLife',
        enabled: true,
        heading: 'ক্যাম্পাস জীবন',
        intro: 'একটি আদর্শ ইসলামী পরিবেশে শিক্ষার্থীদের মেধা ও মনন বিকাশে আস-সুন্নাহ ইনস্টিটিউটের ক্যাম্পাস লাইফ অত্যন্ত প্রাণবন্ত। আমাদের নিয়মিত কার্যক্রমের মধ্যে রয়েছে:',
        items: [
          {
            title: 'বুদ্ধিবৃত্তিক চর্চা',
            body: 'শিক্ষার্থীদের আত্মবিশ্বাস ও যৌক্তিক উপস্থাপন ক্ষমতা বৃদ্ধির লক্ষ্যে নিয়মিত বক্তৃতা, প্যানেল ডিসকাশন ও বিতর্ক প্রতিযোগিতার আয়োজন করা হয়। এর মাধ্যমে শিক্ষার্থীরা সমকালীন বিভিন্ন বিষয়ে ইসলামের অবস্থান জোরালোভাবে তুলে ধরার দক্ষতা অর্জন করে।',
          },
          {
            title: 'সেমিনার ও ওয়ার্কশপ',
            body: 'দেশ-বিদেশের বরেণ্য আলেম, শিক্ষাবিদ ও চিন্তাবিদদের উপস্থিতিতে সমকালীন ও যুগোপযোগী বিভিন্ন বিষয়ের ওপর নিয়মিত সেমিনার অনুষ্ঠিত হয়। এর মাধ্যমে শিক্ষার্থীরা তাত্ত্বিক জ্ঞানের পাশাপাশি ব্যবহারিক এবং বুদ্ধিবৃত্তিক জগতের নতুন নতুন দিগন্তের সাথে পরিচিত হয়।',
          },
          {
            title: 'পাঠচক্র',
            body: 'নির্ধারিত পাঠ্যক্রমের বাইরেও নির্দিষ্ট বিষয় বা গুরুত্বপূর্ণ বইয়ের ওপর নিয়মিত গ্রুপ স্টাডি বা পাঠচক্র পরিচালিত হয়। এটি শিক্ষার্থীদের মধ্যে গঠনমূলক পড়ার অভ্যাস ও বিশ্লেষণের ক্ষমতা তৈরি করে।',
          },
          {
            title: 'ফিল্ডওয়ার্ক ও দাওয়াতি অভিজ্ঞতা',
            body: 'আমরা কেবল তাত্ত্বিক শিক্ষায় সীমাবদ্ধ নই, বরং শিক্ষার্থীদের সরাসরি ময়দানে কাজ করার হাতে-কলমে প্রশিক্ষণ দিয়ে থাকি। এখন পর্যন্ত আমরা সফলভাবে ১ সপ্তাহ ব্যাপী ১টি বড় ফিল্ডওয়ার্ক কার্যক্রম পরিচালনা করেছি। এই ফিল্ডওয়ার্কের মাধ্যমে শিক্ষার্থীরা সাধারণ মানুষের মাঝে দ্বীনের সঠিক বার্তা পৌঁছে দেওয়ার ব্যবহারিক শিক্ষা অর্জন করে।',
          },
          {
            title: 'শরীরচর্চা',
            body: "শিক্ষার্থীদের শারীরিক সুস্থতা বজায় রাখতে মাসিক ইনডোর ও আউটডোর খেলাধুলার আয়োজন করা হয়। এছাড়া বার্ষিক 'শিক্ষা সফর' বা স্টাডি ট্যুর-এর ব্যবস্থা থাকে।",
          },
          {
            title: 'নেতৃত্ব ও দক্ষতা উন্নয়ন',
            body: 'বিভিন্ন ইভেন্ট আয়োজনের বাস্তব দায়িত্ব প্রদানের মাধ্যমে শিক্ষার্থীদের নেতৃত্ব ও সাংগঠনিক দক্ষতা ঝালিয়ে নেওয়ার সুযোগ দেওয়া হয়, যেখানে শিক্ষকদের নিবিড় পর্যবেক্ষণ ও তাৎক্ষণিক ফিডব্যাকের ভিত্তিতে তাদের যথাযথ মূল্যায়ন ও পুরস্কৃত করা হয়।',
          },
        ],
      },
      {
        blockType: 'mediaHub',
        enabled: false,
        heading: 'মিডিয়া ও নলেজ হাব',
      },
      {
        blockType: 'people',
        enabled: true,
        heading: 'নেতৃত্ব ও শিক্ষকমণ্ডলী',
      },
      {
        blockType: 'support',
        enabled: true,
        heading: 'সহযোগিতা করুন',
        body: 'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট মেধাবী অথচ আর্থিকভাবে অস্বচ্ছল শিক্ষার্থীদের জন্য শতভাগ (১০০%) স্কলারশিপের ব্যবস্থা করে থাকে। এই স্কলারশিপ কার্যক্রমটি আস-সুন্নাহ ফাউন্ডেশনের ‘যাকাত ফান্ড’ থেকে পরিচালিত হয়।',
        ctaLabel: 'দান করুন',
      },
      {
        blockType: 'fatwa',
        enabled: false,
        heading: 'ফতোয়া ও অনলাইন জিজ্ঞাসা',
      },
    ],
  },
  en: {
    sections: [
      {
        blockType: 'hero',
        enabled: true,
        heading: 'As-Sunnah Dawah & Research Institute',
        tagline:
          'A dawah, education, and research-based institute dedicated to propagating authentic Islamic knowledge based on the Quran and Sunnah.',
      },
      {
        blockType: 'impactStats',
        enabled: true,
        heading: 'As-Sunnah Dawah & Research Institute at a glance',
      },
      {
        blockType: 'vision',
        enabled: true,
        heading: 'Vision',
        statement:
          'Preparing thoughtful, knowledgeable, and effective dawah workers and researchers to address contemporary intellectual confusion and social fitnah, providing academic responses to misconceptions against Islam.',
        pillars: [
          {
            title: 'Authentic Quran-Sunnah-based intellectual dawah',
            body: 'Dawah grounded in revelation and sound scholarship, carried into the world of ideas.',
          },
          {
            title: 'Bridging traditional Islamic sciences with modern disciplines',
            body: 'Psychology, philosophy, media and the other modern sciences read alongside the classical curriculum.',
          },
          {
            title: 'Character tarbiyah, leadership, and public engagement',
            body: 'Tarbiyah, leadership and the courage to engage society in the open.',
          },
        ],
      },
      {
        blockType: 'programmes',
        enabled: true,
        heading: 'Featured Programs',
      },
      {
        blockType: 'refutations',
        enabled: false,
        heading: 'Intellectual Refutations & Research Highlights',
        description: '',
      },
      {
        blockType: 'notices',
        enabled: true,
        heading: 'Recent Announcements & Notices',
        limit: 4,
      },
      {
        blockType: 'campusLife',
        enabled: true,
        heading: 'Campus Life',
        intro: 'Campus life at the As-Sunnah Institute is lively, nurturing students’ intellect and character within an ideal Islamic environment. Regular activities include:',
        items: [
          {
            title: 'Intellectual discussions',
            body: 'Regular lectures, panel discussions and debate competitions build students’ confidence and reasoned presentation, so they can set out Islam’s position on contemporary questions with strength.',
          },
          {
            title: 'Seminars & workshops',
            body: 'Regular seminars with distinguished ulama, academics and thinkers from home and abroad introduce students to new horizons of the practical and intellectual world.',
          },
          {
            title: 'Reading circles',
            body: 'Beyond the set curriculum, regular group study over chosen subjects and important books builds the habit of constructive reading and analysis.',
          },
          {
            title: 'Fieldwork & dawah experience',
            body: 'Teaching is not only theoretical: students are trained hands-on in the field. One week-long major fieldwork programme has been run successfully so far, teaching students the practical work of carrying the message of the deen to ordinary people.',
          },
          {
            title: 'Physical exercise',
            body: 'Monthly indoor and outdoor games keep the students healthy, and an annual study tour is arranged.',
          },
          {
            title: 'Leadership & skill development',
            body: 'By giving students the real responsibility of organising events, their leadership and organisational skills are sharpened — observed closely by teachers and rewarded on the basis of immediate feedback.',
          },
        ],
      },
      {
        blockType: 'mediaHub',
        enabled: false,
        heading: 'Media & Knowledge Hub',
      },
      {
        blockType: 'people',
        enabled: true,
        heading: 'Featured Leadership & Faculty',
      },
      {
        blockType: 'support',
        enabled: true,
        heading: 'Support Us',
        body: 'As-Sunnah Dawah & Research Institute provides 100% scholarships for gifted students without the means to pay. The scholarship programme runs on As-Sunnah Foundation’s Zakat Fund.',
        ctaLabel: 'Donate',
      },
      {
        blockType: 'fatwa',
        enabled: false,
        heading: 'Fatwa & Online Queries',
      },
    ],
  },
}
