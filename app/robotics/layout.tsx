import RoboticsHeader from '@/components/robotics/RoboticsHeader'
import RoboticsFooter from '@/components/robotics/RoboticsFooter'

export default function RoboticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <RoboticsHeader />
      <main className="min-h-screen">{children}</main>
      <RoboticsFooter />
    </>
  )
}

