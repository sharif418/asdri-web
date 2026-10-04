import type { Field } from 'payload'

/**
 * কোর্সের ধরন — the summary facts shown in the detail page's margin (duration, residential
 * option, who may apply), plus the remaining format lines from the document as ruled notes.
 */
export const formatField: Field = {
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
          admin: {
            width: '34%',
            description: 'e.g. ৩ বছর, ৬ মাস, ১৫ দিন (Bengali digits in Bangla).',
          },
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
}
