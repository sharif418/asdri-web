import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { revalidateCourses, revalidateCoursesDelete } from './hooks/revalidateCourse'
import { curriculumField } from './fields/curriculum'
import { formatField } from './fields/format'
import { sdpField } from './fields/sdp'

/**
 * The institute's programmes (REQ-ACA-01..09) — the hero product of the site. Seven courses from
 * the client's document: three long programmes (PYS, CCIS, Diploma) and four short trainings.
 * The curriculum model carries every table the document prints: semester → rows with code,
 * title, modules, credits/hours, marks; the non-credit supplementary table; the student
 * development table; specialisations with Arabic names; topic lists for the trainings.
 *
 * GAP-C2: semester totals are computed from the rows on the public pages. The totals printed in
 * the client's headings are kept in sourceTotalCredits/sourceTotalMarks for the office to
 * reconcile (they disagree for PYS semester 2 and Diploma year 1 semester 1).
 * GAP-C3: codes follow one scheme (PREFIX + year/semester + number). The document printed
 * "CCAIS" for the certificate course and "PGD-DIS 101" for the first diploma course; the seed
 * normalises to CCIS 101… and PGD-DIS 1101… (see admin descriptions).
 * GAP-C4: Islamic Research Methodology has no content; it is published with status "draft" and
 * shows a clearly marked placeholder instead of invented content.
 */
export const Courses: CollectionConfig<'courses'> = {
  slug: 'courses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'type', 'featured', 'order'],
    group: 'Site content',
    useAsTitle: 'title',
    description:
      'Programmes and trainings. Codes follow one scheme (e.g. PYS 1101, CCIS 101, PGD-DIS 1101: prefix, then year+semester, then number — GAP-C3). Semester totals shown on the site are computed from the rows; the totals printed in the client document are kept in the source total fields for reconciliation (GAP-C2).',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    shortTitle: true,
    type: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true, admin: { width: '60%' } },
        {
          name: 'shortTitle',
          type: 'text',
          admin: { width: '20%', description: 'Short code, e.g. PYS. Always Latin digits.' },
        },
        {
          name: 'arabicTitle',
          type: 'text',
          admin: {
            width: '20%',
            description: 'Arabic name, shown with lang="ar" under the title.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          admin: { width: '33%' },
          options: [
            { label: 'Long programme', value: 'long' },
            { label: 'Short training', value: 'short' },
          ],
        },
        {
          name: 'listingStatus',
          type: 'select',
          required: true,
          defaultValue: 'active',
          admin: {
            width: '33%',
            description:
              'active = full course page. draft = announced but without content yet (shows a marked placeholder — GAP-C4). Named listingStatus: "status" collides with the draft system\u2019s _status on the versions table.',
          },
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Draft / pending content', value: 'draft' },
          ],
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: { width: '34%', description: 'Sort order within the index (smaller first).' },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'One sentence for index rows and the home programme cards. Bangla is an excerpt from the client document; keep it verbatim.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'কোর্স পরিচিতি — the course introduction, verbatim from the client document.',
      },
    },
    {
      name: 'objectives',
      type: 'array',
      labels: { singular: 'Objective', plural: 'Objectives' },
      admin: {
        components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
        description: 'লক্ষ্য-উদ্দেশ্য। Rendered as a ruled list.',
      },
      fields: [
        {
          name: 'value',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
    formatField,
    {
      name: 'eligibility',
      type: 'array',
      labels: { singular: 'Eligibility', plural: 'Eligibility' },
      admin: {
        components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
        description: 'ভর্তির যোগ্যতা / আবেদন যোগ্যতা। Rendered as a ruled list.',
      },
      fields: [
        {
          name: 'value',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'specialisations',
      type: 'group',
      admin: {
        description: 'PYS: the five specialisation (takhasus) departments with their Arabic names.',
      },
      fields: [
        {
          name: 'lead',
          type: 'text',
          localized: true,
          admin: { description: 'Lead-in line as printed, e.g. পাঁচটি তাখাচ্ছুছ বিভাগ যথাক্রমে:' },
        },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Specialisation', plural: 'Specialisations' },
          admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: { width: '60%' },
                },
                { name: 'arabicName', type: 'text', admin: { width: '40%' } },
              ],
            },
          ],
        },
      ],
    },
    curriculumField,
    sdpField,
    {
      name: 'topics',
      type: 'group',
      admin: {
        description: 'The trainings’ topic lists (Ramadan 25 topics, Arabic and Azan curricula).',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: {
            width: '100%',
            description: 'Section heading as printed, e.g. প্রশিক্ষণের বিষয়সমূহ',
          },
        },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Topic', plural: 'Topics' },
          admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
          fields: [
            {
              name: 'value',
              type: 'textarea',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'outcomes',
      type: 'group',
      label: 'What comes after',
      admin: {
        description:
          'কোর্স সম্পন্নকারীদের পরবর্তী শিক্ষাক্রম ও কর্মপরিকল্পনা — the Diploma’s next-steps section.',
      },
      fields: [
        { name: 'intro', type: 'textarea', localized: true },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Path', plural: 'Paths' },
          admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
          fields: [
            { name: 'heading', type: 'text', localized: true, required: true },
            { name: 'body', type: 'textarea', localized: true, required: true },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in the six featured programmes on the home page.',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateCourses],
    afterDelete: [revalidateCoursesDelete],
  },
  versions: {
    drafts: true,
    maxPerDoc: 30,
  },
}
