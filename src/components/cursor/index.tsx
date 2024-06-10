'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLayoutEffect, useRef } from 'react'

export default function Cursor({ isMobile }: { isMobile: boolean }) {
  const router = useRouter()
  const pathname = usePathname()

  const ref = useRef<HTMLDivElement>(null)

  const increaseSize = () => {
    if (ref.current) {
      ref.current.style.width = '3rem'
      ref.current.style.height = '3rem'
      ref.current.style.setProperty('--tw-translate-x', '-1.5rem')
      ref.current.style.setProperty('--tw-translate-y', '-0.5rem')
    }
  }

  const decreaseSize = () => {
    if (ref.current) {
      ref.current.style.width = '2rem'
      ref.current.style.height = '2rem'
      ref.current.style.setProperty('--tw-translate-x', '-1rem')
      ref.current.style.setProperty('--tw-translate-y', '0rem')
    }
  }

  useLayoutEffect(
    function () {
      if (!isMobile) {
        document.body.style.cursor = 'none'

        const elements = Array.from(
          document.querySelectorAll(
            'a, button, input, textarea, link, li .list-item, div .song-card-play, [data-clickable="true"]',
          ),
        )

        let scrollX = 0
        let scrollY = 0
        let pageX = 0
        let pageY = 0

        const onMouseMove = (event: MouseEvent) => {
          if (ref.current) {
            ref.current.style.left = `${event.pageX}px`
            ref.current.style.top = `${event.pageY}px`
            scrollX = window.scrollX
            scrollY = window.scrollY
            pageX = event.pageX
            pageY = event.pageY
          }
        }

        const onScroll = () => {
          if (ref.current) {
            let offsetX = window.scrollX - scrollX
            let offsetY = window.scrollY - scrollY
            ref.current.style.left = `${pageX + offsetX}px`
            ref.current.style.top = `${pageY + offsetY}px`
          }
        }

        const onMouseEnter = () => {
          if (ref.current) {
            ref.current.style.visibility = 'visible'
          }
        }

        const onMouseLeave = () => {
          if (ref.current) {
            ref.current.style.visibility = 'hidden'
          }
        }

        decreaseSize()
        elements.forEach((e) => {
          e.setAttribute('style', 'cursor: none')
          e.addEventListener('mouseenter', increaseSize)
          e.addEventListener('mouseleave', decreaseSize)
        })
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('scroll', onScroll)
        window.addEventListener('mousedown', increaseSize)
        window.addEventListener('mouseup', decreaseSize)
        document.documentElement.addEventListener('mouseenter', onMouseEnter)
        document.documentElement.addEventListener('mouseleave', onMouseLeave)

        return () => {
          window.removeEventListener('mousemove', onMouseMove)
          window.removeEventListener('scroll', onScroll)
          window.removeEventListener('mousedown', increaseSize)
          window.removeEventListener('mouseup', decreaseSize)
          document.documentElement.removeEventListener('mouseenter', onMouseEnter)
          document.documentElement.removeEventListener('mouseleave', onMouseLeave)
          elements.forEach((e) => {
            e.removeAttribute('style')
            e.removeEventListener('mouseenter', increaseSize)
            e.removeEventListener('mouseleave', decreaseSize)
          })
        }
      }
      document.body.style.cursor = 'auto'
    },
    [isMobile, router, pathname],
  )

  return (
    <div className='block min-w-max'>
      <div
        ref={ref}
        style={{ transitionProperty: 'height, width, transform' }}
        className='pointer-events-none absolute -left-4 -top-4 z-[200] flex h-8 w-8 -translate-x-4 items-center justify-center rounded-full border-2 border-stone-800 bg-yellow-400/20 ring-1 ring-stone-200 duration-150 dark:border-stone-200 dark:ring-stone-800'
      >
        <div className='h-2 w-2 rounded-full bg-stone-800 ring-1 ring-stone-200 dark:bg-stone-200 dark:ring-stone-800' />
      </div>
    </div>
  )
}
