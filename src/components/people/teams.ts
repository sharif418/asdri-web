/**
 * Faculty directory grouping (REQ-ACA-10). Team order follows the client's document: the teacher
 * panel first, then the Arabic, Tajweed and Tarbiyah teachers, then the language, computer, maths
 * and science teams (which the document lists as teams; their lists are still to come). A faculty
 * member with no team falls into the final "other" group so admin edits never orphan a teacher.
 */
export const TEAM_ORDER = [
  'core',
  'arabic',
  'tajweed',
  'tarbiyah',
  'english',
  'bangla',
  'computer',
  'math',
  'science',
] as const

export type TeamKey = (typeof TEAM_ORDER)[number] | 'other'

export const OTHER_TEAM: TeamKey = 'other'
