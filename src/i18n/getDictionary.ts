import type { Locale } from './config'
import type { Dictionary } from './dictionaries/bn'

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  bn: () => import('./dictionaries/bn').then((m) => m.default),
  en: () => import('./dictionaries/en').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]()
}

export type { Dictionary }
