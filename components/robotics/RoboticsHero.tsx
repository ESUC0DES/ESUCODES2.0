'use client'

import { motion } from 'framer-motion'

export default function RoboticsHero() {
  return (
    <section className="mb-12">
      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold tracking-tighter text-orange-500 mb-4">
          PROJECT: PANKEK
        </h1>
        <p className="text-xl md:text-2xl font-mono text-sky-400">
          // SYSTEM STATUS: OPERATIONAL
        </p>
      </motion.div>

      {/* 3D Model Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-full h-64 md:h-96 lg:h-[500px] border-2 border-dashed border-slate-800 rounded-lg bg-slate-900/30 overflow-hidden"
      >
        {/* Placeholder Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 border-2 border-sky-400/50 rounded-lg flex items-center justify-center">
              <svg
                className="w-12 h-12 text-sky-400/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <p className="text-sky-400/70 font-mono text-sm">
              [3D_MODEL_PLACEHOLDER]
            </p>
            <p className="text-slate-500 font-mono text-xs mt-2">
              Spline Model Integration Area
            </p>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-500/50" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-orange-500/50" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-orange-500/50" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-500/50" />
      </motion.div>
    </section>
  )
}


