'use client'

import { Song } from '@/types'
import { useEffect, useState } from 'react'
import Heading from '@/components/heading'
import CardContainer from '@/components/card-container'
import Card from '@/components/card'
import clsx from 'clsx'
import { BiPause, BiPlay } from 'react-icons/bi'
import Link from 'next/link'
import Image from 'next/image'
import Vinyl from '../../../../public/images/vinyl.svg'

export default function MusicDisplay({
  songs,
  heading,
  description,
}: {
  songs: Song[]
  heading: { name: string; icon: string }
  description: string
}) {
  const [audio, setAudio] = useState<HTMLAudioElement[] | null>(null)
  const [playing, setPlaying] = useState<number | null>(null)
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    setAudio(
      songs.map((song) => {
        const result = new Audio(song.track.preview_url ?? '')
        result.volume = 0.2
        return result
      }),
    )
  }, [songs])

  function setSongPlaying(index: number) {
    if (playing === index) {
      audio?.[index].pause()
    } else {
      ;(async () => {
        setPlaying(null)
        setTime(0)
        audio?.forEach((audio) => {
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
      <Heading
        as='h3'
        size='sm'
      >
        {heading.icon} {heading.name}
      </Heading>
      <CardContainer
        description={description}
        className='md:grid-cols-2'
      >
        {songs.map((song, index) => (
          <Card
            key={index}
            className={clsx(
              'song-card -ml-6 flex flex-row gap-2 border-2 p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-100',
              playing === index ? 'scale-105 bg-black/80 opacity-80' : 'bg-black/60 opacity-60',
            )}
          >
            <div className='song-card-index'>
              <p className='-ml-2 -mt-2 h-6 w-6 content-center rounded-[50%] border-2 border-white bg-black text-center text-sm text-slate-100'>
                {index + 1}
              </p>
            </div>
            <div
              className='song-card-entry group m-1 overflow-hidden rounded-2xl border-2 border-white'
              onClick={() => {
                setSongPlaying(index)
              }}
            >
              <div className='song-card-play text-yellow-500'>
                {playing === index ? (
                  <BiPause className='h-16 w-16 opacity-0 group-hover:opacity-100' />
                ) : (
                  <BiPlay className='h-16 w-16 opacity-0 group-hover:opacity-100' />
                )}
              </div>
              <div className='group-hover:opacity-40'>{song.image}</div>
              <div
                className={clsx(
                  'song-card-bar h-1.5 w-full bg-yellow-500',
                  playing === index ? 'opacity-100' : 'opacity-0',
                )}
                style={{ transform: `translateX(-${100 - (time / 30) * 100}%)` }}
              />
            </div>
            <Link
              href={song.track.external_urls.spotify}
              target='_blank'
              className='flex w-full flex-row items-center justify-between p-2'
            >
              <div className='content-center'>
                <p className='text-xl text-white'>{song.track.name}</p>
                <p
                  className='text-md text-yellow-500'
                  aria-label={'by ' + song.track.artists.map((artist) => artist.name).join(', ')}
                >
                  {song.track.artists.map((artist) => artist.name).join(', ')}
                </p>
              </div>
              <Image
                src={Vinyl}
                alt='Vinyl'
                className={clsx(
                  'song-card-animate-spin h-12 w-12 invert transition-all duration-300 ease-in-out md:h-14 md:w-14',
                  playing === index ? 'opacity-100' : 'opacity-0',
                )}
              />
            </Link>
          </Card>
        ))}
      </CardContainer>
    </>
  )
}
