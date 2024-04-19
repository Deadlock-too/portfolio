'use client'

import Heading from '@/components/heading'
import React, { Fragment, useEffect } from 'react'
import { MdCircle } from 'react-icons/md'
import Boundary from '@/components/boundary'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'
import data from '@/data/data.json'

gsap.registerPlugin(ScrollTrigger)

export default function TechList() {
  const techs = data.techList

  const component = React.useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 4,
        }
      })

      tl.fromTo('.tech-row', {
          x: (index) => index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400),
        },
        {
          x: (index) => index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400),
          ease: 'power1.inOut',
        })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ component }
    >
      <Boundary as="div">
        <Heading size="xl" className="focus-in-expand mb-8" as="h2">
          What I use
        </Heading>
      </Boundary>
      {
        techs.map((tech, index) => (
          <div
            key={ index }
            className="text-focus-in tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
            aria-label={ tech.name }
          >
            { Array.from({ length: 45 }, (_, index) => (
              <Fragment key={ index }>
                <span
                  className={ clsx(
                    'tech-item text-8xl font-extrabold uppercase tracking-tighter',
                  )
                  }
                  style={ { color: index === 22 && tech.color ? tech.color : 'inherit' } }
                >{ tech.name }</span>
                <span className="text-3xl"><MdCircle/></span>
              </Fragment>
            )) }
          </div>
        ))
      }
    </section>
  )
}