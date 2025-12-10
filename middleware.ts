import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Extract domain from WordPress API URL for CSP
 * Example: https://example.com/wp-json → example.com
 */
function getWordPressDomain(): string | null {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  if (!wpUrl) {
    return null
  }

  try {
    const url = new URL(wpUrl)
    return url.origin // Returns protocol + hostname + port (e.g., https://example.com)
  } catch {
    return null
  }
}

/**
 * Build Content Security Policy header
 * 
 * Security Notes:
 * - 'unsafe-inline' is required for Next.js hydration and CSS-in-JS libraries
 * - In production, consider implementing nonces for stricter CSP
 * - WordPress domain is dynamically added to allow external images and API calls
 */
function buildCSPHeader(): string {
  const wpDomain = getWordPressDomain()
  const isDevelopment = process.env.NODE_ENV === 'development'

  // Base CSP directives
  const directives: string[] = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'" + (isDevelopment ? " 'unsafe-eval'" : ""),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ]

  // Add WordPress domain to img-src and connect-src if configured
  if (wpDomain) {
    // Find img-src directive and add WordPress domain
    const imgSrcIndex = directives.findIndex((d) => d.startsWith('img-src'))
    if (imgSrcIndex !== -1) {
      directives[imgSrcIndex] += ` ${wpDomain}`
    }

    // Find connect-src directive and add WordPress domain
    const connectSrcIndex = directives.findIndex((d) => d.startsWith('connect-src'))
    if (connectSrcIndex !== -1) {
      directives[connectSrcIndex] += ` ${wpDomain}`
    }
  }

  // Add Gravatar for author images (commonly used by WordPress)
  const imgSrcIndex = directives.findIndex((d) => d.startsWith('img-src'))
  if (imgSrcIndex !== -1) {
    directives[imgSrcIndex] += ' https://secure.gravatar.com'
  }

  return directives.join('; ')
}

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    const protocol = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol
    const host = request.headers.get('host') || request.nextUrl.host

    // Check if request is HTTP (not HTTPS)
    if (protocol === 'http' || request.nextUrl.protocol === 'http:') {
      // Redirect to HTTPS version
      const httpsUrl = new URL(request.nextUrl)
      httpsUrl.protocol = 'https:'
      return NextResponse.redirect(httpsUrl, 301) // Permanent redirect
    }
  }

  const response = NextResponse.next()

  // Skip CSP for static assets to reduce overhead
  // Static assets are typically served by CDN and don't need CSP
  const pathname = request.nextUrl.pathname
  const isStaticAsset =
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/i)

  if (isStaticAsset) {
    // Still set security headers for static assets (lightweight)
    response.headers.set('X-Content-Type-Options', 'nosniff')
    return response
  }

  // Build and set CSP header
  const cspHeader = buildCSPHeader()
  response.headers.set('Content-Security-Policy', cspHeader)

  // Security Headers
  // X-Frame-Options: Prevents clickjacking by blocking iframe embedding
  response.headers.set('X-Frame-Options', 'DENY')

  // X-Content-Type-Options: Prevents MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Referrer-Policy: Controls referrer information sent with requests
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions-Policy: Disables unused browser features to reduce attack surface
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  )

  // X-XSS-Protection: Legacy XSS protection (for older browsers)
  // Note: Modern browsers rely on CSP, but this provides fallback
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled separately if needed)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

