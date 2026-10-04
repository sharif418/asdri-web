import type { Field } from 'payload'

/**
 * শিক্ষার্থী উন্নয়ন কার্যক্রম (Student Development Programs) — the PYS non-credit activities
 * table. Also shown on the Student Development page (module E reuses SdpTable for it).
 */
export const sdpField: Field = {
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
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              admin: { width: '60%' },
            },
            { name: 'hours', type: 'number', admin: { width: '40%' } },
          ],
        },
        { name: 'objective', type: 'text', localized: true },
        { name: 'activities', type: 'text', localized: true },
        { name: 'outcome', type: 'text', localized: true },
      ],
    },
  ],
}
