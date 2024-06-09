'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/utils'

export const Highlight = ({
  children,
  className,
  delay,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  let duration = 2
  if (typeof children === 'string') {
    duration = children.length * 0.075
  }

  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: duration,
        ease: 'linear',
        delay: 0.5 + (delay || 0),
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative break-keep whitespace-nowrap inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-500 dark:from-yellow-400/60 dark:to-yellow-400/60`,
        className,
      )}
    >
      {children}
    </motion.span>
  )
}
