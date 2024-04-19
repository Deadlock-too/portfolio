import Boundary from '@/components/boundary'
import Heading from '@/components/heading'
import Image, { StaticImageData } from 'next/image'

type ExperienceProps = {
  heading: string
  items: {
    title: string
    timePeriod: string
    institution: string
    institutionLogo?: StaticImageData
    description: string
  }[]
}

export default function Experience({ heading, items } : ExperienceProps)
 {
  return (
    <Boundary>
      <Heading as="h2" size="lg" className="focus-in-expand">
        { heading }
      </Heading>
      {
        items.map((item, index) => (
          <div key={index} className="text-focus-in ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
            <Heading as="h3" size="sm">
              { item.title }
            </Heading>
            <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
              <span>{item.timePeriod}</span>{" "}
              <span className="text-3xl font-extralight">/</span>{" "}
              <span>{item.institution}</span>
              {
                item.institutionLogo && (
                  <span>
                    <Image src={item.institutionLogo} width={80} height={80} alt={`${item.institution} Logo`} />
                  </span>
                )
              }
            </div>
            <div className="prose prrose-lg prose-invert mt-4">
              { item.description }
            </div>
          </div>
        ))
      }
    </Boundary>
  )
}