import type { GlobalConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { homeBlocks } from './home/homeBlocks'

/**
 * The editable home (REQ-HOME-01..12, docs/03 "home" global): an ordered array of section
 * blocks — hero, impact figures, vision, programmes, notices, campus life, people, support —
 * each individually switchable with its own localised copy. The pending-module sections
 * (refutations, media hub, fatwa) are seeded present-but-off and render nothing.
 */
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home page',
  access: { read: () => true },
  admin: {
    group: 'Site',
    description:
      'The home page, section by section. Drag the rows to reorder the page; untick a section to hide it. Which programmes and people appear is chosen on the course / person themselves.',
  },
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidateTag('global_home', 'max')
          revalidatePath('/', 'page')
          revalidatePath('/en', 'page')
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'sections',
      type: 'blocks',
      blocks: homeBlocks,
      admin: { description: 'One block per section, in display order.' },
    },
  ],
}
