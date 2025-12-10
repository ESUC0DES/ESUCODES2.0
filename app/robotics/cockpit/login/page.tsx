'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Lock } from 'lucide-react'
import { loginWithWordPress } from '@/actions/wp-auth'
import { LoginSchema } from '@/lib/schemas/auth'

export default function RoboticsCockpitLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string
    password?: string
  }>({})

  const fullText = 'INITIALIZING HANGAR SECURITY PROTOCOL...'

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypingText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    // Client-side validation with Zod
    const validationResult = LoginSchema.safeParse({ username, password })

    if (!validationResult.success) {
      // Extract field-specific errors
      const errors: { username?: string; password?: string } = {}
      
      validationResult.error.errors.forEach((err) => {
        if (err.path[0] === 'username') {
          errors.username = err.message
        } else if (err.path[0] === 'password') {
          errors.password = err.message
        }
      })

      setFieldErrors(errors)
      return // Do not submit if validation fails
    }

    setIsLoading(true)

    try {
      const result = await loginWithWordPress(username, password)

      if (result.success) {
        // Session cookie set by server action - redirect to cockpit
        router.push('/robotics/cockpit')
      } else {
        setError(result.error || 'ACCESS DENIED')
        setIsLoading(false)
      }
    } catch (err) {
      console.error(err)
      setError('LOGIN FAILED')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="border-2 border-[#334155] bg-[#050505]/80 p-8 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full border-2 border-[#10b981] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#10b981]" />
            </div>
            <h1 className="text-3xl font-bold text-[#10b981] tracking-wider mb-2">
              HANGAR ACCESS
            </h1>
            <div className="h-6 flex items-center justify-center">
              {isTyping ? (
                <p className="text-[#10b981] text-xs">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </p>
              ) : (
                <p className="text-[#10b981] text-xs">{fullText}</p>
              )}
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 border border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444] font-mono text-xs text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#10b981] text-xs mb-2 uppercase tracking-wider">
                WORDPRESS USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (fieldErrors.username) {
                    setFieldErrors((prev) => ({ ...prev, username: undefined }))
                  }
                }}
                className={`w-full bg-[#050505] border-2 text-[#10b981] px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050505] ${
                  fieldErrors.username
                    ? 'border-[#ef4444] focus:ring-[#ef4444]'
                    : 'border-[#10b981] focus:ring-[#10b981]'
                }`}
                placeholder="> enter wp username"
                required
              />
              {fieldErrors.username && (
                <p className="mt-2 text-[#ef4444] text-xs font-mono">{fieldErrors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-[#10b981] text-xs mb-2 uppercase tracking-wider">
                APPLICATION PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password) {
                    setFieldErrors((prev) => ({ ...prev, password: undefined }))
                  }
                }}
                className={`w-full bg-[#050505] border-2 text-[#10b981] px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050505] ${
                  fieldErrors.password
                    ? 'border-[#ef4444] focus:ring-[#ef4444]'
                    : 'border-[#10b981] focus:ring-[#10b981]'
                }`}
                placeholder="> enter app password"
                required
              />
              {fieldErrors.password && (
                <p className="mt-2 text-[#ef4444] text-xs font-mono">{fieldErrors.password}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-[#10b981] text-[#050505] font-bold py-4 px-6 uppercase tracking-wider border-2 border-[#10b981] hover:bg-[#050505] hover:text-[#10b981] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#050505] border-t-transparent rounded-full animate-spin" />
                  <span>AUTHORIZING...</span>
                </>
              ) : (
                <>
                  <Terminal className="w-5 h-5" />
                  <span>>> ENTER COCKPIT</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer note */}
          <p className="mt-6 text-center text-[#334155] text-[11px] font-mono">
            USE WORDPRESS ADMIN CREDENTIALS (APPLICATION PASSWORD)
          </p>
        </div>
      </motion.div>
    </div>
  )
}


