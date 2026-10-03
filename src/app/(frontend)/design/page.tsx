import type { Metadata } from 'next'
import React from 'react'

import { MarginFact, MarginFacts, MatnHashiya } from '@/components/layout/MatnHashiya'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { formatBDT, formatCounter, formatDate, formatNumber } from '@/utilities/formatNumber'

/**
 * Internal design specimen (docs/05 §7, docs/08). Not linked from navigation, not indexed.
 * Shows the token system and base components with the institute's real content so the client
 * can approve the direction before pages are built. Content below is copied verbatim from
 * docs/source/02-website-content-and-features-bn.extracted.txt.
 */
export const metadata: Metadata = {
  title: 'Design specimen',
  robots: { index: false, follow: false },
}

const VISION_BN =
  'সমকালীন চিন্তাগত বিভ্রান্তি ও সামাজিক ফিতনাসমূহের মোকাবিলায় চিন্তাশীল, জ্ঞানসমৃদ্ধ ও কার্যকর দাওয়াহকর্মী ও গবেষক তৈরি করা। পাশাপাশি ইসলামের বিরুদ্ধে উত্থাপিত বিভিন্ন প্রশ্ন, আপত্তি ও অভিযোগের গবেষণালব্ধ ও যুক্তিনির্ভর জবাব প্রদান করে বুদ্ধিবৃত্তিক দাওয়াহকে শক্তিশালী করতে কাজ করে যাওয়া।'

const PYS_INTRO_BN =
  'এটি তরুণ ও মেধাবী আলেমদের জন্য গবেষণানির্ভর উচ্চশিক্ষা প্রোগ্রাম। যোগ্য আলেমদের আধুনিক জ্ঞান-বিজ্ঞানে দক্ষ করে আন্তর্জাতিক মানের দাঈ ও গবেষক হিসেবে গড়ে তোলার লক্ষ্যে এই কোর্সটি চালু করা হয়েছে। বিশেষভাবে এই কোর্সটি কওমি মাদরাসা পড়ুয়া মেধাবী আলেমদের জন্য ডিজাইন করা হয়েছে, যাতে তারা সমসাময়িক চ্যালেঞ্জ মোকাবেলা করে ইসলামের দাওয়াহ দিতে পারেন।'

const PYS_SEM1 = [
  {
    code: 'PYS 1101',
    title: 'Islam and Da‘wah',
    modules: ['Introduction to Islam', 'Introduction to Da‘wah'],
    credit: 3,
    marks: 100,
  },
  {
    code: 'PYS 1102',
    title: 'Introduction to Islamic Sciences',
    modules: ['Ulumul Quran', 'Ulumul Hadith', 'Usulul Fiqh'],
    credit: 3,
    marks: 100,
  },
  {
    code: 'PYS 1103',
    title: 'Islamic History and Civilization',
    modules: ['Islam in South Asia', 'Intellectual History of Islamic Civilization'],
    credit: 3,
    marks: 100,
  },
  {
    code: 'PYS 1104',
    title: 'Media and Society',
    modules: [
      'Media and Journalism in Global Political Context',
      'World Civilizations and Cultures',
      'Foundation of Politics & International Relations',
      'Legal Systems & General Jurisprudence',
    ],
    credit: 4,
    marks: 100,
  },
  {
    code: 'PYS 1105',
    title: 'Critical Reading',
    modules: ['Critical Reading'],
    credit: 4,
    marks: 100,
  },
]

const NOTICES = [
  {
    title: 'সার্টিফিকেট কোর্স ইন ইসলামিক স্টাডিজ: ২য় ব্যাচে ভর্তি বিজ্ঞপ্তি',
    category: 'ভর্তি',
    date: '2026-10-01',
    status: 'active' as const,
  },
  {
    title: 'আযান প্রশিক্ষণ প্রোগ্রাম: আবেদন শুরু',
    category: 'ভর্তি',
    date: '2026-09-28',
    status: 'new' as const,
  },
  {
    title: 'PYS ১ম সেমিস্টার পরীক্ষার রুটিন',
    category: 'একাডেমিক',
    date: '2026-09-20',
    status: 'neutral' as const,
  },
  {
    title: 'আরবি ভাষা শিক্ষক প্রশিক্ষণ: ১ম ব্যাচের আবেদন শেষ',
    category: 'ভর্তি',
    date: '2026-08-30',
    status: 'closed' as const,
  },
]

const SWATCHES = [
  { name: 'Stone', token: 'bg-background', note: 'page' },
  { name: 'Panel', token: 'bg-card', note: 'reading surface' },
  { name: 'Soft', token: 'bg-paper-2', note: 'bands, chips' },
  { name: 'Rule', token: 'bg-border', note: 'hairlines' },
  { name: 'Ink', token: 'bg-foreground', note: 'text' },
  { name: 'Ink muted', token: 'bg-ink-muted', note: 'secondary text' },
  { name: 'Mihrab green', token: 'bg-primary', note: 'primary' },
  { name: 'Mihrab deep', token: 'bg-primary-deep', note: 'pressed, dark bands' },
  { name: 'Green soft', token: 'bg-primary-soft', note: 'selected, chips' },
  { name: 'Tazhib gold', token: 'bg-accent', note: 'one per screen' },
  { name: 'Gold soft', token: 'bg-accent-soft', note: 'new badge' },
  { name: 'Success', token: 'bg-success', note: 'active' },
  { name: 'Warning', token: 'bg-warning', note: '' },
  { name: 'Error', token: 'bg-error', note: '' },
]

function Spec({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="rule py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
        <h2 className="text-h3 lg:col-span-3">{title}</h2>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  )
}

export default function DesignSpecimenPage() {
  return (
    <main className="container pb-24">
      {/* Specimen header. The headline is the hero; the gold hairline is this screen's single illumination. */}
      <header className="pt-16 pb-12 md:pt-24">
        <p className="text-small text-ink-muted">অভ্যন্তরীণ ডিজাইন স্পেসিমেন</p>
        <h1 className="text-display mt-4 max-w-4xl">
          আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট
        </h1>
        <span className="illumination mt-6" aria-hidden />
        <p className="reading mt-6">{VISION_BN}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button>কোর্স দেখুন</Button>
          <Button variant="outline">প্রসপেক্টাস (PDF)</Button>
        </div>
      </header>

      <Spec id="palette" title="রঙ">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:grid-cols-4">
          {SWATCHES.map((s) => (
            <li key={s.name}>
              <div className={`h-14 rounded-sm border border-border ${s.token}`} />
              <p className="mt-2 text-small">{s.name}</p>
              {s.note && <p className="text-caption text-ink-muted">{s.note}</p>}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-prose text-small text-ink-muted">
          সোনালি রঙ প্রতিটি স্ক্রিনে একবারই ব্যবহার হয়: একটি রেখা, একটি ব্যাজ অথবা একটি বাটন। বাকি
          সব সবুজ, কালি আর পাথুরে সাদায়।
        </p>
      </Spec>

      <Spec id="type" title="টাইপোগ্রাফি">
        <div className="space-y-10">
          <div>
            <p className="text-caption text-ink-muted">
              Display: Noto Serif Bengali 600, Source Serif 4
            </p>
            <p className="text-display mt-2 font-serif font-semibold">বুদ্ধিবৃত্তিক দাওয়াহ</p>
            <p className="text-display font-serif font-semibold">Dawah &amp; Research</p>
          </div>
          <div className="space-y-3">
            <p className="text-caption text-ink-muted">Headings</p>
            <p className="text-h1 font-serif font-semibold">Preparatory Year for Specialization</p>
            <p className="text-h2 font-serif font-semibold">কোর্সের ধরন ও ভর্তির যোগ্যতা</p>
            <p className="text-h3 font-serif font-semibold">
              ১ম সেমিস্টার: মোট ক্রেডিট ১৭, মোট নম্বর ৬০০
            </p>
            <p className="text-h4 font-serif font-semibold">
              সম্পূরক কোর্সসমূহ (নন-ক্রেডিট বাধ্যতামূলক)
            </p>
          </div>
          <div>
            <p className="text-caption text-ink-muted">Reading: serif, 68ch, line-height 1.8</p>
            <p className="reading mt-2">{PYS_INTRO_BN}</p>
          </div>
          <div>
            <p className="text-caption text-ink-muted">Interface: sans</p>
            <p className="mt-2 text-body">
              কোর্সটি সম্পূর্ণ আবাসিক এবং শুধু পুরুষদের জন্য। সম্পূর্ণ কোর্সের মেয়াদ ৩ বছর। কোর্স
              কোড PYS 1101, ক্রেডিট {formatNumber(3)}, মোট নম্বর {formatNumber(100)}।
            </p>
            <p className="mt-2 text-small text-ink-muted">
              ছোট লেখা: ভর্তি সংক্রান্ত আপডেটের জন্য আমাদের ফেসবুক পেজ ভিজিট করুন। ফোন +880
              1805-437910 (সকাল ৯টা থেকে বিকাল ৫টা)।
            </p>
          </div>
          <div>
            <p className="text-caption text-ink-muted">Arabic inside Bangla: Noto Naskh Arabic</p>
            <p className="mt-2 text-h3">
              Preparatory Year for Specialization <span lang="ar">السنة التمهيدية للتخصص</span>
            </p>
            <p className="mt-1 text-body">
              পাঁচটি তাখাচ্ছুছ বিভাগ: Dawah and Comparative Religion{' '}
              <span lang="ar">(الدعوة و مقارنة الأديان)</span>, Fiqh and Ifta{' '}
              <span lang="ar">(الفقه والإفتاء)</span>
            </p>
          </div>
        </div>
      </Spec>

      <Spec id="numerals" title="সংখ্যা ও তারিখ">
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-caption text-ink-muted">পরিমাণ (বাংলা অঙ্ক)</dt>
            <dd className="text-h3 font-sans font-medium">{formatCounter(420)} শিক্ষার্থী</dd>
          </div>
          <div>
            <dt className="text-caption text-ink-muted">টাকা</dt>
            <dd className="text-h3 font-sans font-medium">{formatBDT(125000)}</dd>
          </div>
          <div>
            <dt className="text-caption text-ink-muted">তারিখ</dt>
            <dd className="text-body">{formatDate('2026-10-03')}</dd>
          </div>
          <div>
            <dt className="text-caption text-ink-muted">কোড ও ফোন (ল্যাটিন অঙ্ক, সবসময়)</dt>
            <dd className="text-body">PYS 1104, AS-104, +880 1805-437910</dd>
          </div>
        </dl>
      </Spec>

      <Spec id="actions" title="বাটন ও ব্যাজ">
        <div className="flex flex-wrap items-center gap-3">
          <Button>আবেদন করুন</Button>
          <Button variant="secondary">বিস্তারিত দেখুন</Button>
          <Button variant="outline">PDF ডাউনলোড</Button>
          <Button variant="ghost">বাতিল</Button>
          <Button variant="link">সব নোটিশ</Button>
          <Button variant="illuminated">দান করুন</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="new">নতুন</Badge>
          <Badge variant="active" dot>
            আবেদন চলছে
          </Badge>
          <Badge variant="closed">আবেদন শেষ</Badge>
          <Badge variant="primary">ভর্তি</Badge>
          <Badge>একাডেমিক</Badge>
          <Badge variant="outline">নিয়োগ</Badge>
        </div>
        <p className="mt-6 max-w-prose text-small text-ink-muted">
          বাটনের লেখা বলে দেয় ক্লিক করলে কী হবে। &ldquo;আবেদন করুন&rdquo; চাপলে আবেদন ফর্ম খোলে;
          সফল হলে বার্তা আসে &ldquo;আবেদন জমা হয়েছে&rdquo;।
        </p>
      </Spec>

      <Spec id="matn" title="মতন ও হাশিয়া">
        <MatnHashiya
          margin={
            <MarginFacts>
              <MarginFact label="কোর্স কোড">PYS</MarginFact>
              <MarginFact label="মেয়াদ">{formatNumber(3)} বছর, আবাসিক</MarginFact>
              <MarginFact label="১ম সেমিস্টার">
                মোট ক্রেডিট {formatNumber(17)}, মোট নম্বর {formatNumber(600)}
              </MarginFact>
              <MarginFact label="ভর্তি">
                <Badge variant="active" dot>
                  আবেদন চলছে
                </Badge>
              </MarginFact>
            </MarginFacts>
          }
        >
          <h3 className="text-h2">Preparatory Year for Specialization</h3>
          <p className="mt-1 text-h4 font-normal text-ink-muted" lang="ar">
            السنة التمهيدية للتخصص
          </p>
          <div className="reading mt-6">
            <p>{PYS_INTRO_BN}</p>
            <p>
              Preparatory Year for Specialization (PYS) ১ বছর মেয়াদী কোর্স। এটি সবার জন্য
              বাধ্যতামূলক এবং তাখাসসুসের প্রস্তুতিমূলক বর্ষ হিসেবে বিবেচিত হবে। দ্বিতীয় ও
              প্রস্তুতিমূলক বর্ষ শেষে ফলাফল ও আগ্রহের ভিত্তিতে চূড়ান্তভাবে বিভাগ নির্বাচন করা হবে।
            </p>
          </div>
        </MatnHashiya>
      </Spec>

      <Spec id="table" title="কারিকুলাম টেবিল">
        {/* Desktop: a ruled kitab table. Mobile: each row becomes a stacked block with the code in the margin position. */}
        <div className="hidden md:block">
          <table className="w-full border-collapse text-small">
            <thead>
              <tr className="rule-ink border-b text-left text-caption text-ink-muted">
                <th scope="col" className="py-2 pr-4 font-medium">
                  কোড
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  কোর্স
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  মডিউল
                </th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">
                  ক্রেডিট
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  নম্বর
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PYS_SEM1.map((r) => (
                <tr key={r.code} className="align-top">
                  <td className="py-3 pr-4 whitespace-nowrap text-ink-muted">{r.code}</td>
                  <td className="py-3 pr-4 font-serif text-body">{r.title}</td>
                  <td className="py-3 pr-4 text-ink-muted">{r.modules.join(', ')}</td>
                  <td className="py-3 pr-4 text-right">{formatNumber(r.credit)}</td>
                  <td className="py-3 text-right">{formatNumber(r.marks)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="rule-ink border-t font-medium">
                <td className="py-3 pr-4" colSpan={3}>
                  মোট
                </td>
                <td className="py-3 pr-4 text-right">{formatNumber(17)}</td>
                <td className="py-3 text-right">{formatNumber(600)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <ul className="divide-y divide-border rule-ink border-t md:hidden">
          {PYS_SEM1.map((r) => (
            <li key={r.code} className="grid grid-cols-[5.5rem_1fr] gap-x-3 py-4">
              <span className="text-caption text-ink-muted">{r.code}</span>
              <div>
                <p className="font-serif text-body">{r.title}</p>
                <p className="mt-1 text-caption text-ink-muted">{r.modules.join(', ')}</p>
                <p className="mt-2 text-caption">
                  ক্রেডিট {formatNumber(r.credit)}, নম্বর {formatNumber(r.marks)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec id="notices" title="নোটিশ তালিকা">
        <ul className="divide-y divide-border rule-ink border-t">
          {NOTICES.map((n) => (
            <li
              key={n.title}
              className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-x-6"
            >
              <time className="text-caption text-ink-muted" dateTime={n.date}>
                {formatDate(n.date)}
              </time>
              <a href="#" className="font-serif text-body text-foreground hover:text-primary">
                {n.title}
              </a>
              <div className="flex items-center gap-2">
                <Badge>{n.category}</Badge>
                {n.status === 'new' && <Badge variant="new">নতুন</Badge>}
                {n.status === 'active' && (
                  <Badge variant="active" dot>
                    আবেদন চলছে
                  </Badge>
                )}
                {n.status === 'closed' && <Badge variant="closed">আবেদন শেষ</Badge>}
              </div>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec id="empty" title="খালি অবস্থা">
        <EmptyState
          title="এই বিভাগে এখনো কোনো নোটিশ প্রকাশ হয়নি"
          description="নতুন নোটিশ প্রকাশ হলে এখানে তারিখসহ দেখা যাবে। স্টাফ হিসেবে লগইন থাকলে নিচের বোতাম থেকে প্রথম নোটিশটি যোগ করা যায়।"
          action={<Button variant="secondary">নোটিশ যোগ করুন</Button>}
        />
      </Spec>

      <Spec id="dark" title="গাঢ় থিম">
        <div data-theme="dark" className="rounded-md bg-background p-6 text-foreground md:p-8">
          <h3 className="text-h3">গাঢ় থিমে একই টোকেন</h3>
          <p className="reading mt-3 text-reading">
            পাথুরে সাদা আর কালি জায়গা বদল করে; সবুজ ও সোনালি হালকা হয় যাতে পড়া যায়।
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>আবেদন করুন</Button>
            <Button variant="outline">PDF ডাউনলোড</Button>
            <Badge variant="new">নতুন</Badge>
            <Badge variant="active" dot>
              আবেদন চলছে
            </Badge>
          </div>
        </div>
      </Spec>
    </main>
  )
}
