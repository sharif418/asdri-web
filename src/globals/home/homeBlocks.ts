import type { Block, Field } from 'payload'

/**
 * Home section blocks (docs/02: "Each home section is a block in the home global so admin can
 * reorder, hide, or edit copy"). Every block is individually switchable; the array order is
 * the section order, and the seed installs exactly one of each. The blocks whose modules do not exist yet
 * (refutations, media hub, fatwa — REQ-HOME-05, 08, 11) are seeded switched off; their
 * renderers draw nothing, and no content is faked for them.
 */

const enabledField = (defaultValue: boolean): Field => ({
  name: 'enabled',
  type: 'checkbox',
  defaultValue,
  admin: { position: 'sidebar' },
})

const headingField = (description: string): Field => ({
  name: 'heading',
  type: 'text',
  localized: true,
  required: true,
  admin: { description },
})

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    enabledField(true),
    headingField(
      'The large serif headline. Only the hero headline may be centred; nothing else competes with it.',
    ),
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      admin: { description: 'One-line statement of purpose beneath the headline (reading text).' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'Optional intro video (YouTube URL). Shown as a poster that plays on click (GAP-C6).',
      },
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Poster frame for the video. While there is no video, the hero stays typographic.',
      },
    },
  ],
}

export const ImpactBlock: Block = {
  slug: 'impactStats',
  labels: { singular: 'Impact figures', plural: 'Impact figures' },
  fields: [enabledField(true), headingField('Section heading. The figures come from Site ▸ Impact stats.')],
}

export const VisionBlock: Block = {
  slug: 'vision',
  labels: { singular: 'Vision & pillars', plural: 'Vision & pillars' },
  fields: [
    enabledField(true),
    headingField('e.g. মূল লক্ষ্য (Vision)'),
    {
      name: 'statement',
      type: 'textarea',
      localized: true,
      required: true,
      admin: { description: 'The vision statement, verbatim from the client document.' },
    },
    {
      name: 'pillars',
      type: 'array',
      labels: { singular: 'Pillar', plural: 'Core pillars' },
      admin: {
        components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
        description:
          'Three pillars under the statement. Empty in Bangla until the office provides translations.',
      },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'body', type: 'textarea', localized: true, required: true },
      ],
    },
  ],
}

export const ProgrammesBlock: Block = {
  slug: 'programmes',
  labels: { singular: 'Featured programmes', plural: 'Featured programmes' },
  fields: [
    enabledField(true),
    headingField(
      'The six featured programmes (cards) — the one place cards belong. Which courses appear is set per course (featured flag).',
    ),
  ],
}

export const NoticesBlock: Block = {
  slug: 'notices',
  labels: { singular: 'Latest notices', plural: 'Latest notices' },
  fields: [
    enabledField(true),
    headingField('Latest notices with plain category tabs.'),
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
      min: 1,
      max: 6,
      admin: { position: 'sidebar', description: 'How many notices per tab.' },
    },
  ],
}

export const CampusBlock: Block = {
  slug: 'campusLife',
  labels: { singular: 'Campus life', plural: 'Campus life' },
  fields: [
    enabledField(true),
    headingField('Campus life as a ruled two-column list.'),
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'The line above the list, verbatim from the client document. Shown on the home section and the Campus page (single source).',
      },
    },
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Item', plural: 'Items' },
      admin: {
        components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
        description:
          'The document marks photo slots; upload them per item when photos arrive (GAP-C6).',
      },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'body', type: 'textarea', localized: true, required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export const PeopleBlock: Block = {
  slug: 'people',
  labels: { singular: 'Featured people', plural: 'Featured people' },
  fields: [
    enabledField(true),
    headingField(
      'Featured leadership and faculty. Which people appear is set per person (featured on home flag).',
    ),
  ],
}

export const SupportBlock: Block = {
  slug: 'support',
  labels: { singular: 'Support band', plural: 'Support band' },
  fields: [
    enabledField(true),
    headingField('A single calm band leading to the donation page.'),
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'One or two lines of context (the Zakat Fund scholarship line works well).',
      },
    },
    { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'দান করুন' },
  ],
}

export const RefutationsBlock: Block = {
  slug: 'refutations',
  labels: { singular: 'Refutations (module pending)', plural: 'Refutations (module pending)' },
  fields: [
    enabledField(false),
    headingField(
      'Intellectual refutations highlight. Renders nothing until the clarifications module exists (REQ-HOME-05).',
    ),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'Draft copy for when the module is ready.' },
    },
  ],
}

export const MediaHubBlock: Block = {
  slug: 'mediaHub',
  labels: { singular: 'Media hub (module pending)', plural: 'Media hub (module pending)' },
  fields: [
    enabledField(false),
    headingField(
      'Latest articles, videos, gallery. Renders nothing until the media modules exist (REQ-HOME-08).',
    ),
  ],
}

export const FatwaBlock: Block = {
  slug: 'fatwa',
  labels: { singular: 'Fatwa gateway (module pending)', plural: 'Fatwa gateway (module pending)' },
  fields: [
    enabledField(false),
    headingField(
      'Quick ask box and fatwa bank entry. Renders nothing until the fatwa module exists (REQ-HOME-11).',
    ),
  ],
}

/** One row of each block type, always — the array order is the section order. */
export const homeBlocks = [
  HeroBlock,
  ImpactBlock,
  VisionBlock,
  ProgrammesBlock,
  RefutationsBlock,
  NoticesBlock,
  CampusBlock,
  MediaHubBlock,
  PeopleBlock,
  SupportBlock,
  FatwaBlock,
]
