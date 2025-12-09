'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Copy, Check } from 'lucide-react'

export default function ContactContent() {
  const [copied, setCopied] = useState(false)
  const email = 'contact@esucodes.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Kopyalama başarısız:', err)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent">
            İletişim
          </h1>
          <p className="text-text-secondary text-lg">
            Bağlantı kurmak için bize ulaşın
          </p>
        </div>

        {/* Contact Card */}
        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-primary to-accent-tertiary flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-bg-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-text-primary">
              E-posta ile İletişim
            </h2>
            <p className="text-text-secondary mb-6">
              Projeleriniz, işbirliği teklifleri veya sorularınız için
            </p>
          </div>

          {/* Email Copy Button */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4 px-6 py-4 glass rounded-xl">
              <span className="text-text-primary font-mono text-lg">
                {email}
              </span>
            </div>
            <motion.button
              onClick={handleCopyEmail}
              className="flex items-center space-x-2 px-6 py-3 bg-accent-primary text-bg-primary rounded-xl font-semibold hover:bg-accent-secondary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>E-postayı Kopyala</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold mb-4 text-text-primary text-center">
              Konum
            </h3>
            <div className="glass rounded-xl p-8 h-64 flex items-center justify-center">
              <p className="text-text-muted text-center">
                🚀 Uzay Üssü Konumu<br />
                <span className="text-sm">(Harita entegrasyonu eklenecek)</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

