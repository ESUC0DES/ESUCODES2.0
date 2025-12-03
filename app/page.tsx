import Hero from '@/components/home/Hero'
import TechTicker from '@/components/home/TechTicker'
import LatestLogs from '@/components/home/LatestLogs'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TechTicker />
      <LatestLogs />
    </div>
  )
}

