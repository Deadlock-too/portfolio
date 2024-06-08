import Boundary from '@/components/boundary'
import Heading from '@/components/heading'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'
import { formatDate } from '@/utils'
import { TracingBeam } from '@/components/tracing-beam'

export default function ContentBody({ contentType, title, tags, date, content, link }: {
  contentType: 'project' | 'blog'
  title: string
  tags: string[]
  date: Date
  content: string
  link?: string
}) {
  return (
    <Boundary as="article" className="text-focus-in">
      <article className="rounded-2xl border-2 border-white bg-black/80 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1"
                 className="text-[clamp(3rem,24vw,1rem)] leading-snug md:leading-normal text-center md:text-start">{ title }</Heading>
        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-yellow-500 pt-4">
          {
            tags.map((tag, index) => (
              <span
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-transform ease-in-out hover:scale-125"
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
                    className="absolute inset-0 z-0 h-1 translate-y-7 -translate-x-44 bg-yellow-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0"/>
                  <p className="text-sm">Check it out on GitHub:</p>
                </div>
                <Link
                  className="p-2 text-2xl transition-all duration-150 hover:scale-125 hover:text-yellow-500"
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
          <div
            className="text-justify max-w-prose prose-li:leading-6 prose-ul:leading-6 prose-ul:my-1 hover:prose-a:text-yellow-500">
            <TracingBeam>
              <div dangerouslySetInnerHTML={ { __html: content } }/>
            </TracingBeam>
          </div>
        </div>
      </article>
    </Boundary>
  )
}