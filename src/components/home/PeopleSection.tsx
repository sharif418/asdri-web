import Link from 'next/link'
import React from 'react'

import { PersonMonogram } from '@/components/people/PersonMonogram'
import { SectionHead } from '@/components/site/SectionHead'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Home, Person } from '@/payload-types'

import { localizedHref } from '@/i18n/config'

type PeopleBlock = Extract<
  NonNullable<Home['sections']>[number],
  { blockType: 'people' }
>

/**
 * Featured leadership and faculty (REQ-HOME-09) as the signatories page of a report: two ruled
 * columns on wide screens, each person with their seal (photo or monogram), their name in serif
 * and their designation. Who appears is chosen on the person themselves; the section head
 * carries the route to the full faculty directory.
 */
export function PeopleSection({
  block,
  people,
  locale,
  dict,
}: {
  block: PeopleBlock
  people: Person[]
  locale: Locale
  dict: Dictionary
}) {
  if (people.length === 0) return null

  return (
    <section className="container py-16 md:py-20" aria-label={block.heading}>
      <SectionHead
        heading={block.heading}
        rule
        action={{
          href: localizedHref(locale, '/academics/faculty'),
          label: dict.home.seeAllFaculty,
        }}
      />
      <ul className="mt-8 grid gap-x-12 gap-y-0 md:grid-cols-2">
        {people.map((person) => (
          <li key={person.id} className="flex items-center gap-5 border-t border-border py-6">
            <PersonMonogram person={person} size="lg" />
            <div className="min-w-0">
              <Link
                href={localizedHref(locale, `/academics/faculty/${person.slug}`)}
                className="font-serif text-h4 text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {person.name}
              </Link>
              {person.designation && (
                <p className="mt-1 text-caption text-ink-muted">{person.designation}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
