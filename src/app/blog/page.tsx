import ContentIndex from '@/components/content-index'
import data from '@/data/data.json'

const title: string = 'Blog'
const description: string = 'My blog posts about what I\'ve learned.'

export const metadata = {
  title: title,
  description: description,
  openGraph: {
    images: [
      {
        url: `https://craescustefangabriel.com/api/og?${ new URLSearchParams({
          title: title,
          description: description
        }) }`,
        width: 1200,
        height: 630,
        alt: 'Blog',
      }
    ]
  }
}

export default function Blog() {
  const blogPosts = data.blogPosts

  return (
    <ContentIndex
      heading="Blog"
      contentType="blog"
      description="I write about what I've learned so others can benefit."
      viewMoreText="Read More"
      items={ blogPosts }
    />
  )
}