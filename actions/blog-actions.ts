'use server'

import { revalidatePath } from 'next/cache'
import { createPost } from '@/lib/wordpress'

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
    const title = (formData.get('title') as string)?.trim()
    const content = (formData.get('content') as string) || ''
    const excerpt = ((formData.get('excerpt') as string) || '').trim() || undefined

    if (!title) {
      return { success: false, error: 'Başlık zorunludur' }
    }

    const post = await createPost(title, content, excerpt)

    if (!post) {
      return { success: false, error: 'WordPress API hata döndürdü' }
    }

    // Blog sayfasi cache'lerini temizle
    revalidatePath('/blog')

    return { success: true }
  } catch (error) {
    console.error('Error creating blog post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu',
    }
  }
}


