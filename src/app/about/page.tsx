import TechList from '@/components/tech-list'
import AboutMe from '@/components/about-me'
import Experience from '@/components/experience'
import data from '@/data/data.json'
import Passions from '@/components/passions'
import React, { Suspense } from 'react'
import PassionsSkeleton from '@/components/passions/skeleton'

const title: string = 'About me'
const description: string = 'My tech stack and experiences'

export const metadata = {
  title: title,
  description: description,
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

export default async function About() {
  const experience = data.experience
  const passions = data.passions

  return (
    <main>
      <AboutMe />
      <TechList />
      <Experience
        heading={'Experience'}
        items={experience.workExperience}
        shortDate={false}
      />
      <Experience
        heading={'Education'}
        items={experience.education}
        shortDate={true}
      />
      <Suspense fallback={<PassionsSkeleton />}>
        <Passions
          heading={'My passions'}
          items={passions}
        />
      </Suspense>
    </main>
  )
}
