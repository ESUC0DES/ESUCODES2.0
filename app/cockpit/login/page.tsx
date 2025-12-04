'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'

export default function CockpitLogin() {
  const [accessCode, setAccessCode] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [typingText, setTypingText] = useState('')
  const [isDenied, setIsDenied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const fullText = 'ESTABLISHING SECURE CONNECTION...'
  const correctCode = process.env.NEXT_PUBLIC_COCKPIT_ACCESS_CODE || 'PANKEK2024'

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypingText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [isTyping])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (accessCode === correctCode) {
      // Store access token
      sessionStorage.setItem('cockpit_access', 'granted')
      router.push('/cockpit')
    } else {
      setIsDenied(true)
      setIsProcessing(false)
      setAccessCode('')
      
      // Reset denial after 2 seconds
      setTimeout(() => {
        setIsDenied(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-[#10b981]/10"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'linear',
            }}
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md px-8"
      >
        {/* Terminal Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Terminal className="w-8 h-8 text-[#10b981]" />
            <h1 className="text-3xl font-bold text-[#10b981] tracking-wider">
              ESUCODES COCKPIT
            </h1>
          </div>
          <div className="h-8 flex items-center justify-center">
            {isTyping ? (
              <p className="text-[#10b981] text-sm">
                {typingText}
                <span className="animate-pulse">|</span>
              </p>
            ) : (
              <p className="text-[#10b981] text-sm">{fullText}</p>
            )}
          </div>
        </div>

        {/* Access Denied Flash */}
        <AnimatePresence>
          {isDenied && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#ef4444] flex items-center justify-center"
              style={{ zIndex: 20 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-4xl font-bold text-white mb-2">ACCESS DENIED</h2>
                <p className="text-white/80 font-mono">UNAUTHORIZED ACCESS ATTEMPT</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#10b981] text-sm mb-2 uppercase tracking-wider">
              ACCESS CODE
            </label>
            <div className="relative">
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full bg-[#050505] border-2 border-[#10b981] text-[#10b981] px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 focus:ring-offset-[#050505] transition-all"
                placeholder="> Enter access code..."
                disabled={isProcessing || isDenied}
                autoFocus
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-[#10b981] animate-pulse">|</span>
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isProcessing || isDenied || !accessCode}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#10b981] text-[#050505] font-bold py-4 px-6 uppercase tracking-wider border-2 border-[#10b981] hover:bg-[#050505] hover:text-[#10b981] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'PROCESSING...' : '>>> AUTHENTICATE'}
          </motion.button>
        </form>

        {/* Security Notice */}
        <p className="mt-8 text-center text-[#334155] text-xs font-mono">
          [SECURITY CLEARANCE REQUIRED]
        </p>
      </motion.div>
    </div>
  )
}

