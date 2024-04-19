import ContentBody from '@/components/content-body'
import data from '@/data/data.json'
import { Content } from '@/types'
import { notFound } from 'next/navigation'

export default function Project({ params }: {
  params: {
    id: string
  }
}) {
  const project = (data.projects ?? [] as Content[]).find(project => project.id === params.id)

  if (!project) notFound()

  return (
    <ContentBody contentType="project" title={ project.title } tags={ project.tags }
                 date={ new Date(project.startDate) } content={ project.content } link={ project.url }/>
  )
}