'use client'

import { motion } from 'framer-motion'

interface SpecItem {
  category: string
  items: string[]
}

const specifications: SpecItem[] = [
  {
    category: 'CORE',
    items: ['Raspberry Pi 4', 'ROS2'],
  },
  {
    category: 'SENSORS',
    items: ['Lidar', 'Ultrasonic'],
  },
  {
    category: 'CHASSIS',
    items: ['3D Printed ABS'],
  },
]

export default function SpecBlueprint() {
  return (
    <div className="bg-slate-950/30 border-2 border-slate-800 rounded-lg p-6 relative">
      {/* Title */}
      <h2 className="text-2xl font-mono font-bold text-orange-500 mb-6">
        // SPEC BLUEPRINT
      </h2>

      {/* Technical Drawing Grid Lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Corner Technical Marks */}
      <div className="absolute top-3 left-3 w-6 h-6">
        <div className="absolute top-0 left-0 w-3 h-0.5 bg-sky-400" />
        <div className="absolute top-0 left-0 w-0.5 h-3 bg-sky-400" />
      </div>
      <div className="absolute top-3 right-3 w-6 h-6">
        <div className="absolute top-0 right-0 w-3 h-0.5 bg-sky-400" />
        <div className="absolute top-0 right-0 w-0.5 h-3 bg-sky-400" />
      </div>
      <div className="absolute bottom-3 left-3 w-6 h-6">
        <div className="absolute bottom-0 left-0 w-3 h-0.5 bg-sky-400" />
        <div className="absolute bottom-0 left-0 w-0.5 h-3 bg-sky-400" />
      </div>
      <div className="absolute bottom-3 right-3 w-6 h-6">
        <div className="absolute bottom-0 right-0 w-3 h-0.5 bg-sky-400" />
        <div className="absolute bottom-0 right-0 w-0.5 h-3 bg-sky-400" />
      </div>

      {/* Specifications List */}
      <div className="relative z-10 space-y-4">
        {specifications.map((spec, index) => (
          <motion.div
            key={spec.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-l-2 border-sky-400/50 pl-4 py-2"
          >
            <h3 className="text-lg font-mono font-bold text-sky-400 mb-2 uppercase tracking-wider">
              {spec.category}
            </h3>
            <ul className="space-y-1">
              {spec.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-sm font-mono text-slate-300 flex items-center"
                >
                  <span className="text-orange-500 mr-2">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom Technical Mark */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-0.5 bg-sky-400/50" />
          <span className="text-xs font-mono text-sky-400/50">
            TECHNICAL SPECIFICATION
          </span>
          <div className="w-8 h-0.5 bg-sky-400/50" />
        </div>
      </div>
    </div>
  )
}


