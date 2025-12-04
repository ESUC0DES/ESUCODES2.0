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

  // Auth kontrolü: WordPress admin login'inden gelen token
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/robotics/cockpit/login')
    } else {
      setCheckedAuth(true)
    }
  }, [router])

  // Projeleri yukle
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getRobotProjects()
        setProjects(data)
        setLastUpdate('Just now')
      } catch (error) {
        console.error(error)
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
    setFormStatus('planned')
    setIsModalOpen(true)
  }

  const handleEditProject = (project: RobotProject) => {
    setEditingProject(project)
    setFormName(project.name)
    setFormDescription(project.description)
    setFormGithubUrl(project.githubUrl || '')
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
      if (editingProject) {
        const updated = await updateRobotProject({
          ...editingProject,
          name: formName.trim(),
          description: formDescription.trim(),
          githubUrl: formGithubUrl.trim() || undefined,
          status: formStatus,
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
        })
        setProjects((prev) => [...prev, created])
        showTerminalLog('PROJECT CREATED', 'success')
      }

      setIsModalOpen(false)
    } catch (error) {
      console.error(error)
      showTerminalLog('FAILED TO SAVE PROJECT', 'error')
    } finally {
      setIsSavingProject(false)
    }
  }

  if (!checkedAuth) {
    return null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-[#10b981] mb-2 uppercase tracking-wider">
              HANGAR COCKPIT
            </h1>
            <p className="text-[#334155] font-mono text-sm">
              PROJECT CONTROL INTERFACE
            </p>
            <p className="text-[#334155] font-mono text-xs mt-1">
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

        {/* Top: Robot Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <CockpitDisplay status="online" lastUpdate={lastUpdate} />
        </motion.div>

        {/* Kanban Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {(['planned', 'in-progress', 'completed'] as RobotProjectStatus[]).map(
            (columnStatus) => {
              const columnProjects = projects.filter(
                (p) => p.status === columnStatus
              )
              const title =
                columnStatus === 'planned'
                  ? 'PLANNED'
                  : columnStatus === 'in-progress'
                    ? 'IN PROGRESS'
                    : 'COMPLETED'

              return (
                <div
                  key={columnStatus}
                  className="bg-[#050505] border-2 border-[#334155] p-4 flex flex-col min-h-[260px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-mono text-[#10b981] uppercase tracking-wider">
                      {title}
                    </h2>
                    <span className="text-xs font-mono text-[#334155]">
                      {columnProjects.length} items
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {isLoadingProjects && projects.length === 0 ? (
                      <p className="text-xs font-mono text-[#334155]">
                        Loading projects...
                      </p>
                    ) : columnProjects.length === 0 ? (
                      <p className="text-xs font-mono text-[#334155]">
                        No projects in this lane.
                      </p>
                    ) : (
                      columnProjects.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => handleEditProject(project)}
                          className="w-full text-left bg-[#050505] border border-[#334155] hover:border-[#10b981] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 p-3 font-mono text-xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[#10b981] font-semibold">
                              {project.name}
                            </span>
                          </div>
                          <p className="text-[#94a3b8] text-[11px] line-clamp-3">
                            {project.description}
                          </p>
                          {project.githubUrl && (
                            <p className="mt-2 text-[10px] text-[#0ea5e9] truncate">
                              {project.githubUrl}
                            </p>
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
                <div className="flex gap-2">
                  {(['planned', 'in-progress', 'completed'] as RobotProjectStatus[]).map(
                    (s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormStatus(s)}
                        className={`flex-1 px-3 py-2 text-xs border-2 ${
                          formStatus === s
                            ? 'border-[#10b981] text-[#10b981]'
                            : 'border-[#334155] text-[#334155]'
                        }`}
                      >
                        {s === 'planned'
                          ? 'PLANNED'
                          : s === 'in-progress'
                            ? 'IN PROGRESS'
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
                  className="w-full bg-[#050505] border-2 border-[#334155] text-[#e5e7eb] px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 focus:ring-offset-[#050505] resize-none"
                  rows={3}
                  placeholder="Short technical description..."
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
                  className="w-full bg-[#050505] border-2 border-[#334155] text-[#0ea5e9] px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 focus:ring-offset-[#050505]"
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

