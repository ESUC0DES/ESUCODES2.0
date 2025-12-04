'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CockpitDisplay from '@/components/cockpit/CockpitDisplay'
import StatusToggle from '@/components/cockpit/StatusToggle'
import BatterySlider from '@/components/cockpit/BatterySlider'
import TerminalLog from '@/components/cockpit/TerminalLog'
import { updateRobotStats } from '@/actions/robot-actions'

export default function CockpitPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'online' | 'maintenance' | 'offline'>('online')
  const [battery, setBattery] = useState(80)
  const [coreMessage, setCoreMessage] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [terminalLog, setTerminalLog] = useState<{
    message: string
    type: 'success' | 'error' | 'warning'
    isVisible: boolean
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  })
  const [lastUpdate, setLastUpdate] = useState('Just now')

  // Check authentication
  useEffect(() => {
    const access = sessionStorage.getItem('cockpit_access')
    if (access !== 'granted') {
      router.push('/cockpit/login')
    }
  }, [router])

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [status, battery, coreMessage])

  const showTerminalLog = (
    message: string,
    type: 'success' | 'error' | 'warning' = 'success'
  ) => {
    setTerminalLog({ message, type, isVisible: true })
    setTimeout(() => {
      setTerminalLog((prev) => ({ ...prev, isVisible: false }))
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append('status', status)
      formData.append('battery', battery.toString())
      formData.append('coreMessage', coreMessage)

      const result = await updateRobotStats(formData)

      if (result.success) {
        setHasUnsavedChanges(false)
        setLastUpdate('Just now')
        showTerminalLog('SYSTEM UPDATED SUCCESSFULLY', 'success')
      } else {
        showTerminalLog(result.error || 'UPDATE FAILED', 'error')
      }
    } catch (error) {
      showTerminalLog('NETWORK ERROR: UNABLE TO CONNECT', 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#10b981] mb-2 uppercase tracking-wider">
            ROBOTICS COCKPIT
          </h1>
          <p className="text-[#334155] font-mono text-sm">
            MAINFRAME CONTROL INTERFACE
          </p>
          {hasUnsavedChanges && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#f59e0b] font-mono text-sm mt-2"
            >
              ⚠ UNSAVED CHANGES DETECTED
            </motion.p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel: Visual Status */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CockpitDisplay status={status} lastUpdate={lastUpdate} />
          </motion.div>

          {/* Right Panel: Control Unit */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status Toggle */}
              <div className="bg-[#050505] border-2 border-[#334155] p-6">
                <StatusToggle value={status} onChange={setStatus} />
              </div>

              {/* Battery Slider */}
              <div className="bg-[#050505] border-2 border-[#334155] p-6">
                <BatterySlider value={battery} onChange={setBattery} />
              </div>

              {/* Core Message */}
              <div className="bg-[#050505] border-2 border-[#334155] p-6">
                <label className="block text-[#10b981] text-sm mb-2 uppercase tracking-wider font-bold">
                  CORE MESSAGE
                </label>
                <textarea
                  value={coreMessage}
                  onChange={(e) => setCoreMessage(e.target.value)}
                  className="w-full bg-[#050505] border-2 border-[#10b981] text-[#10b981] px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 focus:ring-offset-[#050505] resize-none"
                  rows={4}
                  placeholder="> Enter current mission directive..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isProcessing || !hasUnsavedChanges}
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                className="w-full bg-[#10b981] text-[#050505] font-bold py-6 px-8 uppercase tracking-wider border-2 border-[#10b981] hover:bg-[#050505] hover:text-[#10b981] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-mono relative overflow-hidden"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span className="animate-spin">⟳</span>
                    <span>PROCESSING...</span>
                  </span>
                ) : (
                  '>>> UPLOAD TO MAINFRAME'
                )}
                {isProcessing && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-[#10b981]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                  />
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

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

