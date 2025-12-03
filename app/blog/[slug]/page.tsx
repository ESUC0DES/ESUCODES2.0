import BlogPost from '@/components/blog/BlogPost'

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  return <BlogPost slug={params.slug} />
}

