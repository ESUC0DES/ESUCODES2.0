export interface TeamMember {
  slug: string
  name: string
  role: string
  avatar: string
  bio: string
  skills: string[]
  skillsDetailed?: { [key: string]: number }
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  projects?: Array<{
    name: string
    description: string
  }>
  effect?: 'glitch' | 'matrix' | 'rgb'
  customization?: {
    backgroundColor?: string
    backgroundImage?: string
    backgroundOverlay?: string // rgba veya hex renk
    backgroundPosition?: string // 'center', 'top', 'bottom' vb.
    backgroundSize?: string // 'cover', 'contain', 'auto' vb.
  }
}

export const teamMembers: TeamMember[] = [
  {
    slug: 'UmutZaif',
    name: 'Umut Zaif',
    role: 'ESUCODES CTO',
    avatar: '/avatar1.jpg',
    bio: 'Modern web teknolojileri uzmanı',
    skills: ['C++', 'Arduino', 'Takım Çalışması'],
    skillsDetailed: {
      'C++': 90,
      'Arduino': 85,
      'Takım Çalışması': 80,
      'Embedded Systems': 75,
      'Problem Çözme': 85,
    },
    social: {
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com',
      twitter: 'https://twitter.com',
    },
    projects: [
      {
        name: 'Embedded Systems Projesi',
        description: 'Arduino ve C++ kullanarak geliştirilen gömülü sistem projesi',
      },
      {
        name: 'IoT Çözümleri',
        description: 'Nesnelerin interneti için gelişmiş çözümler',
      },
    ],
    customization: {
      // backgroundColor: '#0f1419', // Örnek: Özel arka plan rengi
      // backgroundImage: '/images/umut-bg.jpg', // Örnek: Arka plan resmi
      // backgroundOverlay: 'rgba(15, 20, 25, 0.8)',
      // backgroundPosition: 'top',
      // backgroundSize: 'cover',
    },
  },
  {
    slug: 'EgemenKorkmaz',
    name: 'Egemen Korkmaz',
    role: 'ESUCODES CEO - CTO',
    avatar: '/images/image.png',
    bio: 'Bilgisayarla büyüdüm şimdi onları daha güvenli hale getirmeye çalışıyorum.',
    skills: ['Takım Çalışması', 'Frontend Dev.'],
    skillsDetailed: {
      'Öğrenme Merağı': 100,
      'Araştırma': 80,
      'Takım Çalışması': 60,
      'Bilgi Güvenliği': 70,
      'Frontend Geliştirme': 85,
      'Backend Geliştirme': 70,
    },
    social: {
      github: 'https://github.com/CikolataliPuding',
      linkedin: 'https://www.linkedin.com/in/egemen-korkmaz/',
      twitter: 'https://twitter.com',
    },
    projects: [
      {
        name: 'ESUCODES',
        description: 'Şu anda bulunduğunuz site',
      },
      {
        name: 'Güvenlik Denetim Sistemi',
        description: 'Kurumsal güvenlik denetimleri için otomatik sistem',
      },
      {
        name: 'PANKEK',
        description: 'Arkadaşlarımızla proje olarak planladığımız ve her geçen gün geliştirme planları yaptığımız bir robot projesi',
      },
    ],
    customization: {
      //backgroundColor: '#132758', // Siyah arka plan
      // backgroundImage: '/images/image.png', // Örnek: Arka plan resmi
      // backgroundOverlay: 'rgba(10, 10, 15, 0.7)', // Örnek: Resim üzerine overlay
      // backgroundPosition: 'center',
      // backgroundSize: 'cover',
    },
  },
  { 
    slug: 'SelameddinTirit',
    name: 'Selameddin Tirit',
    role: 'ESUCODES CTO',
    avatar: '/avatar3.jpg',
    bio: 'Yüksek performanslı backend sistemleri geliştirir',
    skills: ['JAVA', 'Backend', 'Takım Çalışması'],
    skillsDetailed: {
      'JAVA': 65,
      'Backend Geliştirme': 40,
      'Takım Çalışması': 98,
      'AI Geliştirme': 50,
      'API Tasarımı': 70,
      'Performans Optimizasyonu': 90,
    },
    social: {
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com',
      twitter: 'https://twitter.com',
    },
    projects: [
      {
        name: 'Yüksek Performanslı Backend',
        description: 'Ölçeklenebilir ve hızlı backend sistemleri',
      },
      {
        name: 'Mikroservis Mimarisi',
        description: 'Modern mikroservis mimarisi ile geliştirilen sistemler',
      },
    ],
    customization: {
      // backgroundColor: '#1a1a2e', // Örnek: Özel arka plan rengi
      // backgroundImage: '/images/selameddin-bg.jpg', // Örnek: Arka plan resmi
      // backgroundOverlay: 'rgba(26, 26, 46, 0.75)',
      // backgroundPosition: 'center',
      // backgroundSize: 'cover',
    },
  },
]

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug)
}

