import Boundary from '@/components/boundary'
import Heading from '@/components/heading'
import { formatDate } from '@/utils'

type ExperienceProps = {
  heading: string
  items: {
    title: string
    start: string
    end?: string
    institution: string
    description: string
    tags?: string[]
  }[]
  shortDate: boolean
}

export default function Experience({ heading, items, shortDate }: ExperienceProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: !shortDate ? 'long' : undefined,
    day: !shortDate ? '2-digit' : undefined
  }

  const locale = 'en-UK'

  return (
    <Boundary>
      <Heading as="h2" size="lg" className="focus-in-expand">
        { heading }
      </Heading>
      {
        items.map((item, index) => {
          const startDate = item.start ? new Date(item.start) : null
          const endDate = item.end ? new Date(item.end) : null
          if (!startDate) {
            return null
          }

          const start = formatDate(startDate, options, locale)
          const end = endDate ? formatDate(endDate, options, locale) : 'Present'

          return (
            <div key={ index } className="text-focus-in ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
              <Heading as="h3" size="sm">
                { item.title }
              </Heading>
              <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-yellow-500">
                <span>{ start } - { end }</span>{ ' ' }
                <span className="text-3xl font-extralight">/</span>{ ' ' }
                <span>{ item.institution }</span>
              </div>
              <div className="prose prose-lg prose-invert mt-4">
                { item.description }
              </div>
              <div className="flex flex-wrap md:justify-start gap-x-4 gap-y-2 text-yellow-500 pt-4">
                {
                  item.tags?.map((tag, index) => (
                    <span
                      className="inline-flex items-center rounded-full border bg-black/80 px-2.5 py-0.5 text-xs font-semibold transition-all cursor-default ease-in-out hover:scale-125"
                      key={ index }
                    >
                      { tag }
                    </span>
                  ))
                }
              </div>
            </div>
          )
        })
      }
    </Boundary>
  )
}