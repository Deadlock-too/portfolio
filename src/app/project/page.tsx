import ContentIndex from '@/components/content-index'
import data from '@/data/data.json'
import { Content } from '@/types'

export default function Projects() {
  const projects = data.projects as Content[]

  return (
    <ContentIndex
      heading="Projects"
      contentType="project"
      description="The tech projects I've made"
      viewMoreText="View More"
      items={ projects }
    />
  )
}