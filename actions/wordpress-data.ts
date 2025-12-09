'use server'

/**
 * Server Actions Bridge for WordPress Data
 * 
 * This file acts as a secure bridge between client components and WordPress API.
 * All sensitive credentials remain on the server-side.
 * 
 * Client components should import functions from this file instead of lib/wordpress.ts
 */

import {
  getPosts as getPostsInternal,
  getPostBySlug as getPostBySlugInternal,
  getCategories as getCategoriesInternal,
  type WordPressPost,
  type WordPressCategory,
} from '@/lib/wordpress'

/**
 * Get WordPress posts (Server Action)
 * Client components can call this safely without exposing credentials
 */
export async function getPosts(params?: {
  per_page?: number
  page?: number
  categories?: number
  search?: string
}): Promise<{ posts: WordPressPost[]; totalPages: number }> {
  return await getPostsInternal(params)
}

/**
 * Get a single WordPress post by slug (Server Action)
 * Client components can call this safely without exposing credentials
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  return await getPostBySlugInternal(slug)
}

/**
 * Get WordPress categories (Server Action)
 * Client components can call this safely without exposing credentials
 */
export async function getCategories(): Promise<WordPressCategory[]> {
  return await getCategoriesInternal()
}

// Re-export types for client components
export type { WordPressPost, WordPressCategory }

