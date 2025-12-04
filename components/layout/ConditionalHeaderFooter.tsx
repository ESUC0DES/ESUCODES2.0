'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ConditionalHeaderFooter({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isRoboticsPage = pathname?.startsWith('/robotics')

  return (
    <>
      {!isRoboticsPage && <Header />}
      {children}
      {!isRoboticsPage && <Footer />}
    </>
  )
}


