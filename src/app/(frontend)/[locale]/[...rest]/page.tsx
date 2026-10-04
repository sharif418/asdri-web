import { notFound } from 'next/navigation'

/**
 * The designed 404 for every unknown multi-segment URL (review item 5). One-segment unknowns
 * are already caught by /[locale]/[slug]; two or more segments (e.g. /research/library while
 * the research module is switched off, or any mistyped deep link) matched nothing under
 * [locale] before this route existed, so Next served its default "404: This page could not be
 * found" outside the site shell. This catch-all renders nothing itself: it calls notFound(),
 * which draws the designed not-found page with the site header and footer.
 */
export function generateStaticParams() {
  return []
}

export default function CatchAllNotFoundPage() {
  notFound()
}
