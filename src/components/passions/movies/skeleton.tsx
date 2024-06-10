import CardContainer from '@/components/card-container'
import React from 'react'

export default function MoviesDisplaySkeleton({ index }: { index: number }) {
  return (
    <>
      <div
        key={index}
        className='h-10 w-48 rounded-xl bg-gray-700/50'
      />
      <div
        key={index}
        className='mt-4 h-6 w-80 rounded-xl bg-gray-700/50'
      />
      <CardContainer
        description={''}
        className='movie-grid -ml-2 mr-4 md:-ml-6 md:mr-6'
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className='h-[23rem] w-full rounded-xl bg-gray-700/50'
          />
        ))}
      </CardContainer>
    </>
  )
}
