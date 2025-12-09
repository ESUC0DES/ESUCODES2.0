'use client'

import { useEffect } from 'react'

export default function ConsoleHiring() {
  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    const style = [
      'color: #22d3ee',
      'font-size: 20px',
      'font-weight: bold',
      'font-family: monospace',
    ].join(';')

    console.log('%c🛑 DUR YOLCU!', style)
    console.log(
      '%cESUCODES kaynak kodlarındasın. Açık bulursan bize yaz.',
      'color: #818cf8; font-size: 14px; font-family: monospace;'
    )
    console.log(
      '%cİşe alım sürecimizde açık kaynak katkıları değerlendiriyoruz. 🚀',
      'color: #a78bfa; font-size: 12px; font-family: monospace;'
    )
  }, [])

  return null
}

