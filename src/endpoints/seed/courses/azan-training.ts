import type { SeedCourse } from './types'

// ─── 6. Azan Training Program ───────────────────────────────────────────────────────────
export const azanTrainingProgram: SeedCourse = {
  slug: 'azan-training-program',
  bn: {
    title: 'আযান প্রশিক্ষণ প্রোগ্রাম',
    summary: 'এই প্রশিক্ষণটি সাজানো হয়েছে একজন মুয়াযযিনকে আদর্শ ও দক্ষ হিসেবে গড়ে তোলার জন্য।',
    intro:
      'এই প্রশিক্ষণটি সাজানো হয়েছে একজন মুয়াযযিনকে আদর্শ ও দক্ষ হিসেবে গড়ে তোলার জন্য। এখানে কেবল আযানের সুর-ই নয়, বরং শব্দের বিশুদ্ধ উচ্চারণ (মাখরাজ), সংশ্লিষ্ট মাসআলা-মাসায়েল এবং একজন মুয়াযযিনের ব্যক্তিগত আমল ও উন্নত ব্যক্তিত্ব গঠনের ওপর বিশেষ গুরুত্বারোপ করা হয়। কণ্ঠের যত্ন ও আধুনিক প্রযুক্তি ব্যবহারের পাশাপাশি এই প্রোগ্রামটি মুয়াযযিনদের সামাজিক নেতৃত্বের গুণাবলি অর্জনেও সহায়তা করে।',
    objectives: [
      'সুমধুর সুর ও বিশুদ্ধ উচ্চারণের মাধ্যমে বাংলাদেশে আযানের একটি মানসম্মত ধারা তৈরি করা।',
      'আযানের ধ্বনির মাধ্যমে মানুষের অন্তরে ইসলামের প্রতি গভীর অনুরাগ সৃষ্টি এবং ঘরে ঘরে দ্বীনের দাওয়াত পৌঁছে দেওয়া।',
      'মুয়াজ্জিনকে কেবল মসজিদের খাদেমের গণ্ডিতে না রেখে, সমাজের একজন আদর্শ ‘দাঈ’ (আহ্বানকারী) ও পথপ্রদর্শক হিসেবে গড়ে তোলা।',
    ],
    formatDuration: '১৫ দিন',
    eligibility: [
      'হাফেজ/আলেম অথবা নাহবেমীর/দাখিল কিংবা তদূর্ধ্ব পর্যায়ের শিক্ষার্থী হতে হবে।',
      'মুয়াযযিন হিসেবে কর্মরত অথবা এই পেশায় আগ্রহী হতে হবে।',
      'অবশ্যই কণ্ঠে সুর এবং তা রপ্ত করার যোগ্যতা থাকতে হবে।',
    ],
    topicsLabel: 'প্রশিক্ষণ কারিকুলাম',
    topics: [
      'আযান ও ইক্বামাতের প্রতিটি শব্দের নিখুঁত এবং বিশুদ্ধ উচ্চারণ নিশ্চিতকরণ।',
      'আযান ও ইক্বামাত সংশ্লিষ্ট মাসআলা-মাসায়েল।',
      'পবিত্র মক্কা ও মদিনার ঐতিহ্যবাহী সুরসহ বিশ্ববিখ্যাত ৫টি সুরের ওপর নিবিড় অনুশীলন।',
      'কণ্ঠের বিশেষ যত্ন, দীর্ঘ শ্বাস নিয়ন্ত্রণ এবং কণ্ঠের স্কেল ঠিক রাখার ব্যায়াম।',
      'দাঈর বৈশিষ্ট্য ও গুনাবলি।',
      'তারবিয়াহ ও পার্সোনালিটি ডেভেলপমেন্ট।',
      'কমিউনিকেশন ও নেগোসিয়েশন স্কিল।',
      'সাউন্ড সিস্টেম ম্যানেজমেন্ট।',
      'টাইম ম্যানেজমেন্ট।',
    ],
  },
  en: {
    title: 'Azan Training Program',
    summary:
      '15-Day course focusing on proper pronunciation (Makhraj), vocal technique, and Muazzin tarbiyah.',
    intro:
      'This training is arranged to shape a muezzin who is exemplary and skilled. It lays particular stress not only on the melody of the azan but on the correct pronunciation of its words (makhraj), the related rulings, and the muezzin’s personal practice and character. Alongside voice care and the use of modern technology, the programme also helps muezzins acquire the qualities of social leadership.',
    objectives: [
      'To set a standard of azan in Bangladesh through sweet melody and correct pronunciation.',
      'To create deep love for Islam in people’s hearts through the sound of the azan, and carry the call of the deen to every home.',
      'To build the muezzin not merely within the bounds of a mosque servant, but as an exemplary ‘da‘i’ (caller) and guide in society.',
    ],
    formatDuration: '15 days',
    eligibility: [
      'A hafiz or alem, or a student of the Nohbemi/Dakhil level or above.',
      'Currently working as a muezzin, or interested in the profession.',
      'Must have melody in the voice and the ability to master it.',
    ],
    topicsLabel: 'Curriculum',
    topics: [
      'Ensuring the perfect and correct pronunciation of every word of the azan and iqamah.',
      'The rulings related to the azan and iqamah.',
      'Intensive practice of five world-famous melodies, including the historic melodies of the holy cities of Makkah and Madinah.',
      'Special voice care, long-breath control and exercises to keep the vocal scale steady.',
      'The character and qualities of a da‘i.',
      'Tarbiyah and personality development.',
      'Communication and negotiation skills.',
      'Sound system management.',
      'Time management.',
    ],
  },
  type: 'short',
  status: 'active',
  residential: 'both',
  gender: 'male',
  featured: true,
  order: 60,
}
