'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function RoboticsHomeHero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'ESUCODES'

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 200)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 3D ESUCODES Animation Area */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          {/* 3D Text Effect */}
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-mono font-bold tracking-tighter">
            <span className="relative inline-block">
              {/* Main Text */}
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.5)]">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
              
              {/* 3D Shadow Layers */}
              <span
                className="absolute top-0 left-0 z-0 bg-gradient-to-r from-orange-600/30 via-orange-500/30 to-orange-700/30 bg-clip-text text-transparent"
                style={{
                  transform: 'translate(4px, 4px)',
                }}
              >
                {displayText}
              </span>
              <span
                className="absolute top-0 left-0 z-0 bg-gradient-to-r from-orange-700/20 via-orange-600/20 to-orange-800/20 bg-clip-text text-transparent"
                style={{
                  transform: 'translate(8px, 8px)',
                }}
              >
                {displayText}
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl font-mono text-sky-400 mb-4"
        >
          // ROBOTICS DIVISION
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg font-mono text-slate-400"
        >
          THE HANGAR
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <ChevronDown className="w-6 h-6 text-orange-500 mb-2" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  )
}


