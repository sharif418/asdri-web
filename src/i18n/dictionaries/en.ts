import type { Dictionary } from './bn'

const en: Dictionary = {
  skipToContent: 'Skip to content',
  header: {
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    login: 'Log in',
    register: 'Create account',
    donate: 'Donate',
    language: 'Language',
    contact: 'Contact',
    home: 'Home',
  },
  footer: {
    parentLine: 'An educational institution of As-Sunnah Foundation',
    contactHeading: 'Contact',
    officeHours: 'Office hours',
    scanForAdmissions: 'Scan for admission updates',
    copyright: (year: string, name: string) => `© ${year} ${name}. All rights reserved.`,
    theme: 'Theme',
  },
  home: {
    exploreCourses: 'Explore courses',
    prospectus: 'Prospectus (PDF)',
    comingSoon: 'This page is being prepared',
    comingSoonBody:
      'This part of the institute website will be published soon. Course and contact details are available below.',
  },
  people: {
    leadershipTitle: 'Leadership & Administration',
    facultyTitle: 'Faculty & Teachers',
    teamLabels: {
      core: "Teacher's panel",
      arabic: 'Arabic team',
      tajweed: 'Tajweed team',
      tarbiyah: 'Tarbiyah',
      english: 'English',
      bangla: 'Bangla',
      computer: 'Computer',
      math: 'Mathematics',
      science: 'Basic science',
      other: 'Other',
    },
    teamEmptyTitle: 'No teachers from this team have been published yet',
    teamEmptyBody: 'The list will be added soon.',
    directoryEmptyTitle: 'No teachers have been published yet',
    directoryEmptyBody:
      'When the list is published, teachers will appear here by team with their names, designations and subjects.',
    leadershipEmptyTitle: 'The leadership list has not been published yet',
    leadershipEmptyBody: 'The Chairman, In-Charge and coordinators will be listed here soon.',
    addTeacher: 'Add a teacher',
    subjectsTaught: 'Subjects taught',
    bioPending: 'The biography will be added soon.',
    designationLabel: 'Designation',
    teamLabel: 'Team',
    roleLabel: 'Role',
    roleLabels: {
      leadership: 'Leadership',
      faculty: 'Faculty',
      staff: 'Staff',
      author: 'Author',
    },
  },
  common: {
    readMore: 'Read more',
    back: 'Go back',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    notFoundTitle: 'Page not found',
    notFoundBody: 'The address may be wrong, or the page has moved.',
    goHome: 'Go to the home page',
  },
}

export default en
