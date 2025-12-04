'use server'

export type RobotProjectStatus = 'planned' | 'in-progress' | 'completed'

export interface RobotProject {
  id: string
  name: string
  status: RobotProjectStatus
  description: string
  githubUrl?: string
}

// Şimdilik mock veri kullanıyoruz. Daha sonra WordPress CPT ile bağlanacak.
const mockProjects: RobotProject[] = [
  {
    id: 'pankek',
    name: 'PROJECT: PANKEK',
    status: 'in-progress',
    description: 'Autonomous navigation platform with ROS2 and Lidar.',
    githubUrl: 'https://github.com/esucodes/pankek',
  },
  {
    id: 'sentry',
    name: 'PROJECT: SENTRY',
    status: 'planned',
    description: 'Security patrol robot with computer vision pipeline.',
  },
  {
    id: 'lab-assistant',
    name: 'PROJECT: LAB ASSISTANT',
    status: 'completed',
    description: 'Laboratory automation unit for repetitive tasks.',
    githubUrl: 'https://github.com/esucodes/lab-assistant',
  },
]

export async function getRobotProjects(): Promise<RobotProject[]> {
  // TODO: WordPress `robot_project` custom post type ile entegre et.
  return mockProjects
}

export async function createRobotProject(
  project: Omit<RobotProject, 'id'>
): Promise<RobotProject> {
  // TODO: WordPress'e POST istegi at.
  const id =
    project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') ||
    `proj-${Date.now()}`

  const created: RobotProject = { id, ...project }
  // Gerçekte burada WP'den dönen cevabı kullanacağız.
  return created
}

export async function updateRobotProject(
  project: RobotProject
): Promise<RobotProject> {
  // TODO: WordPress'e PUT/PATCH istegi at.
  return project
}


