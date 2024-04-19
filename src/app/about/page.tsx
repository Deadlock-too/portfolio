import TechList from '@/components/tech-list'
import AboutMe from '@/components/about-me'
import Experience from '@/components/experience'
import data from '@/data/data.json'

export default function About() {
  const experience = data.experience
  return (
    <>
      <AboutMe/>
      <TechList/>
      <Experience heading={ 'Experience' } items={ experience.workExperience }/>
      <Experience heading={ 'Education' } items={ experience.education }/>
    </>
  )
}