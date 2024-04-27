import Boundary from '@/components/boundary'
import Heading from '@/components/heading'

type ExperienceProps = {
  heading: string
  items: {
    title: string
    timePeriod: string
    institution: string
    description: string
    tags?: string[]
  }[]
}

export default function Experience({ heading, items }: ExperienceProps) {
  return (
    <Boundary>
      <Heading as="h2" size="lg" className="focus-in-expand">
        { heading }
      </Heading>
      {
        items.map((item, index) => (
          <div key={ index } className="text-focus-in ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
            <Heading as="h3" size="sm">
              { item.title }
            </Heading>
            <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
              <span>{ item.timePeriod }</span>{ ' ' }
              <span className="text-3xl font-extralight">/</span>{ ' ' }
              <span>{ item.institution }</span>
            </div>
            <div className="prose prose-lg prose-invert mt-4">
              { item.description }
            </div>
            <div className="flex flex-wrap md:justify-start gap-x-4 gap-y-2 text-sky-500 pt-4">
              {
                item.tags?.map((tag, index) => (
                  <span
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all cursor-default ease-in-out hover:scale-125"
                    key={ index }
                  >
                    { tag }
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }
    </Boundary>
  )
}