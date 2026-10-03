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
