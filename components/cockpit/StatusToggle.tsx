'use client'

import { motion } from 'framer-motion'

interface StatusToggleProps {
  value: 'online' | 'maintenance' | 'offline'
  onChange: (value: 'online' | 'maintenance' | 'offline') => void
}

export default function StatusToggle({ value, onChange }: StatusToggleProps) {
  const options: Array<{
    id: 'online' | 'maintenance' | 'offline'
    label: string
    emoji: string
    color: string
    glowColor: string
  }> = [
    {
      id: 'online',
      label: 'ONLINE',
      emoji: '🟢',
      color: 'text-[#10b981]',
      glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    },
    {
      id: 'maintenance',
      label: 'MAINTENANCE',
      emoji: '🟡',
      color: 'text-[#f59e0b]',
      glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    },
    {
      id: 'offline',
      label: 'OFFLINE',
      emoji: '🔴',
      color: 'text-[#ef4444]',
      glowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
    },
  ]

  return (
    <div className="space-y-4">
      <label className="block text-[#10b981] text-sm uppercase tracking-wider font-bold">
        SYSTEM STATUS
      </label>
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => {
          const isSelected = value === option.id
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative p-6 border-2 bg-[#050505] font-mono font-bold uppercase tracking-wider
                transition-all duration-300
                ${
                  isSelected
                    ? `${option.color} ${option.glowColor}`
                    : 'border-[#334155] text-[#334155] hover:border-[#10b981]/50'
                }
                ${
                  isSelected && option.id === 'online'
                    ? 'border-[#10b981]'
                    : isSelected && option.id === 'maintenance'
                      ? 'border-[#f59e0b]'
                      : isSelected && option.id === 'offline'
                        ? 'border-[#ef4444]'
                        : ''
                }
              `}
            >
              <div className="text-2xl mb-2">{option.emoji}</div>
              <div className="text-sm">{option.label}</div>
              {isSelected && (
                <motion.div
                  layoutId="selectedStatus"
                  className="absolute inset-0 border-2 border-current opacity-20"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

