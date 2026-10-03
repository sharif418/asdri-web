/**
 * Number and digit helpers for the Bangla-first UI (docs/05-design-direction.md §2).
 *
 * Rule: human-facing quantities (counters, dates, credits, amounts) use Bengali digits in the
 * `bn` locale; identifiers (course codes like "PYS 1101", phone numbers, student IDs) always
 * stay in Latin digits. Callers decide which helper to use; nothing converts automatically.
 */

export type Locale = 'bn' | 'en'

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'] as const

/** Replace ASCII digits in a string with Bengali digits. Leaves everything else untouched. */
export function toBengaliDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BENGALI_DIGITS[Number(d)] as string)
}

/** Replace Bengali digits with ASCII digits (for parsing user input). */
export function toLatinDigits(input: string): string {
  return input.replace(/[০-৯]/g, (d) =>
    String(BENGALI_DIGITS.indexOf(d as (typeof BENGALI_DIGITS)[number])),
  )
}

/**
 * Locale-aware number formatting. `bn` uses the Bangladeshi grouping (১,২৩,৪৫৬) and Bengali
 * digits; `en` uses Western grouping and Latin digits.
 */
export function formatNumber(
  value: number,
  locale: Locale = 'bn',
  options?: Intl.NumberFormatOptions,
): string {
  const tag = locale === 'bn' ? 'bn-BD-u-nu-beng' : 'en-US'
  return new Intl.NumberFormat(tag, options).format(value)
}

/** Currency in Bangladeshi Taka. bn: ৳১,২৩,৪৫৬ · en: ৳123,456 */
export function formatBDT(value: number, locale: Locale = 'bn'): string {
  return `৳${formatNumber(value, locale, { maximumFractionDigits: 0 })}`
}

/** A "420+" style counter: formatted number plus optional suffix. */
export function formatCounter(value: number, locale: Locale = 'bn', suffix = '+'): string {
  return `${formatNumber(value, locale, { maximumFractionDigits: 0 })}${suffix}`
}

/** Date in the long form used across the site. bn: ৩ অক্টোবর ২০২৬ · en: 3 October 2026 */
export function formatDate(date: Date | string, locale: Locale = 'bn'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const tag = locale === 'bn' ? 'bn-BD-u-nu-beng' : 'en-GB'
  // Composed from parts: Intl's bn pattern inserts a comma before the year ("৩ অক্টোবর, ২০২৬"),
  // which is not the convention used in Bangla publishing.
  const parts = new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric' })
    .formatToParts(d)
    .reduce<Record<string, string>>((acc, part) => ({ ...acc, [part.type]: part.value }), {})
  return `${parts.day} ${parts.month} ${parts.year}`
}
