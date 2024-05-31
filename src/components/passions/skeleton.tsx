import Boundary from '@/components/boundary'
import React from 'react'
import MusicDisplaySkeleton from '@/components/passions/music/skeleton'
import GamesDisplaySkeleton from '@/components/passions/games/skeleton'
import MoviesDisplaySkeleton from '@/components/passions/movies/skeleton'

export default function PassionsSkeleton() {
  return (
    <Boundary className="animate-pulse">
      <div className="h-20 w-[26rem] bg-gray-700/50 rounded-xl"/>
      {
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="ml-6 mt-8 md:ml-12 md:mt-14">
            {
              (() => {
                switch (index) {
                  case 0:
                    return <MusicDisplaySkeleton index={ index }/>
                  case 1:
                    return <GamesDisplaySkeleton index={ index }/>
                  case 2:
                    return <MoviesDisplaySkeleton index={ index }/>
                  default:
                    return null
                }
              })()
            }
          </div>
        ))
      }
    </Boundary>
  )
}





