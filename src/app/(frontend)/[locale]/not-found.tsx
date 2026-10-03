import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n/getDictionary'

/**
 * 404 for the public site. not-found pages receive no params, so this renders Bangla with the
 * English line beneath it; both link home.
 */
export default async function NotFound() {
  const [bn, en] = await Promise.all([getDictionary('bn'), getDictionary('en')])

  return (
    <main className="container flex flex-1 flex-col justify-center py-24">
      <p className="text-caption text-ink-muted">404</p>
      <h1 className="text-h1 mt-3">{bn.common.notFoundTitle}</h1>
      <p className="reading mt-4 text-body">{bn.common.notFoundBody}</p>
      <p className="mt-6 text-small text-ink-muted" lang="en">
        {en.common.notFoundTitle}. {en.common.notFoundBody}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">{bn.common.goHome}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/en" lang="en">
            {en.common.goHome}
          </Link>
        </Button>
      </div>
    </main>
  )
}
