import React, { forwardRef } from 'react'
import clsx from 'clsx'

type FoldingCardProps = {
  className?: string
  children?: React.ReactNode
  isActive: boolean
  // eslint-disable-next-line no-unused-vars
  handleActive?: (active: boolean) => void
}

const FoldingCardContainer = forwardRef<HTMLDivElement, FoldingCardProps>(({ className, children, ...props }, ref) => {
  const { isActive, handleActive, ...otherProps } = props
  return (
    <div
      ref={ref}
      className={clsx('folding-card-container', className, isActive ? 'h-[300px]' : 'h-[100px]')}
      style={{
        height: isActive ? `300px` : `100px`,
        transition: '0.9s',
      }}
      onClick={() => {
        if (handleActive) handleActive(!isActive)
      }}
      {...otherProps}
    >
      {children}
    </div>
  )
})
FoldingCardContainer.displayName = 'FoldingCardContainer'

const FoldingCardInnerFirst = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'isActive' | 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('folding-card-inner-first', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
FoldingCardInnerFirst.displayName = 'FoldingCardInnerFirst'

const FoldingCardContent = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    const { isActive, ...otherProps } = props
    return (
      <div
        ref={ref}
        className={clsx('folding-card-content', className)}
        style={{
          transform: isActive ? `rotate3d(1, 0, 0, -180deg)` : `rotate3d(1, 0, 0, 0deg)`,
          transitionDelay: isActive ? '0s' : '0.3s',
        }}
        {...otherProps}
      >
        {children}
      </div>
    )
  },
)
FoldingCardContent.displayName = 'FoldingCardContent'

const FoldingCardOuter = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'isActive' | 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('folding-card-outer', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
FoldingCardOuter.displayName = 'FoldingCardOuter'

const FoldingCardInnerSecond = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'isActive' | 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('folding-card-inner-second', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
FoldingCardInnerSecond.displayName = 'FoldingCardInnerSecond'

const FoldingCardInnerSecondContent = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'isActive' | 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('folding-card-inner-second-content', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
FoldingCardInnerSecondContent.displayName = 'FoldingCardInnerSecondContent'

const FoldingCardInnerThird = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    const { isActive, ...otherProps } = props
    return (
      <div
        ref={ref}
        className={clsx('folding-card-inner-third', className)}
        style={{
          transform: isActive ? `rotate3d(1, 0, 0, -180deg)` : `rotate3d(1, 0, 0, 0deg)`,
          transitionDelay: isActive ? '0.2s' : '0.2s',
        }}
        {...otherProps}
      >
        {children}
      </div>
    )
  },
)
FoldingCardInnerThird.displayName = 'FoldingCardInnerThird'

const FoldingCardInnerThirdAndFourthContentWrapper = forwardRef<
  HTMLDivElement,
  Omit<FoldingCardProps, 'isActive' | 'handleActive'>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('folding-card-inner-third-and-fourth-content-wrapper', className)}
      {...props}
    >
      {children}
    </div>
  )
})
FoldingCardInnerThirdAndFourthContentWrapper.displayName = 'FoldingCardInnerThirdAndFourthContentWrapper'

const FoldingCardInnerThirdContent = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'isActive' | 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('folding-card-inner-third-content', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
FoldingCardInnerThirdContent.displayName = 'FoldingCardInnerThirdContent'

const FoldingCardInnerFourth = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    const { isActive, ...otherProps } = props
    return (
      <div
        ref={ref}
        className={clsx('folding-card-inner-fourth', className)}
        style={{
          transform: isActive ? `rotate3d(1, 0, 0, -180deg)` : `rotate3d(1, 0, 0, 0deg)`,
          transitionDelay: isActive ? '0.4s' : '0s',
        }}
        {...otherProps}
      >
        {children}
      </div>
    )
  },
)
FoldingCardInnerFourth.displayName = 'FoldingCardInnerFourth'

const FoldingCardInnerFourthContent = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'isActive' | 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('folding-card-inner-fourth-content', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
FoldingCardInnerFourthContent.displayName = 'FoldingCardInnerFourthContent'

const FoldingCard = forwardRef<HTMLDivElement, Omit<FoldingCardProps, 'isActive' | 'handleActive'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  },
)

FoldingCard.displayName = 'FoldingCard'

export {
  FoldingCard,
  FoldingCardContainer,
  FoldingCardContent,
  FoldingCardInnerFirst,
  FoldingCardOuter,
  FoldingCardInnerSecond,
  FoldingCardInnerSecondContent,
  FoldingCardInnerThird,
  FoldingCardInnerThirdAndFourthContentWrapper,
  FoldingCardInnerThirdContent,
  FoldingCardInnerFourth,
  FoldingCardInnerFourthContent,
}
