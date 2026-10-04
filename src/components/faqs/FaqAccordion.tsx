import { Plus } from 'lucide-react'
import React from 'react'

import RichText from '@/components/RichText'
import type { Faq } from '@/payload-types'

export type FaqItem = { faq: Faq; categoryLabel?: string }

/**
 * The FAQ accordion (REQ-ADM-04): a native details/summary — keyboard-focusable and openable
 * without scripting — styled as ruled rows. The only motion answers the user: the plus rotates
 * to a cross while the answer unfolds beneath its question. The category label rides on the
 * right when several categories are shown at once, like the notice board's rows.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map(({ faq, categoryLabel }) => (
        <li key={faq.id}>
          <details className="group">
            <summary className="cursor-pointer list-none py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span className="font-serif text-body font-semibold">{faq.question}</span>
                <Plus
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </span>
              {categoryLabel && (
                <span className="mt-1 block text-caption text-ink-muted">{categoryLabel}</span>
              )}
            </summary>
            <div className="reading max-w-[68ch] pb-5 text-ink-muted">
              <RichText data={faq.answer} enableProse={false} enableGutter={false} />
            </div>
          </details>
        </li>
      ))}
    </ul>
  )
}
