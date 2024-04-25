import TechList from '@/components/tech-list'
import AboutMe from '@/components/about-me'
import Experience from '@/components/experience'
import data from '@/data/data.json'
import Passions from '@/components/passions'
import React, { Suspense } from 'react'
import PassionsSkeleton from '@/components/passions/skeleton'

export const metadata = {
  title: 'About me',
  description: 'About me page with my tech stack and experience.'
}

export default async function About() {
  const experience = data.experience
  const passions = data.passions

  return (
    <>
      <AboutMe/>
      <TechList/>
      <Experience heading={ 'Experience' } items={ experience.workExperience }/>
      <Experience heading={ 'Education' } items={ experience.education }/>
      <Suspense fallback={ <PassionsSkeleton /> }>
        <Passions
          heading={ 'My passions' }
          items={ passions }
        />
      </Suspense>
    </>
  )
}