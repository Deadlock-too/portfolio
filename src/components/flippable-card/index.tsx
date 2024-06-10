import React, { forwardRef } from 'react'
import clsx from 'clsx'
import Card from '@/components/card'

type FilppableCardProps = {
  className?: string
  children: React.ReactNode
}

const FlippableCard = forwardRef<HTMLDivElement, FilppableCardProps>(({ className, children, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={clsx('flippable-card-container h-48', className)}
      {...props}
    >
      <div className='flippable-card-flipper'>{children}</div>
    </Card>
  )
})

FlippableCard.displayName = 'FlippableCard'

const FlippableCardFront = forwardRef<HTMLDivElement, FilppableCardProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('flippable-card-front h-48 w-full rounded-2xl p-4', className)}
      {...props}
    >
      {children}
    </div>
  )
})

FlippableCardFront.displayName = 'FlippableCardFront'

const FlippableCardBack = forwardRef<HTMLDivElement, FilppableCardProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('flippable-card-back h-48 w-full rounded-2xl p-4', className)}
      {...props}
    >
      {children}
    </div>
  )
})

FlippableCardBack.displayName = 'FlippableCardBack'

export { FlippableCard, FlippableCardFront, FlippableCardBack }
