'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface BatterySliderProps {
  value: number
  onChange: (value: number) => void
}

export default function BatterySlider({ value, onChange }: BatterySliderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const getColor = (val: number) => {
    if (val <= 20) return '#ef4444' // Red
    if (val <= 50) return '#f59e0b' // Amber
    return '#10b981' // Green
  }

  const color = getColor(value)
  const filledWidth = (value / 100) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-[#10b981] text-sm uppercase tracking-wider font-bold">
          BATTERY LEVEL
        </label>
        <span
          className="text-2xl font-bold font-mono"
          style={{ color }}
        >
          {value}%
        </span>
      </div>

      {/* Custom Slider */}
      <div className="relative">
        <div
          className="w-full h-12 bg-[#050505] border-2 border-[#334155] relative overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
            onChange(Math.round(percentage))
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (isDragging) {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
              onChange(Math.round(percentage))
            }
          }}
        >
          {/* Filled Bar */}
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{
              width: `${filledWidth}%`,
              backgroundColor: color,
            }}
            initial={false}
            animate={{ width: `${filledWidth}%` }}
            transition={{ duration: 0.2 }}
          />

          {/* Battery Segments */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1 px-2">
              {[...Array(10)].map((_, i) => {
                const segmentValue = (i + 1) * 10
                const isFilled = value >= segmentValue
                return (
                  <div
                    key={i}
                    className={`flex-1 h-6 border ${
                      isFilled
                        ? 'border-transparent'
                        : 'border-[#334155] bg-[#050505]'
                    }`}
                    style={{
                      backgroundColor: isFilled ? color : 'transparent',
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* Value Indicator */}
          <motion.div
            className="absolute top-full mt-2 text-xs font-mono"
            style={{
              left: `${filledWidth}%`,
              color,
              transform: 'translateX(-50%)',
            }}
            animate={{ opacity: isDragging ? 1 : 0.7 }}
          >
            {value}%
          </motion.div>
        </div>
      </div>

      {/* Text Display */}
      <div className="flex items-center space-x-2 text-[#10b981] font-mono text-sm">
        <span>BATTERY:</span>
        <span className="flex-1 bg-[#050505] border border-[#334155] px-2 py-1">
          [{'|'.repeat(Math.floor(value / 10))}
          {'-'.repeat(10 - Math.floor(value / 10))}] {value}%
        </span>
      </div>
    </div>
  )
}

