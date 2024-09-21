import ContentIndex from '@/components/content-index'
import { getBlogPosts } from '@/data/db'
import { Content } from '@/types'

const title: string = 'Blog'
const description: string = "My blog posts about what I've learned."

export const metadata = {
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
        alt: 'Blog',
      },
    ],
  },
}

export default async function Blog() {
  const blogPosts = await getBlogPosts().then((res) =>
    res.map((blogPost) => {
      return {
        id: blogPost.id,
        title: blogPost.title,
        description: blogPost.description,
        date: blogPost.date,
        content: blogPost.content,
        tags: blogPost.blogPostTags.map((t) => t.tag),
      } as Content
    }),
  )

  return (
    <ContentIndex
      heading='Blog'
      contentType='blog'
      description="I write about what I've learned so others can benefit."
      viewMoreText='Read More'
      items={blogPosts}
    />
  )
}
