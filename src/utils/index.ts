import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const isMobile = (userAgent: string): boolean => {
  return /android.+mobile|ip(hone|[oa]d])/i.test(userAgent)
}

export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'en-US',
): string | undefined => {
  if (date === undefined) return

  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
