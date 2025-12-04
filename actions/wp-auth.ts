'use server'

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''

export interface WordPressLoginResult {
  success: boolean
  error?: string
}

/**
 * WordPress admin hesaplari ile giris yapmak icin helper.
 *
 * Beklenti:
 * - Her kullanici kendi WordPress kullanici adi + Application Password kombinasyonunu kullanir.
 * - Bu bilgiler Basic Auth ile `/users/me` endpoint'ine gonderilir.
 * - 200 donerse giris basarili kabul edilir.
 */
export async function loginWithWordPress(
  username: string,
  password: string
): Promise<WordPressLoginResult> {
  try {
    if (!WORDPRESS_API_URL) {
      return {
        success: false,
        error: 'WordPress API URL not configured',
      }
    }

    if (!username || !password) {
      return {
        success: false,
        error: 'Kullanici adi ve sifre zorunludur',
      }
    }

    const credentials = Buffer.from(`${username}:${password}`).toString('base64')

    const response = await fetch(`${WORDPRESS_API_URL}/users/me`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return {
        success: false,
        error: 'ACCESS DENIED',
      }
    }

    // Ileride HttpOnly cookie/tabanli session eklemek istersek burada cookies().set ile yapilabilir.

    return {
      success: true,
    }
  } catch (error) {
    console.error('WordPress login error:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unknown error during login',
    }
  }
}