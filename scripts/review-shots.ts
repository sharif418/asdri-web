/**
 * Review screenshot runner (docs/prompts batch A): captures pages at phone (375) and desktop
 * (1280) widths in both locales into docs/review/<module>/, named by route, locale and width.
 *
 * Usage: bun scripts/review-shots.ts <module> <route...>
 *   e.g. bun scripts/review-shots.ts people /about/leadership /academics/faculty
 */
import { chromium } from '@playwright/test'
import { mkdirSync } from 'fs'
import { join } from 'path'

const [, , module, ...routes] = process.argv
if (!module || routes.length === 0) {
  console.error('usage: bun scripts/review-shots.ts <module> <route...>')
  process.exit(1)
}

const BASE = process.env.REVIEW_BASE_URL || 'http://localhost:3000'
const SIZES = [
  { label: '375', width: 375, height: 812 },
  { label: '1280', width: 1280, height: 900 },
]
const LOCALES = ['', '/en'] // bn is prefix-less; en under /en

const outDir = join(process.cwd(), 'docs', 'review', module)
mkdirSync(outDir, { recursive: true })

const routeSlug = (route: string) =>
  route === '/' ? 'home' : route.replace(/^\//, '').replace(/[/?&=]/g, '-').replace(/-+/g, '-')

const browser = await chromium.launch()
try {
  for (const route of routes) {
    for (const localePrefix of LOCALES) {
      const locale = localePrefix === '' ? 'bn' : 'en'
      for (const size of SIZES) {
        const url = `${BASE}${localePrefix}${route}`
        const page = await browser.newPage({
          viewport: { width: size.width, height: size.height },
          reducedMotion: 'reduce',
        })
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
        } catch {
          // networkidle can be flaky with HMR; the shot is still taken
        }
        await page.waitForTimeout(300)
        const name = `${routeSlug(route)}-${locale}-${size.label}.png`
        await page.screenshot({ path: join(outDir, name), fullPage: true })
        console.log(`saved ${name}`)
        await page.close()
      }
    }
  }
} finally {
  await browser.close()
}
