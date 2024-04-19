'use client'

import React, { useEffect } from 'react'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { gsap } from 'gsap'

type AvatarProps = {
  src: StaticImageData
  alt: string
  className?: string
}

export default function Avatar({
  src,
  alt,
  className,
}: AvatarProps) {
  const component = React.useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.avatar',
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.inOut',
        })

      window.onmousemove = (e) => {
        if (!component.current) return
        const componentRect = (component.current as HTMLElement).getBoundingClientRect()
        const componentCenterX = componentRect.left + componentRect.width / 2

        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        }

        let distFromCenter = 1 - Math.abs(componentPercent.x)

        gsap.timeline({
          defaults: { duration: .5, overwrite: 'auto', ease: 'power3.out' }
        }).to('.avatar', {
          rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
          duration: .5,
        }, 0).to('.highlight', {
          opacity: distFromCenter - 0.7,
          x: -10 + 20 * componentPercent.x,
          duration: .5,
        }, 0)
      }
    }, component)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ component } className={ clsx('relative h-full w-full scale-90 md:scale-100', className) }>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <Image
          src={ src }
          alt={ alt }
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover avatar-image w-full h-full"
          quality={ 90 }
        />
        <div
          className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"
        />
      </div>
    </div>
  )
}