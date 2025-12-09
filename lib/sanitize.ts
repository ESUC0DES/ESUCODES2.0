/**
 * Server-Side Input Sanitization Utility
 * 
 * Uses DOMPurify (isomorphic-dompurify) to sanitize HTML content
 * before saving to WordPress or database.
 * 
 * This acts as a second layer of defense (Defense in Depth) against XSS attacks.
 */

import DOMPurify from 'isomorphic-dompurify'

/**
 * Strict whitelist of allowed HTML tags for blog content
 */
const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', // Headings
  'p', 'br', 'hr', // Paragraphs and breaks
  'ul', 'ol', 'li', // Lists
  'b', 'i', 'strong', 'em', 'u', 's', 'strike', // Text formatting
  'blockquote', 'pre', 'code', // Code and quotes
  'img', 'a', // Media and links
  'div', 'span', // Containers
  'table', 'thead', 'tbody', 'tr', 'th', 'td', // Tables
]

/**
 * Allowed attributes for HTML tags
 */
const ALLOWED_ATTR = [
  'href', // Links
  'src', 'alt', 'title', 'width', 'height', // Images
  'class', 'id', // Styling identifiers
  'target', // Link target (e.g., _blank)
  'rel', // Link relationship (e.g., nofollow)
]

/**
 * Sanitize HTML content with strict whitelist
 * 
 * @param content - Raw HTML content to sanitize
 * @returns Sanitized HTML content safe for storage
 */
export function sanitizeHtml(content: string): string {
  if (!content || typeof content !== 'string') {
    return ''
  }

  // Configure DOMPurify with strict whitelist
  const sanitized = DOMPurify.sanitize(content, {
    // Allowed tags (whitelist approach)
    ALLOWED_TAGS,
    
    // Allowed attributes
    ALLOWED_ATTR,
    
    // Forbidden tags (explicitly block dangerous tags)
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select'],
    
    // Forbidden attributes (remove event handlers and dangerous attributes)
    FORBID_ATTR: [
      'onerror',
      'onload',
      'onclick',
      'onmouseover',
      'onmouseout',
      'onfocus',
      'onblur',
      'onchange',
      'onsubmit',
      'onreset',
      'onselect',
      'onkeydown',
      'onkeypress',
      'onkeyup',
      'style', // Remove inline styles (can be used for XSS)
    ],
    
    // Additional security options
    ALLOW_DATA_ATTR: false, // Disallow data-* attributes
    ALLOW_ARIA_ATTR: false, // Disallow ARIA attributes (can be used for XSS)
    KEEP_CONTENT: true, // Keep text content even if tags are removed
    RETURN_DOM: false, // Return string, not DOM
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: false,
    
    // Sanitize URLs in href and src attributes
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  })

  return sanitized
}

/**
 * Sanitize plain text (removes all HTML)
 * Useful for titles, excerpts, and other plain text fields
 * 
 * @param text - Text that may contain HTML
 * @returns Plain text with all HTML removed
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') {
    return ''
  }

  // Remove all HTML tags and decode HTML entities
  const sanitized = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [], // No tags allowed
    KEEP_CONTENT: true, // Keep text content
  })

  return sanitized.trim()
}

