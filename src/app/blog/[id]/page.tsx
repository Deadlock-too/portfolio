import ContentBody from '@/components/content-body'
import { Content } from '@/types'
import data from '@/data/data.json'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: {
  params: {
    id: string
  }
}) {
  const blogPost = await (async () => {
    return (data.blogPosts ?? [] as Content[]).find(blog => blog.id === params.id)
  })()

  if (!blogPost) return {
    title: 'Blog Post Not Found',
    description: 'This blog post does not exist.'
  }

  return {
    title: blogPost.title,
    description: blogPost.description,
  }
}

export default function Blog({ params } : {
  params: {
    id: string
  }
}) {
  const blogPost = (data.blogPosts ?? [] as Content[]).find(blog => blog.id === params.id)

  if (!blogPost) notFound()

  return (
    <ContentBody contentType="blog" title={ blogPost.title } tags={ blogPost.tags } date={ new Date(blogPost.date) } content={blogPost.content} />
  )
}