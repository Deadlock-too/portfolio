'use client'

import { Game } from '@/types'
import Heading from '@/components/heading'
import CardContainer from '@/components/card-container'
import Link from 'next/link'
import {
  FoldingCardInnerSecond, FoldingCardInnerSecondContent,
  FoldingCard,
  FoldingCardContainer,
  FoldingCardContent,
  FoldingCardInnerFirst,
  FoldingCardOuter, FoldingCardInnerThird, FoldingCardInnerThirdAndFourthContentWrapper, FoldingCardInnerFourthContent, FoldingCardInnerThirdContent, FoldingCardInnerFourth
} from '@/components/folding-card'
import React, { useState } from 'react'
import clsx from 'clsx'
import { FaSteam } from 'react-icons/fa6'

export default function GamesDisplay({ games, heading, description }: {
  games: Game[],
  heading: { name: string, icon: string },
  description: string
}) {
  const [ activeCard, setActiveCard ] = useState<number | null>(null)

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
      <CardContainer description={ description } className="md:grid-cols-2 grid-cols-1">
        {
          games.map((game, index) => {
            const isActive = activeCard === index

            return (
              <FoldingCard key={ index } className={ clsx('md:-ml-6 mr-6 transition-transform',
                isActive ? '' : 'hover:scale-105 hover:z-10'
              ) }>
                <FoldingCardContainer
                  key={ index }
                  isActive={ isActive }
                  handleActive={ (value) => setActiveCard(value ? index : null) }>
                  <FoldingCardInnerFirst className="bg-slate-800/60 overflow-hidden">
                    <div className="overflow-hidden my-auto content-center">
                      { game.image }
                    </div>
                  </FoldingCardInnerFirst>
                  <FoldingCardContent isActive={ isActive }>
                    <FoldingCardOuter className={ clsx('bg-black/20 flex items-center',
                      game.logoPosition === undefined ? 'justify-center' :
                        (game.logoPosition === 'left') ? 'flex-row pl-4' : 'justify-end pr-4'
                    ) }>
                      <div className={ clsx('absolute content-center',
                        game.logoSize === 'sm' ? 'w-32' :
                          game.logoSize === 'md' ? 'w-36' :
                            game.logoSize === 'lg' ? 'w-44' :
                              null
                      ) }
                      >
                        { game.logo }
                      </div>
                    </FoldingCardOuter>
                    <FoldingCardInnerSecond className="bg-slate-800/60">
                      <FoldingCardInnerSecondContent className="flex flex-row items-center justify-between px-4">
                        <div
                          className={ clsx('content-center',
                            game.logoSize === 'sm' ? 'w-32' :
                              game.logoSize === 'md' ? 'w-36' :
                                game.logoSize === 'lg' ? 'w-44' :
                                  null
                          ) }
                        >
                          { game.logo }
                        </div>
                        <Link
                          className="group flex flex-row items-center gap-2 p-2 text-2xl transition-all duration-150"
                          href={ game.url }
                          target="_blank"
                          onClick={ (event) => event.stopPropagation() }
                        >
                          <div
                            className="relative flex w-fit items-center justify-center overflow-hidden py-2 transition-transform ease-out">
                            <span
                              className="absolute inset-0 z-0 h-1 translate-y-7 -translate-x-44 bg-sky-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0"/>
                            <p className="text-sm">Check it out on Steam:</p>
                          </div>
                          <FaSteam className="transition-transform hover:scale-125 hover:text-sky-500"/>
                        </Link>
                      </FoldingCardInnerSecondContent>
                      <FoldingCardInnerThird isActive={ isActive }>
                        <FoldingCardInnerThirdAndFourthContentWrapper>
                          <FoldingCardInnerThirdContent className="bg-slate-800/60 flex flex-row justify-center">
                            <div className="w-full flex flex-row justify-between px-4 items-center">
                              <p>Time played:</p>
                              <p className="text-xl">{ game.timePlayed ? formatTimePlayed(game.timePlayed) : '' }</p>
                            </div>
                          </FoldingCardInnerThirdContent>
                          <FoldingCardInnerFourth isActive={ isActive } className="bg-slate-800">
                            <FoldingCardInnerFourthContent className="bg-slate-800/60 flex flex-row justify-center">
                              <div className="w-full flex flex-row justify-between px-4 items-center">
                                <p>Last played:</p>
                                <p className="text-md">{ game.lastPlayed ? formatDate(game.lastPlayed) : '' }</p>
                              </div>
                            </FoldingCardInnerFourthContent>
                          </FoldingCardInnerFourth>
                        </FoldingCardInnerThirdAndFourthContentWrapper>
                      </FoldingCardInnerThird>
                    </FoldingCardInnerSecond>
                  </FoldingCardContent>
                </FoldingCardContainer>
              </FoldingCard>
            )
          })
        }
      </CardContainer>
    </>
  )
}
