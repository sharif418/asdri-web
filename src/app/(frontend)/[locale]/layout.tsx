import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { SiteFooter } from '@/components/site/Footer'
import { SiteHeader } from '@/components/site/Header'
import { htmlLang, isLocale, locales } from '@/i18n/config'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { fontVariables } from '@/styles/fonts'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

/**
 * The public site renders on request. Every page reads Payload (globals, courses, notices…),
 * and the production image is built in a container that has no database, so build-time
 * prerendering is off; content edited in the admin is live on the next request. Per-route
 * caching (ISR) can be reintroduced later for high-traffic pages with a reachable build DB.
 */
export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(fontVariables)} lang={htmlLang[locale]} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <SiteHeader locale={locale} />
          <div id="main-content" className="flex flex-1 flex-col">
            {children}
          </div>
          <SiteFooter locale={locale} />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const settings = await getCachedGlobal('site-settings', 0, locale)()

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: settings.name,
      template: `%s | ${settings.shortName ?? settings.name}`,
    },
    description: settings.defaultDescription ?? settings.tagline ?? undefined,
    openGraph: mergeOpenGraph({
      siteName: settings.name,
      description: settings.defaultDescription ?? settings.tagline ?? undefined,
    }),
    twitter: { card: 'summary_large_image' },
    alternates: {
      languages: { bn: '/', en: '/en' },
    },
  }
}
