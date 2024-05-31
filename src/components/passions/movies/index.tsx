'use client'

import { Movie } from '@/types'
import Heading from '@/components/heading'
import CardContainer from '@/components/card-container'
import { FlippableCard, FlippableCardBack, FlippableCardFront } from '@/components/flippable-card'
import Link from 'next/link'
import { ScrollArea, ScrollBar } from '@/components/scroll-area'
import { formatDate } from '@/utils'

export default function MoviesDisplay({ movies, heading, description }: {
  movies: Movie[],
  heading: { name: string, icon: string },
  description: string
}) {
  return (
    <>
      <Heading as="h3" size="sm">
        { heading.icon } { heading.name }
      </Heading>
      <CardContainer description={ description } className="-ml-[18px] mr-[6px] md:-ml-6 md:mr-6 movie-grid">
        { movies.map((movie, index) => (
          <FlippableCard key={ index } className="h-[23rem] w-full">
            <FlippableCardFront className="flex flex-col bg-black/80 border-2 h-[23rem] p-4 w-full items-center justify-between">
              <div className="rounded-2xl border-2 border-slate-500 overflow-hidden">
                { movie.image }
              </div>
              <div className="items-center text-center justify-between text-white">
                <h3 className="text-xl">{ movie.title }</h3>
                <h4 className="text-sm text-slate-500">{
                  formatDate(movie.releaseDate, {
                    year: 'numeric', month: 'numeric', day: 'numeric', localeMatcher: 'lookup'
                  }, 'en-UK') }
                </h4>
              </div>
            </FlippableCardFront>
            <FlippableCardBack className="bg-black/80 border-2 h-[23rem]">
              <div className="prose prose-invert text-sm justify-between h-full">
                <h3 className="text-md text-center">
                  <Link href={ movie.url } target="_blank">{ movie.title } ({ movie.releaseDate.getFullYear() })</Link>
                </h3>
                <ScrollArea className="h-full max-h-[16.5rem] border-b-[1px]">
                  { movie.overview }
                  <ScrollBar orientation="vertical"/>
                </ScrollArea>
                <div className="flex flex-wrap-reverse items-center justify-center gap-3 pt-3">
                  { movie.genres.map((genre, index) => (
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all cursor-default ease-in-out hover:scale-125"
                      key={ index }
                    >
                    { genre.name }
                  </span>
                  )) }
                </div>
              </div>
            </FlippableCardBack>
          </FlippableCard>
        )) }
      </CardContainer>
    </>
  )
}