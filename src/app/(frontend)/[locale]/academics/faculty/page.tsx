import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { PersonRow } from '@/components/people/PersonRow'
import { OTHER_TEAM, TEAM_ORDER, type TeamKey } from '@/components/people/teams'
import { StaffAddAction } from '@/components/site/StaffAddAction'
import { EmptyState } from '@/components/ui/empty-state'
import type { Person } from '@/payload-types'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type Props = { params: Promise<{ locale: string }> }

/**
 * Faculty & Teachers directory (REQ-ACA-10): the teacher panel with subjects, then the Arabic,
 * Tajweed and Tarbiyah teachers, then the language, computer, maths and science teams — grouped
 * as the client's document lists them, each person a ruled row with monogram or photo, name,
 * designation and subjects. Teams whose lists have not arrived yet keep their group with a
 * designed empty state (the document lists them as teams without names).
 */
export const revalidate = 600

export default async function FacultyDirectoryPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [payload, dict] = await Promise.all([getPayload({ config: configPromise }), getDictionary(locale)])

  const people = await payload.find({
    collection: 'people',
    locale,
    depth: 1,
    limit: 200,
    pagination: false,
    sort: 'order',
    where: { roles: { contains: 'faculty' } },
  })

  const groups = groupByTeam(people.docs)
  const hasAny = people.docs.length > 0

  return (
    <main className="container pb-24">
      <header className="pt-12 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-h1">{dict.people.facultyTitle}</h1>
        <span className="illumination mt-6" aria-hidden />
      </header>

      {!hasAny ? (
        <EmptyState
          title={dict.people.directoryEmptyTitle}
          description={dict.people.directoryEmptyBody}
          action={
            <StaffAddAction
              href="/admin/collections/people/create"
              label={dict.people.addTeacher}
            />
          }
        />
      ) : (
        <div className="space-y-12">
          {groups.map(({ team, people: teamPeople }) => {
            const label = dict.people.teamLabels[team as keyof typeof dict.people.teamLabels]
            return (
              <section key={team} aria-labelledby={`team-${team}`}>
                <h2 id={`team-${team}`} className="text-h3">
                  {label}
                </h2>
                {teamPeople.length === 0 ? (
                  <EmptyState
                    className="mt-5"
                    title={dict.people.teamEmptyTitle}
                    description={dict.people.teamEmptyBody}
                    action={
                      <StaffAddAction
                        href={`/admin/collections/people/create?team=${team === OTHER_TEAM ? '' : team}`}
                        label={dict.people.addTeacher}
                      />
                    }
                  />
                ) : (
                  <ul className="mt-5 divide-y divide-border border-y border-border">
                    {teamPeople.map((person) => (
                      <PersonRow key={person.id} person={person} locale={locale} />
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
      )}
    </main>
  )
}

/** Group faculty by team in the document's order; team-less teachers fall into the last group. */
function groupByTeam(people: Person[]): { team: TeamKey; people: Person[] }[] {
  const groups = new Map<TeamKey, Person[]>([...TEAM_ORDER, OTHER_TEAM].map((team) => [team, []]))
  for (const person of people) {
    const teams = (person.teams ?? []).filter((t): t is (typeof TEAM_ORDER)[number] =>
      (TEAM_ORDER as readonly string[]).includes(t),
    )
    if (teams.length === 0) {
      groups.get(OTHER_TEAM)?.push(person)
    } else {
      for (const team of teams) groups.get(team)?.push(person)
    }
  }
  return [...groups].map(([team, teamPeople]) => ({ team, people: teamPeople }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.people.facultyTitle }
}
