'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Battery, Cpu, Gauge, Activity } from 'lucide-react'

interface TelemetryData {
  battery: number
  cpuTemp: number
  rpm: number
  status: string
}

export default function TelemetryPanel() {
  const [data, setData] = useState<TelemetryData>({
    battery: 85,
    cpuTemp: 45,
    rpm: 1200,
    status: 'OPERATIONAL',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        battery: Math.floor(Math.random() * 21) + 80, // 80-100
        cpuTemp: Math.floor(Math.random() * 11) + 40, // 40-50
        rpm: Math.floor(Math.random() * 500) + 1000, // 1000-1500
        status: 'OPERATIONAL',
      })
    }, 2500) // Her 2.5 saniyede bir güncelle

    return () => clearInterval(interval)
  }, [])

  const telemetryCards = [
    {
      label: 'BATTERY',
      value: `${data.battery}%`,
      icon: Battery,
      color: 'text-orange-500',
    },
    {
      label: 'CPU TEMP',
      value: `${data.cpuTemp}°C`,
      icon: Cpu,
      color: 'text-sky-400',
    },
    {
      label: 'RPM',
      value: data.rpm.toLocaleString(),
      icon: Gauge,
      color: 'text-emerald-400',
    },
    {
      label: 'STATUS',
      value: data.status,
      icon: Activity,
      color: 'text-green-500',
    },
  ]

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-mono font-bold text-orange-500 mb-6">
        // TELEMETRY PANEL
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {telemetryCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-slate-950/50 border border-slate-800 rounded p-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {card.label}
                </span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <p className={`text-2xl font-mono font-bold ${card.color}`}>
                {card.value}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}


