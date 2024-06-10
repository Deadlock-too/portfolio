import React, { forwardRef } from 'react'
import clsx from 'clsx'

type CardContainerProps = {
  className?: string
  children: React.ReactNode
  description: string
}

const CardContainer = forwardRef<HTMLDivElement, CardContainerProps>(({ className, children, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='pt-4 text-white'>{props.description}</h3>
      <div
        ref={ref}
        className={clsx('grid justify-center gap-x-12 gap-y-6', className)}
        {...props}
      >
        {children}
      </div>
    </div>
  )
})

CardContainer.displayName = 'CardContainer'

export default CardContainer
