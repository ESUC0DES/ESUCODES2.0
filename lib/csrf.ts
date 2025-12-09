/**
 * CSRF Protection Utility
 * 
 * Implements Double Submit Cookie Pattern for CSRF protection.
 * 
 * How it works:
 * 1. Server generates a random token and sets it in an HttpOnly cookie
 * 2. Server also returns the token to be included in the form
 * 3. On form submission, server compares the cookie token with form token
 * 4. If they match, request is legitimate; if not, it's rejected
 * 
 * Security Notes:
 * - HttpOnly cookie prevents JavaScript access (XSS protection)
 * - Secure flag ensures cookie only sent over HTTPS in production
 * - SameSite=Strict prevents cross-site requests
 */

import { cookies } from 'next/headers'
import crypto from 'node:crypto'

const CSRF_TOKEN_COOKIE_NAME = 'csrf_token'
const CSRF_TOKEN_LENGTH = 32 // 256 bits when hex-encoded

/**
 * Generate a cryptographically secure CSRF token
 * Sets the token in an HttpOnly cookie and returns it for form inclusion
 * 
 * @returns CSRF token string
 */
export async function generateCsrfToken(): Promise<string> {
  // Generate cryptographically secure random token
  const token = crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex')

  // Set token in HttpOnly cookie
  const cookieStore = cookies()
  cookieStore.set(CSRF_TOKEN_COOKIE_NAME, token, {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // Prevents cross-site requests
    path: '/',
    maxAge: 60 * 60 * 2, // 2 hours
  })

  return token
}

/**
 * Verify CSRF token from form submission
 * Compares the token from the form with the token in the cookie
 * 
 * @param tokenFromForm - CSRF token submitted in the form
 * @returns true if token is valid, false otherwise
 */
export async function verifyCsrfToken(tokenFromForm: string | null | undefined): Promise<boolean> {
  // Validate input
  if (!tokenFromForm || typeof tokenFromForm !== 'string') {
    return false
  }

  // Get token from cookie
  const cookieStore = cookies()
  const cookieToken = cookieStore.get(CSRF_TOKEN_COOKIE_NAME)?.value

  // If no cookie token exists, verification fails
  if (!cookieToken) {
    return false
  }

  // Use constant-time comparison to prevent timing attacks
  // crypto.timingSafeEqual requires buffers of equal length
  if (tokenFromForm.length !== cookieToken.length) {
    return false
  }

  try {
    const formTokenBuffer = Buffer.from(tokenFromForm, 'hex')
    const cookieTokenBuffer = Buffer.from(cookieToken, 'hex')
    
    return crypto.timingSafeEqual(formTokenBuffer, cookieTokenBuffer)
  } catch {
    // If conversion fails, tokens don't match
    return false
  }
}

/**
 * Get current CSRF token from cookie (without generating a new one)
 * Useful for checking if a token already exists
 * 
 * @returns CSRF token if exists, null otherwise
 */
export async function getCsrfToken(): Promise<string | null> {
  const cookieStore = cookies()
  return cookieStore.get(CSRF_TOKEN_COOKIE_NAME)?.value || null
}

