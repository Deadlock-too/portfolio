'use client'

import { Game } from '@/types'
import Heading from '@/components/heading'
import CardContainer from '@/components/card-container'
import Link from 'next/link'
import {
  FoldingCard,
  FoldingCardContainer,
  FoldingCardContent,
  FoldingCardInnerFirst,
  FoldingCardInnerFourth,
  FoldingCardInnerFourthContent,
  FoldingCardInnerSecond,
  FoldingCardInnerSecondContent,
  FoldingCardInnerThird,
  FoldingCardInnerThirdAndFourthContentWrapper,
  FoldingCardInnerThirdContent,
  FoldingCardOuter,
} from '@/components/folding-card'
import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { FaSteam } from 'react-icons/fa6'
import { formatDate } from '@/utils'

export default function GamesDisplay({
  games,
  heading,
  description,
  isMobile,
}: {
  games: Game[]
  heading: { name: string; icon: string }
  description: string
  isMobile: boolean
}) {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const containerRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    containerRef.current = containerRef.current.slice(0, games.length)

    containerRef.current.forEach((container, index) => {
      container?.addEventListener('mouseenter', () => setHoveredCard(index))
      container?.addEventListener('mouseleave', () => setHoveredCard(null))
    })

    return () => {
      containerRef.current.forEach((container, index) => {
        container?.removeEventListener('mouseenter', () => setHoveredCard(index))
        container?.removeEventListener('mouseleave', () => setHoveredCard(null))
      })
    }
  })

  function formatTimePlayed(time: number) {
    const hours = Math.floor(time / 60)
    const minutes = time % 60
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`
  }

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
        className='-ml-[18px] mr-[6px] grid-cols-1 gap-x-4 md:-ml-9 md:mr-2.5 md:grid-cols-2'
      >
        {games.map((game, index) => {
          const isActive = activeCard === index
          const isHovered = hoveredCard === index

          return (
            <FoldingCard
              key={index}
              className={clsx(
                'transition-transform',
                (isActive || !isHovered) && !isMobile ? '' : 'md:hover:z-10 md:hover:scale-100',
                isActive ? 'z-10 scale-100' : 'scale-95',
              )}
            >
              <FoldingCardContainer
                ref={(el) => {
                  containerRef.current[index] = el
                }}
                key={index}
                isActive={isActive}
                handleActive={(value) => setActiveCard(value ? index : null)}
              >
                <FoldingCardInnerFirst className='overflow-hidden border-2 bg-black/80'>
                  <div className='my-auto content-center overflow-hidden'>{game.image}</div>
                </FoldingCardInnerFirst>
                <FoldingCardContent isActive={isActive}>
                  <FoldingCardOuter
                    className={clsx(
                      'flex items-center bg-black/20',
                      game.logoPosition === undefined
                        ? 'justify-center'
                        : game.logoPosition === 'left'
                          ? 'flex-row pl-4'
                          : 'justify-end pr-4',
                    )}
                  >
                    <div
                      className={clsx(
                        'absolute content-center',
                        game.logoSize === 'sm'
                          ? 'w-32'
                          : game.logoSize === 'md'
                            ? 'w-36'
                            : game.logoSize === 'lg'
                              ? 'w-44'
                              : null,
                      )}
                    >
                      {game.logo}
                    </div>
                  </FoldingCardOuter>
                  <FoldingCardInnerSecond className='border-2 bg-black/80'>
                    <FoldingCardInnerSecondContent className='flex flex-row items-center justify-between px-4'>
                      <div
                        className={clsx(
                          'content-center',
                          game.logoSize === 'sm'
                            ? 'w-32'
                            : game.logoSize === 'md'
                              ? 'w-36'
                              : game.logoSize === 'lg'
                                ? 'w-44'
                                : null,
                        )}
                      >
                        {game.logo}
                      </div>
                      <Link
                        className='group flex flex-row items-center gap-2 p-2 text-2xl transition-all duration-150'
                        href={game.url}
                        target='_blank'
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className='relative flex w-fit items-center justify-center overflow-hidden py-2 text-white transition-transform ease-out'>
                          <span className='absolute inset-0 z-0 h-1 -translate-x-44 translate-y-7 bg-yellow-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0' />
                          <p className='text-xs md:text-sm'>Get it on Steam:</p>
                        </div>
                        <FaSteam className='text-white transition-transform hover:scale-125 hover:text-yellow-500' />
                      </Link>
                    </FoldingCardInnerSecondContent>
                    <FoldingCardInnerThird isActive={isActive}>
                      <FoldingCardInnerThirdAndFourthContentWrapper>
                        <FoldingCardInnerThirdContent className='flex flex-row justify-center border-2 bg-black/80'>
                          <div className='flex w-full flex-row items-center justify-between px-4 text-white'>
                            <p>Time played:</p>
                            <p className='text-xl'>{game.timePlayed ? formatTimePlayed(game.timePlayed) : ''}</p>
                          </div>
                        </FoldingCardInnerThirdContent>
                        <FoldingCardInnerFourth
                          isActive={isActive}
                          className='bg-black'
                        >
                          <FoldingCardInnerFourthContent className='flex flex-row justify-center border-2 bg-black/80'>
                            <div className='flex w-full flex-row items-center justify-between px-4 text-white'>
                              <p>Last played:</p>
                              <p className='text-md'>{game.lastPlayed ? formatDate(game.lastPlayed) : ''}</p>
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
        })}
      </CardContainer>
    </>
  )
}
