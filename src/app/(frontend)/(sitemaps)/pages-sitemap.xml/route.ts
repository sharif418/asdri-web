import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import type { FeatureKey } from '@/globals/SiteSettings'
import type { Locale } from '@/i18n/config'

import { locales } from '@/i18n/config'

/**
 * The site's sitemap (REQ-GEN-07): every institutional route in both locales — the static
 * pages, the Pages collection, and the dynamic course, teacher and notice pages. Routes whose
 * module is switched off in site-settings (REQ-GEN-06) are left out, exactly as they leave the
 * navigation.
 */
type Route = { path: string; feature?: FeatureKey }

const STATIC_ROUTES: Route[] = [
  { path: '/' },
  { path: '/about' },
  { path: '/about/leadership' },
  { path: '/about/campus' },
  { path: '/about/alumni' },
  { path: '/academics/courses' },
  { path: '/academics/faculty' },
  { path: '/academics/student-development' },
  { path: '/admissions', feature: 'admissions' },
  { path: '/admissions/scholarships', feature: 'admissions' },
  { path: '/notices', feature: 'notices' },
  { path: '/faq', feature: 'faq' },
  { path: '/downloads', feature: 'downloads' },
  { path: '/contact' },
  { path: '/contact/other-websites' },
  { path: '/search', feature: 'search' },
  { path: '/posts', feature: 'blog' },
]

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    const features = (settings.features ?? {}) as Partial<Record<FeatureKey, boolean | null>>
    const enabled = (feature?: FeatureKey) => !feature || (features[feature] ?? true) !== false

    const dateFallback = new Date().toISOString()
    const toLoc = (locale: Locale, path: string) =>
      `${SITE_URL}${locale === 'en' ? '/en' : ''}${path === '/' ? '' : path}`

    // Static routes, both locales, honouring the module flags.
    const staticEntries = STATIC_ROUTES.filter((route) => enabled(route.feature)).flatMap(
      (route) =>
        locales.map((locale) => ({
          loc: toLoc(locale, route.path),
          lastmod: dateFallback,
        })),
    )

    // Pages collection ([slug] route).
    const pages = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    })
    const pageEntries = pages.docs
      .filter((page) => Boolean(page?.slug))
      .flatMap((page) =>
        locales.map((locale) => ({
          loc:
            page.slug === 'home'
              ? toLoc(locale, '/')
              : toLoc(locale, `/${page.slug as string}`),
          lastmod: page.updatedAt || dateFallback,
        })),
      )

    // Dynamic institutional routes: courses, teacher profiles, notices.
    const [courses, people, notices] = await Promise.all([
      payload.find({
        collection: 'courses',
        draft: false,
        limit: 500,
        pagination: false,
        select: { slug: true, updatedAt: true },
        where: { listingStatus: { not_equals: 'draft' } },
      }),
      payload.find({
        collection: 'people',
        draft: false,
        limit: 500,
        pagination: false,
        select: { slug: true, updatedAt: true },
      }),
      enabled('notices')
        ? payload.find({
            collection: 'notices',
            draft: false,
            limit: 500,
            pagination: false,
            select: { slug: true, updatedAt: true },
          })
        : Promise.resolve({ docs: [] as { slug?: string | null; updatedAt?: string }[] }),
    ])

    const dynamicEntries: { loc: string; lastmod: string }[] = [
      ...courses.docs.flatMap((course) =>
        locales.map((locale) => ({
          loc: toLoc(locale, `/academics/courses/${course.slug as string}`),
          lastmod: course.updatedAt || dateFallback,
        })),
      ),
      ...people.docs.flatMap((person) =>
        locales.map((locale) => ({
          loc: toLoc(locale, `/academics/faculty/${person.slug as string}`),
          lastmod: person.updatedAt || dateFallback,
        })),
      ),
      ...notices.docs.flatMap((notice) =>
        locales.map((locale) => ({
          loc: toLoc(locale, `/notices/${notice.slug as string}`),
          lastmod: notice.updatedAt || dateFallback,
        })),
      ),
    ]

    return [...staticEntries, ...pageEntries, ...dynamicEntries]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
    revalidate: 3600,
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
