import React, { forwardRef } from 'react'
import clsx from 'clsx'

type BoundedProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

const Boundary = forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Comp = 'section', className, children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx('px-4 py-10 md:px-6 md:py-14 lg:py-16', className)}
        {...props}
      >
        <div className='max-w-screen mx-auto w-full max-w-7xl'>{children}</div>
      </Comp>
    )
  },
)

Boundary.displayName = 'Boundary'

export default Boundary
