import ContentBody from '@/components/content-body'
import { notFound } from 'next/navigation'
import { getBlogPost } from '@/data/db'

export async function generateMetadata({
  params,
}: {
  params: {
    id: string
  }
}) {
  const blogPost = await getBlogPost(params.id).then((res) => {
    if (!res) return null

    return {
      id: res.id,
      title: res.title,
      description: res.description,
      date: res.date,
      content: res.content,
      tags: res.blogPostTags.map((t) => t.tag),
    }
  })

  let title: string
  let description: string

  if (blogPost) {
    title = blogPost.title
    description = blogPost.description
  } else {
    title = 'Blog Post Not Found'
    description = 'This blog post does not exist.'
  }

  return {
    title: title,
    description: description,
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [
        {
          url: `https://craescustefangabriel.com/api/og?${new URLSearchParams({
            title: title,
            description: description,
            width: '1200',
            height: '675',
          })}`,
          width: 1200,
          height: 675,
          alt: title,
        },
      ],
    },
    openGraph: {
      images: [
        {
          url: `https://craescustefangabriel.com/api/og?${new URLSearchParams({
            title: title,
            description: description,
          })}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  }
}

export default async function Blog({
  params,
}: {
  params: {
    id: string
  }
}) {
  const blogPost = await getBlogPost(params.id).then((res) => {
    if (!res) return null

    return {
      id: res.id,
      title: res.title,
      description: res.description,
      date: res.date,
      content: res.content,
      tags: res.blogPostTags.map((t) => t.tag),
    }
  })

  if (!blogPost) notFound()

  return (
    <ContentBody
      contentType='blog'
      title={blogPost.title}
      tags={blogPost.tags}
      date={new Date(blogPost.date)}
      content={blogPost.content}
    />
  )
}
