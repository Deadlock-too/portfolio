import Boundary from '@/components/boundary'
import Heading from '@/components/heading'
import MusicDisplay from '@/components/passions/music'
import GamesDisplay from '@/components/passions/games'
import MoviesDisplay from '@/components/passions/movies'
import { Game, LogoPosition, LogoSize, Movie, Passions as Pass, Song } from '@/types'
import SteamAPI from '@/internalSteamApi/index'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import Image from 'next/image'
import React from 'react'
import { headers } from 'next/headers'
import { isMobile } from '@/utils'
import { getGames, getMovies } from '@/data/db'

type PassionsProps = {
  heading: string
  items: {
    id: number
    name: string
    icon: string
    description: string
    show: boolean
  }[]
}

export default async function Passions({ heading, items }: PassionsProps) {
  const visiblePassions = items.filter(passion => passion.show)

  if (visiblePassions.length === 0) return null

  let movieQuery = await getMovies().then((movies) => {
    return movies.map((movie) => {
      return {
        title: movie.name,
        url: movie.url,
      } as Movie
    })
  })
  let gameQuery = await getGames().then((games) => {
    return games.map((game) => {
      return {
        appId: game.id,
        title: game.name,
        url: game.url,
        logoPosition: game.logoPosition as LogoPosition,
        logoSize: game.logoSize as LogoSize,
      } as Game
    })
  })

  const secrets = {
    spotify_user_id: process.env.SPOTIFY_USER_ID ?? '',
    spotify_client_id: process.env.STEAM_CLIENT_ID ?? '',
    spotify_client_secret: process.env.STEAM_CLIENT_SECRET ?? '',
    spotify_playlist_id: process.env.SPOTIFY_PLAYLIST_ID ?? '',
    steam_web_api_key: process.env.STEAM_WEB_API_KEY ?? '',
    steam_account_id: process.env.STEAM_ACCOUNT_ID ?? '',
    steam_id: process.env.STEAM_ID ?? '',
    tmdb_api_key: process.env.TMDB_API_KEY ?? '',
  }

  const userAgent = headers().get('user-agent') || ''
  const mobile = isMobile(userAgent)

  const steamApi = new SteamAPI(secrets.steam_web_api_key)
  const spotifyApi = SpotifyApi.withClientCredentials(secrets.spotify_client_id, secrets.spotify_client_secret)

  let movies: Movie[] = []
  await RetryOnFailure(() =>
    GetMovies({
      secrets,
      sources: movieQuery ?? [],
      movies,
    }),
  )

  let songs: Song[] = []
  await RetryOnFailure(() =>
    GetSongs({
      spotifyApi,
      secrets,
      songs,
    }),
  )

  let games: Game[] = gameQuery ?? []
  await RetryOnFailure(() =>
    GetGames({
      steamApi,
      secrets,
      games,
    }),
  )

  return (
    <Boundary>
      <section>
        <Heading
          as='h2'
          size='lg'
          className='focus-in-expand'
        >
          {heading}
        </Heading>
        {items.map((item, index) => (
          <section
            key={index}
            className='text-focus-in ml-6 mt-8 md:ml-12 md:mt-16'
          >
            {(() => {
              switch (item.id) {
                case Pass.Music:
                  if (songs.length === 0) return null
                  return (
                    <MusicDisplay
                      heading={{ name: item.name, icon: item.icon }}
                      songs={songs}
                      description={item.description}
                    />
                  )
                case Pass.Games:
                  if (games.length === 0) return null
                  return (
                    <GamesDisplay
                      heading={{ name: item.name, icon: item.icon }}
                      games={games}
                      description={item.description}
                      isMobile={mobile}
                    />
                  )
                case Pass.Movies:
                  if (movies.length === 0) return null
                  return (
                    <MoviesDisplay
                      heading={{ name: item.name, icon: item.icon }}
                      movies={movies}
                      description={item.description}
                    />
                  )
              }
            })()}
          </section>
        ))}
      </section>
    </Boundary>
  )
}

async function RetryOnFailure<T>(fn: () => Promise<T>, retries = 3): Promise<any> {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) {
      throw error
    }

    return await RetryOnFailure(fn, retries - 1)
  }
}

async function GetSongs({
  spotifyApi,
  secrets,
  songs,
}: {
  spotifyApi: SpotifyApi
  secrets: { spotify_playlist_id: string }
  songs: Song[]
}) {
  return spotifyApi.playlists.getPlaylist(secrets.spotify_playlist_id).then((playlist) => {
    playlist.tracks.items.forEach((item, index) => {
      if (index > 7) return
      songs.push({
        track: item.track,
        image: (
          <Image
            src={item.track.album.images[0].url}
            width={80}
            height={80}
            alt={item.track.name}
          />
        ),
      })
    })
  })
}

async function GetGames({
  steamApi,
  secrets,
  games,
}: {
  steamApi: SteamAPI
  secrets: { steam_id: string }
  games: Game[]
}) {
  return steamApi
    .getUserOwnedGames(secrets.steam_id, {
      filterApps: games.map((game) => game.appId),
    })
    .then((details) => {
      games.forEach((game) => {
        const detail = details.find((detail) => detail.game.id === game.appId)
        if (detail) {
          game.timePlayed = detail.minutes
          game.lastPlayed = detail.lastPlayedAt
          game.image = (
            <Image
              src={detail.game.backgroundURL}
              width={800}
              height={800}
              quality={90}
              alt={game.title}
            />
          )
          game.logo = (
            <Image
              src={detail.game.logoURL}
              width={480}
              height={480}
              quality={90}
              alt={game.title}
            />
          )
        }
      })

      games.sort((a, b) => {
        if (!a.timePlayed || !b.timePlayed) {
          return 0
        }

        return b.timePlayed - a.timePlayed
      })
    })
}

async function GetMovies({
  secrets,
  sources,
  movies,
}: {
  secrets: {
    tmdb_api_key: string
  }
  sources: any[]
  movies: Movie[]
}) {
  const genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${secrets.tmdb_api_key}`).then(
    async (response) => {
      return response.json().then((data) => {
        return data.genres as { id: number; name: string }[]
      })
    },
  )

  return Promise.all(
    (sources as { title: string; url: string }[]).map(async (movie, index) => {
      return fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${secrets.tmdb_api_key}&query=${movie.title}`,
      ).then((response) => {
        response.json().then((data) => {
          if (data.results.length === 0) return

          const getGenres = data.results[0].genre_ids.map((genreId: number, index: number) => {
            if (index > 2) return
            const genre = genres.find((genre) => genre.id === genreId)
            if (genre?.name === 'Science Fiction') genre.name = 'Sci-Fi'
            return genre
          })

          movies[index] = {
            url: movie.url,
            title: data.results[0].title,
            releaseDate: new Date(data.results[0].release_date),
            overview: data.results[0].overview,
            image: (
              <Image
                src={`https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`}
                width={180}
                height={240}
                quality={90}
                alt={movie.title}
              />
            ),
            genres: getGenres,
          }
        })
      })
    }),
  )
}
