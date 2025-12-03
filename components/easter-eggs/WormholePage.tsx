'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function WormholePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary relative overflow-hidden">
      {/* Animated Wormhole Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-96 rounded-full border-4 border-accent-primary"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full border-4 border-accent-tertiary"
          animate={{
            scale: [1.5, 1, 1.5],
            rotate: [360, 0],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent">
          WORMHOLE
        </h1>
        <p className="text-2xl md:text-3xl text-text-secondary mb-8">
          Konami Code Aktif Edildi! 🎮
        </p>
        <p className="text-text-muted mb-8 max-w-md mx-auto">
          Tebrikler! Gizli sayfaya ulaştınız. Bu bir easter egg sayfasıdır.
        </p>

        <Link href="/">
          <motion.button
            className="flex items-center space-x-2 px-6 py-3 glass rounded-xl text-accent-primary hover:bg-accent-primary hover:text-bg-primary transition-all duration-300 font-semibold mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Ana Sayfaya Dön</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

