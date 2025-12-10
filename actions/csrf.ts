'use server'

/**
 * Server Action to generate CSRF token
 * 
 * This allows client components to fetch a CSRF token
 * without exposing server-only utilities directly.
 */

import { generateCsrfToken } from '@/lib/csrf'

/**
 * Get a new CSRF token for form submission
 * 
 * @returns CSRF token string
 */
export async function getCsrfToken(): Promise<string> {
  return generateCsrfToken()
}

