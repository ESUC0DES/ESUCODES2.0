/**
 * Rate Limiting Utility
 * 
 * Implements Fixed Window algorithm for brute force protection.
 * 
 * ⚠️ PRODUCTION WARNING:
 * In a production serverless environment (like Vercel), this in-memory store is ephemeral.
 * Each serverless function instance has its own memory, so rate limits won't be shared
 * across instances. For production, replace this Map with Redis (e.g., Vercel KV or Upstash).
 * 
 * Example Redis implementation:
 * ```typescript
 * import { kv } from '@vercel/kv'
 * const key = `rate-limit:login:${identifier}`
 * const attempts = await kv.incr(key)
 * if (attempts === 1) await kv.expire(key, windowMs / 1000)
 * ```
 */

interface RateLimitEntry {
  attempts: number
  resetAt: number
}

// In-memory store: Map<identifier, RateLimitEntry>
// TODO: Replace with Redis in production
const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup expired entries periodically (every 5 minutes)
// In production with Redis, use TTL instead
const CLEANUP_INTERVAL = 5 * 60 * 1000 // 5 minutes

let cleanupTimer: NodeJS.Timeout | null = null

function startCleanupTimer() {
  if (cleanupTimer) return // Already running

  cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [identifier, entry] of rateLimitStore.entries()) {
      if (now > entry.resetAt) {
        rateLimitStore.delete(identifier)
      }
    }
  }, CLEANUP_INTERVAL)
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number // Unix timestamp in milliseconds
}

/**
 * Check rate limit for a given identifier (e.g., IP address)
 * 
 * @param identifier - Unique identifier (typically IP address)
 * @param limit - Maximum number of attempts allowed
 * @param windowMs - Time window in milliseconds
 * @returns Rate limit status
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000 // 1 minute
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Start cleanup timer on first use
  startCleanupTimer()

  // No entry or window expired - create new entry
  if (!entry || now > entry.resetAt) {
    const newEntry: RateLimitEntry = {
      attempts: 1,
      resetAt: now + windowMs,
    }
    rateLimitStore.set(identifier, newEntry)

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: newEntry.resetAt,
    }
  }

  // Entry exists and window is still active
  if (entry.attempts >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetAt,
    }
  }

  // Increment attempts
  entry.attempts++
  rateLimitStore.set(identifier, entry)

  return {
    success: true,
    limit,
    remaining: limit - entry.attempts,
    reset: entry.resetAt,
  }
}

/**
 * Reset rate limit for a given identifier
 * Useful for testing or manual reset
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier)
}

/**
 * Get current rate limit status without incrementing
 * Useful for checking status before making a request
 */
export function getRateLimitStatus(
  identifier: string,
  limit: number = 5
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  if (!entry || now > entry.resetAt) {
    return {
      success: true,
      limit,
      remaining: limit,
      reset: now + 60 * 1000, // Default 1 minute window
    }
  }

  return {
    success: entry.attempts < limit,
    limit,
    remaining: Math.max(0, limit - entry.attempts),
    reset: entry.resetAt,
  }
}

