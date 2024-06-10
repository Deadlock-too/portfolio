'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import React from 'react'
import { cn } from '@/utils'
import Cursor from '@/components/cursor'

export const Background = ({
  children,
  isMobile,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  isMobile: boolean
  className?: string
  containerClassName?: string
}) => {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return
    let { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn(
        'min-w-screen group/highlight relative flex h-full min-h-screen w-full items-center justify-center bg-white dark:bg-black',
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      <div className='pointer-events-none absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800' />
      <motion.div
        className='pointer-events-none absolute inset-0 opacity-0 transition duration-300 bg-dot-thick-yellow-500 group-hover/highlight:opacity-100 dark:bg-dot-thick-yellow-500'
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <div className={cn('relative z-20', className)}>
        {children}
        <Cursor isMobile={isMobile} />
      </div>
    </div>
  )
}
