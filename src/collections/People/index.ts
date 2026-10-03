import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { revalidatePeople, revalidatePeopleDelete } from './hooks/revalidatePerson'

/**
 * The people behind the institute (REQ-ABT-02, REQ-ACA-10): leadership, the teacher panel with
 * subjects, and the Arabic, Tajweed, Tarbiyah, language, computer, maths and science teams, as
 * the client's document lists them. One collection; `roles` decides who appears on the leadership
 * page, `teams` groups the faculty directory. Photos and biographies are optional (GAP-C5) —
 * every view is designed to look complete without them.
 */
export const People: CollectionConfig<'people'> = {
  slug: 'people',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'roles', 'teams', 'featuredOnHome'],
    group: 'Site content',
    useAsTitle: 'name',
    description:
      'Leadership, teachers and teams. A person appears on the leadership page when "leadership" is ticked, and in the faculty directory when "faculty" is ticked. Photos and biographies are optional; the public pages fall back to a monogram.',
  },
  defaultPopulate: {
    name: true,
    slug: true,
    designation: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description:
          'Bangla name verbatim from the client document; English transliteration (editable, GAP-C5).',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. A quiet head-and-shoulders photo; a monogram is shown while empty.' },
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['faculty'],
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Faculty / teacher', value: 'faculty' },
        { label: 'Staff', value: 'staff' },
        { label: 'Author', value: 'author' },
      ],
    },
    {
      name: 'designation',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. চেয়ারম্যান, উস্তাজ, আরবি শিক্ষক' },
    },
    {
      name: 'teams',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Teacher panel', value: 'core' },
        { label: 'Arabic team', value: 'arabic' },
        { label: 'Tajweed team', value: 'tajweed' },
        { label: 'Tarbiyah', value: 'tarbiyah' },
        { label: 'English', value: 'english' },
        { label: 'Bangla', value: 'bangla' },
        { label: 'Computer', value: 'computer' },
        { label: 'Mathematics', value: 'math' },
        { label: 'Basic science', value: 'science' },
      ],
      admin: {
        description:
          'A teacher can belong to more than one team (the source document lists one teacher under both Tajweed and English).',
      },
    },
    {
      name: 'subjects',
      type: 'array',
      labels: { singular: 'Subject', plural: 'Subjects' },
      admin: {
        components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
        description: 'Subjects this person teaches, as listed in the client document.',
      },
      fields: [
        {
          name: 'subject',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      admin: { description: 'Optional. The profile page stays complete while empty.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: { width: '50%', description: 'Private. Never shown publicly.' },
          access: { read: ({ req }) => Boolean(req.user) },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%', description: 'Private. Never shown publicly.' },
          access: { read: ({ req }) => Boolean(req.user) },
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      labels: { singular: 'Link', plural: 'Social links' },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: ['facebook', 'youtube', 'x', 'linkedin', 'website'],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in the featured people section on the home page.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Sort order within lists (smaller first).' },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePeople],
    afterDelete: [revalidatePeopleDelete],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
