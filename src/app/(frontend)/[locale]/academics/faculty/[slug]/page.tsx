import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { MarginFact, MarginFacts, MatnHashiya } from '@/components/layout/MatnHashiya'
import { PersonMonogram } from '@/components/people/PersonMonogram'
import type { Locale } from '@/i18n/config'
import type { Person } from '@/payload-types'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type Props = { params: Promise<{ locale: string; slug: string }> }

/**
 * A person's profile (REQ-ACA-10) in the matn/hashiya layout: the name is the matn's headline,
 * the margin carries the structure (designation, teams, roles), and the reading column carries
 * the biography when there is one and the subjects taught as a ruled list. The page stays
 * complete when the biography is empty (GAP-C5: no bios yet) — name, designation and subjects
 * stand on their own.
 */
export default async function PersonProfilePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [person, dict] = await Promise.all([queryPersonBySlug(slug, locale), getDictionary(locale)])
  if (!person) notFound()

  const subjects = (person.subjects ?? [])
    .map((s) => s.subject)
    .filter((s): s is string => Boolean(s))
  type PersonTeam = NonNullable<Person['teams']>[number]
  const teamLabels = (person.teams ?? [])
    .filter((t): t is PersonTeam => t in dict.people.teamLabels)
    .map((t) => dict.people.teamLabels[t])
  const roleLabels = (person.roles ?? [])
    .filter((r): r is keyof typeof dict.people.roleLabels => r in dict.people.roleLabels)
    .map((r) => dict.people.roleLabels[r])

  return (
    <main className="container pb-24">
      <div className="pt-12 pb-10 md:pt-20 md:pb-12">
        <MatnHashiya
          margin={
            <MarginFacts>
              {person.designation && (
                <MarginFact label={dict.people.designationLabel}>{person.designation}</MarginFact>
              )}
              {teamLabels.length > 0 && (
                <MarginFact label={dict.people.teamLabel}>{teamLabels.join(', ')}</MarginFact>
              )}
              {roleLabels.length > 0 && (
                <MarginFact label={dict.people.roleLabel}>{roleLabels.join(', ')}</MarginFact>
              )}
            </MarginFacts>
          }
        >
          <div className="flex items-start gap-5">
            <PersonMonogram person={person} size="lg" className="hidden sm:block" />
            <div className="min-w-0">
              <h1 className="text-h1">{person.name}</h1>
              {person.designation && (
                <p className="mt-2 text-body text-ink-muted">{person.designation}</p>
              )}
            </div>
          </div>
          <span className="illumination mt-6" aria-hidden />

          {person.bio ? (
            <p className="reading mt-8 whitespace-pre-line">{person.bio}</p>
          ) : (
            /* GAP-C5: no biographies yet; the sanctioned placeholder keeps the page whole. */
            <p className="mt-8 font-serif text-reading text-ink-muted">{dict.people.bioPending}</p>
          )}

          {subjects.length > 0 && (
            <section className="mt-12">
              <h2 className="text-h3">{dict.people.subjectsTaught}</h2>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {subjects.map((subject) => (
                  <li key={subject} className="py-3 font-serif text-body">
                    {subject}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </MatnHashiya>
      </div>
    </main>
  )
}

const queryPersonBySlug = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'people',
    locale,
    depth: 1,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return {}
  const person = await queryPersonBySlug(slug, rawLocale)
  if (!person) return {}
  return {
    title: person.name,
    description: person.designation ?? undefined,
  }
}
