/**
 * Admissions pages content (REQ-ADM-01, 02), copied verbatim from
 * docs/source/02-website-content-and-features-bn.extracted.txt (Admission Process and the
 * opening of Scholarship, Financial Aid & Facilities). The five steps keep the document's
 * order and its own numbering style — the page renders Bengali numerals for the sequence.
 * English is a plain draft (not in the client's English document).
 */
export const admissionsSeed = {
  bn: {
    processIntro:
      'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউটে শিক্ষার্থী নির্বাচন একটি সুশৃঙ্খল ও প্রতিযোগিতামূলক প্রক্রিয়ার মাধ্যমে সম্পন্ন হয়। ভর্তির প্রতিটি ধাপ নিচে বিস্তারিতভাবে তুলে ধরা হলো:',
    steps: [
      {
        title: 'অনলাইন আবেদন',
        body: 'আগ্রহী প্রার্থীদের প্রতিষ্ঠানের অফিসিয়াল ওয়েবসাইট বা সোশ্যাল মিডিয়া পেজে প্রকাশিত লিঙ্কের মাধ্যমে অনলাইনে আবেদন করতে হবে। আবেদন ফর্মে ব্যক্তিগত তথ্য ও শিক্ষাগত যোগ্যতার সঠিক বিবরণ প্রদান বাধ্যতামূলক।',
      },
      {
        title: 'প্রাথমিক যাচাই-বাছাই',
        body: 'আবেদনকারী শিক্ষার্থীদের মধ্য থেকে সংশ্লিষ্ট কোর্সের ক্রাইটেরিয়া বা মানদণ্ড (যেমন: পূর্ববর্তী পরীক্ষার ফলাফল ও দক্ষতা) অনুযায়ী প্রাথমিক তালিকা তৈরি করা হয়।',
      },
      {
        title: 'লিখিত পরীক্ষা',
        body: 'প্রাথমিকভাবে নির্বাচিত প্রার্থীদের একটি নির্ধারিত দিনে লিখিত পরীক্ষায় অংশগ্রহণ করতে হয়। পরীক্ষার বিষয়সমূহ সাধারণত সংশ্লিষ্ট কোর্সের ক্রাইটেরিয়া অনুযায়ী হয়ে থাকে। যেমন:- জেনারেলেদের জন্য বেসিক আরবী, সাধারণ ইসলামিয়া এবং সমকালীন জ্ঞান-এর ওপর ভিত্তি করে প্রশ্ন তৈরি করা হয়।',
      },
      {
        title: 'মৌখিক পরীক্ষা বা ভাইভা',
        body: 'লিখিত পরীক্ষায় উত্তীর্ণ নির্দিষ্ট সংখ্যক প্রার্থীদের চূড়ান্ত সাক্ষাৎকারের জন্য ডাকা হয়। এখানে প্রার্থীর পার্সোনালেটি, ভবিষ্যৎ পরিকল্পনা এবং কোর্স সম্পন্ন করার মানসিকতা যাচাই করা হয়।',
      },
      {
        title: 'চূড়ান্ত ভর্তি',
        body: 'লিখিত ও মৌখিক পরীক্ষার সম্মিলিত ফলাফলের ভিত্তিতে চূড়ান্তভাবে নির্বাচিত শিক্ষার্থীদের ভর্তির সুযোগ প্রদান করা হয়।',
      },
    ],
    scholarshipParagraphs: [
      { value: 'আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট মেধাবী অথচ আর্থিকভাবে অস্বচ্ছল শিক্ষার্থীদের জন্য শতভাগ (১০০%) স্কলারশিপের ব্যবস্থা করে থাকে। এই স্কলারশিপ কার্যক্রমটি আস-সুন্নাহ ফাউন্ডেশনের ‘যাকাত ফান্ড’ থেকে পরিচালিত হয়, তাই আবেদনকারীকে অবশ্যই শরীয়াহ অনুযায়ী যাকাত গ্রহণের উপযুক্ত হতে হবে এবং এর সপক্ষে যথাযথ প্রমাণাদি পেশ করতে হবে। উপযুক্ততা প্রমাণের পর একজন শিক্ষার্থীর আবাসন, খাবার ও টিউশন ফিসহ যাবতীয় ব্যয়ভার ফাউন্ডেশন বহন করে। এছাড়া বিশেষ কিছু কোর্সের ক্ষেত্রে শিক্ষার্থীদের জন্য অতিরিক্ত ‘শিক্ষাভাতা’ ও ‘যাতায়াত ভাতা’ প্রদানেরও সুযোগ রয়েছে। আর্থিক অনটন যেন দ্বীনি জ্ঞান অর্জনের পথে কোনোভাবেই অন্তরায় না হয়, সেটিই আমাদের এই উদ্যোগের মূল লক্ষ্য।' },
    ],
  },
  en: {
    processIntro:
      'Student selection at As-Sunnah Dawah & Research Institute is completed through a disciplined and competitive process. Each step of admission is set out below:',
    steps: [
      {
        title: 'Online application',
        body: 'Interested candidates must apply online through the link published on the institute’s official website or social media pages. Providing accurate personal and educational details in the application form is compulsory.',
      },
      {
        title: 'Initial screening',
        body: 'A preliminary list is prepared from the applicants according to the criteria of the course in question (such as results and skills from previous examinations).',
      },
      {
        title: 'Written examination',
        body: 'Initially selected candidates sit a written examination on a fixed day. The subjects of the examination generally follow the criteria of the course; for example, questions for the general stream are based on basic Arabic, general Islamic studies and contemporary knowledge.',
      },
      {
        title: 'Oral examination (viva)',
        body: 'A fixed number of candidates who pass the written examination are called for the final interview. The candidate’s personality, future plans and commitment to completing the course are assessed here.',
      },
      {
        title: 'Final admission',
        body: 'On the basis of the combined results of the written and oral examinations, finally selected students are offered admission.',
      },
    ],
    scholarshipParagraphs: [
      { value: 'As-Sunnah Dawah & Research Institute provides a one hundred per cent (100%) scholarship for meritorious but financially insolvent students. This scholarship programme is run from As-Sunnah Foundation’s “Zakat Fund”, so an applicant must be eligible to receive zakat according to the Shariah and must present proper evidence in support of this. Once eligibility is proven, the Foundation bears all of a student’s expenses including accommodation, food and tuition fees. In addition, for some particular courses there is also the opportunity to provide students with an additional “stipend” and “travel allowance”. That financial hardship should never stand in the way of acquiring knowledge of the din is the chief aim of this initiative of ours.' },
    ],
  },
}
