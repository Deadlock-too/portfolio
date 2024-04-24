'use client'

import Boundary from '@/components/boundary'
import Heading from '@/components/heading'
import { Game, Movie, Song } from '@/types'
import { BiPause, BiPlay } from 'react-icons/bi'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Vinyl from '../../../public/images/vinyl.svg'
import Image from 'next/image'
import CardContainer from '@/components/card-container'
import Card from '@/components/card'
import { FlippableCard, FlippableCardBack, FlippableCardFront } from '@/components/flippable-card'
import { ScrollArea, ScrollBar } from '@/components/scroll-area'

type PassionsProps = {
  heading: string
  items: {
    name: string
    icon: string
    description: string
  }[]
  songs: Song[]
  games: Game[]
  movies: any[]
}

export default function Passions({ heading, items, songs, games, movies }: PassionsProps) {
  return (
    <Boundary>
      <Heading as="h2" size="lg" className="focus-in-expand">
        { heading }
      </Heading>
      {
        items.map((item, index) => (
          <div key={ index } className="text-focus-in ml-6 mt-8 md:ml-12 md:mt-16">
            {
              (() => {
                switch (item.name) {
                  case 'Music':
                    if (songs.length === 0) return null
                    return <MusicDisplay heading={ { name: item.name, icon: item.icon } } songs={ songs }
                                         description={ item.description }/>
                  case 'Gaming':
                    if (games.length === 0) return null
                    return <GamesDisplay heading={ { name: item.name, icon: item.icon } } games={ games }
                                         description={ item.description }/>
                  case 'Movies':
                    if (movies.length === 0) return null
                    return <MoviesDisplay heading={ { name: item.name, icon: item.icon } } movies={ movies }
                                          description={ item.description }/>
                  // case 'Books':
                  //   return <BooksDisplay books={ books }/>
                  // case 'Games':
                  //   return <GamesDisplay games={ games }/>
                }
              })()
            }
          </div>
        ))
      }
    </Boundary>
  )
}

function MusicDisplay({ songs, heading, description }: {
  songs: Song[],
  heading: { name: string, icon: string },
  description: string
}) {
  const [ audio, setAudio ] = useState<(HTMLAudioElement[] | null)>(null)
  const [ playing, setPlaying ] = useState<number | null>(null)
  const [ time, setTime ] = useState<number>(0)

  useEffect(() => {
    setAudio(songs.map(song => {
      const result = new Audio(song.track.preview_url ?? '')
      result.volume = 0.2
      return result
    }))
  }, [ songs ])

  function setSongPlaying(index: number) {
    if (playing === index) {
      audio?.[index].pause()
    } else {
      (async () => {
        setPlaying(null)
        setTime(0)
        audio?.forEach(audio => {
          if (audio.currentTime !== 0) audio.pause()
        })
      })().then(() => {
        const song = audio?.[index]
        if (!song) return
        song.currentTime = 0
        song.play().then(() => {
          song.onended = () => {
            setPlaying((prevState) => {
              if (prevState === index) return null
              return prevState
            })
            setTime(0)
          }
          song.onpause = () => {
            setPlaying((prevState) => {
              if (prevState === index || prevState === null) return null
              return prevState
            })
            setTime(0)
          }
          song.ontimeupdate = () => {
            setTime(song.currentTime)
          }
          setPlaying(index)
        })
      })
    }
  }

  return (
    <>
      <Heading as="h3" size="sm">
        { heading.icon } { heading.name }
      </Heading>
      <CardContainer description={ description } className="md:grid-cols-2">
        {
          songs.map((song, index) => (
            <Card
              key={ index }
              className={ clsx('flex flex-row p-4 -ml-6 gap-2 hover:opacity-100 hover:scale-105 transition-all ease-in-out duration-300',
                playing === index ? 'bg-slate-700 opacity-80 scale-105' : 'bg-slate-800 opacity-60'
              ) }
            >
              <div className="song-index">
                <p
                  className="text-sm bg-black text-center content-center border-2 rounded-[50%] border-slate-500 w-6 h-6 -ml-2 -mt-2 text-slate-100"
                >{ index + 1 }</p>
              </div>
              <div
                className="song-entry group border-2 m-1 rounded-2xl border-slate-500 overflow-hidden"
                onClick={ () => {
                  setSongPlaying(index)
                } }
              >
                <div className="song-play text-sky-500">
                  {
                    playing === index ?
                      <BiPause className="h-16 w-16 opacity-0 group-hover:opacity-100"/> :
                      <BiPlay className="h-16 w-16 opacity-0 group-hover:opacity-100"/>
                  }
                </div>
                <div className="group-hover:opacity-40">
                  { song.image }
                </div>
                <div
                  className={ clsx('song-bar bg-sky-500 h-1.5 w-full ',
                    playing === index ? 'opacity-100' : 'opacity-0') }
                  style={ { transform: `translateX(-${ 100 - (time / 30 * 100) }%)` } }
                />
              </div>
              <Link href={ song.track.external_urls.spotify } target="_blank"
                    className="flex flex-row justify-between items-center w-full p-2">
                <div className="content-center">
                  <p className="text-xl">{ song.track.name }</p>
                  <p className="text-md text-slate-500"
                     aria-label={ 'by ' + song.track.artists.map(artist => artist.name).join(', ') }>{ song.track.artists.map(artist => artist.name).join(', ') }</p>
                </div>
                <Image
                  src={ Vinyl }
                  alt="Vinyl"
                  className={
                    clsx('h-12 w-12 md:h-14 md:w-14 invert animate-spin transition-all ease-in-out duration-300',
                      playing === index ? 'opacity-100' : 'opacity-0'
                    )
                  }
                />
              </Link>
            </Card>
          ))
        }
      </CardContainer>
    </>
  )
}

function GamesDisplay({ games, heading, description }: {
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

function MoviesDisplay({ movies, heading, description }: {
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
                  <Link href={ '' } target="_blank">{ movie.title } ({ movie.releaseDate.getFullYear() })</Link>
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