import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Person } from '@/payload-types'

import { PersonMonogram } from './PersonMonogram'
import { localizedHref } from '@/i18n/config'

/** A teacher's row in the faculty directory (REQ-ACA-10): monogram or photo, name, designation
 * and the subjects they teach in plain text. Ruled, not carded; the name carries the link. */
export function PersonRow({ person, locale }: { person: Person; locale: Locale }) {
  const subjects = (person.subjects ?? [])
    .map((s) => s.subject)
    .filter((s): s is string => Boolean(s))

  return (
    <li className="grid grid-cols-[3rem_1fr] items-start gap-x-4 py-4 sm:grid-cols-[3rem_minmax(0,2fr)_minmax(0,3fr)] sm:gap-x-6">
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
      {subjects.length > 0 && (
        <p className="col-span-2 pt-1 text-small text-ink-muted sm:col-span-1 sm:pt-1.5">
          {subjects.join(', ')}
        </p>
      )}
    </li>
  )
}
