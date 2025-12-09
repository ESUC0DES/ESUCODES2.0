/**
 * WordPress API Helper Functions
 * Headless WordPress ile iletişim için yardımcı fonksiyonlar
 * 
 * SECURITY: This file is server-only. Client components must use Server Actions
 * from actions/wordpress-data.ts to access WordPress data.
 */

import 'server-only'
import { logError, SystemError } from '@/lib/errors'
import { logger } from '@/lib/logger'

// Public API URL (safe to expose)
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''

// SECURITY: Sensitive credentials - server-only, never exposed to client
const WORDPRESS_AUTH_USER = process.env.WORDPRESS_AUTH_USER || ''
const WORDPRESS_AUTH_PASS = process.env.WORDPRESS_AUTH_PASS || ''

/**
 * Slug validation regex
 * Valid slug: lowercase letters, numbers, and hyphens only
 * Prevents injection attacks and URL manipulation
 */
const SLUG_REGEX = /^[a-z0-9-]+$/

/**
 * Validate slug format to prevent injection attacks
 * 
 * @param slug - The slug to validate
 * @throws Error if slug format is invalid
 */
function validateSlug(slug: string): void {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug format: slug must be a non-empty string')
  }

  if (!SLUG_REGEX.test(slug)) {
    throw new Error('Invalid slug format: slug can only contain lowercase letters, numbers, and hyphens')
  }
}

// Base64 encode for Basic Auth
const getAuthHeader = () => {
  if (WORDPRESS_AUTH_USER && WORDPRESS_AUTH_PASS) {
    const credentials = Buffer.from(
      `${WORDPRESS_AUTH_USER}:${WORDPRESS_AUTH_PASS}`
    ).toString('base64')
    return `Basic ${credentials}`
  }
  return ''
}

export interface WordPressPost {
  id: number
  slug: string
  author: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  modified: string
  categories: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
    author?: Array<{
      name: string
      avatar_urls?: {
        24: string
        48: string
        96: string
        [key: string]: string
      }
    }>
  }
}

export interface WordPressCategory {
  id: number
  name: string
  slug: string
}

/**
 * Tüm blog yazılarını getir
 * WordPress total pages bilgisini de döner
 */
export async function getPosts(
  params?: {
    per_page?: number
    page?: number
    categories?: number
    search?: string
  }
): Promise<{ posts: WordPressPost[]; totalPages: number }> {
  try {
    if (!WORDPRESS_API_URL) {
      logger.error('WordPress API URL is not configured', { params })
      return { posts: [], totalPages: 1 }
    }

    // Safe URL construction using URL and URLSearchParams
    const url = new URL(`${WORDPRESS_API_URL}/posts`)
    url.searchParams.append('_embed', '') // WordPress embed parameter
    
    if (params?.per_page) url.searchParams.append('per_page', params.per_page.toString())
    if (params?.page) url.searchParams.append('page', params.page.toString())
    if (params?.categories) url.searchParams.append('categories', params.categories.toString())
    if (params?.search) {
      // Sanitize search parameter to prevent injection
      const sanitizedSearch = params.search.trim()
      if (sanitizedSearch) {
        url.searchParams.append('search', sanitizedSearch)
      }
    }

    logger.debug('Fetching posts from WordPress API', { url: url.toString() })

    const response = await fetch(url.toString(), {
      cache: 'no-store', // Server-side: Always fetch fresh data
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response')
      logError(new SystemError('WordPress API error while fetching posts'), {
        status: response.status,
        statusText: response.statusText,
        errorResponse: errorText,
        params,
      })
      // Return empty result instead of throwing - graceful degradation
      return { posts: [], totalPages: 1 }
    }

    const data = await response.json()
    const totalPagesHeader = response.headers.get('X-WP-TotalPages')
    const totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) || 1 : 1

    return { posts: data, totalPages }
  } catch (error) {
    // Log full error details
    logError(new SystemError('Error fetching posts from WordPress API'), {
      originalError: error,
      params,
      apiUrl: WORDPRESS_API_URL,
    })
    // Return empty result - graceful degradation
    return { posts: [], totalPages: 1 }
  }
}

/**
 * Slug'a göre tek bir blog yazısı getir
 * 
 * SECURITY: Validates slug format and uses safe URL construction
 * to prevent injection attacks and URL manipulation
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    // Strict input validation - prevent injection attacks
    validateSlug(slug)

    if (!WORDPRESS_API_URL) {
      logError(new SystemError('WordPress API URL not configured'), { slug })
      return null
    }

    // Safe URL construction using URL and URLSearchParams
    // Prevents URL manipulation and injection attacks
    const url = new URL(`${WORDPRESS_API_URL}/posts`)
    url.searchParams.append('slug', slug)
    url.searchParams.append('_embed', '') // WordPress embed parameter

    let response: Response
    try {
      response = await fetch(url.toString(), {
        cache: 'no-store', // Server-side: Always fetch fresh data
      })
    } catch (fetchError) {
      logError(new SystemError('WordPress API fetch failed for post by slug'), {
        slug,
        originalError: fetchError,
        apiUrl: WORDPRESS_API_URL,
      })
      return null
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response')
      logError(new SystemError('WordPress API error while fetching post by slug'), {
        slug,
        status: response.status,
        statusText: response.statusText,
        errorResponse: errorText,
      })
      return null
    }

    const posts = await response.json()
    return posts[0] || null
  } catch (error) {
    // Re-throw validation errors (TrustedError) - these are safe to expose
    if (error instanceof Error && error.message.includes('Invalid slug format')) {
      logError(new SystemError('Slug validation failed'), { slug, originalError: error })
      throw error // Re-throw validation errors
    }
    // Log all other errors but return null (graceful degradation)
    logError(new SystemError('Unexpected error fetching post by slug'), {
      slug,
      originalError: error,
    })
    return null
  }
}

/**
 * Tüm kategorileri getir
 */
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    if (!WORDPRESS_API_URL) {
      logError(new SystemError('WordPress API URL not configured'))
      return []
    }

    // Safe URL construction
    const url = new URL(`${WORDPRESS_API_URL}/categories`)
    
    let response: Response
    try {
      response = await fetch(url.toString(), {
        cache: 'no-store', // Server-side: Always fetch fresh data
      })
    } catch (fetchError) {
      logError(new SystemError('WordPress API fetch failed for categories'), {
        originalError: fetchError,
        apiUrl: WORDPRESS_API_URL,
      })
      return []
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response')
      logError(new SystemError('WordPress API error while fetching categories'), {
        status: response.status,
        statusText: response.statusText,
        errorResponse: errorText,
      })
      return []
    }

    return await response.json()
  } catch (error) {
    logError(new SystemError('Unexpected error fetching categories'), {
      originalError: error,
    })
    return []
  }
}

/**
 * WordPress'e yeni yazı gönder (Admin için)
 */
export async function createPost(
  title: string,
  content: string,
  excerpt?: string,
  categories?: number[]
): Promise<WordPressPost | null> {
  try {
    if (!WORDPRESS_API_URL) {
      throw new Error('WordPress API URL is not configured')
    }

    const authHeader = getAuthHeader()
    if (!authHeader) {
      throw new Error('WordPress authentication credentials not configured')
    }

    // Safe URL construction
    const url = new URL(`${WORDPRESS_API_URL}/posts`)

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        title,
        content,
        excerpt,
        status: 'publish',
        categories: categories || [],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response')
      logError(new SystemError('WordPress API error while creating post'), {
        status: response.status,
        statusText: response.statusText,
        errorResponse: errorText,
        title,
      })
      return null
    }

    return await response.json()
  } catch (error) {
    logError(new SystemError('Unexpected error creating post'), {
      originalError: error,
      title,
    })
    return null
  }
}

/**
 * WordPress API bağlantısını test et
 */
export async function testConnection(): Promise<boolean> {
  try {
    if (!WORDPRESS_API_URL) {
      return false
    }

    // Safe URL construction
    const url = new URL(`${WORDPRESS_API_URL}/posts`)
    url.searchParams.append('per_page', '1')

    const response = await fetch(url.toString())
    return response.ok
  } catch (error) {
    return false
  }
}

