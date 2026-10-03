import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { LeadershipRow } from '@/components/people/LeadershipRow'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import { getDictionary } from '@/i18n/getDictionary'
import { isLocale } from '@/i18n/config'

type Props = { params: Promise<{ locale: string }> }

/**
 * Leadership & Administration (REQ-ABT-02): the Chairman, the In-Charge, the two Assistant
 * In-Charges and the Academic Coordinator, exactly as the client's document lists them. A quiet
 * ruled list; the name links to the person's profile.
 */
export const revalidate = 600

export default async function LeadershipPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [payload, dict] = await Promise.all([getPayload({ config: configPromise }), getDictionary(locale)])

  const people = await payload.find({
    collection: 'people',
    locale,
    depth: 1,
    limit: 20,
    pagination: false,
    sort: 'order',
    where: { roles: { contains: 'leadership' } },
  })

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.people.leadershipTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      {people.docs.length === 0 ? (
        <EmptyState
          title={dict.people.leadershipEmptyTitle}
          description={dict.people.leadershipEmptyBody}
          action={
            <StaffAddAction
              href="/admin/collections/people/create"
              label={dict.people.addTeacher}
            />
          }
        />
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {people.docs.map((person) => (
            <LeadershipRow key={person.id} person={person} locale={locale} />
          ))}
        </ul>
      )}
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.people.leadershipTitle }
}
