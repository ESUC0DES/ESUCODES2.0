'use client'

import { motion } from 'framer-motion'
import { Bot, Cpu, Zap, Target } from 'lucide-react'

export default function Robot3DSection() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: 3D Model Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 border-2 border-dashed border-orange-500/50 rounded-lg bg-slate-900/30 overflow-hidden">
              {/* 3D Model Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-64 h-64 flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <Bot className="w-48 h-48 text-orange-500/50" />
                </motion.div>
              </div>

              {/* Animated Grid Overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(251, 146, 60, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(251, 146, 60, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* Corner Decorations */}
              <div className="absolute top-3 left-3 w-6 h-6">
                <div className="absolute top-0 left-0 w-3 h-0.5 bg-orange-500" />
                <div className="absolute top-0 left-0 w-0.5 h-3 bg-orange-500" />
              </div>
              <div className="absolute top-3 right-3 w-6 h-6">
                <div className="absolute top-0 right-0 w-3 h-0.5 bg-orange-500" />
                <div className="absolute top-0 right-0 w-0.5 h-3 bg-orange-500" />
              </div>
              <div className="absolute bottom-3 left-3 w-6 h-6">
                <div className="absolute bottom-0 left-0 w-3 h-0.5 bg-orange-500" />
                <div className="absolute bottom-0 left-0 w-0.5 h-3 bg-orange-500" />
              </div>
              <div className="absolute bottom-3 right-3 w-6 h-6">
                <div className="absolute bottom-0 right-0 w-3 h-0.5 bg-orange-500" />
                <div className="absolute bottom-0 right-0 w-0.5 h-3 bg-orange-500" />
              </div>

              {/* Label */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <span className="text-xs font-mono text-orange-500/70">
                  [3D_MODEL_VIEWER]
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-mono font-bold text-orange-500 mb-4">
                // ROBOT SPECS
              </h2>
              <p className="text-sky-400 font-mono text-lg mb-6">
                Advanced autonomous systems powered by ROS2
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Cpu className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    CPU
                  </span>
                </div>
                <p className="text-xl font-mono font-bold text-orange-500">
                  Raspberry Pi 4
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    POWER
                  </span>
                </div>
                <p className="text-xl font-mono font-bold text-orange-500">
                  12V LiPo
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    SENSORS
                  </span>
                </div>
                <p className="text-xl font-mono font-bold text-orange-500">
                  Lidar + US
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    FRAMEWORK
                  </span>
                </div>
                <p className="text-xl font-mono font-bold text-orange-500">
                  ROS2
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-900/30 border-l-4 border-orange-500 pl-6 py-4">
              <p className="text-slate-300 font-mono text-sm leading-relaxed">
                Our robotics division focuses on developing autonomous systems
                for real-world applications. Each project undergoes rigorous
                testing and continuous improvement cycles.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


