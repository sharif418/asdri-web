import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { revalidateCourses, revalidateCoursesDelete } from './hooks/revalidateCourse'

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
          admin: { width: '20%', description: 'Arabic name, shown with lang="ar" under the title.' },
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
      admin: { description: 'কোর্স পরিচিতি — the course introduction, verbatim from the client document.' },
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
    {
      name: 'format',
      type: 'group',
      label: 'Course format',
      admin: {
        description:
          'কোর্সের ধরন — the summary facts shown in the page margin, plus any further notes from the document as ruled lines.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'durationLabel',
              type: 'text',
              localized: true,
              admin: { width: '34%', description: 'e.g. ৩ বছর, ৬ মাস, ১৫ দিন (Bengali digits in Bangla).' },
            },
            {
              name: 'residential',
              type: 'select',
              admin: { width: '33%' },
              defaultValue: 'both',
              options: [
                { label: 'Residential', value: 'residential' },
                { label: 'Non-residential', value: 'nonResidential' },
                { label: 'Both available', value: 'both' },
              ],
            },
            {
              name: 'gender',
              type: 'select',
              admin: { width: '33%', description: 'Leave empty when the document does not say.' },
              options: [
                { label: 'Male only', value: 'male' },
                { label: 'Female only', value: 'female' },
                { label: 'All students', value: 'all' },
              ],
            },
          ],
        },
        {
          name: 'bullets',
          type: 'array',
          label: 'Format notes',
          labels: { singular: 'Note', plural: 'Notes' },
          admin: {
            components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
            description: 'The remaining কোর্সের ধরন lines from the document, verbatim.',
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
      ],
    },
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
      admin: { description: 'PYS: the five specialisation (takhasus) departments with their Arabic names.' },
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
                { name: 'name', type: 'text', localized: true, required: true, admin: { width: '60%' } },
                { name: 'arabicName', type: 'text', admin: { width: '40%' } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'semesters',
      type: 'array',
      label: 'Curriculum',
      labels: { singular: 'Section', plural: 'Curriculum sections' },
      admin: {
        components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
        description:
          'কোর্স কারিকুলাম — one entry per table in the document (semesters, the non-credit supplementary table). Totals are computed from the rows.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              admin: { width: '40%', description: 'e.g. ১ম সেমিস্টার; leave empty when the document prints a single unlabelled table.' },
            },
            { name: 'subtitle', type: 'text', localized: true, admin: { width: '40%' }, label: 'Sub-label' },
            {
              name: 'durationLabel',
              type: 'text',
              localized: true,
              admin: { width: '20%', description: 'e.g. সময়কাল: ৬ মাস' },
            },
          ],
        },
        {
          name: 'note',
          type: 'textarea',
          localized: true,
          admin: { description: 'The explanatory paragraph printed with the table, verbatim.' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sourceTotalCredits',
              type: 'number',
              admin: {
                width: '25%',
                description: 'Credits printed in the document heading (GAP-C2, office reference only; the site computes the total).',
              },
            },
            {
              name: 'sourceTotalMarks',
              type: 'number',
              admin: {
                width: '25%',
                description: 'Marks printed in the document heading (GAP-C2, office reference only; the site computes the total).',
              },
            },
            {
              name: 'sourceTotalHours',
              type: 'number',
              admin: {
                width: '25%',
                description: 'Hours printed in the document heading (GAP-C2, office reference only; the site computes the total).',
              },
            },
          ],
        },
        {
          name: 'rows',
          type: 'array',
          label: 'Rows',
          labels: { singular: 'Course row', plural: 'Rows' },
          admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'code', type: 'text', admin: { width: '20%', description: 'Always Latin digits (GAP-C3).' } },
                { name: 'title', type: 'text', localized: true, required: true, admin: { width: '55%' } },
              ],
            },
            {
              name: 'modules',
              type: 'array',
              labels: { singular: 'Module', plural: 'Included modules' },
              admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
              fields: [
                { name: 'value', type: 'text', localized: true, required: true },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'credits', type: 'number', admin: { width: '34%' } },
                { name: 'hours', type: 'number', admin: { width: '33%' } },
                { name: 'marks', type: 'number', admin: { width: '33%' } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'sdp',
      type: 'group',
      label: 'Student development table',
      admin: {
        description:
          'শিক্ষার্থী উন্নয়ন কার্যক্রম (Student Development Programs) — the PYS non-credit activities table. Also shown on the Student Development page.',
      },
      fields: [
        {
          name: 'note',
          type: 'textarea',
          localized: true,
          admin: { description: 'The explanatory paragraph printed with the table, verbatim.' },
        },
        {
          name: 'rows',
          type: 'array',
          labels: { singular: 'Programme', plural: 'Programmes' },
          admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text', localized: true, required: true, admin: { width: '60%' } },
                { name: 'hours', type: 'number', admin: { width: '40%' } },
              ],
            },
            { name: 'objective', type: 'text', localized: true },
            { name: 'activities', type: 'text', localized: true },
            { name: 'outcome', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'topics',
      type: 'group',
      admin: { description: 'The trainings’ topic lists (Ramadan 25 topics, Arabic and Azan curricula).' },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: { width: '100%', description: 'Section heading as printed, e.g. প্রশিক্ষণের বিষয়সমূহ' },
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
      admin: { description: 'কোর্স সম্পন্নকারীদের পরবর্তী শিক্ষাক্রম ও কর্মপরিকল্পনা — the Diploma’s next-steps section.' },
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
      admin: { position: 'sidebar', description: 'Show in the six featured programmes on the home page.' },
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
