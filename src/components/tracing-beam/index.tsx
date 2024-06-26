'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/utils'

export const TracingBeam = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.45], [0, svgHeight]), {
    stiffness: 500,
    damping: 90,
  })
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <motion.div
      ref={ref}
      className={cn('relative mx-auto h-full w-full max-w-4xl', className)}
    >
      <div className='absolute -left-4 top-2 md:-left-4'>
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: scrollYProgress.get() > 0 ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
          className='border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm'
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? 'white' : 'var(--yellow-500)',
              borderColor: scrollYProgress.get() > 0 ? 'white' : 'var(--yellow-600)',
            }}
            className='h-2 w-2 rounded-full border border-neutral-300 bg-white'
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width='20'
          height={svgHeight} // Set the SVG height
          className='ml-4 block'
          aria-hidden='true'
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.1} l -18 24V ${svgHeight * 0.2} l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight * 0.9} l 18 24V ${svgHeight}`}
            fill='none'
            stroke='#9091A0'
            strokeOpacity='0.16'
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.1} l -18 24V ${svgHeight * 0.2} l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight * 0.9} l 18 24V ${svgHeight}`}
            fill='none'
            stroke='url(#gradient)'
            strokeWidth='1.25'
            className='motion-reduce:hidden'
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id='gradient'
              gradientUnits='userSpaceOnUse'
              x1='0'
              x2='0'
              y1={y1} // set y1 for gradient
              y2={y2} // set y2 for gradient
            >
              <stop
                stopColor='#ffd966'
                stopOpacity='0'
              ></stop>
              <stop stopColor='#ffd966'></stop>
              <stop
                offset='0.325'
                stopColor='#bf9000'
              ></stop>
              <stop
                offset='1'
                stopColor='#ffe599'
                stopOpacity='0'
              ></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className='pl-10'
        ref={contentRef}
      >
        {children}
      </div>
    </motion.div>
  )
}
