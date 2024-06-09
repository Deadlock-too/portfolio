import CardContainer from '@/components/card-container'
import React from 'react'

export default function MusicDisplaySkeleton({ index }: { index: number }) {
  return (
    <>
      <div
        key={index}
        className='h-10 w-40 bg-gray-700/50 rounded-xl'
      />
      <div
        key={index}
        className='h-6 w-52 mt-4 bg-gray-700/50 rounded-xl'
      />
      <CardContainer
        description={''}
        className='-mt-4 mr-6 md:mr-0 md:grid-cols-2 grid-cols-1'
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className='md:h-28 h-28 md:-ml-6 w-full bg-gray-700/50 rounded-xl'
          />
        ))}
      </CardContainer>
    </>
  )
}
