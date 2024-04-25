'use client'

import { Game } from '@/types'
import Heading from '@/components/heading'
import CardContainer from '@/components/card-container'
import { FlippableCard, FlippableCardBack, FlippableCardFront } from '@/components/flippable-card'
import Link from 'next/link'

export default function GamesDisplay({ games, heading, description }: {
  games: Game[],
  heading: { name: string, icon: string },
  description: string
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

  function formatTimePlayed(time: number) {
    const hours = Math.floor((time / 60))
    const minutes = time % 60
    return `${ hours }h ${ minutes.toString().padStart(2, '0') }m`
  }

  return (
    <>
      <Heading as="h3" size="sm">
        { heading.icon } { heading.name }
      </Heading>
      <CardContainer description={ description } className="md:grid-cols-2">
        {
          games.map((game, index) => (
            <FlippableCard key={ index } className="-ml-6">
              <FlippableCardFront
                className="flex flex-row bg-slate-800/60 gap-2"
              >
                <div className="game-display border-2 border-slate-500 rounded-2xl overflow-hidden my-auto ml-3">
                  { game.image }
                </div>
                <div className="w-full content-center h-full">
                  <div
                    className="w-56 transition-transform ease-in-out duration-300 m-auto"
                  >
                    { game.logo }
                  </div>
                </div>
              </FlippableCardFront>
              <FlippableCardBack
                className="flex text-xl flex-col bg-slate-800/60 gap-2 items-center justify-center"
              >
                <Link href={ game.url } target="_blank"
                      className="absolute top-4 left-4 content-center h-10 w-20 md:h-14 md:w-24">
                  { game.logo }
                </Link>
                <div className="pt-4">
                  <p className="font-bold">Time
                    played: { game.timePlayed ? formatTimePlayed(game.timePlayed) : '' }</p>
                  <p className="italic font-extralight text-slate-500">Last
                    played: { game.lastPlayed ? formatDate(game.lastPlayed) : '' }</p>
                </div>
              </FlippableCardBack>
            </FlippableCard>
          ))
        }
      </CardContainer>
    </>
  )
}
