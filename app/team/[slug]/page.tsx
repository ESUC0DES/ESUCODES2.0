import TeamMemberDetail from '@/components/team/TeamMemberDetail'

export default function TeamMemberPage({
  params,
}: {
  params: { slug: string }
}) {
  return <TeamMemberDetail slug={params.slug} />
}

