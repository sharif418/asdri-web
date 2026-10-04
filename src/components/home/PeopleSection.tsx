import Link from 'next/link'
import React from 'react'

import { PersonMonogram } from '@/components/people/PersonMonogram'
import type { Locale } from '@/i18n/config'
import type { Home, Person } from '@/payload-types'

import { localizedHref } from '@/i18n/config'

type PeopleBlock = Extract<NonNullable<Home['sections']>[number], { blockType: 'people' }>

/**
 * Featured leadership and faculty (REQ-HOME-09): the Chairman, the In-Charge and the key
 * scholars, as quiet ruled rows — monogram or photo, serif name, designation — linking to the
 * profiles. Who appears is chosen on the person themselves.
 */
export function PeopleSection({
  block,
  people,
  locale,
}: {
  block: PeopleBlock
  people: Person[]
  locale: Locale
}) {
  if (people.length === 0) return null

  return (
    <section className="container pb-20">
      <h2 className="text-h3">{block.heading}</h2>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {people.map((person) => (
          <li key={person.id} className="flex items-center gap-4 py-4">
            <PersonMonogram person={person} />
            <div className="min-w-0">
              <Link
                href={localizedHref(locale, `/academics/faculty/${person.slug}`)}
                className="font-serif text-body text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {person.name}
              </Link>
              {person.designation && (
                <p className="mt-0.5 text-caption text-ink-muted">{person.designation}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
