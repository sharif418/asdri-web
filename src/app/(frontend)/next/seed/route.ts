import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { revalidatePath, revalidateTag } from 'next/cache'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    // The seed writes with revalidation disabled (it also runs from the CLI, outside Next).
    // Here we are inside Next, so purge every cached global and page once at the end.
    for (const slug of [
      'site-settings',
      'navigation',
      'impact-stats',
      'home',
      'about-content',
      'admissions-content',
    ]) {
      revalidateTag(`global_${slug}`, 'max')
    }
    revalidatePath('/', 'layout')

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
