'use client'

import Heading from '@/components/heading'
import Button from '@/components/button'
import Avatar from '@/components/avatar'
import profilePicture from '../../../public/images/1.jpg'
import Boundary from '@/components/boundary'
import { Highlight } from '@/components/highlight'

export default function AboutMe() {
  return (
    <Boundary>
      <section className='grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]'>
        <Heading
          as='h1'
          size='xl'
          className='focus-in-expand col-start-1'
        >
          About me
        </Heading>
        <div className='text-focus-in prose prose-xl prose-slate prose-invert col-start-1'>
          <p>
            Junior developer with more than <Highlight>4 years of experience</Highlight> on back-end.
          </p>
          <p>
            My areas of expertise are C#, .NET, ASP.NET Boilerplate, Entity Framework, SQL, but I also have some
            knowledge of Javascript, Typescript and the React and Electron libraries.
          </p>
          <p>
            I approach work with a lot of <Highlight delay={1.575}>commitment</Highlight> and{' '}
            <Highlight delay={2.325}>enthusiasm</Highlight>, I consider myself a very curious person, always ready to
            improve by proactively listening to any constructive criticism. Once the objectives and the work context
            have been defined, I show good <Highlight delay={3.075}>autonomy</Highlight> in its continuation.
          </p>
        </div>
        <Button
          className='text-focus-in'
          url={'https://drive.google.com/file/d/1UI6DLeAgdV8C2_s2csC4Jd9Qup61pkRp/view?usp=sharing'}
          label={'Resume'}
        />
        <Avatar
          src={profilePicture}
          alt='A picture of me'
          className='row-start-1 max-w-sm justify-self-center md:col-start-2 md:row-end-3'
        />
      </section>
    </Boundary>
  )
}
