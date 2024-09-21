import Boundary from '@/components/boundary'
import Heading from '@/components/heading'
import { formatDate } from '@/utils'
import { Experience } from '@/types'

type ExperienceProps = {
  heading: string
  items: Experience[]
  shortDate: boolean
}

export default function Experiences({ heading, items, shortDate }: ExperienceProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: !shortDate ? 'long' : undefined,
    day: !shortDate ? '2-digit' : undefined,
  }

  const locale = 'en-UK'

  return (
    <Boundary>
      <section>
        <Heading
          as='h2'
          size='lg'
          className='focus-in-expand'
        >
          {heading}
        </Heading>
        {items.map((item, index) => {
          const startDate = item.start ? new Date(item.start) : null
          const endDate = item.end ? new Date(item.end) : null
          if (!startDate) {
            return null
          }

          const start = formatDate(startDate, options, locale)
          const end = endDate ? formatDate(endDate, options, locale) : 'Present'

          return (
            <div
              key={index}
              className='text-focus-in ml-6 mt-8 max-w-prose md:ml-12 md:mt-16'
            >
              <Heading
                as='h3'
                size='sm'
              >
                {item.title}
              </Heading>
              <div className='mt-1 flex w-fit flex-col-reverse text-2xl font-semibold tracking-tight text-yellow-500 md:flex-row md:items-center md:gap-1'>
                <span>
                  {start} - {end}
                </span>{' '}
                <span className='hidden text-3xl font-extralight md:inline'>/</span> <span>{item.institution}</span>
              </div>
              <div className='prose prose-lg prose-invert mt-4'>{item.description}</div>
              <div className='flex flex-wrap gap-x-4 gap-y-2 pt-4 text-yellow-500 md:justify-start'>
                {item.tags?.map((tag, index) => (
                  <span
                    className='inline-flex items-center rounded-full border bg-black/80 px-2.5 py-0.5 text-xs font-semibold transition-all ease-in-out hover:scale-125'
                    key={index}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </Boundary>
  )
}
