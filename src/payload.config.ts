import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Courses } from './collections/Courses'
import { Media } from './collections/Media'
import { Notices } from './collections/Notices'
import { Pages } from './collections/Pages'
import { People } from './collections/People'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { ImpactStats } from './globals/ImpactStats'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // Schema sync: dev pushes automatically; production runs `bun run migrate` (infra/README.md).
    // PAYLOAD_DB_PUSH=true forces push (used by CI, which builds against an empty database).
    push: process.env.PAYLOAD_DB_PUSH
      ? process.env.PAYLOAD_DB_PUSH === 'true'
      : process.env.NODE_ENV !== 'production',
    // Pending migrations in src/migrations run automatically when the production app starts,
    // so a Coolify deploy needs no separate migrate step. CI runs `bun run migrate` explicitly.
    prodMigrations: migrations,
  }),
  // Bangla-first site with English as the second locale (REQ-GEN-01).
  localization: {
    locales: [
      { code: 'bn', label: 'বাংলা' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'bn',
    fallback: true,
  },
  collections: [Pages, Posts, People, Courses, Notices, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [SiteSettings, Navigation, ImpactStats],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
