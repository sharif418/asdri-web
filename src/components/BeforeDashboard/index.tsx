import { Banner } from '@payloadcms/ui/elements/Banner'
import Link from 'next/link'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট — admin</h4>
      </Banner>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {
            ' loads the institute’s starter content: site settings, navigation and impact figures in Bangla and English (from the client documents). It only writes these three globals; pages and posts are never touched.'
          }
        </li>
        <li>
          {'Then edit '}
          <Link href="/admin/globals/site-settings">Site settings</Link>
          {', '}
          <Link href="/admin/globals/navigation">Navigation</Link>
          {' and '}
          <Link href="/admin/globals/impact-stats">Impact stats</Link>
          {', and '}
          <a href="/" target="_blank">
            view the site
          </a>
          .
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
