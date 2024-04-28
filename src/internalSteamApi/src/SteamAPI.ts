import querystring from 'node:querystring'

import { fetch, assertID } from './utils'
import Game from './structures/Game'
import GameInfo from './structures/GameInfo'
import GameInfoExtended from './structures/GameInfoExtended'
import UserPlaytime from './structures/UserPlaytime'

const defaultOptions = {
  language: 'english' as Language,
  currency: 'us' as Currency,
  headers: { 'User-Agent': `SteamAPI (https://www.npmjs.com/package/steamapi)` },
  baseAPI: 'https://api.steampowered.com',
  baseStore: 'https://store.steampowered.com/api',
  baseActions: 'https://steamcommunity.com/actions',
  inMemoryCacheEnabled: true,
  gameDetailCacheEnabled: true,
  gameDetailCacheTTL: 86400000,
  userResolveCacheEnabled: true,
  userResolveCacheTTL: 86400000,
}

export interface GetUserOwnedGamesOptions {
  /** Include additional details (name, icon) about each game */
  includeAppInfo?: boolean;
  /** Include free games the user has played */
  includeFreeGames?: boolean;
  /** Includes games in the free sub (defaults to false) */
  includeFreeSubGames?: boolean;
  /** Include unvetted store apps (defaults to false) */
  includeUnvettedApps?: boolean;
  /** Include even more app details. If true, `includeAppInfo` will also be set to true */
  includeExtendedAppInfo?: boolean;
  /** If set, restricts results to the passed in apps. (note: does not seem to actually work) */
  filterApps?: number[];
  /** Language to return app info in. (note: does not seem to actualy work) */
  language?: Language;
}

export type Currency =
  'us'
  | 'uk'
  | 'eu'
  | 'ru'
  | 'br'
  | 'jp'
  | 'id'
  | 'my'
  | 'ph'
  | 'sg'
  | 'th'
  | 'vn'
  | 'kr'
  | 'ua'
  | 'mx'
  | 'ca'
  | 'au'
  | 'nz'
  | 'no'
  | 'pl'
  | 'ch'
  | 'cn'
  | 'in'
  | 'cl'
  | 'pe'
  | 'co'
  | 'za'
  | 'hk'
  | 'tw'
  | 'sa'
  | 'ae'
  | 'il'
  | 'kz'
  | 'kw'
  | 'qa'
  | 'cr'
  | 'uy'
  | 'az'
  | 'ar'
  | 'tr'
  | 'pk';
export type Language =
  'arabic'
  | 'bulgarian'
  | 'schinese'
  | 'tchinese'
  | 'czech'
  | 'danish'
  | 'dutch'
  | 'english'
  | 'finnish'
  | 'french'
  | 'german'
  | 'greek'
  | 'hungarian'
  | 'italian'
  | 'japanese'
  | 'koreana'
  | 'norwegian'
  | 'polish'
  | 'brazilian'
  | 'portuguese'
  | 'romanian'
  | 'russian'
  | 'latam'
  | 'spanish'
  | 'swedish'
  | 'thai'
  | 'turkish'
  | 'ukrainian'
  | 'vietnamese';

interface SteamAPIOptions {
  /**
   * Default language to use for the API when a language is not explicitly provided
   *
   * 'english' by default
   */
  language?: Language;
  /**
   * Default currency to use for the API when a currency is not explicitly provided
   *
   * 'us' by default
   */
  currency?: Currency;
  /**
   * Custom headers to send for all API requests
   *
   * By default, User-Agent is "SteamAPI/<VERSION> (https://www.npmjs.com/package/steamapi)"
   */
  headers?: {
    [key: string]: string;
  };
  /**
   * URL to use for Steam API requests
   *
   * 'https://api.steampowered.com' by default
   */
  baseAPI?: string;
  /**
   * URL to use for Steam Store API requests
   *
   * 'https://store.steampowered.com/api' by default
   */
  baseStore?: string;
  /**
   * URL to use for Steam action requests (only used for getLocations)
   *
   * 'https://steamcommunity.com/actions' by default
   */
  baseActions?: string;
  /**
   * Whether to use built-in in-memory caching for gameDetailCache and userResolveCache
   */
  inMemoryCacheEnabled?: boolean;
  /**
   * If `inMemoryCacheEnabled` is true, this decides whether to cache API requests for getGameDetails()
   */
  gameDetailCacheEnabled?: boolean;
  /**
   * How long to cache getGameDetails() in milliseconds
   */
  gameDetailCacheTTL?: number;
  /**
   * If `inMemoryCacheEnabled` is true, this decides whether to cache API requests for resolve()
   */
  userResolveCacheEnabled?: boolean;
  /**
   * How long to cache resolve() in milliseconds
   */
  userResolveCacheTTL?: number;
}

export default class SteamAPI {
  language: Language
  currency: Currency
  headers: {
    [key: string]: string;
  }
  baseAPI: string
  baseStore: string
  baseActions: string
  private key: string = ''

  /**
   * Make a new SteamAPI Client
   * @param key Key to use for API calls. Key can be generated at https://steamcommunity.com/dev/apikey. If you want to make requests without a key, pass in false
   * @param options Custom options for default language, HTTP parameters, and caching
   */
  constructor(key: string | false, options: SteamAPIOptions = {}) {
    if (key !== false) {
      if (key) {
        this.key = key
      } else {
        console.warn([
          'no key provided',
          'some methods won\'t work',
          'get one from https://goo.gl/DfNy5s or initialize SteamAPI as new SteamAPI(false) to suppress this warning'
        ].join('\n'))
      }
    }
    options = { ...defaultOptions, ...options }
    this.language = options.language!
    this.currency = options.currency!
    this.headers = options.headers!
    this.baseAPI = options.baseAPI!
    this.baseStore = options.baseStore!
    this.baseActions = options.baseActions!
  }

  /**
   * Used to make any GET request to the Steam API
   * @param path Path to request e.g '/IPlayerService/GetOwnedGames/v1?steamid=76561198378422474'
   * @param base Base API URL
   * @returns Parse JSON
   */
  get(path: string, params: querystring.ParsedUrlQueryInput = {}, base = this.baseAPI) : Promise<any> {
    if (this.key)
      params.key = this.key
    return fetch(`${ base }${ path }?${ querystring.stringify(params) }`, this.headers)
  }

  /**
   * Get users owned games.
   * @param id User ID
   * @param opts Additional options for filtering
   * @returns Owned games
   */
  async getUserOwnedGames(id: string, opts: GetUserOwnedGamesOptions = {}) : Promise<UserPlaytime<Game | GameInfo | GameInfoExtended>[]> {
    assertID(id)
    // Same behavior as v3
    if (opts.includeFreeGames === undefined)
      opts.includeFreeGames = true
    if (opts.language === undefined)
      opts.language = this.language
    if (opts.includeExtendedAppInfo)
      opts.includeAppInfo = true
    const params = {
      steamid: id,
      include_appinfo: opts.includeAppInfo,
      include_played_free_games: opts.includeFreeGames,
      include_free_sub: opts.includeFreeSubGames,
      skip_unvetted_apps: opts.includeUnvettedApps === undefined ? undefined : !opts.includeUnvettedApps,
      include_extended_appinfo: opts.includeExtendedAppInfo,
      appids_filter: opts.filterApps,
      language: opts.language,
    } as any
    // Filter out options that weren't supplied
    for (const [ k, v ] of Object.entries(params))
      if (v === undefined)
        delete params[k]
    const json = await this.get('/IPlayerService/GetOwnedGames/v1', params)
    return json.response.games.map((data: any) => {
      let game
      if (opts.includeExtendedAppInfo)
        game = new GameInfoExtended(data)
      else if (opts.includeAppInfo)
        game = new GameInfo(data)
      else
        game = new Game(data)
      return new UserPlaytime(data, game)
    })
  }
}
