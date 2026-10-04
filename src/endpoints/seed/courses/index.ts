import type { Payload, PayloadRequest } from 'payload'

import { mergeIds } from '../index'
import type { SeedCourse } from './types'
import { preparatoryYearCourse } from './pys'
import { certificateCourse } from './ccis'
import { diplomaCourse } from './diploma'
import { arabicTeacherTraining } from './arabic-teacher-training'
import { ramadanDawahTraining } from './ramadan-dawah-training'
import { azanTrainingProgram } from './azan-training'
import { researchMethodologyCourse } from './research-methodology'

/**
 * The seven programmes (REQ-ACA-01..09), seeded verbatim from
 * docs/source/02-website-content-and-features-bn.extracted.txt. Bangla text is copied exactly,
 * including the document's punctuation ("বিষয় : বিবেচনা"). English is a plain, factual draft
 * the office can edit (marked EN draft in the PR); English one-liners for the summaries come
 * from the client's English home document where they exist.
 *
 * GAP-C3: codes follow one scheme. The document printed "CCAIS 101" for the certificate course
 * and "PGD-DIS 101" for the first diploma course; the seed normalises these to CCIS 101… and
 * PGD-DIS 1101…, keeping every other code as printed.
 *
 * GAP-C2: the document's heading totals are stored in sourceTotal* fields for the office. Where
 * they disagree with the rows (PYS sem 2: printed 19 credits, rows sum 17; PYS semester marks:
 * printed 600, rows sum 500; Diploma Y1S1: printed 25 credits, rows sum 24; Y2S1: printed 700
 * marks, rows sum 600), the site shows the computed values.
 *
 * GAP-C4: Islamic Research Methodology has no content in the document; it is seeded with status
 * "draft" and no invented matter.
 */

export const coursesSeed: SeedCourse[] = [
  preparatoryYearCourse,
  certificateCourse,
  diplomaCourse,
  arabicTeacherTraining,
  ramadanDawahTraining,
  azanTrainingProgram,
  researchMethodologyCourse,
]

/**
 * Upserts every course by slug, Bangla pass first (creating shared array row ids), then the
 * English pass reusing those ids by position. Idempotent.
 */
export async function seedCourses(payload: Payload, req: PayloadRequest) {
  for (const course of coursesSeed) {
    const existing = await payload.find({
      collection: 'courses',
      req,
      limit: 1,
      pagination: false,
      draft: true,
      depth: 0,
      where: { slug: { equals: course.slug } },
    })

    const bnData = toData(course, 'bn')
    const saved = existing.docs[0]
      ? await payload.update({
          collection: 'courses',
          id: existing.docs[0].id,
          data: { ...bnData, _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'courses',
          data: { ...bnData, _status: 'published' } as never,
          locale: 'bn',
          req,
          context: { disableRevalidate: true },
        })

    await payload.update({
      collection: 'courses',
      id: saved.id,
      data: {
        ...(mergeIds(toData(course, 'en'), saved) as Record<string, unknown>),
        _status: 'published',
      } as never,
      locale: 'en',
      req,
      context: { disableRevalidate: true },
    })
  }
  payload.logger.info(`Seeded ${coursesSeed.length} courses.`)
}

function toData(course: SeedCourse, locale: 'bn' | 'en') {
  const side = course[locale]
  return {
    title: side.title,
    slug: course.slug,
    shortTitle: course.shortTitle ?? '',
    arabicTitle: course.arabicTitle ?? '',
    type: course.type,
    listingStatus: course.status,
    order: course.order,
    featured: course.featured ?? false,
    summary: side.summary ?? '',
    intro: side.intro ?? '',
    objectives: (side.objectives ?? []).map((value) => ({ value })),
    format: {
      durationLabel: side.formatDuration ?? '',
      residential: course.residential ?? 'both',
      gender: course.gender ?? null,
      bullets: (side.formatBullets ?? []).map((value) => ({ value })),
    },
    eligibility: (side.eligibility ?? []).map((value) => ({ value })),
    specialisations: {
      lead: side.specialisationsLead ?? '',
      items: (course.specialisations ?? []).map((s) => ({
        name: s.name,
        arabicName: s.arabicName ?? '',
      })),
    },
    semesters: (side.semesters ?? []).map((sem) => ({
      title: sem.title ?? '',
      subtitle: sem.subtitle ?? '',
      durationLabel: sem.durationLabel ?? '',
      note: sem.note ?? '',
      sourceTotalCredits: sem.sourceTotalCredits ?? null,
      sourceTotalMarks: sem.sourceTotalMarks ?? null,
      sourceTotalHours: sem.sourceTotalHours ?? null,
      rows: sem.rows.map((row) => ({
        code: row.code ?? '',
        title: row.title,
        modules: (row.modules ?? []).map((value) => ({ value })),
        credits: row.credits ?? null,
        hours: row.hours ?? null,
        marks: row.marks ?? null,
      })),
    })),
    sdp: {
      note: side.sdpNote ?? '',
      rows: (course.sdpRows ?? []).map((r) => ({
        title: r.title,
        objective: r.objective,
        activities: r.activities,
        hours: r.hours,
        outcome: r.outcome,
      })),
    },
    topics: {
      label: side.topicsLabel ?? '',
      items: (side.topics ?? []).map((value) => ({ value })),
    },
    outcomes: {
      intro: side.outcomesIntro ?? '',
      items: (side.outcomes ?? []).map((o) => ({ heading: o.heading, body: o.body })),
    },
  }
}
