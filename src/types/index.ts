/* eslint-disable no-unused-vars */
import React from 'react'
import { Track } from '@spotify/web-api-ts-sdk'

export enum LogoPosition {
  left = 0,
  right = 1,
  center = 2,
}

export enum LogoSize {
  sm = 0,
  md = 1,
  lg = 2,
}

export enum Passions {
  Music = 3,
  Games = 2,
  Movies = 1,
}

export enum ExperienceType {
  work = 0,
  education = 1,
}

export type Content = {
  id: string
  title: string
  description: string
  date?: string
  startDate?: string
  tags: Tag[]
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
  logoPosition?: LogoPosition
  logoSize?: LogoSize
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
  genres: Genre[]
}

export type Genre = {
  id: number
  name: string
}

export type Experience = {
  title: string
  start: string
  end?: string
  institution: string
  description: string
  tags?: Tag[]
}

export type Tag = {
  name: string
}
