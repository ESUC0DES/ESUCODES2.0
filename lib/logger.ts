/**
 * Secure Logger Utility
 * 
 * Provides secure logging with:
 * - Sensitive data redaction (passwords, tokens, secrets)
 * - Production guard (suppresses debug logs in production)
 * - Structured logging with context
 */

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Sensitive keys that should be redacted from logs
 */
const SENSITIVE_KEYS = [
  'password',
  'token',
  'secret',
  'authorization',
  'auth',
  'credentials',
  'apiKey',
  'apikey',
  'api_key',
  'accessToken',
  'access_token',
  'refreshToken',
  'refresh_token',
  'sessionToken',
  'session_token',
  'csrfToken',
  'csrf_token',
  'privateKey',
  'private_key',
  'secretKey',
  'secret_key',
]

/**
 * Recursively sanitize an object to redact sensitive data
 */
function sanitizeObject(obj: unknown, depth: number = 0): unknown {
  // Prevent infinite recursion
  if (depth > 10) {
    return '[MAX_DEPTH_REACHED]'
  }

  // Handle null/undefined
  if (obj === null || obj === undefined) {
    return obj
  }

  // Handle primitives
  if (typeof obj !== 'object') {
    return obj
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item, depth + 1))
  }

  // Handle objects
  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase()
    
    // Check if key contains sensitive keywords
    const isSensitive = SENSITIVE_KEYS.some((sensitiveKey) =>
      lowerKey.includes(sensitiveKey.toLowerCase())
    )

    if (isSensitive) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof value === 'object' && value !== null) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeObject(value, depth + 1)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}

/**
 * Format log message with context
 */
function formatLogMessage(level: string, message: string, context?: unknown): string {
  const timestamp = new Date().toISOString()
  const sanitizedContext = context ? sanitizeObject(context) : undefined

  const logEntry: Record<string, unknown> = {
    timestamp,
    level,
    message,
  }

  if (sanitizedContext) {
    logEntry.context = sanitizedContext
  }

  return JSON.stringify(logEntry, null, 2)
}

/**
 * Log levels
 */
export const logger = {
  /**
   * Debug log - only in development
   */
  debug: (message: string, context?: unknown): void => {
    if (!isProduction) {
      console.log(formatLogMessage('DEBUG', message, context))
    }
  },

  /**
   * Info log - only in development
   */
  info: (message: string, context?: unknown): void => {
    if (!isProduction) {
      console.log(formatLogMessage('INFO', message, context))
    }
  },

  /**
   * Warning log - always logged
   */
  warn: (message: string, context?: unknown): void => {
    console.warn(formatLogMessage('WARN', message, context))
  },

  /**
   * Error log - always logged
   */
  error: (message: string, context?: unknown): void => {
    console.error(formatLogMessage('ERROR', message, context))
  },
}

