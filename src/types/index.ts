import React from 'react'
import { Track } from '@spotify/web-api-ts-sdk'

export type Content = {
  id: string
  title: string
  description: string
  date?: string
  startDate?: string
  tags: string[]
}

export type Song = {
  track: Track
  image: React.ReactNode
  audio?: any
}

export type Game = {
  appId: number
  title: string
  image?: React.ReactNode
  logo?: React.ReactNode
  logoPosition?: 'left' | 'right'
  logoSize?: 'sm' | 'md' | 'lg'
  timePlayed?: number
  lastPlayed?: Date
  url: string
}

export type Movie = {
  url: string
  title: string
  releaseDate: Date
  overview: string
  image: React.ReactNode
}