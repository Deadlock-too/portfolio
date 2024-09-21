import ContentIndex from '@/components/content-index'
import { Content } from '@/types'
import { getProjects } from '@/data/db'

const title: string = 'Projects'
const description: string = 'My tech projects'

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
        alt: 'Projects',
      },
    ],
  },
}

export default async function Projects() {
  const projects = await getProjects().then((res) =>
    res.map((project) => {
      return {
        id: project.id,
        title: project.name,
        description: project.description,
        date: project.startDate,
        tags: project.projectTags.map((t) => t.tag),
      } as Content
    }),
  )

  return (
    <ContentIndex
      heading='Projects'
      contentType='project'
      description="The tech projects I've made"
      viewMoreText='View More'
      items={projects}
    />
  )
}
