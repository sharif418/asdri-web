import type { Field } from 'payload'

/**
 * কোর্স কারিকুলাম — one entry per table the document prints (semesters, the non-credit
 * supplementary table). Rows carry code, title, included modules, credits/hours and marks;
 * the public pages compute the totals from the rows. The totals printed in the document's
 * headings are kept in the sourceTotal* fields for the office (GAP-C2).
 */
export const curriculumField: Field = {
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
          admin: {
            width: '40%',
            description:
              'e.g. ১ম সেমিস্টার; leave empty when the document prints a single unlabelled table.',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          admin: { width: '40%' },
          label: 'Sub-label',
        },
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
            description:
              'Credits printed in the document heading (GAP-C2, office reference only; the site computes the total).',
          },
        },
        {
          name: 'sourceTotalMarks',
          type: 'number',
          admin: {
            width: '25%',
            description:
              'Marks printed in the document heading (GAP-C2, office reference only; the site computes the total).',
          },
        },
        {
          name: 'sourceTotalHours',
          type: 'number',
          admin: {
            width: '25%',
            description:
              'Hours printed in the document heading (GAP-C2, office reference only; the site computes the total).',
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
            {
              name: 'code',
              type: 'text',
              admin: { width: '20%', description: 'Always Latin digits (GAP-C3).' },
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              admin: { width: '55%' },
            },
          ],
        },
        {
          name: 'modules',
          type: 'array',
          labels: { singular: 'Module', plural: 'Included modules' },
          admin: { components: { RowLabel: '@/components/admin/RowLabel#RowLabel' } },
          fields: [{ name: 'value', type: 'text', localized: true, required: true }],
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
}
