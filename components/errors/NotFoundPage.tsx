'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Home, Radio } from 'lucide-react'

export default function NotFoundPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 50, damping: 20 })
  const springY = useSpring(y, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const deltaX = (e.clientX - centerX) / 20
      const deltaY = (e.clientY - centerY) / 20
      x.set(deltaX)
      y.set(deltaY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary relative overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Astronaut */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="mb-8"
        >
          <div className="text-8xl mb-4">👨‍🚀</div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-primary">
            Bağlantı Koptu, Houston!
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
            Aradığınız sayfa uzay boşluğunda kaybolmuş görünüyor.
            Yerçekimsiz ortamda süzülen astronot gibi, bu sayfa da bulunamadı.
          </p>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/">
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 glass rounded-xl text-accent-primary hover:bg-accent-primary hover:text-bg-primary transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              <span>Ana Sayfaya Dön</span>
            </motion.button>
          </Link>
          <Link href="/blog">
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 glass rounded-xl text-text-secondary hover:text-accent-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Radio className="w-5 h-5" />
              <span>Blog'u Keşfet</span>
            </motion.button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

