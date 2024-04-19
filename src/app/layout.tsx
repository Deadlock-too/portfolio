import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import clsx from 'clsx'
import { cookies } from 'next/headers'
import React from 'react'

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

  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={ clsx(urbanist.className, "relative md:-mt-4 min-h-screen") }>
        <Header currentLanguage={language}/>
        { children }
        <Footer settings={{
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
        }}/>
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
      </body>
    </html>
  )
}
