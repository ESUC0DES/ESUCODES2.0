import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary': '#0f172a',      // Ana Arkaplan - Slate 900
        'bg-secondary': '#1e293b',    // Kartlar/Paneller - Slate 800
        'bg-tertiary': '#334155',     // Hover durumları - Slate 700
        
        // Typography
        'text-primary': '#f1f5f9',    // Ana Metin - Slate 100
        'text-secondary': '#cbd5e1',  // Alt Metin - Slate 300
        'text-muted': '#64748b',      // Pasif Metin - Slate 500
        
        // Accents
        'accent-primary': '#818cf8',   // Ana Vurgu/Linkler - Indigo 400
        'accent-secondary': '#a78bfa', // İkincil Vurgu - Violet 400
        'accent-tertiary': '#22d3ee',  // Siber Güvenlik Vurgusu - Cyan 400
        
        // Galactic Gradients
        'galactic-purple': '#8b5cf6',
        'galactic-pink': '#ec4899',
        'galactic-blue': '#06b6d4',
      },
      backgroundImage: {
        'galactic-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)',
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config

