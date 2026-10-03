import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Person } from '@/payload-types'

import { PersonMonogram } from './PersonMonogram'
import { localizedHref } from '@/i18n/config'

/** A member of the institute's leadership (REQ-ABT-02): larger than a faculty row, monogram or
 * photo, the name set in the serif face, the designation quiet beneath. Dignified, not carded. */
export function LeadershipRow({ person, locale }: { person: Person; locale: Locale }) {
  return (
    <li className="grid grid-cols-[4rem_1fr] items-center gap-x-5 py-6 md:grid-cols-[4rem_minmax(0,2fr)_minmax(0,3fr)] md:gap-x-8">
      <PersonMonogram person={person} size="lg" />
      <div className="min-w-0">
        <Link
          href={localizedHref(locale, `/academics/faculty/${person.slug}`)}
          className="font-serif text-h3 font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          {person.name}
        </Link>
        {person.designation && (
          <p className="mt-1 text-body text-ink-muted">{person.designation}</p>
        )}
      </div>
    </li>
  )
}
