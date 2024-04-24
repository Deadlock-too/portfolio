import React, { forwardRef } from 'react'
import clsx from 'clsx'
import Card from '@/components/card'

type FilppableCardProps = {
  className?: string
  children: React.ReactNode
}

const FlippableCard = forwardRef<HTMLDivElement, FilppableCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Card
        ref={ ref }
        className={ clsx('flip-container h-48', className) }
        { ...props }
      >
        <div className="flipper">
          { children }
        </div>
      </Card>
    )
  }
)

FlippableCard.displayName = 'FlippableCard'

const FlippableCardFront = forwardRef<HTMLDivElement, FilppableCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ ref }
        className={ clsx('front h-48 p-4 rounded-2xl w-full', className) }
        { ...props }
      >
        { children }
      </div>
    )
  })

FlippableCardFront.displayName = 'FlippableCardFront'

const FlippableCardBack = forwardRef<HTMLDivElement, FilppableCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ ref }
        className={ clsx('back h-48 p-4 rounded-2xl w-full', className) }
        { ...props }
      >
        { children }
      </div>
    )
  })

FlippableCardBack.displayName = 'FlippableCardBack'

export { FlippableCard, FlippableCardFront, FlippableCardBack }