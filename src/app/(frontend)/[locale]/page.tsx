import type { Metadata } from 'next'

import { HomeSections } from '@/components/home/HomeSections'
import { getDictionary } from '@/i18n/getDictionary'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Props = { params: Promise<{ locale: string }> }

/**
 * The home page (REQ-HOME-01..12): the ordered, individually switchable sections of the `home`
 * global — hero, impact figures, vision, featured programmes, latest notices, campus life,
 * featured people, the support band — rendered in the admin's order. Pending-module sections
 * (refutations, media hub, fatwa) render nothing while off.
 */
export const revalidate = 600

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = rawLocale === 'en' ? 'en' : 'bn'

  const [home, dict] = await Promise.all([
    getCachedGlobal('home', 2, locale)(),
    getDictionary(locale),
  ])

  return (
    <main>
      <HomeSections home={home} locale={locale} dict={dict} />
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = rawLocale === 'en' ? 'en' : 'bn'
  const settings = await getCachedGlobal('site-settings', 0, locale)()
  return {
    title: settings.name,
    description: settings.defaultDescription ?? settings.tagline ?? undefined,
  }
}
