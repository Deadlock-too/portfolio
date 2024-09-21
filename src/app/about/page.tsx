import TechList from '@/components/tech-list'
import AboutMe from '@/components/about-me'
import Passions from '@/components/passions'
import React, { Suspense } from 'react'
import PassionsSkeleton from '@/components/passions/skeleton'
import { getEducation, getPassions, getTechList, getWorkExperience } from '@/data/db'
import Experiences from '@/components/experience'
import { Experience } from '@/types'

const title: string = 'About me'
const description: string = 'My tech stack and experiences'

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
        alt: title,
      },
    ],
  },
}

export default async function About() {
  let workExperience = await getWorkExperience().then((res) =>
    res.map((experience) => {
      return {
        title: experience.title,
        institution: experience.institution,
        description: experience.description,
        start: experience.startDate,
        end: experience.endDate,
        tags: experience.experienceTags.map((t) => t.tag),
      } as Experience
    }),
  )
  let education = await getEducation().then((res) =>
    res.map((experience) => {
      return {
        title: experience.title,
        institution: experience.institution,
        description: experience.description,
        start: experience.startDate,
        end: experience.endDate,
      } as Experience
    }),
  )
  const pass = await getPassions()
  const tech = await getTechList().then((res) =>
    res.map((t) => {
      return {
        name: t.name,
        color: t.color,
      }
    }),
  )

  return (
    <main>
      <AboutMe />
      <TechList items={tech} />
      <Experiences
        heading={'Experience'}
        items={workExperience}
        shortDate={false}
      />
      <Experiences
        heading={'Education'}
        items={education}
        shortDate={true}
      />
      <Suspense fallback={<PassionsSkeleton />}>
        <Passions
          heading={'My passions'}
          items={pass}
        />
      </Suspense>
    </main>
  )
}
