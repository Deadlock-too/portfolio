import ContentBody from '@/components/content-body'
import { notFound } from 'next/navigation'
import { getProject } from '@/data/db'

export async function generateMetadata({
  params,
}: {
  params: {
    id: string
  }
}) {
  const project = await getProject(params.id).then((res) => {
    if (!res) return null

    return {
      id: res.id,
      title: res.name,
      description: res.description,
      date: res.startDate,
      tags: res.projectTags.map((t) => t.tag),
      content: res.content,
      url: res.url,
    }
  })

  let title: string
  let description: string

  if (project) {
    title = project.title
    description = project.description
  } else {
    title = 'Project Not Found'
    description = 'This project does not exist.'
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

export default async function Project({
  params,
}: {
  params: {
    id: string
  }
}) {
  const project = await getProject(params.id).then((res) => {
    if (!res) return null

    return {
      id: res.id,
      title: res.name,
      description: res.description,
      date: res.startDate,
      tags: res.projectTags.map((t) => t.tag),
      content: res.content,
      url: res.url,
    }
  })

  if (!project) notFound()

  return (
    <ContentBody
      contentType='project'
      title={project.title}
      tags={project.tags}
      date={new Date(project.date)}
      content={project.content}
      link={project.url}
    />
  )
}
