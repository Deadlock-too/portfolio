import TechList from '@/components/tech-list'
import AboutMe from '@/components/about-me'
import Experience from '@/components/experience'
import data from '@/data/data.json'
import Passions from '@/components/passions'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import Image from 'next/image'
import React, { Suspense } from 'react'
import { Game, Movie, Song } from '@/types'
import SteamAPI from 'steamapi'

export const metadata = {
  title: 'About me',
  description: 'About me page with my tech stack and experience.'
}

export default async function About() {
  const secrets = {
    spotify_user_id: process.env.SPOTIFY_USER_ID ?? '',
    spotify_client_id: process.env.STEAM_CLIENT_ID ?? '',
    spotify_client_secret: process.env.STEAM_CLIENT_SECRET ?? '',
    spotify_playlist_id: process.env.SPOTIFY_PLAYLIST_ID ?? '',
    steam_web_api_key: process.env.STEAM_WEB_API_KEY ?? '',
    steam_account_id: process.env.STEAM_ACCOUNT_ID ?? '',
    steam_id: process.env.STEAM_ID ?? '',
    tmdb_api_key: process.env.TMDB_API_KEY ?? ''
  }

  const experience = data.experience
  const passions = data.passions

  const steamApi = new SteamAPI(secrets.steam_web_api_key)
  const spotifyApi = SpotifyApi.withClientCredentials(
    secrets.spotify_client_id,
    secrets.spotify_client_secret
  )

  let songs: Song[] = []

  await spotifyApi.playlists.getPlaylist(secrets.spotify_playlist_id).then((playlist) => {
    playlist.tracks.items.forEach((item, index) => {
      if (index > 7) return
      songs.push({
        track: item.track,
        image: <Image src={ item.track.album.images[0].url } width={ 80 } height={ 80 } alt={ item.track.name }/>
      })
    })
  })

  let games: Game[] = []

  data.passions.find((passion) => passion.name === 'Gaming')?.items?.forEach((item) => {
    item = item as { appId: number, name: string, url: string }
    games.push({
      appId: item.appId,
      title: item.name,
      image: <Image
        src={ `https://cdn.akamai.steamstatic.com/steam/apps/${ item.appId }/library_600x900.jpg` }
        width={ 120 }
        height={ 120 }
        quality={ 90 }
        alt={ item.name }
      />,
      logo: <Image
        src={ `https://cdn.akamai.steamstatic.com/steam/apps/${ item.appId }/logo.png` }
        width={ 480 }
        height={ 480 }
        quality={ 90 }
        alt={ item.name }
      />,
      url: item.url
    })
  })

  await steamApi.getUserOwnedGames(secrets.steam_id, {
    filterApps: games.map((game) => game.appId)
  }).then((details) => {
    games.forEach((game) => {
      const detail = details.find((detail) => detail.game.id === game.appId)
      if (detail) {
        game.timePlayed = detail.minutes
        game.lastPlayed = detail.lastPlayedAt
      }
    })

    games.sort((a, b) => {
      if (!a.timePlayed || !b.timePlayed) {
        return 0
      }

      return b.timePlayed - a.timePlayed
    })
  })

  let movies: Movie[] = []

  const movieList = passions.find((passion) => passion.name === 'Movies')?.items ?? []
  for (let movie of movieList) {
    movie = movie as { title: string, releaseDate: Date, overview: string }
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${ secrets.tmdb_api_key }&query=${ movie.title }`)
      .then((response) => {
        response.json().then((data) => {
          if (data.results.length === 0) return

          movies.push({
            title: data.results[0].title,
            releaseDate: new Date(data.results[0].release_date),
            overview: data.results[0].overview,
            image: <Image
              src={ `https://image.tmdb.org/t/p/w500${ data.results[0].poster_path }` }
              width={ 180 }
              height={ 240 }
              quality={ 90 }
              alt={ movie.title }
            />
          })
        })
      })
  }

  return (
    <>
      <AboutMe/>
      <TechList/>
      <Experience heading={ 'Experience' } items={ experience.workExperience }/>
      <Experience heading={ 'Education' } items={ experience.education }/>
      <Suspense fallback={ <div>Loading...</div> }>
        <Passions
          heading={ 'My passions' }
          items={ passions }
          songs={ songs }
          games={ games }
          movies={ movies }
        />
      </Suspense>
    </>
  )
}