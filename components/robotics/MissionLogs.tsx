'use client'

import { motion } from 'framer-motion'
import { FileText, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface MissionLog {
  id: string
  title: string
  date: string
  slug?: string
}

// Mock mission logs - İleride WordPress'ten çekilebilir
const missionLogs: MissionLog[] = [
  {
    id: 'LOG_2024_001',
    title: 'Autonomous_Navigation_Test.md',
    date: '2024-01-15',
    slug: 'autonomous-navigation-test',
  },
  {
    id: 'LOG_2024_002',
    title: 'Lidar_Calibration_Success.md',
    date: '2024-01-20',
    slug: 'lidar-calibration-success',
  },
  {
    id: 'LOG_2024_003',
    title: 'ROS2_Integration_Complete.md',
    date: '2024-02-01',
    slug: 'ros2-integration-complete',
  },
  {
    id: 'LOG_2024_004',
    title: 'Chassis_Assembly_Phase1.md',
    date: '2024-02-10',
    slug: 'chassis-assembly-phase1',
  },
]

export default function MissionLogs() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-mono font-bold text-orange-500 mb-6">
        // MISSION LOGS
      </h2>

      {/* Terminal Style List */}
      <div className="space-y-3">
        {missionLogs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {log.slug ? (
              <Link
                href={`/blog/${log.slug}`}
                className="block group"
              >
                <div className="flex items-center space-x-3 p-3 bg-slate-950/50 border border-slate-800 rounded hover:border-emerald-400/50 hover:bg-slate-950 transition-all duration-300">
                  <span className="text-emerald-400 font-mono text-sm">
                    {'>'}
                  </span>
                  <span className="text-emerald-400 font-mono text-sm flex-shrink-0">
                    [{log.id}]:
                  </span>
                  <FileText className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span className="text-sky-400 font-mono text-sm flex-grow group-hover:text-emerald-400 transition-colors">
                    {log.title}
                  </span>
                  <span className="text-slate-500 font-mono text-xs flex-shrink-0">
                    {log.date}
                  </span>
                  <ChevronRight className="w-4 h-4 text-emerald-400/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-3 p-3 bg-slate-950/50 border border-slate-800 rounded">
                <span className="text-emerald-400 font-mono text-sm">
                  {'>'}
                </span>
                <span className="text-emerald-400 font-mono text-sm flex-shrink-0">
                  [{log.id}]:
                </span>
                <FileText className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-sky-400 font-mono text-sm flex-grow">
                  {log.title}
                </span>
                <span className="text-slate-500 font-mono text-xs flex-shrink-0">
                  {log.date}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Terminal Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <p className="text-xs font-mono text-slate-500 text-center">
          [SYSTEM] {missionLogs.length} LOGS LOADED
        </p>
      </div>
    </div>
  )
}


