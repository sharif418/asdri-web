/**
 * A person's monogram (GAP-C5: no photos yet): the first grapheme of the person's own name,
 * skipping honorifics (শায়খ, উস্তায, Dr., Mawlana…). Bangla conjuncts and matras are kept
 * whole via Intl.Segmenter graphemes; the fallback takes a single code point.
 */

const HONORIFICS = new Set([
  // Bangla
  'শায়খ',
  'শাইখ',
  'ড.',
  'ড',
  'মাওলানা',
  'মাও.',
  'উস্তায',
  'উস্তাজ',
  'উস্তায়',
  'হাফেজ',
  'হাফিজ',
  'মুফতি',
  // English
  'shaykh',
  'shaikh',
  'dr.',
  'dr',
  'mawlana',
  'maulana',
  'ustadh',
  'ustad',
  'hafiz',
  'hafez',
  'mufti',
])

function firstGrapheme(word: string): string {
  try {
    const segmenter = new Intl.Segmenter('bn', { granularity: 'grapheme' })
    for (const { segment } of segmenter.segment(word)) return segment
  } catch {
    // Segmenter unavailable: fall back to one code point
  }
  return Array.from(word)[0] ?? ''
}

/** "শায়খ আহমাদুল্লাহ" → "আ", "Dr. Mostafa Manjur" → "M". */
export function nameMonogram(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const own = words.find((word) => !HONORIFICS.has(word.toLowerCase().replace('।', '')))
  const target = own ?? words[0]
  if (!target) return ''
  return firstGrapheme(target).toUpperCase()
}
