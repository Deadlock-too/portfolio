'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Boundary from '@/components/boundary'
import { Shapes } from '@/components/hero/shapes'

export default function Hero() {
  const firstName = 'Stefan'
  const secondName = 'Gabriel'
  const lastName = 'Craescu'

  const component = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          '.name-animation',
          {
            x: -100,
            opacity: 0,
            rotate: -10,
          },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            ease: 'elastic.out(1, 0.3)',
            duration: 1,
            transformOrigin: 'left top',
            delay: 0.5,
            stagger: {
              each: 0.12,
              from: 'random',
            },
          },
        )
        .fromTo(
          '.job-title',
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: 'elastic.out(1, 0.3)',
          },
        )
    }, component)
    return () => ctx.revert()
  }, [])

  const renderLetters = (text: string) => {
    if (!text) return
    return text.split('').map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${text} inline-block opacity-0`}
      >
        {letter}
      </span>
    ))
  }

  return (
    <Boundary ref={component}>
      <div className='grid min-h-[60vh] grid-cols-1 md:grid-cols-2 items-center'>
        <div className='col-start-1 md:row-start-1'>
          <h1
            className='mb-8 text-[clamp(3rem,24vw,24rem)] md:text-[clamp(3rem,10vw,10rem)] font-extrabold leading-none tracking-tighter'
            aria-label={`${firstName} ${lastName}`}
          >
            <span className='block text-yellow-200'>{renderLetters(firstName)}</span>
            {secondName && <span className='-mt-[.2em] block text-yellow-400'>{renderLetters(secondName)}</span>}
            <span className='-mt-[.2em] block text-yellow-600'>{renderLetters(lastName)}</span>
          </h1>
          <span className='job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl'>
            Creative Developer
          </span>
        </div>
        <Shapes />
      </div>
    </Boundary>
  )
}
