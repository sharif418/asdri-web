import type { Metadata } from 'next'
import NextImage from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

import { MarginFact, MarginFacts, MatnHashiya } from '@/components/layout/MatnHashiya'
import type { Media } from '@/payload-types'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/**
 * Contact & Location (REQ-CON-01, 03): everything drawn from the settings global — the two
 * addresses with map links, the phone with its hours, the admission note and the Facebook QR,
 * verbatim from the client's document. The margin carries how to reach the office; the reading
 * column carries where it is and how admission news is announced. No contact form in this
 * batch (forms arrive with admissions); the page is complete without one.
 */

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const [settings, dict] = await Promise.all([
    getCachedGlobal('site-settings', 1, locale)(),
    getDictionary(locale),
  ])

  const qr =
    settings.admissionQr && typeof settings.admissionQr === 'object'
      ? (settings.admissionQr as Media)
      : null

  return (
    <main className="container pt-12 pb-24 md:pt-20">
      <MatnHashiya
        margin={
          <MarginFacts>
            {(settings.phones ?? []).map((phone, i) => (
              <MarginFact key={phone.id ?? i} label={dict.common.phone}>
                <a
                  href={`tel:${phone.number.replace(/[^+\d]/g, '')}`}
                  dir="ltr"
                  className="underline-offset-4 hover:text-primary hover:underline"
                >
                  {phone.number}
                </a>
                {phone.note && <span className="text-ink-muted"> ({phone.note})</span>}
              </MarginFact>
            ))}
            {settings.email && (
              <MarginFact label={dict.common.email}>
                <a
                  href={`mailto:${settings.email}`}
                  className="underline-offset-4 hover:text-primary hover:underline"
                >
                  {settings.email}
                </a>
              </MarginFact>
            )}
            {(settings.social ?? []).length > 0 && (
              <MarginFact label={dict.contact.socialLabel}>
                <ul className="mt-1 space-y-1">
                  {(settings.social ?? []).map((social, i) => (
                    <li key={social.id ?? i}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:text-primary hover:underline"
                      >
                        {social.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </MarginFact>
            )}
          </MarginFacts>
        }
      >
        <article>
          <h1 className="text-h1">{dict.contact.title}</h1>
          <span className="illumination mt-6" aria-hidden />

          {(settings.addresses ?? []).length > 0 && (
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {(settings.addresses ?? []).map((address, i) => (
                <li key={address.id ?? i} className="py-5">
                  <h2 className="text-caption text-ink-muted">{address.label}</h2>
                  <p className="mt-1 max-w-[60ch] text-body">{address.text}</p>
                  {address.mapUrl && (
                    <a
                      href={address.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block text-small text-primary underline-offset-4 hover:underline"
                    >
                      {dict.contact.mapLabel}
                      <span className="sr-only"> {dict.contact.opensInNewTab}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}

          {settings.admissionNote && (
            <section className="mt-14">
              <h2 className="text-h3">{dict.contact.admissionHeading}</h2>
              <div className="mt-6 flex flex-wrap items-center gap-8 md:gap-12">
                <p className="reading min-w-0 flex-1">{settings.admissionNote}</p>
                {qr?.url && (
                  <figure className="w-40 shrink-0">
                    <span className="block overflow-hidden rounded-sm border border-border bg-card">
                      <NextImage
                        src={getMediaUrl(qr.url, qr.updatedAt)}
                        alt={qr.alt || dict.footer.scanForAdmissions}
                        width={320}
                        height={320}
                        className="h-auto w-full"
                      />
                    </span>
                    <figcaption className="mt-2 text-center text-caption text-ink-muted">
                      {dict.contact.scanLabel}
                    </figcaption>
                  </figure>
                )}
              </div>
            </section>
          )}
        </article>
      </MatnHashiya>
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const dict = await getDictionary(rawLocale)
  return { title: dict.contact.title }
}
