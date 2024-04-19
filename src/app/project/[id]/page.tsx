import ContentBody from '@/components/content-body'
import data from '@/data/data.json'
import { Content } from '@/types'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: {
  params: {
    id: string
  }
}) {
  const project = await (async () => {
    return (data.projects ?? [] as Content[]).find(project => project.id === params.id)
  })()

  if (!project) return {
    title: 'Project Not Found',
    description: 'This project does not exist.'
  }

  return {
    title: project.title,
    description: project.description,
  }
}

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