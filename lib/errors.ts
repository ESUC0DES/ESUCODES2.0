/**
 * Custom Error Classes for Secure Error Handling
 * 
 * Trusted errors can be safely returned to clients.
 * System errors should be logged but masked with generic messages.
 */

/**
 * Trusted Error - Safe to return message to client
 * Used for validation errors and user-facing errors
 */
export class TrustedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TrustedError'
  }
}

/**
 * System Error - Should be logged but masked from client
 * Used for internal errors, API failures, network issues
 */
export class SystemError extends Error {
  constructor(message: string, public readonly context?: Record<string, unknown>) {
    super(message)
    this.name = 'SystemError'
  }
}

/**
 * Check if an error is a trusted error that can be safely returned to client
 */
export function isTrustedError(error: unknown): error is TrustedError {
  return error instanceof TrustedError
}

/**
 * Log error securely on server-side
 * Includes full error details and context
 * Uses secure logger to redact sensitive data
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
  // Use logger if available, otherwise fallback to console.error
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require('@/lib/logger')
    const errorDetails = {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context,
    }
    logger.error('System Error', errorDetails)
  } catch {
    // Fallback to console.error if logger import fails (circular dependency protection)
    const errorDetails = {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context,
    }
    console.error('[System Error]:', JSON.stringify(errorDetails, null, 2))
  }
}

/**
 * Get a safe error message for client
 * Returns generic message for system errors, actual message for trusted errors
 */
export function getSafeErrorMessage(error: unknown, defaultMessage: string = 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.'): string {
  if (isTrustedError(error)) {
    return error.message
  }
  return defaultMessage
}

