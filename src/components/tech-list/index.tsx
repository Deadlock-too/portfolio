'use client'

import Heading from '@/components/heading'
import React, { Fragment, useEffect } from 'react'
import { MdCircle } from 'react-icons/md'
import Boundary from '@/components/boundary'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)

type TechProps = {
  items: {
    name: string
    color: string
  }[]
}

export default function TechList({ items }: TechProps) {
  const component = React.useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 4,
        },
      })

      tl.fromTo(
        '.tech-row',
        {
          x: (index) => (index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400)),
        },
        {
          x: (index) => (index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400)),
          ease: 'power1.inOut',
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={component}
      className='overflow-hidden'
    >
      <Boundary as='div'>
        <Heading
          size='xl'
          className='focus-in-expand mb-8'
          as='h2'
        >
          What I use
        </Heading>
      </Boundary>
      {items.map((tech, index) => (
        <div
          key={index}
          className='text-focus-in tech-row mb-8 flex items-center justify-center gap-4 text-white/20'
          aria-label={tech.name}
        >
          {Array.from({ length: 45 }, (_, index) => (
            <Fragment key={index}>
              <span
                className={clsx('tech-item text-5xl font-extrabold uppercase tracking-tighter md:text-8xl')}
                style={{ color: index === 22 && tech.color ? tech.color : 'inherit' }}
              >
                {tech.name}
              </span>
              <span className='text-3xl'>
                <MdCircle />
              </span>
            </Fragment>
          ))}
        </div>
      ))}
    </section>
  )
}
