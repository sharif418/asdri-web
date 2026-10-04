import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Home } from '@/payload-types'

import { NoticeTabs } from './NoticeTabs'
import { localizedHref } from '@/i18n/config'

type NoticesBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'notices' }
>

type Tab = 'all' | 'admission' | 'academic' | 'recruitment'
const CATEGORIES: Tab[] = ['all', 'admission', 'academic', 'recruitment']

/**
 * Latest notices on the home (REQ-HOME-06): plain category tabs over ruled rows, with a quiet
 * link to the full board. The lists are fetched once on the server; switching tabs only swaps
 * what is visible.
 */
export async function NoticesSection({
  block,
  locale,
  dict,
}: {
  block: NoticesBlock
  locale: Locale
  dict: Dictionary
}) {
  const payload = await getPayload({ config: configPromise })
  const limit = block.limit ?? 4

  const fetchBy = async (category?: string) =>
    (
      await payload.find({
        collection: 'notices',
        locale,
        depth: 0,
        limit,
        pagination: false,
        sort: ['-pinned', '-publishedAt'],
        ...(category ? { where: { category: { equals: category } } } : {}),
      })
    ).docs

  const [all, admission, academic, recruitment] = await Promise.all([
    fetchBy(),
    fetchBy('admission'),
    fetchBy('academic'),
    fetchBy('recruitment'),
  ])

  const notices = { all, admission, academic, recruitment } satisfies Record<Tab, typeof all>
  const hasAny = CATEGORIES.some((key) => (notices[key] ?? []).length > 0)
  if (!hasAny) return null

  return (
    <section className="container pb-20">
      <h2 className="text-h3">{block.heading}</h2>
      <div className="mt-6">
        <NoticeTabs
          notices={notices}
          locale={locale}
          dict={{
            boardTitle: dict.notices.boardTitle,
            allCategories: dict.notices.allCategories,
            categoryLabels: dict.notices.categoryLabels,
            statusNew: dict.notices.statusNew,
            statusActive: dict.notices.statusActive,
            statusClosed: dict.notices.statusClosed,
            emptyBody: dict.notices.emptyBody,
          }}
          boardHref={localizedHref(locale, '/notices')}
          boardLabel={dict.home.viewNoticeBoard}
        />
      </div>
    </section>
  )
}
