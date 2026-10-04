import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { StepList } from '@/components/admissions/StepList'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { isFeatureEnabled } from '@/utilities/featureFlag'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/**
 * The admission process (REQ-ADM-01): the client's introduction and the five steps — online
 * application, screening, written exam, viva, final admission — verbatim, numbered in Bengali
 * numerals because they are a sequence. Hidden entirely while the admissions module is off
 * (REQ-GEN-06).
 */
export const revalidate = 600

export default async function AdmissionProcessPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [settings, admissions, dict] = await Promise.all([
    getCachedGlobal('site-settings', 0, locale)(),
    getCachedGlobal('admissions-content', 0, locale)(),
    getDictionary(locale),
  ])
  if (!isFeatureEnabled(settings, 'admissions')) notFound()

  const steps = (admissions.steps ?? []).filter((s) => s.title)

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.admissions.processTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      {admissions.processIntro && <p className="reading">{admissions.processIntro}</p>}

      <section className={admissions.processIntro ? 'mt-14' : undefined}>
        {steps.length > 0 ? (
          <StepList steps={steps} locale={locale} />
        ) : (
          <div className="max-w-[68ch]">
            <EmptyState
              title={dict.admissions.stepsEmptyTitle}
              description={dict.admissions.stepsEmptyBody}
              action={
                <StaffAddAction
                  href="/admin/globals/admissions-content"
                  label={dict.admissions.processTitle}
                />
              }
            />
          </div>
        )}
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.admissions.processTitle }
}
