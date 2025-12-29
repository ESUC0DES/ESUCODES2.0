'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CockpitDisplay from '@/components/cockpit/CockpitDisplay'
import TerminalLog from '@/components/cockpit/TerminalLog'
import {
  getRobotProjects,
  createRobotProject,
  updateRobotProject,
  type RobotProject,
  type RobotProjectStatus,
} from '@/actions/robot-projects'
import { checkAuth } from '@/app/robotics/cockpit/check-auth'

import TelemetryPanel from '@/components/robotics/TelemetryPanel'

export default function RoboticsCockpitPanel() {
  const router = useRouter()
  const [checkedAuth, setCheckedAuth] = useState(false)
  const [lastUpdate, setLastUpdate] = useState('Just now')
  const [projects, setProjects] = useState<RobotProject[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<RobotProject | null>(null)
  const [formStatus, setFormStatus] =
    useState<RobotProjectStatus>('planned')
  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formGithubUrl, setFormGithubUrl] = useState('')
  const [formTechnologies, setFormTechnologies] = useState<string>('')
  const [isSavingProject, setIsSavingProject] = useState(false)
  const [terminalLog, setTerminalLog] = useState<{
    message: string
    type: 'success' | 'error' | 'warning'
    isVisible: boolean
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  })

  // Auth kontrolü: Server-side session check using HttpOnly cookie
  useEffect(() => {
    const verifySession = async () => {
      const authenticated = await checkAuth()
      if (!authenticated) {
        router.push('/robotics/cockpit/login')
      } else {
        setCheckedAuth(true)
      }
    }
    verifySession()
  }, [router])

  // Projeleri yukle
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getRobotProjects()
        setProjects(data)
        setLastUpdate('Just now')
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
        showTerminalLog('FAILED TO LOAD PROJECTS', 'error')
      } finally {
        setIsLoadingProjects(false)
      }
    }

    if (checkedAuth) {
      loadProjects()
    }
  }, [checkedAuth])

  const showTerminalLog = (
    message: string,
    type: 'success' | 'error' | 'warning' = 'success'
  ) => {
    setTerminalLog({ message, type, isVisible: true })
    setTimeout(() => {
      setTerminalLog((prev) => ({ ...prev, isVisible: false }))
    }, 5000)
  }

  const handleOpenNewProject = () => {
    setEditingProject(null)
    setFormName('')
    setFormDescription('')
    setFormGithubUrl('')
    setFormTechnologies('')
    setFormStatus('planned')
    setIsModalOpen(true)
  }

  const handleEditProject = (project: RobotProject) => {
    setEditingProject(project)
    setFormName(project.name)
    setFormDescription(project.description)
    setFormGithubUrl(project.githubUrl || '')
    setFormTechnologies(project.technologies?.join(', ') || '')
    setFormStatus(project.status)
    setIsModalOpen(true)
  }

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) {
      showTerminalLog('PROJECT NAME REQUIRED', 'warning')
      return
    }

    setIsSavingProject(true)

    try {
      const techArray = formTechnologies.split(',').map(s => s.trim()).filter(s => s !== '')

      if (editingProject) {
        const updated = await updateRobotProject({
          ...editingProject,
          name: formName.trim(),
          description: formDescription.trim(),
          githubUrl: formGithubUrl.trim() || undefined,
          status: formStatus,
          technologies: techArray,
        })

        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        )
        showTerminalLog('PROJECT UPDATED', 'success')
      } else {
        const created = await createRobotProject({
          name: formName.trim(),
          description: formDescription.trim(),
          githubUrl: formGithubUrl.trim() || undefined,
          status: formStatus,
          technologies: techArray,
        })
        setProjects((prev) => [...prev, created])
        showTerminalLog('PROJECT CREATED', 'success')
      }

      setIsModalOpen(false)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      showTerminalLog('FAILED TO SAVE PROJECT', 'error')
    } finally {
      setIsSavingProject(false)
    }
  }

  if (!checkedAuth) {
    return null
  }

  return (
    <div className="min-h-screen p-8 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-[#10b981] mb-2 uppercase tracking-wider font-mono">
              HANGAR COCKPIT
            </h1>
            <p className="text-slate-400 font-mono text-sm">
              PROJECT CONTROL INTERFACE
            </p>
            <p className="text-slate-500 font-mono text-xs mt-1">
              Last sync: {lastUpdate}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenNewProject}
              className="px-4 py-2 bg-[#10b981] text-[#050505] font-mono text-xs uppercase tracking-wider border-2 border-[#10b981] hover:bg-[#050505] hover:text-[#10b981] transition-all duration-300"
            >
              + NEW PROJECT
            </button>
          </div>
        </motion.div>

        {/* Top: Robot Status & Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CockpitDisplay status="online" lastUpdate={lastUpdate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TelemetryPanel />
          </motion.div>
        </div>

        {/* Kanban Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {(['planned', 'in-progress', 'testing', 'completed'] as RobotProjectStatus[]).map(
            (columnStatus) => {
              const columnProjects = projects.filter(
                (p) => p.status === columnStatus
              )
              const title =
                columnStatus === 'planned'
                  ? 'PLANNED'
                  : columnStatus === 'in-progress'
                    ? 'IN PROGRESS'
                    : columnStatus === 'testing'
                      ? 'TESTING'
                      : 'COMPLETED'

              return (
                <div
                  key={columnStatus}
                  className="bg-[#050505] border-2 border-[#334155] p-4 flex flex-col min-h-[300px] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-[#334155] pb-2">
                    <h2 className="text-xs font-mono text-[#10b981] uppercase tracking-wider">
                      {title}
                    </h2>
                    <span className="text-[10px] font-mono text-[#334155]">
                      {columnProjects.length} items
                    </span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                    {isLoadingProjects && projects.length === 0 ? (
                      <p className="text-xs font-mono text-[#334155]">
                        Loading projects...
                      </p>
                    ) : columnProjects.length === 0 ? (
                      <p className="text-xs font-mono text-[#334155] italic">
                        No projects in this lane.
                      </p>
                    ) : (
                      columnProjects.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => handleEditProject(project)}
                          className="w-full text-left bg-[#050505]/50 border border-[#334155] hover:border-[#10b981] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300 p-3 font-mono text-xs group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[#10b981] font-semibold group-hover:text-white transition-colors">
                              {project.name}
                            </span>
                          </div>
                          <p className="text-slate-400 text-[10px] line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {project.technologies.slice(0, 3).map(tech => (
                                <span key={tech} className="text-[8px] bg-[#10b981]/10 text-[#10b981] px-1 py-0.5 border border-[#10b981]/20">
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-[8px] text-[#334155]">+{project.technologies.length - 3}</span>
                              )}
                            </div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )
            }
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
          <div className="w-full max-w-lg bg-[#050505] border-2 border-[#334155] p-6 font-mono">
            <h2 className="text-xl text-[#10b981] mb-4">
              {editingProject ? 'EDIT PROJECT' : 'NEW PROJECT'}
            </h2>
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-[#10b981] text-xs mb-1 uppercase tracking-wider">
                  NAME
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#050505] border-2 border-[#10b981] text-[#10b981] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 focus:ring-offset-[#050505]"
                  placeholder="PROJECT: PANKEK"
                />
              </div>

              <div>
                <label className="block text-[#10b981] text-xs mb-1 uppercase tracking-wider">
                  STATUS
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['planned', 'in-progress', 'testing', 'completed'] as RobotProjectStatus[]).map(
                    (s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormStatus(s)}
                        className={`px-3 py-2 text-[10px] border-2 transition-all duration-200 ${formStatus === s
                            ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10'
                            : 'border-[#334155] text-slate-500 hover:border-slate-500'
                          }`}
                      >
                        {s === 'planned'
                          ? 'PLANNED'
                          : s === 'in-progress'
                            ? 'IN PROGRESS'
                            : s === 'testing'
                              ? 'TESTING'
                              : 'COMPLETED'}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[#10b981] text-xs mb-1 uppercase tracking-wider">
                  DESCRIPTION
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#050505] border-2 border-[#334155] text-slate-300 px-3 py-2 text-xs focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                  rows={3}
                  placeholder="Short technical description..."
                />
              </div>

              <div>
                <label className="block text-[#10b981] text-xs mb-1 uppercase tracking-wider">
                  TECHNOLOGIES (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  value={formTechnologies}
                  onChange={(e) => setFormTechnologies(e.target.value)}
                  className="w-full bg-[#050505] border-2 border-[#334155] text-slate-300 px-3 py-2 text-xs focus:outline-none focus:border-[#10b981] transition-colors"
                  placeholder="ROS2, Python, Lidar..."
                />
              </div>

              <div>
                <label className="block text-[#10b981] text-xs mb-1 uppercase tracking-wider">
                  GITHUB REPO URL
                </label>
                <input
                  type="url"
                  value={formGithubUrl}
                  onChange={(e) => setFormGithubUrl(e.target.value)}
                  className="w-full bg-[#050505] border-2 border-[#334155] text-[#0ea5e9] px-3 py-2 text-xs focus:outline-none focus:border-[#10b981] transition-colors"
                  placeholder="https://github.com/esucodes/pankek"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border-2 border-[#334155] text-[#334155] text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="px-4 py-2 border-2 border-[#10b981] bg-[#10b981] text-[#050505] text-xs uppercase tracking-wider disabled:opacity-50"
                >
                  {isSavingProject ? 'SAVING...' : 'SAVE PROJECT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Terminal Log */}
      <TerminalLog
        message={terminalLog.message}
        type={terminalLog.type}
        isVisible={terminalLog.isVisible}
        onClose={() =>
          setTerminalLog((prev) => ({ ...prev, isVisible: false }))
        }
      />
    </div>
  )
}

