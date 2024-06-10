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
      className={clsx('w-[90vw] rounded-2xl md:w-full', className)}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card
