export type Row = {
  code?: string
  title: string
  modules?: string[]
  credits?: number
  hours?: number
  marks?: number
}

export type SeedCourse = {
  slug: string
  bn: {
    title: string
    summary?: string
    intro?: string
    objectives?: string[]
    formatDuration?: string
    formatBullets?: string[]
    eligibility?: string[]
    specialisationsLead?: string
    semesters?: {
      title?: string
      subtitle?: string
      durationLabel?: string
      note?: string
      sourceTotalCredits?: number
      sourceTotalMarks?: number
      sourceTotalHours?: number
      rows: Row[]
    }[]
    sdpNote?: string
    topicsLabel?: string
    topics?: string[]
    outcomesIntro?: string
    outcomes?: { heading: string; body: string }[]
  }
  en: {
    title: string
    summary?: string
    intro?: string
    objectives?: string[]
    formatDuration?: string
    formatBullets?: string[]
    eligibility?: string[]
    specialisationsLead?: string
    semesters?: {
      title?: string
      subtitle?: string
      durationLabel?: string
      note?: string
      sourceTotalCredits?: number
      sourceTotalMarks?: number
      sourceTotalHours?: number
      rows: Row[]
    }[]
    sdpNote?: string
    topicsLabel?: string
    topics?: string[]
    outcomesIntro?: string
    outcomes?: { heading: string; body: string }[]
  }
  arabicTitle?: string
  shortTitle?: string
  type: 'long' | 'short'
  status: 'active' | 'draft'
  residential?: 'residential' | 'nonResidential' | 'both'
  gender?: 'male' | 'female' | 'all'
  specialisations?: { name: string; arabicName?: string }[]
  sdpRows?: {
    title: string
    objective: string
    activities: string
    hours: number
    outcome: string
  }[]
  featured?: boolean
  order: number
}
