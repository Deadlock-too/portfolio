import ContentIndex from '@/components/content-index'
import data from '@/data/data.json'
import { Content } from '@/types'

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

export default function Projects() {
  const projects = data.projects as Content[]

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
