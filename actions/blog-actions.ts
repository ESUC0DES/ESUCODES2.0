'use server'

import { revalidatePath } from 'next/cache'
import { createPost } from '@/lib/wordpress'
import { TrustedError, logError, getSafeErrorMessage } from '@/lib/errors'
import { sanitizeHtml, sanitizeText } from '@/lib/sanitize'

export interface CreateBlogPostResult {
  success: boolean
  error?: string
}

/**
 * Yeni blog yazisi olusturmak icin server action.
 * Not: Su an sadece baslik, icerik ve excerpt direkt WordPress'e gider.
 * Featured image / SEO alanlari icin WP tarafinda ek meta alanlar tanimlandiginda
 * bu fonksiyon genisletilebilir.
 */
export async function createBlogPost(
  formData: FormData
): Promise<CreateBlogPostResult> {
  try {
    const rawTitle = (formData.get('title') as string)?.trim() || ''
    const rawContent = (formData.get('content') as string) || ''
    const rawExcerpt = (formData.get('excerpt') as string) || ''

    // Sanitize all input fields before processing
    // Defense in Depth: Sanitize even if client-side validation exists
    const title = sanitizeText(rawTitle) // Plain text - remove all HTML
    const content = sanitizeHtml(rawContent) // HTML content - strict whitelist
    const excerpt = rawExcerpt.trim() ? sanitizeText(rawExcerpt.trim()) : undefined // Plain text

    if (!title) {
      // Validation error - safe to return
      return { success: false, error: 'Başlık zorunludur' }
    }

    // Sanitized content is now safe to send to WordPress
    const post = await createPost(title, content, excerpt)

    if (!post) {
      // WordPress API failed - log but return generic message
      logError(new Error('Failed to create blog post - WordPress API returned null'), { title })
      return { success: false, error: 'Yazı oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' }
    }

    // Blog sayfasi cache'lerini temizle
    revalidatePath('/blog')

    return { success: true }
  } catch (error) {
    // Log full error details
    logError(new Error('Unexpected error creating blog post'), {
      originalError: error,
      title: (formData.get('title') as string)?.trim(),
    })
    
    // Return generic error message
    return {
      success: false,
      error: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.',
    }
  }
}


