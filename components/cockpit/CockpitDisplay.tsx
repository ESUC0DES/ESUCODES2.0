'use client'

import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

interface CockpitDisplayProps {
  status: 'online' | 'maintenance' | 'offline'
  lastUpdate: string
}

export default function CockpitDisplay({
  status,
  lastUpdate,
}: CockpitDisplayProps) {
  const isOnline = status === 'online'
  const isOffline = status === 'offline'

  return (
    <div className="bg-[#050505] border-2 border-[#334155] p-8 relative overflow-hidden">
      {/* Status Indicator Rings */}
      {isOnline && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-[#10b981]"
              style={{
                width: `${200 + i * 60}px`,
                height: `${200 + i * 60}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Static Noise for Offline */}
      {isOffline && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random(),
              }}
            />
          ))}
        </div>
      )}

      {/* Robot Display */}
      <div className="relative z-10 flex flex-col items-center justify-center h-64">
        <div
          className={`relative ${
            isOnline
              ? 'text-[#10b981]'
              : isOffline
                ? 'text-[#334155] grayscale'
                : 'text-[#f59e0b]'
          } transition-all duration-300`}
        >
          <Bot className="w-32 h-32" />
        </div>

        {/* Status Text */}
        <div className="mt-6 text-center">
          <p
            className={`text-2xl font-bold uppercase tracking-wider ${
              isOnline
                ? 'text-[#10b981]'
                : isOffline
                  ? 'text-[#ef4444]'
                  : 'text-[#f59e0b]'
            }`}
          >
            {status === 'online' && '🟢 ONLINE'}
            {status === 'maintenance' && '🟡 MAINTENANCE'}
            {status === 'offline' && '🔴 OFFLINE'}
          </p>
          <p className="text-[#334155] text-sm mt-2 font-mono">
            Last sync: {lastUpdate}
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#10b981]" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#10b981]" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#10b981]" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#10b981]" />
    </div>
  )
}

