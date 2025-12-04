import ProjectDetail from '@/components/robotics/ProjectDetail'

export default function ProjectPage({
  params,
}: {
  params: { projectId: string }
}) {
  return <ProjectDetail projectId={params.projectId.toUpperCase()} />
}


