import Boundary from '@/components/boundary'
import Heading from '@/components/heading'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'

export default function ContentBody({ contentType, title, tags, date, content, link }: {
  contentType: 'project' | 'blog'
  title: string
  tags: string[]
  date: Date
  content: string
  link?: string
}) {
  function formatDate(date: Date) {
    if (date === undefined) return

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(date))
  }

  return (
    <Boundary as="article" className="text-focus-in">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{ title }</Heading>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sky-500 pt-4">
          {
            tags.map((tag, index) => (
              <span
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-transform cursor-default ease-in-out hover:scale-125"
                key={ index }>
                { tag }
              </span>
            ))
          }
        </div>
        <div
          className="flex flex-col md:flex-row items-center mt-8 border-b border-slate-600 text-xl font-medium text-slate-300 justify-between">
          <div className="text-center md:text-start">
            {
              contentType === 'project' ? 'Working on it since ' : 'Published '
            }
            { formatDate(date) }
          </div>
          {
            link && (
              <div className="group flex flex-row items-center gap-1">
                <div
                  className="relative flex w-fit items-center justify-center overflow-hidden py-2 transition-transform ease-out">
                  <span
                    className="absolute inset-0 z-0 h-1 translate-y-7 -translate-x-44 bg-sky-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0"/>
                  <p className="text-sm">Check it out on GitHub:</p>
                </div>
                <Link
                  className="p-2 text-2xl transition-all duration-150 hover:scale-125 hover:text-sky-500"
                  href={ link }
                  target="_blank"
                >
                  <FaGithub/>
                </Link>
              </div>
            )
          }
        </div>
        <div className="prose prose-base prose-invert mt-12 w-full max-w-none md:mt-16">
          <div className="text-justify max-w-prose prose-li:leading-6 prose-ul:leading-6 prose-ul:my-1 hover:prose-a:text-sky-500">
            <div dangerouslySetInnerHTML={ { __html: content } }/>
          </div>
        </div>
      </div>
    </Boundary>
  )
}