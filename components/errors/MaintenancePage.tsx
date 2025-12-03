'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wrench, Clock } from 'lucide-react'

export default function MaintenancePage() {
  const [countdown, setCountdown] = useState(3600) // 1 saat

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8 flex justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-accent-primary to-accent-tertiary flex items-center justify-center">
            <Wrench className="w-12 h-12 text-bg-primary" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent">
          Sistem Güncelleniyor
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-lg mb-8">
          ESUCODES platformu şu anda bakım modunda. En kısa sürede geri döneceğiz.
        </p>

        {/* Countdown */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-6 h-6 text-accent-primary" />
            <span className="text-text-secondary font-semibold">
              Tahmini Süre
            </span>
          </div>
          <div className="text-4xl font-mono font-bold text-accent-primary">
            {formatTime(countdown)}
          </div>
        </div>

        {/* Terminal Style Message */}
        <div className="glass rounded-xl p-6 font-mono text-left">
          <div className="text-accent-tertiary mb-2">
            $ system_status
          </div>
          <div className="text-text-secondary text-sm space-y-1">
            <div>
              <span className="text-accent-primary">[INFO]</span> Sistem
              güncellemesi devam ediyor...
            </div>
            <div>
              <span className="text-accent-primary">[INFO]</span> Tüm veriler
              güvende
            </div>
            <div>
              <span className="text-accent-primary">[INFO]</span> Lütfen kısa
              bir süre sonra tekrar deneyin
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

