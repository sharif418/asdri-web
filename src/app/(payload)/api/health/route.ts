import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Liveness/readiness probe for the container orchestrator (infra/docker-compose.coolify.yml).
 * Returns 200 when the app can reach Payload and the database, 503 otherwise. Lives under
 * (payload)/api so it takes precedence over Payload's catch-all REST route.
 */
export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  try {
    const payload = await getPayload({ config: configPromise })
    await payload.count({ collection: 'users', overrideAccess: true })
    return Response.json({ status: 'ok' }, { headers: { 'cache-control': 'no-store' } })
  } catch (error) {
    return Response.json(
      { status: 'error', message: error instanceof Error ? error.message : 'unknown' },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    )
  }
}
