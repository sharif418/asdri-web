/**
 * About pages content (REQ-ABT-01, 03, 04), copied verbatim from
 * docs/source/02-website-content-and-features-bn.extracted.txt: the vision statement
 * (মূল লক্ষ্য), the thirteen objectives (লক্ষ্য ও উদ্দেশ্য), the four campus facilities
 * (Scholarship, Financial Aid & Facilities) and the alumni intro (Our Alumni).
 * The English objectives and facilities are plain drafts — the client's English document does
 * not cover these sections (flagged in the PR as EN draft).
 */
export const aboutSeed = {
  bn: {
    visionStatement:
      'সমকালীন চিন্তাগত বিভ্রান্তি ও সামাজিক ফিতনাসমূহের মোকাবিলায় চিন্তাশীল, জ্ঞানসমৃদ্ধ ও কার্যকর দাওয়াহকর্মী ও গবেষক তৈরি করা। পাশাপাশি ইসলামের বিরুদ্ধে উত্থাপিত বিভিন্ন প্রশ্ন, আপত্তি ও অভিযোগের গবেষণালব্ধ ও যুক্তিনির্ভর জবাব প্রদান করে বুদ্ধিবৃত্তিক দাওয়াহকে শক্তিশালী করতে কাজ করে যাওয়া।',
    objectives: [
      { value: 'কুরআন-সুন্নাহভিত্তিক বিশুদ্ধ ইসলামী জ্ঞানের আলোকে একটি জ্ঞাননির্ভর, সচেতন ও দায়িত্বশীল মুসলিম সমাজ গড়ে তোলা।' },
      { value: 'ইসলামী চিন্তা ও দাওয়াহকে বুদ্ধিবৃত্তিক গবেষণা ও প্রামাণ্য জ্ঞানের মাধ্যমে শক্তিশালী ও প্রভাবশালী করা।' },
      { value: 'সমকালীন চিন্তাগত বিভ্রান্তি, ভ্রান্ত মতবাদ ও সামাজিক ফিতনার মোকাবিলায় প্রাজ্ঞ, দক্ষ ও যুগোপযোগী দাওয়াহকর্মী, গবেষক ও নেতৃত্ব তৈরি।' },
      { value: 'কুরআন-সুন্নাহভিত্তিক ইসলামী দাওয়াহ কার্যক্রমের পরিকল্পিত প্রচার ও প্রসার।' },
      { value: 'গবেষণা, জার্নাল ও প্রকাশনার মাধ্যমে মানসম্মত, নির্ভরযোগ্য ও প্রয়োজনভিত্তিক ইসলামী রিসোর্স প্রস্তুত ও সংরক্ষণ।' },
      { value: 'বুদ্ধিবৃত্তিক দাওয়াহ, সেমিনার, প্রশিক্ষণ ও কর্মশালার মাধ্যমে ইসলামের সঠিক বার্তা সমাজের বিভিন্ন স্তরে পৌঁছে দেয়া।' },
      { value: 'ইসলামী জ্ঞানার্জনে আগ্রহী শিক্ষার্থী, আলেম ও সাধারণ মুসলিমদের জন্য একটি সুশৃঙ্খল ও মানসম্মত শিক্ষা-কাঠামো গড়ে তোলা।' },
      { value: 'দেশীয় ও আন্তর্জাতিক পর্যায়ে স্বীকৃত শিক্ষাবিদ, গবেষক ও দাঈদের সমন্বয়ে একটি যোগ্য শিক্ষক-শ্রেণি তৈরি করা।' },
      { value: 'আধুনিক প্রযুক্তি ও গবেষণা পদ্ধতির সমন্বয়ে ইসলামী শিক্ষাকে যুগের চাহিদার সাথে সামঞ্জস্যপূর্ণ করে উপস্থাপন করা।' },
      { value: 'মুসলিম উম্মাহর মধ্যে ঐক্য, সহনশীলতা ও সমঝোতার মানসিকতা গড়ে তোলা।' },
      { value: 'দেশ-বিদেশের অনুরূপ দাওয়াহ ও গবেষণা প্রতিষ্ঠানের সাথে শিক্ষাগত ও গবেষণাগত সহযোগিতা ও নেটওয়ার্ক তৈরি করা।' },
      { value: 'তরুণ সমাজকে দাওয়াহ প্রশিক্ষণের মাধ্যমে নৈতিকতা, দায়িত্ববোধ ও সমাজসচেতনতার আলোকে গড়ে তুলে সমাজে কার্যকর ভূমিকা পালনে সক্ষম করা।' },
      { value: 'ইসলামের বিরুদ্ধে উত্থাপিত প্রশ্ন, আপত্তি ও অভিযোগের গবেষণালব্ধ, যুক্তিনির্ভর ও জ্ঞানভিত্তিক জবাব প্রদান।' },
    ],
    facilities: [
      {
        title: 'আবাসিক ব্যবস্থাপনা',
        body: 'শিক্ষার্থীদের জন্য রয়েছে পরিচ্ছন্ন আবাসন ব্যবস্থা। প্রতিটি ক্লাসরুমে পৃথক স্টাডি টেবিল এবং নিরিবিলি পড়াশোনার পরিবেশ নিশ্চিত করা হয়েছে।',
      },
      {
        title: 'সমৃদ্ধ লাইব্রেরি ও ল্যাব',
        body: 'গবেষণা ও তথ্য অনুসন্ধানের জন্য একটি বিষয়ভিত্তিক সমৃদ্ধ লাইব্রেরি এবং আরবী ও ইংরেজি ভাষা শিক্ষার জন্য আধুনিক কম্পিউটার ল্যাবের সুবিধা রয়েছে।',
      },
      {
        title: 'আমলি ট্র্যাকার ও তদারকি',
        body: 'শিক্ষার্থীদের দৈনিক ইবাদত ও আমলের উন্নতির জন্য একটি বিশেষ ‘আমলি ট্র্যাকার বা তথ্যবই’ ব্যবহার করা হয়। এর মাধ্যমে শিক্ষকদের তত্ত্বাবধানে শিক্ষার্থীরা তাদের আধ্যাত্মিক ও পড়াশোনার উন্নতির হিসাব রাখতে পারে।',
      },
      {
        title: 'আধ্যাত্মিক পরিবেশ',
        body: 'ক্যাম্পাসে পাঁচ ওয়াক্ত নামাজ জামাতে আদায়, তিলাওয়াত ও মাসনুন আমলসমূহের নিয়মিত অনুশীলনের মাধ্যমে একটি আত্মিক শুদ্ধির পরিবেশ নিশ্চিত করা হয়।',
      },
    ],
    alumniIntro:
      'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউটের প্রাক্তন শিক্ষার্থীরা কেবল একাডেমিক সার্টিফিকেটধারী নন; তারা প্রত্যেকেই উম্মাহ দরদী একজন দাঈ ও গবেষক। আমাদের অ্যালামনাইরা বর্তমানে দেশের বিভিন্ন স্তরে ইসলামের বিশুদ্ধ জ্ঞান প্রসারে এবং সমকালীন ফিতনা মোকাবিলায় লেখালেখি বা বক্তব্যের মাধ্যমে সক্রিয় ভূমিকা পালন করছেন। আমরা আমাদের প্রতিটি প্রাক্তন শিক্ষার্থীর উত্তরোত্তর সাফল্য ও বরকতময় জীবন কামনা করি।',
  },
  en: {
    visionStatement:
      'Preparing thoughtful, knowledgeable, and effective dawah workers and researchers to address contemporary intellectual confusion and social fitnah, providing academic responses to misconceptions against Islam.',
    objectives: [
      { value: 'To build a knowledge-based, conscious and responsible Muslim society on the light of authentic Islamic knowledge grounded in the Quran and Sunnah.' },
      { value: 'To strengthen Islamic thought and dawah through intellectual research and sound scholarship.' },
      { value: 'To prepare wise, skilled and timely dawah workers, researchers and leaders to face contemporary intellectual confusion, false ideologies and social fitnah.' },
      { value: 'To spread the Islamic dawah of the Quran and Sunnah in a planned way.' },
      { value: 'To prepare and preserve standard, reliable and need-based Islamic resources through research, journals and publications.' },
      { value: 'To carry the correct message of Islam to every level of society through intellectual dawah, seminars, training and workshops.' },
      { value: 'To build a disciplined and standard framework of education for students, ulama and Muslims eager to learn.' },
      { value: 'To form a worthy class of teachers from recognised scholars, researchers and preachers at home and abroad.' },
      { value: 'To present Islamic education in step with the age through modern technology and research methods.' },
      { value: 'To foster unity, tolerance and mutual understanding among the Muslim ummah.' },
      { value: 'To build educational and research cooperation and networks with similar dawah and research institutions at home and abroad.' },
      { value: 'To enable young people, through dawah training, to play an effective role in society guided by morality, responsibility and social awareness.' },
      { value: 'To provide researched, reasoned and knowledge-based answers to the questions, objections and allegations raised against Islam.' },
    ],
    facilities: [
      {
        title: 'Residential facilities',
        body: 'Clean accommodation is available for students. Every classroom has separate study desks and a quiet environment for study is ensured.',
      },
      {
        title: 'Rich library & lab',
        body: 'There is a subject-based library for research and information, and a modern computer lab for learning Arabic and English.',
      },
      {
        title: 'Amali tracker & supervision',
        body: 'A special “amali tracker”, or record book, is used for the improvement of students’ daily worship and practice. Under the teachers’ supervision, students keep account of their spiritual and academic progress through it.',
      },
      {
        title: 'Spiritual environment',
        body: 'An environment of spiritual purification is ensured on the campus through the five daily prayers in congregation and the regular practice of recitation and the recommended deeds.',
      },
    ],
    alumniIntro:
      'The former students of As-Sunnah Dawah & Research Institute are not merely holders of academic certificates; each of them is a da’i and a researcher who cares for the ummah. Our alumni are now playing an active role across the country in spreading authentic knowledge of Islam and in answering contemporary fitnah through writing and speech. We wish every one of our former students continued success and a blessed life.',
  },
}
