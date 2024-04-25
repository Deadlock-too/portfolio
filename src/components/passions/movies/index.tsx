'use client'

import { Movie } from '@/types'
import Heading from '@/components/heading'
import CardContainer from '@/components/card-container'
import { FlippableCard, FlippableCardBack, FlippableCardFront } from '@/components/flippable-card'
import Link from 'next/link'
import { ScrollArea, ScrollBar } from '@/components/scroll-area'

export default function MoviesDisplay({ movies, heading, description }: {
  movies: Movie[],
  heading: { name: string, icon: string },
  description: string
}) {
  function formatDate(date: Date) {
    if (date === undefined) return

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      localeMatcher: 'lookup',
    }
    return new Intl.DateTimeFormat('en-UK', dateOptions).format(new Date(date))
  }

  return (
    <>
      <Heading as="h3" size="sm">
        { heading.icon } { heading.name }
      </Heading>
      <CardContainer description={ description } className="-ml-2 mr-4 md:-ml-6 md:mr-6 movie-grid">
        { movies.map((movie, index) => (
          <FlippableCard key={ index } className="h-[23rem] w-full">
            <FlippableCardFront className="flex flex-col bg-slate-800/60 h-[23rem] p-4 w-full items-center justify-between">
              <div className="rounded-2xl border-2 border-slate-500 overflow-hidden">
                { movie.image }
              </div>
              <div className="items-center text-center justify-between">
                <h3 className="text-xl">{ movie.title }</h3>
                <h4 className="text-sm text-slate-500">{ formatDate(movie.releaseDate) }</h4>
              </div>
            </FlippableCardFront>
            <FlippableCardBack className="bg-slate-800/60 h-[23rem]">
              <div className="prose prose-invert text-sm">
                <h3 className="text-md text-center">
                  <Link href={ movie.url } target="_blank">{ movie.title } ({ movie.releaseDate.getFullYear() })</Link>
                </h3>
                <ScrollArea className="h-[18rem]">
                  { movie.overview }
                  <ScrollBar orientation="vertical"/>
                </ScrollArea>
              </div>
            </FlippableCardBack>
          </FlippableCard>
        )) }
      </CardContainer>
    </>
  )
}