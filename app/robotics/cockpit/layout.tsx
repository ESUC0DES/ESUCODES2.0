import '../../globals.css'

export default function RoboticsCockpitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden font-mono">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Scanlines Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16, 185, 129, 0.1) 2px, rgba(16, 185, 129, 0.1) 4px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}


