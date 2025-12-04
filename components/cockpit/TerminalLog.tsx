'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

interface TerminalLogProps {
  message: string
  type: 'success' | 'error' | 'warning'
  isVisible: boolean
  onClose: () => void
}

export default function TerminalLog({
  message,
  type,
  isVisible,
  onClose,
}: TerminalLogProps) {
  const config = {
    success: {
      icon: CheckCircle2,
      color: 'text-[#10b981]',
      bgColor: 'bg-[#10b981]/10',
      borderColor: 'border-[#10b981]',
    },
    error: {
      icon: XCircle,
      color: 'text-[#ef4444]',
      bgColor: 'bg-[#ef4444]/10',
      borderColor: 'border-[#ef4444]',
    },
    warning: {
      icon: AlertCircle,
      color: 'text-[#f59e0b]',
      bgColor: 'bg-[#f59e0b]/10',
      borderColor: 'border-[#f59e0b]',
    },
  }

  const { icon: Icon, color, bgColor, borderColor } = config[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed top-4 right-4 ${bgColor} border-2 ${borderColor} p-4 font-mono text-sm max-w-md z-50`}
        >
          <div className="flex items-center space-x-3">
            <Icon className={`w-5 h-5 ${color}`} />
            <div className="flex-1">
              <p className={color}>{message}</p>
            </div>
            <button
              onClick={onClose}
              className={`${color} hover:opacity-70 transition-opacity`}
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

