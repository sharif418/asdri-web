/**
 * Loads the institute's starter content (site settings, navigation, impact stats) in both
 * locales without needing an admin login. Run: `bun run seed` (wraps `payload run`).
 * Idempotent; see src/endpoints/seed/index.ts.
 */
import config from '@payload-config'
import { createLocalReq, getPayload } from 'payload'

import { seed } from '../src/endpoints/seed'

const payload = await getPayload({ config })
const req = await createLocalReq({}, payload)
await seed({ payload, req })
process.exit(0)
