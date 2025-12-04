'use server'

import { revalidatePath } from 'next/cache'

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
    const status = formData.get('status') as string
    const battery = formData.get('battery') as string
    const coreMessage = formData.get('coreMessage') as string

    // Validation
    if (!status || !battery) {
      return {
        success: false,
        error: 'Missing required fields',
      }
    }

    if (!WORDPRESS_API_URL) {
      // If WordPress is not configured, return success (for development)
      console.warn('WordPress API URL not configured. Skipping update.')
      return {
        success: true,
      }
    }

    // Prepare Basic Auth
    const credentials = `${WORDPRESS_AUTH_USER}:${WORDPRESS_AUTH_PASS}`
    const authHeader = Buffer.from(credentials).toString('base64')

    // Update WordPress (assuming custom endpoint or post meta)
    // This is a placeholder - adjust based on your WordPress setup
    const response = await fetch(`${WORDPRESS_API_URL}/robotics/1`, {
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

    if (!response.ok) {
      return {
        success: false,
        error: `WordPress API error: ${response.statusText}`,
      }
    }

    // Revalidate paths
    revalidatePath('/robotics')
    revalidatePath('/cockpit')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating robot stats:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

