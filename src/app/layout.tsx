import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import clsx from 'clsx'
import { cookies, headers } from 'next/headers'
import React from 'react'
import { Background } from '@/components/background'
import { isMobile } from '@/utils'

const urbanist = Urbanist({ subsets: [ 'latin' ] })

export const metadata: Metadata = {
  title: 'My developer portfolio',
  description: 'My professional portfolio showcasing my projects and blog posts.',
  icons: {
    icon: {
      url: '/favicon.ico',
      href: '/favicon.ico',
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesList = cookies()
  const language = cookiesList.get('lang')?.value || 'it'

  const userAgent = headers().get('user-agent') || ''
  const mobile = isMobile(userAgent)

  return (
    <html lang="en" className="bg-black text-black">
    <body className={ clsx(urbanist.className, 'relative md:-mt-4 min-h-screen') }>
    <Background className="min-w-full" isMobile={ mobile }>
      <Header currentLanguage={ language }/>
      { children }
      <Footer settings={ {
        data: {
          name: 'Stefan Gabriel Craescu',
          nav_item: [
            { link: '/about', label: 'About' },
            { link: '/blog', label: 'Blog' },
            { link: '/project', label: 'Projects' },
          ],
          github_link: 'https://github.com/Deadlock-too',
          twitter_link: undefined,
          linkedin_link: 'https://www.linkedin.com/in/stefan-gabriel-craescu-933643183/',
        }
      } }/>
    </Background>
    </body>
    </html>
  )
}
