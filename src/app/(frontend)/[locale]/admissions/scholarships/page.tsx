import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { isFeatureEnabled } from '@/utilities/featureFlag'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/**
 * Scholarships & Financial Aid (REQ-ADM-02): the client's text verbatim — the 100% scholarship
 * from the Foundation's Zakat Fund, the eligibility proof, the allowances — as quiet reading
 * paragraphs. No invented highlights; the paragraph carries its own weight.
 */

export default async function ScholarshipsPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [settings, admissions, dict] = await Promise.all([
    getCachedGlobal('site-settings', 0, locale)(),
    getCachedGlobal('admissions-content', 0, locale)(),
    getDictionary(locale),
  ])
  if (!isFeatureEnabled(settings, 'admissions')) notFound()

  const paragraphs = (admissions.scholarshipParagraphs ?? [])
    .map((p) => p.value)
    .filter((v): v is string => Boolean(v))

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.admissions.scholarshipsTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      {paragraphs.length > 0 ? (
        <div className="reading">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="max-w-[68ch]">
          <EmptyState
            title={dict.admissions.scholarshipEmptyTitle}
            description={dict.admissions.scholarshipEmptyBody}
            action={
              <StaffAddAction
                href="/admin/globals/admissions-content"
                label={dict.admissions.scholarshipsTitle}
              />
            }
          />
        </div>
      )}
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.admissions.scholarshipsTitle }
}
