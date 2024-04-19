"use client"

import Heading from '@/components/heading'
import Button from '@/components/button'
import Avatar from '@/components/avatar'
import profilePicture from '../../../public/images/1.jpg'
import Boundary from '@/components/boundary'

export default function AboutMe() {
  return (
    <Boundary>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h1" size="xl" className="focus-in-expand col-start-1">
          About me
        </Heading>
        <div className="text-focus-in prose prose-xl prose-slate prose-invert col-start-1">
          <p>Junior developer with almost 4 years of experience on back-end.</p>
          <p>My areas of expertise are C#, .NET, ASP.NET Boilerplate, Entity Framework, SQL, but I also have some
            knowledge of Javascript, Typescript and the React and Electron libraries.</p>
          <p>I approach work with a lot of commitment and enthusiasm, I consider myself a very curious person, always
            ready to improve by proactively listening to any constructive criticism. Once the objectives and the work
            context have been defined, I show good autonomy in its continuation.</p>
        </div>
        <Button className="text-focus-in" url={ 'https://drive.google.com/file/d/1UI6DLeAgdV8C2_s2csC4Jd9Qup61pkRp/view?usp=sharing' } label={ 'Resume' }/>
        <Avatar
          src={ profilePicture }
          alt="A picture of me"
          className="justify-self-center row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>
    </Boundary>
  )
}