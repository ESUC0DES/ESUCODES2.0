'use server'

import { revalidatePath } from 'next/cache'
import { logError } from '@/lib/errors'
import { sanitizeText } from '@/lib/sanitize'

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''
const WORDPRESS_AUTH_USER = process.env.NEXT_PUBLIC_WORDPRESS_AUTH_USER || ''
const WORDPRESS_AUTH_PASS = process.env.NEXT_PUBLIC_WORDPRESS_AUTH_PASS || ''

interface UpdateRobotStatsResult {
  success: boolean
  error?: string
}

export async function updateRobotStats(
  formData: FormData
): Promise<UpdateRobotStatsResult> {
  try {
    const rawStatus = (formData.get('status') as string) || ''
    const rawBattery = (formData.get('battery') as string) || ''
    const rawCoreMessage = (formData.get('coreMessage') as string) || ''

    // Sanitize all input fields before processing
    const status = sanitizeText(rawStatus)
    const battery = sanitizeText(rawBattery)
    const coreMessage = rawCoreMessage ? sanitizeText(rawCoreMessage) : ''

    // Validation
    if (!status || !battery) {
      return {
        success: false,
        error: 'Missing required fields',
      }
    }

    if (!WORDPRESS_API_URL) {
      // If WordPress is not configured, return success (for development)
      logError(new Error('WordPress API URL not configured - skipping robot stats update'), {
        status,
        battery,
      })
      return {
        success: true,
      }
    }

    // Prepare Basic Auth
    const credentials = `${WORDPRESS_AUTH_USER}:${WORDPRESS_AUTH_PASS}`
    const authHeader = Buffer.from(credentials).toString('base64')

    // Update WordPress (assuming custom endpoint or post meta)
    // This is a placeholder - adjust based on your WordPress setup
    let response: Response
    try {
      response = await fetch(`${WORDPRESS_API_URL}/robotics/1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authHeader}`,
        },
        body: JSON.stringify({
          status,
          battery: parseInt(battery, 10),
          core_message: coreMessage,
        }),
      })
    } catch (fetchError) {
      logError(new Error('WordPress API fetch failed for robot stats update'), {
        originalError: fetchError,
        status,
        battery,
        apiUrl: WORDPRESS_API_URL,
      })
      return {
        success: false,
        error: 'Servis şu an yanıt vermiyor. Lütfen daha sonra tekrar deneyin.',
      }
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response')
      logError(new Error('WordPress API error while updating robot stats'), {
        status: response.status,
        statusText: response.statusText,
        errorResponse: errorText,
        robotStatus: status,
        battery,
      })
      return {
        success: false,
        error: 'Robot istatistikleri güncellenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      }
    }

    // Revalidate paths
    revalidatePath('/robotics')
    revalidatePath('/robotics/cockpit')

    return {
      success: true,
    }
  } catch (error) {
    logError(new Error('Unexpected error updating robot stats'), {
      originalError: error,
      status,
      battery,
    })
    return {
      success: false,
      error: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.',
    }
  }
}

