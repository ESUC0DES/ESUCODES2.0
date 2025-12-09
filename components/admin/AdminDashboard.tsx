 'use client'
 
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
 import { motion } from 'framer-motion'
import {
  LogOut,
  FileText,
  BarChart3,
  Settings,
  Globe2,
} from 'lucide-react'
import { getPosts } from '@/actions/wordpress-data'
import { createBlogPost } from '@/actions/blog-actions'
import { logoutAdmin } from '@/actions/wp-auth'
import { checkAuth } from '@/app/admin/check-auth'
 
 export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [overview, setOverview] = useState<{
    totalPosts: number
    lastPostTitle: string | null
  }>({
    totalPosts: 0,
    lastPostTitle: null,
  })
  const [isLoadingOverview, setIsLoadingOverview] = useState(true)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState<string | null>(null)
  const [publishError, setPublishError] = useState<string | null>(null)

  useEffect(() => {
    // Server-side session check using HttpOnly cookie
    const verifySession = async () => {
      const authenticated = await checkAuth()
      if (!authenticated) {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
      }
    }
    verifySession()
  }, [router])

  // Overview bilgilerini çek
  useEffect(() => {
    const loadOverview = async () => {
      try {
        const { posts } = await getPosts({ per_page: 10 })
        setOverview({
          totalPosts: posts.length,
          lastPostTitle: posts[0]?.title.rendered || null,
        })
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
      } finally {
        setIsLoadingOverview(false)
      }
    }

    if (isAuthenticated) {
      loadOverview()
    }
  }, [isAuthenticated])

  const handleLogout = async () => {
    await logoutAdmin()
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    setPublishMessage(null)
    setPublishError(null)

    if (!title.trim()) {
      setPublishError('Başlık zorunludur')
      return
    }

    setIsPublishing(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('excerpt', excerpt)
      // Bu alanlar ileride WordPress meta alanlarına bağlanacak
      formData.append('featuredImageUrl', featuredImageUrl)
      formData.append('seoTitle', seoTitle)
      formData.append('seoDescription', seoDescription)

      const result = await createBlogPost(formData)

      if (result.success) {
        setPublishMessage('Yazı başarıyla oluşturuldu')
        setTitle('')
        setContent('')
        setExcerpt('')
        setFeaturedImageUrl('')
        setSeoTitle('')
        setSeoDescription('')
      } else {
        setPublishError(result.error || 'Yazı oluşturulurken hata oluştu')
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      setPublishError('Beklenmeyen bir hata oluştu')
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary">Kokpit Kontrol Paneli</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 glass rounded-lg text-text-secondary hover:text-accent-primary transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Çıkış</span>
          </button>
        </div>

        {/* Overview + Blog Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Site Overview */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Globe2 className="w-6 h-6 text-accent-primary" />
                  <h2 className="text-lg font-semibold text-text-primary">
                    Site Overview
                  </h2>
                </div>
              </div>
              {isLoadingOverview ? (
                <p className="text-text-secondary text-sm">Yükleniyor...</p>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Toplam son çekilen yazı</span>
                    <span className="text-text-primary font-mono">
                      {overview.totalPosts}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-text-secondary mb-1">
                      Son yazı başlığı
                    </span>
                    <span className="text-text-primary text-xs font-mono line-clamp-2">
                      {overview.lastPostTitle || 'Veri bulunamadı'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Google / Analytics Notları
              </h3>
              <p className="text-text-secondary text-sm">
                Buraya ileride Google Analytics, Search Console veya Lighthouse
                skorları için bir özet kartı ekleyebiliriz. Şimdilik bu alan
                \"site sağlığı\" notları için ayrıldı.
              </p>
            </div>
          </div>

          {/* Blog Editor */}
          <div className="lg:col-span-2 glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center space-x-2">
              <FileText className="w-6 h-6 text-accent-primary" />
              <span>Yeni Blog Yazısı</span>
            </h2>

            <form onSubmit={handlePublish} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-text-secondary text-sm font-semibold mb-2">
                  Başlık
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary font-mono"
                  placeholder="Yazı başlığı..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-text-secondary text-sm font-semibold mb-2">
                  İçerik
                </label>
                <textarea
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary font-mono text-sm"
                  placeholder="Markdown veya HTML içerik girebilirsin. İleride zengin metin editörü (Tiptap/Slate) entegre edilebilir."
                />
              </div>

              {/* Excerpt + Featured Image + SEO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-text-secondary text-sm font-semibold mb-2">
                      Özet (Excerpt)
                    </label>
                    <textarea
                      rows={4}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full px-3 py-2 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary font-mono text-xs"
                      placeholder="Listelemelerde görünecek kısa özet..."
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm font-semibold mb-2">
                      Öne Çıkan Görsel URL
                    </label>
                    <input
                      type="url"
                      value={featuredImageUrl}
                      onChange={(e) => setFeaturedImageUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary font-mono text-xs"
                      placeholder="https://... (WP tarafında özel meta alanına bağlanacak)"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-text-secondary text-sm font-semibold mb-2">
                      SEO Başlığı
                    </label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary font-mono text-xs"
                      placeholder="Arama sonuçlarında görünecek başlık..."
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm font-semibold mb-2">
                      SEO Açıklaması
                    </label>
                    <textarea
                      rows={4}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary font-mono text-xs"
                      placeholder="Meta description içeriği..."
                    />
                  </div>
                </div>
              </div>

              {/* Feedback */}
              {publishError && (
                <p className="text-sm text-red-400 font-mono">{publishError}</p>
              )}
              {publishMessage && (
                <p className="text-sm text-emerald-400 font-mono">
                  {publishMessage}
                </p>
              )}

              {/* Publish Button */}
              <motion.button
                type="submit"
                disabled={isPublishing}
                className="px-6 py-3 bg-accent-primary text-bg-primary rounded-lg font-semibold hover:bg-accent-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                whileHover={{ scale: isPublishing ? 1 : 1.02 }}
                whileTap={{ scale: isPublishing ? 1 : 0.98 }}
              >
                {isPublishing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                    <span>Yayınlanıyor...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>Yazıyı Yayınla</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

