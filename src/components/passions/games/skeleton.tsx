import CardContainer from '@/components/card-container'
import React from 'react'

export default function GamesDisplaySkeleton({ index }: { index: number }) {
  return (
    <>
      <div
        key={index}
        className='h-10 w-48 rounded-xl bg-gray-700/50'
      />
      <div
        key={index}
        className='mt-4 h-6 w-72 rounded-xl bg-gray-700/50'
      />
      <CardContainer
        description={''}
        className='-mt-4 mr-6 grid-cols-1 md:mr-0 md:grid-cols-2'
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className='h-[100px] w-full rounded-xl bg-gray-700/50 md:-ml-6'
          />
        ))}
      </CardContainer>
    </>
  )
}
