import CardContainer from '@/components/card-container'
import React from 'react'

export default function MoviesDisplaySkeleton({ index }: { index: number }) {
  return (
    <>
      <div key={ index } className="h-10 w-48 bg-gray-700/50 rounded-xl"/>
      <div key={ index } className="h-6 w-80 mt-4 bg-gray-700/50 rounded-xl"/>
      <CardContainer description={ '' } className="-ml-2 mr-4 md:-ml-6 md:mr-6 movie-grid">
        {
          Array.from({ length: 12 }).map((_, index) => (
            <div key={ index } className="h-[23rem] w-full bg-gray-700/50 rounded-xl"/>
          ))
        }
      </CardContainer>
    </>
  )
}