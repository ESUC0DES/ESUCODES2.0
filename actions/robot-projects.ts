'use server'

export type RobotProjectStatus = 'planned' | 'in-progress' | 'completed' | 'testing'

export interface RobotProject {
  id: string
  name: string
  status: RobotProjectStatus
  description: string
  githubUrl?: string
  technologies: string[]
  imageUrl?: string
  completedDate?: string
  specs?: {
    cpu?: string
    power?: string
    sensors?: string[]
  }
}

// WordPress Custom Post Type (CPT) yapısına uygun mock veri
const mockProjects: RobotProject[] = [
  {
    id: 'pankek',
    name: 'PROJECT: PANKEK',
    status: 'in-progress',
    description: 'ROS2 ve Lidar destekli otonom navigasyon platformu. İç mekan haritalama ve engel sakınma yeteneklerine sahiptir.',
    githubUrl: 'https://github.com/esucodes/pankek',
    technologies: ['ROS2', 'Python', 'C++', 'Lidar', 'Raspberry Pi'],
    imageUrl: '/projects/pankek.jpg',
    specs: {
      cpu: 'Raspberry Pi 4B',
      power: '12V 5000mAh LiPo',
      sensors: ['RPLidar A1', 'Ultrasonic HC-SR04']
    }
  },
  {
    id: 'sentry',
    name: 'PROJECT: SENTRY',
    status: 'planned',
    description: 'Yapay görme boru hattına sahip güvenlik devriye robotu. Hareket algılama ve yüz tanıma özellikleri planlanmaktadır.',
    technologies: ['OpenCV', 'TensorFlow', 'Python'],
    specs: {
      cpu: 'Jetson Nano',
      power: '12V 7000mAh LiPo',
      sensors: ['Intel RealSense', 'IMU']
    }
  },
  {
    id: 'lab-assistant',
    name: 'PROJECT: LAB ASSISTANT',
    status: 'completed',
    description: 'Tekrarlayan görevler için laboratuvar otomasyon ünitesi. Hassas konumlandırma ve nesne taşıma kapasitesi.',
    githubUrl: 'https://github.com/esucodes/lab-assistant',
    technologies: ['Arduino', 'C++', 'Stepper Motors'],
    completedDate: '2025-10-15',
    specs: {
      cpu: 'ESP32',
      power: '24V DC Adapter',
      sensors: ['Load Cell', 'Limit Switches']
    }
  },
]

export async function getRobotProjects(): Promise<RobotProject[]> {
  // Gelecekte: WordPress `robot_project` CPT API'si ile entegre edilecek.
  // const res = await fetch(`${process.env.WORDPRESS_API_URL}/robot_projects`)
  return mockProjects
}

export async function getRobotProjectById(id: string): Promise<RobotProject | null> {
  return mockProjects.find(p => p.id === id) || null
}

export async function createRobotProject(
  project: Omit<RobotProject, 'id'>
): Promise<RobotProject> {
  // WordPress API'sine POST isteği gönderilecek yer
  const id =
    project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') ||
    `proj-${Date.now()}`

  const created: RobotProject = { id, ...project }
  return created
}

export async function updateRobotProject(
  project: RobotProject
): Promise<RobotProject> {
  // WordPress API'sine PUT/PATCH isteği gönderilecek yer
  return project
}


