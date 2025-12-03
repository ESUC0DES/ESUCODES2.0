'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogOut, FileText, BarChart3, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Token kontrolü
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Toplam Yazı', value: '24', icon: FileText },
            { title: 'Görüntülenme', value: '1.2K', icon: BarChart3 },
            { title: 'Ayarlar', value: 'Aktif', icon: Settings },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-8 h-8 text-accent-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  {stat.value}
                </h3>
                <p className="text-text-secondary text-sm">{stat.title}</p>
              </motion.div>
            )
          })}
        </div>

        {/* WordPress Post Editor Placeholder */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-text-primary">
            Yeni Blog Yazısı Oluştur
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-text-secondary text-sm font-semibold mb-2">
                Başlık
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Yazı başlığı..."
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-semibold mb-2">
                İçerik
              </label>
              <textarea
                rows={10}
                className="w-full px-4 py-3 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Yazı içeriği... (Tiptap editor entegrasyonu eklenecek)"
              />
            </div>
            <motion.button
              className="px-6 py-3 bg-accent-primary text-bg-primary rounded-lg font-semibold hover:bg-accent-secondary transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Yayınla
            </motion.button>
          </div>
          <p className="mt-4 text-text-muted text-sm">
            💡 WordPress API entegrasyonu ve Tiptap editor yakında eklenecek
          </p>
        </div>
      </motion.div>
    </div>
  )
}

