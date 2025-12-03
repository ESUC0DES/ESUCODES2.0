import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'
import ConsoleHiring from '@/components/easter-eggs/ConsoleHiring'
import KonamiCodeProvider from '@/components/easter-eggs/KonamiCodeProvider'

export const metadata: Metadata = {
  title: 'ESUCODES | Explore Software Universe',
  description: 'Siber güvenlik ve yazılım odaklı, Galactic/Sci-Fi temalı dijital platform',
  keywords: ['software', 'cybersecurity', 'development', 'technology'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <KonamiCodeProvider>
          <ConsoleHiring />
          <ScrollProgress />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </KonamiCodeProvider>
      </body>
    </html>
  )
}

