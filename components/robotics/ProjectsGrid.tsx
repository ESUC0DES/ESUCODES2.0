'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface Project {
  id: string
  name: string
  status: 'operational' | 'in-progress' | 'maintenance'
  description: string
}

const projects: Project[] = [
  {
    id: 'PANKEK',
    name: 'PROJECT: PANKEK',
    status: 'operational',
    description: 'Autonomous navigation robot with Lidar and ROS2 integration',
  },
  {
    id: 'SENTRY',
    name: 'PROJECT: SENTRY',
    status: 'in-progress',
    description: 'Security patrol robot with AI-powered threat detection',
  },
  {
    id: 'DELIVERY',
    name: 'PROJECT: DELIVERY',
    status: 'in-progress',
    description: 'Indoor delivery system with multi-floor navigation',
  },
  {
    id: 'RESCUE',
    name: 'PROJECT: RESCUE',
    status: 'maintenance',
    description: 'Search and rescue robot for disaster scenarios',
  },
  {
    id: 'LAB',
    name: 'PROJECT: LAB',
    status: 'operational',
    description: 'Laboratory assistant robot for automated testing',
  },
  {
    id: 'EXPLORER',
    name: 'PROJECT: EXPLORER',
    status: 'in-progress',
    description: 'Exploration robot for mapping unknown environments',
  },
]

const statusConfig = {
  operational: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/30',
    glowColor: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]',
  },
  'in-progress': {
    icon: Clock,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    glowColor: 'shadow-[0_0_20px_rgba(251,146,60,0.3)]',
  },
  maintenance: {
    icon: AlertCircle,
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
    borderColor: 'border-sky-400/30',
    glowColor: 'shadow-[0_0_20px_rgba(56,189,248,0.3)]',
  },
}

export default function ProjectsGrid() {
  return (
    <section className="py-20 bg-slate-950 relative">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-orange-500 mb-4">
            // ACTIVE PROJECTS
          </h2>
          <p className="text-sky-400 font-mono text-lg">
            SYSTEM STATUS: {projects.filter((p) => p.status === 'operational').length} OPERATIONAL
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const config = statusConfig[project.status]
            const Icon = config.icon

            return (
              <Link key={project.id} href={`/robotics/${project.id.toLowerCase()}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative cursor-pointer"
                >
                  <div
                    className={`
                    relative bg-slate-900/50 border rounded-lg p-6 h-full
                    ${config.borderColor}
                    transition-all duration-300
                    group-hover:${config.glowColor}
                    group-hover:border-opacity-100
                    overflow-hidden
                  `}
                  >
                  {/* Glow Effect on Hover */}
                  <div
                    className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    ${config.bgColor}
                    blur-xl
                  `}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`
                        flex items-center space-x-2 px-3 py-1 rounded-full
                        ${config.bgColor} ${config.color}
                        text-xs font-mono uppercase tracking-wider
                      `}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{project.status.replace('-', ' ')}</span>
                      </div>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-xl font-mono font-bold text-orange-500 mb-3 group-hover:text-orange-400 transition-colors">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed font-mono">
                      {project.description}
                    </p>

                    {/* Corner Decorations */}
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-orange-500/30 group-hover:border-orange-500 transition-colors" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-orange-500/30 group-hover:border-orange-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

