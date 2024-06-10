'use client'

import { Movie } from '@/types'
import Heading from '@/components/heading'
import CardContainer from '@/components/card-container'
import { FlippableCard, FlippableCardBack, FlippableCardFront } from '@/components/flippable-card'
import Link from 'next/link'
import { ScrollArea, ScrollBar } from '@/components/scroll-area'
import { formatDate } from '@/utils'

export default function MoviesDisplay({
  movies,
  heading,
  description,
}: {
  movies: Movie[]
  heading: { name: string; icon: string }
  description: string
}) {
  return (
    <>
      <Heading
        as='h3'
        size='sm'
      >
        {heading.icon} {heading.name}
      </Heading>
      <CardContainer
        description={description}
        className='movie-grid -ml-[18px] mr-[6px] md:-ml-6 md:mr-6'
      >
        {movies.map((movie, index) => (
          <FlippableCard
            key={index}
            className='h-[23rem] w-full'
          >
            <FlippableCardFront className='flex h-[23rem] w-full flex-col items-center justify-between border-2 bg-black/80 p-4'>
              <div className='overflow-hidden rounded-2xl border-2 border-slate-500'>{movie.image}</div>
              <div className='items-center justify-between text-center text-white'>
                <h3 className='text-xl'>{movie.title}</h3>
                <h4 className='text-sm text-slate-500'>
                  {formatDate(
                    movie.releaseDate,
                    {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      localeMatcher: 'lookup',
                    },
                    'en-UK',
                  )}
                </h4>
              </div>
            </FlippableCardFront>
            <FlippableCardBack className='h-[23rem] border-2 bg-black/80'>
              <div className='prose prose-invert h-full justify-between text-sm'>
                <h3 className='text-md text-center'>
                  <Link
                    href={movie.url}
                    target='_blank'
                  >
                    {movie.title} ({movie.releaseDate.getFullYear()})
                  </Link>
                </h3>
                <ScrollArea className='h-full max-h-[16.5rem] border-b-[1px]'>
                  {movie.overview}
                  <ScrollBar orientation='vertical' />
                </ScrollArea>
                <div className='flex flex-wrap-reverse items-center justify-center gap-3 pt-3'>
                  {movie.genres.map((genre, index) => (
                    <span
                      className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all ease-in-out hover:scale-125'
                      key={index}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </FlippableCardBack>
          </FlippableCard>
        ))}
      </CardContainer>
    </>
  )
}
