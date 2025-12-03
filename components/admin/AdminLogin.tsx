'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Terminal, Lock, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Mock authentication - Gerçek implementasyonda JWT token kontrolü yapılacak
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        // Token kaydet (gerçek implementasyonda)
        localStorage.setItem('admin_token', 'mock_token')
        router.push('/admin')
      } else {
        setError('ACCESS DENIED')
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-2xl p-8 border-2 border-accent-primary/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent-primary to-accent-tertiary flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-bg-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent">
              Admin Access
            </h1>
            <p className="text-text-secondary text-sm">
              Biyometrik tarama başlatılıyor...
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-mono text-sm">{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-text-secondary text-sm font-semibold mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary font-mono"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-semibold mb-2">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary font-mono"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-accent-primary text-bg-primary rounded-lg font-semibold hover:bg-accent-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                  <span>Doğrulanıyor...</span>
                </>
              ) : (
                <>
                  <Terminal className="w-5 h-5" />
                  <span>Giriş Yap</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-text-muted text-xs text-center font-mono">
              ⚠️ Bu alan sadece yetkili personel içindir
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

