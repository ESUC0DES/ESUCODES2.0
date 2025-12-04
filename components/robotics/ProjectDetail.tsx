'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  FileText,
  Code,
  GitCommit,
  Cpu,
  Zap,
  Target,
  Package,
} from 'lucide-react'

interface Project {
  id: string
  name: string
  status: 'operational' | 'in-progress' | 'maintenance'
  description: string
}

interface Activity {
  id: string
  type: 'commit' | 'file' | 'code'
  title: string
  description: string
  date: string
  author: string
}

interface RobotPart {
  id: string
  name: string
  type: string
  status: string
}

const projects: Record<string, Project> = {
  PANKEK: {
    id: 'PANKEK',
    name: 'PROJECT: PANKEK',
    status: 'operational',
    description: 'Autonomous navigation robot with Lidar and ROS2 integration',
  },
  SENTRY: {
    id: 'SENTRY',
    name: 'PROJECT: SENTRY',
    status: 'in-progress',
    description: 'Security patrol robot with AI-powered threat detection',
  },
  DELIVERY: {
    id: 'DELIVERY',
    name: 'PROJECT: DELIVERY',
    status: 'in-progress',
    description: 'Indoor delivery system with multi-floor navigation',
  },
  RESCUE: {
    id: 'RESCUE',
    name: 'PROJECT: RESCUE',
    status: 'maintenance',
    description: 'Search and rescue robot for disaster scenarios',
  },
  LAB: {
    id: 'LAB',
    name: 'PROJECT: LAB',
    status: 'operational',
    description: 'Laboratory assistant robot for automated testing',
  },
  EXPLORER: {
    id: 'EXPLORER',
    name: 'PROJECT: EXPLORER',
    status: 'in-progress',
    description: 'Exploration robot for mapping unknown environments',
  },
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'commit',
    title: 'feat: Lidar calibration improvements',
    description: 'Updated calibration parameters for better accuracy',
    date: '2024-02-15',
    author: 'Egemen Korkmaz',
  },
  {
    id: '2',
    type: 'file',
    title: 'docs: navigation_guide.md',
    description: 'Added comprehensive navigation documentation',
    date: '2024-02-14',
    author: 'Umut Zaif',
  },
  {
    id: '3',
    type: 'code',
    title: 'src/motor_control.py',
    description: 'Optimized motor control algorithm',
    date: '2024-02-13',
    author: 'Selameddin Tirit',
  },
  {
    id: '4',
    type: 'commit',
    title: 'fix: ROS2 node communication',
    description: 'Fixed message queue overflow issue',
    date: '2024-02-12',
    author: 'Egemen Korkmaz',
  },
]

const mockParts: RobotPart[] = [
  { id: '1', name: 'Raspberry Pi 4', type: 'CPU', status: 'operational' },
  { id: '2', name: 'Lidar Sensor', type: 'Sensor', status: 'operational' },
  { id: '3', name: 'Ultrasonic Array', type: 'Sensor', status: 'operational' },
  { id: '4', name: 'Motor Controller', type: 'Control', status: 'operational' },
  { id: '5', name: '12V LiPo Battery', type: 'Power', status: 'operational' },
  { id: '6', name: 'Chassis Frame', type: 'Structure', status: 'operational' },
]

export default function ProjectDetail({ projectId }: { projectId: string }) {
  const project = projects[projectId]
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      setRotation((prev) => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5,
      }))

      setLastMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setLastMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove)
      containerRef.current.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
        containerRef.current.removeEventListener('mousedown', handleMouseDown)
      }
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, lastMousePos, project])

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-orange-500 mb-4">
            PROJECT NOT FOUND
          </h1>
          <Link
            href="/robotics"
            className="text-sky-400 hover:text-orange-500 font-mono"
          >
            {'<'} Return to Projects
          </Link>
        </div>
      </div>
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return GitCommit
      case 'file':
        return FileText
      case 'code':
        return Code
      default:
        return FileText
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'commit':
        return 'text-emerald-400'
      case 'file':
        return 'text-sky-400'
      case 'code':
        return 'text-orange-400'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
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

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Back Button */}
        <Link href="/robotics">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sky-400 hover:text-orange-500 transition-colors mb-8 font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{'<'} BACK TO PROJECTS</span>
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-mono font-bold text-orange-500 mb-4">
            {project.name}
          </h1>
          <p className="text-sky-400 font-mono text-lg">{project.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: 3D Model */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-mono font-bold text-orange-500 mb-4">
                // 3D MODEL VIEWER
              </h2>
              <div
                ref={containerRef}
                className="relative w-full h-96 border-2 border-dashed border-orange-500/50 rounded-lg bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing"
              >
                {/* 3D Model Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      rotateX: rotation.x,
                      rotateY: rotation.y,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    className="w-64 h-64 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="w-48 h-48 mx-auto border-2 border-orange-500/50 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-sky-500/10">
                        <Package className="w-24 h-24 text-orange-500/50" />
                      </div>
                      <p className="text-xs font-mono text-orange-500/70 mt-4">
                        [3D_MODEL_PLACEHOLDER]
                      </p>
                      <p className="text-xs font-mono text-slate-500 mt-2">
                        Click & Drag to Rotate
                      </p>
                    </div>
                  </motion.div>
                </div>

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
              </div>
            </div>
          </motion.div>

          {/* Right Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Status Card */}
            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-lg font-mono font-bold text-orange-500 mb-4">
                // STATUS
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono text-sm">Status:</span>
                  <span className="text-orange-500 font-mono font-bold uppercase">
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Robot Parts */}
            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-lg font-mono font-bold text-orange-500 mb-4">
                // COMPONENTS
              </h3>
              <div className="space-y-3">
                {mockParts.map((part) => (
                  <div
                    key={part.id}
                    className="flex items-center justify-between p-3 bg-slate-950/50 rounded border border-slate-800"
                  >
                    <div>
                      <p className="text-sky-400 font-mono text-sm font-bold">
                        {part.name}
                      </p>
                      <p className="text-slate-500 font-mono text-xs">{part.type}</p>
                    </div>
                    <span className="text-emerald-400 font-mono text-xs uppercase">
                      {part.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-mono font-bold text-orange-500 mb-6">
              // RECENT ACTIVITY
            </h2>
            <div className="space-y-4">
              {mockActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type)
                const color = getActivityColor(activity.type)
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-slate-950/50 rounded border border-slate-800 hover:border-orange-500/50 transition-colors"
                  >
                    <div className={`${color} mt-1`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`${color} font-mono font-bold text-sm mb-1`}>
                        {activity.title}
                      </h4>
                      <p className="text-slate-400 font-mono text-xs mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-4 text-slate-500 font-mono text-xs">
                        <span>{activity.author}</span>
                        <span>•</span>
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


