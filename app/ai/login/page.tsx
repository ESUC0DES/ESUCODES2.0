'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Lock, Brain, Cpu, Network, Shield, Code2 } from 'lucide-react'
import { loginWithWordPress } from '@/actions/wp-auth'

export default function AILogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [systemLogs, setSystemLogs] = useState<string[]>([])
  const [neuralLayers, setNeuralLayers] = useState<number[]>([])

  const fullText = '[SYSTEM] INITIALIZING NEURAL AUTHENTICATION PROTOCOL v2.4.1...'

  // Neural network layer visualization
  useEffect(() => {
    const layers = [8, 12, 16, 12, 8]
    setNeuralLayers(layers)
  }, [])

  // System logs simulation
  useEffect(() => {
    const logs = [
      '[BOOT] Loading authentication modules...',
      '[NETWORK] Establishing secure connection...',
      '[CRYPTO] Initializing encryption protocols...',
      '[AI] Neural network ready',
      '[AUTH] Waiting for credentials...',
    ]
    
    let logIndex = 0
    const logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        setSystemLogs((prev) => [...prev, logs[logIndex]])
        logIndex++
      }
    }, 800)

    return () => clearInterval(logInterval)
  }, [])

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
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    setSystemLogs((prev) => [...prev, '[AUTH] Validating credentials...'])
    setSystemLogs((prev) => [...prev, '[API] POST /wp-json/wp/v2/users/me'])

    try {
      const result = await loginWithWordPress(username, password)

      if (result.success) {
        setSystemLogs((prev) => [...prev, '[SUCCESS] Authentication successful'])
        setSystemLogs((prev) => [...prev, '[SESSION] Token generated'])
        localStorage.setItem('admin_token', 'wp_admin')
        setTimeout(() => {
          router.push('/ai')
        }, 500)
      } else {
        setError(result.error || 'ACCESS DENIED')
        setSystemLogs((prev) => [...prev, '[ERROR] Authentication failed'])
        setIsLoading(false)
      }
    } catch (err) {
      console.error(err)
      setError('LOGIN FAILED')
      setSystemLogs((prev) => [...prev, '[ERROR] System exception occurred'])
      setIsLoading(false)
    }
  }

  // Matrix-like characters for background
  const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%@+-=*<>[]{}'

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black relative overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-white/30"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${-20 + (i * 3) % 100}%`,
            }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j} className="whitespace-pre">
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Neural Network Visualization */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {neuralLayers.map((nodeCount, layerIndex) => (
          <div
            key={layerIndex}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%, -50%) translateX(${(layerIndex - 2) * 200}px)`,
            }}
          >
            {Array.from({ length: nodeCount }).map((_, nodeIndex) => (
              <motion.div
                key={nodeIndex}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  top: `${(nodeIndex / (nodeCount - 1)) * 300 - 150}px`,
                  left: '0px',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl relative z-10"
      >
        <div className="border border-white/30 bg-black/90 backdrop-blur-xl p-0 relative overflow-hidden font-mono">
          {/* Terminal Header */}
          <div className="bg-white/5 border-b border-white/10 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-white/60 text-xs">
                <Terminal className="w-4 h-4 inline mr-2" />
                AI_CORE_TERMINAL v2.4.1
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-white/40">
              <div className="flex items-center space-x-1">
                <Cpu className="w-3 h-3" />
                <span>CPU: 12.4%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Network className="w-3 h-3" />
                <span>NET: OK</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>SEC: ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="p-8">

            {/* System Logs Terminal */}
            <div className="mb-6 bg-black/50 border border-white/10 p-4 rounded font-mono text-xs">
              <div className="text-white/40 mb-2 flex items-center space-x-2">
                <Code2 className="w-3 h-3" />
                <span>SYSTEM LOGS</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {systemLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-white/60"
                  >
                    <span className="text-white/40">$ </span>
                    {log}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="text-white/60">
                    <span className="text-white/40">$ </span>
                    {typingText}
                    <span className="animate-pulse text-white">|</span>
                  </div>
                )}
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <motion.div
                  className="w-12 h-12 rounded border-2 border-white flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    borderColor: ['rgba(255,255,255,1)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,1)'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-wider font-mono">
                    NEURAL AUTHENTICATION
                  </h1>
                  <p className="text-white/40 text-xs mt-1">ESUCODES AI CORE v2.4.1</p>
                </div>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 border border-red-500/50 bg-red-500/10 text-red-400 font-mono text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">[ERROR]</span>
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 text-xs mb-2 uppercase tracking-wider font-mono flex items-center space-x-2">
                  <span className="text-white/40">[INPUT]</span>
                  <span>WP_USERNAME</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/70 border border-white/20 text-white px-8 py-3 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all pl-8"
                    placeholder="username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-xs mb-2 uppercase tracking-wider font-mono flex items-center space-x-2">
                  <span className="text-white/40">[SECURE]</span>
                  <span>APP_PASSWORD</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/70 border border-white/20 text-white px-8 py-3 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all pl-8"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                className="w-full bg-white text-black font-bold py-4 px-6 uppercase tracking-wider border border-white hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-mono text-sm"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>[PROCESSING] AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4" />
                    <span>[EXECUTE] AUTHENTICATE</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-white/30 text-[10px] font-mono">
                <div className="flex items-center space-x-4">
                  <span>API: /wp-json/wp/v2/users/me</span>
                  <span>•</span>
                  <span>PROTOCOL: Basic Auth</span>
                </div>
                <div>
                  <span>STATUS: {isLoading ? 'PROCESSING' : 'READY'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

