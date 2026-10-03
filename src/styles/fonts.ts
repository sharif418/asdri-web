/**
 * Project typefaces (docs/08-design-plan.md, docs/05-design-direction.md §2).
 *
 * Two families by role: serif = content, sans = interface. Bangla is the primary script, so the
 * Latin faces are listed first in each CSS stack: Inter and Source Serif 4 contain no Bengali
 * glyphs, letting Bangla text fall through to the Noto Bengali faces while Latin fragments
 * ("PYS 1101") keep proper Latin metrics. Arabic resolves to Noto Naskh Arabic at the end of
 * every stack so Arabic course titles render correctly inside Bangla paragraphs.
 */
import {
  Inter,
  Noto_Naskh_Arabic,
  Noto_Sans_Bengali,
  Noto_Serif_Bengali,
  Source_Serif_4,
} from 'next/font/google'

export const bnSans = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-bn-sans',
  preload: true,
})

export const bnSerif = Noto_Serif_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-bn-serif',
  preload: true,
})

export const latinSans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-latin-sans',
})

export const latinSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-latin-serif',
})

export const arabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-arabic',
  preload: false,
})

/** All font CSS-variable classes, applied once on <html>. */
export const fontVariables = [
  bnSans.variable,
  bnSerif.variable,
  latinSans.variable,
  latinSerif.variable,
  arabic.variable,
].join(' ')
