import ContentIndex from '@/components/content-index'
import data from '@/data/data.json'

export const metadata = {
  title: 'Blog',
  description: 'My blog posts about what I\'ve learned.'
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