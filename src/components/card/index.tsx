import React, { forwardRef } from 'react'
import clsx from 'clsx'

type CardProps = {
  className?: string
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('w-[90vw] md:w-full rounded-2xl', className)}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card
