'use client'

import Link from 'next/link'
import { MdArrowOutward } from 'react-icons/md'
import { Content } from '@/types'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ContentListProps = {
  items: Content[]
  contentType: string
  viewMoreText?: string
}

export default function ContentList({ items, contentType, viewMoreText = 'Read More' }: ContentListProps) {
  const component = useRef(null)
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])
  const closingItemRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            delay: index * 0.1,
            ease: 'elastic.out(1, 0.3)',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100px',
              end: 'bottom center',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      gsap.fromTo(
        closingItemRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          delay: (items.length + 1) * 0.1,
          ease: 'elastic.out(1, 0.3)',
          scrollTrigger: {
            trigger: closingItemRef.current,
            start: 'top bottom-=100px',
            end: 'bottom center',
            toggleActions: 'play none none none',
          },
        },
      )

      return () => ctx.revert()
    }, component)
  }, [items.length])

  return (
    <div ref={component}>
      <ul className='grid'>
        {items.map((item, index) => (
          <li
            key={index}
            className='group list-item opacity-0'
            // @ts-ignore - Ref is not null
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <Link
              href={'/' + contentType + '/' + item.id}
              aria-label={item.title}
              className='flex flex-col justify-between gap-y-4 border-t border-t-slate-100 py-10 text-slate-200 md:flex-row'
            >
              <div className='ml-4 flex flex-col gap-y-1.5'>
                <div className='text-[clamp(1.45rem,10vw,1rem)] font-bold md:text-3xl'>{item.title}</div>
                <div className='flex flex-wrap gap-4 text-lg font-bold text-yellow-500'>
                  {item.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-transform ease-in-out hover:scale-125'
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              {
                <div className='relative ml-4 mr-4 flex w-fit items-center justify-center overflow-hidden px-4 py-2 font-bold transition-transform ease-out group-hover:scale-105'>
                  <span className='delay-250 absolute inset-0 z-0 h-1 -translate-x-36 translate-y-9 bg-yellow-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0 md:translate-y-[3.75rem]' />
                  <span className='absolute inset-0 z-0 h-full w-1 bg-yellow-500 transition-transform duration-300 ease-in-out group-hover:translate-y-10 md:group-hover:translate-y-16' />
                  <span className='view-more relative flex items-center gap-2'>
                    {viewMoreText} <MdArrowOutward className='inline-block' />
                  </span>
                </div>
              }
            </Link>
          </li>
        ))}
      </ul>
      <div
        ref={closingItemRef}
        className='border-b border-b-slate-100 opacity-0'
      />
    </div>
  )
}
