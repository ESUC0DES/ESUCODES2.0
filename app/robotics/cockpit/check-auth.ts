'use server'

import { isAuthenticated } from '@/actions/auth'

/**
 * Server action to check authentication status
 * Used by client components to verify session
 */
export async function checkAuth(): Promise<boolean> {
  return await isAuthenticated()
}

